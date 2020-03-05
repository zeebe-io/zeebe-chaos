#!/usr/bin/env bash
BROKER_ID=$(cat /tmp/chaos-test-broker.id)

echo restarting broker $BROKER_ID...
docker start $BROKER_ID
