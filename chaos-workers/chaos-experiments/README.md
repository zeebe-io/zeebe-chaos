# Chaos Experiments
        
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

## Run Chaos Experiments

Make sure you setup everything correctly. You can either run chaos experiments in a kubernetes setup, then please follow this [guide](kubernetes/README.md) or
via docker-compose then follow this [guide](docker-compose/README.md)

## Chaos tests with Snapshots

If you want to test a current snapshot version, you have to build and push a new docker image and use it in your setup.

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

