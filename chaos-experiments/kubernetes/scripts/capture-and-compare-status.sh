#!/bin/bash
set -xo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)
pod=$(getGateway)


if [ -f /tmp/captured-cluster-state.data ]; then
    echo "Comparing cluster status"
    kubectl exec "$pod" -n "$namespace" -- zbctl status --insecure > /tmp/current-cluster-state.data    

    status="$(cmp --silent /tmp/current-cluster-state.data /tmp/captured-cluster-state.data; echo $?)"
    
    
    rm /tmp/current-cluster-state.data
    rm /tmp/captured-cluster-state.data
    
    exit "$status";
else
    echo "Capturing cluster status"

    kubectl exec "$pod" -n "$namespace" -- zbctl status --insecure > /tmp/captured-cluster-state.data    
fi 
