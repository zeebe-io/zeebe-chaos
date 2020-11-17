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

source deploy-model.sh

requiredPartition=$1

partition=0
until [[ "$partition" -eq "$requiredPartition" ]]; do

  if workflowInstanceKey=$(kubectl exec "$pod" -n "$namespace" -- zbctl create instance benchmark --insecure) 
  then
    workflowInstanceKey=$(echo "$workflowInstanceKey" | jq '.workflowInstanceKey')
    partition=$(( workflowInstanceKey >> 51 ))
    echo "Started workflow with key $workflowInstanceKey, corresponding partition $partition"
  else
    partition=0
  fi

done

