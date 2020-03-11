#!/usr/bin/env bash
RANDOM_BROKER_PROC=$(docker ps --filter "name=zeebe_broker*" --format "{{.ID}}" | sort --random-sort | head -n 1)
BROKER_NAME=$(docker inspect $RANDOM_BROKER_PROC --format "{{.Name}}")
BROKER_NAME=${BROKER_NAME:1}  # cut leading /

echo killing broker $BROKER_NAME...
docker stop -t 5 $RANDOM_BROKER_PROC

# store affected service name for separate restart
echo $RANDOM_BROKER_PROC > /tmp/chaos-test-broker.id
