#!/bin/bash
set -exuo pipefail

# this scripts expects a setup of 5 nodes with replication factor 5 or higher

source utils.sh

partition=1
namespace=$(getNamespace)
gateway=$(getGateway)

broker0=$(getBroker "0")
broker0Ip=$(kubectl get pod "$broker0" -n "$namespace" --template="{{.status.podIP}}")
broker1=$(getBroker "1")
broker1Ip=$(kubectl get pod "$broker1" -n "$namespace" --template="{{.status.podIP}}")
broker2=$(getBroker "2")
broker2Ip=$(kubectl get pod "$broker2" -n "$namespace" --template="{{.status.podIP}}")

# To print the topology in the journal
 kubectl exec "$gateway" -n "$namespace" -- zbctl status --insecure

# we put all into one function because we need to make sure that even after preemption the 
# dependency is installed
function disconnect() {
 toChangedPod="$1"
 targetIp="$2"

 # update to have access to ip
 kubectl exec -n "$namespace" "$toChangedPod" -- apt update
 kubectl exec -n "$namespace" "$toChangedPod" -- apt install -y iproute2
 kubectl exec "$toChangedPod" -n "$namespace" -- ip route add unreachable "$targetIp"
}

function connect() {
 toChangedPod="$1"
 targetIp="$2"

 # update to have access to ip
 kubectl exec -n "$namespace" "$toChangedPod" -- apt update
 kubectl exec -n "$namespace" "$toChangedPod" -- apt install -y iproute2
 kubectl exec "$toChangedPod" -n "$namespace" -- ip route del unreachable "$targetIp"
}


function netloss() {
 toChangedPod="$1"

 # update to have access to ip
 kubectl exec -n "$namespace" "$toChangedPod" -- apt update
 kubectl exec -n "$namespace" "$toChangedPod" -- apt install -y iproute2
 kubectl exec "$toChangedPod" -n "$namespace" -- tc qdisc add dev eth0 root netem loss 5%
}


retryUntilSuccess netloss "$broker1"
retryUntilSuccess netloss "$broker2"
#retryUntilSuccess netloss "$broker0"

# We disconnect Broker 0 from others, still they can send him request

retryUntilSuccess disconnect "$broker0" "$broker1Ip"
retryUntilSuccess disconnect "$broker0" "$broker2Ip"

# We disconnect Broker 1 from Broker 2, to make the cluster a bit disruptive

#retryUntilSuccess disconnect "$broker1" "$broker2Ip"

previousCoin=1
while true;
do

  echo "Disconnected..."
  sleep 5

  if [ $previousCoin -eq 1 ]
  then
    retryUntilSuccess connect "$broker1" "$broker2Ip"
  else
    retryUntilSuccess connect "$broker2" "$broker1Ip"
  fi

  sleep 145

  coin=$(($RANDOM%2))

  if [ $coin -eq 1 ]
  then
    retryUntilSuccess disconnect "$broker1" "$broker2Ip"
  else
    retryUntilSuccess disconnect "$broker2" "$broker1Ip"
  fi
  previousCoin=$coin
  echo "set prev coin: $previousCoin"

  coin=$(($RANDOM%2))
  if [ coin -eq 1 ]
  then
    retryUntilSuccess connect "$broker0" "$broker1Ip"
    sleep 45
    retryUntilSuccess disconnect "$broker0" "$broker1Ip"
  else
    retryUntilSuccess connect "$broker0" "$broker2Ip"
    sleep 45
    retryUntilSuccess disconnect "$broker0" "$broker2Ip"
  fi

done
