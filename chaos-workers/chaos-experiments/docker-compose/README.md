# Chaos Experiments with Docker Compose

Make sure you have followed the [installation section](../README.md).

Further prerequisites are:

 * docker installation https://docs.docker.com/install/
 * docker compose installation https://docs.docker.com/compose/install/

## Run Chaos Experiments

Before you run one of these experiments, run `docker-compose up` in a different terminal. This will start the expected
setup for you.

It is necessary to activate your installed chaostoolkit environment to run chaos experiments.
In order to do so just run `source runChaos.sh` it will source the `~/.venvs/chaostk/bin/activate` and also add the 
script folders to your `PATH`. This makes it possible to run chaos experiments easily from the current directory.

After that you can for example run `chaos run broker-outage/experiment.json`
