#!/bin/bash

set -exuo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

processFileName=one_task.bpmn
bpmnPath="$scriptPath/../bpmn/$processFileName"

# we put both together in one function to retry both, because it might be that pod has been restarted
# then the model is not longer on the node, which cause endless retries of deployments
function deployModel() {
  kubectl cp "$bpmnPath" "$pod:/tmp/$processFileName" -n "$namespace"
  kubectl exec "$pod" -n "$namespace" -- zbctl deploy "/tmp/$processFileName" --insecure
}

retryUntilSuccess deployModel
