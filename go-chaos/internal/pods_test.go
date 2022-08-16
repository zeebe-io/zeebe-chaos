package internal

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func Test_GetSelfManagedBrokerPods(t *testing.T) {
	// given
	selector, err := metav1.ParseToLabelSelector(getSelfManagedBrokerLabels())
	require.NoError(t, err)

	k8Client := CreateFakeClient()
	k8Client.CreatePodWithLabels(t, selector)

	// when
	pods, err := k8Client.GetBrokerPods()

	// then
	require.NoError(t, err)
	require.NotNil(t, pods)
	require.NotEmpty(t, pods.Items)
	assert.Equal(t, "testPod", pods.Items[0].Name, "Expected to retrieve pod")
}

func Test_GetSelfManagedBrokerPodNames(t *testing.T) {
	// given
	selector, err := metav1.ParseToLabelSelector(getSelfManagedBrokerLabels())
	require.NoError(t, err)

	k8Client := CreateFakeClient()
	k8Client.CreatePodWithLabels(t, selector)

	// when
	names, err := k8Client.GetBrokerPodNames()

	// then
	require.NoError(t, err)
	require.NotNil(t, names)
	require.NotEmpty(t, names)
	assert.Equal(t, "testPod", names[0], "Expected to retrieve pod")
}

func Test_GetSaasBrokerPods(t *testing.T) {
	// given
	selector, err := metav1.ParseToLabelSelector(getSaasBrokerLabels())
	require.NoError(t, err)

	k8Client := CreateFakeClient()
	k8Client.CreatePodWithLabels(t, selector)

	// when
	pods, err := k8Client.GetBrokerPods()

	// then
	require.NoError(t, err)
	require.NotNil(t, pods)
	require.NotEmpty(t, pods.Items)
	assert.Equal(t, "testPod", pods.Items[0].Name, "Expected to retrieve pod")
}

func Test_GetBrokersInOrder(t *testing.T) {
	// given
	selector, err := metav1.ParseToLabelSelector(getSaasBrokerLabels())
	require.NoError(t, err)

	k8Client := CreateFakeClient()
	k8Client.CreatePodWithLabelsAndName(t, selector, "zeebe-0")
	k8Client.CreatePodWithLabelsAndName(t, selector, "zeebe-1")

	// when
	pods, err := k8Client.GetBrokerPods()

	// then
	require.NoError(t, err)
	require.NotNil(t, pods)
	require.NotEmpty(t, pods.Items)
	assert.Equal(t, "zeebe-0", pods.Items[0].Name, "Expected to retrieve pod")
	assert.Equal(t, "zeebe-1", pods.Items[1].Name, "Expected to retrieve pod")
}

func Test_GetNoBrokerPods(t *testing.T) {
	// given
	k8Client := CreateFakeClient()

	// when
	pods, err := k8Client.GetBrokerPods()

	// then
	require.NoError(t, err)
	require.NotNil(t, pods)
	require.Empty(t, pods.Items)
}

func Test_GetNoBrokerPodNames(t *testing.T) {
	// given
	k8Client := CreateFakeClient()

	// when
	names, err := k8Client.GetBrokerPodNames()

	// then
	require.NoError(t, err)
	require.NotNil(t, names)
	require.Empty(t, names)
}

func Test_GetSelfManagedGatewayPodNames(t *testing.T) {
	// given
	k8Client := CreateFakeClient()

	// gateway
	selector, err := metav1.ParseToLabelSelector(getSelfManagedGatewayLabels())
	require.NoError(t, err)
	k8Client.CreatePodWithLabelsAndName(t, selector, "gateway")

	// broker
	selector, err = metav1.ParseToLabelSelector(getSelfManagedBrokerLabels())
	require.NoError(t, err)
	k8Client.CreatePodWithLabelsAndName(t, selector, "broker")

	// when
	names, err := k8Client.GetGatewayPodNames()

	// then
	require.NoError(t, err)
	require.NotNil(t, names)
	require.NotEmpty(t, names)
	assert.Equal(t, "gateway", names[0], "Expected to retrieve gateway")
}

func Test_GetSaasGatewayPodNames(t *testing.T) {
	// given
	k8Client := CreateFakeClient()

	// gateway
	selector, err := metav1.ParseToLabelSelector(getSaasGatewayLabels())
	require.NoError(t, err)
	k8Client.CreatePodWithLabelsAndName(t, selector, "gateway")

	// broker
	selector, err = metav1.ParseToLabelSelector(getSaasBrokerLabels())
	require.NoError(t, err)
	k8Client.CreatePodWithLabelsAndName(t, selector, "broker")

	// when
	names, err := k8Client.GetGatewayPodNames()

	// then
	require.NoError(t, err)
	require.NotNil(t, names)
	require.NotEmpty(t, names)
	assert.Equal(t, "gateway", names[0], "Expected to retrieve gateway")
}

func Test_GetNoGatewayPodNames(t *testing.T) {
	// given
	k8Client := CreateFakeClient()

	// when
	names, err := k8Client.GetGatewayPodNames()

	// then
	require.NoError(t, err)
	require.NotNil(t, names)
	require.Empty(t, names)
}

func Test_GetEmbeddedGateway(t *testing.T) {
	// given
	k8Client := CreateFakeClient()

	// broker
	selector, err := metav1.ParseToLabelSelector(getSelfManagedBrokerLabels())
	require.NoError(t, err)
	k8Client.CreatePodWithLabelsAndName(t, selector, "broker")

	// when
	names, err := k8Client.GetGatewayPodNames()

	// then
	require.NoError(t, err)
	require.NotNil(t, names)
	require.NotEmpty(t, names)
	assert.Equal(t, "broker", names[0], "Expected to retrieve broker")
}
