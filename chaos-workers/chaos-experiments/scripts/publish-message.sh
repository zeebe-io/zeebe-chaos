#!/bin/bash
set -euox pipefail

source utils.sh

namespace=$(getNamespace)
pod=$(getGateway)
keyString=""
key=0

function publishMessage() {
  # We want to publish on partition one.The messages are spread over the partitions via the correlation key.
  # Our current cluster plans have 1, 4 or 8 partitions. In order to always reach the same partition we need a correlation key which is mod the partition count always the same number. Ideally it is just one character which makes the calculation easier. If we take a look at the ASCII table we see that for example 48 mod 1, 4 or 8 is always 0. 
  # If we use "0" as correlation key we can be sure this will end up in the production cluster on partition one.
  keyString=$(kubectl exec -it "$pod" -n "$namespace" -- zbctl publish message "test" --correlationKey "0" --ttl "900s" --insecure | jq '.key')
  key=$(echo "$keyString" | tr -dc '0-9') # the quotes need to be stripped from the key
  echo "$key"
}

retryUntilSuccess publishMessage

partitionId=$(( key >> 51 ))

if [ "$partitionId" -ne 1 ]
then
  echo "The message was published on the wrong partition, namely $partitionId"
  exit 1
fi
