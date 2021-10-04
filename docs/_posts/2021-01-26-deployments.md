---
layout: posts
title:  "Deployment Distribution"
date:   2021-01-26
categories: chaos_experiment broker network
authors: zell
---

# Chaos Day Summary

On this chaos day we wanted to experiment a bit with deployment's and there distribution.

We run a chaos experiment with deploying multiple workflows and disconnecting two leaders. We verified whether deployments are distributed later. The chaos experiment was successful and showed a bit how fault tolerant deployment distribution is. :muscle:

## Deployments

In order to continue here we need to explain how the workflow deployment and distribution actually works, if you know it then you can skip this section :wink:.

### Deployment Distribution

If you deploy a workflow and you have multiple partitions, Zeebe needs to make sure that all partitions eventually have the same version of the deployment. This is done with via the deployment distribution.

![distribution](distribution.png)

On deploying a workflow via a client, like the java client, we send a deployment command to the gateway. The gateway sends the received deployment to the "deployment partition", which is partition one. The partition one is in charge of distributing the deployment. When the client receives a response for the deployment command, this means that the deployment is written/created on partition one. It doesn't mean that it is distributed to all other partitions. The distribution is done asynchronously. 

This can cause issues, if you want to create workflow instances immediately after the deployment. If you try to create a workflow instance on a partition which hasn't received the deployment yet, then this creation will fail. The gateway sends commands, like workflow instance creation, in a round-robin fashion and if you have multiple partitions, then the chance that you hit another partition is quite high.

#### Reasoning

You may ask why we build it like that. Let me explain this a bit more.

##### Why isn't the gateway in charge of distributing the deployment?

Because the gateway is stateless. If the gateway restarts it has no state it can replay, so it is not able to retry the deployment distributions. If the gateway failed during deployment distribution some partition might lose the deployment update. In the broker we replay the state, which means we can detect whether we distributed the deployment already to a certain partition if not we can retry it.

##### Why the response isn't send after the distribution is done. Why it is build in an asynchronous way?

The simple answer would be, because it can take a long time until the deployment is distributed to all partitions. In a distributed system it is likely that a service fail, which means if one partition is not available the distribution is not complete. With the current approach you can already start creating instances at least at partition one and you can retry the requests if you get an rejection.

After the small excursion of how deployment distribution look like and why, we can start with our experiment to verify that it works as expected.

## Chaos Experiment

We have a standard setup of three nodes, three partitions and replication factor three.

### Expected

We deploy multiple versions (1000+) of a deployment and assume that at some point all deployments are distributed on all partitions and that we are able to create a workflow instance with the latest version on all partitions. The system should remain stable during distributing the deployments. This can be seen as the steady state.

If we now disconnect a leader of a different partition (different from partition one) with the leader of partition one, then the deployments can't be distributed. If we try to create workflow instances on that partition we should receive rejection's. After we connect them again the deployments should be distributed and we should be able to create workflow instances on that specific partition.

### Actual

#### Steady State

Following Java code was used to verify the steady state. In order to find out on which partition the workflow instances was created I used the `Protocol#decodePartitionId` method, which is available in the zeebe protocol module. This functionality and the property of the key's was already quite useful in the past on doing chaos experiments.


```java
import io.zeebe.client.ZeebeClient;
import io.zeebe.model.bpmn.Bpmn;
import io.zeebe.protocol.Protocol;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ChaosDayMain {


  private static final Logger LOG = LoggerFactory.getLogger(ChaosDayMain.class.getName());

  public static void main(String[] args) {
    final var zeebeClient = ZeebeClient.newClientBuilder().usePlaintext().gatewayAddress("localhost:26500").build();

    final var topology = zeebeClient.newTopologyRequest().send().join();
    LOG.info("{}", topology);

    var lastVersion = 0;
    for (int i = 0; i < 1_000; i++) {

      final var modelInstance = Bpmn.createExecutableProcess("workflow").startEvent().endEvent().done();

      final var workflow = zeebeClient.newDeployCommand()
          .addWorkflowModel(modelInstance, "workflow").send().join();
      lastVersion = workflow.getWorkflows().get(0).getVersion();
    }
    LOG.info("Last version deployed: {}", lastVersion);

    final var partitions = new ArrayList<>(List.of(1, 2, 3));

    while (!partitions.isEmpty()) {
      try {
        final var workflowInstanceEvent = zeebeClient.newCreateInstanceCommand()
            .bpmnProcessId("workflow")
            .version(lastVersion).send().join();
        final var workflowInstanceKey = workflowInstanceEvent.getWorkflowInstanceKey();
        final var partitionId = Protocol.decodePartitionId(workflowInstanceKey);

        partitions.remove(Integer.valueOf(partitionId));
        LOG.info("Created workflow instance on partition {}, {} partitions left ({}).", partitionId, partitions.size(), partitions);
      } catch (Exception e) {
        // retry
        LOG.info("Failed to create workflow instance", e);
      }

    }
  }
}
```

