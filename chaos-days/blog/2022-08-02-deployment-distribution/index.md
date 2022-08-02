---
layout: posts
title:  "deployment-distribution"
date:   2022-08-02
categories: 
  - chaos_experiment 
  - bpmn
  - deployment
tags:
  - availability
authors: zell
---

# Chaos Day Summary


We encountered recently a severe bug https://github.com/camunda/zeebe/issues/9877 where I was wondering why we haven't spotted it earlier, since we have chaos experiments for it. I realized two things:

 1) The experiments only checks for parts of it (BPMN resource only). The production code has changed, a new feature have been added (DMN) but the experiments / tests haven't been adjusted.
 2) More importantly we disabled the automated execution of the deployment distribution experiment because it was flaky due to some other circumstances https://github.com/zeebe-io/zeebe-chaos/issues/61

In this chaos day I want to bring the automation of this chaos experiment back to live. If I have still time I want to enhance the experiment. 

**TL;DR;** 

<!--truncate-->

## Chaos Experiment

In short, we will disconnect certain Leaders and deploy multiple process versions, after connecting the leaders again we expect that the deployments are distributed, and we can create instances of the last version on all partitions. For more details about the original experiment you can read https://zeebe-io.github.io/zeebe-chaos/2021/01/26/deployments/

First we will run the existing experiment against the latest minor version, to verify whether the experiment still works. Afterwards we will run it against SNAPSHOT. As the next step we will add DMN resources and try again with a version where the experiment should fail, and later we will go back to SNAPSHOT.

### Expected

After disconnecting, deploying and connecting the leaders again we expect that the deployment distribution will redistribute the deployments, and we can create a process instance of the last version.

### Actual

## Found Bugs


