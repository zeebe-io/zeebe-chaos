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
	"errors"
	"fmt"

	"github.com/camunda/zeebe/clients/go/v8/pkg/zbc"
	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
	v1 "k8s.io/api/core/v1"
)

var (
	oneDirection    bool
	disconnectToAll bool
)

func init() {
	rootCmd.AddCommand(disconnect)

	// disconnect brokers
	disconnect.AddCommand(disconnectBrokers)
	// broker 1
	disconnectBrokers.Flags().StringVar(&broker1Role, "broker1Role", "LEADER", "Specify the partition role [LEADER, FOLLOWER] of the first Broker")
	disconnectBrokers.Flags().IntVar(&broker1PartitionId, "broker1PartitionId", 1, "Specify the partition id of the first Broker")
	disconnectBrokers.Flags().IntVar(&broker1NodeId, "broker1NodeId", -1, "Specify the nodeId of the first Broker")
	disconnectBrokers.MarkFlagsMutuallyExclusive("broker1PartitionId", "broker1NodeId")
	// broker 2
	disconnectBrokers.Flags().StringVar(&broker2Role, "broker2Role", "LEADER", "Specify the partition role [LEADER, FOLLOWER] of the second Broker")
	disconnectBrokers.Flags().IntVar(&broker2PartitionId, "broker2PartitionId", 2, "Specify the partition id of the second Broker")
	disconnectBrokers.Flags().IntVar(&broker2NodeId, "broker2NodeId", -1, "Specify the nodeId of the second Broker")
	// general
	disconnectBrokers.Flags().BoolVar(&oneDirection, "one-direction", false, "Specify whether the network partition should be setup only in one direction (asymmetric)")
	disconnectBrokers.MarkFlagsMutuallyExclusive("broker2PartitionId", "broker2NodeId", "one-direction")

	// disconnect gateway
	disconnect.AddCommand(disconnectGateway)
	disconnectGateway.Flags().IntVar(&nodeId, "nodeId", -1, "Specify the nodeId of the Broker")
	disconnectGateway.Flags().StringVar(&role, "role", "LEADER", "Specify the partition role [LEADER, FOLLOWER] of the Broker")
	disconnectGateway.Flags().IntVar(&partitionId, "partitionId", 1, "Specify the partition id of the Broker")
	disconnectGateway.Flags().BoolVar(&oneDirection, "one-direction", false, "Specify whether the network partition should be setup only in one direction (asymmetric)")
	disconnectGateway.Flags().BoolVar(&disconnectToAll, "all", false, "Specify whether the gateway should be disconnected to all brokers")
	disconnectGateway.MarkFlagsMutuallyExclusive("all", "partitionId", "nodeId")
}

var disconnect = &cobra.Command{
	Use:   "disconnect",
	Short: "Disconnect Zeebe nodes",
	Long:  `Disconnect Zeebe nodes, uses sub-commands to disconnect leaders, followers, etc.`,
}

func ensureNoError(err error) {
	if err != nil {
		panic(err)
	}
}

var disconnectBrokers = &cobra.Command{
	Use:   "brokers",
	Short: "Disconnect Zeebe Brokers",
	Long:  `Disconnect Zeebe Brokers with a given partition and role.`,
	Run: func(cmd *cobra.Command, args []string) {
		internal.Verbosity = Verbose
		k8Client, err := internal.CreateK8Client()
		ensureNoError(err)

		err = k8Client.PauseReconciliation()
		ensureNoError(err)

		err = k8Client.ApplyNetworkPatch()
		ensureNoError(err)

		internal.LogVerbose("Patched statefulset")

		port := 26500
		closeFn := k8Client.MustGatewayPortForward(port, port)
		defer closeFn()

		zbClient, err := internal.CreateZeebeClient(port)
		ensureNoError(err)
		defer zbClient.Close()

		broker1Pod := getBrokerPod(k8Client, zbClient, broker1NodeId, broker1PartitionId, broker1Role)
		broker2Pod := getBrokerPod(k8Client, zbClient, broker2NodeId, broker2PartitionId, broker2Role)

		if broker1Pod.Name == broker2Pod.Name {
			internal.LogInfo("Expected to disconnect two DIFFERENT brokers %s and %s, but they are the same. Will do nothing.", broker1Pod.Name, broker2Pod.Name)
			return
		}

		disconnectPods(k8Client, broker1Pod, broker2Pod)
	},
}

