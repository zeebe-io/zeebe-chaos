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
	"strings"

	meta "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/util/retry"
)

func (c K8Client) PauseReconciliation() error {
	return c.setPauseFlag(true)
}

func (c K8Client) ResumeReconciliation() error {
	return c.setPauseFlag(false)
}

// Sets the pause reconciliation flag in SaaS environment
// this is necessary to make changes at the deployed resources
// otherwise it gets overwritten on the next reconcilation loop by the controller
// Based on https://github.com/camunda-cloud/zeebe-controller-k8s#turning-the-controller-off
func (c K8Client) setPauseFlag(pauseEnabled bool) error {
	if !c.SaaSEnv {
		VerbosityLogging("Did not find zeebe cluster to pause reconciliation, ignoring. ")
		return nil
	}

	ctx := context.TODO()
	namespace := c.GetCurrentNamespace()
	clusterId := strings.TrimSuffix(namespace, "-zeebe")
	zeebeCrd := schema.GroupVersionResource{Group: "cloud.camunda.io", Version: "v1alpha1", Resource: "zeebeclusters"}
	payload := fmt.Sprintf(`{"metadata": {"labels": {"cloud.camunda.io/pauseReconciliation": "%t"}}}`, pauseEnabled)
	err := retry.RetryOnConflict(retry.DefaultBackoff, func() error {
		_, err := c.DynamicClient.Resource(zeebeCrd).Patch(ctx, clusterId, types.MergePatchType, []byte(payload), meta.PatchOptions{})
		return err
	})
	return err
}

func (c K8Client) isSaaSEnvironment() bool {
	namespace := c.GetCurrentNamespace()
	clusterId := strings.TrimSuffix(namespace, "-zeebe")
	zeebeCrd := schema.GroupVersionResource{Group: "cloud.camunda.io", Version: "v1alpha1", Resource: "zeebeclusters"}
	resource, err := c.DynamicClient.Resource(zeebeCrd).Get(context.TODO(), clusterId, meta.GetOptions{})

	if err != nil || resource == nil {
		return false
	}
	return true
}
