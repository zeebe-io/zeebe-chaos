package internal

import (
	"context"
	"fmt"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func (c K8Client) GetZeebePods() {
	listOptions := metav1.ListOptions{
		LabelSelector: "app.kubernetes.io/component=zeebe-broker",
	}

	pods, err := c.Clientset.CoreV1().Pods(c.GetCurrentNamespace()).List(context.TODO(), listOptions)

	if err != nil {
		panic(err.Error())
	}
	fmt.Printf("There are %d zeebe broker pods in the cluster\n", len(pods.Items))
}
