package cmd

import (
	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/chaos-workers/go-chaos-worker/internal"
)

func init() {
	rootCmd.AddCommand(getZeebePodsCmd)
}

var getZeebePodsCmd = &cobra.Command{
	Use:   "pods",
	Short: "Print the Zeebe pods",
	Long:  `Shows all Zeebe related kubernetes pods.`,
	Run: func(cmd *cobra.Command, args []string) {
		client := internal.CreateK8Client()
		client.GetZeebePods()
	},
}
