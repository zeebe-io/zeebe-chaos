package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

func init() {
	rootCmd.AddCommand(verifyCmd)
	verifyCmd.AddCommand(verifyReadinessCmd)
	verifyCmd.AddCommand(verifySteadyStateCmd)
}

var verifyCmd = &cobra.Command{
	Use:   "verify",
	Short: "Verify certain properties",
	Long:  `Verify certain properties on Zeebe nodes, like readiness or steady-state.`,
}

var verifyReadinessCmd = &cobra.Command{
	Use:   "readiness",
	Short: "Verify readiness of a Zeebe nodes",
	Long:  `Verifies the readiness of Zeebe nodes.`,
	Run: func(cmd *cobra.Command, args []string) {

		k8Client, err := internal.CreateK8Client()
		if err != nil {
			panic(err)
		}

		err = k8Client.AwaitReadiness()
		if err != nil {
			panic(err.Error())
		}

		fmt.Printf("All Zeebe nodes are running.\n")
	},
}

var verifySteadyStateCmd = &cobra.Command{
	Use:   "steady-state",
	Short: "Verify the steady state of the Zeebe system",
	Long: `Verifies the steady state of the Zeebe system.
A process model will be deployed and process instances are created until the required partition is reached.`,
	Run: func(cmd *cobra.Command, args []string) {
		k8Client, err := internal.CreateK8Client()
		if err != nil {
			panic(err)
		}

		port := 26500
		closeFn, err := k8Client.GatewayPortForward(port)
		if err != nil {
			panic(err.Error())
		}
		defer closeFn()

		zbClient, err := internal.CreateZeebeClient(port)
		if err != nil {
			panic(err.Error())
		}
		defer zbClient.Close()

		err = internal.DeployModel(zbClient)
		if err != nil {
			panic(err.Error())
		}
	},
}
