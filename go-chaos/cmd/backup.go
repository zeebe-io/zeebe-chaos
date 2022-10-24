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
	"net/http"
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

	backupCommand.AddCommand(takeBackupCommand)
	takeBackupCommand.Flags().StringVar(&backupId, "backupId", strconv.FormatInt(time.Now().UnixMilli(), 10), "optionally specify the backup id to use, uses the current timestamp by default")
	backupCommand.AddCommand(waitForBackupCommand)
	waitForBackupCommand.Flags().StringVar(&backupId, "backupId", strconv.FormatInt(time.Now().UnixMilli(), 10), "optionally specify the backup id to use, uses the current timestamp by default")
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

func takeBackup(cmd *cobra.Command, args []string) error {
	k8Client, err := internal.CreateK8Client()
	if err != nil {
		panic(err)
	}

	port := 9600
	closePortForward := k8Client.GatewayPortForward(port, port)
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
	closePortForward := k8Client.GatewayPortForward(port, port)
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
