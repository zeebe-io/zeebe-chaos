
[comment]: # (Generated document; run 'python ./scripts/inventory.py' to generate )
# Chaos Test Inventory

| Experiment | Title | Description | Reliability | Availability |
|-----|----|----|----|----|
| ./chaos-experiments/docker-compose/broker-outage | Zeebe broker outage experiment | Zeebe should be fault-tolerant when one broker dies | high | high |
| ./chaos-experiments/kubernetes/follower-restart | Zeebe follower restart experiment | Zeebe should be fault-tolerant | high | high |
| ./chaos-experiments/kubernetes/worker-restart | Zeebe Worker restart experiment | Zeebe Workers should be able to reconnect after restart. | high | high |
| ./chaos-experiments/kubernetes/leader-restart | Zeebe Leader restart experiment | Zeebe should be fault-tolerant | high | high |
| ./chaos-experiments/kubernetes/gateway-partition | The gateway can handle network partitions | After a network partition the gateway should be able to come back and receive all leaders to have a correct topology. Based on https://github.com/zeebe-io/zeebe/issues/4557 | high | high |
