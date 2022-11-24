package worker

import (
	"context"
	"time"

	"github.com/camunda/zeebe/clients/go/v8/pkg/entities"
	"github.com/camunda/zeebe/clients/go/v8/pkg/worker"
)

var CommandRunner func([]string, context.Context) error

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
	ClusterId             *string
	Provider              ChaosProvider
	AuthenticationDetails AuthenticationProvider
}

func HandleZbChaosJob(client worker.JobClient, job entities.Job) {
	ctx := context.Background()

	jobVariables := ZbChaosVariables{
		Provider: ChaosProvider{
			Timeout: 15 * 60, // 15 minute default Timeout
		},
	}
	err := job.GetVariablesAs(&jobVariables)
	if err != nil {
		// Can't parse variables, no sense in retrying
		_, _ = client.NewFailJobCommand().JobKey(job.Key).Retries(0).Send(ctx)
		return
	}

	timeout := time.Duration(jobVariables.Provider.Timeout) * time.Second
	commandCtx, cancelCommand := context.WithTimeout(ctx, timeout)
	defer cancelCommand()

	clusterAccessArgs := append([]string{}, "--namespace", *jobVariables.ClusterId+"-zeebe", "--clientId", jobVariables.AuthenticationDetails.ClientId, "--clientSecret", jobVariables.AuthenticationDetails.ClientSecret, "--audience", jobVariables.AuthenticationDetails.Audience)
	commandArgs := append(clusterAccessArgs, jobVariables.Provider.Arguments...)

	err = CommandRunner(commandArgs, commandCtx)
	if err != nil {
		_, _ = client.NewFailJobCommand().JobKey(job.Key).Retries(job.Retries - 1).Send(ctx)
		return
	}

	_, _ = client.NewCompleteJobCommand().JobKey(job.Key).Send(ctx)
}
