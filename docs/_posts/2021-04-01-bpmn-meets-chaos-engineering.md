---
layout: post
title:  "Bpmn meets Chaos Engineering"
date:   2021-03-30
categories: chaos_experiment bpmn
author: Christopher Zell ([@zelldon](https://github.com/zelldon))
---

# Bpmn meets Chaos Engineering

On the first of April (2021) we did our Spring Hackday at Camunda. This time we wanted to orchestrate our Chaos Experiments with BPMN. If you already know how we automated our chaos experiments before, you can skip the next section
and jump directly to the [Hackday Project section](#hackday-project).

In order to understand this blogpost make sure that you have a little understanding of Zeebe and Camunda Cloud. Read the following resources to get a better understanding.

 * [Get Started with Camund cloud](https://docs.camunda.io/docs/guides/)
 * [Quickstart Guide](https://docs.camunda.io/docs/product-manuals/clients/cli-client/get-started)
 * [Camunda Cloud](https://camunda.com/de/products/cloud/)
 * [Zeebe Process Engine](https://docs.camunda.io/docs/product-manuals/zeebe/zeebe-overview/)
 * [BPMN 2.0](https://www.omg.org/spec/BPMN/2.0/About-BPMN/)
 

## Previous Chaos Automation 

In the previous Chaos Days I described that we use [ChaosToolkit](https://chaostoolkit.org/) to run our chaos experiments. The chaos experiments have as prerequisite that an Zeebe cluster is already running, on which they should be executed. ChaosToolkit needs/uses a specific DSL to execute Chaos Experiments. An example experiment looks like the following:

```json
{
    "version": "0.1.0",
    "title": "Zeebe follower restart non-graceful experiment",
    "description": "Zeebe should be fault-tolerant. Zeebe should be able to handle followers terminations.",
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
            },
            {
                "name": "Should be able to create workflow instances on partition 1",
                "type": "probe",
                "tolerance": 0,
                "provider": {
                    "type": "process",
                    "path": "verify-steady-state.sh",
                    "arguments": "1",
                    "timeout": 900
                }
            }
        ]
    },
    "method": [
        {
            "type": "action",
            "name": "Terminate follower of partition 1",
            "provider": {
                "type": "process",
                "path": "terminate-partition.sh",
                "arguments": [ "Follower", "1"]
            }
        }
    ],
    "rollbacks": []
}
```

The DSL describes a chaos experiment where a follower of partition one is terminated, and where we expect that we can create a process instance before and after this termination. The follower termination should not affect our steady state.

In the json structure we can see the defined steady state of the Zeebe Cluster and the method/action which should be executed (the chaos which should be injected). The defined steady state is verified at the beginning of the experiment and at the end, after the methods are executed. The execution logic is quite simple. You can also define rollback actions, which should be executed if the experiment fails. Timeouts can be defined for each action and probe. Since the chaos toolkit is written in Python you can reference python modules/functions, which should be called during execution. Additionally, it supports Bash scripts, which we normally use. These scripts are sometimes not easy to understand and to maintain. This is one of the reason why we already thought more than once to replace the ChaosToolkit with something different.

The Chaos Toolkit has more features and extensions, but these are not used by us. 

### List of Chaos Experiments

The experiment above is just one experiment of our continuous growing collection of chaos experiments, which we have already defined. There exist chaos experiments for the helm charts, but also for camunda cloud, for each cluster plan separately. You can find them [here](https://github.com/zeebe-io/zeebe-chaos/tree/master/chaos-experiments).

### Automated Chaos Experiments

The experiments need to be executed continously, not only once. For that we have build an automated pipeline, which runs the chaos experiments every night or if requested. We did that with help of the [Zeebe Cluster Testbench](https://github.com/zeebe-io/zeebe-cluster-testbench), we call it just `testbench`. The `testbench` creates for each cluster plan, in camunda cloud, a zeebe cluster and runs the corresponding experiments against these clusters.

![chaos-test]({{ site.baseurl }}/assets/2021-04-01/chaos-test.png)

This is done via a [zbctl chaos worker](https://github.com/zeebe-io/zeebe-cluster-testbench/tree/develop/core/chaos-workers), which is part of the `testbench`. The `chaos worker` polls for new jobs at the `testbench`. On new jobs it executes, based on the cluster plan, against the given/created zeebe cluster the chaos experiments, via the `chaostoolkit`.

In general this was a good first solution, which is quite extensible since we just needed to add new experiments in the zeebe-chaos repository and on the next run the experiments are executed, without any further adjustments. 

### Challenges

Still, we had some challenges with this approach. 

#### Additional Dependency

With the chaos toolkit we had an additional dependency. If you want to implement/write new chaos experiments you need to set up the chaos toolkit on your machine, with the correct Python etc. In general the setup guide was straight forward, but still it was something you need to have. It made the adoption harder.

#### Root Cause Analysis

Due to our setup and using the `chaosToolkit` it was a bit more challenging todo root cause analysis.

![ChaosOutput]({{ site.baseurl }}/assets/2021-04-01/ChaosOutput.png)

We run a zbctl worker in a pod, which picked up the `chaos` typed jobs. An zbctl worker will complete jobs with the output of the called handler script. This means that everything which you want to log, needs to be logged in a separate file. If you run `chaosToolkit` as part of the zbctl worker and the toolkit executes scripts then the output of these scripts will end in the `chaostoolkit.log` file. I tried to visualize this a bit with the image above.

![chaos-test]({{ site.baseurl }}/assets/2021-04-01/failed-chaos-experiment-testbench.png)

If the chaos worker completes a job the process instance in testbench can be continued. If a chaos experiment fails then the job is still completed normally, but with an error result which cause in the process instance execution a different path. The testbench will write a slack notification to a specific channel, such that the current Zeebe medic can look at it. 

![run-test]({{ site.baseurl }}/assets/2021-04-01/run-test-in-camunda-cloud.png)

After the notification the medic needs to find out which experiment has failed, this is part of the payload of the completed job at least, but he also needs to find out why the experiment failed. For this root cause analysis he has to check the log of the `chaostoolkit`, which is stored somewhere in the chaos worker pod (`data/chaostoolkit.log` it is an ever growing log).

## Hackday Project

With our Hackday Project we had two goals:

 1. lower the bar for team adoption 
 2. make root cause analysis easier
    
For that we wanted to replace chaos toolkit with a BPMN Process, which should be executed by Zeebe. We wanted to stick with the experiment description (the chaostoolkit/openchaos DSL) for our chaos experiments.

We modeled two processes. One root process, which reads for the specific cluster plan all experiments and runs then each experiment. This is done via a multi instance call activity.

![ChaosOutput]({{ site.baseurl }}/assets/2021-04-01/chaosToolkit.png)

The other process model is used for the real chaos experiment execution. As the chaos toolkit execution itself was quite simple, the resulting bpmn model is as well. All activities are
sequential multi instances, since we can have multiple probes/actions for the steady state, but also for the injection of chaos. On the root level of the process we have an interrupting event sub process to timeout the chaos experiment if the experiment takes to long.

![ChaosExperiment]({{ site.baseurl }}/assets/2021-04-01/chaosExperiment.png)

As payload of the process instances we have the defined chaos experiment in json, which we have seen earlier. In this DSL we have all information we need to orchestrate this experiment.

We have implemented two Kotlin workers, one to read all experiment files and one to execute the scripts, which are referenced in the chaos experiment descriptions. You can find the code [here](https://github.com/zeebe-io/zeebe-chaos/tree/master/chaos-model/chaos-worker), it is just 100 lines long.

### Results

We orchestrated the follower and leader termination and graceful shutdown experiments via Camunda Cloud and the created the process models. The experiments have been executed against another Zeebe cluster successfully.

![success]({{ site.baseurl }}/assets/2021-04-01/success-run.png)

To see how we improved the observability we also provoked an experiment to fail. 

**FAILURE PICTURE**

An timeout of an experiment will look like this:

![timeout]({{ site.baseurl }}/assets/2021-04-01/timeout-run.png)

As we can see the observability improved here a lot. We are able to understand why it failed based on the error message, since the complete error output is printed and we can see the progress of the process instance in running the chaos experiment. 

With these models we were able to completely replace the chaos toolkit usage, so in the end we can remove an additional dependency.

### Further Work

We plan to extend this, such that we replace step by step the current worker, which calls the scripts, by workers which have the script logic inside. For example with workers written in go or kotlin. This should improve the adoption further. 

For simplicity and to make progress we modeled quite generic process models, which are feed with the chaos experiment DSL. In the future we can also think of modeling the chaos experiments directly as BPMN model.

Thanks to [Peter](https://github.com/pihme) for giving me the impulse and his awesome work on `testbench` and [Philipp](https://github.com/saig0) which worked with me on this Hackday project.

{% if page.author %}<sup>*Written by: {{page.author}}*</sup>{% endif %}
