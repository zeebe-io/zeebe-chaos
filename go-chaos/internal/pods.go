// Copyright 2022 Camunda Services GmbH
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package internal

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"net/http"
	"net/url"

	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/tools/portforward"
	"k8s.io/client-go/transport/spdy"
)

func (c K8Client) GetBrokerPodNames() ([]string, error) {
	listOptions := metav1.ListOptions{
		LabelSelector: "app.kubernetes.io/component=zeebe-broker",
	}

	list, err := c.Clientset.CoreV1().Pods(c.GetCurrentNamespace()).List(context.TODO(), listOptions)
	if err != nil {
		return nil, err
	}

	return c.extractPodNames(list)
}

func (c K8Client) extractPodNames(list *v1.PodList) ([]string, error) {
	pods := list.Items
	names := make([]string, len(pods))

	for idx, item := range pods {
		names[idx] = item.Name
	}

	return names, nil
}

func (c K8Client) GetGatewayPodNames() ([]string, error) {
	listOptions := metav1.ListOptions{
		LabelSelector: "app.kubernetes.io/component=zeebe-gateway",
		FieldSelector: "status.phase=Running",
	}

	list, err := c.Clientset.CoreV1().Pods(c.GetCurrentNamespace()).List(context.TODO(), listOptions)
	if err != nil {
		return nil, err
	}

	return c.extractPodNames(list)
}

func (c K8Client) TerminatePod(podName string) error {
	gracePeriodSec := int64(0)
	options := metav1.DeleteOptions{GracePeriodSeconds: &gracePeriodSec}
	return c.Clientset.CoreV1().Pods(c.GetCurrentNamespace()).Delete(context.TODO(), podName, options)
}

func (c K8Client) RestartPod(podName string) error {
	return c.Clientset.CoreV1().Pods(c.GetCurrentNamespace()).Delete(context.TODO(), podName, metav1.DeleteOptions{})
}

// GatewayPortForward creates a port forwarding to a zeebe gateway with the given port
// https://github.com/gruntwork-io/terratest/blob/master/modules/k8s/tunnel.go#L187-L196
// https://github.com/kubernetes/client-go/issues/51#issuecomment-436200428
func (c K8Client) GatewayPortForward(port int) (func(), error) {
	names, err := c.GetGatewayPodNames()
	if err != nil {
		return nil, err
	}

	if len(names) <= 0 {
		return nil, errors.New(fmt.Sprintf("Expected to find Zeebe gateway in namespace %s, but none found.", c.GetCurrentNamespace()))
	}

	portForwardCreateURL := c.createPortForwardUrl(names)
	portForwarder, err := c.createPortForwarder(port, portForwardCreateURL)
	if err != nil {
		return nil, err
	}

	// Open the tunnel in a goroutine so that it is available in the background. Report errors to the main goroutine via
	// a new channel.
	errChan := make(chan error)
	go func() {
		errChan <- portForwarder.ForwardPorts()
	}()

	// Wait for an error or the tunnel to be ready
	select {
	case err = <-errChan:
		fmt.Printf("\nError starting port forwarding tunnel: %s", err)
		return nil, err
	case <-portForwarder.Ready:
		fmt.Println("Successfully created port forwarding tunnel")
		return func() {
			portForwarder.Close()
		}, nil
	}
}

// Create the k8 port forwarder, with the given port and k8 client
func (c K8Client) createPortForwarder(port int, portForwardCreateURL *url.URL) (*portforward.PortForwarder, error) {
	// Construct the spdy client required by the client-go portforward library
	config, err := c.ClientConfig.ClientConfig()
	if err != nil {
		return nil, err
	}

	transport, upgrader, err := spdy.RoundTripperFor(config)
	if err != nil {
		fmt.Printf("Error creating http client: %s\n", err)
		return nil, err
	}
	dialer := spdy.NewDialer(upgrader, &http.Client{Transport: transport}, "POST", portForwardCreateURL)

	// Construct a new PortForwarder struct that manages the instructed port forward tunnel
	stopChan, readyChan := make(chan struct{}, 1), make(chan struct{}, 1)
	out, errOut := new(bytes.Buffer), new(bytes.Buffer)
	ports := []string{fmt.Sprintf("%d:%d", port, 26500)}
	portforwarder, err := portforward.New(dialer, ports, stopChan, readyChan, out, errOut)
	if err != nil {
		fmt.Printf("Error creating port forwarding tunnel: %s", err)
		return nil, err
	}
	return portforwarder, nil
}

// createPortForwardUrl constructs the Url to which is used to create the port forwarding
func (c K8Client) createPortForwardUrl(names []string) *url.URL {
	restClient := c.Clientset.CoreV1().RESTClient()
	portForwardCreateURL := restClient.Post().
		Resource("pods").
		Namespace(c.GetCurrentNamespace()).
		Name(names[0]).
		SubResource("portforward").
		URL()
	return portForwardCreateURL
}
