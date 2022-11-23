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

package backend

import (
	"errors"
	"fmt"

	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
	v1 "k8s.io/api/core/v1"
)

func ConnectBrokers() error {
	k8Client, err := internal.CreateK8Client()
	if err != nil {
		return err
	}

	// No patch is need, since we expect that disconnect was executed before.
	// If not all fine and the pods are already connected.

	// We run connect on all nodes, since roles can have been changed in between so it is easier to run the commands on all nodes.

	podNames, err := k8Client.GetBrokerPodNames()
	if err != nil {
	  return err
	}

	if len(podNames) <= 0 {
		errorMsg := fmt.Sprintf("Expected to find brokers in current namespace %s, but found nothing", k8Client.GetCurrentNamespace())
		return errors.New(errorMsg)
	}

	for _, pod := range podNames {
		err = internal.MakeIpReachableForPod(k8Client, pod)
		if err != nil {
			internal.LogVerbose("Error on connection Broker: %s. Error: %s", pod, err.Error())
		} else {
			internal.LogInfo("Connected %s again, removed unreachable routes.", pod)
		}
	}
	return nil
}


func ConnectGateway() error {
	k8Client, err := internal.CreateK8Client()
	if err != nil {
		return err
	}

	// No patch is need, since we expect that disconnect was executed before.
	// If not all fine and the pods are already connected.

	// We run connect on all nodes
	brokerPods, err := k8Client.GetBrokerPods()
	if err != nil {
		return err
	}

	if len(brokerPods.Items) <= 0 {
		errorMsg := fmt.Sprintf("Expected to find broker(s) in current namespace %s, but found nothing", k8Client.GetCurrentNamespace())
		return errors.New(errorMsg)
	}

	gatewayPod, err := getGatewayPod(k8Client)
	if err != nil {
		return err
	}

	for _, brokerPod := range brokerPods.Items {
		err = internal.MakeIpReachable(k8Client, gatewayPod.Name, brokerPod.Status.PodIP)
		if err != nil {
			internal.LogVerbose("Error on connection gateway: %s. Error: %s", gatewayPod.Name, err.Error())
		} else {
			internal.LogInfo("Connected %s again with %s, removed unreachable routes.", gatewayPod.Name, brokerPod.Name)
		}
	}
	return nil
}


func getGatewayPod(k8Client internal.K8Client) (*v1.Pod, error) {
	pods, err := k8Client.GetGatewayPods()
	if err != nil {
		return nil, err
	}

	if pods != nil && len(pods.Items) > 0 {
		return &pods.Items[0], nil
	}

	errorMsg := fmt.Sprintf("Expected to find standalone gateway, but found nothing.")
	return nil, errors.New(errorMsg)
}