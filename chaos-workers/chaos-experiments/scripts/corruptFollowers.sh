#!/bin/bash
set -xoeu pipefail

partition=$1
state=Leader

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
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


corruptFollowersScript="$scriptPath/corruptSnapshot.sh"

function corruptSnapshot() {
  follower="$1"
  if [ ! -f "$corruptFollowersScript" ]
  then
    echo "File $corruptFollowersScript doesn't exist, can't be copied"
    return 1
  fi

  kubectl -n "$namespace" cp "$corruptFollowersScript" "$follower":/usr/local/zeebe/corrupting.sh
  kubectl -n "$namespace" exec "$follower" -- ls -la
  kubectl -n "$namespace" exec "$follower" -- ./corrupting.sh "$partition"
}

for follower in $followers
do
  echo Corrupt snapshot on "$follower";
  retryUntilSuccess corruptSnapshot "$follower"
done

