package chaos_experiments

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_ShouldReadExperiments(t *testing.T) {
	// given

	// when
	experimentsForClusterPlan, err := ReadExperimentsForClusterPlan("Production - S")

	// then
	require.NoError(t, err)
	assert.NotNil(t, experimentsForClusterPlan)

	require.NoError(t, err)
	assert.Greater(t, len(experimentsForClusterPlan.Experiments), 2)
	assert.NotEqual(t, experimentsForClusterPlan.Experiments[0], experimentsForClusterPlan.Experiments[1])
	assert.NotEqual(t, "Zeebe deployment distribution", experimentsForClusterPlan.Experiments[0])
}
