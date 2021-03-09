#!/bin/bash

CHAOS_SETUP=${CHAOS_SETUP:-"cloud"}

function getNamespace()
{
 namespace=$(kubectl config view --minify --output 'jsonpath={..namespace}')
 echo "$namespace"
}


function getBroker()
{
  index=${1:-0}

  namespace=$(getNamespace)
  if [ "${CHAOS_SETUP}" == "cloud" ]; then
    pod=$(kubectl get pod -n "$namespace" -l app.kubernetes.io/app=zeebe -o jsonpath="{.items[$index].metadata.name}")
  else
    pod=$(kubectl get pod -n "$namespace" -l app.kubernetes.io/component=broker -o jsonpath="{.items[$index].metadata.name}")
  fi

  echo "$pod"
}

function getGateway()
{
  namespace=$(getNamespace)
  pod=$(kubectl get pod -n "$namespace" -l app.kubernetes.io/component=gateway -o jsonpath="{.items[0].metadata.name}")

  echo "$pod"
}

function getIndexOfPodForPartitionInState()
{
  partition="$1"
  # expect caps for raft roles
  state=${2^^}
  pod=$(getGateway)
  namespace=$(getNamespace)

  # To print the topology in the journal
  until topology="$(kubectl exec "$pod" -n "$namespace" -- zbctl status --insecure -o json)"
  do
    true;
  done

  index=$(echo "$topology" | jq "[.brokers[]|select(.partitions[]| select(.partitionId == $partition) and .role == \"$state\")][0].nodeId")
  echo "$index"
}

# This retries the given command until it succeeds
# In kubernetes some commands can fail because pods are rescheduled, preempted etc. and we want to be more resilient in our tests
function retryUntilSuccess() {
  echo "Run '$*'"
  until "$@"
  do
    echo "Failed to execute: '$*'. Retry."
  done
}
