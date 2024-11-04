"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[9142],{2642:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var s=n(18811),o=n(74848),a=n(28453);const i={layout:"posts",title:"Disconnect Leader and one Follower",date:new Date("2021-01-07T00:00:00.000Z"),categories:["chaos_experiment","broker","bpmn"],tags:["availability"],authors:"zell"},r="Chaos Day Summary",l={authorsImageUrls:[void 0]},c=[{value:"Preparation",id:"preparation",level:2},{value:"Resources",id:"resources",level:3},{value:"Script",id:"script",level:3},{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Hypothesis",id:"hypothesis",level:3},{value:"Actual",id:"actual",level:3},{value:"Disconnect",id:"disconnect",level:4},{value:"Connect",id:"connect",level:4},{value:"Result",id:"result",level:2},{value:"New Issues",id:"new-issues",level:2},{value:"Participants",id:"participants",level:2}];function h(e){const t={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(t.p,{children:["Happy new year everyone ","\ud83c\udf89"]}),"\n",(0,o.jsxs)(t.p,{children:["This time I wanted to verify the following hypothesis ",(0,o.jsx)(t.code,{children:"Disconnecting Leader and one Follower should not make cluster disruptive"})," (",(0,o.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/issues/45",children:"#45"}),").\nBut in order to do that we need to extract the Leader and Follower node for a partition from the Topology. Luckily in December we got an ",(0,o.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe/pull/5943",children:"external contribution"})," which allows us to print ",(0,o.jsx)(t.code,{children:"zbctl status"})," as json.\nThis gives us now more possibilities, since we can extract values much better out of it."]}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:"TL;DR"})," The experiment was successful ","\ud83d\udc4d"]}),"\n",(0,o.jsx)(t.h2,{id:"preparation",children:"Preparation"}),"\n",(0,o.jsxs)(t.p,{children:["Before we start with the experiment I wanted to extract the right node id's for the follower's and leader from the ",(0,o.jsx)(t.code,{children:"zbctl status"})," output via ",(0,o.jsx)(t.code,{children:"jq"}),". If we have that we can use this for other use cases."]}),"\n",(0,o.jsxs)(t.p,{children:["I stored the ",(0,o.jsx)(t.code,{children:"zbctl"})," json output in a file, to make the lines a bit more readable and that I can focus on the jq stuff. The tested output looks like this:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:'$ cat test.json \n{\n  "brokers": [\n    {\n      "nodeId": 1,\n      "host": "zeebe-chaos-zeebe-1.zeebe-chaos-zeebe.zeebe-chaos.svc.cluster.local",\n      "port": 26501,\n      "partitions": [\n        {\n          "partitionId": 1,\n          "role": "LEADER",\n          "health": "HEALTHY"\n        },\n        {\n          "partitionId": 2,\n          "role": "FOLLOWER",\n          "health": "HEALTHY"\n        },\n        {\n          "partitionId": 3,\n          "role": "LEADER",\n          "health": "HEALTHY"\n        },\n        {\n          "partitionId": 4,\n          "role": "LEADER",\n          "health": "HEALTHY"\n        }\n      ],\n      "version": "0.27.0-SNAPSHOT"\n    },\n    {\n      "nodeId": 2,\n      "host": "zeebe-chaos-zeebe-2.zeebe-chaos-zeebe.zeebe-chaos.svc.cluster.local",\n      "port": 26501,\n      "partitions": [\n        {\n          "partitionId": 1,\n          "role": "FOLLOWER",\n          "health": "HEALTHY"\n        },\n        {\n          "partitionId": 2,\n          "role": "LEADER",\n          "health": "HEALTHY"\n        },\n        {\n          "partitionId": 3,\n          "role": "FOLLOWER",\n          "health": "HEALTHY"\n        },\n        {\n          "partitionId": 4,\n          "role": "FOLLOWER",\n          "health": "HEALTHY"\n        }\n      ],\n      "version": "0.27.0-SNAPSHOT"\n    },\n    {\n      "nodeId": 0,\n      "host": "zeebe-chaos-zeebe-0.zeebe-chaos-zeebe.zeebe-chaos.svc.cluster.local",\n      "port": 26501,\n      "partitions": [\n        {\n          "partitionId": 1,\n          "role": "FOLLOWER",\n          "health": "HEALTHY"\n        },\n        {\n          "partitionId": 2,\n          "role": "FOLLOWER",\n          "health": "HEALTHY"\n        },\n        {\n          "partitionId": 3,\n          "role": "FOLLOWER",\n          "health": "HEALTHY"\n        },\n        {\n          "partitionId": 4,\n          "role": "FOLLOWER",\n          "health": "HEALTHY"\n        }\n      ],\n      "version": "0.27.0-SNAPSHOT"\n    }\n  ],\n  "clusterSize": 3,\n  "partitionsCount": 4,\n  "replicationFactor": 3,\n  "gatewayVersion": "0.27.0-SNAPSHOT"\n}\n'})}),"\n",(0,o.jsxs)(t.p,{children:["I had a really hard time to find the correct ",(0,o.jsx)(t.code,{children:"jq"})," expression, but here is it:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:'$ cat test.json | jq ".brokers[]|select(.partitions[]| select(.partitionId == 3) and .role == \\"LEADER\\")"\n'})}),"\n",(0,o.jsxs)(t.p,{children:["You may ask why there are multiple ",(0,o.jsx)(t.a,{href:"https://stedolan.github.io/jq/manual/#select(boolean_expression)",children:"selects"}),". I tried it previous with one and the issue is that it then works like an cartesian-product. It takes broker objects, which take part of the partition 3 and it will take broker objects, which are leader for an partition into the output. This is obviously not that what I want.\nThe current expression filters brokers for partitions which have the partitionId and are leader for that partition. This ",(0,o.jsx)(t.a,{href:"https://gist.github.com/olih/f7437fb6962fb3ee9fe95bda8d2c8fa4#gistcomment-3257810",children:"gist comment"})," helped me here."]}),"\n",(0,o.jsx)(t.p,{children:"Examples:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:'$ cat test.json | jq ".brokers[]|select(.partitions[]| select(.partitionId == 3) and .role == \\"LEADER\\")|.nodeId"\n1\n$ cat test.json | jq ".brokers[]|select(.partitions[]| select(.partitionId == 2) and .role == \\"LEADER\\")|.nodeId"\n2\n'})}),"\n",(0,o.jsxs)(t.p,{children:["Later I realized that this doesn't work for followers, since you can have multiple ones, BUT also this can be solved. ",(0,o.jsx)(t.a,{href:"https://stackoverflow.com/questions/38500363/get-the-first-or-nth-element-in-a-jq-json-parsing",children:"Just put it in an array and get the first entry"}),"."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:'jq "[.brokers[]|select(.partitions[]| select(.partitionId == $partition) and .role == \\"$state\\")][0].nodeId\n'})}),"\n",(0,o.jsxs)(t.p,{children:["As you can see ",(0,o.jsx)(t.code,{children:"jq"})," is quite powerful and I learned a lot about it this day. If you interested you can also check ",(0,o.jsx)(t.a,{href:"https://stedolan.github.io/jq/manual/",children:"the manual"})," which has ton's of examples."]}),"\n",(0,o.jsx)(t.h3,{id:"resources",children:"Resources"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://stackoverflow.com/questions/18592173/select-objects-based-on-value-of-variable-in-object-using-jq",children:"https://stackoverflow.com/questions/18592173/select-objects-based-on-value-of-variable-in-object-using-jq"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://unix.stackexchange.com/questions/404699/using-multiple-wildcards-in-jq-to-select-objects-in-a-json-file",children:"https://unix.stackexchange.com/questions/404699/using-multiple-wildcards-in-jq-to-select-objects-in-a-json-file"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://stedolan.github.io/jq/manual/#Builtinoperatorsandfunctions",children:"https://stedolan.github.io/jq/manual/#Builtinoperatorsandfunctions"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://stackoverflow.com/questions/33057420/jq-select-multiple-conditions",children:"https://stackoverflow.com/questions/33057420/jq-select-multiple-conditions"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://github.com/stedolan/jq/issues/319",children:"https://github.com/stedolan/jq/issues/319"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://unix.stackexchange.com/questions/491669/jq-get-attribute-of-nested-object",children:"https://unix.stackexchange.com/questions/491669/jq-get-attribute-of-nested-object"})}),"\n",(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:"https://stackoverflow.com/questions/27562424/jq-nested-object-extract-top-level-id-and-lift-a-value-from-internal-object",children:"https://stackoverflow.com/questions/27562424/jq-nested-object-extract-top-level-id-and-lift-a-value-from-internal-object"})}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.em,{children:"false track"})," ",(0,o.jsx)(t.a,{href:"https://stackoverflow.com/questions/28615174/jq-filter-on-sub-object-value",children:"https://stackoverflow.com/questions/28615174/jq-filter-on-sub-object-value"})]}),"\n",(0,o.jsxs)(t.li,{children:["final key: ",(0,o.jsx)(t.a,{href:"https://gist.github.com/olih/f7437fb6962fb3ee9fe95bda8d2c8fa4#gistcomment-3257810",children:"https://gist.github.com/olih/f7437fb6962fb3ee9fe95bda8d2c8fa4#gistcomment-3257810"})]}),"\n"]}),"\n",(0,o.jsx)(t.h3,{id:"script",children:"Script"}),"\n",(0,o.jsx)(t.p,{children:"I was able to replace the old utility:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:'function getIndexOfPodForPartitionInState()\n{\n  partition="$1"\n  state="$2"\n  pod=$(getGateway)\n  namespace=$(getNamespace)\n\n  # To print the topology in the journal\n  until topology="$(kubectl exec "$pod" -n "$namespace" -- zbctl status --insecure)"\n  do\n    true;\n  done\n\n\n  # For cluster size 3 and replication factor 3\n  # we know the following partition matrix\n  # partition \\ node  0    1     2\n  #     1             L    F     F\n  #     2             F    L     F\n  #     3             F    F     L\n  #    etc.\n  # This means broker 1, 2 or 3 participates on partition 3\n  # BE AWARE the topology above is just an example and the leader can every node participating node.\n\n  index=$(($(echo "$topology" \\\n    | grep "Partition $partition" \\\n    | grep -n "$state" -m 1 \\\n    | sed \'s/\\([0-9]*\\).*/\\1/\') - 1))\n  echo "$index"\n}\n'})}),"\n",(0,o.jsx)(t.p,{children:"With this:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:'function getIndexOfPodForPartitionInState()\n{\n  partition="$1"\n  state="$2"\n  pod=$(getGateway)\n  namespace=$(getNamespace)\n\n  # To print the topology in the journal\n  until topology="$(kubectl exec "$pod" -n "$namespace" -- zbctl status --insecure -o json)"\n  do\n    true;\n  done\n\n  index=$(echo "$topology" | jq "[.brokers[]|select(.partitions[]| select(.partitionId == $partition) and .role == \\"$state\\")][0].nodeId")\n  echo "$index"\n}\n'})}),"\n",(0,o.jsxs)(t.p,{children:["The previous function worked only with homogeneous clusters, which means where the partitions are equally distributed. This caused issues on experiments on Production L clusters, where partitions are heterogeneous distributed, see related issue ",(0,o.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-cluster-testbench/issues/154",children:"zeebe-io/zeebe-cluster-testbench#154"}),". With this new utility we can create some new experiments also for Production - L clusters."]}),"\n",(0,o.jsxs)(t.p,{children:["I wrote a new script based on the ",(0,o.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-experiments/scripts/disconnect-standalone-gateway.sh",children:"older disconnect/connect gateway scripts"}),", where we disconnect the gateway with the brokers. The new one disconnects an leader for an partition with the follower and vice-versa."]}),"\n",(0,o.jsx)(t.p,{children:"Disconnect Leader-Follower:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:'#!/bin/bash\nset -exuo pipefail\n\nsource utils.sh\n\npartition=1\nnamespace=$(getNamespace)\ngateway=$(getGateway)\n\n# determine leader for partition\nindex=$(getIndexOfPodForPartitionInState "$partition" "LEADER")\nleader=$(getBroker "$index")\nleaderIp=$(kubectl get pod "$leader" -n "$namespace" --template="{ {.status.podIP} }")\n\nindex=$(getIndexOfPodForPartitionInState "$partition" "FOLLOWER")\nfollower=$(getBroker "$index")\nfollowerIp=$(kubectl get pod "$follower" -n "$namespace" --template="{ {.status.podIP} }")\n\n# To print the topology in the journal\nretryUntilSuccess kubectl exec "$gateway" -n "$namespace" -- zbctl status --insecure\n\n# we put all into one function because we need to make sure that even after preemption the \n# dependency is installed\nfunction disconnect() {\n toChangedPod="$1"\n targetIp="$2"\n\n # update to have access to ip\n kubectl exec -n "$namespace" "$toChangedPod" -- apt update\n kubectl exec -n "$namespace" "$toChangedPod" -- apt install -y iproute2\n kubectl exec "$toChangedPod" -n "$namespace" -- ip route add unreachable "$targetIp"\n\n}\n\nretryUntilSuccess disconnect "$leader" "$followerIp"\nretryUntilSuccess disconnect "$follower" "$leaderIp" \n'})}),"\n",(0,o.jsx)(t.h2,{id:"chaos-experiment",children:"Chaos Experiment"}),"\n",(0,o.jsx)(t.p,{children:"We want to disconnect a leader and a follower from a specific partition."}),"\n",(0,o.jsx)(t.h3,{id:"hypothesis",children:"Hypothesis"}),"\n",(0,o.jsx)(t.p,{children:"We expect that even if the leader and the follower can't talk with each other the follower is not able to disrupt the cluster and no new election is started, such that he becomes the leader.\nOn reconnect we expect that the follower keeps up again and is eventually on the same page with the other follower and leader."}),"\n",(0,o.jsx)(t.h3,{id:"actual",children:"Actual"}),"\n",(0,o.jsx)(t.p,{children:"We deployed a cluster with one partition for simplicity. We run the above posted script to disconnect one leader with a follower and the same follower with the leader."}),"\n",(0,o.jsx)(t.h4,{id:"disconnect",children:"Disconnect"}),"\n",(0,o.jsx)(t.p,{children:"After running the disconnect script we see in general no disruption. The processing is still continuing."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{src:n(22206).A+"",width:"2470",height:"652"})}),"\n",(0,o.jsx)(t.p,{children:"We can see that the followers misses a lot of heartbeats, which is expected."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{src:n(81467).A+"",width:"2473",height:"571"})}),"\n",(0,o.jsx)(t.p,{children:"This is also visible in the logs:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:"2021-01-07 20:22:28.320 CET\nzeebe-chaos-zeebe-0\nRaftServer{raft-partition-partition-1}{role=FOLLOWER} - No heartbeat from null in the last PT2.98S (calculated from last 2980 ms), sending poll requests\n2021-01-07 20:22:28.321 CET\nzeebe-chaos-zeebe-0\nRaftServer{raft-partition-partition-1}{role=FOLLOWER} - Poll request to 1 failed: io.netty.channel.AbstractChannel$AnnotatedConnectException: connect(..) failed: No route to host: zeebe-chaos-zeebe-1.zeebe-chaos-zeebe.zeebe-chaos.svc.cluster.local/10.0.0.7:26502\n2021-01-07 20:22:28.625 CET\nzeebe-chaos-zeebe-1\nRaftServer{raft-partition-partition-1} - AppendRequest{term=1, leader=1, prevLogIndex=2643199, prevLogTerm=1, entries=0, checksums=0, commitIndex=2755920} to 0 failed: java.util.concurrent.CompletionException: io.netty.channel.AbstractChannel$AnnotatedConnectException: connect(..) failed: No route to host: zeebe-chaos-zeebe-0.zeebe-chaos-zeebe.zeebe-chaos.svc.cluster.local/10.0.7.13:26502\n2021-01-07 20:22:28.977 CET\nzeebe-chaos-zeebe-1\nRaftServer{raft-partition-partition-1} - AppendRequest{term=1, leader=1, prevLogIndex=2643199, prevLogTerm=1, entries=0, checksums=0, commitIndex=2756276} to 0 failed: java.util.concurrent.CompletionException: io.netty.channel.AbstractChannel$AnnotatedConnectException: connect(..) failed: No route to host: zeebe-chaos-zeebe-0.zeebe-chaos-zeebe.zeebe-chaos.svc.cluster.local/10.0.7.13:26502\n2021-01-07 20:22:29.382 CET\nzeebe-chaos-zeebe-1\nRaftServer{raft-partition-partition-1} - AppendRequest{term=1, leader=1, prevLogIndex=2643199, prevLogTerm=1, entries=0, checksums=0, commitIndex=2756571} to 0 failed: java.util.concurrent.CompletionException: io.netty.channel.AbstractChannel$AnnotatedConnectException: connect(..) failed: No route to host: zeebe-chaos-zeebe-0.zeebe-chaos-zeebe.zeebe-chaos.svc.cluster.local/10.0.7.13:26502\n"})}),"\n",(0,o.jsx)(t.p,{children:"The follower is failing  to send poll requests to Broker-1, which is the leader. I assume we don't see that the follower sends the other follower poll requests because our log level is to high.\nFurthermore we can see that the leader is not able to send append requests. We have a panel where we can see how many entries the follower lags behind."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{src:n(30592).A+"",width:"2464",height:"196"})}),"\n",(0,o.jsx)(t.p,{children:"Interesting that the java heap of the follower is growing."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{src:n(8418).A+"",width:"2466",height:"658"})}),"\n",(0,o.jsx)(t.p,{children:"But after some time GC steps in and it goes back to normal."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{src:n(65469).A+"",width:"2471",height:"349"})}),"\n",(0,o.jsx)(t.h4,{id:"connect",children:"Connect"}),"\n",(0,o.jsx)(t.p,{children:"After running the connect script we can see in the log that almost immediately a snapshot is send to the follower."}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-shell",children:"D 2021-01-07T19:26:24.042908Z zeebe-chaos-zeebe-0 Consume snapshot snapshotChunk 000333.log of snapshot 2643199-1-1610047230637-3215713-3214967  zeebe-chaos-zeebe-0\nD 2021-01-07T19:26:24.045690Z zeebe-chaos-zeebe-0 Consume snapshot snapshotChunk 000334.sst of snapshot 2643199-1-1610047230637-3215713-3214967  zeebe-chaos-zeebe-0\nD 2021-01-07T19:26:24.052229Z zeebe-chaos-zeebe-0 Consume snapshot snapshotChunk 000335.log of snapshot 2643199-1-1610047230637-3215713-3214967  zeebe-chaos-zeebe-0\nD 2021-01-07T19:26:24.068270Z zeebe-chaos-zeebe-0 Consume snapshot snapshotChunk 000336.sst of snapshot 2643199-1-1610047230637-3215713-3214967  zeebe-chaos-zeebe-0\nD 2021-01-07T19:26:24.076135Z zeebe-chaos-zeebe-0 Consume snapshot snapshotChunk CURRENT of snapshot 2643199-1-1610047230637-3215713-3214967  zeebe-chaos-zeebe-0\nD 2021-01-07T19:26:24.081880Z zeebe-chaos-zeebe-0 Consume snapshot snapshotChunk MANIFEST-000003 of snapshot 2643199-1-1610047230637-3215713-3214967  zeebe-chaos-zeebe-0\nD 2021-01-07T19:26:24.089900Z zeebe-chaos-zeebe-0 Consume snapshot snapshotChunk OPTIONS-000090 of snapshot 2643199-1-1610047230637-3215713-3214967  zeebe-chaos-zeebe-0\n"})}),"\n",(0,o.jsx)(t.p,{children:"This is also visible in the metrics"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{src:n(6324).A+"",width:"2467",height:"526"})}),"\n",(0,o.jsx)(t.p,{children:"We see a healed raft."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{src:n(44853).A+"",width:"2476",height:"879"})}),"\n",(0,o.jsx)(t.p,{children:"What I was wondering is why the metric which shows the lag of the follower is not really recovering."}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{src:n(64141).A+"",width:"2482",height:"189"})}),"\n",(0,o.jsx)(t.p,{children:"Even after almost 12 hours it is still showing ~4K"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{src:n(83925).A+"",width:"1192",height:"192"})}),"\n",(0,o.jsx)(t.h2,{id:"result",children:"Result"}),"\n",(0,o.jsx)(t.p,{children:"As we can see the experiment was successful, we were able to verify our hypothesis. The new extraction of the leader and follower from the topology gives us new possibilities for new chaos experiments.\nI think we can also experiment a bit more with disconnecting different nodes, to see how the cluster behaves."}),"\n",(0,o.jsx)(t.h2,{id:"new-issues",children:"New Issues"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"Metric: Follower lag doesn't recover"}),"\n"]}),"\n",(0,o.jsx)(t.h2,{id:"participants",children:"Participants"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"@zelldon"}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},83925:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/failing-metric-c363880bb7fb57b7dc9a40b01e86545d.png"},22206:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/general-938c446793091f9fb5b8aa5c13435b01.png"},44853:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/healed-raft-523127360be6b5750d2d52428ed00e08.png"},81467:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/heartbeats-e178f780060b967d8c5748a7de390971.png"},65469:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/later-gc-7c3d259d82ab97139cdcc22496ef3320.png"},64141:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/metrics-is-not-correct-574cdd8d0d22b8d62145b132cdf10d1d.png"},6324:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/raft-snap-3f95d18c325b9228ff52a4ae00ebc895.png"},8418:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/resources-follower-3f36ecf328d6f31df4a86fcb17dff4de.png"},30592:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/slow-follower-91a64717a739d49ce14bd269b4bf9142.png"},28453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>r});var s=n(96540);const o={},a=s.createContext(o);function i(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(a.Provider,{value:t},e.children)}},18811:e=>{e.exports=JSON.parse('{"permalink":"/zeebe-chaos/2021/01/07/disconnect-leader-and-follower","editUrl":"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-01-07-disconnect-leader-and-follower/index.md","source":"@site/blog/2021-01-07-disconnect-leader-and-follower/index.md","title":"Disconnect Leader and one Follower","description":"Happy new year everyone","date":"2021-01-07T00:00:00.000Z","tags":[{"inline":true,"label":"availability","permalink":"/zeebe-chaos/tags/availability"}],"readingTime":7.64,"hasTruncateMarker":true,"authors":[{"name":"Christopher Kujawa","title":"Chaos Engineer @ Zeebe","url":"https://github.com/zelldon","page":{"permalink":"/zeebe-chaos/authors/zell"},"imageURL":"https://github.com/zelldon.png","key":"zell"}],"frontMatter":{"layout":"posts","title":"Disconnect Leader and one Follower","date":"2021-01-07T00:00:00.000Z","categories":["chaos_experiment","broker","bpmn"],"tags":["availability"],"authors":"zell"},"unlisted":false,"prevItem":{"title":"Network partitions","permalink":"/zeebe-chaos/2021/01/19/network-partition"},"nextItem":{"title":"Message Correlation after Failover","permalink":"/zeebe-chaos/2020/11/24/message-correlation-after-failover"}}')}}]);