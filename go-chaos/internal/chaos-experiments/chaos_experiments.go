package chaos_experiments

import (
	"embed"
	"encoding/json"
	"fmt"
	"strings"
)

// chaosContent holds our static camunda cloud chaos experiments, which are copied with the go:embed directive
//
//go:embed camunda-cloud/*
var chaosContent embed.FS

const experimentFileName = "experiment.json"

func readExperimentsForClusterPlan(clusterPlan string) (string, error) {
	normalizedClusterPlan := strings.ToLower(strings.Replace(clusterPlan, " ", "", -1))
	rootPath := fmt.Sprintf("camunda-cloud/%s", normalizedClusterPlan)
	dirEntries, err := chaosContent.ReadDir(rootPath)
	if err != nil {
		return "", err
	}

	var experiments []map[string]interface{}
	for _, dir := range dirEntries {
		if dir.IsDir() {
			experimentBytes, err := chaosContent.ReadFile(fmt.Sprintf("%s/%s/%s", rootPath, dir.Name(), experimentFileName))
			if err != nil {
				return "", err
			}
			var jsonObj map[string]interface{}
			err = json.Unmarshal(experimentBytes, &jsonObj)
			if err != nil {
				return "", err
			}
			experiments = append(experiments, jsonObj)
		}
	}

	jsonBytes, err := json.Marshal(experiments)
	return string(jsonBytes), err
}
