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
	"context"
	"fmt"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/chaos-workers/go-chaos-worker/internal"
	"google.golang.org/protobuf/encoding/protojson"
)

func init() {
	rootCmd.AddCommand(topologyCmd)
}

var topologyCmd = &cobra.Command{
	Use:   "topology",
	Short: "Print the Zeebe topology deployed in the current namespace",
	Long:  `Shows the current Zeebe topology, in the current kubernetes namespace.`,
	Run: func(cmd *cobra.Command, args []string) {
		port := 26500
		k8Client := internal.CreateK8Client()
		closeFn, err := k8Client.GatewayPortForward(port)
		if err != nil {
			panic(err.Error())
		}
		defer closeFn()

		client, err := internal.CreateZeebeClient(port)
		if err != nil {
			panic(err.Error())
		}

		response, err := client.NewTopologyCommand().Send(context.TODO())
		if err != nil {
			panic(err)
		}

		m := protojson.MarshalOptions{EmitUnpopulated: true, Indent: "  "}
		valueJSON, err := m.Marshal(response)
		if err != nil {
			panic(err.Error())
		}

		fmt.Printf("\nResponse topology, %s", string(valueJSON))
		fmt.Println()
	},
}
