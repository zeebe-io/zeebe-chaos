#!/bin/bash
set -exuo pipefail

source utils.sh

namespace=$(getNamespace)
gateway=$(getGateway)

brokers=$(kubectl get pods -n "$namespace" | grep -E "zeebe-[0-9]" | awk '{ print $1 }')


# To print the topology in the journal
kubectl exec "$gateway" -n "$namespace" -- zbctl status --insecure

# update to have access to ip
kubectl exec -n "$namespace" "$gateway" -- apt update
kubectl exec -n "$namespace" "$gateway" -- apt install -y iproute2

for broker in $brokers
do
  brokerIp=$(kubectl get pod "$broker" -n "$namespace" --template="{{.status.podIP}}")
  kubectl exec "$gateway" -n "$namespace" -- ip route add unreachable "$brokerIp"
done
