#!/bin/bash
set -exuo pipefail


scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)
broker=$(getBroker)

kubectl exec -n $namespace $broker -- apt update
kubectl exec -n $namespace $broker -- apt install -y stress

# stress cpu

kubectl exec -n $namespace $broker -- stress --cpu 256 --vm 32 --vm-bytes 4M --timeout 180 &


