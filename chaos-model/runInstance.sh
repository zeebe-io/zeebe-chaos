#!/bin/bash

# we need to replace steady-state-hypothesis because zeebe doesn't support variables names with dashes
# https://github.com/camunda-cloud/zeebe/issues/6717
zbctl --insecure create instance chaosExperiment --variables "$(sed 's/steady-state-hypothesis/steadyState/g' experiment.json)"
