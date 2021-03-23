#!/bin/bash
set -exuo pipefail

source utils.sh

partition=1
namespace=$(getNamespace)
gateway=$(getGateway)

# determine leader for partition one
index=$(getIndexOfPodForPartitionInState "$partition" "LEADER")
leader=$(getBroker "$index")
leaderIp=$(kubectl get pod "$leader" -n "$namespace" --template="{{.status.podIP}}")

# determine leader for partition three
index=$(getIndexOfPodForPartitionInState "3" "LEADER")
leaderTwo=$(getBroker "$index")
leaderTwoIp=$(kubectl get pod "$leaderTwo" -n "$namespace" --template="{{.status.podIP}}")

if [ "$leaderTwo" == "$leader" ]
then
  # determine leader for partition two
  index=$(getIndexOfPodForPartitionInState "2" "LEADER")
  leaderTwo=$(getBroker "$index")
  leaderTwoIp=$(kubectl get pod "$leaderTwo" -n "$namespace" --template="{{.status.podIP}}")

  if [ "$leaderTwo" == "$leader" ]
  then
    # We could try to kill the pod and hope that he is not able to become leader again,
    # but there is a high chance that it is able to do so after restart. It can make our test fragile,
    # especially if we want to connect again, which is the reason why we do nothing in that case.
    exit
  fi
fi

# To print the topology in the journal
retryUntilSuccess kubectl exec "$gateway" -n "$namespace" -- zbctl status --insecure

# we put all into one function because we need to make sure that even after preemption the
# dependency is installed
function connect() {
 toChangedPod="$1"
 targetIp="$2"

 if command -v ip
 then
     kubectl exec "$toChangedPod" -n "$namespace" -- ip route del unreachable "$targetIp"
 fi
}

retryUntilSuccess connect "$leader" "$leaderTwoIp"
retryUntilSuccess connect "$leaderTwo" "$leaderIp"
