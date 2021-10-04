---
layout: posts
title:  "Fault-tolerant processing of process instances"
date:   2021-03-09
categories: chaos_experiment broker processing
authors: zell
---

# Chaos Day Summary

Today I wanted to add another chaos experiment, to increase our automated chaos experiments collection. This time we will deploy a process model (with timer start event), restart a node and complete the process instance via `zbctl`.

**TL;DR;**

I was able to create the chaos toolkit experiment. It shows us that we are able to restore our state after fail over, which means we can trigger timer start events to create process instances even if they have been deployed before fail-over. Plus we are able to complete these instances.

## Chaos Experiment

For testing, I have run our normal setup of three nodes, three partitions and replication factor three in our zeebe gke cluster.
Later I want to automate the experiment against the production cluster plans.

### Expected

We want to verify whether the processing of process instances continues even if we restart a leader in between. For that we do the following experiment:

1. Verify Steady State: All Pods are ready
  2. Introduce Chaos:
      1. *Action:* Deploy process with timer start event (`PT1M`)
      2. *Action:* Restart leader of partition one
      3. *Probe:* We can activate and complete an job of a specific type
3. Verify Steady State: All Pods are ready

**Note:** *We know that timer start events currently only scheduled on partition one, which means it is enough to just restart the leader of partition one for our experiment.* We use this property to reduce the blast radius. Later we could introduce an intermediate timer catch event and start many workflow instances on multiple partitions to verify whether this works on all partitions.

Model will look like this:

![model](chaosTimerStart.png))

### Experiment Definition

The experiment definition looks like the following:
```json
{
    "version": "0.1.0",
    "title": "Zeebe process instance continuation",
    "description": "Zeebe processing of process instances should be fault-tolerant. Zeebe should be able to handle fail-overs and continue process instances after a new leader starts with processing.",
    "contributions": {
        "reliability": "high",
        "availability": "high"
    },
    "steady-state-hypothesis": {
        "title": "Zeebe is alive",
        "probes": [
            {
                "name": "All pods should be ready",
                "type": "probe",
                "tolerance": 0,
                "provider": {
                    "type": "process",
                    "path": "verify-readiness.sh",
                    "timeout": 900
                }
            }
        ]
    },
    "method": [
        {
            "type": "action",
            "name": "Deploy process model",
            "provider": {
                "type": "process",
                "path": "deploy-specific-model.sh", 
                "arguments": [ "chaosTimerStart.bpmn" ]
            }
        },
         {
              "type": "action",
              "name": "Restart partition leader",
              "provider": {
                   "type": "process",
                   "path": "shutdown-gracefully-partition.sh",
                   "arguments": [ "Leader", "1" ]
              }
         },
        {
            "type": "probe",
            "name": "Complete process instance",
            "tolerance": 0,
            "provider": {
                "type": "process",
                "path": "complete-instance.sh",
                "arguments": ["chaos"],
                "timeout": 900
            }
        }
    ],
    "rollbacks": []
}
```

#### Timer start events

