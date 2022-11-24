package worker

import (
	"context"

	"github.com/camunda/zeebe/clients/go/v8/pkg/commands"
	"github.com/camunda/zeebe/clients/go/v8/pkg/pb"
	"github.com/camunda/zeebe/clients/go/v8/pkg/worker"
)

type FakeJobClient struct {
	worker.JobClient

	Key        int
	RetriesVal int
	ErrorMsg   string
	Failed     bool
	Succeeded  bool
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

func (f *FakeFailClient) Send(ctx context.Context) (*pb.FailJobResponse, error) {
	return &pb.FailJobResponse{}, nil
}
