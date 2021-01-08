#!/bin/bash
set -exuo pipefail

source utils.sh

partition=1
namespace=$(getNamespace)
gateway=$(getGateway)

# determine leader for partition
index=$(getIndexOfPodForPartitionInState "$partition" "LEADER")
leader=$(getBroker "$index")
leaderIp=$(kubectl get pod "$leader" -n "$namespace" --template="{{.status.podIP}}")

index=$(getIndexOfPodForPartitionInState "$partition" "FOLLOWER")
follower=$(getBroker "$index")
followerIp=$(kubectl get pod "$follower" -n "$namespace" --template="{{.status.podIP}}")

# To print the topology in the journal
retryUntilSuccess kubectl exec "$gateway" -n "$namespace" -- zbctl status --insecure

# we put all into one function because we need to make sure that even after preemption the 
# dependency is installed
function disconnect() {
 toChangedPod="$1"
 targetIp="$2"

 # update to have access to ip
 kubectl exec -n "$namespace" "$toChangedPod" -- apt update
 kubectl exec -n "$namespace" "$toChangedPod" -- apt install -y iproute2
 kubectl exec "$toChangedPod" -n "$namespace" -- ip route del unreachable "$targetIp"

}

retryUntilSuccess disconnect "$leader" "$followerIp"
retryUntilSuccess disconnect "$follower" "$leaderIp" 
