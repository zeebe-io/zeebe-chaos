// Copyright 2022 Camunda Services GmbH
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package cmd

import (
	"context"
	"fmt"
	"time"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

func init() {
	rootCmd.AddCommand(publishCmd)
	publishCmd.Flags().IntVar(&partitionId, "partitionId", 1, "Specify the id of the partition")
	publishCmd.Flags().StringVar(&msgName, "msgName", "msg", "Specify the name of the message, which should be published.")
}

var publishCmd = &cobra.Command{
	Use:   "publish",
	Short: "Publish a message",
	Long:  `Publish a message to a certain partition.`,
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

		correlationKey := internal.FindCorrelationKeyForPartition(partitionId)

		if Verbose {
			fmt.Printf("Send message with correaltion key '%s' (ASCII: %d) \n", correlationKey, int(correlationKey[0]))
		}

		messageResponse, err := zbClient.NewPublishMessageCommand().MessageName(msgName).CorrelationKey(correlationKey).TimeToLive(time.Minute * 5).Send(context.TODO())
		partitionIdFromKey := internal.ExtractPartitionIdFromKey(messageResponse.Key)

		if Verbose {
			fmt.Printf("Message was sent and returned key %d, which corresponds to partition: %d\n", messageResponse.Key, partitionIdFromKey)
		}
	},
}
