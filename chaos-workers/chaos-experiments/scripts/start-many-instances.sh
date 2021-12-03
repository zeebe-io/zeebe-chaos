#!/bin/bash
set -xo pipefail

if [ -z "$1" ]
then
  echo "Please provide number of instances!"
  exit 1
fi

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source utils.sh

maxIterations=$1

namespace=$(getNamespace)
pod=$(getGateway)

startInstancesScript="$scriptPath/zbctl-start-instances.sh"

# we put all into one function because we need to make sure that even after preemption the
# dependency are installed, which is in this case is the deployment and the script
function startInstances() {
  source deploy-model.sh

  if [ ! -f "$startInstancesScript" ]
  then
    echo "File $startInstancesScript  doesn't exist, can't be copied"
    return 1
  fi

  kubectl -n "$namespace" cp "$startInstancesScript" "$pod:/tmp/start-instances.sh"
  kubectl exec "$pod" -n "$namespace" -- /tmp/start-instances.sh "$maxIterations"
}

retryUntilSuccess startInstances
