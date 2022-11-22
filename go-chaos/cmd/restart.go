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
	rootCmd.AddCommand(restartCmd)

	restartCmd.Flags().StringVar(&role, "role", "LEADER", "Specify the partition role [LEADER, FOLLOWER, INACTIVE]")
	restartCmd.Flags().IntVar(&partitionId, "partitionId", 1, "Specify the id of the partition")

	if err := restartCmd.MarkFlagRequired("role"); err != nil {
		panic(err)
	}

	if err := restartCmd.MarkFlagRequired("partitionId"); err != nil {
		panic(err)
	}

	restartCmd.AddCommand(restartWorkerCmd)
	restartWorkerCmd.Flags().BoolVar(&all, "all", false, "Specify whether all workers should be restarted")
}

var restartCmd = &cobra.Command{
	Use:   "restart",
	Short: "Restarts a Zeebe broker",
	Long:  `Restarts a Zeebe broker with a certain role and given partition.`,
	Run: func(cmd *cobra.Command, args []string) {
		k8Client, err := internal.CreateK8Client()
		if err != nil {
			panic(err)
		}

		port := 26500
		closeFn := k8Client.MustGatewayPortForward(port, port)
		defer closeFn()

		zbClient, err := internal.CreateZeebeClient(port)
		if err != nil {
			panic(err)
		}
		defer zbClient.Close()
		broker, err := internal.GetBrokerPodNameForPartitionAndRole(k8Client, zbClient, partitionId, role)
		if err != nil {
			panic(err)
		}

		err = k8Client.RestartPod(broker)
		if err != nil {
			panic(err)
		}

		fmt.Printf("\nDeleted %s", broker)
		fmt.Println()
	},
}

var restartWorkerCmd = &cobra.Command{
	Use:   "worker",
	Short: "Restart a Zeebe worker",
	Long:  `Restart a Zeebe worker.`,
	Run: func(cmd *cobra.Command, args []string) {
		k8Client, err := internal.CreateK8Client()
		ensureNoError(err)

		workerPods, err := k8Client.GetWorkerPods()
		ensureNoError(err)

		if workerPods == nil || len(workerPods.Items) <= 0 {
			panic(errors.New(fmt.Sprintf("Expected to find workers in namespace %s, but none found.", k8Client.GetCurrentNamespace())))
		}

		if all {
			for _, worker := range workerPods.Items {
				err = k8Client.RestartPod(worker.Name)
				ensureNoError(err)
				fmt.Printf("Restart %s\n", worker.Name)
			}
		} else {
			workerPod := workerPods.Items[0]
			err = k8Client.RestartPod(workerPod.Name)
			ensureNoError(err)

			fmt.Printf("Restart %s\n", workerPod.Name)
		}
	},
}
