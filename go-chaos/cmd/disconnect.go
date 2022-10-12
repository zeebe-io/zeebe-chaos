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

	"github.com/camunda/zeebe/clients/go/v8/pkg/zbc"
	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
	v1 "k8s.io/api/core/v1"
)

var (
	oneDirection bool
)

func init() {
	rootCmd.AddCommand(disconnect)

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
}

var disconnect = &cobra.Command{
	Use:   "disconnect",
	Short: "Disconnect Zeebe nodes",
	Long:  `Disconnect Zeebe nodes, uses sub-commands to disconnect leaders, followers, etc.`,
}

var disconnectBrokers = &cobra.Command{
	Use:   "brokers",
	Short: "Disconnect Zeebe Brokers",
	Long:  `Disconnect Zeebe Brokers with a given partition and role.`,
	Run: func(cmd *cobra.Command, args []string) {
		internal.Verbosity = Verbose
		k8Client, err := internal.CreateK8Client()
		if err != nil {
			panic(err)
		}

		err = k8Client.ApplyNetworkPatch()
		if err != nil {
			panic(err)
		}

		if Verbose {
			fmt.Println("Patched statefulset")
		}

		port := 26500
		closeFn, err := k8Client.GatewayPortForward(port)
		if err != nil {
			panic(err.Error())
		}
		defer closeFn()

		zbClient, err := internal.CreateZeebeClient(port)
		if err != nil {
			panic(err.Error())
		}
		defer zbClient.Close()

		broker1Pod := getBrokerPod(k8Client, zbClient, broker1NodeId, broker1PartitionId, broker1Role)
		broker2Pod := getBrokerPod(k8Client, zbClient, broker2NodeId, broker2PartitionId, broker2Role)

		if broker1Pod.Name == broker2Pod.Name {
			fmt.Printf("Expected to disconnect two DIFFERENT brokers %s and %s, but they are the same. Will do nothing.\n", broker1Pod.Name, broker2Pod.Name)
			return
		}

		err = internal.MakeIpUnreachableForPod(k8Client, broker2Pod.Status.PodIP, broker1Pod.Name)
		if err != nil {
			panic(err.Error())
		}
		fmt.Printf("Disconnect %s from %s\n", broker1Pod.Name, broker2Pod.Name)

		if !oneDirection {
			err = internal.MakeIpUnreachableForPod(k8Client, broker1Pod.Status.PodIP, broker2Pod.Name)
			if err != nil {
				panic(err.Error())
			}
			fmt.Printf("Disconnect %s from %s\n", broker2Pod.Name, broker1Pod.Name)
		}
	},
}

func getBrokerPod(k8Client internal.K8Client, zbClient zbc.Client, brokerNodeId int, brokerPartitionId int, brokerRole string) *v1.Pod {
	var brokerPod *v1.Pod
	var err error
	if brokerNodeId >= 0 {
		brokerPod, err = internal.GetBrokerPodForNodeId(k8Client, int32(brokerNodeId))
		if err != nil {
			panic(err.Error())
		}
		if Verbose {
			fmt.Printf("Found Broker %s with node id %d.\n", brokerPod.Name, brokerNodeId)
		}
	} else {
		brokerPod, err = internal.GetBrokerPodForPartitionAndRole(k8Client, zbClient, brokerPartitionId, brokerRole)
		if err != nil {
			panic(err.Error())
		}
		if Verbose {
			fmt.Printf("Found Broker %s as %s for partition %d.\n", brokerPod.Name, role, brokerPartitionId)
		}
	}

	return brokerPod
}
