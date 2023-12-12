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
	"io"
	"net/http"
	"time"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
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
			return printCurrentTopology(flags)
		},
	}
	var waitCommand = &cobra.Command{
		Use:   "wait",
		Short: "Waits for a topology change to complete",
		RunE: func(cmd *cobra.Command, args []string) error {
			return waitForChange(flags)
		},
	}

	rootCmd.AddCommand(clusterCommand)
	clusterCommand.AddCommand(statusCommand)
	clusterCommand.AddCommand(waitCommand)
	waitCommand.Flags().IntVar(&flags.changeId, "changeId", 0, "The id of the change to wait for")
}

func printCurrentTopology(flags *Flags) error {
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

	topology, err := queryTopology(port)
	if err != nil {
		return err
	}
	formatted, err := json.MarshalIndent(topology, "", "  ")
	if err != nil {
		return err
	}
	fmt.Println(string(formatted))
	return nil
}

func waitForChange(flags *Flags) error {
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

	for {
		topology, err := queryTopology(port)
		if err != nil {
			return err
		}
		changeStatus := describeChangeStatus(topology, int64(flags.changeId))
		switch changeStatus {
		case ChangeStatusCompleted:
			internal.LogInfo("Change %d completed successfully", flags.changeId)
			return nil
		case ChangeStatusFailed:
			internal.LogInfo("Change %d failed with status %s", flags.changeId, topology.LastChange.Status)
			return fmt.Errorf("change %d failed with status %s", flags.changeId, topology.LastChange.Status)
		case ChangeStatusOutdated:
			internal.LogInfo("Change %d is outdated but was most likely completed successfully, latest change is %d", flags.changeId, topology.LastChange.Id)
			return nil
		case ChangeStatusPending:
			competed := len(topology.PendingChange.Completed)
			pending := len(topology.PendingChange.Pending)
			total := competed + pending
			internal.LogInfo("Change %d is %s with %d/%d operations complete", flags.changeId, topology.PendingChange.Status, competed, total)
		case ChangeStatusUnknown:
			internal.LogInfo("Change %d not yet started", flags.changeId)
		}
		time.Sleep(5 * time.Second)
	}
}

type ChangeStatus string

const (
	ChangeStatusOutdated  ChangeStatus = "OUTDATED"
	ChangeStatusCompleted ChangeStatus = "COMPLETED"
	ChangeStatusFailed    ChangeStatus = "FAILED"
	ChangeStatusPending   ChangeStatus = "PENDING"
	ChangeStatusUnknown   ChangeStatus = "UNKNOWN"
)

func describeChangeStatus(topology *CurrentTopology, changeId int64) ChangeStatus {
	if topology.LastChange != nil && topology.LastChange.Id == changeId {
		if topology.LastChange.Status == "COMPLETED" {
			return ChangeStatusCompleted
		} else {
			return ChangeStatusFailed
		}
	} else if topology.LastChange != nil && topology.LastChange.Id > changeId {
		return ChangeStatusOutdated
	} else if topology.PendingChange != nil && topology.PendingChange.Id == changeId {
		return ChangeStatusPending
	} else {
		return ChangeStatusUnknown
	}
}

func queryTopology(port int) (*CurrentTopology, error) {
	url := fmt.Sprintf("http://localhost:%d/actuator/cluster", port)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(resp.Body)
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var topology CurrentTopology
	err = json.Unmarshal(body, &topology)
	if err != nil {
		return nil, err
	}
	return &topology, nil
}

type CurrentTopology struct {
	Version       int32
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
