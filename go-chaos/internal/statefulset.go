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
	"time"

	v1 "k8s.io/api/apps/v1"
	meta "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/wait"
	"k8s.io/client-go/util/retry"
)

func (c K8Client) GetZeebeStatefulSet() (*v1.StatefulSet, error) {
	namespace := c.GetCurrentNamespace()
	ctx := context.TODO()

	statefulSets := c.Clientset.AppsV1().StatefulSets(namespace)
	if c.SaaSEnv {
		// On SaaS the StatefulSet is just named "zeebe" without any identifying labels
		return statefulSets.Get(ctx, "zeebe", meta.GetOptions{})
	} else {
		sfs, err := statefulSets.List(ctx, meta.ListOptions{LabelSelector: getSelfManagedZeebeStatefulSetLabels()})
		if err != nil {
			return nil, err
		}
		if len(sfs.Items) == 1 {
			return &sfs.Items[0], nil
		}
		return nil, errors.New("could not uniquely identify the stateful set for Zeebe")
	}
}

// ScaleZeebeCluster Scales the StatefulSet for Zeebe. Waits until scaling is complete before returning the initial scale.
func (c K8Client) ScaleZeebeCluster(replicas int) (int, error) {
	namespace := c.GetCurrentNamespace()
	ctx := context.TODO()
	var initialReplicas int

	sfs, err := c.GetZeebeStatefulSet()
	if err != nil {
		return 0, err
	}
	initialReplicas = int(*sfs.Spec.Replicas)
	newReplicas := int32(replicas)
	sfs.Spec.Replicas = &newReplicas
	err = retry.RetryOnConflict(retry.DefaultRetry, func() error {
		_, err := c.Clientset.AppsV1().StatefulSets(namespace).Update(ctx, sfs, meta.UpdateOptions{})
		return err
	})
	if err != nil {
		return 0, err
	}

	return initialReplicas, err
}

func (c K8Client) AwaitStatefulSetHasReplicasAvailable(replicas int32) error {
	return wait.PollImmediateUntilWithContext(
		context.TODO(),
		1*time.Second,
		func(ctx context.Context) (done bool, err error) {
			sfs, err := c.GetZeebeStatefulSet()
			if err != nil {
				return false, err
			}
			LogInfo("Waiting for %d replicas, currently at %d ", replicas, sfs.Status.AvailableReplicas)
			return sfs.Status.AvailableReplicas == replicas, nil
		},
	)
}
