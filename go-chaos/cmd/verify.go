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
	"time"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

var (
	version       int
	bpmnProcessId string
)

func init() {
	rootCmd.AddCommand(verifyCmd)
	verifyCmd.AddCommand(verifyReadinessCmd)
	verifyCmd.AddCommand(verifySteadyStateCmd)

	verifySteadyStateCmd.Flags().IntVar(&partitionId, "partitionId", 1, "Specify the id of the partition")
	verifySteadyStateCmd.Flags().StringVar(&processModelPath, "processModelPath", "", "Specify the path to a BPMN process model, which should be deployed and an instance should be created of.")
	verifySteadyStateCmd.Flags().StringVar(&variables, "variables", "", "Specify the variables for the process instance. Expect json string.")
	verifySteadyStateCmd.Flags().BoolVar(&awaitResult, "awaitResult", false, "Specify whether the completion of the created process instance should be awaited.")
	verifySteadyStateCmd.Flags().IntVar(&version, "version", -1, "Specify the version for which the instance should be created.")
	verifySteadyStateCmd.Flags().StringVar(&bpmnProcessId, "bpmnProcessId", "", "Specify the BPMN process ID for which the instance should be created.")
}

var verifyCmd = &cobra.Command{
	Use:   "verify",
	Short: "Verify certain properties",
	Long:  `Verify certain properties on Zeebe nodes, like readiness or steady-state.`,
}

var verifyReadinessCmd = &cobra.Command{
	Use:   "readiness",
	Short: "Verify readiness of a Zeebe nodes",
	Long:  `Verifies the readiness of Zeebe nodes.`,
	Run: func(cmd *cobra.Command, args []string) {

		k8Client, err := internal.CreateK8Client()
		ensureNoError(err)

		err = k8Client.AwaitReadiness()
		ensureNoError(err)

		fmt.Printf("All Zeebe nodes are running.\n")
	},
}

var verifySteadyStateCmd = &cobra.Command{
	Use:   "steady-state",
	Short: "Verify the steady state of the Zeebe system",
	Long: `Verifies the steady state of the Zeebe system.
A process model will be deployed and process instances are created until the required partition is reached.`,
	Run: func(cmd *cobra.Command, args []string) {
		k8Client, err := internal.CreateK8Client()
		ensureNoError(err)

		port := 26500
		closeFn := k8Client.MustGatewayPortForward(port, port)
		defer closeFn()

		zbClient, err := internal.CreateZeebeClient(port)
		ensureNoError(err)
		defer zbClient.Close()

		processInstanceCreator, err := internal.CreateProcessInstanceCreator(zbClient, internal.ProcessInstanceCreationOptions{
			BpmnProcessId:    bpmnProcessId,
			Version:          int32(version),
			ProcessModelPath: processModelPath,
			AwaitResult:      awaitResult,
			Variables:        variables,
		})
		ensureNoError(err)
		err = internal.CreateProcessInstanceOnPartition(processInstanceCreator, int32(partitionId), 30*time.Second)
		ensureNoError(err)

		fmt.Printf("The steady-state was successfully verified!\n")
	},
}
