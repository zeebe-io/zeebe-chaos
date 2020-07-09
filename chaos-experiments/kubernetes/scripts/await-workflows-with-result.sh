#!/bin/bash
set -euo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

workflow=${1:-'benchmark'}


. $scriptPath/deploy-model.sh $workflow.bpmn

workflow=${1:-'benchmark'}

set +e
result=1
until [[ $result -eq 0 ]]
do
  kubectl exec $pod -n $namespace -- zbctl --insecure create instance $workflow --withResult
  result=$?
done
