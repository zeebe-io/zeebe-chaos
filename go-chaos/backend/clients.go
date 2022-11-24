package backend

import (
	"github.com/camunda/zeebe/clients/go/v8/pkg/zbc"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

func ConnectToZeebeCluster(k8Client internal.K8Client) (zbc.Client, func(), error) {
	port := 26500
	closeFn := k8Client.MustGatewayPortForward(port, port)

	zbClient, err := internal.CreateZeebeClient(port)
	if err != nil {
		return nil, closeFn, err
	}
	return zbClient, func() {
		zbClient.Close()
		closeFn()
	}, nil
}
