package internal

import (
	"context"
	"fmt"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func (c K8Client) GetZeebePods() {
	listOptions := metav1.ListOptions{
		LabelSelector: "app.kubernetes.io/component=zeebe-broker,app.kubernetes.io/component=zeebe-gateway",
	}

	pods, err := c.Clientset.CoreV1().Pods("").List(context.TODO(), listOptions)

	if err != nil {
		panic(err.Error())
	}
	fmt.Printf("There are %d zeebe pods in the cluster\n", len(pods.Items))
}
