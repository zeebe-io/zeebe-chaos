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
	path := "kubeconfigtest.yml"

	// when
	client, err := createK8Client(&path)

	// then
	assert.NoError(t, err)
	namespace, _, err := client.ClientConfig.Namespace()
	assert.NoError(t, err)
	assert.Equal(t, "kind-default", namespace)
}

func Test_ShouldReturnNamespace(t *testing.T) {
	// given
	path := "kubeconfigtest.yml"
	client, err := createK8Client(&path)
	require.NoError(t, err)

	// when
	currentNamespace := client.GetCurrentNamespace()

	// then
	assert.Equal(t, "kind-default", currentNamespace)

	namespace, _, err := client.ClientConfig.Namespace()
	assert.NoError(t, err)
	assert.Equal(t, namespace, currentNamespace)
}

func Test_ResolveDefaultKubePath(t *testing.T) {
	// given
	home := homedir.HomeDir()

	// when
	path := findKubeconfigPath()

	// then
	assert.Equal(t, strings.Join([]string{home, ".kube/config"}, "/"), *path)
}
