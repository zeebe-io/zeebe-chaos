package internal

import (
	"context"
	"errors"
	"fmt"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func (c K8Client) DeletePvcOfBroker(podName string) error {
	volume, err := funcName(podName, c)
	if err != nil {
		return err
	}

	pvc, err := c.Clientset.CoreV1().PersistentVolumeClaims(c.GetCurrentNamespace()).Get(context.TODO(), volume.PersistentVolumeClaim.ClaimName, metav1.GetOptions{})
	if err != nil {
		return err
	}

	fmt.Printf("Deleting PV %s\n", pvc.Spec.VolumeName)
	err = c.Clientset.CoreV1().PersistentVolumes().Delete(context.TODO(), pvc.Spec.VolumeName, metav1.DeleteOptions{})
	if err != nil {
		return err
	}
	fmt.Printf("Deleting PVC %s in namespace %s \n", pvc.Name, c.GetCurrentNamespace())
	err = c.Clientset.CoreV1().PersistentVolumeClaims(c.GetCurrentNamespace()).Delete(context.TODO(), volume.PersistentVolumeClaim.ClaimName, metav1.DeleteOptions{})
	if err != nil {
		return err
	}

	return nil
}

func funcName(podName string, c K8Client) (*v1.Volume, error) {
	pod, err := c.Clientset.CoreV1().Pods(c.GetCurrentNamespace()).Get(context.TODO(), podName, metav1.GetOptions{})
	if err != nil {
		return nil, err
	}
	for _, volume := range pod.Spec.Volumes {
		if volume.Name == "data" {
			return &volume, nil
		}
	}

	return nil, errors.New("PVC not found")
}
