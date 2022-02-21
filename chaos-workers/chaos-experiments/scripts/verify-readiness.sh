#!/bin/bash
set -exo pipefail

source utils.sh

namespace=$(getNamespace)

# verify that everything is running

if [ "${CHAOS_SETUP}" == "cloud" ]; then
  # Wait until brokers are ready. The componenet should be broker, but it is wrongly labelled as gateway
  kubectl wait --for=condition=Ready pod -l app.kubernetes.io/component=gateway --timeout=900s -n "$namespace"
  # Wait until all gateway pods are running.
  kubectl wait --for=condition=Available deployment zeebe-gateway --timeout=120s -n "$namespace"
else
  # Wait until brokers are ready. The componenet should be broker, but it is wrongly labelled as gateway
  kubectl wait --for=condition=Ready pod -l app.kubernetes.io/component=zeebe-broker --timeout=900s -n "$namespace"
  # Wait until all gateway pods are running
  kubectl wait --for=condition=Available deployment $namespace-zeebe-gateway --timeout=120s -n "$namespace"
fi
