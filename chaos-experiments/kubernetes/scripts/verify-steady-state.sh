#!/bin/bash

requiredPartition=$1

partition=0

until [[ $partition -eq $requiredPartition ]]; do
  workflowInstanceKey=$(kubectl exec zeebe-0 -- zbctl create instance benchmark --insecure \
  | grep workflowInstanceKey \
  | sed 's/.*: \([0-9]\+\)/\1/')
  
  partition=$((workflowInstanceKey >> 51))

  echo Started workflow with key $workflowInstanceKey, corresponding partition $partition
done





