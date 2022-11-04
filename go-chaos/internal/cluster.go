package internal

import (
	"context"
	"errors"
	v1 "k8s.io/api/apps/v1"
	meta "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/labels"
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
