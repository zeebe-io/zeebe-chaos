package internal

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_shouldGetSelfManagedBrokerLabels(t *testing.T) {
	// given
	var expected = "app.kubernetes.io/component=zeebe-broker"

	// when
	actual := getSelfManagedBrokerLabels()

	// then
	assert.Equal(t, expected, actual, "Labels should be equal")
}

func Test_shouldGetSaasBrokerLabels(t *testing.T) {
	// given
	var expected = "app.kubernetes.io/app=zeebe,app.kubernetes.io/component=gateway"

	// when
	actual := getSaasBrokerLabels()

	// then
	assert.Equal(t, expected, actual, "Labels should be equal")
}

func Test_shouldGetSelfManagedGatewayLabels(t *testing.T) {
	// given
	var expected = "app.kubernetes.io/component=zeebe-gateway"

	// when
	actual := getSelfManagedGatewayLabels()

	// then
	assert.Equal(t, expected, actual, "Labels should be equal")
}

func Test_shouldGetSaasGatewayLabels(t *testing.T) {
	// given
	var expected = "app.kubernetes.io/app=zeebe,app.kubernetes.io/component=standalone-gateway"

	// when
	actual := getSaasGatewayLabels()

	// then
	assert.Equal(t, expected, actual, "Labels should be equal")
}
