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
    workflowInstanceKey=$(kubectl exec "$pod" -n "$namespace" -- zbctl create instance "$processId" --version "$requiredDeploymentVersion" --insecure)
    workflowInstanceKey=$(echo "$workflowInstanceKey" | jq '.workflowInstanceKey')
    partition=$(( workflowInstanceKey >> 51 ))
    echo "Started workflow with key $workflowInstanceKey, corresponding partition $partition"
  done
}

retryUntilSuccess startInstancesOnPartition
