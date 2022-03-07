package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "zbchaos",
	Short: "Zeebe chaos is a chaos experiment tool for Zeebe",
	Long: `A chaos experimenting toolkit for Zeebe.
    Perfect to inject some chaos into your brokers and gateways.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Do Stuff Here
		fmt.Println("Zeebe Chaos")
	},
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
