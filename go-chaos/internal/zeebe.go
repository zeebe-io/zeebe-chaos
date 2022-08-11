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

package internal

import (
	"context"
	"errors"
	"fmt"

	"github.com/camunda-cloud/zeebe/clients/go/pkg/pb"
	"github.com/camunda-cloud/zeebe/clients/go/pkg/zbc"
	"google.golang.org/grpc"
	v1 "k8s.io/api/core/v1"
)

func CreateZeebeClient(port int) (zbc.Client, error) {
	endpoint := fmt.Sprintf("localhost:%d", port)
	client, err := zbc.NewClient(&zbc.ClientConfig{
		GatewayAddress:         endpoint,
		DialOpts:               []grpc.DialOption{},
		UsePlaintextConnection: true,
	})
	if err != nil {
		return nil, err
	}

	return client, nil
}

func GetBrokerPodNameForPartitionAndRole(k8Client K8Client,
	zbClient zbc.Client,
	partitionId int,
	role string) (string, error) {
	pod, err := GetBrokerPodForPartitionAndRole(k8Client, zbClient, partitionId, role)
	if err != nil {
		return "", err
	}

	return pod.Name, nil
}

func GetBrokerPodForPartitionAndRole(k8Client K8Client,
	zbClient zbc.Client,
	partitionId int,
	role string) (*v1.Pod, error) {

	firstBrokerNodeId, err := GetBrokerNodeId(zbClient, partitionId, role)
	if err != nil {
		return nil, err
	}

	pods, err := k8Client.GetBrokerPods()
	if err != nil {
		return nil, err
	}

	return &pods.Items[firstBrokerNodeId], nil
}

func GetBrokerNodeId(zbClient zbc.Client, partitionId int, role string) (int32, error) {
	topologyResponse, err := zbClient.NewTopologyCommand().Send(context.TODO())
	if err != nil {
		return 0, err
	}

	partitionsCount := topologyResponse.PartitionsCount
	if partitionsCount < int32(partitionId) {
		errorMsg := fmt.Sprintf("Expected that given partition id (%d) is smaller then the partitions count %d, but was greater.", partitionId, partitionsCount)
		return 0, errors.New(errorMsg)
	}

	nodeId, err := extractNodeId(topologyResponse, partitionId, role)
	if err != nil {
		return 0, err
	}
	return nodeId, nil
}

func extractNodeId(topologyResponse *pb.TopologyResponse, partitionId int, role string) (int32, error) {
	roleValue, exist := pb.Partition_PartitionBrokerRole_value[role]
	if !exist {
		errorMsg := fmt.Sprintf("Expected a partition role, which is part of [LEADER, FOLLOWER, INACTIVE], but got %s.", role)
		return 0, errors.New(errorMsg)
	}

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
		return 0, errors.New(errorMsg)
	}

	return nodeId, nil
}
