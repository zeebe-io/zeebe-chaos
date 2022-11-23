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

var (
	all bool
)

func init() {
	rootCmd.AddCommand(terminateCmd)

	terminateCmd.AddCommand(terminateBrokerCmd)
	terminateBrokerCmd.Flags().StringVar(&role, "role", "LEADER", "Specify the partition role [LEADER, FOLLOWER]")
	terminateBrokerCmd.Flags().IntVar(&partitionId, "partitionId", 1, "Specify the id of the partition")
	terminateBrokerCmd.Flags().IntVar(&nodeId, "nodeId", -1, "Specify the nodeId of the Broker")
	terminateBrokerCmd.MarkFlagsMutuallyExclusive("partitionId", "nodeId")

	terminateCmd.AddCommand(terminateGatewayCmd)

	terminateCmd.AddCommand(terminateWorkerCmd)
	terminateWorkerCmd.Flags().BoolVar(&all, "all", false, "Specify whether all workers should be terminated")
}

var terminateCmd = &cobra.Command{
	Use:   "terminate",
	Short: "Terminates a Zeebe node",
	Long:  `Terminates a Zeebe node, it can be chosen between: broker, gateway or a worker.`,
}

var terminateBrokerCmd = &cobra.Command{
	Use:   "broker",
	Short: "Terminates a Zeebe broker",
	Long:  `Terminates a Zeebe broker with a certain role and given partition.`,
	Run: func(cmd *cobra.Command, args []string) {
		gracePeriodSec := int64(0)
		brokerName := restartBroker(nodeId, partitionId, role, &gracePeriodSec)
		fmt.Printf("Terminated %s\n", brokerName)
	},
}

var terminateGatewayCmd = &cobra.Command{
	Use:   "gateway",
	Short: "Terminates a Zeebe gateway",
	Long:  `Terminates a Zeebe gateway.`,
	Run: func(cmd *cobra.Command, args []string) {
		gracePeriodSec := int64(0)
		gatewayPod := restartGateway(&gracePeriodSec)
		fmt.Printf("Terminated %s\n", gatewayPod)
	},
}

var terminateWorkerCmd = &cobra.Command{
	Use:   "worker",
	Short: "Terminates a Zeebe worker",
	Long:  `Terminates a Zeebe worker.`,
	Run: func(cmd *cobra.Command, args []string) {
		gracePeriodSec := int64(0)
		restartWorker(all, "Terminated", &gracePeriodSec)
	},
}

// Restart a broker pod. Pod is identified either by nodeId or by partitionId and role.
// GracePeriod (in second) can be negative, which would mean use default.
// Returns the broker which has been restarted
func restartBroker(nodeId int, partitionId int, role string, gracePeriod *int64) string {
	k8Client, err := internal.CreateK8Client()
	ensureNoError(err)

	port := 26500
	closeFn := k8Client.MustGatewayPortForward(port, port)
	defer closeFn()

	zbClient, err := internal.CreateZeebeClient(port)
	ensureNoError(err)
	defer zbClient.Close()

	brokerPod := getBrokerPod(k8Client, zbClient, nodeId, partitionId, role)
	err = k8Client.RestartPodWithGracePeriod(brokerPod.Name, gracePeriod)
	ensureNoError(err)

	return brokerPod.Name
}

// Restart a gateway pod. The pod is the first from a list of existing pods.
// GracePeriod (in second) can be nil, which would mean using K8 default.
// Returns the gateway which has been restarted
func restartGateway(gracePeriod *int64) string {
	k8Client, err := internal.CreateK8Client()
	ensureNoError(err)

	gatewayPodNames, err := k8Client.GetGatewayPodNames()
	ensureNoError(err)

	if len(gatewayPodNames) <= 0 {
		panic(errors.New(fmt.Sprintf("Expected to find Zeebe gateway in namespace %s, but none found.", k8Client.GetCurrentNamespace())))
	}

	gatewayPod := gatewayPodNames[0]
	err = k8Client.RestartPodWithGracePeriod(gatewayPod, gracePeriod)
	ensureNoError(err)
	return gatewayPod
}

// Restart a worker pod. The pod is the first from a list of existing pods, if all is not specified.
// GracePeriod (in second) can be nil, which would mean using K8 default.
// The actionName specifies whether it was restarted or terminated to log the right thing.
func restartWorker(all bool, actionName string, gracePeriod *int64) {
	k8Client, err := internal.CreateK8Client()
	ensureNoError(err)

	workerPods, err := k8Client.GetWorkerPods()
	ensureNoError(err)

	if workerPods == nil || len(workerPods.Items) <= 0 {
		panic(errors.New(fmt.Sprintf("Expected to find workers in namespace %s, but none found.", k8Client.GetCurrentNamespace())))
	}

	if all {
		for _, worker := range workerPods.Items {
			err = k8Client.RestartPodWithGracePeriod(worker.Name, gracePeriod)
			ensureNoError(err)
			fmt.Printf("%s %s\n", actionName, worker.Name)
		}
	} else {
		workerPod := workerPods.Items[0]
		err = k8Client.RestartPodWithGracePeriod(workerPod.Name, gracePeriod)
		ensureNoError(err)

		fmt.Printf("%s %s\n", actionName, workerPod.Name)
	}
}
