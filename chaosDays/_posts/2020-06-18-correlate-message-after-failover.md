---
layout: post
title:  "Correlate Message after failover"
date:   2020-06-18
categories: chaos_experiment
---

# Chaos day Summary:

* Documented failure cases for engine and stream processor. I think almost all possible failure cases I can think of we already handle, except problems on reading, which I think can't be handled.
* Checked what the current issue is with the automated chaos experiments. It seems it is a infra problem. You can check the discussion in #infra. It might be affected due to [Infra-1292](https://jira.camunda.com/browse/INFRA-1292)
* Run a chaos experiment, where we correlate a message after fail over.


## Chaos Experiment

* Start our normal setup and deploy a workflow with an intermediate message catch event.
* Publish a message and kill a random broker.
* Create a workflow instance and await the result.

I did this experiment several times and it works without any problems, as far as I can tell. First I was wondering that the message was only correlated to one instance, but this seems to be expected [message-correlation.html#message-cardinality](https://docs.zeebe.io/reference/message-correlation/message-correlation.html#message-cardinality) So learned something new today about our messages :grin:.

I prepared already an automatable chaos experiment for that. Have to fine tune it a bit.

No pictures today.
