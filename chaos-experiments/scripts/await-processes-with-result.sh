#!/bin/bash
set -euo pipefail

source utils.sh

namespace=$(getNamespace)
pod=$(getGateway)


# we put all into one function because we need to make sure that even after preemption the
# dependency are installed, which is in this case is the deployment
function awaitInstance() {
  source deploy-model.sh

  kubectl exec "$pod" -n "$namespace" -- zbctl --insecure create instance benchmark --withResult
}

retryUntilSuccess awaitInstance
