---
layout: post
title:  "Corrupted Snapshot"
date:   2021-04-29
categories: chaos_experiment bpmn
author: Christopher Zell ([@zelldon](https://github.com/zelldon))
---

# Chaos Day Summary

We had a while ago written an experiment, which should verify that followers are not able to become leader if they have a corrupted snapshot. You can find that [here](https://github.com/zeebe-io/zeebe-chaos/tree/master/chaos-experiments/helm/snapshot-corruption). This experiment was executed against Production-M and -S Camunda Cloud clusters. With the latest changes in upcoming 1.0 we changed a behavior in regard to detect snapshot corruption. 

*NEW* If a follower is restarted and has a corrupted snapshot it will detect it and will refuse to
start related services and crash. This means the pod will end in a crashloop, until this is manually
fixed.

*OLD* The follower only detects the corrupted snapshot on becoming leader when opening the database.

The behavior change caused to fail our automated chaos experiments, since we corrupt the snapshot on followers and on a later experiment we restart followers. For this reason we had to disable the execution of the snapshot corruption experiment, see related issue
[zeebe-io/zeebe-cluster-testbench#303](https://github.com/zeebe-io/zeebe-cluster-testbench/issues/303).

In this chaos day we wanted to investigate whether we can bring it back and improve this experiment. I also opened a issue to discuss the current approach [zeebe#6907](https://github.com/camunda-cloud/zeebe/issues/6907)

*TLDR* We removed 

## Chaos Experiment

### Expected

### Actual

## Found Bugs

{% if page.author %}<sup>*Written by: {{page.author}}*</sup>{% endif %}
