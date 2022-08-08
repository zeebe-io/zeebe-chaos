package internal

import (
	"flag"
	"fmt"
	"path/filepath"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
	// in order to authenticate with gcp
	// https://github.com/kubernetes/client-go/issues/242#issuecomment-314642965
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
)

type K8Client struct {
	ClientConfig clientcmd.ClientConfig
	Clientset    kubernetes.Interface
}

// Returns the current namespace, defined in the kubeconfig
func (c *K8Client) GetCurrentNamespace() string {
	namespace, _, _ := c.ClientConfig.Namespace()
	return namespace
}

// Creates a kubernetes client, based on the local kubeconfig
func CreateK8Client() K8Client {
	//// based on https://github.com/kubernetes/client-go/blob/master/examples/out-of-cluster-client-configuration/main.go
	var kubeconfig *string
	if home := homedir.HomeDir(); home != "" {
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")
	} else {
		kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
	}
	flag.Parse()

	// use the current context in kubeconfig
	//config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
	//if err != nil {
	//	panic(err.Error())
	//}

	clientConfig := clientcmd.NewNonInteractiveDeferredLoadingClientConfig(
		&clientcmd.ClientConfigLoadingRules{ExplicitPath: *kubeconfig},
		&clientcmd.ConfigOverrides{})

	k8ClientConfig, err := clientConfig.ClientConfig()
	if err != nil {
		panic(err.Error())
	}

	// create the clientset
	clientset, err := kubernetes.NewForConfig(k8ClientConfig)
	if err != nil {
		panic(err.Error())
	}

	namespace, _, _ := clientConfig.Namespace()
	fmt.Printf("Connecting to %s\n", namespace)
	return K8Client{Clientset: clientset, ClientConfig: clientConfig}
}
