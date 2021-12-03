#!/bin/bash
set -xo pipefail

if [ -z "$1" ]
then
  echo "Please provide an required partition!"
  exit 1
fi

source utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

requiredPartition=$1


# we put all into one function because we need to make sure that even after preemption the
# dependency are installed, which is in this case is the deployment
function startInstancesOnPartition() {
  source deploy-model.sh

  partition=0
  until [[ "$partition" -eq "$requiredPartition" ]]; do
    processInstanceKey=$(kubectl exec "$pod" -n "$namespace" -- zbctl create instance benchmark --insecure)
    processInstanceKey=$(echo "$processInstanceKey" | jq '.processInstanceKey|tonumber')
    partition=$(( processInstanceKey >> 51 ))
    echo "Started process with key $processInstanceKey, corresponding partition $partition"
  done
}

retryUntilSuccess startInstancesOnPartition
