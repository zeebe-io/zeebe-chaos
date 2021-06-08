#!/bin/bash
set -exuo pipefail

source utils.sh

partition=1
namespace=$(getNamespace)
elasticName="elasticsearch-master"

broker0=$(getBroker 0)
broker2=$(getBroker 2)
broker1=$(getBroker 1)

elasticServiceIp=$(kubectl get services elasticsearch-master --template "{{.spec.clusterIP}}")

# we put all into one function because we need to make sure that even after preemption the 
# dependency is installed
function disconnect() {
 toChangedPod="$1"
 targetIp="$2"

 # update to have access to ip
 kubectl exec -n "$namespace" "$toChangedPod" -- apt update
 kubectl exec -n "$namespace" "$toChangedPod" -- apt install -y iproute2
 kubectl exec "$toChangedPod" -n "$namespace" -- ip route add unreachable "$targetIp"

}

retryUntilSuccess disconnect "$broker0" "$elasticServiceIp"
retryUntilSuccess disconnect "$broker1" "$elasticServiceIp"
retryUntilSuccess disconnect "$broker2" "$elasticServiceIp"
