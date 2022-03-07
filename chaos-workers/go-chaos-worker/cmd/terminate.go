package cmd

import (
	"context"
	"errors"
	"fmt"

	"github.com/camunda-cloud/zeebe/clients/go/pkg/pb"
	"github.com/camunda-cloud/zeebe/clients/go/pkg/zbc"
	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/chaos-workers/go-chaos-worker/internal"
)

var (
	partitionId int
	role        string
)

func init() {
	rootCmd.AddCommand(terminateCmd)

	terminateCmd.Flags().StringVar(&role, "role", "LEADER", "Specify the partition role [LEADER, FOLLOWER]")
	terminateCmd.Flags().IntVar(&partitionId, "partitionId", 1, "Specify the id of the partition")

	if err := terminateCmd.MarkFlagRequired("role"); err != nil {
		panic(err)
	}

	if err := terminateCmd.MarkFlagRequired("partitionId"); err != nil {
		panic(err)
	}
}

var terminateCmd = &cobra.Command{
	Use:   "terminate",
	Short: "Terminates a Zeebe broker",
	Long:  `Terminates a Zeebe broker with a certain role and given partition.`,
	Run: func(cmd *cobra.Command, args []string) {
		port := 26500
		k8Client := internal.CreateK8Client()
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
		broker, err := getBrokerToTerminate(k8Client, zbClient)
		if err != nil {
			panic(err.Error())
		}

		err = k8Client.TerminatePod(broker)
		if err != nil {
			panic(err.Error())
		}

		fmt.Printf("\nDeleted %s", broker)
		fmt.Println()
	},
}

func getBrokerToTerminate(k8Client internal.K8Client, zbClient zbc.Client) (string, error) {
	topologyResponse, err := zbClient.NewTopologyCommand().Send(context.TODO())
	if err != nil {
		return "", err
	}

	assertPartitionsCount(topologyResponse)

	roleValue, exist := pb.Partition_PartitionBrokerRole_value[role]
	assertRoleExists(exist)

	nodeId := extractNodeId(topologyResponse, roleValue)

	brokerPodNames, err := k8Client.GetBrokerPodNames()
	if err != nil {
		return "", err
	}

	broker := brokerPodNames[nodeId]
	return broker, nil
}

func assertRoleExists(exist bool) {
	if !exist {
		errorMsg := fmt.Sprintf("Expected a partition role, which is part of [LEADER, FOLLOWER], but got %s.", role)
		panic(errors.New(errorMsg))
	}
}

func assertPartitionsCount(topologyResponse *pb.TopologyResponse) {
	partitionsCount := topologyResponse.PartitionsCount
	if partitionsCount < int32(partitionId) {
		errorMsg := fmt.Sprintf("Expected that given partition id (%d) is smaller then the partitions count %d, but was greater.", partitionId, partitionsCount)
		panic(errors.New(errorMsg))
	}
}

func extractNodeId(topologyResponse *pb.TopologyResponse, roleValue int32) int32 {
	nodeId := int32(-1)
	for _, broker := range topologyResponse.Brokers {
		for _, partition := range broker.Partitions {
			if partition.PartitionId == int32(partitionId) &&
				partition.Role == pb.Partition_PartitionBrokerRole(roleValue) {
				nodeId = broker.NodeId
				break
			}
		}
	}

	if nodeId == int32(-1) {
		errorMsg := fmt.Sprintf("Expected to find broker with given partition id (%d) and role %s, but found nothing.", partitionId, role)
		panic(errors.New(errorMsg))
	}
	return nodeId
}
