package internal

import (
	"testing"

	"github.com/stretchr/testify/assert"
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