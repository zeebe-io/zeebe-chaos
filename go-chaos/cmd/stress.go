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

var (
	cpuStress    bool
	memoryStress bool
	ioStress     bool
	timeoutSec   string
)

func init() {
	rootCmd.AddCommand(stress)

	stress.PersistentFlags().BoolVar(&cpuStress, "cpu", true, "Specify whether CPU stress should put on the node")
	stress.PersistentFlags().BoolVar(&memoryStress, "memory", false, "Specify whether memory stress should put on the node")
	stress.PersistentFlags().BoolVar(&ioStress, "io", false, "Specify whether io stress should put on the node")
	stressBroker.PersistentFlags().StringVar(&timeoutSec, "timeout", "30", "Specify how long the stress should be executed in seconds. Default: 30")

	// stress brokers
	stress.AddCommand(stressBroker)

	stressBroker.Flags().IntVar(&nodeId, "nodeId", -1, "Specify the nodeId of the Broker")
	stressBroker.Flags().StringVar(&role, "role", "LEADER", "Specify the partition role [LEADER, FOLLOWER] of the Broker")
	stressBroker.Flags().IntVar(&partitionId, "partitionId", 1, "Specify the partition id of the Broker")

	stress.AddCommand(stressGateway)

}

var stress = &cobra.Command{
	Use:   "stress",
	Short: "Put stress on a Zeebe node",
	Long:  `Put stress on a Zeebe node. Node can be choose from gateway or brokers. Stress can be of different kind: memory, io or CPU. The different stress types can be combined.`,
}

var stressBroker = &cobra.Command{
	Use:   "broker",
	Short: "Put stress on a Zeebe Broker",
	Long:  `Put stress on a Zeebe Broker. Broker can be identified via ID or partition and role. Stress can be of different kinds: memory, io or CPU.`,
	Run: func(cmd *cobra.Command, args []string) {
		internal.Verbosity = Verbose
		k8Client, err := internal.CreateK8Client()
		ensureNoError(err)

		port := 26500
		closeFn := k8Client.MustGatewayPortForward(port, port)
		defer closeFn()

		zbClient, err := internal.CreateZeebeClient(port)
		ensureNoError(err)
		defer zbClient.Close()

		pod := getBrokerPod(k8Client, zbClient, nodeId, partitionId, role)
		fmt.Printf("Put stress on %s\n", pod.Name)

		stressType := internal.StressType{CpuStress: cpuStress, IoStress: ioStress, MemStress: memoryStress}
		err = internal.PutStressOnPod(k8Client, timeoutSec, pod.Name, stressType)
		ensureNoError(err)
	},
}

var stressGateway = &cobra.Command{
	Use:   "gateway",
	Short: "Put stress on a Zeebe Gateway",
	Long:  `Put stress on a Zeebe Gateway. Stress can be of different kinds: memory, io or CPU.`,
	Run: func(cmd *cobra.Command, args []string) {
		internal.Verbosity = Verbose
		k8Client, err := internal.CreateK8Client()
		ensureNoError(err)

		pod := getGatewayPod(k8Client)
		fmt.Printf("Put stress on %s\n", pod.Name)

		stressType := internal.StressType{CpuStress: cpuStress, IoStress: ioStress, MemStress: memoryStress}
		err = internal.PutStressOnPod(k8Client, timeoutSec, pod.Name, stressType)
		ensureNoError(err)
	},
}
