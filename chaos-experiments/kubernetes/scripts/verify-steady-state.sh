#!/bin/bash
set -xo pipefail

if [ -z $1 ]
then
  echo "Please provide an required partition!"
  exit 1
fi

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)
pod=$(getGateway)


processFileName=one_task.bpmn
bpmnPath=$scriptPath/../../bpmn/$processFileName

kubectl cp $bpmnPath $pod:/tmp/$processFileName -n $namespace

kubectl exec $pod -n $namespace -- zbctl deploy /tmp/$processFileName --insecure

requiredPartition=$1

partition=0

until [[ $partition -eq $requiredPartition ]]; do
  workflowInstanceKey=$(kubectl exec $pod -n $namespace -- zbctl create instance benchmark --insecure \
  | grep workflowInstanceKey \
  | sed 's/.*: \([0-9]\+\)/\1/')
  
  partition=$((workflowInstanceKey >> 51))

  echo Started workflow with key $workflowInstanceKey, corresponding partition $partition
done





