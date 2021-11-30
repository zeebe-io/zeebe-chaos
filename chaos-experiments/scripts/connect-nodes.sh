#!/bin/bash
set -exuo pipefail

source utils.sh

namespace=$(getNamespace)
gateway=$(getGateway)

# To print the topology in the journal
retryUntilSuccess kubectl exec "$gateway" -n "$namespace" -- zbctl status --insecure

# shellcheck disable=SC2016
retryUntilSuccess runOnAllBrokers bash -c 'command -v ip && ip route del $(ip route | grep unreachable)'

