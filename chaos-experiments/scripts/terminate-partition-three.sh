#!/bin/bash

state=$1

until [[ $(kubectl get pod zeebe-0) == *"Running"* ]];
do
  echo "Waiting on K8s..."
  sleep 10s
done

# To print the topology in the journal
kubectl exec zeebe-0 -- zbctl status --insecure

# For cluster size 5 and replication factor 3
# we know the following partition matrix
# partition \ node  0    1     2    3   4
#     1             X    X     X
#     2                  X     X    X 
#     3                        X    X    X
#    etc.
# This means broker 2, 3 or 4 participates on partition 3

participants=(2 3 4)

index=$(kubectl exec zeebe-0 -- zbctl status --insecure \
  | grep 'Partition 3' \
  | grep -n $state -m 1 \
  | sed 's/\([0-9]*\).*/\1/')

broker=${participants[$index-1]}
echo Broker-$broker will be stopped

kubectl delete pod zeebe-$broker

