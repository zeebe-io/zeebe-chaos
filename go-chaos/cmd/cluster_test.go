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
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_DescribeChangeStatusWithPending(t *testing.T) {
	// given
	topology := CurrentTopology{
		Version: 1,
		Brokers: []BrokerState{},
		LastChange: &LastChange{
			Id:     2,
			Status: "COMPLETED",
		},
		PendingChange: &TopologyChange{
			Id:              3,
			Status:          "IN_PROGRESS",
			InternalVersion: 1,
			Completed: []Operation{
				{
					Operation: "ADD",
					BrokerId:  1,
				},
			},
			Pending: []Operation{
				{
					Operation: "ADD_BROKER",
					BrokerId:  2,
				},
			},
		},
	}

	// then
	assert.Equal(t, ChangeStatusPending, describeChangeStatus(&topology, 3))
	assert.Equal(t, ChangeStatusCompleted, describeChangeStatus(&topology, 2))
	assert.Equal(t, ChangeStatusOutdated, describeChangeStatus(&topology, 1))
	assert.Equal(t, ChangeStatusUnknown, describeChangeStatus(&topology, 4))
}

func Test_DescribeChangeStatusWithoutChanges(t *testing.T) {
	// given
	topology := CurrentTopology{
		Version:       1,
		Brokers:       []BrokerState{},
		LastChange:    nil,
		PendingChange: nil,
	}

	// then
	assert.Equal(t, ChangeStatusUnknown, describeChangeStatus(&topology, 1))
	assert.Equal(t, ChangeStatusUnknown, describeChangeStatus(&topology, 2))
}

func Test_DescribeChangeStatusWithoutCompleted(t *testing.T) {
	// given
	topology := CurrentTopology{
		Version:    1,
		Brokers:    []BrokerState{},
		LastChange: nil,
		PendingChange: &TopologyChange{
			Id:              3,
			Status:          "IN_PROGRESS",
			InternalVersion: 1,
			Completed: []Operation{
				{
					Operation: "ADD",
					BrokerId:  1,
				},
			},
			Pending: []Operation{
				{
					Operation: "ADD_BROKER",
					BrokerId:  2,
				},
			},
		},
	}

	// then
	assert.Equal(t, ChangeStatusUnknown, describeChangeStatus(&topology, 1))
	assert.Equal(t, ChangeStatusPending, describeChangeStatus(&topology, 3))
	assert.Equal(t, ChangeStatusUnknown, describeChangeStatus(&topology, 4))
}
