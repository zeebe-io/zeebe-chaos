#!/bin/bash
set -xoue pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

. $scriptPath/deploy-model.sh messageProcess.bpmn

kubectl exec $pod -n $namespace -- zbctl publish message waiting --ttl 300s --correlationKey 123 --insecure
