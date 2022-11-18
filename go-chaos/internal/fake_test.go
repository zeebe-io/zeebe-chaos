package internal

import (
	"context"

	"github.com/camunda/zeebe/clients/go/v8/pkg/commands"
	"github.com/camunda/zeebe/clients/go/v8/pkg/pb"
	"github.com/camunda/zeebe/clients/go/v8/pkg/worker"
	"google.golang.org/grpc"
)

type FakeZeebeClient struct {
	commands.DeployResourceCommand
	fakeGatewayClient pb.GatewayClient

	deployments map[string][]byte
}

type FakeGatewayClient struct {

}

func (f *FakeZeebeClient) AddResource(definition []byte, name string) *commands.DeployResourceCommand {

	f.deployments[name] = definition
	return &f.DeployResourceCommand
}


func (f *FakeZeebeClient) Send(ctx context.Context) (*pb.DeployResourceResponse, error) {
	// simplified for now - need to be extended later (add keys etc.)
	return &pb.DeployResourceResponse{}, nil
}


func (f FakeGatewayClient) ActivateJobs(ctx context.Context, in *pb.ActivateJobsRequest, opts ...grpc.CallOption) (pb.Gateway_ActivateJobsClient, error) {
	panic("implement me")
}

func (f FakeGatewayClient) CancelProcessInstance(ctx context.Context, in *pb.CancelProcessInstanceRequest, opts ...grpc.CallOption) (*pb.CancelProcessInstanceResponse, error) {
	panic("implement me")
}

func (f FakeGatewayClient) CompleteJob(ctx context.Context, in *pb.CompleteJobRequest, opts ...grpc.CallOption) (*pb.CompleteJobResponse, error) {
	panic("implement me")
}

func (f FakeGatewayClient) CreateProcessInstance(ctx context.Context, in *pb.CreateProcessInstanceRequest, opts ...grpc.CallOption) (*pb.CreateProcessInstanceResponse, error) {
	panic("implement me")
}

func (f FakeGatewayClient) CreateProcessInstanceWithResult(ctx context.Context, in *pb.CreateProcessInstanceWithResultRequest, opts ...grpc.CallOption) (*pb.CreateProcessInstanceWithResultResponse, error) {
	panic("implement me")
}

func (f FakeGatewayClient) DeployProcess(ctx context.Context, in *pb.DeployProcessRequest, opts ...grpc.CallOption) (*pb.DeployProcessResponse, error) {
	panic("implement me")
}

func (f FakeGatewayClient) DeployResource(ctx context.Context, in *pb.DeployResourceRequest, opts ...grpc.CallOption) (*pb.DeployResourceResponse, error) {
	panic("implement me")
}

func (f FakeGatewayClient) FailJob(ctx context.Context, in *pb.FailJobRequest, opts ...grpc.CallOption) (*pb.FailJobResponse, error) {
	panic("implement me")
}

func (f FakeGatewayClient) ThrowError(ctx context.Context, in *pb.ThrowErrorRequest, opts ...grpc.CallOption) (*pb.ThrowErrorResponse, error) {
	panic("implement me")
}

func (f FakeGatewayClient) PublishMessage(ctx context.Context, in *pb.PublishMessageRequest, opts ...grpc.CallOption) (*pb.PublishMessageResponse, error) {
	panic("implement me")
}

func (f FakeGatewayClient) ResolveIncident(ctx context.Context, in *pb.ResolveIncidentRequest, opts ...grpc.CallOption) (*pb.ResolveIncidentResponse, error) {
	panic("implement me")
}

func (f FakeGatewayClient) SetVariables(ctx context.Context, in *pb.SetVariablesRequest, opts ...grpc.CallOption) (*pb.SetVariablesResponse, error) {
	panic("implement me")
}

func (f FakeGatewayClient) Topology(ctx context.Context, in *pb.TopologyRequest, opts ...grpc.CallOption) (*pb.TopologyResponse, error) {
	panic("implement me")
}

func (f FakeGatewayClient) UpdateJobRetries(ctx context.Context, in *pb.UpdateJobRetriesRequest, opts ...grpc.CallOption) (*pb.UpdateJobRetriesResponse, error) {
	panic("implement me")
}

func (f FakeZeebeClient) NewTopologyCommand() *commands.TopologyCommand {
	panic("implement me")
}

func (f FakeZeebeClient) NewDeployProcessCommand() *commands.DeployCommand {
	panic("implement me")
}

type FakeDeployResourceCommand struct {
	commands.DeployResourceCommand
}

func (f FakeZeebeClient) NewDeployResourceCommand() *commands.DeployResourceCommand {
	// todo
	return &f.DeployResourceCommand
}

func (f FakeZeebeClient) NewCreateInstanceCommand() commands.CreateInstanceCommandStep1 {
	panic("implement me")
}

func (f FakeZeebeClient) NewCancelInstanceCommand() commands.CancelInstanceStep1 {
	panic("implement me")
}

func (f FakeZeebeClient) NewSetVariablesCommand() commands.SetVariablesCommandStep1 {
	panic("implement me")
}

func (f FakeZeebeClient) NewResolveIncidentCommand() commands.ResolveIncidentCommandStep1 {
	panic("implement me")
}

func (f FakeZeebeClient) NewPublishMessageCommand() commands.PublishMessageCommandStep1 {
	panic("implement me")
}

func (f FakeZeebeClient) NewActivateJobsCommand() commands.ActivateJobsCommandStep1 {
	panic("implement me")
}

func (f FakeZeebeClient) NewCompleteJobCommand() commands.CompleteJobCommandStep1 {
	panic("implement me")
}

func (f FakeZeebeClient) NewFailJobCommand() commands.FailJobCommandStep1 {
	panic("implement me")
}

func (f FakeZeebeClient) NewUpdateJobRetriesCommand() commands.UpdateJobRetriesCommandStep1 {
	panic("implement me")
}

func (f FakeZeebeClient) NewThrowErrorCommand() commands.ThrowErrorCommandStep1 {
	panic("implement me")
}

func (f FakeZeebeClient) NewJobWorker() worker.JobWorkerBuilderStep1 {
	panic("implement me")
}

func (f FakeZeebeClient) Close() error {
	panic("implement me")
}


func CreateFakeZeebeClient() FakeZeebeClient {
	return FakeZeebeClient{fakeGatewayClient: CreateGatewayClient()}
}

func CreateGatewayClient() pb.GatewayClient {
	return FakeGatewayClient{}
}

func (f FakeZeebeClient) GetDeploymentCount() int {
	return len(f.deployments)
}
