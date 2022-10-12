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
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"k8s.io/client-go/util/homedir"
)

func Test_CreateK8ClientWithPath(t *testing.T) {
	// given
	settings := KubernetesSettings{kubeConfigPath: "kubeconfigtest.yml"}

	// when
	client, err := createK8Client(settings)

	// then
	assert.NoError(t, err)
	namespace, _, err := client.ClientConfig.Namespace()
	assert.NoError(t, err)
	assert.Equal(t, "kind-default", namespace)
}

func Test_ShouldReturnNamespace(t *testing.T) {
	// given
	settings := KubernetesSettings{kubeConfigPath: "kubeconfigtest.yml"}
	client, err := createK8Client(settings)
	require.NoError(t, err)

	// when
	currentNamespace := client.GetCurrentNamespace()

	// then
	assert.Equal(t, "kind-default", currentNamespace)

	namespace, _, err := client.ClientConfig.Namespace()
	assert.NoError(t, err)
	assert.Equal(t, namespace, currentNamespace)
}

func Test_ShouldReturnNamespaceOverride(t *testing.T) {
	// given
	settings := KubernetesSettings{kubeConfigPath: "kubeconfigtest.yml", namespace: "namespace-override"}
	client, err := createK8Client(settings)
	require.NoError(t, err)

	// when
	currentNamespace := client.GetCurrentNamespace()
	clientNamespace, _, err := client.ClientConfig.Namespace()
	assert.NoError(t, err)

	// then
	assert.Equal(t, "namespace-override", currentNamespace)
	assert.Equal(t, currentNamespace, clientNamespace)
}

func Test_ResolveDefaultKubePath(t *testing.T) {
	// given
	home := homedir.HomeDir()

	// when
	settings := findKubernetesSettings()

	// then
	assert.Equal(t, strings.Join([]string{home, ".kube/config"}, "/"), settings.kubeConfigPath)
}
