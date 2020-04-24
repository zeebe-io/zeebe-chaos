#!/bin/bash

set -xoeu pipefail

partition=$1

namespace=$(kubectl config view --minify --output 'jsonpath={..namespace}')
pod=$(kubectl get pod -n $namespace -l app=$namespace-zeebe -o jsonpath="{.items[0].metadata.name}")


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
kubectl get pods -n $namespace \
  | grep -o -E "$podPrefix[0-9]" \
  | grep -v $leader \
  | xargs -I % \
  sh -c "kubectl cp corruptSnapshot.sh %:/usr/local/zeebe/corrupting.sh; kubectl exec % -- ./corrupting.sh $partition"


kubectl exec $pod -- zbctl status --insecure
