---
layout: posts
title:  "Dynamic Scaling with Dataloss"
date:   2023-12-19
categories: 
  - chaos_experiment 
  - bpmn
tags:
  - availability
authors: lena
---

# Chaos Day Summary

We continue our [previous experiments](../2023-12-18-Dynamically-scaling-brokers/index.md) with dynamically scaling by now also testing whether
the cluster survives dataloss during the process.

One goal is to verify that we haven't accidentally introduced a single point of failure in the cluster.
Another is to ensure that data loss does not corrupt the cluster topology.

**TL;DR;**
Even with dataloss, the scaling completes successfully and with the expected results.
We found that during scaling, a single broker of the previous cluster configuration can become a single point of failure by preventing a partition from electing a leader.
This is not exactly a bug, but something that we want to improve.

<!--truncate-->

## Dataloss on the Coordinator

Zeebe uses Broker 0 as the coordinator for changes to the cluster topology.
While changes can only be initiated by the coordinator, losing the coordinator and it's data should not prevent the scaling operation from completing.
When the coordinator restarts without any data, it should be able to recover the cluster topology as well as the partition data from the remaining brokers.

To test this, we use the `zbchaos dataloss delete` and `zeebe dataloss recover` commands.
After deleting, the broker will not restart directly, instead waiting for the `zbchaos dataloss recover` command to be executed.
The `zbchaos dataloss recover` command only unblocks the broker and allows it to start, it does not restore any data and we rely on normal replication for that.

Shortly after triggering a scale up with `zbchaos cluster scale --brokers 6`, we trigger dataloss on the coordinator with `zbchaos broker dataloss delete --nodeId 0`.
After observing the system for a while, we then restore the coordinator with `zbchaos dataloss recover --nodeId 0`.

### Expected

The scaling operation eventually completes with the expected result of 6 brokers and 6 partitions, evenly distributed.
The coordinator recovers after dataloss and eventually receives the cluster topology from the remaining brokers.
The scaling operation should make progress while the coordinator is down.

### Actual

After starting the operation with `zbchaos cluster scale --brokers 6` we see that the operation has started:
```
$ zbchaos cluster scale --brokers 6
Change 18 is IN_PROGRESS with 0/24 operations complete
...
```

We then trigger dataloss on the coordinator with `zbchaos broker dataloss delete --nodeId 0`.

After this, the operations do not make progress anymore and broker 5 is stuck trying to join partition 5:

```json
{
  "Version": 18,
  ...
  "PendingChange": {
    "Id": 18,
    "Status": "IN_PROGRESS",
    "StartedAt": "",
    "CompletedAt": "",
    "InternalVersion": 0,
    "Completed": [
      {
        "Operation": "BROKER_ADD",
        "BrokerId": 3,
        "PartitionId": 0,
        "Priority": 0
      },
      {
        "Operation": "BROKER_ADD",
        "BrokerId": 4,
        "PartitionId": 0,
        "Priority": 0
      },
      {
        "Operation": "BROKER_ADD",
        "BrokerId": 5,
        "PartitionId": 0,
        "Priority": 0
      }
    ],
    "Pending": [
      {
        "Operation": "PARTITION_JOIN",
        "BrokerId": 5,
        "PartitionId": 5,
        "Priority": 2
      },
      ...
    ]
  }
}
```

The coordinator is a member of partition 5 but there are two remaining members of partition 5 that should allow broker 5 to join.
![](p5-roles.png)

After restoring the coordinator again with `zbchaos dataloss recover --nodeId 0`, joining eventually completes and the scaling operation finishes successfully.

![](scaleup-complete.png)

```json
{
  "Version": 19,
  "LastChange": {
    "Id": 18,
    "Status": "COMPLETED",
    "StartedAt": "2023-12-18T17:05:55.849442157Z",
    "CompletedAt": "2023-12-18T17:17:32.913050015Z"
  },
  "PendingChange": null
}
```

Overall, we achieve our goal that the scaling operation eventually completes with the expected result.
The coordinator recovers after dataloss and eventually receives the cluster topology from the remaining brokers.

However, it was unexpected that the scaling did not make progress while the coordinator was down.

## Single point of failure during scaling

The issue that scaling did not make progress while the coordinator was reproducible.
Eventually, we diagnosed it as the following edge case:

When scaling up and and adding a new member to the replication group of a partition, the raft partition goes through joint consensus.
The details of this process are described in the [raft paper](https://raft.github.io/raft.pdf), but here is a very short summary:
Joint consensus is similar to a 2-phase commit, where the leader of the partition first introduces a new _joint consensus_ configuration that requires quorum from both the old and new set of members.
After committing the joint consensus configuration, the leader leaves joint consensus by "forgetting" the old member set and only using the new member set.
Only after this second configuration is committed, joining of the new member is complete.

In our example, the new set of members has size 4, one of which is the coordinator and one is the newly joining member.
With 4 members, the quorum is 3, meaning that the partition can only elect a leader and process if at least 3 members are available.
In our experiment, we made the coordinator unavailable, so we were already down to 3 members.
Additionally, the newly joining member did not start yet because it was waiting for a successful join response from the leader.
The newly joining member never received such a response because the joint-consensus phase was not completed.
This resulted in only 2 out of 4 members being available, which is not enough to elect a leader.

We want to improve this behavior in the future but likely can't prevent it completely.
That means that there is an increased risk of unavailable partitions during scaling.
However, this only occurs if another broker becomes unavailable with an unfortunate timing and resolves itself automatically once the broker is available again.

Zeebe issue: https://github.com/camunda/camunda/issues/15679
