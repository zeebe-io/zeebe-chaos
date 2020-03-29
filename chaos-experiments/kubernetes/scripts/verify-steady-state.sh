#!/bin/bash
set -exo pipefail

if [ -z $1 ]
then
  echo "Please provide an required partition!"
  exit 1
fi

namespace=$(kubectl config view --minify --output 'jsonpath={..namespace}')
pod=$(kubectl get pod -n $namespace -l app=$namespace-zeebe -o jsonpath="{.items[0].metadata.name}")


scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
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





