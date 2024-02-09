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
	"errors"
	"github.com/stretchr/testify/require"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	dynamicFake "k8s.io/client-go/dynamic/fake"
	k8testing "k8s.io/client-go/testing"
	"testing"

	"github.com/stretchr/testify/assert"
	k8errors "k8s.io/apimachinery/pkg/api/errors"
)

func Test_ShouldReturnTrueWhenCRDDeployed(t *testing.T) {
	// given
	k8Client := CreateFakeClient()
	k8Client.createSaaSCRD(t)

	// when
	isSaaSEnvironment, err := k8Client.isSaaSEnvironment()

	require.NoError(t, err)
	assert.True(t, isSaaSEnvironment)
}

func Test_ShouldReturnFalseWhenNoCRDDeployed(t *testing.T) {
	// given
	k8Client := CreateFakeClient()

	// when
	isSaaSEnvironment, err := k8Client.isSaaSEnvironment()

	require.NoError(t, err)
	assert.False(t, isSaaSEnvironment)
}

func Test_ShouldThrowErrorWhenNoCRDDeployed(t *testing.T) {
	// given
	k8Client := CreateFakeClient()
	k8Client.DynamicClient.(*dynamicFake.FakeDynamicClient).Fake.PrependReactor("get", "zeebeclusters", func(action k8testing.Action) (handled bool, ret runtime.Object, err error) {
		return true, nil, errors.New("timeout")
	})

	// when
	isSaaSEnvironment, err := k8Client.isSaaSEnvironment()

	require.Error(t, err)
	assert.False(t, isSaaSEnvironment)
}

func Test_ShouldReturnFalseOnNotFound(t *testing.T) {
	// given
	k8Client := CreateFakeClient()
	k8Client.DynamicClient.(*dynamicFake.FakeDynamicClient).Fake.PrependReactor("get", "zeebeclusters", func(action k8testing.Action) (handled bool, ret runtime.Object, err error) {
		return true, nil, k8errors.NewNotFound(
			schema.GroupResource{
				Group:    "cloud.camunda.io",
				Resource: "zeebeclusters"},
			"test")
	})

	// when
	isSaaSEnvironment, err := k8Client.isSaaSEnvironment()

	require.NoError(t, err)
	assert.False(t, isSaaSEnvironment)
}
