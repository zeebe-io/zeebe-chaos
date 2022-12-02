package chaos_experiments

import (
	"encoding/json"
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

func Test_ShouldBeAbleToMarshalExperiments(t *testing.T) {
	// given

	// when
	experimentsForClusterPlan, err := ReadExperimentsForClusterPlan("Production - S")

	// then
	marshal, err := json.Marshal(experimentsForClusterPlan)
	require.NoError(t, err)

	// experiments key should be small
	assert.Contains(t, string(marshal), "experiments")
}
