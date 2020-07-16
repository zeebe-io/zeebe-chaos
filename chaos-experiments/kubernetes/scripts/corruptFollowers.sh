#!/bin/bash
set -xoeu pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)
pod=$(getBroker)

# To print the topology in the journal
kubectl exec $pod -n $namespace -- zbctl status --insecure

partition=$1


# determine leader for partition
state=Leader
index=$[$(kubectl exec $pod -n $namespace -- zbctl status --insecure \
  | grep "Partition $partition" \
  | grep -n "$state" -m 1 \
  | sed 's/\([0-9]*\).*/\1/') - 1]

podPrefix=$(echo $pod | sed 's/\(.*\)\([0-9]\)$/\1/')

# LEADER for given partition
leader=$podPrefix$index

# Corrupts snapshots on all followers of given partition
followers=$(kubectl get pods -n $namespace \
  | grep -o -E "$podPrefix[0-9]" \
  | grep -v $leader)

for follower in $followers
do
  echo Corrupt snapshot on $follower;
  kubectl cp $scriptPath/corruptSnapshot.sh $follower:/usr/local/zeebe/corrupting.sh
  kubectl exec $follower -- ./corrupting.sh $partition
done

kubectl exec $pod -- zbctl status --insecure
