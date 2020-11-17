#!/bin/bash
set -exuo pipefail

source utils.sh

state=$1
partition=${2:-3}

namespace=$(getNamespace)
pod=$(getBroker)
gateway=$(getGateway)

# To print the topology in the journal
topology=$(kubectl exec "$gateway" -n "$namespace" -- zbctl status --insecure)

# For cluster size 3 and replication factor 3
# we know the following partition matrix
# partition \ node  0    1     2
#     1             L    F     F
#     2             F    L     F
#     3             F    F     L
#    etc.
# This means broker 1, 2 or 3 participates on partition 3
# BE AWARE the topology above is just an example and the leader can every node participating node.

index=$(($(echo "$topology" \
  | grep "Partition $partition" \
  | grep -n "$state" -m 1 \
  | sed 's/\([0-9]*\).*/\1/') - 1))

pod=$(getBroker "$index")

echo "$pod" will be stopped

kubectl delete pod "$pod" -n "$namespace" --grace-period=0
