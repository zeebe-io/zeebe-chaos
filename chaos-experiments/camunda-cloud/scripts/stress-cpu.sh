#!/bin/bash
set -exuo pipefail


target=${1:-"broker"}


scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)

targetPod=$(getBroker)
if [ "$target" == "gateway" ];
then
  targetPod=$(getGateway)
fi

# we need to update the system before installing new packages
kubectl exec -n $namespace $targetPod -- apt update

# we install stress and procps to kill it later with pgrep
kubectl exec -n $namespace $targetPod -- apt install -y stress procps

# stress cpu in background
kubectl exec -n $namespace $targetPod -- stress --cpu 256 --vm 32 --vm-bytes 4M --timeout 30

