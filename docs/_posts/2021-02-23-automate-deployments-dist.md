---
layout: post
title:  "Automating Deployment Distribution Chaos Experiment"
date:   2021-02-23
categories: chaos_experiment broker network deployment
author: Christopher Zell ([@zelldon](https://github.com/zelldon))
---

# Chaos Day Summary

This time I wanted to automate a chaos experiment via the [ChaosToolkit](https://chaostoolkit.org/), which I did on the last chaos day. For a recap check out the [last chaos day summary](
{{ site.baseurl }}{% link _posts/2021-01-26-deployments.md %}).

**TL;DR;**

I was able to automate the deployment distribution chaos experiment successfully and deployed it on testbench for a `Production - M` cluster plan.

## Chaos Experiment

For testing, I have run our normal setup of three nodes, three partitions and replication factor three.
Later I wanted to automate the experiment against the production cluster plans.

### Expected

We want to verify whether deployments are still distributed after a network partition, for that we will write the following chaos experiment:

1. Verify Steady State: All Pods are ready
  2. Introduce Chaos:
      1. *Action:* Disconnect two leaders (Leader of partition one and another leader)
      2. *Action:* Deploy multiple versions of a workflow
      3. *Action:* Connect two leaders again
      4. *Probe*: I can create workflow instance on all partitions with the last workflow version
3. Verify Steady State: All Pods are ready

### Experiment Definition

The experiment definition looks like the following:
```json
{
    "version": "0.1.0",
    "title": "Zeebe deployment distribution",
    "description": "Zeebe deployment distribution should be fault-tolerant. Zeebe should be able to handle network outages and fail-overs and distribute the deployments after partitions are available again.",
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
            "name": "Create network partition between leaders",
            "provider": {
                "type": "process",
                "path": "disconnect-leaders.sh"
            }
        },
        {
            "type": "action",
            "name": "Deploy different deployment versions.",
            "provider": {
                "type": "process",
                "path": "deploy-different-versions.sh",
                "arguments": ["Follower", "3"]
            }
        },
        {
            "type": "action",
            "name": "Delete network partition",
            "provider": {
                "type": "process",
                "path": "connect-leaders.sh"
            }
        },
        {
            "type": "probe",
            "name": "Create workflow instance of latest version on partition one",
            "tolerance": 0,
            "provider": {
                "type": "process",
                "path": "start-instance-on-partition-with-version.sh",
                "arguments": ["1", "10"],
                "timeout": 900
            }
        },
        {
            "type": "probe",
            "name": "Create workflow instance of latest version on partition two",
            "tolerance": 0,
            "provider": {
                "type": "process",
                "path": "start-instance-on-partition-with-version.sh",
                "arguments": ["2", "10"],
                "timeout": 900
            }
        },
        {
            "type": "probe",
            "name": "Create workflow instance of latest version on partition three",
            "tolerance": 0,
            "provider": {
                "type": "process",
                "path": "start-instance-on-partition-with-version.sh",
                "arguments": ["3", "10"],
                "timeout": 900
            }
        }
    ],
    "rollbacks": []
}
```


#### Create network partition between leaders

We reuse a script which we introduce in earlier chaos days. It needed to be improved a bit, since we haven't handled clusters where one node leads multiple partitions.

```shell
#!/bin/bash
set -exuo pipefail

source utils.sh

partition=1
namespace=$(getNamespace)
gateway=$(getGateway)

# determine leader for partition one
index=$(getIndexOfPodForPartitionInState "$partition" "LEADER")
leader=$(getBroker "$index")
leaderIp=$(kubectl get pod "$leader" -n "$namespace" --template="{{.status.podIP}}")

# determine leader for partition three
index=$(getIndexOfPodForPartitionInState "3" "LEADER")
leaderTwo=$(getBroker "$index")
leaderTwoIp=$(kubectl get pod "$leaderTwo" -n "$namespace" --template="{{.status.podIP}}")

if [ "$leaderTwo" == "$leader" ]
then
  # determine leader for partition two
  index=$(getIndexOfPodForPartitionInState "2" "LEADER")
  leaderTwo=$(getBroker "$index")
  leaderTwoIp=$(kubectl get pod "$leaderTwo" -n "$namespace" --template="{{.status.podIP}}")

  if [ "$leaderTwo" == "$leader" ]
  then
    # We could try to kill the pod and hope that he is not able to become leader again,
    # but there is a high chance that it is able to do so after restart. It can make our test fragile,
    # especially if we want to connect again, which is the reason why we do nothing in that case.
    exit
  fi
fi

# To print the topology in the journal
retryUntilSuccess kubectl exec "$gateway" -n "$namespace" -- zbctl status --insecure

# we put all into one function because we need to make sure that even after preemption the 
# dependency is installed
function disconnect() {
 toChangedPod="$1"
 targetIp="$2"

 # update to have access to ip
 kubectl exec -n "$namespace" "$toChangedPod" -- apt update
 kubectl exec -n "$namespace" "$toChangedPod" -- apt install -y iproute2
 kubectl exec "$toChangedPod" -n "$namespace" -- ip route add unreachable "$targetIp"

}

retryUntilSuccess disconnect "$leader" "$leaderTwoIp"
retryUntilSuccess disconnect "$leaderTwo" "$leaderIp" 
```


#### Delete network partition

Looks similar to the disconnect script.

##### Deploy different deployment versions

This script is interesting. My first approach was to have one workflow model, where I replace an comment via `sed` before redeploying. Later I realized it is much easier to just have two versions of the same worfklow model in the repository and deploy them in an alternating manner. This reduced the dependecy of an extra tool (`sed`), which might not be available everywhere or work differently on different linux distributions. 

```shell
#!/bin/bash

set -exuo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

bpmnPath="$scriptPath/../bpmn/"

# we put both together in one function to retry both, because it might be that pod has been restarted
# then the model is not longer on the node, which cause endless retries of deployments
function deployModel() {
  kubectl cp "$bpmnPath" "$pod:/tmp/" -n "$namespace"

  for i in {1..5}
  do
    # the models differ in one line, the share the same name and process id
    # if we deploy them after another it will create two different deployment versions
    # the deploy command only compares the last applied deployment - so we can do that in a loop to cause
    # multiple deployments
    kubectl exec "$pod" -n "$namespace" -- sh -c "zbctl deploy /tmp/bpmn/multi-version/multiVersionModel.bpmn --insecure"
    kubectl exec "$pod" -n "$namespace" -- sh -c "zbctl deploy /tmp/bpmn/multi-version/multiVersionModel_v2.bpmn --insecure"
  done
}

retryUntilSuccess deployModel
```

When running this script we deploy `10` new versions of the workflow `multiVersion`.

#### Create workflow instance of latest version on partition X

The following script allows us to be sure that we can create a workflow instance on a specific partition with the given version of the `multiVersion` workflow.
This means we can verify that on all partitions the last deployment version is deployed/distributed.

```shell
#!/bin/bash
set -xo pipefail

if [ -z "$1" ]
then
  echo "Please provide an required partition!"
  exit 1
fi

if [ -z "$2" ]
then
  echo "Please provide an required deployment version!"
  exit 1
fi

source utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

requiredPartition=$1
requiredDeploymentVersion=$2
processId="multiVersion"

# we put all into one function because we need to make sure that even after preemption the
# dependency are installed, which is in this case is the deployment
function startInstancesOnPartition() {

  partition=0
  until [[ "$partition" -eq "$requiredPartition" ]]; do
    workflowInstanceKey=$(kubectl exec "$pod" -n "$namespace" -- zbctl create instance "$processId" --version "$requiredDeploymentVersion" --insecure)
    workflowInstanceKey=$(echo "$workflowInstanceKey" | jq '.workflowInstanceKey')
    partition=$(( workflowInstanceKey >> 51 ))
    echo "Started workflow with key $workflowInstanceKey, corresponding partition $partition"
  done
}

retryUntilSuccess startInstancesOnPartition
```

### Outcome

After running this experiment we get the following output, which shows us that the experiment **SUCCEEDED**.

```shell
(chaostk) [zell camunda-cloud/ cluster: zeebe-cluster ns:zell-chaos]$ chaos run production-m/deployment-distribution/experiment.json 
[2021-02-23 14:15:06 INFO] Validating the experiment's syntax
[2021-02-23 14:15:06 INFO] Experiment looks valid
[2021-02-23 14:15:06 INFO] Running experiment: Zeebe deployment distribution
[2021-02-23 14:15:06 INFO] Steady-state strategy: default
[2021-02-23 14:15:06 INFO] Rollbacks strategy: default
[2021-02-23 14:15:06 INFO] Steady state hypothesis: Zeebe is alive
[2021-02-23 14:15:06 INFO] Probe: All pods should be ready
[2021-02-23 14:15:07 INFO] Probe: Should be able to create workflow instances on partition 3
[2021-02-23 14:15:10 INFO] Steady state hypothesis is met!
[2021-02-23 14:15:10 INFO] Playing your experiment's method now...
[2021-02-23 14:15:10 INFO] Action: Create network partition between leaders
[2021-02-23 14:15:26 INFO] Action: Deploy thousand different deployment versions.
[2021-02-23 14:15:31 INFO] Action: Delete network partition
[2021-02-23 14:15:43 INFO] Probe: Create workflow instance of latest version on partition one
[2021-02-23 14:15:43 INFO] Probe: Create workflow instance of latest version on partition two
[2021-02-23 14:15:51 INFO] Probe: Create workflow instance of latest version on partition three
[2021-02-23 14:15:52 INFO] Steady state hypothesis: Zeebe is alive
[2021-02-23 14:15:52 INFO] Probe: All pods should be ready
[2021-02-23 14:15:52 INFO] Probe: Should be able to create workflow instances on partition 3
[2021-02-23 14:15:55 INFO] Steady state hypothesis is met!
[2021-02-23 14:15:55 INFO] Let's rollback...
[2021-02-23 14:15:55 INFO] No declared rollbacks, let's move on.
[2021-02-23 14:15:55 INFO] Experiment ended with status: completed
```

#### Testbench

I executed the new experiment via zeebe testbench, to verify that this works with the `Production - M` cluster plan and it was successful :muscle:

![operate]({{ site.baseurl }}/assets/2021-02-23/operate-success.png)

```json
{"results":["production-m/deployment-distribution/experiment.json completed successfully","production-m/follower-restart/experiment.json completed successfully","production-m/follower-terminate/experiment.json completed successfully","production-m/leader-restart/experiment.json completed successfully","production-m/leader-terminate/experiment.json completed successfully","production-m/msg-correlation/experiment.json completed successfully","production-m/multiple-leader-restart/experiment.json completed successfully","production-m/snapshot-corruption/experiment.json completed successfully","production-m/stress-cpu-on-broker/experiment.json completed successfully","production-m/worker-restart/experiment.json completed successfully"]}
```

{% if page.author %}<sup>*Written by: {{page.author}}*</sup>{% endif %}
