package internal

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_ShouldReturnTrueWhenCRDDeployed(t *testing.T) {
	// given
	k8Client := CreateFakeClient()
	k8Client.createSaaSCRD(t)

	// when
	isSaaSEnvironment := k8Client.isSaaSEnvironment()

	assert.True(t, isSaaSEnvironment)
}

func Test_ShouldReturnFalseWhenNoCRDDeployed(t *testing.T) {
	// given
	k8Client := CreateFakeClient()

	// when
	isSaaSEnvironment := k8Client.isSaaSEnvironment()

	assert.False(t, isSaaSEnvironment)
}