**Small Note** the line: `Bpmn.createExecutableProcess("workflow").startEvent().endEvent().done()` will always create a new version of a workflow, since internally new id's are generated.

After running the code above we can see following output:

```
13:45:00.606 [] [main] INFO  ChaosDayMain - TopologyImpl{brokers=[BrokerInfoImpl{nodeId=0, host='zell-chaos-zeebe-0.zell-chaos-zeebe.zell-chaos.svc.cluster.local', port=26501, version=0.27.0-SNAPSHOT, partitions=[PartitionInfoImpl{partitionId=1, role=FOLLOWER, health=HEALTHY}, PartitionInfoImpl{partitionId=2, role=FOLLOWER, health=HEALTHY}, PartitionInfoImpl{partitionId=3, role=LEADER, health=HEALTHY}]}, BrokerInfoImpl{nodeId=2, host='zell-chaos-zeebe-2.zell-chaos-zeebe.zell-chaos.svc.cluster.local', port=26501, version=0.27.0-SNAPSHOT, partitions=[PartitionInfoImpl{partitionId=1, role=LEADER, health=HEALTHY}, PartitionInfoImpl{partitionId=2, role=LEADER, health=HEALTHY}, PartitionInfoImpl{partitionId=3, role=FOLLOWER, health=HEALTHY}]}, BrokerInfoImpl{nodeId=1, host='zell-chaos-zeebe-1.zell-chaos-zeebe.zell-chaos.svc.cluster.local', port=26501, version=0.27.0-SNAPSHOT, partitions=[PartitionInfoImpl{partitionId=1, role=FOLLOWER, health=HEALTHY}, PartitionInfoImpl{partitionId=2, role=FOLLOWER, health=HEALTHY}, PartitionInfoImpl{partitionId=3, role=FOLLOWER, health=HEALTHY}]}], clusterSize=3, partitionsCount=3, replicationFactor=3, gatewayVersion=0.27.0-SNAPSHOT}
13:46:04.384 [] [main] INFO  ChaosDayMain - Last version deployed: 6914
13:46:04.434 [] [main] INFO  ChaosDayMain - Created workflow instance on partition 1, 2 partitions left ([2, 3]).
13:46:04.505 [] [main] INFO  ChaosDayMain - Created workflow instance on partition 2, 1 partitions left ([3]).
13:46:04.571 [] [main] INFO  ChaosDayMain - Created workflow instance on partition 3, 0 partitions left ([]).
```

As you can see in the version count I run it already multiple times :). With this we are able to verify our steady state, that the deployments are distributed to all partitions and that we are able to create workflow instances with the specific (last) version on all partitions.

*Side note, I needed multiple runs because there was a leader change (of partition one) in between and I had to adjust the code etc. Needs to be investigated whether the deployment distribution caused that.*

#### Chaos Injection (Method)

The following topology we used to determined who to disconnect:

```yaml
Cluster size: 3
Partitions count: 3
Replication factor: 3
Gateway version: 0.27.0-SNAPSHOT
Brokers:
  Broker 0 - zell-chaos-zeebe-0.zell-chaos-zeebe.zell-chaos.svc.cluster.local:26501
    Version: 0.27.0-SNAPSHOT
    Partition 1 : Leader, Healthy
    Partition 2 : Leader, Healthy
    Partition 3 : Follower, Healthy
  Broker 1 - zell-chaos-zeebe-1.zell-chaos-zeebe.zell-chaos.svc.cluster.local:26501
    Version: 0.27.0-SNAPSHOT
    Partition 1 : Follower, Healthy
    Partition 2 : Follower, Healthy
    Partition 3 : Follower, Healthy
  Broker 2 - zell-chaos-zeebe-2.zell-chaos-zeebe.zell-chaos.svc.cluster.local:26501
    Version: 0.27.0-SNAPSHOT
    Partition 1 : Follower, Healthy
    Partition 2 : Follower, Healthy
    Partition 3 : Leader, Healthy
```

