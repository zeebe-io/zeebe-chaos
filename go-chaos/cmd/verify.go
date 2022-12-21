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
	"time"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

func AddVerifyCommands(rootCmd *cobra.Command, flags *Flags) {

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

			k8Client, err := createK8ClientWithFlags(flags)
			ensureNoError(err)

			err = k8Client.AwaitReadiness()
			ensureNoError(err)

			internal.LogInfo("All Zeebe nodes are running.")
		},
	}

	var verifyInstanceCreation = &cobra.Command{
		Use:   "instance-creation",
		Short: "Verify the instance creation",
		Long: `Verifies that an instance from a specific process model can be created on a specific partition.
Process instances are created until the required partition is reached.`,
		Run: func(cmd *cobra.Command, args []string) {
			k8Client, err := createK8ClientWithFlags(flags)
			ensureNoError(err)

			port := 26500
			closeFn := k8Client.MustGatewayPortForward(port, port)
			defer closeFn()

			zbClient, err := internal.CreateZeebeClient(port)
			ensureNoError(err)
			defer zbClient.Close()

			processInstanceCreator, err := internal.CreateProcessInstanceCreator(zbClient, internal.ProcessInstanceCreationOptions{
				BpmnProcessId: flags.bpmnProcessId,
				Version:       int32(flags.version),
				AwaitResult:   flags.awaitResult,
				Variables:     flags.variables,
			})
			ensureNoError(err)
			if flags.awaitResult {
				internal.LogVerbose("We await the result of the process instance creation, thus we skip the partition id check.")
				flags.partitionId = 0
			}
			err = internal.CreateProcessInstanceOnPartition(processInstanceCreator, int32(flags.partitionId), time.Duration(flags.timeoutInSec)*time.Second)
			ensureNoError(err)

			internal.LogInfo("The steady-state was successfully verified!")
		},
	}

	rootCmd.AddCommand(verifyCmd)
	verifyCmd.AddCommand(verifyReadinessCmd)
	verifyCmd.AddCommand(verifyInstanceCreation)

	verifyInstanceCreation.Flags().IntVar(&flags.partitionId, "partitionId", 1, "Specify the id of the partition")
	verifyInstanceCreation.Flags().StringVar(&flags.variables, "variables", "", "Specify the variables for the process instance. Expect json string.")
	verifyInstanceCreation.Flags().BoolVar(&flags.awaitResult, "awaitResult", false,
		"Specify whether the completion of the created process instance should be awaited. Note: if this flag is specified it is expected that it doesn't matter where the instance creation is happening, partition id is not validated and creation not retried.")
	verifyInstanceCreation.Flags().IntVar(&flags.timeoutInSec, "timeoutInSec", 30, "Specify the timeout of the verification in seconds")

	verifyInstanceCreation.Flags().StringVar(&flags.bpmnProcessId, "bpmnProcessId", "benchmark", "Specify the BPMN process ID for which the instance should be created.")
	verifyInstanceCreation.Flags().IntVar(&flags.version, "version", -1, "Specify the version for which the instance should be created, defaults to latest version.")
}
