# Camunda Cloud Chaos Experiments

Make sure that you have followed all [installation steps](../README.md).

In this sub folder the experiments targeting the camunda cloud environment. The experiments are separated by cluster plan, since each cluster plan has different configurations, partition count, node count etc.

In order to execute the chaos experiments you need to have access to the camunda cloud gke cluster. Make sure that your kubernetes context points to the right cluster and namespace. The experiments will use the current context as target to run the experiments against it.

As first step you should source the `runChaos.sh` script:

```sh
source runChaos.sh
```

This will activate your chaostoolkit environment and put the scripts into your path. After that you can start with executing the chaos experiments via `chaos run */experiment.json`
