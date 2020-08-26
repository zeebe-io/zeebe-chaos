#!/bin/bash
set -exo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)

# verify that everything is running

if [ "${CHAOS_SETUP}" == "cloud" ]; then
  kubectl wait --for=condition=Ready pod -l app.kubernetes.io/app=zeebe --timeout=900s -n $namespace
else
  kubectl wait --for=condition=Ready pod -l app.kubernetes.io/instance=$namespace --timeout=900s -n $namespace
fi
