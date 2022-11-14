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
	rootCmd.AddCommand(prepareCmd)
}

var prepareCmd = &cobra.Command{
	Use:   "prepare",
	Short: "Prepare the k8s deployment",
	Long:  `Prepares the k8s deployment - such as applying patches to statefulsets - to enable applying several zbchaos commands.`,
	Run: func(cmd *cobra.Command, args []string) {
		k8Client, err := internal.CreateK8Client()
		if err != nil {
			panic(err)
		}

		// Add Init container for dataloss simulation test
		err = k8Client.ApplyInitContainerPatch()

		if err != nil {
			panic(err)
		}

		fmt.Printf("Prepared cluster in namesapce %s\n", k8Client.GetCurrentNamespace())
		fmt.Println()
	},
}
