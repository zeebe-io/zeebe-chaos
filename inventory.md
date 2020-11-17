
[comment]: # (Generated document; run 'python ./scripts/inventory.py' to generate )
# Chaos Test Inventory

| Experiment | Title | Description | Reliability | Availability |
|-----|----|----|----|----|
| ./chaos-experiments/helm/snapshot-corruption | Zeebe can recover from corrupted snapshots | Zeebe should be able to detect and recover from corrupted snapshot | high | high |
| ./chaos-experiments/helm/multiple-leader-restart | Zeebe Leader restart multiple times experiment | Zeebe should be able to handle multiple leader changes in short period. | high | high |
| ./chaos-experiments/helm/high-load | No leader change due to high load | High load shall not cause a leader change. | high | high |
| ./chaos-experiments/helm/gateway-partition | The gateway can handle network partitions | After a network partition the gateway should be able to come back and receive all leaders to have a correct topology. Based on https://github.com/zeebe-io/zeebe/issues/4557 | high | high |
| ./chaos-experiments/helm/stress-cpu-on-broker | CPU stress on an Broker | The cpu stress on an abritrary node should not cause any failures. We should be able to start and complete instances. | high | high |
| ./chaos-experiments/helm/follower-restart | Zeebe follower graceful restart experiment | Zeebe should be fault-tolerant. Zeebe should be able to handle follower restarts. | high | high |
| ./chaos-experiments/helm/leader-restart | Zeebe Leader restart gracefully experiment | Zeebe should be fault-tolerant. Zeebe should recover after a partition leader was restarted gracefully. | high | high |
| ./chaos-experiments/helm/leader-terminate | Zeebe Leader restart non-graceful experiment | Zeebe should be fault-tolerant. We expect that Zeebe can handle non-graceful leader restarts. | high | high |
| ./chaos-experiments/helm/stress-cpu-on-gateway | CPU stress on an Gateway | The cpu stress on gateway should not cause any failures. We should be able to start and complete instances. | high | high |
| ./chaos-experiments/helm/worker-restart | Zeebe Worker restart experiment | Zeebe Workers should be able to reconnect after restart. | high | high |
| ./chaos-experiments/helm/follower-terminate | Zeebe follower restart non-graceful experiment | Zeebe should be fault-tolerant. Zeebe should be able to handle followers terminations. | high | high |
| ./chaos-experiments/camunda-cloud/production-s/snapshot-corruption | Zeebe can recover from corrupted snapshots | Zeebe should be able to detect and recover from corrupted snapshot | high | high |
| ./chaos-experiments/camunda-cloud/production-s/multiple-leader-restart | Zeebe Leader restart multiple times experiment | Zeebe should be able to handle multiple leader changes in short period. | high | high |
| ./chaos-experiments/camunda-cloud/production-s/stress-cpu-on-broker | CPU stress on an Broker | The cpu stress on an abritrary node should not cause any failures. We should be able to start and complete instances. | high | high |
| ./chaos-experiments/camunda-cloud/production-s/follower-restart | Zeebe follower graceful restart experiment | Zeebe should be fault-tolerant. Zeebe should be able to handle follower restarts. | high | high |
| ./chaos-experiments/camunda-cloud/production-s/leader-restart | Zeebe Leader restart gracefully experiment | Zeebe should be fault-tolerant. Zeebe should recover after a partition leader was restarted gracefully. | high | high |
| ./chaos-experiments/camunda-cloud/production-s/leader-terminate | Zeebe Leader restart non-graceful experiment | Zeebe should be fault-tolerant. We expect that Zeebe can handle non-graceful leader restarts. | high | high |
| ./chaos-experiments/camunda-cloud/production-s/worker-restart | Zeebe Worker restart experiment | Zeebe Workers should be able to reconnect after restart. | high | high |
| ./chaos-experiments/camunda-cloud/production-s/follower-terminate | Zeebe follower restart non-graceful experiment | Zeebe should be fault-tolerant. Zeebe should be able to handle followers terminations. | high | high |
| ./chaos-experiments/camunda-cloud/development/multiple-leader-restart | Zeebe Leader restart multiple times experiment | Zeebe should be able to handle multiple leader changes in short period. | high | high |
| ./chaos-experiments/camunda-cloud/development/stress-cpu-on-broker | CPU stress on an Broker | The cpu stress on an abritrary node should not cause any failures. We should be able to start and complete instances. | high | high |
| ./chaos-experiments/camunda-cloud/development/leader-restart | Zeebe Leader restart gracefully experiment | Zeebe should be fault-tolerant. Zeebe should recover after a partition leader was restarted gracefully. | high | high |
| ./chaos-experiments/camunda-cloud/development/leader-terminate | Zeebe Leader restart non-graceful experiment | Zeebe should be fault-tolerant. We expect that Zeebe can handle non-graceful leader restarts. | high | high |
| ./chaos-experiments/camunda-cloud/development/worker-restart | Zeebe Worker restart experiment | Zeebe Workers should be able to reconnect after restart. | high | high |
| ./chaos-experiments/camunda-cloud/production-m/snapshot-corruption | Zeebe can recover from corrupted snapshots | Zeebe should be able to detect and recover from corrupted snapshot | high | high |
| ./chaos-experiments/camunda-cloud/production-m/multiple-leader-restart | Zeebe Leader restart multiple times experiment | Zeebe should be able to handle multiple leader changes in short period. | high | high |
| ./chaos-experiments/camunda-cloud/production-m/high-load | No leader change due to high load | High load shall not cause a leader change. | high | high |
| ./chaos-experiments/camunda-cloud/production-m/stress-cpu-on-broker | CPU stress on an Broker | The cpu stress on an abritrary node should not cause any failures. We should be able to start and complete instances. | high | high |
| ./chaos-experiments/camunda-cloud/production-m/follower-restart | Zeebe follower graceful restart experiment | Zeebe should be fault-tolerant. Zeebe should be able to handle follower restarts. | high | high |
| ./chaos-experiments/camunda-cloud/production-m/leader-restart | Zeebe Leader restart gracefully experiment | Zeebe should be fault-tolerant. Zeebe should recover after a partition leader was restarted gracefully. | high | high |
| ./chaos-experiments/camunda-cloud/production-m/leader-terminate | Zeebe Leader restart non-graceful experiment | Zeebe should be fault-tolerant. We expect that Zeebe can handle non-graceful leader restarts. | high | high |
| ./chaos-experiments/camunda-cloud/production-m/worker-restart | Zeebe Worker restart experiment | Zeebe Workers should be able to reconnect after restart. | high | high |
| ./chaos-experiments/camunda-cloud/production-m/follower-terminate | Zeebe follower restart non-graceful experiment | Zeebe should be fault-tolerant. Zeebe should be able to handle followers terminations. | high | high |
| ./chaos-experiments/camunda-cloud/production-l/snapshot-corruption | Zeebe can recover from corrupted snapshots | Zeebe should be able to detect and recover from corrupted snapshot | high | high |
| ./chaos-experiments/camunda-cloud/production-l/multiple-leader-restart | Zeebe Leader restart multiple times experiment | Zeebe should be able to handle multiple leader changes in short period. | high | high |
| ./chaos-experiments/camunda-cloud/production-l/high-load | No leader change due to high load | High load shall not cause a leader change. | high | high |
| ./chaos-experiments/camunda-cloud/production-l/stress-cpu-on-broker | CPU stress on an Broker | The cpu stress on an abritrary node should not cause any failures. We should be able to start and complete instances. | high | high |
| ./chaos-experiments/camunda-cloud/production-l/follower-restart | Zeebe follower graceful restart experiment | Zeebe should be fault-tolerant. Zeebe should be able to handle follower restarts. | high | high |
| ./chaos-experiments/camunda-cloud/production-l/leader-restart | Zeebe Leader restart gracefully experiment | Zeebe should be fault-tolerant. Zeebe should recover after a partition leader was restarted gracefully. | high | high |
| ./chaos-experiments/camunda-cloud/production-l/leader-terminate | Zeebe Leader restart non-graceful experiment | Zeebe should be fault-tolerant. We expect that Zeebe can handle non-graceful leader restarts. | high | high |
| ./chaos-experiments/camunda-cloud/production-l/worker-restart | Zeebe Worker restart experiment | Zeebe Workers should be able to reconnect after restart. | high | high |
| ./chaos-experiments/camunda-cloud/production-l/follower-terminate | Zeebe follower restart non-graceful experiment | Zeebe should be fault-tolerant. Zeebe should be able to handle followers terminations. | high | high |
