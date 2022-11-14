package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

func init() {
	rootCmd.AddCommand(prepareCmd)
}

var prepareCmd = &cobra.Command{
	Use:   "prepare",
	Short: "Prepare the k8s deployment",
	Long:  `Prepares the k8s deployment - such as applying patches to statefulsets - to enable applying several zbchaos commands.`,
	Run: func(cmd *cobra.Command, args []string) {
		k8Client, err := internal.CreateK8Client()
		if err != nil {
			panic(err)
		}

		// Add Init container for dataloss simulation test
		err = k8Client.ApplyInitContainerPatch()

		if err != nil {
			panic(err)
		}

		fmt.Printf("\nPrepared")
		fmt.Println()
	},
}
