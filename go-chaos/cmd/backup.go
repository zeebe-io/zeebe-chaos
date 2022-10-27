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

package cmd

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	v12 "k8s.io/api/apps/v1"
	v1 "k8s.io/api/core/v1"
	errors2 "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/labels"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/util/retry"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

var (
	backupId string
)

func init() {
	rootCmd.AddCommand(backupCommand)

	backupCommand.AddCommand(takeBackupCommand)
	takeBackupCommand.Flags().StringVar(&backupId, "backupId", strconv.FormatInt(time.Now().UnixMilli(), 10), "optionally specify the backup id to use, uses the current timestamp by default")
	backupCommand.AddCommand(waitForBackupCommand)
	waitForBackupCommand.Flags().StringVar(&backupId, "backupId", strconv.FormatInt(time.Now().UnixMilli(), 10), "optionally specify the backup id to use, uses the current timestamp by default")
	backupCommand.AddCommand(restoreBackupCommand)
	restoreBackupCommand.Flags().StringVar(&backupId, "backupId", strconv.FormatInt(time.Now().UnixMilli(), 10), "optionally specify the backup id to use, uses the current timestamp by default")
}

var backupCommand = &cobra.Command{
	Use:   "backup",
	Short: "Controls Zeebe backups",
	Long:  "Can be used to take backups and query their status",
}

var takeBackupCommand = &cobra.Command{
	Use:   "take",
	Short: "Trigger a backup",
	RunE:  takeBackup,
}

var waitForBackupCommand = &cobra.Command{
	Use:   "wait",
	Short: "Wait for a backup to complete or fail",
	RunE:  waitForBackup,
}

var restoreBackupCommand = &cobra.Command{
	Use:   "restore",
	Short: "Restore from a given backup id",
	RunE:  restoreFromBackup,
}

func takeBackup(cmd *cobra.Command, args []string) error {
	k8Client, err := internal.CreateK8Client()
	if err != nil {
		panic(err)
	}

	port := 9600
	closePortForward := k8Client.MustGatewayPortForward(port, port)
	defer closePortForward()
	url := fmt.Sprintf("http://localhost:%d/actuator/backups/%s", port, backupId)
	resp, err := http.Post(url, "", nil)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	return err
}

func waitForBackup(cmd *cobra.Command, args []string) error {
	k8Client, err := internal.CreateK8Client()
	if err != nil {
		panic(err)
	}

	port := 9600
	closePortForward := k8Client.MustGatewayPortForward(port, port)
	defer closePortForward()

	for {
		backup, err := getBackupStatus(port, backupId)
		if err != nil {
			time.Sleep(5 * time.Second)
			continue
		}

		switch backup.Status {
		case "COMPLETED":
			return nil
		case "FAILED":
			return errors.New("backup failed")
		case "DOES_NOT_EXIST":
			return errors.New("backup does not exist")
		}
		time.Sleep(5 * time.Second)
	}

}

func restoreFromBackup(cmd *cobra.Command, args []string) error {
	k8Client, err := internal.CreateK8Client()
	if err != nil {
		panic(err)
	}

	namespace := k8Client.GetCurrentNamespace()
	err = pauseReconciliation(cmd.Context(), k8Client, true)
	if err != nil {
		return err
	}

	sfsName, err := findStatefulSetName(cmd.Context(), k8Client, namespace)
	sfs, err := k8Client.Clientset.AppsV1().StatefulSets(namespace).Get(cmd.Context(), sfsName, metav1.GetOptions{})

	deleteContainer := v1.Container{
		Name:            "delete-data",
		Image:           "busybox",
		ImagePullPolicy: v1.PullAlways,
		Command:         []string{"sh", "-c", "rm -rf /usr/local/zeebe/data/* && ls -lah /usr/local/zeebe/data"},
		VolumeMounts: []v1.VolumeMount{
			{
				Name:      "data",
				ReadOnly:  false,
				MountPath: "/usr/local/zeebe/data",
			},
		},
	}
	restoreContainer := v1.Container{
		Name:            "restore-from-backup",
		Image:           sfs.Spec.Template.Spec.Containers[0].Image,
		ImagePullPolicy: v1.PullAlways,
		Env:             restoreEnvFromSfs(sfs),
		VolumeMounts: []v1.VolumeMount{
			{
				Name:      "data",
				ReadOnly:  false,
				MountPath: "/usr/local/zeebe/data",
			},
		},
	}
	initialScale := *sfs.Spec.Replicas

	*sfs.Spec.Replicas = 0
	sfs.Spec.Template.Spec.InitContainers = []v1.Container{deleteContainer, restoreContainer}

	_, err = k8Client.Clientset.AppsV1().StatefulSets(namespace).Update(cmd.Context(), sfs, metav1.UpdateOptions{})
	if err != nil {
		return err
	}

	// Scale up after adding init containers.
	err = scaleStatefulSet(cmd.Context(), k8Client, sfsName, initialScale)
	if err != nil {
		return err
	}

	err = pauseReconciliation(cmd.Context(), k8Client, false)
	if err != nil {
		return err
	}

	err = k8Client.AwaitReadiness()
	if err != nil {
		return err
	}

	return nil
}

