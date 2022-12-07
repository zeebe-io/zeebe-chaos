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
	"fmt"
	"time"

	"github.com/camunda/zeebe/clients/go/v8/pkg/entities"
	"github.com/camunda/zeebe/clients/go/v8/pkg/worker"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
	chaos_experiments "github.com/zeebe-io/zeebe-chaos/go-chaos/internal/chaos-experiments"
)

type CommandRunner func([]string, context.Context) error

type ChaosProvider struct {
	// the path will always be zbchaos
	Path string
	// the arguments for zbchaos, like sub-commands and parameters
	Arguments []string
	// the timeout for the command
	Timeout int64
}

type AuthenticationProvider struct {
	Audience         string
	AuthorizationUrl string
	ClientId         string
	ClientSecret     string
	ContactPoint     string
}

type ZbChaosVariables struct {
	// title of the current chaos experiment
	Title *string
	// the current cluster plan we run against the chaos experiment
	ClusterPlan *string
	// the target cluster for our chaos experiment
	ClusterId *string
	// the chaos provider, which contain details to the chaos experiment
	Provider ChaosProvider
	// the authentication details for our target cluster
	AuthenticationDetails AuthenticationProvider
}

func HandleZbChaosJob(client worker.JobClient, job entities.Job, commandRunner CommandRunner) {
	ctx := context.Background()

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

	loggingCtx := createLoggingContext(jobVariables, job)
	// we set here the current log context, this only works if we handle on job per time (which we currently have configured)
	// TODO make it more thread local
	internal.LoggingContext = loggingCtx
	defer func() {
		internal.LoggingContext = nil
	}() // reset the context
	internal.LogInfo("Handle zbchaos job [key: %d]", job.Key)

	timeout := time.Duration(jobVariables.Provider.Timeout) * time.Second
	commandCtx, cancelCommand := context.WithTimeout(ctx, timeout)
	defer cancelCommand()

	var clusterAccessArgs []string
	if *jobVariables.ClusterId != "" {
		clusterAccessArgs = append(clusterAccessArgs, "--namespace", *jobVariables.ClusterId+"-zeebe", "--clientId", jobVariables.AuthenticationDetails.ClientId, "--clientSecret", jobVariables.AuthenticationDetails.ClientSecret, "--audience", jobVariables.AuthenticationDetails.Audience)
	} // else we run local against our k8 context
	commandArgs := append(clusterAccessArgs, jobVariables.Provider.Arguments...)

	err = commandRunner(commandArgs, commandCtx)
	if err != nil {
		_, _ = client.NewFailJobCommand().JobKey(job.Key).Retries(job.Retries - 1).Send(ctx)
		return
	}

	_, _ = client.NewCompleteJobCommand().JobKey(job.Key).Send(ctx)
}

func createLoggingContext(jobVariables ZbChaosVariables, job entities.Job) map[string]interface{} {
	loggingCtx := make(map[string]interface{})
	loggingCtx["logging.googleapis.com/labels"] = map[string]string{
		"clusterId":          *jobVariables.ClusterId,
		"jobKey":             fmt.Sprintf("%d", job.Key),
		"processInstanceKey": fmt.Sprintf("%d", job.ProcessInstanceKey),
		"title":              *jobVariables.Title,
	}
	loggingCtx["logging.googleapis.com/operation"] = map[string]string{"id": fmt.Sprintf("%d", job.Key)}
	return loggingCtx
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
		internal.LogInfo("Can't read experiments for given cluster plan %s, no sense in retrying will fail job. Error: %s", *jobVariables.ClusterPlan, err.Error())
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
