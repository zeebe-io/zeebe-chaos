package internal

import (
	"context"

	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func (c K8Client) GetBrokerPodNames() ([]string, error) {
	listOptions := metav1.ListOptions{
		LabelSelector: "app.kubernetes.io/component=zeebe-broker",
	}

	list, err := c.Clientset.CoreV1().Pods(c.GetCurrentNamespace()).List(context.TODO(), listOptions)
	if err != nil {
		return nil, err
	}

	return c.extractPodNames(list)
}

func (c K8Client) extractPodNames(list *v1.PodList) ([]string, error) {
	pods := list.Items
	names := make([]string, len(pods))

	for idx, item := range pods {
		names[idx] = item.Name
	}

	return names, nil
}

func (c K8Client) GetGatewayPodNames() ([]string, error) {
	listOptions := metav1.ListOptions{
		LabelSelector: "app.kubernetes.io/component=zeebe-gateway",
	}

	list, err := c.Clientset.CoreV1().Pods(c.GetCurrentNamespace()).List(context.TODO(), listOptions)
	if err != nil {
		return nil, err
	}

	return c.extractPodNames(list)
}
