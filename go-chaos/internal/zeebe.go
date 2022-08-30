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
	"embed"
	"errors"
	"fmt"
	"os"
	"time"

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

	return GetBrokerPodForNodeId(k8Client, firstBrokerNodeId)
}

func GetBrokerPodForNodeId(k8Client K8Client, brokerNodeId int32) (*v1.Pod, error) {
	pods, err := k8Client.GetBrokerPods()
	if err != nil {
		return nil, err
	}

	if int(brokerNodeId) >= len(pods.Items) {
		return nil, errors.New(fmt.Sprintf("Expected to find Broker with nodeId %d, but running pod count is %d. Be aware node id's start with zero.", brokerNodeId, len(pods.Items)))
	}

	// the following works since the pods are returned in alphabetical order (and end with '-id')
	return &pods.Items[brokerNodeId], nil
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

// bpmnContent holds our static bpmn models, which are copied with the go:embed directive
//
//go:embed bpmn/*
var bpmnContent embed.FS

func DeployModel(client zbc.Client, fileName string) error {
	bpmnBytes, err := readBPMNFileOrDefault(fileName)
	if err != nil {
		return err
	}

	response, err := client.NewDeployProcessCommand().AddResource(bpmnBytes, fileName).Send(context.TODO())
	if err != nil {
		return err
	}

	if Verbosity {
		fmt.Printf("Deployed process model %s successful with key %d.\n", fileName, response.Processes[0].ProcessDefinitionKey)
	}
	return nil
}

// if file not exist we read our default BPMN process model and return the content
func readBPMNFileOrDefault(fileName string) ([]byte, error) {
	var bpmnBytes []byte
	var err error

	if len(fileName) == 0 {
		fileName = "bpmn/one_task.bpmn"

		bpmnBytes, err = bpmnContent.ReadFile(fileName)
		if err != nil {
			return nil, err
		}
	} else {
		bpmnBytes, err = os.ReadFile(fileName)
		if err != nil {
			return nil, err
		}
	}

	return bpmnBytes, nil
}

type ProcessInstanceCreator func(processName string) (*pb.CreateProcessInstanceResponse, error)

func CreateProcessInstanceOnPartition(piCreator ProcessInstanceCreator, requiredPartition int32, timeout time.Duration) error {
	timeoutChan := time.After(timeout)
	tickerChan := time.Tick(100 * time.Millisecond)

	partitionId := int32(0)
	for {
		select {
		case <-timeoutChan:
			return errors.New(fmt.Sprintf("Expected to create process instance on partition %d, but timed out after %s.", requiredPartition, timeout.String()))
		case <-tickerChan:
			processInstanceResponse, err := piCreator("benchmark") // client.NewCreateInstanceCommand().BPMNProcessId("benchmark").LatestVersion().Send(context.TODO())
			if err != nil {
				// we do not return here, since we want to retry until the timeout
				fmt.Printf("Encountered an error during process instance creation. Error: %s\n", err.Error())
				break
			}
			partitionId = ExtractPartitionIdFromKey(processInstanceResponse.ProcessInstanceKey)

			if Verbosity {
				fmt.Printf("Created process instance with key %d on partition %d, required partition %d.\n", processInstanceResponse.ProcessInstanceKey, partitionId, requiredPartition)
			}

			if partitionId == requiredPartition {
				return nil
			}
		}
	}
}

func ExtractPartitionIdFromKey(key int64) int32 {
	return int32(key >> 51)
}
