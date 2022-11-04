package internal

import (
	"context"
	"errors"
	"fmt"
	v1 "k8s.io/api/apps/v1"
	k8sErrors "k8s.io/apimachinery/pkg/api/errors"
	meta "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/labels"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/util/retry"
	"strings"
)

func (c K8Client) GetZeebeStatefulSet() (*v1.StatefulSet, error) {
	namespace := c.GetCurrentNamespace()
	ctx := context.TODO()

	helmLabel := meta.LabelSelector{
		MatchLabels: map[string]string{"app.kubernetes.io/name": "zeebe"},
	}

	statefulSets := c.Clientset.AppsV1().StatefulSets(namespace)
	sfs, err := statefulSets.List(ctx, meta.ListOptions{LabelSelector: labels.Set(helmLabel.MatchLabels).String()})
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
