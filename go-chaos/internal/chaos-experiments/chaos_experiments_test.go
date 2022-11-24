package chaos_experiments

import (
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type Experiment struct {
	Version string
	Title   string
}

func Test_ShouldReadExperiments(t *testing.T) {
	// given

	// when
	experimentsForClusterPlan, err := readExperimentsForClusterPlan("Production - S")

	// then
	require.NoError(t, err)
	assert.NotNil(t, experimentsForClusterPlan)

	var experiments []Experiment
	err = json.Unmarshal([]byte(experimentsForClusterPlan), &experiments)
	require.NoError(t, err)
	assert.Greater(t, len(experiments), 2)
	assert.NotEqual(t, experiments[0], experiments[1])
	assert.NotEqual(t, "Zeebe deployment distribution", experiments[0])
}
