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
	rootCmd.AddCommand(datalossCmd)
	datalossCmd.AddCommand(datalossDelete)
	datalossCmd.AddCommand(datalossRecover)

	datalossDelete.Flags().IntVar(&nodeId, "nodeId", 1, "Specify the id of the broker")
	datalossRecover.Flags().IntVar(&nodeId, "nodeId", 1, "Specify the id of the broker")
}

var datalossCmd = &cobra.Command{
	Use:   "dataloss",
	Short: "Simulate dataloss and recover",
	Long:  `Simulate dataloss of a broker, and restart from it. "zbchaos prepare" must be executed once on this cluster before this command`,
}

var datalossDelete = &cobra.Command{
	Use:   "delete",
	Short: "Delete data of a broker",
	Long:  `Delete data of a broker by deleting the pvc and the pod`,
	Run: func(cmd *cobra.Command, args []string) {

		k8Client, err := internal.CreateK8Client()
		if err != nil {
			panic(err)
		}

		pod, err := internal.GetBrokerPodForNodeId(k8Client, int32(nodeId))

		if err != nil {
			fmt.Printf("Failed to get pod with nodeId %d %s\n", nodeId, err)
			panic(err)
		}

		k8Client.DeletePvcOfBroker(pod.Name)

		internal.SetInitContainerBlockFlag(k8Client, nodeId, "true")
		err = k8Client.RestartPod(pod.Name)
		if err != nil {
			fmt.Printf("Failed to restart pod %s\n", pod.Name)
			panic(err)
		}

		fmt.Printf("Deleted pod %s in namespace %s\n", pod.Name, k8Client.GetCurrentNamespace())
	},
}

var datalossRecover = &cobra.Command{
	Use:   "recover",
	Short: "Recover broker after full data loss",
	Long:  `Restart the broker after full data loss, wait until the data is fully recovered`,
	Run: func(cmd *cobra.Command, args []string) {

		k8Client, err := internal.CreateK8Client()
		if err != nil {
			panic(err)
		}

		err = internal.SetInitContainerBlockFlag(k8Client, nodeId, "false")
		if err != nil {
			panic(err)
		}

		err = k8Client.AwaitReadiness()
		if err != nil {
			fmt.Printf("%s\n", err)
		}
		fmt.Printf("Restarted broker %d\n", nodeId)
	},
}
