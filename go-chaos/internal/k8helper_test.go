package internal

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
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

func Test_ResolveDefaultKubePath(t *testing.T) {
	// given
	home := homedir.HomeDir()

	// when
	path := findKubeconfigPath()

	// then
	assert.Equal(t, strings.Join([]string{home, ".kube/config"}, "/"), *path)
}
