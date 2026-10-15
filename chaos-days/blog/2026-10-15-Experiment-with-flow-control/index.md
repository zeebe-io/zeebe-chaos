---
layout: posts
title:  "Experiment with flow control"
date:   2026-10-15
categories: 
  - chaos_experiment 
  - bpmn
tags:
  - availability
authors: 
  - jon
  - zell
---

# Chaos Day Summary

We realized that flow control is enable in ouar load test by default but not default in Camunda 


which make the results from 

https://camunda.github.io/zeebe-chaos/2026/08/14/Camunda-8.7-and-beyond---performance-and-reliability

a bit off - we want to investigate the effect of flow control on the throughput and availability of the system. And correct the results if needed and possible



**TL;DR;** 

<!--truncate-->

## Chaos Experiment


 - Base: We start a cluster with 300 PIs (max/stress scenario) and our default setup 
 - We start a cluster with 400 PIs and our default setup
 - We start a cluster with 300 PIs lower limits
   -> camunda.processing.flow-control.write.throttle.acceptable-backlog: 10000
   -> camunda.processing.flow-control.write.limit: 100
 - We start a cluster with 300 PIs and no flow control
 


### Expected
https://docs.camunda.io/docs/next/self-managed/operational-guides/configure-flow-control/#enable-flow-control

- write limit of 10k (idk ?)
- we have exporting limit


1 EXP:

Jon: expectation is when we reach already the limit with 300 PIs and do more load (like 500 PIs) then it shouldn't change the result?

-> more backpressure? but the overall throughput doesnt change? like we reach ~220

ALTERNATIVe - can we decrease the write limit and what happens now?

-> expectation is that the throughput will decrease and we will have more backpressure 

I would expect that the backlog of exporting will decrease and we have a better data availability metric 

We can make uuse of flow control endpoint https://docs.camunda.io/docs/next/self-managed/operational-guides/configure-flow-control/#configure-temporary-write-limits



2 EXP

> CURRENT DEFAULT <

What happens if we have no flow control?

3 EXP


Expected 


- Base:  c8-chaos-w42-baseline
  - as usual reaching ~220 PIs - data avail ~40-60s - and 100k exporter backlog
- More PIs c8-chaos-w42-pis-400
  - maybe we reach even less because we overstress ? Otherwise -> as usual reaching ~220 PIs - data avail ~40-60s - and 100k exporter backlog
- Less write limit c8-chaos-w42-lower-limit - 100 
  - significant drop in throughput but - quite good data availability - no backlog
  - throughput is lower then the other config 
- less backlog c8-chaos-w42-lower-limit-backlog
  - significant drop in throughput but - quite good data availability - backlog as configured
- No flow control c8-chaos-w42-no-limit
  - i would expect that we reach more PIs - but have a huge backlog and data availability is worse then the other config


### Actual

We started several clusters with different configurations

- Base:  c8-chaos-w42-baseline
- More PIs c8-chaos-w42-pis-400
- Less write limit c8-chaos-w42-lower-limit
- less backlog c8-chaos-w42-lower-limit-backlog
- No flow control c8-chaos-w42-no-limit


#### Base


We have a bug with deployment distribution detected


base-deployment-distribution.png

#### Lower limit

Approximating how many records we write
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

So expected somehow 5 PIs - we reached 3 PIs

![](lower-limit-general.png)


We realized that the parition one does more than the other partitions 



lower-limit-different-processing.png


One bug we found is that deployment is always redistributed - we introduced a k6 deployment script which always deployes the same resources this should be idempotent but it is not.

DEPLOYMENT IMAGE INSERT HERE


We saw an interesting behavior - only partition one is actively doing something
like PI, job and variable creations

lower-limit-p1-log.png


The others only seem to get PI creations, nothing else - it also seems that we are rejecting almost everything

lower-limit-p3-log.png

In addition we can see that authorization commands are created (which is something internal to bootstrap the partition) - these are rejected and retried as well - which probably stops the partition to bootstrap fully?!


lower-limit-p3-auth.png


> We'll change the 100- limit to 350 to see if there's a correlation between the limit and what we are seeing in the metric

After increasing the limit we see that authorization is done and the partitions can do completions as well 


lower-limit-higher-limit 


After the limit change the deployment distribution succeeded as well - we can see that no longer distribution happens (but still enqueing of the same resources - which is a bug we need to fix)

> we had a discussion about the feature - more advanced feature actually to play with

-> 


We cant see the limit reflected in our throughput we reach now 30 PIS and ~600 records?


lower-limit-higher-general.png


lower-limit-higher-rate.png


## Backlog lower limit


lower-backlog-general

Quite high throughput still


We can see that the backlog of exporter is much lower than the base line - still it is not exact what we set it to - it doesnt seem to be per second

