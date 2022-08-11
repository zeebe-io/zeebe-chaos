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
	rootCmd.AddCommand(disconnect)

	disconnect.AddCommand(disconnectLeaders)

	disconnectLeaders.Flags().StringVar(&broker1Role, "broker1Role", "LEADER", "Specify the partition role [LEADER, FOLLOWER] of the first Broker")
	if err := disconnectLeaders.MarkFlagRequired("broker1Role"); err != nil {
		panic(err)
	}

	disconnectLeaders.Flags().IntVar(&broker1PartitionId, "broker1PartitionId", 1, "Specify the partition id of the first Broker")
	if err := disconnectLeaders.MarkFlagRequired("broker1PartitionId"); err != nil {
		panic(err)
	}

	disconnectLeaders.Flags().StringVar(&broker2Role, "broker2Role", "LEADER", "Specify the partition role [LEADER, FOLLOWER] of the second Broker")
	if err := disconnectLeaders.MarkFlagRequired("broker2Role"); err != nil {
		panic(err)
	}

	disconnectLeaders.Flags().IntVar(&broker2PartitionId, "broker2PartitionId", 1, "Specify the partition id of the second Broker")
	if err := disconnectLeaders.MarkFlagRequired("broker2PartitionId"); err != nil {
		panic(err)
	}

}

var disconnect = &cobra.Command{
	Use:   "disconnect",
	Short: "Disconnect Zeebe nodes",
	Long:  `Disconnect Zeebe nodes, uses sub-commands to disconnect leaders, followers, etc.`,
}

var disconnectLeaders = &cobra.Command{
	Use:   "brokers",
	Short: "Disconnect Zeebe Brokers",
	Long:  `Disconnect Zeebe Brokers with a given partition and role.`,
	Run: func(cmd *cobra.Command, args []string) {
		k8Client, err := internal.CreateK8Client()
		if err != nil {
			panic(err)
		}

		err = k8Client.ApplyNetworkPatch()
		if err != nil {
			panic(err)
		}

		fmt.Println("Patched statefulset")

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

		broker1Pod, err := internal.GetBrokerPodForPartitionAndRole(k8Client, zbClient, broker1PartitionId, broker1Role)
		if err != nil {
			panic(err.Error())
		}

		broker2Pod, err := internal.GetBrokerPodForPartitionAndRole(k8Client, zbClient, broker2PartitionId, broker2Role)
		if err != nil {
			panic(err.Error())
		}

		if broker1Pod.Name == broker2Pod.Name {
			fmt.Printf("Expected to disconnect two DIFFERENT brokers %s and %s, but they are the same. Will do nothing.\n", broker1Pod.Name, broker2Pod.Name)
			return
		}

		err = internal.MakeIpUnreachableForPod(k8Client, broker2Pod.Status.PodIP, broker1Pod.Name)
		if err != nil {
			panic(err.Error())
		}

		err = internal.MakeIpUnreachableForPod(k8Client, broker1Pod.Status.PodIP, broker2Pod.Name)
		if err != nil {
			panic(err.Error())
		}
	},
}
