---
layout: posts
title:  "Job Push resiliency"
date:   2023-12-06
categories: 
  - chaos_experiment 
  - bpmn
tags:
  - availability
authors: zell
---

# Chaos Day Summary

In today's chaos day we wanted to experiment with Job push resiliency.

The following experiments are handled:

1. Job streams should be resilient to gateway restarts/crash (e.g. start X PIs, crash gateways, all PIs finish)
2. Job streams should be resilient to leadership changes
3. Job streams should be resilient to broker restarts/crashes

**TL;DR;** 

<!--truncate-->

## Chaos Experiment

Job streaming should be resilient to gateway restarts/crashes.

To reduce the blast radius and to better verify that it works we use a trimmed version of our benchmark setup.

Three brokers, one partition, replication factor three and one gateway. No starter nor workers.

In order to verify streaming, we set a very high polling interval.

Experiment will look like the following:

* Steady state:
  * Cluster is healthy
  * When creating an instance, and start streaming we can retrieve and complete the corresponding job
* Chaos injection:
  * Restarting the gateway
* Steady state:
    * Cluster is healthy
    * When creating an instance, and start streaming we can retrieve and complete the corresponding job

### Expected

We expect that even after a gateway restart we can retrieve a job (stream should be recreated)

### Actual

Worker has been deployed and configured with high polling interval 24hours

First we have to deploy a process:
```
zbchaos deploy process
Failed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource
Deployed given process model , under key 2251799813685249!
```

#### Steady state

We verify the readiness and the instance creation.

```sh
❯ zbchaos verify instance-creation --awaitResult --verbose
Flags: {1 LEADER -1  10  msg true 1 LEADER -1 2 LEADER -1 1701853048870 false false true false false 30 false -1 benchmark 30   1 1 benchmark-task}
Connecting to ck-np-chaos-day-job-push
Failed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource
Running experiment in self-managed environment.
Port forward to ck-np-chaos-day-job-push-zeebe-gateway-68695d9cb5-lhgg5
Successfully created port forwarding tunnel
We await the result of the process instance creation, thus we skip the partition id check.
Send create process instance command, with BPMN process ID 'benchmark' and version '-1' (-1 means latest) [variables: '', awaitResult: true]
Created process instance with key 2251799813685251 on partition 1, required partition 0.
The steady-state was successfully verified!
```

#### Injecting chaos

As next we will restart the gateway.

```shell
❯ zbchaos restart gateway --verbose
Flags: {1 LEADER -1  10  msg false 1 LEADER -1 2 LEADER -1 1701853221588 false false true false false 30 false -1 benchmark 30   1 1 benchmark-task}
Connecting to ck-np-chaos-day-job-push
Failed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource
Running experiment in self-managed environment.
Restarted ck-np-chaos-day-job-push-zeebe-gateway-68695d9cb5-lhgg5
```

#### Steady state

```shell
❯ zbchaos verify readiness
Failed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource
All Zeebe nodes are running.
```

```shell
❯ zbchaos verify instance-creation --awaitResult
Failed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource
The steady-state was successfully verified!
```

We observe in the metrics as well that the jobs have been pushed after the gateway restart. :white_check_mark:

![](job-push-gw-restart.png)


### Same with termination

We want to verify the same with terminating the gateway instead of a graceful shutdown.

```shell
❯ zbchaos terminate gateway --verbose
Flags: {1 LEADER -1  10  msg false 1 LEADER -1 2 LEADER -1 1701853482263 false false true false false 30 false -1 benchmark 30   1 1 benchmark-task}
Connecting to ck-np-chaos-day-job-push
Failed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource
Running experiment in self-managed environment.
Terminated ck-np-chaos-day-job-push-zeebe-gateway-68695d9cb5-jqfzg
```


```shell
❯ zbchaos verify readiness
Failed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource
All Zeebe nodes are running.
```

Out of interest what is happening in worker:

```
09:05:44.047 [pool-5-thread-3] WARN  io.camunda.zeebe.client.job.worker - Failed to stream jobs of type 'benchmark-task' to worker 'benchmark-worker'
io.grpc.StatusRuntimeException: UNAVAILABLE: io exception
...
```
Expected.

![](job-push-gw-terminate.png)

## Chaos Experiment

Leader restart 


1. verify readiness
2. leader restart
3. verify readiness

### Expected

Workers shouldn't care about leader change. Should be handled by the gateway.

### Actual

restart leader


verify readiness took a while but works

verify instance creation

works.


We see that jobs are pushed out based on the metrics. 


New leader knew the stream before and was able to push it out.

Topology panels are broken?!
Leaders where changing back - because of leader changer cronjob 
so we had twice leader change. it still worked.



## Chaos Experiment

Complete cluster restart




## Bug

* on restart - metrics are counted multipled times
* engine metrics are sometimes off
* handle exception on push - 

## Found Bugs


