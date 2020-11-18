#!/bin/bash
set -xo pipefail

if [ -z "$1" ]
then
  echo "Please provide number of instances!"
  exit 1
fi

source utils.sh

maxIterations=$1

namespace=$(getNamespace)
pod=$(getGateway)

# we put all into one function because we need to make sure that even after preemption the
# dependency are installed, which is in this case is the deployment and the script
function startInstances() {
  source deploy-model.sh

  kubectl -n "$namespace" cp "zbctl-start-instances.sh" "$pod:/tmp/start-instances.sh"
  kubectl exec "$pod" -n "$namespace" -- /tmp/start-instances.sh "$maxIterations"
}

retryUntilSuccess startInstances
