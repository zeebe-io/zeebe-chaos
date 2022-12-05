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

package cmd

import (
	"context"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"io"
	"os"
	"testing"
)

func SetStdOut(out *os.File) {
	os.Stdout = out
}

func Test_ShouldRunCommand(t *testing.T) {
	// given
	rescueStdout := os.Stdout
	defer SetStdOut(rescueStdout)
	r, w, err := os.Pipe()
	require.NoError(t, err)
	SetStdOut(w)
	args := []string{"version"}

	// when
	err = runZbChaosCommand(args, context.TODO())

	// then
	w.Close()
	require.NoError(t, err)
	out, err := io.ReadAll(r)
	outStr := string(out)
	assert.Contains(t, outStr, "Running command with args: [version] ")
	assert.Contains(t, outStr, "zbchaos development (commit: HEAD)")
}