lower-backlog-comparison

the factor is still reflect - factor 10 reduction


## No limit

comparin no limit we reach 300 PIS and growing backlog of exporters when looking at we were around 8 million

This is because exporting throughput is lower then processing throughput

## Comparison


> discussion about the limit abd backlog

We realized that the backlog is actually just tuning the data availability - large backlog -> large data avail - low backlog -> low data avail

No matter what the limit is the throughput is only slightly affected - this is because it matters more how fast we are cleaning up - so how hight the exporter throughput is and new data can be accepted

We reach 300 in the no limit - because we dont respect the exporter throughput when enabling the backlog we actually do and wait for the exporting to keep up so we are bound to the exporting throughput - it gives us the pace


Idea: what if the limit is lower than the throughput - we would have a great data availability again with the same processing throughput?


Starting c8-chaos-w42-backlog-5k with:

camunda.processing.flow-control.write.throttle.acceptable-backlog: 5000 # default 100000



Expectation: we should see a lower backlog and better data availability - but the throughput should be the same as the base line if the limit is to low then the throughput will be impacted as well 

lower-backlog-5k-comparison

lower-backlog-5k-general

lower throughtput -0 but backlog is also higher then expected - we need to investigate why the backlog is not lower - maybe we need to set the limit as well?

Processing --throughput P-->>>    [ QUEUE LIMIT X ]  ---consume---> Exporter --Throughput Y-> ES



We saw an uneven distribution of load 


```
$ curl -s "localhost:9200/_cat/shards/zeebe*?v=true&bytes=gb"
index                                           shard prirep state       docs store dataset ip           node
zeebe-record_variable_8.11.0_2026-10-15         0     r      STARTED 16176931     2       2 10.152.31.66 elasticsearch-es-masters-1
zeebe-record_variable_8.11.0_2026-10-15         0     p      STARTED 16178904     2       2 10.152.25.2  elasticsearch-es-masters-0
zeebe-record_process_8.11.0_2026-10-15          0     r      STARTED        6     0       0 10.152.22.2  elasticsearch-es-masters-2
zeebe-record_process_8.11.0_2026-10-15          0     p      STARTED        6     0       0 10.152.25.2  elasticsearch-es-masters-0
zeebe-record_process-instance_8.11.0_2026-10-15 0     r      STARTED  3021392     0       0 10.152.22.2  elasticsearch-es-masters-2
zeebe-record_process-instance_8.11.0_2026-10-15 0     p      STARTED  3021041     0       0 10.152.31.66 elasticsearch-es-masters-1
zeebe-record_process-instance_8.11.0_2026-10-15 1     r      STARTED        0     0       0 10.152.22.2  elasticsearch-es-masters-2
zeebe-record_process-instance_8.11.0_2026-10-15 1     p      STARTED        0     0       0 10.152.25.2  elasticsearch-es-masters-0
zeebe-record_process-instance_8.11.0_2026-10-15 2     r      STARTED        0     0       0 10.152.31.66 elasticsearch-es-masters-1
zeebe-record_process-instance_8.11.0_2026-10-15 2     p      STARTED        0     0       0 10.152.25.2  elasticsearch-es-masters-0
zeebe-record_process-instance_8.11.0_2026-10-15 3     p      STARTED  2708256     0       0 10.152.31.66 elasticsearch-es-masters-1
zeebe-record_process-instance_8.11.0_2026-10-15 3     r      STARTED  2708256     0       0 10.152.25.2  elasticsearch-es-masters-0
zeebe-record_process-instance_8.11.0_2026-10-15 4     r      STARTED  2898876     0       0 10.152.22.2  elasticsearch-es-masters-2
zeebe-record_process-instance_8.11.0_2026-10-15 4     p      STARTED  2898537     0       0 10.152.25.2  elasticsearch-es-masters-0

```

> why we create indices but not using them


