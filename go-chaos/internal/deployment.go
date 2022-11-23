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
	"bytes"
	"context"
	"embed"
	"errors"
	"fmt"

	v12 "k8s.io/api/apps/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/yaml"
)

// k8Deployments holds our static k8 manifests, which are copied with the go:embed directive
//
//go:embed manifests/*
var k8Deployments embed.FS

func (c K8Client) getGatewayDeployment() (*v12.Deployment, error) {

	listOptions := metav1.ListOptions{
		LabelSelector: c.getGatewayLabels(),
	}
	deploymentList, err := c.Clientset.AppsV1().Deployments(c.GetCurrentNamespace()).List(context.TODO(), listOptions)
	if err != nil {
		return nil, err
	}

	// here it is currently hard to distingush between not existing and embedded gateway;
	// since we don't use embedded gateway in our current chaos setup I would not support it right now here
	if deploymentList == nil || len(deploymentList.Items) <= 0 {
		return nil, errors.New(fmt.Sprintf("Expected to find standalone gateway deployment in namespace %s, but none found! The embedded gateway is not supported.", c.GetCurrentNamespace()))
	}
	return &deploymentList.Items[0], err
}

func (c K8Client) CreateWorkerDeployment() error {
	workerBytes, err := k8Deployments.ReadFile("manifests/worker.yaml")
	if err != nil {
		return err
	}

	VerbosityLogging("Deploy worker deployment to the current namespace: %s", c.GetCurrentNamespace())

	decoder := yaml.NewYAMLOrJSONDecoder(bytes.NewReader(workerBytes), 0)
	deployment := &v12.Deployment{}
	err = decoder.Decode(deployment)
	if err != nil {
		return err
	}

	_, err = c.Clientset.AppsV1().Deployments(c.GetCurrentNamespace()).Create(context.TODO(), deployment, metav1.CreateOptions{})
	return err
}
