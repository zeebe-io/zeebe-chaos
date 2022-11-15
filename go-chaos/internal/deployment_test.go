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
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func Test_ShouldReturnTrueForRunningGatewayDeployment(t *testing.T) {
	// given
	k8Client := CreateFakeClient()
	selector, err := metav1.ParseToLabelSelector(getSelfManagedGatewayLabels())
	require.NoError(t, err)
	k8Client.CreateDeploymentWithLabelsAndName(t, selector, "gateway")

	// when
	running, err := k8Client.checkIfGatewaysAreRunning()

	// then
	require.NoError(t, err)
	assert.Equal(t, true, running)
}

func Test_ShouldReturnTrueForRunningSaaSGatewayDeployment(t *testing.T) {
	// given
	k8Client := CreateFakeClient()
	selector, err := metav1.ParseToLabelSelector(getSaasGatewayLabels())
	require.NoError(t, err)
	k8Client.CreateDeploymentWithLabelsAndName(t, selector, "gateway")

	// when
	running, err := k8Client.checkIfGatewaysAreRunning()

	// then
	require.NoError(t, err)
	assert.Equal(t, true, running)
}

func Test_ShouldReturnErrorForNonExistingDeployment(t *testing.T) {
	// given
	k8Client := CreateFakeClient()

	// when
	running, err := k8Client.checkIfGatewaysAreRunning()

	// then
	require.Error(t, err)
	require.Contains(t, err.Error(), "Expected to find standalone gateway deployment")
	assert.Equal(t, false, running)
}

func Test_ShouldReturnGatewayDeployment(t *testing.T) {
	// given
	k8Client := CreateFakeClient()
	selector, err := metav1.ParseToLabelSelector(getSelfManagedGatewayLabels())
	require.NoError(t, err)
	k8Client.CreateDeploymentWithLabelsAndName(t, selector, "gateway")

	// when
	deployment, err := k8Client.getGatewayDeployment()

	// then
	require.NoError(t, err)
	assert.Equal(t, "gateway", deployment.Name)
}

func Test_ShouldReturnSaaSGatewayDeployment(t *testing.T) {
	// given
	k8Client := CreateFakeClient()
	selector, err := metav1.ParseToLabelSelector(getSaasGatewayLabels())
	require.NoError(t, err)
	k8Client.CreateDeploymentWithLabelsAndName(t, selector, "gateway")

	// when
	deployment, err := k8Client.getGatewayDeployment()

	// then
	require.NoError(t, err)
	assert.Equal(t, "gateway", deployment.Name)
}
