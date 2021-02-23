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

  for i in {1..5}
  do
    # the models differ in one line, the share the same name and process id
    # if we deploy them after another it will create two different deployment versions
    # the deploy command only compares the last applied deployment - so we can do that in a loop to cause
    # multiple deployments
    kubectl exec "$pod" -n "$namespace" -- sh -c "zbctl deploy /tmp/bpmn/multi-version/multiVersionModel.bpmn --insecure"
    kubectl exec "$pod" -n "$namespace" -- sh -c "zbctl deploy /tmp/bpmn/multi-version/multiVersionModel_v2.bpmn --insecure"
  done
}

retryUntilSuccess deployModel
