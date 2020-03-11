#!/usr/bin/env bash

docker exec zeebe_broker_1 zbctl --insecure status
# currently does not work as expected because of https://github.com/zeebe-io/zeebe/issues/3993
if [[ $? -ne 0 ]]; then
  echo "Zeebe is not running locally, please check your setup and cluster state."
  exit 1
fi
chaos run experiment.json

# uncomment next line for PDF report, you need pandoc and e.g. BasicTeX installed
# chaos report --export-format=pdf journal.json report.pdf