Based on the work of the last chaos days we are able to disconnect brokers easily.
```sh
#!/bin/bash
set -exuo pipefail

source utils.sh

partition=1
namespace=$(getNamespace)
gateway=$(getGateway)

# determine leader for partition one
index=$(getIndexOfPodForPartitionInState "$partition" "LEADER")
leader=$(getBroker "$index")
leaderIp=$(kubectl get pod "$leader" -n "$namespace" --template="{{.status.podIP}}")

# determine leader for partition three

index=$(getIndexOfPodForPartitionInState "3" "FOLLOWER")
leaderTwo=$(getBroker "$index")
leaderTwoIp=$(kubectl get pod "$leaderTwo" -n "$namespace" --template="{{.status.podIP}}")

# To print the topology in the journal
retryUntilSuccess kubectl exec "$gateway" -n "$namespace" -- zbctl status --insecure

# we put all into one function because we need to make sure that even after preemption the 
# dependency is installed
function disconnect() {
 toChangedPod="$1"
 targetIp="$2"

 # update to have access to ip
 kubectl exec -n "$namespace" "$toChangedPod" -- apt update
 kubectl exec -n "$namespace" "$toChangedPod" -- apt install -y iproute2
 kubectl exec "$toChangedPod" -n "$namespace" -- ip route add unreachable "$targetIp"

}

retryUntilSuccess disconnect "$leader" "$leaderTwoIp"
retryUntilSuccess disconnect "$leaderTwo" "$leaderIp" 

```

We used partition three here, since the leader of partition one and two are the same node. After disconnecting and running the Java code from above, we get the following output:

