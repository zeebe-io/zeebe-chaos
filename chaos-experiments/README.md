# Chaos Experiments

<details><summary>Installation</summary>
<p>
        
## Installation

If this is the first time you run the chaos tests you need to setup up some stuff on your machine.
For our chaos test we using a tool called [Chaostoolkit](https://github.com/chaostoolkit/chaostoolkit).

You can just follow https://docs.chaostoolkit.org/reference/usage/install/ or just read below.

> The chaostoolkit CLI is implemented in Python 3 and this requires a working Python installation to run. It officially supports Python 3.5+. It has only been tested against [CPython][python].

Make sure you have Python 3 installed on your machine. Then it is recommended to create an environment to run the chaos tests.

To create a new environment:
```
python3 -m venv ~/.venvs/chaostk
```

To use the environment run:
```
source  ~/.venvs/chaostk/bin/activate
```

Then install the chaostoolkit and necessary dependencies in this environment:

```
(chaostk) $ pip install chaostoolkit
(chaostk) $ pip install chaostoolkit-kubernetes
```

To access our gcloud cluster during the chaos test you need to create a new service account key (app-token) in the google cloud console.

https://console.cloud.google.com/apis/credentials/serviceaccountkey?authuser=1&project=zeebe-io

As service account use `zeebe-chaos-toolkit`.
This app token can you store somewhere in your home directory. You then need to set the path to this token as an env variable.

```
export GOOGLE_APPLICATION_CREDENTIALS=/home/user/chaos/zeebe-io-6a9c86d58c95.json
```

You should add this to you `~/.bashrc` or something similar.

</p>
</details>

## Run Chaos Experiments

Make sure you setup everything correctly and started a zeebe cluster via the helm charts. _Currently the chaos tests
expect 3 nodes with 3 partitions and replication factor 3._

To activate your enviroment and set some necessary paths just run `source runChaos.sh` in this directory.
It might make sense to run in parallel `kubectl get pods -w` so you can see what is happening during the experiment
and check the Grafana Dashboard continously.

### Example experiments:

#### Follower Restart

_Note:_ To test that we need only one partition instead of 3, otherwise every node is a leader.

**Experiment:**
1. Verify Steady State:
    1. Wait's that the cluster is up and running.
    2. Start workflow instances on all partitions
2. Action;
    1. Detect Follower for partition 3
    2. Kill Follower for partition 3
3. Verify Steady State:
    1. Wait's that the cluster is up and running.
    2. Start workflow instances on all partitions

```
chaos run follower-restart/experiment.json
```

#### Leader Restart
**Experiment:**
1. Verify Steady State:
    1. Wait's that the cluster is up and running.
    2. Start workflow instances on all partitions
2. Action;
    1. Detect Leader for partition 3
    2. Kill Leader for partition 3
3. Verify Steady State:
    1. Wait's that the cluster is up and running.
    2. Start workflow instances on all partitions

```
chaos run follower-restart/experiment.json
```

## Chaos tests with Snapshots

If you want to test current snapshot version you have to build and push docker images and use them in the 
kubernetes deployment.

### Build docker image for current snapshot

In the `https://github.com/zeebe-io/zeebe` repository execute the following
commands:

```
git checkout develop
git pull
clients/go/cmd/zbctl/build.sh && mvn clean install -T1C -DskipTests -pl dist -am
docker build --build-arg DISTBALL=dist/target/zeebe-distribution-*.tar.gz -t gcr.io/zeebe-io/zeebe:SNAPSHOT-$(date +%Y-%m-%d)-$(git rev-parse --short=8 HEAD) .
docker push gcr.io/zeebe-io/zeebe:SNAPSHOT-$(date +%Y-%m-%d)-$(git rev-parse --short=8 HEAD)
```

