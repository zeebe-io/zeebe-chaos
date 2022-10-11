package cmd

import (
	"context"
	"os"
	"strings"
	"time"

	"github.com/camunda-cloud/zeebe/clients/go/pkg/entities"
	"github.com/camunda-cloud/zeebe/clients/go/pkg/worker"
	"github.com/camunda-cloud/zeebe/clients/go/pkg/zbc"
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

	var jobVariables ZbChaosVariables
	err := job.GetVariablesAs(&jobVariables)
	if err != nil {
		// Can't parse variables, no sense in retrying
		_, _ = client.NewFailJobCommand().JobKey(job.Key).Retries(0).Send(ctx)
		return
	}

	commandCtx, cancelCommand := context.WithTimeout(ctx, time.Duration(jobVariables.provider.timeout)*time.Second)
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