In order to trigger the timer start event, after 1 minute, after successful deployment. I used the following [feel expression](https://docs.camunda.io/docs/reference/feel/what-is-feel): `=now()+ duration("PT1M")`. This is necessary, since only date and cycle are supported for [timer start events](https://docs.camunda.io/docs/reference/bpmn-workflows/timer-events/timer-events/#timer-start-events).

#### Continue process instance

To continue and finish the process instance, we will activate the job with the `chaos` job type and complete that job. If there is no job to activate/complete we will loop here until we reach the timeout. With this we can make sure that the timer was scheduled and the process instance was created even after restart. We are not using here an job worker, since the activate-complete commands make it currently easier to mark it as success or fail. With the job worker we would introduce another concurrency layer. 

```shell
#!/bin/bash
set -euox pipefail

source utils.sh

jobType=$1
namespace=$(getNamespace)
pod=$(getGateway)

function completeJob() {
  # we want to first activate the job with the given job type and then complete it with the given job key
  # if we are not able to activate an job with the given type the function will return an error
  # and retried from outside
  jobs=$(kubectl exec -it "$pod" -n "$namespace" -- zbctl --insecure activate jobs "$jobType")
  key=$(echo "$jobs" | jq -r '.jobs[0].key')
  kubectl exec -it "$pod" -n "$namespace" -- zbctl --insecure complete job "$key"
}

retryUntilSuccess completeJob
```

### Outcome

After running this experiment we get the following output, which shows us that the experiment **SUCCEEDED**.

```shell
(chaostk) [zell helm/ cluster: zeebe-cluster ns:zell-chaos]$ chaos run process-continuation/experiment.json 
[2021-03-09 13:16:34 INFO] Validating the experiment's syntax
[2021-03-09 13:16:34 INFO] Experiment looks valid
[2021-03-09 13:16:34 INFO] Running experiment: Zeebe process instance continuation
[2021-03-09 13:16:34 INFO] Steady-state strategy: default
[2021-03-09 13:16:34 INFO] Rollbacks strategy: default
[2021-03-09 13:16:34 INFO] Steady state hypothesis: Zeebe is alive
[2021-03-09 13:16:34 INFO] Probe: All pods should be ready
[2021-03-09 13:16:35 INFO] Steady state hypothesis is met!
[2021-03-09 13:16:35 INFO] Playing your experiment's method now...
[2021-03-09 13:16:35 INFO] Action: Deploy process model
[2021-03-09 13:16:37 INFO] Action: Restart partition leader
[2021-03-09 13:16:46 INFO] Probe: Complete process instance
[2021-03-09 13:17:38 INFO] Steady state hypothesis: Zeebe is alive
[2021-03-09 13:17:38 INFO] Probe: All pods should be ready
[2021-03-09 13:17:38 INFO] Steady state hypothesis is met!
[2021-03-09 13:17:38 INFO] Let's rollback...
[2021-03-09 13:17:38 INFO] No declared rollbacks, let's move on.
```

#### Testbench

Tbd.

We have currently some problems with running the chaos experiments against camunda cloud, like [testbench#247](https://github.com/zeebe-io/zeebe-cluster-testbench/issues/247) or [testbench#248](https://github.com/zeebe-io/zeebe-cluster-testbench/issues/248). This is the reason why I postponed it.

#### Found Bugs

##### Chaos Experiments not working correctly
I realized that most of the experiments are no longer run correctly, since they referring to `"Leader"` as the raft role, where the raft role in the topology is `LEADER`. This causes that on some experiments pods are not really restarted.

Almost everywhere we use constructs like:

```shell

        {
            "type": "action",
            "name": "Terminate leader of partition 3",
            "provider": {
                "type": "process",
                "path": "shutdown-gracefully-partition.sh",
                "arguments": [ "Leader", "3" ]
            }
        }
```

In the utils script we use a `jq` expression to get the node which is in a certain state for a certain partition.

The `jq` expression looks like this:
```shell
  index=$(echo "$topology" | jq "[.brokers[]|select(.partitions[]| select(.partitionId == $partition) and .role == \"$state\")][0].nodeId")
```
`jq` is not able to find the raft `state` which is returned by topology, if we use not capital letters.

When we run the chaos experiment we see warnings like:

```shell
(chaostk) [zell helm/ cluster: zeebe-cluster ns:zell-chaos]$ chaos run process-continuation/experiment.json 
[2021-03-09 13:27:01 INFO] Validating the experiment's syntax
[2021-03-09 13:27:01 INFO] Experiment looks valid
[2021-03-09 13:27:01 INFO] Running experiment: Zeebe process instance continuation
[2021-03-09 13:27:01 INFO] Steady-state strategy: default
[2021-03-09 13:27:01 INFO] Rollbacks strategy: default
[2021-03-09 13:27:01 INFO] Steady state hypothesis: Zeebe is alive
[2021-03-09 13:27:01 INFO] Probe: All pods should be ready
[2021-03-09 13:27:02 INFO] Steady state hypothesis is met!
[2021-03-09 13:27:02 INFO] Playing your experiment's method now...
[2021-03-09 13:27:02 INFO] Action: Deploy process model
[2021-03-09 13:27:03 INFO] Action: Restart partition leader
[2021-03-09 13:27:05 WARNING] This process returned a non-zero exit code. This may indicate some error and not what you expected. Please have a look at the logs.

```

The experiment still continues (in effect it does nothing, since it was not able to find the right pod to restart).
Converting the state into capital letters fixes this issue easily.

```shell
function getIndexOfPodForPartitionInState()
{
  partition="$1"
  # expect caps for raft roles
  state=${2^^}
```

##### Redeployment causes retrigger timer

During running the chaos experiment and testing the scripts I realized that the timer start event is retriggered everytime I redeployed the exact deployment, which was kind of unexpected.
I created a bug issue for that [zeebe#6515](https://github.com/camunda-cloud/zeebe/issues/6515).


{% if page.author %}<sup>*Written by: {{page.author}}*</sup>{% endif %}
