---
layout: posts
title:  "High Snapshot Frequency"
date:   2022-02-01
categories: 
  - chaos_experiment 
  - data
tags:
  - availability
authors: zell
---

# Chaos Day Summary

Today we want to experiment with the snapshot interval and verify that a high snapshot frequency it will not impact our availability ([#21](https://github.com/zeebe-io/zeebe-chaos/issues/21)).


**TL;DR;** 

<!--truncate-->

## Chaos Experiment

### Snapshot Interval

As we can see in the [docs](https://docs.camunda.io/docs/self-managed/zeebe-deployment/operations/resource-planning/#snapshots) a snapshot is defined as:

> A snapshot is a projection of all events that represent the current running state of the processes running on the partition. It contains all active data, for example, deployed processes, active process instances, and not yet completed jobs.

Per default snapshots are taken every 5 minutes, by leaders and followers. If a follower is lagging behind (with replication) the leader will, after reaching a certain threshold, prefer to send the follower a snapshot instead of replicating X amount of records. We recently observed that this currently happens quite often, see [#8565](https://github.com/camunda-cloud/zeebe/issues/8565).

The snapshot interval can be changed via an environment variable: `ZEEBE_BROKER_DATA_SNAPSHOTPERIOD`

### Expected

We expect that even if the snapshot interval is low (so the frequency of taking snapshot is high) we not run into any availability issues and the cluster should still be healthy. Lower snapshot interval might impact the performance, since taking a snapshot can take some time but other than that it shouldn't have any effect.

### Actual

As usual, we run again two benchmarks to compare them. One base which has the [default benchmark configuration](https://github.com/camunda-cloud/zeebe/tree/develop/benchmarks/setup/default) and one with a changed snapshot interval.

For the second benchmark we set the snapshot interval to one minute. Like this:
```
env:
  ...
    - name: ZEEBE_BROKER_DATA_SNAPSHOTPERIOD
    value: "1m"
```

We can see not much difference throughput wise between both clusters. The cluster with the small snapshot interval shows no negative effects. What we can see is that the install request rate increased. It seems to be currently have no affect, but it is likely that if more partitions are added it might become an issue. Further investigation needs to be done as part of [#8565](https://github.com/camunda-cloud/zeebe/issues/8565).

#### Smaller intervals

The smallest interval which Zeebe supports is `1m == 1 minute`. If we configured for example `1s`

```
env:
  ...
    - name: ZEEBE_BROKER_DATA_SNAPSHOTPERIOD
    value: "1s"
```

We see the following exception in the log and the broker fails to start.

```
java.lang.IllegalArgumentException: Snapshot period PT1S needs to be larger then or equals to one minute.
```


#### Bigger intervals

## Found Bugs

 * [#8565](https://github.com/camunda-cloud/zeebe/issues/8565)




