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
	"os"
	"strings"
	"time"

	"github.com/camunda/zeebe/clients/go/v8/pkg/entities"
	"github.com/camunda/zeebe/clients/go/v8/pkg/worker"
	"github.com/camunda/zeebe/clients/go/v8/pkg/zbc"
	"github.com/spf13/cobra"
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

type ChaosProvider struct {
	path    string
	args    []string
	timeout int64
}

type ZbChaosVariables struct {
	clusterId string
	provider  ChaosProvider
}

func start_worker(cmd *cobra.Command, args []string) {
	credsProvider, err := zbc.NewOAuthCredentialsProvider(&zbc.OAuthProviderConfig{
		ClientID:               os.Getenv("TESTBENCH_CLIENT_ID"),
		ClientSecret:           os.Getenv("TESTBENCH_CLIENT_SECRET"),
		Audience:               strings.TrimSuffix(os.Getenv("TESTBENCH_ADDRESS"), ":443"),
		AuthorizationServerURL: os.Getenv("TESTBENCH_AUTHORIZATION_SERVER_URL"),
	})
	if err != nil {
		panic(err)
	}

	client, err := zbc.NewClient(&zbc.ClientConfig{
		GatewayAddress:      os.Getenv("TESTBENCH_ADDRESS"),
		CredentialsProvider: credsProvider,
	})

	if err != nil {
		panic(err)
	}

	jobWorker := client.NewJobWorker().JobType(jobType).Handler(handleZbChaosJob).Open()
	jobWorker.AwaitClose()
}

func handleZbChaosJob(client worker.JobClient, job entities.Job) {
	ctx := context.Background()

	jobVariables := ZbChaosVariables{
		provider: ChaosProvider{
			timeout: 15 * 60, // 15 minute default timeout
		},
	}
	err := job.GetVariablesAs(&jobVariables)
	if err != nil {
		// Can't parse variables, no sense in retrying
		_, _ = client.NewFailJobCommand().JobKey(job.Key).Retries(0).Send(ctx)
		return
	}

	timeout := time.Duration(jobVariables.provider.timeout) * time.Second
	commandCtx, cancelCommand := context.WithTimeout(ctx, timeout)
	defer cancelCommand()

	err = runZbChaosCommand(jobVariables.provider.args, commandCtx)
	if err != nil {
		_, _ = client.NewFailJobCommand().JobKey(job.Key).Retries(job.Retries - 1).Send(ctx)
		return
	}

	_, _ = client.NewCompleteJobCommand().JobKey(job.Key).Send(ctx)
}

func runZbChaosCommand(args []string, ctx context.Context) error {
	rootCmd.SetArgs(args)
	_, err := rootCmd.ExecuteContextC(ctx)
	if err != nil {
		return err
	}
	return nil
}
