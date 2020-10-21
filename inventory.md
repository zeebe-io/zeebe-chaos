
[comment]: # (Generated document; run 'python ./scripts/inventory.py' to generate )
# Chaos Test Inventory

| Experiment | Title | Description | Reliability | Availability |
|-----|----|----|----|----|
| ./chaos-experiments/docker-compose/broker-outage | Zeebe broker outage experiment | Zeebe should be fault-tolerant when one broker dies | high | high |
| ./chaos-experiments/kubernetes/follower-restart | Zeebe follower restart experiment | Zeebe should be fault-tolerant | high | high |
| ./chaos-experiments/kubernetes/gateway-partition | The gateway can handle network partitions | After a network partition the gateway should be able to come back and receive all leaders to have a correct topology. Based on https://github.com/zeebe-io/zeebe/issues/4557 | high | high |
| ./chaos-experiments/kubernetes/high-load | No leader change due to high load | High load shall not cause a leader change. | high | high |
| ./chaos-experiments/kubernetes/leader-restart | Zeebe Leader restart experiment | Zeebe should be fault-tolerant | high | high |
| ./chaos-experiments/kubernetes/snapshot-corruption | Zeebe can recover from corrupted snapshots | Zeebe should be able to detect and recover from corrupted snapshot | high | high |
| ./chaos-experiments/kubernetes/stress-cpu-on-broker | CPU stress on an Broker | The cpu stress on an abritrary node should not cause any failures. We should be able to start and complete instances. | high | high |
| ./chaos-experiments/kubernetes/stress-cpu-on-gateway | CPU stress on an Gateway | The cpu stress on gateway should not cause any failures. We should be able to start and complete instances. | high | high |
| ./chaos-experiments/kubernetes/worker-restart | Zeebe Worker restart experiment | Zeebe Workers should be able to reconnect after restart. | high | high |
