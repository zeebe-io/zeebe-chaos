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

	"github.com/camunda/zeebe/clients/go/v8/pkg/zbc"
	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/worker"
)

const jobType = "zbchaos"

func init() {
	rootCmd.AddCommand(workerCommand)
}

var workerCommand = &cobra.Command{
	Use:   "worker",
	Short: "Starts a worker for zbchaos jobs",
	Long:  "Starts a worker for zbchaos jobs that executes zbchaos commands",
	Run:   start_worker,
}

func start_worker(cmd *cobra.Command, args []string) {
	// the credentials are set via env var's
	credsProvider, err := zbc.NewOAuthCredentialsProvider(&zbc.OAuthProviderConfig{})
	if err != nil {
		panic(err)
	}

	client, err := zbc.NewClient(&zbc.ClientConfig{
		CredentialsProvider: credsProvider,
	})

	if err != nil {
		panic(err)
	}

	// Allow only one job at a time, otherwise job handling might interfere (e.g. override global vars)
	worker.CommandRunner = runZbChaosCommand
	jobWorker := client.NewJobWorker().JobType(jobType).Handler(worker.HandleZbChaosJob).MaxJobsActive(1).Open()
	jobWorker.AwaitClose()
}

func runZbChaosCommand(args []string, ctx context.Context) error {
	internal.LogInfo("Running command with args: %v ", args)
	rootCmd.SetArgs(args)
	_, err := rootCmd.ExecuteContextC(ctx)
	if err != nil {
		return err
	}
	return nil
}
