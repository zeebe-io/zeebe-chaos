FROM openjdk:11-jre as pre

ARG TOKEN
ENV ZEEBE_VERSION=1.0.0-alpha4 \
    CHAOS_HOME=/home/chaos \
    CONTEXT=gke_camunda-cloud-240911_europe-west1-d_ultrachaos

WORKDIR ${CHAOS_HOME}
COPY installDependencies.sh .
ENV PATH "${CHAOS_HOME}:${PATH}"

# install dependencies
RUN ${CHAOS_HOME}/installDependencies.sh

# current user is root so we need to copy it to root
# probably we want to create a different user
RUN mkdir -p .kube
COPY kubeconfig /root/.kube/config
RUN kubectl config set-credentials ${CONTEXT}-zeebe-chaos-token-user --token ${TOKEN}
RUN kubectl config set-context ${CONTEXT} --user ${CONTEXT}-zeebe-chaos-token-user

FROM pre as runner

COPY chaos-worker/target/chaosWorker.jar chaosWorker.jar

# ./runWorker.sh
CMD java -jar chaosWorker.jar
