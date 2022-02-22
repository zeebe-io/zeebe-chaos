#!/bin/bash
set -exo pipefail

source utils.sh

namespace=$(getNamespace)

# verify that everything is running

if [ "${CHAOS_SETUP}" == "cloud" ]; then
  # Wait until brokers are ready. The component should be broker, but it is wrongly labelled as gateway
  kubectl wait --for=condition=Ready pod -l app.kubernetes.io/component=gateway --timeout=900s -n "$namespace"
  # Wait until all gateway pods are running. We cannot use `--for=condition=Ready` pod for gateway because
  # this check also includes the evicted pods as long as they are not deleted. Evicted pods are not immediately
  # deleted by kuberenetes. The following check passes only if all pods are running, and excludes evicted pods.
  kubectl wait --for=condition=Available deployment zeebe-gateway --timeout=120s -n "$namespace"
else
  # Wait until brokers are ready.
  kubectl wait --for=condition=Ready pod -l app.kubernetes.io/component=zeebe-broker --timeout=900s -n "$namespace"
  # Wait until all gateway pods are running. We cannot use `--for=condition=Ready` pod for gateway because
  # this check also includes the evicted pods as long as they are not deleted. Evicted pods are not immediately
  # deleted by kuberenetes. The following check passes only if all pods are running, and excludes evicted pods.
  kubectl wait --for=condition=Available deployment "$namespace-zeebe-gateway" --timeout=120s -n "$namespace"
fi
