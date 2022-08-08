package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/chaos-workers/go-chaos-worker/internal"
)

func init() {
	rootCmd.AddCommand(getZeebeBrokersCmd)
}

var getZeebeBrokersCmd = &cobra.Command{
	Use:   "brokers",
	Short: "Print the name of the Zeebe broker pods",
	Long:  `Show all names of deployed Zeebe brokers, in the current kubernetes namespace.`,
	Run: func(cmd *cobra.Command, args []string) {
		client := internal.CreateK8Client()
		pods, err := client.GetBrokerPodNames()
		if err != nil {
			panic(err.Error())
		}

		for _, item := range pods {
			fmt.Printf("%s\n", item)
		}
	},
}
