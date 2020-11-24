#!/bin/bash

set -exuo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

bpmnPath="$scriptPath/../bpmn/"

# we put both together in one function to retry both, because it might be that pod has been restarted
# then the model is not longer on the node, which cause endless retries of deployments
function deployModel() {
  kubectl cp "$bpmnPath" "$pod:/tmp/" -n "$namespace"
  kubectl exec "$pod" -n "$namespace" -- sh -c "zbctl deploy /tmp/bpmn/*.bpmn --insecure"
}

retryUntilSuccess deployModel
