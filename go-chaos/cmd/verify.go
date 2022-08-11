package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

func init() {
	rootCmd.AddCommand(verifyCmd)
	verifyCmd.AddCommand(verifyReadinessCmd)
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
