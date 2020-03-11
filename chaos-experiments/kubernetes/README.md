# Chaos Experiments in Kubernetes

Make sure that you have followed all [installation steps](../README.md).

Further prerequisites to run experiments on kubernetes are:

 * kubectl installed
 * kubens installed
 * helm installed 

## Run Chaos Experiments

Make sure you have set up everything correctly and started a Zeebe cluster via the helm charts. _Currently the chaos tests
expect 3 nodes with 3 partitions and replication factor 3._ You should use a similar setup like it is done in the [Zeebe Benchmarks folder](https://github.com/zeebe-io/zeebe/tree/develop/benchmarks).


It is necessary to activate your installed chaostoolkit environment to run chaos experiments.
In order to do so just run `source runChaos.sh` it will source the `~/.venvs/chaostk/bin/activate` and also add the 
script folders to your `PATH`. This makes it possible to run chaos experiments easily.


Make sure you have activated your python virtual environment, please [see](../README.md).
It might make sense to run in parallel `kubectl get pods -w` so you can see what is happening during the experiment
and check the Grafana Dashboard continuously.

### Example experiments:

#### Follower Restart

_Note:_ To test that we need only one partition instead of 3, otherwise every node is a leader.

**Experiment:**
1. Verify Steady State:
    1. Wait's that the cluster is up and running.
    2. Start workflow instances on all partitions
2. Action;
    1. Detect Follower for partition 3
    2. Kill Follower for partition 3
3. Verify Steady State:
    1. Wait's that the cluster is up and running.
    2. Start workflow instances on all partitions

```
chaos run follower-restart/experiment.json
```

#### Leader Restart
**Experiment:**
1. Verify Steady State:
    1. Wait's that the cluster is up and running.
    2. Start workflow instances on all partitions
2. Action;
    1. Detect Leader for partition 3
    2. Kill Leader for partition 3
3. Verify Steady State:
    1. Wait's that the cluster is up and running.
    2. Start workflow instances on all partitions

```
chaos run follower-restart/experiment.json
```
