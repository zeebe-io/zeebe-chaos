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

	"github.com/camunda/zeebe/clients/go/v8/pkg/zbc"
	"github.com/rs/zerolog/log"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

var (
	partitionId        int
	role               string
	nodeId             int
	processModelPath   string
	versionCount       int
	variables          string
	msgName            string
	awaitResult        bool
	broker1PartitionId int
	broker1Role        string
	broker1NodeId      int
	broker2PartitionId int
	broker2Role        string
	broker2NodeId      int
)

var Verbose bool
var KubeConfigPath string
var Namespace string
var ClientId string
var ClientSecret string
var Audience string
var JsonLogging bool

var rootCmd = &cobra.Command{
	Use:   "zbchaos",
	Short: "Zeebe chaos is a chaos experiment tool for Zeebe",
	Long: `A chaos experimenting toolkit for Zeebe.
    Perfect to inject some chaos into your brokers and gateways.`,
	PersistentPreRun: func(cmd *cobra.Command, args []string) {
		internal.Verbosity = Verbose
		internal.JsonLogging = JsonLogging
		if JsonLogging {
			internal.JsonLogger = log.With().Logger()
		}
		internal.Namespace = Namespace
		internal.KubeConfigPath = KubeConfigPath
		if ClientId != "" && ClientSecret != "" {
			internal.ZeebeClientCredential, _ = zbc.NewOAuthCredentialsProvider(&zbc.OAuthProviderConfig{
				ClientID:     ClientId,
				ClientSecret: ClientSecret,
				Audience:     Audience,
			})
		}
	},
}

func init() {
	rootCmd.PersistentFlags().BoolVarP(&Verbose, "verbose", "v", false, "verbose output")
	rootCmd.PersistentFlags().BoolVarP(&JsonLogging, "jsonLogging", "", false, "json logging output")
	rootCmd.PersistentFlags().StringVar(&KubeConfigPath, "kubeconfig", "", "path the the kube config that will be used")
	rootCmd.PersistentFlags().StringVarP(&Namespace, "namespace", "n", "", "connect to the given namespace")
	rootCmd.PersistentFlags().StringVarP(&ClientId, "clientId", "c", "", "connect using the given clientId")
	rootCmd.PersistentFlags().StringVar(&ClientSecret, "clientSecret", "", "connect using the given client secret")
	rootCmd.PersistentFlags().StringVar(&Audience, "audience", "", "connect using the given client secret")
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
