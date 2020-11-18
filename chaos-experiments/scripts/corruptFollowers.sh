#!/bin/bash
set -xoeu pipefail

partition=$1
state=Leader

source utils.sh

namespace=$(getNamespace)

# determine leader for partition
index=$(getIndexOfPodForPartitionInState "$partition" "$state")

# LEADER for given partition
leader=$(getBroker "$index")
podPrefix=${leader//-[0-9]/-}

# Corrupts snapshots on all followers of given partition
followers=$(kubectl get pods -n "$namespace" \
  | grep -o -E "${podPrefix}[0-9]" \
  | grep -v "$leader")


function corruptSnapshot() {
  follower="$1"
  kubectl cp corruptSnapshot.sh "$follower":/usr/local/zeebe/corrupting.sh -n "$namespace"
  kubectl exec "$follower" -- ./corrupting.sh "$partition" -n "$namespace"
}

for follower in $followers
do
  echo Corrupt snapshot on "$follower";
  retryUntilSuccess corruptSnapshot "$follower"
done

