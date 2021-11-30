#!/bin/bash
set -exuo pipefail

source utils.sh

## Intended for Production L cluster

# TODO: add assertion for 6 partitions or at least 4

partition=1
namespace=$(getNamespace)
gateway=$(getGateway)

# determine leader for partition one
index=$(getIndexOfPodForPartitionInState "$partition" "LEADER")
leader=$(getBroker "$index")

# determine leader for partition three
index=$(getIndexOfPodForPartitionInState "4" "LEADER")
leaderTwo=$(getBroker "$index")
leaderTwoIp=$(kubectl get pod "$leaderTwo" -n "$namespace" --template="{{.status.podIP}}")


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
 kubectl exec "$toChangedPod" -n "$namespace" -- ip route add unreachable "$targetIp"

}

# We just disconnect in one way because otherwise it might lead to issues with an embedded gateway, which we currently have deployed in CC
retryUntilSuccess disconnect "$leader" "$leaderTwoIp"
