#!/bin/bash
set -xo pipefail

if [ -z "$1" ]
then
  echo "Please provide an required partition!"
  exit 1
fi

if [ -z "$2" ]
then
  echo "Please provide an required deployment version!"
  exit 1
fi

source utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

requiredPartition=$1
requiredDeploymentVersion=$2
processId="multiVersion"

# we put all into one function because we need to make sure that even after preemption the
# dependency are installed, which is in this case is the deployment
function startInstancesOnPartition() {

  partition=0
  until [[ "$partition" -eq "$requiredPartition" ]]; do
    processInstanceKey=$(kubectl exec "$pod" -n "$namespace" -- zbctl create instance "$processId" --version "$requiredDeploymentVersion" --insecure)
    processInstanceKey=$(echo "$processInstanceKey" | jq '.processInstanceKey|tonumber')
    partition=$(( processInstanceKey >> 51 ))
    echo "Started process with key $processInstanceKey, corresponding partition $partition"
  done
}

retryUntilSuccess startInstancesOnPartition
