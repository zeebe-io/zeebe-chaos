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
	"fmt"
	"path/filepath"

	"k8s.io/client-go/dynamic"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/tools/clientcmd/api"
	"k8s.io/client-go/util/homedir"

	// in order to authenticate with gcp
	// https://github.com/kubernetes/client-go/issues/242#issuecomment-314642965
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
)

type K8Client struct {
	ClientConfig  clientcmd.ClientConfig
	DynamicClient dynamic.Interface
	Clientset     kubernetes.Interface
}

// Returns the current namespace, defined in the kubeconfig
func (c K8Client) GetCurrentNamespace() string {
	namespace, _, _ := c.ClientConfig.Namespace()
	return namespace
}

// Creates a kubernetes client, based on the local kubeconfig
func CreateK8Client() (K8Client, error) {
	settings := findKubernetesSettings()
	return createK8Client(settings)
}

func createK8Client(settings KubernetesSettings) (K8Client, error) {
	clientConfig := clientcmd.NewNonInteractiveDeferredLoadingClientConfig(
		&clientcmd.ClientConfigLoadingRules{ExplicitPath: settings.kubeConfigPath},
		&clientcmd.ConfigOverrides{Context: api.Context{Namespace: settings.namespace}})

	k8ClientConfig, err := clientConfig.ClientConfig()
	if err != nil {
		return K8Client{}, err
	}

	// create the clientset
	clientset, err := kubernetes.NewForConfig(k8ClientConfig)
	if err != nil {
		return K8Client{}, err
	}

	namespace, _, _ := clientConfig.Namespace()

	if Verbosity {
		fmt.Printf("Connecting to %s\n", namespace)
	}
	dynamicClient, err := dynamic.NewForConfig(k8ClientConfig)
	if err != nil {
		return K8Client{}, err
	}

	client := K8Client{Clientset: clientset, ClientConfig: clientConfig, DynamicClient: dynamicClient}
	saasEnv = client.isSaaSEnvironment()

	if Verbosity {
		if saasEnv {
			fmt.Println("Running experiment in SaaS environment.")
		} else {
			fmt.Println("Running experiment in self-managed environment.")
		}
	}

	return client, nil
}

type KubernetesSettings struct {
	kubeConfigPath string
	namespace      string
}

func findKubernetesSettings() KubernetesSettings {
	kubeconfig := KubeConfigPath
	if kubeconfig == "" {
		// based on https://github.com/kubernetes/client-go/blob/master/examples/out-of-cluster-client-configuration/main.go
		if home := homedir.HomeDir(); home != "" {
			kubeconfig = filepath.Join(home, ".kube", "config")
		}
	}
	return KubernetesSettings{
		kubeConfigPath: kubeconfig,
		namespace:      Namespace,
	}
}
