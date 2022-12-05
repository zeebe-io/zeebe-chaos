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

package worker

import (
	"context"
	"encoding/json"
	"time"

	"github.com/camunda/zeebe/clients/go/v8/pkg/entities"
	"github.com/camunda/zeebe/clients/go/v8/pkg/worker"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
	chaos_experiments "github.com/zeebe-io/zeebe-chaos/go-chaos/internal/chaos-experiments"
)

type CommandRunner func([]string, context.Context) error

type ChaosProvider struct {
	Path      string
	Arguments []string
	Timeout   int64
}

type AuthenticationProvider struct {
	Audience         string
	AuthorizationUrl string
	ClientId         string
	ClientSecret     string
	ContactPoint     string
}

type ZbChaosVariables struct {
	ClusterPlan           *string
	ClusterId             *string
	Provider              ChaosProvider
	AuthenticationDetails AuthenticationProvider
}

func HandleZbChaosJob(client worker.JobClient, job entities.Job, commandRunner CommandRunner) {
	ctx := context.Background()
	internal.LogInfo("Handle zbchaos job [key: %d]", job.Key)

	jobVariables := ZbChaosVariables{
		Provider: ChaosProvider{
			Timeout: 15 * 60, // 15 minute default Timeout
		},
	}
	err := job.GetVariablesAs(&jobVariables)
	if err != nil {
		internal.LogInfo("Can't parse variables %s, no sense in retrying will fail job. Error: %s", job.Variables, err.Error())
		_, _ = client.NewFailJobCommand().JobKey(job.Key).Retries(0).Send(ctx)
		return
	}

	timeout := time.Duration(jobVariables.Provider.Timeout) * time.Second
	commandCtx, cancelCommand := context.WithTimeout(ctx, timeout)
	defer cancelCommand()

	clusterAccessArgs := append([]string{}, "--namespace", *jobVariables.ClusterId+"-zeebe", "--clientId", jobVariables.AuthenticationDetails.ClientId, "--clientSecret", jobVariables.AuthenticationDetails.ClientSecret, "--audience", jobVariables.AuthenticationDetails.Audience)
	commandArgs := append(clusterAccessArgs, jobVariables.Provider.Arguments...)

	err = commandRunner(commandArgs, commandCtx)
	if err != nil {
		_, _ = client.NewFailJobCommand().JobKey(job.Key).Retries(job.Retries - 1).Send(ctx)
		return
	}

	_, _ = client.NewCompleteJobCommand().JobKey(job.Key).Send(ctx)
}

func HandleReadExperiments(client worker.JobClient, job entities.Job) {
	ctx := context.Background()
	internal.LogInfo("Handle read experiments job [key: %d]", job.Key)

	jobVariables := ZbChaosVariables{
		Provider: ChaosProvider{
			Timeout: 15 * 60, // 15 minute default Timeout
		},
	}
	err := job.GetVariablesAs(&jobVariables)
	if err != nil {
		internal.LogInfo("Can't parse variables %s, no sense in retrying will fail job. Error: %s", job.Variables, err.Error())
		_, _ = client.NewFailJobCommand().JobKey(job.Key).Retries(0).Send(ctx)
		return
	}

	experiments, err := chaos_experiments.ReadExperimentsForClusterPlan(*jobVariables.ClusterPlan)
	if err != nil {
		internal.LogInfo("Can't read experiments for given cluster plan %s, no sense in retrying will fail job. Error: %s", jobVariables.ClusterPlan, err.Error())
		_, _ = client.NewFailJobCommand().JobKey(job.Key).Retries(0).ErrorMessage(err.Error()).Send(ctx)
		return
	}

	command, err := client.NewCompleteJobCommand().JobKey(job.Key).VariablesFromObject(experiments)
	if err != nil {
		_, _ = client.NewFailJobCommand().JobKey(job.Key).Retries(0).ErrorMessage(err.Error()).Send(ctx)
		return
	}

	experimentsJson, _ := json.Marshal(&experiments) // we can ignore the error, the marshalling would have failed already before
	internal.LogInfo("Read experiments successful, complete job with: %s.", string(experimentsJson))

	_, _ = command.Send(ctx)
}
