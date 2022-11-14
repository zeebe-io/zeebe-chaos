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
	"encoding/json"
	"errors"
	"fmt"
	"io"
	apps "k8s.io/api/apps/v1"
	core "k8s.io/api/core/v1"
	meta "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/labels"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

var (
	backupId string
)

func init() {
	rootCmd.AddCommand(backupCommand)
	backupCommand.AddCommand(setupBackupCommand)
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

var setupBackupCommand = &cobra.Command{
	Use:   "setup",
	Short: "Configures a zeebe cluster's backup settings",
	RunE:  setupBackup,
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

func setupBackup(cmd *cobra.Command, _ []string) error {
	k8Client, err := internal.CreateK8Client()
	if err != nil {
		panic(err)
	}

	namespace := k8Client.GetCurrentNamespace()

	err = k8Client.PauseReconciliation()
	if err != nil {
		return err
	}

	_, err = createBackupSecret(cmd, k8Client, namespace)
	if err != nil {
		return err
	}

	err = setupStatefulSetForBackups(cmd, err, k8Client, namespace)
	if err != nil {
		return err
	}
	err = setupGatewayForBackups(cmd, err, k8Client, namespace)
	return err
}

func setupStatefulSetForBackups(cmd *cobra.Command, err error, k8Client internal.K8Client, namespace string) error {
	sfs, err := k8Client.GetZeebeStatefulSet()
	if err != nil {
		return err
	}

	sfsEnvFrom := sfs.Spec.Template.Spec.Containers[0].EnvFrom
	sfs.Spec.Template.Spec.Containers[0].EnvFrom = append(sfsEnvFrom, core.EnvFromSource{SecretRef: &core.SecretEnvSource{LocalObjectReference: core.LocalObjectReference{Name: "zeebe-backup-store-s3"}}})

	sfsEnv := sfs.Spec.Template.Spec.Containers[0].Env
	sfs.Spec.Template.Spec.Containers[0].Env = append(
		sfsEnv,
		core.EnvVar{Name: "ZEEBE_BROKER_DATA_BACKUP_STORE", Value: "S3"},
		core.EnvVar{Name: "ZEEBE_BROKER_EXPERIMENTAL_FEATURES_ENABLEBACKUP", Value: "true"},
		core.EnvVar{Name: "MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE", Value: "*"},
		core.EnvVar{Name: "MANAGEMENT_ENDPOINTS_BACKUPS_ENABLED", Value: "true"},
	)

	_, err = k8Client.Clientset.AppsV1().StatefulSets(namespace).Update(cmd.Context(), sfs, meta.UpdateOptions{})
	return err
}

func setupGatewayForBackups(cmd *cobra.Command, err error, k8Client internal.K8Client, namespace string) error {
	saasGatewayLabels := meta.LabelSelector{
		MatchLabels: map[string]string{"app.kubernetes.io/component": "standalone-gateway"},
	}
	var gatewayDeployments *apps.DeploymentList

	gatewayDeployments, err = k8Client.Clientset.AppsV1().Deployments(namespace).List(cmd.Context(), meta.ListOptions{LabelSelector: labels.Set(saasGatewayLabels.MatchLabels).String()})
	if err != nil {
		return err
	}
	if len(gatewayDeployments.Items) == 0 {
		selector := meta.LabelSelector{
			MatchLabels: map[string]string{"app.kubernetes.io/component": "zeebe-gateway"},
		}
		gatewayDeployments, err = k8Client.Clientset.AppsV1().Deployments(namespace).List(
			cmd.Context(),
			meta.ListOptions{LabelSelector: labels.Set(selector.MatchLabels).String()},
		)
		if err != nil {
			return err
		}
	}
	gateway := gatewayDeployments.Items[0]

	gateway.Spec.Template.Spec.Containers[0].Env = append(
		gateway.Spec.Template.Spec.Containers[0].Env,
		core.EnvVar{Name: "ZEEBE_BROKER_EXPERIMENTAL_FEATURES_ENABLEBACKUP", Value: "true"},
		core.EnvVar{Name: "MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE", Value: "*"},
		core.EnvVar{Name: "MANAGEMENT_ENDPOINTS_BACKUPS_ENABLED", Value: "true"},
	)
	_, err = k8Client.Clientset.AppsV1().Deployments(namespace).Update(cmd.Context(), &gateway, meta.UpdateOptions{})
	return err
}

func createBackupSecret(cmd *cobra.Command, k8Client internal.K8Client, namespace string) (*core.Secret, error) {
	return k8Client.Clientset.CoreV1().Secrets(namespace).Create(
		cmd.Context(),
		&core.Secret{
			Type:       "Opaque",
			ObjectMeta: meta.ObjectMeta{Name: "zeebe-backup-store-s3"},
			Data: map[string][]byte{
				"ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME": []byte(os.Getenv("ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME")),
				"ZEEBE_BROKER_DATA_BACKUP_S3_REGION":     []byte(os.Getenv("ZEEBE_BROKER_DATA_BACKUP_S3_REGION")),
				"ZEEBE_BROKER_DATA_BACKUP_S3_ACCESSKEY":  []byte(os.Getenv("ZEEBE_BROKER_DATA_BACKUP_S3_ACCESSKEY")),
				"ZEEBE_BROKER_DATA_BACKUP_S3_SECRETKEY":  []byte(os.Getenv("ZEEBE_BROKER_DATA_BACKUP_S3_SECRETKEY")),
			}},
		meta.CreateOptions{},
	)
}

func takeBackup(*cobra.Command, []string) error {
	k8Client, err := internal.CreateK8Client()
	if err != nil {
		panic(err)
	}

	err = k8Client.AwaitReadiness()
	if err != nil {
		return err
	}

	port := 9600
	closePortForward := k8Client.MustGatewayPortForward(port, port)
	defer closePortForward()
	url := fmt.Sprintf("http://localhost:%d/actuator/backups/%s", port, backupId)
	resp, err := http.Post(url, "", nil)
	if err != nil {
		return err
	}
	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(resp.Body)

	if resp.StatusCode < 200 || resp.StatusCode >= 400 {
		return errors.New("taking backup failed")
	}
	return err
}

func waitForBackup(*cobra.Command, []string) error {
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
			return err
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

func restoreFromBackup(cmd *cobra.Command, _ []string) error {
	k8Client, err := internal.CreateK8Client()
	if err != nil {
		panic(err)
	}

	namespace := k8Client.GetCurrentNamespace()
	err = k8Client.PauseReconciliation()
	if err != nil {
		return err
	}
	initialScale, err := k8Client.ScaleZeebeCluster(0)
	if err != nil {
		return err
	}

	sfs, err := k8Client.GetZeebeStatefulSet()
	if err != nil {
		return err
	}

	deleteContainer := core.Container{
		Name:            "delete-data",
		Image:           "busybox",
		ImagePullPolicy: core.PullAlways,
		Command:         []string{"sh", "-c", "rm -rf /usr/local/zeebe/data/* && ls -lah /usr/local/zeebe/data"},
		VolumeMounts: []core.VolumeMount{
			{
				Name:      "data",
				ReadOnly:  false,
				MountPath: "/usr/local/zeebe/data",
			},
		},
	}
	restoreContainer := core.Container{
		Name:            "restore-from-backup",
		Image:           sfs.Spec.Template.Spec.Containers[0].Image,
		ImagePullPolicy: core.PullAlways,
		Env:             restoreEnvFromSfs(sfs),
		EnvFrom:         []core.EnvFromSource{{SecretRef: &core.SecretEnvSource{LocalObjectReference: core.LocalObjectReference{Name: "zeebe-backup-store-s3"}}}},
		VolumeMounts: []core.VolumeMount{
			{
				Name:      "data",
				ReadOnly:  false,
				MountPath: "/usr/local/zeebe/data",
			},
		},
	}
	sfs.Spec.Template.Spec.InitContainers = []core.Container{deleteContainer, restoreContainer}

	_, err = k8Client.Clientset.AppsV1().StatefulSets(namespace).Update(cmd.Context(), sfs, meta.UpdateOptions{})
	if err != nil {
		return err
	}

	// Scale up after adding init containers.
	_, err = k8Client.ScaleZeebeCluster(initialScale)
	if err != nil {
		return err
	}

	err = k8Client.AwaitReadiness()
	if err != nil {
		return err
	}

	err = k8Client.ResumeReconciliation()
	if err != nil {
		return err
	}

	return nil
}

func restoreEnvFromSfs(sfs *apps.StatefulSet) []core.EnvVar {
	zeebeEnv := sfs.Spec.Template.Spec.Containers[0].Env
	restoreEnv := make([]core.EnvVar, 0)
	for _, env := range zeebeEnv {
		// Filter out java tool options.
		// If we don't, restore app will create a gc.log file in the data folder which prevents restoring because the data
		// folder is not empty.
		if env.Name != "JAVA_TOOL_OPTIONS" {
			restoreEnv = append(restoreEnv, env)
		}
	}
	restoreEnv = append(restoreEnv,
		core.EnvVar{
			Name:  "ZEEBE_RESTORE",
			Value: "true",
		},
		core.EnvVar{
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
	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(resp.Body)
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
