#!/usr/bin/env bash
RANDOM_BROKER_PROC=$(docker ps --filter "name=zeebe_broker*" --format "{{.ID}}" | sort --random-sort | head -n 1)
echo killing broker $(docker inspect $RANDOM_BROKER_PROC --format "{{.Name}}")
docker stop -t 1 $RANDOM_BROKER_PROC