func getBrokerPod(k8Client internal.K8Client, zbClient zbc.Client, brokerNodeId int, brokerPartitionId int, brokerRole string) *v1.Pod {
	var brokerPod *v1.Pod
	var err error
	if brokerNodeId >= 0 {
		brokerPod, err = internal.GetBrokerPodForNodeId(k8Client, int32(brokerNodeId))
		ensureNoError(err)
		internal.LogVerbose("Found Broker %s with node id %d.", brokerPod.Name, brokerNodeId)
	} else {
		brokerPod, err = internal.GetBrokerPodForPartitionAndRole(k8Client, zbClient, brokerPartitionId, brokerRole)
		ensureNoError(err)
		internal.LogVerbose("Found Broker %s as %s for partition %d.", brokerPod.Name, role, brokerPartitionId)
	}

	return brokerPod
}

func getGatewayPod(k8Client internal.K8Client) *v1.Pod {
	pods, err := k8Client.GetGatewayPods()
	ensureNoError(err)

	if pods != nil && len(pods.Items) > 0 {
		return &pods.Items[0]
	}

	panic(errors.New(fmt.Sprintf("Expected to find standalone gateway, but found nothing.")))
}

var disconnectGateway = &cobra.Command{
	Use:   "gateway",
	Short: "Disconnect Zeebe Gateway",
	Long:  `Disconnect Zeebe Gateway from Broker with a given partition and role.`,
	Run: func(cmd *cobra.Command, args []string) {
		internal.Verbosity = Verbose
		k8Client, err := internal.CreateK8Client()
		ensureNoError(err)

		err = k8Client.PauseReconciliation()
		ensureNoError(err)

		err = k8Client.ApplyNetworkPatch()
		ensureNoError(err)

		internal.LogVerbose("Patched statefulset")

		err = k8Client.ApplyNetworkPatchOnGateway()
		ensureNoError(err)

		internal.LogVerbose("Patched deployment")

		err = k8Client.AwaitReadiness()
		ensureNoError(err)

		port := 26500
		closeFn := k8Client.MustGatewayPortForward(port, port)
		defer closeFn()

		zbClient, err := internal.CreateZeebeClient(port)
		ensureNoError(err)
		defer zbClient.Close()

		gatewayPod := getGatewayPod(k8Client)

		if disconnectToAll {
			pods, err := k8Client.GetBrokerPods()
			ensureNoError(err)

			for _, brokerPod := range pods.Items {
				disconnectPods(k8Client, gatewayPod, &brokerPod)
			}
		} else {
			broker2Pod := getBrokerPod(k8Client, zbClient, nodeId, partitionId, role)
			disconnectPods(k8Client, gatewayPod, broker2Pod)
		}
	},
}

func disconnectPods(k8Client internal.K8Client, firstPod *v1.Pod, secondPod *v1.Pod) {
	err := internal.MakeIpUnreachableForPod(k8Client, secondPod.Status.PodIP, firstPod.Name)
	ensureNoError(err)
	internal.LogInfo("Disconnect %s from %s", firstPod.Name, secondPod.Name)

	if !oneDirection {
		err = internal.MakeIpUnreachableForPod(k8Client, firstPod.Status.PodIP, secondPod.Name)
		ensureNoError(err)
		internal.LogInfo("Disconnect %s from %s", secondPod.Name, firstPod.Name)
	}
}