```
14:11:56.655 [] [main] INFO  ChaosDayMain - Created workflow instance on partition 1, 1 partitions left ([3]).
14:11:56.713 [] [main] INFO  ChaosDayMain - Created workflow instance on partition 2, 1 partitions left ([3]).
14:11:56.777 [] [main] INFO  ChaosDayMain - Failed to create workflow instance
io.zeebe.client.api.command.ClientStatusException: Command 'CREATE' rejected with code 'NOT_FOUND': Expected to find workflow definition with process ID 'workflow' and version '8916', but none found
	at io.zeebe.client.impl.ZeebeClientFutureImpl.transformExecutionException(ZeebeClientFutureImpl.java:93) ~[zeebe-client-java-0.26.0.jar:0.26.0]
	at io.zeebe.client.impl.ZeebeClientFutureImpl.join(ZeebeClientFutureImpl.java:50) ~[zeebe-client-java-0.26.0.jar:0.26.0]
	at ChaosDayMain.main(ChaosDayMain.java:37) [classes/:?]
Caused by: java.util.concurrent.ExecutionException: io.grpc.StatusRuntimeException: NOT_FOUND: Command 'CREATE' rejected with code 'NOT_FOUND': Expected to find workflow definition with process ID 'workflow' and version '8916', but none found
	at java.util.concurrent.CompletableFuture.reportGet(CompletableFuture.java:395) ~[?:?]
	at java.util.concurrent.CompletableFuture.get(CompletableFuture.java:1999) ~[?:?]
	at io.zeebe.client.impl.ZeebeClientFutureImpl.join(ZeebeClientFutureImpl.java:48) ~[zeebe-client-java-0.26.0.jar:0.26.0]
	... 1 more
Caused by: io.grpc.StatusRuntimeException: NOT_FOUND: Command 'CREATE' rejected with code 'NOT_FOUND': Expected to find workflow definition with process ID 'workflow' and version '8916', but none found
	at io.grpc.Status.asRuntimeException(Status.java:533) ~[grpc-api-1.34.0.jar:1.34.0]
	at io.grpc.stub.ClientCalls$StreamObserverToCallListenerAdapter.onClose(ClientCalls.java:478) ~[grpc-stub-1.34.0.jar:1.34.0]
	at io.grpc.internal.ClientCallImpl.closeObserver(ClientCallImpl.java:617) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.ClientCallImpl.access$300(ClientCallImpl.java:70) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.ClientCallImpl$ClientStreamListenerImpl$1StreamClosed.runInternal(ClientCallImpl.java:803) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.ClientCallImpl$ClientStreamListenerImpl$1StreamClosed.runInContext(ClientCallImpl.java:782) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.ContextRunnable.run(ContextRunnable.java:37) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.SerializingExecutor.run(SerializingExecutor.java:123) ~[grpc-core-1.34.0.jar:1.34.0]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128) ~[?:?]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628) ~[?:?]
	at java.lang.Thread.run(Thread.java:834) ~[?:?]
14:11:56.846 [] [main] INFO  ChaosDayMain - Created workflow instance on partition 1, 1 partitions left ([3]).
14:11:56.907 [] [main] INFO  ChaosDayMain - Created workflow instance on partition 2, 1 partitions left ([3]).
14:11:56.971 [] [main] INFO  ChaosDayMain - Failed to create workflow instance
io.zeebe.client.api.command.ClientStatusException: Command 'CREATE' rejected with code 'NOT_FOUND': Expected to find workflow definition with process ID 'workflow' and version '8916', but none found
	at io.zeebe.client.impl.ZeebeClientFutureImpl.transformExecutionException(ZeebeClientFutureImpl.java:93) ~[zeebe-client-java-0.26.0.jar:0.26.0]
	at io.zeebe.client.impl.ZeebeClientFutureImpl.join(ZeebeClientFutureImpl.java:50) ~[zeebe-client-java-0.26.0.jar:0.26.0]
	at ChaosDayMain.main(ChaosDayMain.java:37) [classes/:?]
Caused by: java.util.concurrent.ExecutionException: io.grpc.StatusRuntimeException: NOT_FOUND: Command 'CREATE' rejected with code 'NOT_FOUND': Expected to find workflow definition with process ID 'workflow' and version '8916', but none found
	at java.util.concurrent.CompletableFuture.reportGet(CompletableFuture.java:395) ~[?:?]
	at java.util.concurrent.CompletableFuture.get(CompletableFuture.java:1999) ~[?:?]
	at io.zeebe.client.impl.ZeebeClientFutureImpl.join(ZeebeClientFutureImpl.java:48) ~[zeebe-client-java-0.26.0.jar:0.26.0]
	... 1 more
Caused by: io.grpc.StatusRuntimeException: NOT_FOUND: Command 'CREATE' rejected with code 'NOT_FOUND': Expected to find workflow definition with process ID 'workflow' and version '8916', but none found
	at io.grpc.Status.asRuntimeException(Status.java:533) ~[grpc-api-1.34.0.jar:1.34.0]
	at io.grpc.stub.ClientCalls$StreamObserverToCallListenerAdapter.onClose(ClientCalls.java:478) ~[grpc-stub-1.34.0.jar:1.34.0]
	at io.grpc.internal.ClientCallImpl.closeObserver(ClientCallImpl.java:617) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.ClientCallImpl.access$300(ClientCallImpl.java:70) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.ClientCallImpl$ClientStreamListenerImpl$1StreamClosed.runInternal(ClientCallImpl.java:803) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.ClientCallImpl$ClientStreamListenerImpl$1StreamClosed.runInContext(ClientCallImpl.java:782) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.ContextRunnable.run(ContextRunnable.java:37) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.SerializingExecutor.run(SerializingExecutor.java:123) ~[grpc-core-1.34.0.jar:1.34.0]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128) ~[?:?]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628) ~[?:?]
	at java.lang.Thread.run(Thread.java:834) ~[?:?]
```
Which is of course expected, since the deployment is not available at the third partition.

In the stackdriver we see also warnings regarding the deployment distribution:
```
2021-01-26 14:11:49.439 CET
Failed to push deployment to node 2 for partition 3
2021-01-26 14:11:49.439 CET
Failed to push deployment to node 2 for partition 3
2021-01-26 14:11:49.439 CET
Failed to push deployment to node 2 for partition 3
```

After we connected the leaders again (deleting the ip route), we can see in the application log that the exception changed to deadline exceeded and at some point we are able to create a workflow instance on partition three.

