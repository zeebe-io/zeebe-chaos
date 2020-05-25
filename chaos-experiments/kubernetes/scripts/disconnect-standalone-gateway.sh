#!/bin/bash
set -exuo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)
brokerPod0=$(getBroker)
brokerPod1=$(getBroker 1)
brokerPod2=$(getBroker 2)
gateway=$(getGateway)


# To print the topology in the journal
kubectl exec $gateway -n $namespace -- zbctl status --insecure


brokerIp0=$(kubectl get pod "$brokerPod0" -n $namespace --template={{.status.podIP}})
brokerIp1=$(kubectl get pod "$brokerPod1" -n $namespace --template={{.status.podIP}})
brokerIp2=$(kubectl get pod "$brokerPod2" -n $namespace --template={{.status.podIP}})

kubectl exec "$gateway" -n $namespace -- ip route add unreachable "$brokerIp0"
kubectl exec "$gateway" -n $namespace -- ip route add unreachable "$brokerIp1"
kubectl exec "$gateway" -n $namespace -- ip route add unreachable "$brokerIp2"


