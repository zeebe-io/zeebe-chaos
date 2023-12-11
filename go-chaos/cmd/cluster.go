// Copyright 2023 Camunda Services GmbH
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
	"encoding/json"
	"fmt"
	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
	"io"
	"net/http"
)

func AddClusterCommands(rootCmd *cobra.Command, flags *Flags) {
	var clusterCommand = &cobra.Command{
		Use:   "cluster",
		Short: "Interact with the Cluster API",
		Long:  "Can be used query cluster topology and to request dynamic scaling",
	}
	var statusCommand = &cobra.Command{
		Use:   "status",
		Short: "Queries the current cluster topology",
		RunE: func(cmd *cobra.Command, args []string) error {
			return queryTopology(flags)
		},
	}

	rootCmd.AddCommand(clusterCommand)
	clusterCommand.AddCommand(statusCommand)
}

func queryTopology(flags *Flags) error {
	k8Client, err := createK8ClientWithFlags(flags)
	if err != nil {
		panic(err)
	}

	err = k8Client.AwaitReadiness()
	if err != nil {
		return err
	}

	port := 9600
	closePortForward := k8Client.MustGatewayPortForward(port, port)
	defer closePortForward()
	url := fmt.Sprintf("http://localhost:%d/actuator/cluster", port)
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(resp.Body)
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	var topology CurrentTopology
	err = json.Unmarshal(body, &topology)
	if err != nil {
		return err
	}

	formatted, err := json.MarshalIndent(topology, "", "  ")
	if err != nil {
		return err
	}

	internal.LogInfo(fmt.Sprintf("Current topology: %s", string(formatted)))
	return err

}

type CurrentTopology struct {
	ChangeId      int32
	Brokers       []BrokerState
	LastChange    *LastChange
	PendingChange *TopologyChange
}

type BrokerState struct {
	Id            int32
	State         string
	Version       int64
	LastUpdatedAt string
	Partitions    []PartitionState
}

type PartitionState struct {
	Id       int32
	State    string
	Priority int32
}

type LastChange struct {
	Id          int64
	Status      string
	StartedAt   string
	CompletedAt string
}

type TopologyChange struct {
	Id              int64
	Status          string
	StartedAt       string
	CompletedAt     string
	InternalVersion int64
	Completed       []Operation
	Pending         []Operation
}

type Operation struct {
	Operation   string
	BrokerId    int32
	PartitionId int32
	Priority    int32
}
