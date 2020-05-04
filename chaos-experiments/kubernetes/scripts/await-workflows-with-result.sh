#!/bin/bash
set -xo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

for i in {0..10}
do
  kubectl exec $pod -n $namespace -- zbctl --insecure create instance benchmark --withResult
done
