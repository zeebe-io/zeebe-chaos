package cmd

import (
	"bytes"
	"context"
	"fmt"
	"net/http"

	"github.com/camunda-cloud/zeebe/clients/go/pkg/zbc"
	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/chaos-workers/go-chaos-worker/internal"
	"google.golang.org/grpc"
	"k8s.io/client-go/tools/portforward"
	"k8s.io/client-go/transport/spdy"
)

func init() {
	rootCmd.AddCommand(topologyCmd)
}

var topologyCmd = &cobra.Command{
	Use:   "topology",
	Short: "Print the Zeebe topology deployed in the current namespace",
	Long:  `Shows the current Zeebe topology, in the current kubernetes namespace.`,
	Run: func(cmd *cobra.Command, args []string) {

		client := internal.CreateK8Client()
		names, err := client.GetGatewayPodNames()
		if err != nil {
			panic(err)
		}

		restClient := client.Clientset.CoreV1().RESTClient()

		// based on terratest code
		// https://github.com/gruntwork-io/terratest/blob/master/modules/k8s/tunnel.go#L187-L196
		//and
		// https://github.com/kubernetes/client-go/issues/51#issuecomment-436200428
		postEndpoint := restClient.Post()
		namespace := client.GetCurrentNamespace()
		portForwardCreateURL := postEndpoint.
			Resource("pods").
			Namespace(namespace).
			Name(names[0]).
			SubResource("portforward").
			URL()

		// Construct the spdy client required by the client-go portforward library
		config, err := client.ClientConfig.ClientConfig()
		if err != nil {
			panic(err)
		}

		transport, upgrader, err := spdy.RoundTripperFor(config)
		if err != nil {
			fmt.Printf("Error creating http client: %s\n", err)
			panic(err)
		}
		dialer := spdy.NewDialer(upgrader, &http.Client{Transport: transport}, "POST", portForwardCreateURL)

		// Construct a new PortForwarder struct that manages the instructed port forward tunnel
		stopChan, readyChan := make(chan struct{}, 1), make(chan struct{}, 1)
		out, errOut := new(bytes.Buffer), new(bytes.Buffer)
		ports := []string{fmt.Sprintf("%d:%d", 26500, 26500)}
		portforwarder, err := portforward.New(dialer, ports, stopChan, readyChan, out, errOut)
		if err != nil {
			fmt.Printf("Error creating port forwarding tunnel: %s", err)
			panic(err)
		}

		// Open the tunnel in a goroutine so that it is available in the background. Report errors to the main goroutine via
		// a new channel.
		errChan := make(chan error)
		go func() {
			errChan <- portforwarder.ForwardPorts()
		}()

		// Wait for an error or the tunnel to be ready
		select {
		case err = <-errChan:
			fmt.Printf("Error starting port forwarding tunnel: %s", err)
			panic(err)
		case <-portforwarder.Ready:
			fmt.Printf("Successfully created port forwarding tunnel")

			endpoint := fmt.Sprintf("localhost:%d", 26500)
			client, err := zbc.NewClient(&zbc.ClientConfig{
				GatewayAddress:         endpoint,
				DialOpts:               []grpc.DialOption{},
				UsePlaintextConnection: true,
			})
			if err != nil {
				panic(err.Error())
			}

			response, err := client.NewTopologyCommand().Send(context.TODO())
			if (err != nil) {
				panic(err)
			}
			fmt.Printf("Response topology, %s", response.String())
		}
	},
}
