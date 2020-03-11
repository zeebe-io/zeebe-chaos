#!/usr/bin/env bash
echo "deploying test workflow…"
docker cp ../bpmn/diagram_1.bpmn zeebe_broker_1:/tmp/diagram_1.bpmn
docker exec zeebe_broker_1 zbctl --insecure deploy /tmp/diagram_1.bpmn

echo "Starting test workflow run for 60s…"

requiredPartition=2
partition=0

until [[ $partition -eq $requiredPartition ]]; do
  workflowInstanceKey=$(docker exec zeebe_broker_1 zbctl create instance benchmark --insecure \
  | grep workflowInstanceKey \
  | sed 's/.*: \([0-9]\+\)/\1/')

  partition=$((workflowInstanceKey >> 51))

  echo Started workflow with key $workflowInstanceKey, corresponding partition $partition
done

echo "test finished."
