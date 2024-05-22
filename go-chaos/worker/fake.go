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

package worker

import (
	"context"
	"time"

	"github.com/camunda/camunda/clients/go/v8/pkg/commands"
	"github.com/camunda/camunda/clients/go/v8/pkg/pb"
	"github.com/camunda/camunda/clients/go/v8/pkg/worker"
)

type FakeJobClient struct {
	worker.JobClient

	Key          int
	RetriesVal   int
	RetryBackoff time.Duration
	ErrorMsg     string
	Failed       bool
	Succeeded    bool
	Variables    interface{}
}

type FakeCompleteClient struct {
	commands.CompleteJobCommandStep1
	commands.CompleteJobCommandStep2

	JobClient *FakeJobClient
}

func (f *FakeJobClient) NewCompleteJobCommand() commands.CompleteJobCommandStep1 {
	f.Succeeded = true
	return &FakeCompleteClient{JobClient: f}
}

func (f *FakeCompleteClient) JobKey(key int64) commands.CompleteJobCommandStep2 {
	f.JobClient.Key = int(key)
	return f
}

func (f *FakeCompleteClient) Send(ctx context.Context) (*pb.CompleteJobResponse, error) {
	return &pb.CompleteJobResponse{}, nil
}

func (f *FakeCompleteClient) VariablesFromObject(v interface{}) (commands.DispatchCompleteJobCommand, error) {
	f.JobClient.Variables = v
	return f, nil
}

// Fake FAIL Client

func (f *FakeJobClient) NewFailJobCommand() commands.FailJobCommandStep1 {
	f.Failed = true
	return &FakeFailClient{JobClient: f}
}

type FakeFailClient struct {
	commands.FailJobCommandStep1
	commands.FailJobCommandStep2
	commands.FailJobCommandStep3

	JobClient *FakeJobClient
}

func (f *FakeFailClient) JobKey(key int64) commands.FailJobCommandStep2 {
	f.JobClient.Key = int(key)
	return f
}

func (f *FakeFailClient) Retries(retries int32) commands.FailJobCommandStep3 {
	f.JobClient.RetriesVal = int(retries)
	return f
}

func (f *FakeFailClient) RetryBackoff(retryBackoff time.Duration) commands.FailJobCommandStep3 {
	f.JobClient.RetryBackoff = retryBackoff
	return f
}

func (f *FakeFailClient) ErrorMessage(errorMsg string) commands.FailJobCommandStep3 {
	f.JobClient.ErrorMsg = errorMsg
	return f
}

func (f *FakeFailClient) Send(ctx context.Context) (*pb.FailJobResponse, error) {
	return &pb.FailJobResponse{}, nil
}
