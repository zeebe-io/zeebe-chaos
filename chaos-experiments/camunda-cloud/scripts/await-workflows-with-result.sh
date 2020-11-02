#!/bin/bash
set -euo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

. $scriptPath/deploy-model.sh

set +e
result=1
until [[ $result -eq 0 ]]
do
  kubectl exec $pod -n $namespace -- zbctl --insecure create instance benchmark --withResult
  result=$?
done
