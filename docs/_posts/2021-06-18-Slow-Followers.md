---
layout: post
title:  "Slow followers"
date:   2021-06-18
categories: chaos_experiment broker performance follower
author: Christopher Zell ([@zelldon](https://github.com/zelldon))
---

# Chaos Day Summary

On this chaos day [@Deepthi](https://github.com/deepthidevaki) joined me to create some organized chaos. One of our first priority was to fix an unstable automated chaos experiment. The deployment distribution experiment failed since a week, it looked like it was related to how the experiment was set up. Furthermore, we wanted to experiment how slow followers impact the overall system. @Deepthi has found an interesting [paper](https://sigops.org/s/conferences/hotos/2021/papers/hotos21-s11-yoo.pdf), which described this issue and showed several failures in other distributed systems.

**TL;DR;** Zeebe seems to be reliable to withstand slow followers, no impact have been observed during the experiment.

## Deployment Distribution Experiment

On this automated experiment we create a network partition deploy a process (multiple versions) and remove the network partition again.
Afterwards, we expect that the process model is distributed to all partitions and that we can create process instances with the last version of this model on all partitions. See related [chaos day summary]({{ site.baseurl }}{% link _posts/2021-02-23-automate-deployments-dist.md %}).

As pointed out in this issue [zeebe-io/zeebe-chaos#61](https://github.com/zeebe-io/zeebe-chaos/issues/61). The automated experiment, fails because requests have been sent to an embedded gateway which was part of the network partition. This means the deployment command might fail, because it can't reach the partition one from the gateway. This shows again that it would be nice to have a standalone gateway in Camunda Cloud to experiment with such things more in isolation.

Furthermore, @Deepthi mentioned that it might be useful if we just run the experiment on Production L, against Partition one and four. Because currently it could happen that our network partition causes a leader change, which would make our experiment run useless.

**Example:**

For example lets take a look at the Production L partition distribution.
```
Distribution:
P\N|	N 0|	N 1|	N 2|	N 3|	N 4|	N 5
P 1|	L  |	F  |	F  |	-  |	-  |	-  
P 2|	-  |	L  |	F  |	F  |	-  |	-  
P 3|	-  |	-  |	L  |	F  |	F  |	-  
P 4|	-  |	-  |	-  |	L  |	F  |	F  
P 5|	F  |	-  |	-  |	-  |	L  |	F  
P 6|	F  |	F  |	-  |	-  |	-  |	L
L = Leader
F = Follower
P = Partition
N = Node
```
When we create a network partition between the Leader of partition one, and the Leader of partition three. It could happen that the Leader is on the same node (Node 2), then we would do nothing. 

If the Leader (for partition 1) is on Node 2 and Node 3 (for partition 3), then we can see that they share also the partition three.
```
Distribution:
P\N|	N 0|	N 1|	N 2|	N 3|	N 4|	N 5
P 1|	F  |	F  |	L  |	-  |	-  |	-  
P 2|	-  |	L  |	F  |	F  |	-  |	-  
P 3|	-  |	-  |	F  |	L  |	F  |	-  
P 4|	-  |	-  |	-  |	L  |	F  |	F  
P 5|	F  |	-  |	-  |	-  |	L  |	F  
P 6|	F  |	F  |	-  |	-  |	-  |	L
```

If we now disconnect both nodes (Node 2 and Node 3). It could happen that Node 2, which is follower for partition 3, starts a new leader election and becomes Leader. This would make the experiment also useless. To resolve this issue we decided to run the experiment against partition 4 only, because they are not overlapping.

### Fix

As written above we decided to create a network partition between Leaders of partition one and four, which means we will run the experiment only against Production L. This should be still fine, since before it was anyway quite likely that we haven't tested it correctly.

To resolve the real issue that we can't send the command from the embedded gateway to the deployment partition (Partition one), we decided to do the network partition only one way. This reduces the blast radius, since we still can send commands from one node to the other and are still able to block the deployment distribution from partition one. 

Related commit, which fixes that can be found [here](https://github.com/zeebe-io/zeebe-chaos/commit/be705b1e64f61123973222240d1bba98f1eb1323). We have run a QA Testbench run to verify whether it works, and it succeeded. Before it was quite likely to fail, we need to observe it over the next days.



## Chaos Experiment

On this experiment we wanted to verify what kind of inpact a slow Follower could have on a Zeebe cluster, related issue
[zeebe-io/zeebe-chaos#60](https://github.com/zeebe-io/zeebe-chaos/issues/60). This [paper](https://sigops.org/s/conferences/hotos/2021/papers/hotos21-s11-yoo.pdf) showed issues on other RAFT implementations, if the follower have been too slow.


### Expected

Part of this experiment we defined the hypothesis, that we expect the processing throughput wouldn't drop, even if a slow follower participates a cluster. The cluster should be stable, no leader elections nor other disruptions will be expected.

### Actual

In this section we will describe how we experienced the chaos experiment and what we observed. 

We have set up a cluster with three nodes, one partition and replication factor three, to focus on the impact and reduce the blast radius. The load was set up to 100 PI/s creations, and we run 6 workers. The CPU was reduced (in comparison to our normal benchmarks) to 3 cores, and the memory to 6 gigs.

The cluster in the steady state looked like this:

![base]({{ site.baseurl }}/assets/2021-06-18/base.png)

We saw a drop of the exporting because of the elasticsearch master preemption but after that everything was stable again. We can see that the Leader for partition one is Zeebe-1, which means Zeebe-0 and Zeebe-2 are the followers. We decided to run the experiment on Zeebe-0.


In order to slow down the follower we wanted to use the [stress](https://linux.die.net/man/1/stress) command, which can put a lot of load on a system.

```shell

STRESS(1)                    User Commands                    STRESS(1)

NAME
       stress - tool to impose load on and stress test systems

       ...
       
       -c, --cpu N
              spawn N workers spinning on sqrt()
```

We already hase some experiences and a related script, which shows how to use it. You can find it [here](
https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-experiments/scripts/stress-cpu.sh).

The command we run on Zeebe-0 was:

```shell
stress --cpu 256 --timeout 600
```

The command puts for 10 minutes load on the target pod CPU, we can see this also in the metrics.

![base]({{ site.baseurl }}/assets/2021-06-18/stress-resources.png)

The follower Zeebe-0 uses after running the command 3 CPU's, which is the max. We see in the RAFT specific metrics, that the follower misses some heartbeats first, but this doesn't seem to cause any issues.

![base]({{ site.baseurl }}/assets/2021-06-18/stress-atomix.png)

In general, neither the throughput nor anything else was affected. This satisfies our hypothesis, which means our experiment was successful :white_check_mark::rocket:

![base]({{ site.baseurl }}/assets/2021-06-18/stress-zeebe0.png)


#### Stress Follower One

Out of interested we thought, after stressing Follower Zeebe-0, we could stress Zeebe-2. Since Zeebe-0 was already lagging behind we expected that the throughput should now drop, since the Leader wouldn't be able to commit anymore. It is like to take both followers away, the cluster can't reach quorum anymore.

We saw a small dip in the processing throughput, but it recovered quite fast. This was because the other follower (Zeebe-0), was able to catch up.

![base]({{ site.baseurl }}/assets/2021-06-18/stress-other-follower.png)

In the RAFT metrics, we can see that the Follower Zeebe-2 is now lagging behind.

![base]({{ site.baseurl }}/assets/2021-06-18/stress-other-follower-behind.png)

Furthermore, we can see that he consumes all his CPU's. We haven't seen any memory issue, which was discovered by the Paper we referenced above.

![base]({{ site.baseurl }}/assets/2021-06-18/stress-other-follower-res.png)

It shows one more Zeebe seems to be able to withstand such a scenario. :muscle:


{% if page.author %}<sup>*Written by: {{page.author}}*</sup>{% endif %}