```

[15-10-2026 14:39:41 +02:00]: ~ k8s:camunda-benchmark-prod:c8-chaos-w42-backlog-5k 
$ curl -s "localhost:9200/_cat/shards/camunda*?v=true&bytes=gb"
index                                          shard prirep state   docs store dataset ip           node
camunda-user-8.8.0_                            0     r      STARTED    0     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-user-8.8.0_                            0     p      STARTED    0     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-usage-metric-8.8.0_                    0     r      STARTED    0     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-usage-metric-8.8.0_                    0     p      STARTED    0     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-group-8.8.0_                           0     r      STARTED    0     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-group-8.8.0_                           0     p      STARTED    0     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-correlated-message-subscription-8.8.0_ 0     p      STARTED    0     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-correlated-message-subscription-8.8.0_ 0     r      STARTED    0     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-history-deletion-8.9.0_                0     r      STARTED    0     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-history-deletion-8.9.0_                0     p      STARTED    0     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-agent-definition-8.10.0_               0     r      STARTED    0     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-agent-definition-8.10.0_               0     p      STARTED    0     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-tenant-8.8.0_                          0     r      STARTED    6     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-tenant-8.8.0_                          0     p      STARTED    6     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-wait-state-8.10.0_                     0     p      STARTED   38     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-wait-state-8.10.0_                     0     r      STARTED   33     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-agent-instance-8.10.0_                 0     p      STARTED    0     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-agent-instance-8.10.0_                 0     r      STARTED    0     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-role-8.8.0_                            0     r      STARTED    9     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-role-8.8.0_                            0     p      STARTED    9     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-global-listener-8.9.0_                 0     r      STARTED    0     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-global-listener-8.9.0_                 0     p      STARTED    0     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-job-metrics-batch-8.9.0_2026-10-15     0     p      STARTED  122     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-job-metrics-batch-8.9.0_2026-10-15     0     r      STARTED  122     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-web-session-8.8.0_                     0     r      STARTED    0     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-web-session-8.8.0_                     0     p      STARTED    0     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-usage-metric-tu-8.8.0_                 0     r      STARTED    0     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-usage-metric-tu-8.8.0_                 0     p      STARTED    0     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-cluster-variable-8.9.0_                0     p      STARTED    0     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-cluster-variable-8.9.0_                0     r      STARTED    0     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-mapping-rule-8.8.0_                    0     p      STARTED    0     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-mapping-rule-8.8.0_                    0     r      STARTED    0     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-agent-history-8.10.0_                  0     r      STARTED    0     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-agent-history-8.10.0_                  0     p      STARTED    0     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-job-metrics-batch-8.9.0_               0     r      STARTED    0     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-job-metrics-batch-8.9.0_               0     p      STARTED    4     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-deployed-resource-8.10.0_              0     p      STARTED    0     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-deployed-resource-8.10.0_              0     r      STARTED    0     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-authorization-8.8.0_                   0     r      STARTED   60     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-authorization-8.8.0_                   0     p      STARTED   60     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-usage-metric-8.8.0_2026-10-01          0     r      STARTED   62     0       0 10.152.31.66 elasticsearch-es-masters-1
camunda-usage-metric-8.8.0_2026-10-01          0     p      STARTED   61     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-audit-log-cleanup-8.9.0_               0     r      STARTED    0     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-audit-log-cleanup-8.9.0_               0     p      STARTED    0     0       0 10.152.25.2  elasticsearch-es-masters-0
camunda-audit-log-8.9.0_                       0     p      STARTED    0     0       0 10.152.22.2  elasticsearch-es-masters-2
camunda-audit-log-8.9.0_                       0     r      STARTED    0     0       0 10.152.31.66 elasticsearch-es-masters-1

```


 theory - every shards as impact on memory

 https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/size-shards#each-shard-has-overhead



 lower-backlog-5k-es-notdistributed.png

 We can see that low on es is niot werll distributed

## Conculsion


- Base:  c8-chaos-w42-baseline
  - as usual reaching ~220 PIs - data avail ~40-60s - and 100k exporter backlog
  - ok
- More PIs c8-chaos-w42-pis-400
  - maybe we reach even less because we overstress ? Otherwise -> as usual reaching ~220 PIs - data avail ~40-60s - and 100k exporter backlog
  - we reaches similar load 
- Less write limit c8-chaos-w42-lower-limit - 100
  - significant drop in throughput but - quite good data availability - no backlog
  - throughput is lower then the other config
  -> Significant - we had even an issue to bootstrap a partition
  -> after increas we recovered
  - less backlog c8-chaos-w42-lower-limit-backlog
    - significant drop in throughput but - quite good data availability - backlog as configured
    - here we had not signification drop - but better data availability 
  - limit backlog under throughput 
    - 5k vs 7k exporter throughput - difference of 30%
    - now processing throughput dropped by 20%
    -> 8k we probably get the best results - of throughput and data availability
- No flow control c8-chaos-w42-no-limit
  - i would expect that we reach more PIs - but have a huge backlog and data availability is worse then the other config
   - we reached 300 pis - and huge backlog



Results


- lets define that load tests should run with vanilla config - no flow control - no loeader distribution etc
- "We test what we ship"
- In addition always have additional tests with flow control enabled 
 -> actually when we start to test SaaS it will be come in place as well





- > flow control removal?!

----> best case test? Or specific with flow control?
- ideally we have just the default config



--------? we started a load test with realistic load 







## Found Bugs

 - deployments distribution ? 
 - sharding ?! ask some question why this approach?
 - 
