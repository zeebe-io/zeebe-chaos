#!/bin/bash
set -euo pipefail

source utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

source deploy-model.sh


until kubectl exec "$pod" -n "$namespace" -- zbctl --insecure create instance benchmark --withResult
do
  true;
done
