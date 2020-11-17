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
  topology="$(kubectl exec "$pod" -n "$namespace" -- zbctl status --insecure)"

  index=$(($(echo "$topology" \
    | grep "Partition $partition" \
    | grep -n "$state" -m 1 \
    | sed 's/\([0-9]*\).*/\1/') - 1))
  echo "$index"
}