```
14:16:21.958 [] [main] INFO  ChaosDayMain - Created workflow instance on partition 1, 1 partitions left ([3]).
14:16:22.020 [] [main] INFO  ChaosDayMain - Created workflow instance on partition 2, 1 partitions left ([3]).
14:16:32.032 [] [main] INFO  ChaosDayMain - Failed to create workflow instance
io.zeebe.client.api.command.ClientStatusException: deadline exceeded after 9.999911981s. [remote_addr=localhost/127.0.0.1:26500]
	at io.zeebe.client.impl.ZeebeClientFutureImpl.transformExecutionException(ZeebeClientFutureImpl.java:93) ~[zeebe-client-java-0.26.0.jar:0.26.0]
	at io.zeebe.client.impl.ZeebeClientFutureImpl.join(ZeebeClientFutureImpl.java:50) ~[zeebe-client-java-0.26.0.jar:0.26.0]
	at ChaosDayMain.main(ChaosDayMain.java:37) [classes/:?]
Caused by: java.util.concurrent.ExecutionException: io.grpc.StatusRuntimeException: DEADLINE_EXCEEDED: deadline exceeded after 9.999911981s. [remote_addr=localhost/127.0.0.1:26500]
	at java.util.concurrent.CompletableFuture.reportGet(CompletableFuture.java:395) ~[?:?]
	at java.util.concurrent.CompletableFuture.get(CompletableFuture.java:1999) ~[?:?]
	at io.zeebe.client.impl.ZeebeClientFutureImpl.join(ZeebeClientFutureImpl.java:48) ~[zeebe-client-java-0.26.0.jar:0.26.0]
	... 1 more
Caused by: io.grpc.StatusRuntimeException: DEADLINE_EXCEEDED: deadline exceeded after 9.999911981s. [remote_addr=localhost/127.0.0.1:26500]
	at io.grpc.Status.asRuntimeException(Status.java:533) ~[grpc-api-1.34.0.jar:1.34.0]
	at io.grpc.stub.ClientCalls$StreamObserverToCallListenerAdapter.onClose(ClientCalls.java:478) ~[grpc-stub-1.34.0.jar:1.34.0]
	at io.grpc.internal.ClientCallImpl.closeObserver(ClientCallImpl.java:617) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.ClientCallImpl.access$300(ClientCallImpl.java:70) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.ClientCallImpl$ClientStreamListenerImpl$1StreamClosed.runInternal(ClientCallImpl.java:803) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.ClientCallImpl$ClientStreamListenerImpl$1StreamClosed.runInContext(ClientCallImpl.java:782) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.ContextRunnable.run(ContextRunnable.java:37) ~[grpc-core-1.34.0.jar:1.34.0]
	at io.grpc.internal.SerializingExecutor.run(SerializingExecutor.java:123) ~[grpc-core-1.34.0.jar:1.34.0]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128) ~[?:?]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628) ~[?:?]
	at java.lang.Thread.run(Thread.java:834) ~[?:?]
14:16:32.062 [] [main] INFO  ChaosDayMain - Created workflow instance on partition 1, 1 partitions left ([3]).
14:16:32.125 [] [main] INFO  ChaosDayMain - Created workflow instance on partition 2, 1 partitions left ([3]).
14:16:37.596 [] [main] INFO  ChaosDayMain - Created workflow instance on partition 3, 0 partitions left ([]).
```

We see the deadline exceeded, because the processor is not able to send the response's in time. The reason for that is probably because we have so many deployments to process, which have been pushed by the partition one.

The resource consumption around that time look ok. We can see that the memory spikes a bit, but it recovers later. On the CPU graph we can see when we connected the nodes again.

![res](res.png))

### Result

The chaos experiment was successful. The deployment was distributed even after a network disconnect and we were able to create workflow instance of the latest version on all partitions at the end.

With this experiment we were able to show that the deployment distribution is fault tolerant in way that it can handle unavailability of other partitions. This means eventually all partitions will receive there deployment's and we are able to create workflow instances on these partitions. 

#### Further work

Further possible experiments would be to restart the leader of partition one to see that even after restart we re-distribute the deployments. It is probably also interesting to see how the distribution behaves on more partitions than three.

During the experiment we have observed some leader changes. It needs to be investigated further, whether this was related to the deployments or something different. It is probably also interesting to see how it behaves with larger deployments, also resource consumption wise.

{% if page.author %}<sup>*Written by: {{page.author}}*</sup>{% endif %}
