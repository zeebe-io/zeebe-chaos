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

	"github.com/spf13/cobra"
	"github.com/zeebe-io/zeebe-chaos/go-chaos/internal"
)

func init() {
	rootCmd.AddCommand(exportingCommand)

	exportingCommand.AddCommand(pauseExportingCommand)
	exportingCommand.AddCommand(resumeExportingCommand)
}

var exportingCommand = &cobra.Command{
	Use:   "exporting",
	Short: "Controls Zeebe Exporting",
	Long:  "Can be used to start and stop exporting",
}

var pauseExportingCommand = &cobra.Command{
	Use:   "pause",
	Short: "Pause exporting on all partitions",
	RunE:  pauseExporting,
}

var resumeExportingCommand = &cobra.Command{
	Use:   "resume",
	Short: "Resume exporting on all partitions",
	RunE:  resumeExporting,
}

func pauseExporting(cmd *cobra.Command, args []string) error {
	k8Client, err := internal.CreateK8Client()
	if err != nil {
		panic(err)
	}

	port := 9600
	closePortForward := k8Client.MustGatewayPortForward(port, port)
	defer closePortForward()
	url := fmt.Sprintf("http://localhost:%d/actuator/exporting/pause", port)
	resp, err := http.Post(url, "", nil)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	return err
}

func resumeExporting(cmd *cobra.Command, args []string) error {
	k8Client, err := internal.CreateK8Client()
	if err != nil {
		panic(err)
	}

	port := 9600
	closePortForward := k8Client.MustGatewayPortForward(port, port)
	defer closePortForward()
	url := fmt.Sprintf("http://localhost:%d/actuator/exporting/resume", port)
	resp, err := http.Post(url, "", nil)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	return err

}
