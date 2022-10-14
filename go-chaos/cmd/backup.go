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
	"fmt"
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
	takeBackupCommand.Flags().StringVar(&backupId, "backup-id", strconv.FormatInt(time.Now().UnixMilli(), 10), "optionally specify the backup id to use, uses the current timestamp by default")
}

var backupCommand = &cobra.Command{
	Use:   "backup",
	Short: "Controls Zeebe backups",
	Long:  "Can be used to take backups and query their status",
}

var takeBackupCommand = &cobra.Command{
	Use:   "take",
	Short: "Trigger a backup",
	RunE:  take_backup,
}

func take_backup(cmd *cobra.Command, args []string) error {
	k8Client, err := internal.CreateK8Client()
	if err != nil {
		panic(err)
	}

	port := 9600
	closeFn, err := k8Client.GatewayPortForward(port, port)
	if err != nil {
		panic(err.Error())
	}
	defer closeFn()
	url := fmt.Sprintf("http://localhost:%d/actuator/backups/%s", port, backupId)
	_, err = http.Post(url, "", nil)
	return err
}
