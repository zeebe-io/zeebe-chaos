---
layout: post
title:  "Gateway Network Partition"
date:   2020-06-25
categories: chaos_experiment gateway
---

# Chaos Day Summary

 * Documented failure cases for AsyncSnasphortDirector. Gave me some ideas where it might make sense to reinstall partition. Discussed a bit with @Deepthi
 * Still our automated chaos experiments are not running. I need some time for that, but I had no time for that today.
 * Run a chaos experiment together with @pihme, where we do a network partition with the gateway.

## Chaos experiment:

Actually we already have an network partition experiment with the standalone Gateway, where we completely isolate the gateway and take a look whether it comes back after the network partition. Today we wanted to explore how it behaves when only one node and the gateway has a network partition, so Broker 0 and Gateway can't talk to each other.

### Expected during the experiment:

the topology stays the same, since gateway can ping indirectly (is discussable whether this is ideal or not)
when Broker 0 is leader for a partition then the processing for that partition stops but other partitions should not be affected
We can somehow determine in the metrics that they can't connect to each other
After connecting again the affected partition should recover

### Observations:

As expected we see no difference in the Topology. All commands which are send to that partition time out. Other partitions haven't been affected :+1: With the metrics we have we seen that: there is no progress in the partition, the partition is still healthy (which makes sense) and we see a lot of timeouts happening.

Unfortunately we need multiple metrics to correlate somehow that it might be due to connectivity issues. I think we can improve here. For example it is not directly visible that one partition stopped processing. For that @Peter Ihme had a good idea and we will add a new panel, which directly shows the current record processing stats. I think this is also useful for exporting to directly see whether we have currently exporting problems. Check the attached image.

What else is missing on the metrics side from my point of view:

 * a panel which shows me that all requests to a specific partition currently time out.
 * metrics for the transport between gateway and broker to better analyze problems like that. Would be nice to have [#4487](https://github.com/zeebe-io/zeebe/issues/4487) 
  * Liveness and Health stats of the Gateway in the metrics. I think this is currently not supported?

After reconnecting the nodes we saw that the related partition started to process again. Interesting was that it seems that there piled some traffic up and after reconnecting we saw a burst against partition one (partition 2 was disconnected), but this caused no issues.

I think was good and interesting experiment again and gave us a bit more insights what else we need.


![feedback]({{ site.baseurl }}/assets/2020-06-25/feedback.png)

![reduce2]({{ site.baseurl }}/assets/2020-06-25/reduce2.png)

## Participants

 * @pihme
 * @zelldon
