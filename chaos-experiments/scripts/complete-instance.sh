#!/bin/bash
set -euox pipefail

source utils.sh

jobType=$1
namespace=$(getNamespace)
pod=$(getGateway)

function completeJob() {
  # we want to first activate the job with the given job type and then complete it with the given job key
  # if we are not able to activate an job with the given type the function will return an error
  # and retried from outside
  jobs=$(kubectl exec -it "$pod" -n "$namespace" -- zbctl --insecure activate jobs "$jobType")
  key=$(echo "$jobs" | jq -r '.jobs[0].key')
  kubectl exec -it "$pod" -n "$namespace" -- zbctl --insecure complete job "$key"
}

retryUntilSuccess completeJob
