#!/bin/bash
set -exo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)

# verify that everything is running
kubectl wait --for=condition=Ready pod -l app=$namespace-zeebe --timeout=900s -n $namespace
