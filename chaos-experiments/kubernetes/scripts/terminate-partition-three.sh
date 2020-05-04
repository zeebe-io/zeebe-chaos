#!/bin/bash
set -exuo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)
pod=$(getBroker)
gateway=$(getGateway)

state=$1

# To print the topology in the journal
kubectl exec $gateway -n $namespace -- zbctl status --insecure

# For cluster size 3 and replication factor 3
# we know the following partition matrix
# partition \ node  0    1     2
#     1             L    F     F
#     2             F    L     F
#     3             F    F     L
#    etc.
# This means broker 1, 2 or 3 participates on partition 3


index=$[$(kubectl exec $gateway -n $namespace -- zbctl status --insecure \
  | grep 'Partition 3' \
  | grep -n "$state" -m 1 \
  | sed 's/\([0-9]*\).*/\1/') - 1]

pod=$(echo $pod | sed 's/\(.*\)\([0-9]\)$/\1/')
pod=$pod$index

echo $pod will be stopped

kubectl delete pod $pod -n $namespace

