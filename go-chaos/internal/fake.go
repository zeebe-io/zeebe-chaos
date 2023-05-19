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
	"github.com/camunda/zeebe/clients/go/v8/pkg/commands"
	"github.com/camunda/zeebe/clients/go/v8/pkg/entities"
	"github.com/camunda/zeebe/clients/go/v8/pkg/pb"
	"github.com/camunda/zeebe/clients/go/v8/pkg/zbc"
)

/*
Fake implementation of the Zeebe client.

Can be used for unit tests to verify whether the right properties are set. Should be continously extended to
increase test coverage.
*/
type FakeClient struct {
	zbc.Client
	commands.CreateInstanceCommandStep1
	commands.CreateInstanceCommandStep2
	commands.CreateInstanceCommandStep3
	commands.DispatchCreateInstanceCommand

	commands.ActivateJobsCommandStep1
	commands.CompleteJobCommandStep1

	fakeResultCommand FakeResultCommand
	fakeActivateCommand FakeActivateCommand
	fakeCompleteCommand FakeCompleteCommand

	processId   string
	version     int32
	vars        string
	awaitResult bool
	jobType     string
	jobKey      int64
}

type FakeResultCommand struct {
	commands.CreateInstanceWithResultCommandStep1
	commands.DispatchCreateInstanceWithResultCommand
}

type FakeActivateCommand struct {
	maxActivate int32

	commands.ActivateJobsCommandStep2
	commands.ActivateJobsCommandStep3
	commands.DispatchActivateJobsCommand
}

type FakeCompleteCommand struct {
	commands.CompleteJobCommandStep2
	commands.DispatchCompleteJobCommand
}

func (f *FakeClient) NewCreateInstanceCommand() commands.CreateInstanceCommandStep1 {
	return f
}

func (f *FakeClient) NewActivateJobsCommand() commands.ActivateJobsCommandStep1 {
	return f
}

func (f *FakeClient) NewCompleteJobCommand() commands.CompleteJobCommandStep1 {
	return f
}

func (f *FakeClient) BPMNProcessId(id string) commands.CreateInstanceCommandStep2 {
	f.processId = id
	return f
}

func (f *FakeClient) Version(v int32) commands.CreateInstanceCommandStep3 {
	f.version = v
	return f
}

func (f *FakeClient) VariablesFromString(json string) (commands.CreateInstanceCommandStep3, error) {
	f.vars = json
	return f, nil
}

func (f *FakeClient) WithResult() commands.CreateInstanceWithResultCommandStep1 {
	f.awaitResult = true
	return &f.fakeResultCommand
}

func (f *FakeClient) JobType(jobType string) commands.ActivateJobsCommandStep2 {
	f.jobType = jobType
	return &f.fakeActivateCommand
}

func (f *FakeClient) JobKey(key int64) commands.CompleteJobCommandStep2 {
	f.jobKey = key
	return &f.fakeCompleteCommand
}

func (f *FakeActivateCommand) MaxJobsToActivate(maxActivate int32) commands.ActivateJobsCommandStep3 {
	f.maxActivate = maxActivate
	return f
}

func (f *FakeActivateCommand) Send(ctx context.Context) ([]entities.Job, error) {
	return []entities.Job{
		{
			&pb.ActivatedJob{
				Key: 1,
			},
		},
		}, nil
}

func (f *FakeCompleteCommand) Send(ctx context.Context) (*pb.CompleteJobResponse, error) {
	return nil, nil
}
func (f *FakeClient) Send(ctx context.Context) (*pb.CreateProcessInstanceResponse, error) {
	return &pb.CreateProcessInstanceResponse{ProcessInstanceKey: 0xCAFE}, nil
}

func (f *FakeResultCommand) Send(ctx context.Context) (*pb.CreateProcessInstanceWithResultResponse, error) {
	return &pb.CreateProcessInstanceWithResultResponse{ProcessInstanceKey: 0xCAFE}, nil
}
