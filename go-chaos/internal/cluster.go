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
	"fmt"
	v1 "k8s.io/api/apps/v1"
	k8sErrors "k8s.io/apimachinery/pkg/api/errors"
	meta "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/util/wait"
	"k8s.io/client-go/util/retry"
	"strings"
	"time"
)

func (c K8Client) GetZeebeStatefulSet() (*v1.StatefulSet, error) {
	namespace := c.GetCurrentNamespace()
	ctx := context.TODO()

	statefulSets := c.Clientset.AppsV1().StatefulSets(namespace)
	sfs, err := statefulSets.List(ctx, meta.ListOptions{LabelSelector: getSelfManagedZeebeStatefulSetLabels()})
	if err != nil {
		return nil, err
	}
	if len(sfs.Items) == 1 {
		return &sfs.Items[0], nil
	}
	if len(sfs.Items) == 0 {
		// On SaaS the StatefulSet is just named "zeebe" without any identifying labels
		return statefulSets.Get(ctx, "zeebe", meta.GetOptions{})
	}
	return nil, errors.New("could not uniquely identify the stateful set for Zeebe")
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
	statefulSets := c.Clientset.AppsV1().StatefulSets(namespace)
	err = retry.RetryOnConflict(retry.DefaultRetry, func() error {
		currentScale, err := statefulSets.GetScale(ctx, sfs.Name, meta.GetOptions{})
		initialReplicas = int(currentScale.Spec.Replicas)
		if err != nil {
			return err
		}
		currentScale.Spec.Replicas = int32(replicas)
		_, err = statefulSets.UpdateScale(ctx, sfs.Name, currentScale, meta.UpdateOptions{})
		return err
	})
	if err != nil {
		return 0, err
	}
	err = wait.PollImmediateUntilWithContext(
		ctx,
		1*time.Second,
		func(ctx context.Context) (done bool, err error) {
			scale, err := c.Clientset.AppsV1().StatefulSets(namespace).GetScale(ctx, sfs.Name, meta.GetOptions{})
			if err != nil {
				return false, err
			}
			fmt.Printf("Waiting for %d replicas, currently at %d \n", replicas, scale.Status.Replicas)
			return scale.Status.Replicas == int32(replicas), nil
		},
	)

	return initialReplicas, err
}

func (c K8Client) PauseReconciliation() error {
	return c.setPauseFlag(true)
}

func (c K8Client) ResumeReconciliation() error {
	return c.setPauseFlag(false)
}

func (c K8Client) setPauseFlag(pauseEnabled bool) error {
	ctx := context.TODO()
	namespace := c.GetCurrentNamespace()
	clusterId := strings.TrimSuffix(namespace, "-zeebe")
	zeebeCrd := schema.GroupVersionResource{Group: "cloud.camunda.io", Version: "v1alpha1", Resource: "zeebeclusters"}
	payload := fmt.Sprintf(`{"metadata": {"labels": {"cloud.camunda.io/pauseReconciliation": "%t"}}}`, pauseEnabled)
	err := retry.RetryOnConflict(retry.DefaultBackoff, func() error {
		_, err := c.DynamicClient.Resource(zeebeCrd).Patch(ctx, clusterId, types.MergePatchType, []byte(payload), meta.PatchOptions{})
		return err
	})
	if k8sErrors.IsNotFound(err) {
		// No zb resource found so probably not Saas. Ignore for now.
		fmt.Printf("Did not find zeebe cluster to pause reconciliation, ignoring. %s\n", err)
		return nil
	}
	return err
}
