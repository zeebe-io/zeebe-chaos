#!/usr/bin/env bash
echo "deploying test workflow…"
zbctl --insecure deploy ../../bpmn/diagram_1.bpmn

echo "Starting test workflow run for 60s…"
zbctl --insecure create instance benchmark

echo "test finished."
