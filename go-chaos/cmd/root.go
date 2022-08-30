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
	"os"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

var (
	partitionId        int
	role               string
	nodeId             int
	msgName            string
	processModelPath   string
	variables          string
	msgName            string
	broker1PartitionId int
	broker1Role        string
	broker1NodeId      int
	broker2PartitionId int
	broker2Role        string
	broker2NodeId      int
)

var Verbose bool
var rootCmd = &cobra.Command{
	Use:   "zbchaos",
	Short: "Zeebe chaos is a chaos experiment tool for Zeebe",
	Long: `A chaos experimenting toolkit for Zeebe.
    Perfect to inject some chaos into your brokers and gateways.`,
	PersistentPreRun: func(cmd *cobra.Command, args []string) {
		internal.Verbosity = Verbose
	},
}

func init() {
	rootCmd.PersistentFlags().BoolVarP(&Verbose, "verbose", "v", false, "verbose output")
}

func NewCmd() *cobra.Command {
	return rootCmd
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
