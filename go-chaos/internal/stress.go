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
	"strings"
)

type StressType struct {
	IoStress  bool
	CpuStress bool
	MemStress bool
}

func PutStressOnPod(k8Client K8Client, timeoutSec string, podName string, containerName string, stressType StressType) error {
	stressCmd := []string{"stress", "--timeout", timeoutSec}
	if stressType.CpuStress {
		// Spawn N workers spinning on sqrt().
		stressCmd = append(stressCmd, "--cpu", "256")
	}

	if stressType.MemStress {
		// Spawn N workers spinning on malloc()/free(). Per default alloc 256MB per worker.
		stressCmd = append(stressCmd, "--vm", "4")
	}

	if stressType.IoStress {
		// Spawn N workers spinning on sync().
		stressCmd = append(stressCmd, "--io", "256")
	}
	cmdWithSetup := []string{"sh", "-c", "apt update && apt install -y stress procps && " + strings.Join(stressCmd, " ")}
	return k8Client.ExecuteCommandViaDebugContainer(podName, containerName, "camunda/zeebe", cmdWithSetup)
}
