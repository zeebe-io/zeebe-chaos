# Chaos Scripts

This sub folder contain helper scripts, which are executed by the chaos experiments. Helm or camunda cloud experiments use them on running the experiments.

They are normally added to the `PATH` environment variable when sourcing the `runChaos.sh` script. 

With the environment variable `CHAOS_SETUP` the execution can be controlled per default it expecteds an camund cloud environment, but it can be changed to `helm`. Changing this variables causes to expect different kubernetes labels etc. on the deployments.
