---
layout: posts
title:  "Job push overloading"
date:   2023-11-30
categories: 
  - chaos_experiment 
  - bpmn
tags:
  - availability
authors: zell
---

# Chaos Day Summary

In today's chaos day we want to verify how job push behaves on several failure cases.

**TL;DR;** 

<!--truncate-->

## Chaos Experiment

Firstly we want to verify that job push will not overload a worker or gateway when workers are slow.

### Expected

We expect that if the workers are slowing down, the load is distributed to other workers (if available), and in it is expected that the general performance (of the affected process instance) should be slow down. We we wouldn't expect any restarts/failures on gateway or workers.



### Actual

## Found Bugs


