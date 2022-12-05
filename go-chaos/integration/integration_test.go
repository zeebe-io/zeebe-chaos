package integration

import (
	"context"
	"fmt"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"

	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/wait"
)

func Test_ShouldBeAbleToDeployChaosModels(t *testing.T) {
	// given
	ctx := context.Background()
	container := CreateEZEContainer(t, ctx)
	defer container.StopLogProducer()
	mappedPort, err := container.MappedPort(ctx, "26500/tcp")
	require.NoError(t, err)
	zeebeClient, err := internal.CreateZeebeClient(mappedPort.Int())
	require.NoError(t, err)

	// when
	err = internal.DeployChaosModels(zeebeClient)

	// then
	require.NoError(t, err)
}

func CreateEZEContainer(t *testing.T, ctx context.Context) testcontainers.Container {
	req := testcontainers.ContainerRequest{
		Image:        "ghcr.io/camunda-community-hub/eze:1.0.2",
		ExposedPorts: []string{"26500/tcp"},
		WaitingFor:   wait.ForLog("EZE agent started at 0.0.0.0:26500"),
	}
	container, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: req,
		Started:          true,
	})
	require.NoError(t, err)

	err = container.StartLogProducer(ctx)
	require.NoError(t, err)
	printer := Printer{}
	container.FollowOutput(&printer)
	return container
}

type Printer struct {
}

func (p *Printer) Accept(l testcontainers.Log) {
	fmt.Println(string(l.Content))
}