func findStatefulSetName(ctx context.Context, k8Client internal.K8Client, namespace string) (string, error) {
	helmLabel := metav1.LabelSelector{
		MatchLabels: map[string]string{"app.kubernetes.io/name": "zeebe"},
	}
	sfs, err := k8Client.Clientset.AppsV1().StatefulSets(namespace).List(ctx, metav1.ListOptions{LabelSelector: labels.Set(helmLabel.MatchLabels).String()})
	if err != nil {
		return "", err
	}
	if len(sfs.Items) == 1 {
		return sfs.Items[0].Name, nil
	}
	if len(sfs.Items) == 0 {
		saasSfs, err := k8Client.Clientset.AppsV1().StatefulSets(namespace).Get(ctx, "zeebe", metav1.GetOptions{})
		if err != nil {
			return "", err
		}
		return saasSfs.Name, nil
	}
	return "", errors.New("could not uniquely identify the stateful set for Zeebe")
}

func pauseReconciliation(ctx context.Context, client internal.K8Client, pauseReconciliation bool) error {
	namespace := client.GetCurrentNamespace()
	clusterId := strings.TrimSuffix(namespace, "-zeebe")
	config, err := client.ClientConfig.ClientConfig()
	if err != nil {
		return err
	}
	dynamicClient, err := dynamic.NewForConfig(config)
	if err != nil {
		return err
	}
	zeebeCrd := schema.GroupVersionResource{Group: "cloud.camunda.io", Version: "v1alpha1", Resource: "ZeebeCluster"}
	payload := fmt.Sprintf(`{"metadata": {"labels": {"cloud.camunda.io/pauseReconciliation": "%t"}}}`, pauseReconciliation)
	err = retry.RetryOnConflict(retry.DefaultBackoff, func() error {
		_, err = dynamicClient.Resource(zeebeCrd).Patch(ctx, clusterId, types.MergePatchType, []byte(payload), metav1.PatchOptions{})
		return err
	})
	if errors2.IsNotFound(err) {
		// No zb resource found so probably not Saas. Ignore for now.
		return nil
	}
	return err
}

func scaleStatefulSet(ctx context.Context, client internal.K8Client, statefulSetName string, replicas int32) error {
	namespace := client.GetCurrentNamespace()
	statefulSets := client.Clientset.AppsV1().StatefulSets(namespace)
	return retry.RetryOnConflict(retry.DefaultRetry, func() error {
		currentScale, err := statefulSets.GetScale(ctx, statefulSetName, metav1.GetOptions{})
		if err != nil {
			return err
		}
		currentScale.Spec.Replicas = replicas
		_, err = statefulSets.UpdateScale(ctx, statefulSetName, currentScale, metav1.UpdateOptions{})
		if err != nil {
			return err
		}
		return nil
	})
}

func restoreEnvFromSfs(sfs *v12.StatefulSet) []v1.EnvVar {
	zeebeEnv := sfs.Spec.Template.Spec.Containers[0].Env
	restoreEnv := make([]v1.EnvVar, 0)
	for _, env := range zeebeEnv {
		// Filter out java tool options.
		// If we don't, restore app will create a gc.log file in the data folder which prevents restoring because the data
		// folder is not empty.
		if env.Name != "JAVA_TOOL_OPTIONS" {
			restoreEnv = append(restoreEnv, env)
		}
	}
	restoreEnv = append(restoreEnv,
		v1.EnvVar{
			Name:  "ZEEBE_RESTORE",
			Value: "true",
		},
		v1.EnvVar{
			Name:  "ZEEBE_RESTORE_FROM_BACKUP_ID",
			Value: backupId,
		})
	return restoreEnv
}

func getBackupStatus(port int, backupId string) (*BackupStatus, error) {
	url := fmt.Sprintf("http://localhost:%d/actuator/backups/%s", port, backupId)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var backup BackupStatus
	err = json.Unmarshal(body, &backup)
	if err != nil {
		return nil, err
	}

	fmt.Printf("Found backup %s with status: %s\n", backupId, backup.Status)

	return &backup, nil
}

type BackupStatus struct {
	Status string
}
