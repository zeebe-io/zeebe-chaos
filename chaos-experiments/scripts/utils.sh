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
  state="$2"
  pod=$(getGateway)
  namespace=$(getNamespace)

  # To print the topology in the journal
  until topology="$(kubectl exec "$pod" -n "$namespace" -- zbctl status --insecure)"
  do
    true;
  done


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
  echo "$index"
}

# This retries the given command until it succeeds
# In kubernetes some commands can fail because pods are rescheduled, preempted etc. and we want to be more resilient in our tests
function retryUntilSuccess() {
  echo "Run '$*'" >> /tmp/out.log
  until "$@" >> /tmp/out.log;
  do
    echo "Failed to execute: '$*'. Retry." >> /tmp/out.log
  done
}
