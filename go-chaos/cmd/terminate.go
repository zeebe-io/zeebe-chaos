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

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

func init() {
	rootCmd.AddCommand(terminateCmd)

	terminateCmd.Flags().StringVar(&role, "role", "LEADER", "Specify the partition role [LEADER, FOLLOWER]")
	terminateCmd.Flags().IntVar(&partitionId, "partitionId", 1, "Specify the id of the partition")

	if err := terminateCmd.MarkFlagRequired("role"); err != nil {
		panic(err)
	}

	if err := terminateCmd.MarkFlagRequired("partitionId"); err != nil {
		panic(err)
	}

	terminateCmd.AddCommand(terminateGatewayCmd)
}

var terminateCmd = &cobra.Command{
	Use:   "terminate",
	Short: "Terminates a Zeebe broker",
	Long:  `Terminates a Zeebe broker with a certain role and given partition.`,
	Run: func(cmd *cobra.Command, args []string) {
		port := 26500
		k8Client := internal.CreateK8Client()
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
		broker, err := internal.GetBrokerForPartitionAndRole(k8Client, zbClient, partitionId, role)
		if err != nil {
			panic(err.Error())
		}

		err = k8Client.TerminatePod(broker)
		if err != nil {
			panic(err.Error())
		}

		fmt.Printf("\nTerminated %s", broker)
		fmt.Println()
	},
}

var terminateGatewayCmd = &cobra.Command{
	Use:   "gateway",
	Short: "Terminates a Zeebe gateway",
	Long:  `Terminates a Zeebe gateway.`,
	Run: func(cmd *cobra.Command, args []string) {
		k8Client := internal.CreateK8Client()

		gatewayPodNames, err := k8Client.GetGatewayPodNames()
		if err != nil {
			panic(err)
		}

		if len(gatewayPodNames) <= 0 {
			panic(errors.New(fmt.Sprintf("Expected to find Zeebe gateway in namespace %s, but none found.", k8Client.GetCurrentNamespace())))
		}

		gatewayPod := gatewayPodNames[0]
		err = k8Client.TerminatePod(gatewayPod)
		if err != nil {
			panic(err.Error())
		}

		fmt.Printf("\nTerminated %s", gatewayPod)
		fmt.Println()
	},
}
