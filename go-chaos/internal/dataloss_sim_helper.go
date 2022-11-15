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
	"context"
	"fmt"
	corev1 "k8s.io/api/core/v1"
	k8sErrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	"strconv"
)

const configMapName = "zeebe-control-pod-restart-flags"

/*
	Used for dataloss simulation test, to restrict when a deleted zeebe broker is restarted.

This add an InitContainer to zeebe pods. The init container is blocked in an infinite loop, until the value  of `block_{node_id}` in the config map is set to false.
To restrict when a deleted pod is restarted, first update the configmap and set the respective `block_{node_id}` true.
Then delete the pod. Once it is time to restart the pod, update the config map to set the `block_{nodeId}` to false.
The updated config map will be eventually (usually with in a minute) by the init container and breaks out of the loop.
The init container exits and the zeebe container will be started.
*/
func (c K8Client) ApplyInitContainerPatch() error {
	// apply config map
	err := createConfigMapForInitContainer(c)
	if err != nil {
		fmt.Printf("Failed to create config map %s", err)
		return err
	}

	statefulSet, err := c.GetZeebeStatefulSet()
	if err != nil {
		fmt.Printf("Failed to get statefulset %s", err)
		return err
	}

	// Adds init container patch
	patch := []byte(`{
  "spec": {
    "template": {
      "spec": {
        "volumes": [
          {
            "name": "zeebe-control-pod-restart-flags-mount",
            "configMap": {
              "name": "zeebe-control-pod-restart-flags"
            }
          }
        ],
        "initContainers": [
          {
            "name": "busybox",
            "image": "busybox:1.28",
            "command": [
              "/bin/sh",
              "-c"
            ],
            "args": [
              "while true; do block=$(cat /etc/config/block_${K8S_NAME##*-}); if [ $block == \"false\" ]; then break; fi; sleep 10; done"
            ],
            "env": [
              {
                "name": "K8S_NAME",
                "valueFrom": {
                  "fieldRef": {
                    "fieldPath": "metadata.name"
                  }
                }
              }
            ],
            "volumeMounts": [
              {
                "name": "zeebe-control-pod-restart-flags-mount",
                "mountPath": "/etc/config"
              }
            ]
          }
        ]
      }
    }
  }
}`)
	_, err = c.Clientset.AppsV1().StatefulSets(c.GetCurrentNamespace()).Patch(context.TODO(), statefulSet.Name, types.StrategicMergePatchType, patch, metav1.PatchOptions{})
	if err != nil {
		fmt.Printf("Failed to apply init container patch %s", err)
		return err
	}
	if Verbosity {
		fmt.Printf("Applied init container patch to %s \n", statefulSet.Name)
	}
	return err
}

func createConfigMapForInitContainer(c K8Client) error {
	cm, err := c.Clientset.CoreV1().ConfigMaps(c.GetCurrentNamespace()).Get(context.TODO(), configMapName, metav1.GetOptions{})
	if err == nil {
		fmt.Printf("Config map %s already exists. Will not create again. \n", cm.Name)
		return nil
	}

	if k8sErrors.IsNotFound(err) {
		// create config map
		cm := corev1.ConfigMap{
			TypeMeta: metav1.TypeMeta{
				Kind:       "ConfigMap",
				APIVersion: "v1",
			},
			ObjectMeta: metav1.ObjectMeta{
				Name:      configMapName,
				Namespace: c.GetCurrentNamespace(),
			},

			Data: map[string]string{
				// When set to true the corresponding zeebe pods will be prevented from starting up.
				// It will be blocked in the Init container until this flag is set back to false.
				"block_0": "false",
				"block_1": "false",
				"block_2": "false",
				"block_3": "false",
				"block_4": "false",
				"block_5": "false",
				"block_6": "false",
				"block_7": "false",
				"block_8": "false",
			},
		}

		_, err := c.Clientset.CoreV1().ConfigMaps(c.GetCurrentNamespace()).Create(context.TODO(), &cm, metav1.CreateOptions{})
		if err != nil {
			fmt.Printf("Failed to create configmap %s", err)
			return err
		}
		if Verbosity {
			fmt.Printf("Created config map %s in namespace %s \n", cm.Name, c.GetCurrentNamespace())
		}
		return nil
	}

	fmt.Printf("Failed to query configmap %s\n", err)
	return err
}

// If the flag set to true, init container will be caught in a loop and prevents the start up of the zeebe broker.
// When the flag is set to false, init container exits and zeebe broker will be restarted.
func SetInitContainerBlockFlag(k8Client K8Client, nodeId int, flag string) error {
	cm, err := k8Client.Clientset.CoreV1().ConfigMaps(k8Client.GetCurrentNamespace()).Get(context.TODO(), configMapName, metav1.GetOptions{})
	if err != nil {
		return err
	}

	cm.Data["block_"+strconv.Itoa(nodeId)] = flag

	cm, err = k8Client.Clientset.CoreV1().ConfigMaps(k8Client.GetCurrentNamespace()).Update(context.TODO(), cm, metav1.UpdateOptions{})

	if err != nil {
		return err
	}
	return nil
}
