#!/bin/bash
set -exuo pipefail

source utils.sh

state=$1
partition=${2:-3}

namespace=$(getNamespace)
index=$(getIndexOfPodForPartitionInState "$partition" "$state")

pod=$(getBroker "$index")
echo "$pod" will be stopped

kubectl delete pod "$pod" -n "$namespace" --grace-period=0
