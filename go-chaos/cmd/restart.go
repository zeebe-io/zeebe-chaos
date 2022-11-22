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
)

func init() {
	rootCmd.AddCommand(restartCmd)
	restartCmd.AddCommand(restartBrokerCmd)
	restartBrokerCmd.Flags().StringVar(&role, "role", "LEADER", "Specify the partition role [LEADER, FOLLOWER, INACTIVE]")
	restartBrokerCmd.Flags().IntVar(&partitionId, "partitionId", 1, "Specify the id of the partition")
	restartBrokerCmd.Flags().IntVar(&nodeId, "nodeId", -1, "Specify the nodeId of the Broker")
	restartBrokerCmd.MarkFlagsMutuallyExclusive("partitionId", "nodeId")

	restartCmd.AddCommand(restartGatewayCmd)
	restartCmd.AddCommand(restartWorkerCmd)
	restartWorkerCmd.Flags().BoolVar(&all, "all", false, "Specify whether all workers should be restarted")
}

var restartCmd = &cobra.Command{
	Use:   "restart",
	Short: "Restarts a Zeebe node",
	Long:  `Restarts a Zeebe node, it can be chosen between: broker, gateway or a worker.`,
}

var restartBrokerCmd = &cobra.Command{
	Use:   "broker",
	Short: "Restarts a Zeebe broker",
	Long:  `Restarts a Zeebe broker with a certain role and given partition.`,
	Run: func(cmd *cobra.Command, args []string) {
		brokerPod := restartBroker(nodeId, partitionId, role, nil)
		fmt.Printf("Deleted %s\n", brokerPod)
	},
}

var restartGatewayCmd = &cobra.Command{
	Use:   "gateway",
	Short: "Restarts a Zeebe gateway",
	Long:  `Restarts a Zeebe gateway.`,
	Run: func(cmd *cobra.Command, args []string) {
		gatewayPod := restartGateway(nil)
		fmt.Printf("Restarted %s\n", gatewayPod)
	},
}

var restartWorkerCmd = &cobra.Command{
	Use:   "worker",
	Short: "Restart a Zeebe worker",
	Long:  `Restart a Zeebe worker.`,
	Run: func(cmd *cobra.Command, args []string) {
		restartWorker(all, "Restarted", nil)
	},
}
