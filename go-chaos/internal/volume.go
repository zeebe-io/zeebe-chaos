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
	"errors"

	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func (c K8Client) DeletePvcOfBroker(podName string) error {
	volume, err := c.GetVolume(podName)
	if err != nil {
		return err
	}

	pvc, err := c.Clientset.CoreV1().PersistentVolumeClaims(c.GetCurrentNamespace()).Get(context.TODO(), volume.PersistentVolumeClaim.ClaimName, metav1.GetOptions{})
	if err != nil {
		return err
	}

	LogInfo("Deleting PV %s", pvc.Spec.VolumeName)
	err = c.Clientset.CoreV1().PersistentVolumes().Delete(context.TODO(), pvc.Spec.VolumeName, metav1.DeleteOptions{})
	if err != nil {
		return err
	}
	LogInfo("Deleting PVC %s in namespace %s ", pvc.Name, c.GetCurrentNamespace())
	err = c.Clientset.CoreV1().PersistentVolumeClaims(c.GetCurrentNamespace()).Delete(context.TODO(), volume.PersistentVolumeClaim.ClaimName, metav1.DeleteOptions{})
	if err != nil {
		return err
	}

	return nil
}

func (c K8Client) GetVolume(podName string) (*v1.Volume, error) {
	pod, err := c.Clientset.CoreV1().Pods(c.GetCurrentNamespace()).Get(context.TODO(), podName, metav1.GetOptions{})
	if err != nil {
		return nil, err
	}
	for _, volume := range pod.Spec.Volumes {
		if volume.Name == "data" {
			return &volume, nil
		}
	}

	return nil, errors.New("PVC not found")
}
