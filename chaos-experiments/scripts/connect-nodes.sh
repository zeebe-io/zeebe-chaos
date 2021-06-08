#!/bin/bash
set -exuo pipefail

source utils.sh

namespace=$(getNamespace)
gateway=$(getGateway)

# To print the topology in the journal
retryUntilSuccess kubectl exec "$gateway" -n "$namespace" -- zbctl status --insecure


retryUntilSuccess runOnAllBrokers bash -c 'command -v ip && ip route del $(ip route | grep unreachable)'

