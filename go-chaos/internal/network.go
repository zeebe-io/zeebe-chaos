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

func MakeIpUnreachableForPod(k8Client K8Client, podIp string, podName string) error {
	cmd := []string{"ip", "route", "replace", "unreachable", podIp}
	cmdWithSetup := []string{"sh", "-c", "apt update && apt install -y iproute2 && " + strings.Join(cmd, " ")}
	var containerName string
	if strings.Contains(podName, "gateway") {
		containerName = "zeebe-gateway"
	} else {
		containerName = "zeebe"
	}
	return k8Client.ExecuteCommandViaDebugContainer(podName, containerName, "camunda/zeebe", cmdWithSetup)
}

func MakeIpReachableForPod(k8Client K8Client, podName string) error {
	cmd := "ip route del $(ip route | grep -m 1 unreachable)"
	cmdWithSetup := []string{"sh", "-c", "apt update && apt install -y iproute2 && " + cmd}
	var containerName string
	if strings.Contains(podName, "gateway") {
		containerName = "zeebe-gateway"
	} else {
		containerName = "zeebe"
	}
	return k8Client.ExecuteCommandViaDebugContainer(podName, containerName, "camunda/zeebe", cmdWithSetup)
}

func MakeIpReachable(k8Client K8Client, podName string, ip string) error {
	cmd := "ip route del unreachable " + ip
	cmdWithSetup := []string{"sh", "-c", "apt update && apt install -y iproute2 && " + cmd}
	var containerName string
	if strings.Contains(podName, "gateway") {
		containerName = "zeebe-gateway"
	} else {
		containerName = "zeebe"
	}
	return k8Client.ExecuteCommandViaDebugContainer(podName, containerName, "camunda/zeebe", cmdWithSetup)
}
