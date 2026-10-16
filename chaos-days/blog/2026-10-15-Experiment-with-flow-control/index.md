---
layout: posts
title:  "Experiment with flow control"
date:   2026-10-15
categories:
  - chaos_experiment
  - performance
tags:
  - performance
  - availability
authors:
  - jon
  - zell
---

# Chaos Day Summary

While preparing the [Camunda 8.7 and beyond performance and reliability results](https://camunda.github.io/zeebe-chaos/2026/08/14/Camunda-8.7-and-beyond---performance-and-reliability) we realized that our load tests run with write flow control enabled, but flow control is not enabled by default in Camunda.
That means our results did not describe what we ship.

Today [Jon](https://github.com/multani) and I ran several load tests with different flow control settings to understand how flow control affects throughput and data availability, and whether our earlier results need a correction.

<!--truncate-->

**TL;DR;**

- The acceptable backlog mostly tunes data availability, not throughput. A large backlog means a large export delay, a small backlog means a small one.
- Without flow control the cluster processed about 295 PIs/s for roughly 2.5 hours, while the exporter backlog grew to about 46 million records. Afterwards throughput dropped to about 190 PIs/s.
- A write limit that is too low starves partitions. With a limit of 100 only partition one made progress, and the other partitions could not even finish bootstrapping.
- A backlog below the exporter throughput (5k) reduced processing throughput by about 20%.
- Going forward, load tests run with the default (vanilla) configuration, and tests with a specific flow control configuration are separate, explicit scenarios.
- We found two bugs along the way: deployments are redistributed on every redeploy, and Elasticsearch shards are unevenly used.

## Chaos Experiment

We used the max/stress scenario with 300 PIs/s and our default load test setup as the base. The default load test setup enables the following flow control configuration:

```yaml
camunda.processing.flow-control.write.enabled: "true"
camunda.processing.flow-control.write.limit: 10000
camunda.processing.flow-control.write.throttle.enabled: "true"
```

See the [flow control documentation](https://docs.camunda.io/docs/next/self-managed/operational-guides/configure-flow-control/#enable-flow-control) for the meaning of these settings. The default of `acceptable-backlog` is 100000 (`camunda.processing.flow-control.write.throttle.acceptable-backlog`).

We started one cluster per variation:

- **Base** (`c8-chaos-w42-baseline`): 300 PIs/s, default load test setup.
- **More PIs** (`c8-chaos-w42-pis-400`): `load-tester.starter.rate: 400`.
- **Lower write limit** (`c8-chaos-w42-lower-limit`): `camunda.processing.flow-control.write.limit: 100`.
- **Lower backlog** (`c8-chaos-w42-lower-limit-backlog`): `camunda.processing.flow-control.write.throttle.acceptable-backlog: 10000`.
- **No flow control** (`c8-chaos-w42-no-limit`): the three lines above removed from the default setup.

Later we added a sixth cluster after discussing the results:

- **Backlog 5k** (`c8-chaos-w42-backlog-5k`): `camunda.processing.flow-control.write.throttle.acceptable-backlog: 5000`.

### Expected

- **Base:** as usual about 220 PIs/s, a backlog of about 100k records per partition, and a data availability delay of 40 to 60 seconds.
- **More PIs:** we already reach the limit with 300 PIs/s, so more load should not change the result. It might even be slightly worse because of overstress.
- **Lower write limit:** a significant throughput drop, but good data availability and no backlog.
- **Lower backlog:** a throughput drop, good data availability, and a backlog as configured.
- **No flow control:** more PIs/s, but a huge backlog and worse data availability than the other configurations.

### Actual

The numbers below come from Prometheus over the whole run (about 3 to 4 hours per cluster). The backlog is the number of records not yet exported, per partition (3 partitions).

- **Base:** 246 PIs/s at the start, slowly declining to about 211 PIs/s. About 105k records not exported per partition.
- **More PIs:** 239 to 225 PIs/s, so no difference to the base. Same backlog as the base.
- **Lower write limit:** about 30 PIs/s (see below). The backlog was close to zero.
- **Lower backlog (10k):** 150 to 210 PIs/s, mostly around 200. The backlog stayed below about 45k records per partition.
- **Backlog 5k:** 173 to 189 PIs/s. The backlog was between 5k and 35k records per partition.
- **No flow control:** about 295 PIs/s for the first 2.5 hours, then about 190 PIs/s. The total backlog grew to about 46 million records.

#### Base

The base behaved as in previous runs, with a backlog of about 105k records per partition per exporter.

![](lower-backlog-comparison-base.png)

While looking at the base we noticed that deployments are continuously distributed to the other partitions. Our k6 script deploys the same resources again and again. A redeploy of identical resources should be idempotent, but a command distribution is created every time.

![](base-deployment-distribution.png)

#### Lower write limit

We approximated how many records a single PI writes in our load test to estimate the PIs/s a limit of 100 allows:

```sh
>>> fni=3
>>> (1 + fni + 1) * 4
20
>>> 100 / 20
5.0
>>> job=1
>>> picontainer=1
>>> (picontainer + fni + job) * 4
20
>>> (picontainer + fni + job) * 5
25
```

We expected about 5 PIs/s but reached about 3.

![](lower-limit-general.png)

Looking closer, partition one did much more than the other partitions.

![](lower-limit-different-processing.png)

Only partition one created PIs, jobs and variables.

![](lower-limit-p1-log.png)

The other partitions only received PI creation commands, and almost everything was rejected.

![](lower-limit-p3-log.png)

We also saw authorization commands being rejected and retried. These commands are created internally to bootstrap a partition. Our theory is that the rejections prevented the partitions from bootstrapping fully.

![](lower-limit-p3-log-auth.png)

The deployment distribution was affected as well. It could not succeed while the partitions were rejecting commands.

![](lower-limit-deploy-redistribution.png)

We raised the limit from 100 to 350 to see whether the limit correlates with what we saw in the metrics. After the change the authorization commands succeeded, the partitions started to complete jobs, and the deployment distribution finished.

![](lower-limit-deployment-success.png)

![](lower-limit-higher-350.png)

Even with 350 we could not see the limit directly reflected in the throughput. The cluster reached about 30 PIs/s and about 600 records/s.

![](lower-limit-higher-general.png)

![](lower-limit-higher-rate.png)

We are not sure yet how the configured limit maps to the observed throughput. We did not investigate this further.

#### Lower backlog

With an acceptable backlog of 10k we still reached a high throughput of about 200 PIs/s.

![](lower-backlog-general.png)

The exporter backlog is much lower than in the base, about a factor of 10. It is not exactly the configured value, so the setting does not behave like a hard per-second bound.

#### No flow control

Without flow control we reached about 295 PIs/s, but the exporter backlog kept growing until it reached about 46 million records. The exporting throughput is lower than the processing throughput, so nothing slows the processing down.

The exporting latency p99 of the base, the 400 PIs and the no-limit cluster was at the top bucket (10 s) of the histogram for the whole run, so it cannot show how large the delay really was. The lower limit cluster stayed at about 0.09 s.

#### Comparison and the 5k backlog

In the discussion we realized that the acceptable backlog only tunes the data availability. A large backlog leads to a large export delay and a small backlog to a small one.

The throughput is only slightly affected by the limit. What matters more is how fast the exporter cleans up and how fast new data can be accepted. Without flow control we reach 300 PIs/s because the exporter throughput is not respected. With the backlog enabled, processing waits for the exporter, so the exporter throughput sets the pace.

This led to an idea: what if the backlog is lower than the throughput the exporter can sustain? We would hope for the same throughput with an even better data availability.

We started `c8-chaos-w42-backlog-5k` to test this. We expected a lower backlog and better data availability at the same throughput, unless the limit is too low, in which case the throughput suffers.

![](lower-backlog-5k-comparison.png)

The exporter throughput was about 7k records/s. A backlog of 5k is about 30% below that, and processing throughput dropped by about 20% (188 PIs/s compared to 218 PIs/s with 10k).

![](lower-backlog-5k-comparison-throughput.png)

We assume a backlog around 8k gives the best combination of throughput and data availability. We did not test that.

The backlog also did not shrink as much as we expected. We did not find out why.

#### Uneven load on Elasticsearch

While looking at the 5k cluster we saw an uneven distribution of documents across the Elasticsearch shards.

![](shards-zeebe.png)

```
$ curl -s "localhost:9200/_cat/shards/zeebe*?v=true&bytes=gb"
index                                           shard prirep state       docs store dataset ip           node
zeebe-record_process-instance_8.11.0_2026-10-15 0     p      STARTED  3021041     0       0 10.152.31.66 elasticsearch-es-masters-1
zeebe-record_process-instance_8.11.0_2026-10-15 1     p      STARTED        0     0       0 10.152.25.2  elasticsearch-es-masters-0
zeebe-record_process-instance_8.11.0_2026-10-15 2     p      STARTED        0     0       0 10.152.25.2  elasticsearch-es-masters-0
zeebe-record_process-instance_8.11.0_2026-10-15 3     p      STARTED  2708256     0       0 10.152.31.66 elasticsearch-es-masters-1
zeebe-record_process-instance_8.11.0_2026-10-15 4     p      STARTED  2898537     0       0 10.152.25.2  elasticsearch-es-masters-0
```

Of the five process instance shards, two are empty. The exporters route each document by its partition id, so with three partitions only three distinct routing values exist, and these can collide in the same shard. [camunda/camunda#56522](https://github.com/camunda/camunda/pull/56522) changes the shard counts to address this.

We also noticed that many indices exist but hold no documents. Every shard has an overhead, see [Elastic's shard sizing guidance](https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/size-shards#each-shard-has-overhead). Our theory is that these empty indices and shards cost memory, but we did not verify it.

![](lower-backlog-5k-es-notdistributed.png)

## Conclusion

- **Base:** as expected, about 220 PIs/s and about 105k records not exported per partition.
- **More PIs:** the same result as the base, so 300 PIs/s already stresses the cluster.
- **Lower write limit:** a significant throughput drop, as expected. In addition a limit of 100 prevented partitions from bootstrapping, and the cluster recovered after we raised it.
- **Lower backlog:** a smaller throughput drop than expected (about 10%), with a much lower backlog.
- **Backlog below the exporter throughput:** processing throughput dropped by about 20%.
- **No flow control:** more throughput than the others for a while, but a growing backlog and a throughput drop later on.

The acceptable backlog is the knob for data availability, and the write limit protects the partitions in a way that is hard to reason about. A low limit can make a cluster unusable.

### Decision

Our load tests run with the default (vanilla) configuration, without flow control and without our other custom tweaks. We test what we ship. Tests with a specific flow control configuration run additionally, as separate scenarios. This will also matter when we start to test SaaS configurations.

After the experiments we started `c8-chaos-w42-no-limit-realistic`, a cluster with the default configuration and a more realistic load. It processes about 50 PIs/s with an exporting latency p99 of about 0.5 s and almost no backlog.

## Found Bugs

- Deployments are redistributed on every redeploy, even if the resources are identical.
- Elasticsearch shards are unevenly used, see [camunda/camunda#56522](https://github.com/camunda/camunda/pull/56522).
- Open question: why do we create indices that are never used?
