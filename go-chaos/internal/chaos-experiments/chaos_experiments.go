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

type Experiments struct {
	Experiments []map[string]interface{}
}

func ReadExperimentsForClusterPlan(clusterPlan string) (Experiments, error) {
	normalizedClusterPlan := strings.ToLower(strings.Replace(clusterPlan, " ", "", -1))
	rootPath := fmt.Sprintf("camunda-cloud/%s", normalizedClusterPlan)
	dirEntries, err := chaosContent.ReadDir(rootPath)
	if err != nil {
		return Experiments{}, err
	}

	experiments := Experiments{}
	for _, dir := range dirEntries {
		if dir.IsDir() {
			experimentBytes, err := chaosContent.ReadFile(fmt.Sprintf("%s/%s/%s", rootPath, dir.Name(), experimentFileName))
			if err != nil {
				return experiments, err
			}
			var jsonObj map[string]interface{}
			err = json.Unmarshal(experimentBytes, &jsonObj)
			if err != nil {
				return experiments, err
			}
			experiments.Experiments = append(experiments.Experiments, jsonObj)
		}
	}

	return experiments, err
}
