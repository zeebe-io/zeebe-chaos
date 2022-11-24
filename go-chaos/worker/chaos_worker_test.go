package worker

import (
	"context"
	"encoding/json"
	"errors"
	"testing"

	"github.com/camunda/zeebe/clients/go/v8/pkg/entities"
	"github.com/camunda/zeebe/clients/go/v8/pkg/pb"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_ShouldFailToHandleJobWithoutPayload(t *testing.T) {
	// given
	fakeJobClient := &FakeJobClient{}
	job := entities.Job{
		&pb.ActivatedJob{
			Key: 123,
		},
	}

	// when
	HandleZbChaosJob(fakeJobClient, job)

	// then
	assert.True(t, fakeJobClient.Failed)
	assert.Equal(t, 123, fakeJobClient.Key)
	assert.Equal(t, 0, fakeJobClient.RetriesVal)
}

func Test_ShouldHandleCommand(t *testing.T) {
	// given
	fakeJobClient := &FakeJobClient{}
	jsonString, err := createVariablesAsJson()
	var appliedArgs []string
	CommandRunner = func(args []string, ctx context.Context) error {
		appliedArgs = args
		return nil // success
	}

	require.NoError(t, err)
	job := entities.Job{
		&pb.ActivatedJob{
			Key:       123,
			Variables: jsonString,
		},
	}

	// when
	HandleZbChaosJob(fakeJobClient, job)

	// then
	assert.True(t, fakeJobClient.Succeeded)
	assert.Equal(t, 123, fakeJobClient.Key)
	var expectedArgs = []string{
		"--namespace", "clusterId-zeebe", "--clientId", "clientId", "--clientSecret", "clientSecret", "--audience", "audience", "disconnect", "gateway", "--all"}
	assert.Equal(t, expectedArgs, appliedArgs)
}

func Test_ShouldFailJobWhenHandleFails(t *testing.T) {
	// given
	fakeJobClient := &FakeJobClient{}
	jsonString, err := createVariablesAsJson()
	var appliedArgs []string
	CommandRunner = func(args []string, ctx context.Context) error {
		appliedArgs = args
		return errors.New("failed")
	}

	require.NoError(t, err)
	job := entities.Job{
		&pb.ActivatedJob{
			Retries:   3,
			Key:       123,
			Variables: jsonString,
		},
	}

	// when
	HandleZbChaosJob(fakeJobClient, job)

	// then
	assert.True(t, fakeJobClient.Failed)
	assert.Equal(t, 123, fakeJobClient.Key)
	assert.Equal(t, 2, fakeJobClient.RetriesVal)
	var expectedArgs = []string{
		"--namespace", "clusterId-zeebe", "--clientId", "clientId", "--clientSecret", "clientSecret", "--audience", "audience", "disconnect", "gateway", "--all"}
	assert.Equal(t, expectedArgs, appliedArgs)
}

func createVariablesAsJson() (string, error) {
	clusterId := "clusterId"
	variables := ZbChaosVariables{
		ClusterId: &clusterId,
		Provider: ChaosProvider{
			Path:      "zbchaos",
			Arguments: []string{"disconnect", "gateway", "--all"},
		},
		AuthenticationDetails: AuthenticationProvider{
			Audience:     "audience",
			ClientId:     "clientId",
			ClientSecret: "clientSecret",
			ContactPoint: "contactPoint",
		},
	}

	marshal, err := json.Marshal(variables)
	return string(marshal), err

}
