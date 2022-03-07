package internal

import (
	"bytes"
	"context"
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
	}

	list, err := c.Clientset.CoreV1().Pods(c.GetCurrentNamespace()).List(context.TODO(), listOptions)
	if err != nil {
		return nil, err
	}

	return c.extractPodNames(list)
}

// GatewayPortForward creates a port forwarding to a zeebe gateway with the given port
// https://github.com/gruntwork-io/terratest/blob/master/modules/k8s/tunnel.go#L187-L196
// https://github.com/kubernetes/client-go/issues/51#issuecomment-436200428
func GatewayPortForward(port int) (func(), error) {
	client := CreateK8Client()
	names, err := client.GetGatewayPodNames()
	if err != nil {
		return nil, err
	}

	portForwardCreateURL := createPortForwardUrl(client, names)
	portForwarder, err := createPortForwarder(port, client, portForwardCreateURL)
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
func createPortForwarder(port int, client K8Client, portForwardCreateURL *url.URL) (*portforward.PortForwarder, error) {
	// Construct the spdy client required by the client-go portforward library
	config, err := client.ClientConfig.ClientConfig()
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
func createPortForwardUrl(client K8Client, names []string) *url.URL {
	restClient := client.Clientset.CoreV1().RESTClient()
	portForwardCreateURL := restClient.Post().
		Resource("pods").
		Namespace(client.GetCurrentNamespace()).
		Name(names[0]).
		SubResource("portforward").
		URL()
	return portForwardCreateURL
}
