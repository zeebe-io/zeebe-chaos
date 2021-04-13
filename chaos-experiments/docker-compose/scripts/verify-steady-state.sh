#!/usr/bin/env bash
echo "deploying test process…"
docker cp ../bpmn/diagram_1.bpmn zeebe_broker_1:/tmp/diagram_1.bpmn
docker exec zeebe_broker_1 zbctl --insecure deploy /tmp/diagram_1.bpmn

echo "Starting test process run for 60s…"

requiredPartition=2
partition=0

until [[ $partition -eq $requiredPartition ]]; do
  processInstanceKey=$(docker exec zeebe_broker_1 zbctl create instance benchmark --insecure \
  | grep processInstanceKey \
  | sed 's/.*: \([0-9]\+\)/\1/')

  partition=$((processInstanceKey >> 51))

  echo Started process with key $processInstanceKey, corresponding partition $partition
done

echo "test finished."
