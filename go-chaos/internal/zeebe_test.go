package internal

import (
	"testing"

	"github.com/camunda-cloud/zeebe/clients/go/pkg/pb"
	"github.com/stretchr/testify/assert"
)

func Test_ExtractNodeId(t *testing.T) {
	// given
	partitionId := 3
	role := "LEADER"
	topology := createTopologyStub()

	// when
	nodeId, err := extractNodeId(&topology, partitionId, role)

	// then
	assert.NoError(t, err)
	assert.Equal(t, int32(2), nodeId, "NodeId is not equal")
}

func Test_FailWhenRoleNotCorrect(t *testing.T) {
	// given
	role := "nil"

	// when
	_, err := extractNodeId(nil, 1, role)

	// then
	assert.Error(t, err)
}

func Test_FailWhenPartitionNotCorrect(t *testing.T) {
	// given
	role := "LEADER"
	partitionId := -1
	stub := createTopologyStub()

	// when
	_, err := extractNodeId(&stub, partitionId, role)

	// then
	assert.Error(t, err)
}

func Test_FailWhenPartitionNotFound(t *testing.T) {
	// given
	role := "LEADER"
	partitionId := 4
	stub := createTopologyStub()

	// when
	_, err := extractNodeId(&stub, partitionId, role)

	// then
	assert.Error(t, err)
}

func createTopologyStub() pb.TopologyResponse {
	return pb.TopologyResponse{
		Brokers: []*pb.BrokerInfo{
			{
				NodeId: 0,
				Partitions: []*pb.Partition{
					{
						PartitionId: 1,
						Role:        pb.Partition_LEADER,
					},
					{
						PartitionId: 2,
						Role:        pb.Partition_FOLLOWER,
					},
					{
						PartitionId: 3,
						Role:        pb.Partition_FOLLOWER,
					},
				},
			},
			{
				NodeId: 1,
				Partitions: []*pb.Partition{
					{
						PartitionId: 1,
						Role:        pb.Partition_FOLLOWER,
					},
					{
						PartitionId: 2,
						Role:        pb.Partition_LEADER,
					},
					{
						PartitionId: 3,
						Role:        pb.Partition_FOLLOWER,
					},
				},
			},
			{
				NodeId: 2,
				Partitions: []*pb.Partition{
					{
						PartitionId: 1,
						Role:        pb.Partition_FOLLOWER,
					},
					{
						PartitionId: 2,
						Role:        pb.Partition_FOLLOWER,
					},
					{
						PartitionId: 3,
						Role:        pb.Partition_LEADER,
					},
				},
			},
		},
	}
}

func Test_ExtractPartitionId(t *testing.T) {
	// given
	key := int64(6755399441055751)

	// when
	partitionId := ExtractPartitionIdFromKey(key)

	// then
	assert.Equal(t, int32(3), partitionId)
}
