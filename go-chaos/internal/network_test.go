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
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func Test_ShouldApplyNetworkPatchOnStatefulSet(t *testing.T) {
	// given
	k8Client := CreateFakeClient()
	k8Client.CreateStatefulSetWithLabelsAndName(t, &metav1.LabelSelector{}, "zeebe")

	// when
	err := k8Client.ApplyNetworkPatch()

	// then
	require.NoError(t, err)

	statefulSet, err := k8Client.GetZeebeStatefulSet()
	require.NoError(t, err)

	require.NotNil(t, statefulSet)
	assert.Equal(t, v1.Capability("NET_ADMIN"), statefulSet.Spec.Template.Spec.Containers[0].SecurityContext.Capabilities.Add[0], "Expected to add capability to statefulset")
}

func Test_ShouldApplyNetworkPatchOnDeployment(t *testing.T) {
	// given
	k8Client := CreateFakeClient()
	selector, err := metav1.ParseToLabelSelector(getSelfManagedGatewayLabels())
	require.NoError(t, err)
	k8Client.CreateDeploymentWithLabelsAndName(t, selector, "gateway")

	// when
	err = k8Client.ApplyNetworkPatchOnGateway()

	// then
	require.NoError(t, err)

	deployment, err := k8Client.getGatewayDeployment()
	require.NoError(t, err)

	require.NotNil(t, deployment)
	assert.Equal(t, v1.Capability("NET_ADMIN"), deployment.Spec.Template.Spec.Containers[0].SecurityContext.Capabilities.Add[0], "Expected to add capability to deployment")
}
