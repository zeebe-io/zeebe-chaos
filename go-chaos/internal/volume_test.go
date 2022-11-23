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
	"testing"

	"github.com/stretchr/testify/require"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func Test_GetVolume(t *testing.T) {
	// given
	k8Client := CreateFakeClient()

	_, err := k8Client.Clientset.CoreV1().Pods(k8Client.GetCurrentNamespace()).Create(context.TODO(), &v1.Pod{
		ObjectMeta: metav1.ObjectMeta{Name: "testPod"},
		Spec: v1.PodSpec{
			Volumes: []v1.Volume{
				{
					Name: "data",
					VolumeSource: v1.VolumeSource{
						PersistentVolumeClaim: &v1.PersistentVolumeClaimVolumeSource{
							ClaimName: "dataPVC",
						},
					},
				},
				{
					Name: "otherVolume",
					VolumeSource: v1.VolumeSource{
						PersistentVolumeClaim: &v1.PersistentVolumeClaimVolumeSource{
							ClaimName: "otherPVC",
						},
					},
				},
			},
		},
	}, metav1.CreateOptions{})

	require.NoError(t, err)

	// when
	v, err := k8Client.GetVolume("testPod")

	// then
	require.NoError(t, err)
	require.Equal(t, "dataPVC", v.PersistentVolumeClaim.ClaimName)

}
