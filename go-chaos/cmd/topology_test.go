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
	"bytes"
	"testing"

	"github.com/camunda-cloud/zeebe/clients/go/pkg/pb"
	"github.com/stretchr/testify/assert"
)

func Test_CreateBrokerTopologyString(t *testing.T) {
	// given
	brokerStub := pb.BrokerInfo{
		NodeId: 0,
		Partitions: []*pb.Partition{
			{
				PartitionId: 1,
				Role:        pb.Partition_LEADER,
			},
			{
				PartitionId: 4,
				Role:        pb.Partition_FOLLOWER,
			},
		},
	}

	// when
	brokerTopologyString := createBrokerTopologyString(5, &brokerStub)

	// then
	assert.Equal(t, "0\tLEADER (HEALTHY)\t\t\tFOLLOWER (HEALTHY)\t", brokerTopologyString)
}

func Test_CreateTopologyString(t *testing.T) {
	// given
	topologyStub := createTopologyStub()
	var buf bytes.Buffer
	expectedTopologyString := `Node      |Partition 1         |Partition 2         |Partition 3         |Partition 4
0         |LEADER (HEALTHY)    |                    |                    |FOLLOWER (HEALTHY)
1         |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |
2         |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |
3         |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)
4         |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)
`

	// when
	writeTopologyToOutput(&buf, &topologyStub)

	// then
	assert.Equal(t, expectedTopologyString, buf.String())
}

func createTopologyStub() pb.TopologyResponse {
	return pb.TopologyResponse{
		PartitionsCount:   4,
		ClusterSize:       5,
		ReplicationFactor: 3,
		Brokers: []*pb.BrokerInfo{
			{
				NodeId: 0,
				Partitions: []*pb.Partition{
					{
						PartitionId: 1,
						Role:        pb.Partition_LEADER,
					},
					{
						PartitionId: 4,
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
			{
				NodeId: 3,
				Partitions: []*pb.Partition{
					{
						PartitionId: 2,
						Role:        pb.Partition_FOLLOWER,
					},
					{
						PartitionId: 3,
						Role:        pb.Partition_FOLLOWER,
					},
					{
						PartitionId: 4,
						Role:        pb.Partition_LEADER,
					},
				},
			},
			{
				NodeId: 4,
				Partitions: []*pb.Partition{
					{
						PartitionId: 3,
						Role:        pb.Partition_FOLLOWER,
					},
					{
						PartitionId: 4,
						Role:        pb.Partition_FOLLOWER,
					},
				},
			},
		},
	}
}
