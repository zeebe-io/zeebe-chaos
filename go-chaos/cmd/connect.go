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

package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

func init() {
	rootCmd.AddCommand(connect)
	connect.AddCommand(connectBrokers)
	connect.AddCommand(connectGateway)
}

var connect = &cobra.Command{
	Use:   "connect",
	Short: "Connect Zeebe nodes",
	Long:  `Connect all Zeebe nodes again, after they have been disconnected uses sub-commands to connect brokers, gateways, etc.`,
}

var connectBrokers = &cobra.Command{
	Use:   "brokers",
	Short: "Connect Zeebe Brokers",
	Long:  `Connect all Zeebe Brokers again, after they have been disconnected.`,
	Run: func(cmd *cobra.Command, args []string) {
		internal.Verbosity = Verbose
		k8Client, err := internal.CreateK8Client()
		if err != nil {
			panic(err)
		}

		// No patch is need, since we expect that disconnect was executed before.
		// If not all fine and the pods are already connected.

		// We run connect on all nodes, since roles can have been changed in between so it is easier to run the commands on all nodes.

		podNames, err := k8Client.GetBrokerPodNames()
		if err != nil {
			panic(err.Error())
		}

		if len(podNames) <= 0 {
			panic(fmt.Sprintf("Expected to find brokers in current namespace %s, but found nothing", k8Client.GetCurrentNamespace()))
		}

		for _, pod := range podNames {
			err = internal.MakeIpReachableForPod(k8Client, pod)
			if err != nil {
				internal.VerbosityLogging("Error on connection Broker: %s. Error: %s", pod, err.Error())
			} else {
				internal.InfoLogging("Connected %s again, removed unreachable routes.", pod)
			}
		}
	},
}

var connectGateway = &cobra.Command{
	Use:   "gateway",
	Short: "Connect Zeebe Gateway",
	Long:  `Connect all Zeebe Gateway again, after it has been disconnected.`,
	Run: func(cmd *cobra.Command, args []string) {
		internal.Verbosity = Verbose
		k8Client, err := internal.CreateK8Client()
		ensureNoError(err)

		// No patch is need, since we expect that disconnect was executed before.
		// If not all fine and the pods are already connected.

		// We run connect on all nodes
		brokerPods, err := k8Client.GetBrokerPods()
		ensureNoError(err)

		if len(brokerPods.Items) <= 0 {
			panic(fmt.Sprintf("Expected to find broker(s) in current namespace %s, but found nothing", k8Client.GetCurrentNamespace()))
		}

		gatewayPod := getGatewayPod(k8Client)

		for _, brokerPod := range brokerPods.Items {
			err = internal.MakeIpReachable(k8Client, gatewayPod.Name, brokerPod.Status.PodIP)
			if err != nil {
				if Verbose {
					internal.VerbosityLogging("Error on connection gateway: %s. Error: %s", gatewayPod.Name, err.Error())
				}
			} else {
				internal.InfoLogging("Connected %s again with %s, removed unreachable routes.", gatewayPod.Name, brokerPod.Name)
			}
		}
	},
}
