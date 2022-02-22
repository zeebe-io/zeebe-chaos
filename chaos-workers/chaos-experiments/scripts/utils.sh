#!/bin/bash

CHAOS_SETUP=${CHAOS_SETUP:-"cloud"}

function getNamespace()
{
  # shellcheck disable=SC2153
  if [ -z "${NAMESPACE}" ]
  then
   namespace=$(kubectl config view --minify --output 'jsonpath={..namespace}')
  else
   namespace=$NAMESPACE
  fi
 echo "$namespace"
}

function getBrokerLabels() {
  if [ "${CHAOS_SETUP}" == "cloud" ]; then
    # For backwards compatability the brokers kept the gateway labels, for a statefulset the labels are not modifiable
    # To still be able to distinguish the standalone gateway with the broker, the gateway got a new label.
    echo "-l app.kubernetes.io/app=zeebe -l app.kubernetes.io/component=gateway"
  else # helm
    echo "-l app.kubernetes.io/component=zeebe-broker"
  fi
}

function getGatewayLabels() {
  if [ "${CHAOS_SETUP}" == "cloud" ]; then
    # For backwards compatability the brokers kept the gateway labels, for a statefulset the labels are not modifiable
    # To still be able to distinguish the standalone gateway with the broker, the gateway got a new label.
    echo "-l app.kubernetes.io/app=zeebe -l app.kubernetes.io/component=standalone-gateway"
  else # helm
    echo "-l app.kubernetes.io/component=zeebe-gateway"
  fi
}

function runOnAllBrokers()
{
  namespace=$(getNamespace)

  pods=$(kubectl get pod -n "$namespace" $(getBrokerLabels) -o jsonpath="{.items[*].metadata.name}")

  set +e
  for pod in $pods
  do
    kubectl -n "$namespace" exec "$pod" -- "$@"
  done
  set -e
}

function getBroker()
{
  index=${1:-0}

  namespace=$(getNamespace)
  pod=$(kubectl get pod -n "$namespace" $(getBrokerLabels) -o jsonpath="{.items[$index].metadata.name}")

  echo "$pod"
}

function getGateway()
{
  namespace=$(getNamespace)
  pod=$(kubectl get pod -n "$namespace" --field-selector status.phase=Running $(getGatewayLabels) -o jsonpath="{.items[0].metadata.name}")

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
