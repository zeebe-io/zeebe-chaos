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
	"testing"

	"github.com/stretchr/testify/require"
	v12 "k8s.io/api/apps/v1"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes/fake"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/tools/clientcmd/api"
)

func CreateFakeClient() K8Client {
	k8Client := K8Client{Clientset: fake.NewSimpleClientset(), ClientConfig: &testClientConfig{namespace: "testNamespace"}}
	return k8Client
}

type testClientConfig struct {
	namespace          string
	namespaceSpecified bool
	err                error
}

func (c *testClientConfig) Namespace() (string, bool, error) {
	return c.namespace, c.namespaceSpecified, c.err
}

func (c *testClientConfig) RawConfig() (api.Config, error) {
	panic("implement me")
}

func (c *testClientConfig) ClientConfig() (*rest.Config, error) {
	panic("implement me")
}

func (c *testClientConfig) ConfigAccess() clientcmd.ConfigAccess {
	panic("implement me")
}

func (k K8Client) CreatePodWithLabels(t *testing.T, selector *metav1.LabelSelector) {
	k.CreatePodWithLabelsAndName(t, selector, "testPod")
}

func (k K8Client) CreatePodWithLabelsAndName(t *testing.T, selector *metav1.LabelSelector, podName string) {
	_, err := k.Clientset.CoreV1().Pods(k.GetCurrentNamespace()).Create(context.TODO(), &v1.Pod{
		ObjectMeta: metav1.ObjectMeta{Labels: selector.MatchLabels, Name: podName},
		Spec:       v1.PodSpec{},
	}, metav1.CreateOptions{})

	require.NoError(t, err)
}

func (k K8Client) CreateDeploymentWithLabelsAndName(t *testing.T, selector *metav1.LabelSelector, podName string) {
	_, err := k.Clientset.AppsV1().Deployments(k.GetCurrentNamespace()).Create(context.TODO(), &v12.Deployment{
		ObjectMeta: metav1.ObjectMeta{Labels: selector.MatchLabels, Name: podName},
		Spec:       v12.DeploymentSpec{},
		Status:     v12.DeploymentStatus{},
	}, metav1.CreateOptions{})

	require.NoError(t, err)
}
