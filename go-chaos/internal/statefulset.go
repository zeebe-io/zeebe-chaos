package internal

import (
	"context"
	"errors"
	"fmt"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
)

func (c K8Client) ApplyNetworkPatch() error {

	// todo support cloud
	listOptions := metav1.ListOptions{
		LabelSelector: "app=camunda-platform",
	}

	statefulSetList, err := c.Clientset.AppsV1().StatefulSets(c.GetCurrentNamespace()).List(context.TODO(), listOptions)
	if err != nil {
		return err
	}

	if len(statefulSetList.Items) <= 0 {
		return errors.New(fmt.Sprintf("Expected to find the Zeebe statefulset but nothing was found in namespace %s", c.GetCurrentNamespace()))
	}

	statefulSet := statefulSetList.Items[0]

	patch := []byte(`{
		"spec":{
			"template":{
				"spec":{
					"containers":[
						{
							"name": "zeebe",
							"securityContext":{
								"capabilities":{
									"add":["NET_ADMIN"]
								}
							}
						}]
				}
			}
		}
	}`)
	_, err := c.Clientset.AppsV1().StatefulSets(c.GetCurrentNamespace()).Patch(context.TODO(), statefulSet.Name, types.StrategicMergePatchType, patch, metav1.PatchOptions{})
	return err
}
