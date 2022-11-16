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
	"bytes"
	"context"
	"errors"
	"fmt"
	"strings"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
)

func (c K8Client) ApplyNetworkPatch() error {

	statefulSet, err := c.GetZeebeStatefulSet()
	if err != nil {
		return err
	}

	patch := []byte(`{
		"spec":{
			"template":{
				"spec":{
					"containers":[
						{
							"name": "zeebe",
							"securityContext":{
								"capabilities":{
									"add":["NET_ADMIN"]
								}
							}
						}]
				}
			}
		}
	}`)

	_, err = c.Clientset.AppsV1().StatefulSets(c.GetCurrentNamespace()).Patch(context.TODO(), statefulSet.Name, types.StrategicMergePatchType, patch, metav1.PatchOptions{})
	return err
}

func (c K8Client) ApplyNetworkPatchOnGateway() error {

	deployment, err := c.getGatewayDeployment()
	if err != nil {
		return err
	}

	patch := []byte(`{
		"spec":{
			"template":{
				"spec":{
					"containers":[
						{
							"name": "zeebe-gateway",
							"securityContext":{
								"capabilities":{
									"add":["NET_ADMIN"]
								}
							}
						}]
				}
			}
		}
	}`)

	_, err = c.Clientset.AppsV1().Deployments(c.GetCurrentNamespace()).Patch(context.TODO(), deployment.Name, types.StrategicMergePatchType, patch, metav1.PatchOptions{})
	return err
}

func MakeIpUnreachableForPod(k8Client K8Client, podIp string, podName string) error {
	// We try to reduce the system output in order to not break the execution. There is a limit for the sout for exec,
	// for more details see remotecommand.StreamOptions

	// the -qq flag makes the tool less noisy, remove it to get more output
	err := k8Client.ExecuteCmdOnPod([]string{"apt", "-qq", "update"}, podName)
	if err != nil {
		return err
	}

	// the -qq flag makes the tool less noisy, remove it to get more output
	err = k8Client.ExecuteCmdOnPod([]string{"apt", "-qq", "install", "-y", "iproute2"}, podName)
	if err != nil {
		return err
	}

	// we use replace to not break the execution, since add will return an exit code > 0 if the route exist
	err = k8Client.ExecuteCmdOnPod([]string{"ip", "route", "replace", "unreachable", podIp}, podName)
	if err != nil {
		return err
	}

	return nil
}

func MakeIpReachableForPod(k8Client K8Client, podName string) error {
	// We try to reduce the system output in order to not break the execution. There is a limit for the sout for exec,
	// for more details see remotecommand.StreamOptions

	// we use replace to not break the execution, since add will return an exit code > 0 if the route exist
	err := k8Client.ExecuteCmdOnPod([]string{"sh", "-c", "command -v ip"}, podName)

	if err != nil && strings.Contains(err.Error(), "exit code 127") {
		return errors.New("Execution exited with exit code 127 (Command not found). It is likely that the broker was not disconnected or restarted in between.")
	}

	var buf bytes.Buffer
	err = k8Client.ExecuteCmdOnPodWriteIntoOutput([]string{"sh", "-c", "ip route | grep -m 1 unreachable"}, podName, &buf)

	if err != nil && strings.Contains(err.Error(), "exit code 1") {
		return errors.New("Execution exited with exit code 1 (ip route not found). It is likely that the broker was not disconnected or restarted in between.")
	}

	err = k8Client.ExecuteCmdOnPodWriteIntoOutput([]string{"sh", "-c", fmt.Sprintf("ip route del %s", strings.TrimSpace(buf.String()))}, podName, &buf)

	if err != nil {
		return err
	}

	return nil
}
