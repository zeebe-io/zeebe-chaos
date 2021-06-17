#!/bin/bash
set -exuo pipefail

source utils.sh

state=Leader
partition=${2:-1}

currentNamespace=$(kubens -c)
namespace=${1:-$currentNamespace}

export CHAOS_SETUP=helm
export NAMESPACE="$namespace"

while [ true ]
do
  index=$(getIndexOfPodForPartitionInState "$partition" "$state")

  pod=$(getBroker "$index")
  echo "$pod" will be stopped

  kubectl delete pod "$pod" -n "$namespace"
  sleep $((5 * 60))
done
