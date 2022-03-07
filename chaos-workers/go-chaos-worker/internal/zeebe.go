package internal

import (
	"fmt"

	"github.com/camunda-cloud/zeebe/clients/go/pkg/zbc"
	"google.golang.org/grpc"
)

func CreateZeebeClient(port int) (zbc.Client, error) {
	endpoint := fmt.Sprintf("localhost:%d", port)
	client, err := zbc.NewClient(&zbc.ClientConfig{
		GatewayAddress:         endpoint,
		DialOpts:               []grpc.DialOption{},
		UsePlaintextConnection: true,
	})
	if err != nil {
		return nil, err
	}

	return client, nil
}
