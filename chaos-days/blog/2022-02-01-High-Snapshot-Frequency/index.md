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

### Expected

We expect that even if the snapshot interval is low (so the frequency of taking snapshot is high) we not run into any availability issues and the cluster should still be healthy. Lower snapshot interval might impact the performance, since taking a snapshot can take some time but other than that it shouldn't have any effect.

### Actual



## Found Bugs


