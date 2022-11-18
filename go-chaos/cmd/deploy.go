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
	rootCmd.AddCommand(deployCmd)

	deployCmd.AddCommand(deployProcessModelCmd)

	deployProcessModelCmd.Flags().StringVar(&processModelPath, "processModelPath", "",
		"Specify the path to a BPMN process model, which should be deployed.")
	deployProcessModelCmd.Flags().IntVar(&multipleVersions, "multipleVersions", 10,
		"Specify how many different versions of a default BPMN and DMN model should be deployed. Useful for testing deployment distribution.")

	deployProcessModelCmd.MarkFlagsMutuallyExclusive("processModelPath", "multipleVersions")
}

var deployCmd = &cobra.Command{
	Use:   "deploy",
	Short: "Deploy certain resource",
	Long:  `Deploy certain resource, like process model(s) or kubernetes manifest.`,
}

var deployProcessModelCmd = &cobra.Command{
	Use:   "process",
	Short: "Deploy a process model to Zeebe",
	Long: `Deploy a process model to Zeebe. 
Can be used to deploy a specific process model or multiple version of a default BPMN and DMN model.
Defaults to the later, which is useful for experimenting with deployment distribution.`,
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
			panic(err.Error())
		}
		defer zbClient.Close()

		if len(processModelPath) == 0 {
			// deploy multi version
			err := internal.DeployDifferentVersions(zbClient.NewDeployResourceCommand(), int32(multipleVersions))
			if err != nil {
				panic(err.Error())
			}
			fmt.Printf("Deployed different process models of different types and versions to zeebe!\n")
		} else {
			processDefinitionKey, err := internal.DeployModel(zbClient, processModelPath)
			if err != nil {
				panic(err.Error())
			}

			fmt.Printf("Deployed given process model %s, under key %d!\n", processModelPath, processDefinitionKey)
		}
	},
}
