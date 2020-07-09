#!/bin/bash
set -exuo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

# . $scriptPath/deploy-model.sh messageProcess.bpmn

set +e
result=1
until [[ $result -eq 0 ]]
do
  kubectl exec $pod -n $namespace -- zbctl --insecure create instance messageProcess --variables '{"key":125}' --withResult
  result=$?
done
