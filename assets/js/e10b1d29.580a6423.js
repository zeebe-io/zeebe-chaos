"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[1968],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return h}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=c(n),h=a,k=d["".concat(l,".").concat(h)]||d[h]||u[h]||o;return n?r.createElement(k,s(s({ref:t},p),{},{components:n})):r.createElement(k,s({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9717:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return c},assets:function(){return p},toc:function(){return u},default:function(){return h}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),s=["components"],i={layout:"posts",title:"Network partitions",date:new Date("2021-01-19T00:00:00.000Z"),categories:["chaos_experiment","broker","network"],tags:["availability"],authors:"zell"},l="Chaos Day Summary",c={permalink:"/zeebe-chaos/2021/01/19/network-partition",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-01-19-network-partition/index.md",source:"@site/blog/2021-01-19-network-partition/index.md",title:"Network partitions",description:"As you can see, I migrated the old chaos day summaries to github pages, for better readability.",date:"2021-01-19T00:00:00.000Z",formattedDate:"January 19, 2021",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:7.03,truncated:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],prevItem:{title:"Deployment Distribution",permalink:"/zeebe-chaos/2021/01/26/deployments"},nextItem:{title:"Disconnect Leader and one Follower",permalink:"/zeebe-chaos/2021/01/07/disconnect-leader-and-follower"}},p={authorsImageUrls:[void 0]},u=[{value:"First Chaos Experiment",id:"first-chaos-experiment",children:[{value:"Expected",id:"expected",children:[]},{value:"Actual",id:"actual",children:[]}]},{value:"Second Chaos Experiment",id:"second-chaos-experiment",children:[{value:"Expected",id:"expected-1",children:[]},{value:"Actual",id:"actual-1",children:[]}]},{value:"New Issues",id:"new-issues",children:[]},{value:"Participants",id:"participants",children:[]}],d={toc:u};function h(e){var t=e.components,i=(0,a.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},d,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"As you can see, I migrated the old chaos day summaries to github pages, for better readability.\nI always wanted to play around with github pages and jekyll so this was a good opportunity. I hope you like it. \ud83d\ude04"),(0,o.kt)("p",null,"On the last Chaos Day, we experimented with disconnecting a Leader and ",(0,o.kt)("em",{parentName:"p"},"one")," follower. We expected no bigger disturbance, since we still have quorum and can process records. Today I want to experiment with bigger network partitions."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"In the first chaos experiment: I had a cluster of 5 nodes and split that into two groups, the processing continued as expected, since we had still quorum. \ud83d\udcaa"),(0,o.kt)("li",{parentName:"ul"},"In the second chaos experiment: I split the cluster again into two groups, but this time we added one follower of the bigger group to the smaller group after snapshot was taken and compaction was done. The smaller group needed to keep up with the newer state, before new processing can be started again, but everything worked fine.")),(0,o.kt)("h2",{id:"first-chaos-experiment"},"First Chaos Experiment"),(0,o.kt)("p",null,"Say we have cluster of 5 nodes, one partition with replication factor 3 and we split the cluster in two parts (2 nodes and 3 nodes)."),(0,o.kt)("h3",{id:"expected"},"Expected"),(0,o.kt)("p",null,"We expect if we partition two followers away that one part of the cluster can still continue, since it has quorum. Quorum is defined as ",(0,o.kt)("inlineCode",{parentName:"p"},"quorum=floor(nodes/2) + 1")),(0,o.kt)("h3",{id:"actual"},"Actual"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"general",src:n(7338).Z})),(0,o.kt)("p",null,"When partitioning two followers, this means we would have two groups. First group would be Broker-0 and Broker-1, the second group contains then Broker-2, Broker-3 and Broker-4. I adjusted the disconnect script from the last chaos day a bit. It looks now like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'#!/bin/bash\nset -exuo pipefail\n\n# this scripts expects a setup of 5 nodes with replication factor 5 or higher\n\nsource utils.sh\n\npartition=1\nnamespace=$(getNamespace)\ngateway=$(getGateway)\n\nbroker0=$(getBroker "0")\nbroker0Ip=$(kubectl get pod "$broker0" -n "$namespace" --template="{ { .status.podIP } }")\nbroker1=$(getBroker "1")\nbroker1Ip=$(kubectl get pod "$broker1" -n "$namespace" --template="{ { .status.podIP } }")\nbroker2=$(getBroker "2")\nbroker2Ip=$(kubectl get pod "$broker2" -n "$namespace" --template="{ { .status.podIP } }")\nbroker3=$(getBroker "3")\nbroker3Ip=$(kubectl get pod "$broker3" -n "$namespace" --template="{ { .status.podIP } }")\nbroker4=$(getBroker "4")\nbroker4Ip=$(kubectl get pod "$broker4" -n "$namespace" --template="{ { .status.podIP } }")\n\n# To print the topology in the journal\nretryUntilSuccess kubectl exec "$gateway" -n "$namespace" -- zbctl status --insecure\n\n# we put all into one function because we need to make sure that even after preemption the \n# dependency is installed\nfunction disconnect() {\n toChangedPod="$1"\n targetIp="$2"\n\n # update to have access to ip\n kubectl exec -n "$namespace" "$toChangedPod" -- apt update\n kubectl exec -n "$namespace" "$toChangedPod" -- apt install -y iproute2\n kubectl exec "$toChangedPod" -n "$namespace" -- ip route add unreachable "$targetIp"\n\n}\n\n# Broker 0 and 1 is one group\n\nretryUntilSuccess disconnect "$broker0" "$broker2Ip"\nretryUntilSuccess disconnect "$broker0" "$broker3Ip"\nretryUntilSuccess disconnect "$broker0" "$broker4Ip"\n\nretryUntilSuccess disconnect "$broker1" "$broker2Ip"\nretryUntilSuccess disconnect "$broker1" "$broker3Ip"\nretryUntilSuccess disconnect "$broker1" "$broker4Ip"\n\n# Broker 2, 3 and 4 is the other group\nretryUntilSuccess disconnect "$broker2" "$broker0Ip"\nretryUntilSuccess disconnect "$broker2" "$broker1Ip"\n\nretryUntilSuccess disconnect "$broker3" "$broker0Ip"\nretryUntilSuccess disconnect "$broker3" "$broker1Ip"\n\nretryUntilSuccess disconnect "$broker4" "$broker0Ip"\nretryUntilSuccess disconnect "$broker4" "$broker1Ip"\n\n')),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"general-network-partition",src:n(4757).Z})),(0,o.kt)("p",null,"It works quite well, we can see that another broker took over the leadership and continues with processing. We reach almost the same throughput, interesting is that the activate job requests seem to scale up, which is totally unexpected! We drop now 82% of our requests because we are overloaded with activate job requests."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"growing-request-network-partition",src:n(3870).Z})),(0,o.kt)("p",null,"In the atomix section we can see that the both nodes, which are partitioned away, miss a lot of heatbeats and we can see the leader change, which has happened earlier.\n",(0,o.kt)("img",{alt:"atomix-network-partition",src:n(7870).Z})),(0,o.kt)("p",null,"Quite early after the network partition a node preemption happened."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"node-died",src:n(3337).Z})),(0,o.kt)("p",null,"We see that the processing completely stops, two reasons here: one is that the gateway was restarted and another is that the leader was restarted and we lost quourum, since we already have the network partition in place. After the restart the Broker-4 actually should know again the other nodes, which is why the heartbeat misses stopped."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"atomix-after-restart",src:n(2517).Z})),(0,o.kt)("p",null,"After the Broker comes back the processing started again."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"new-start-broker-4",src:n(2965).Z})),(0,o.kt)("p",null,"As mentioned earlier the grpc requests increased significantly, we now drop 100% of the requests. We have ~3k incoming activate job requests."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"grpc-after-restart",src:n(6506).Z})),(0,o.kt)("p",null,"Some time later we can see that the grpc requests has stabilized again."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"grpc-stabilized",src:n(8898).Z})),(0,o.kt)("p",null,"This should be investigated further, but we will stop here with this experiment since it worked as expected that we kept processing even if we partition two brokers away."),(0,o.kt)("h2",{id:"second-chaos-experiment"},"Second Chaos Experiment"),(0,o.kt)("p",null,"After the first experiment succeeded, I wanted to experiment how the cluster behaves if we add one follower back to group one and remove it from the second group. As you might remember we have in the first group (Broker-0, Broker-1) and in the second group (Broker-2, Broker-3, Broker-4)."),(0,o.kt)("h3",{id:"expected-1"},"Expected"),(0,o.kt)("p",null,"When the network partition is created and we continue with processing at some point a snapshot is taken and the log is compacted. The first group will not receive any events, which means it has the old state. If we now add Broker-2 to the first group we would expect that the first group now can take over, since it has quorum, and the second will stop working. Before it can start with further processing the Broker-0 and Broker-1 need to get the latest state of Broker-2. We expect that Broker-2 becomes leader in the first group, since it has the longer (latest) log."),(0,o.kt)("h3",{id:"actual-1"},"Actual"),(0,o.kt)("p",null,"Again same set up, 5 nodes, one partition and replication factor 3. I'm using the same script as above. I will wait until a snapshot is taken, we could also trigger it now via an end point."),(0,o.kt)("p",null,"We can see no difference in processing throughput after setting up the network partition again."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"new-partition",src:n(4940).Z})),(0,o.kt)("p",null,"Furthermore, the grpc requests seem to be stable, so it must be something related to the gateway or leader restart."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"new-grpc",src:n(7871).Z})),(0,o.kt)("p",null,"When we take a look at the atomix metrics we see that both brokers are missing heartbeats, which is expected. "),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"new-heartbeats",src:n(8415).Z})),(0,o.kt)("p",null,"Node preemption wanted to annoy me again... Broker 2 was restarted, because of node preemption. Since we had no quorum, a new election was started. Broker-2 came back voted for Broker-3, but missed soon also heartbeats, so it started an election again and became leader, because it was able to talk with all nodes again. This was not what we wanted to test, but it is nice to know that it works \ud83d\ude06"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"second-restart",src:n(2502).Z})),(0,o.kt)("p",null,"So again, I re-deployed the cluster and created a snapshot by hand (via API)."),(0,o.kt)("p",null,"For that I port-forwarded our admin port (9600)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"$ k port-forward zell-chaos-zeebe-1 9600\n")),(0,o.kt)("p",null,"On the leader we send the POST request to take a snapshot."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'[zell zell-chaos/ cluster: zeebe-cluster ns:zell-chaos]$ curl -X POST http://localhost:9600/actuator/partitions/takeSnapshot\n{"1":{"role":"LEADER","snapshotId":"591299-1-1611061561457-718421-717758","processedPosition":723973,"processedPositionInSnapshot":718421,"streamProcessorPhase":"PROCESSING","exporterPhase":"EXPORTING","exportedPosition":722841}}\n')),(0,o.kt)("p",null,"We can see in the metrics that a snapshot was taken (probably two, because I accidently executed the command twice)."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"snapshot.png",src:n(8397).Z})),(0,o.kt)("p",null,"For the Broker 2 we check whether it already received the snapshot:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'[zell zell-chaos/ cluster: zeebe-cluster ns:zell-chaos]$ curl -X GET http://localhost:9600/actuator/partitions\n{"1":{"role":"FOLLOWER","snapshotId":"595599-1-1611061566584-723972-722841","processedPosition":null,"processedPositionInSnapshot":null,"streamProcessorPhase":null,"exporterPhase":null,"exportedPosition":null}}\n')),(0,o.kt)("p",null,"We also verify that Broker-0 hasn't received any snapshots nor events."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'[zell zell-chaos/ cluster: zeebe-cluster ns:zell-chaos]$ curl -X GET http://localhost:9600/actuator/partitions\n{"1":{"role":"FOLLOWER","snapshotId":"44199-1-1611061147163-76565-53432","processedPosition":null,"processedPositionInSnapshot":null,"streamProcessorPhase":null,"exporterPhase":null,"exportedPosition":null}}\n')),(0,o.kt)("p",null,"After that, we start with the disconnection to group two and connect Broker-2 to group one (Broker-0 and Broker-1)."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},' retryUntilSuccess disconnect "$broker2" "$broker3Ip"\n retryUntilSuccess disconnect "$broker2" "$broker4Ip"\n \n retryUntilSuccess connect "$broker2" "$broker0Ip"\n retryUntilSuccess connect "$broker2" "$broker1Ip"   \n')),(0,o.kt)("p",null,"We can see that we now have no leader at all, because I missed to connect the first group with Broker-2 in the reverse and disconnecting group 2 from Broker-2."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"network-partition-happening.png",src:n(8815).Z})),(0,o.kt)("p",null,"After doing so:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'\nretryUntilSuccess disconnect "$broker3" "$broker2Ip"\nretryUntilSuccess disconnect "$broker4" "$broker2Ip"\n\nretryUntilSuccess connect "$broker0" "$broker2Ip"\nretryUntilSuccess connect "$broker1" "$broker2Ip"    \n')),(0,o.kt)("p",null,"We can see in the logs but also in the metrics that snapshots are replicated to Broker-0 and Broker-1."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"snapshot-metrics.png",src:n(7553).Z})),(0,o.kt)("p",null,"I would expect that we also see something in the atomix snapshot panels, but here it looks like only the duration is published."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"atomix-snapshot-metrics.png",src:n(18).Z})),(0,o.kt)("p",null,"After connecting the Broker's we see that Broker-0 and Broker-1 are not missing heartbeats anymore and that a new leader has been chosen, Broker-2 which was the expected leader! "),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"after-connect-all.png",src:n(6396).Z})),(0,o.kt)("p",null,"The processing started and cluster seem to look healthy again."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"healed.png",src:n(1083).Z})),(0,o.kt)("p",null,"Experiment was successful! \ud83d\udc4d"),(0,o.kt)("h2",{id:"new-issues"},"New Issues"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Unexpected request count on network partition/node restart"),(0,o.kt)("li",{parentName:"ul"},"Snapshot metrics are unclear, which show what and Atomix snapshot metrics are not showing values")),(0,o.kt)("h2",{id:"participants"},"Participants"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"@zelldon")))}h.isMDXComponent=!0},6396:function(e,t,n){t.Z=n.p+"assets/images/after-connect-all-e3ddb2f28034af3671012e2916cee6f0.png"},2517:function(e,t,n){t.Z=n.p+"assets/images/atomix-after-restart-ee22493581d1ecdb434285c5765e44eb.png"},7870:function(e,t,n){t.Z=n.p+"assets/images/atomix-network-partition-0-d4d3535d5499fe7ae391d2626f501d31.png"},18:function(e,t,n){t.Z=n.p+"assets/images/atomix-snapshot-metrics-1cfd735171f66d16cffec1e816230b35.png"},4757:function(e,t,n){t.Z=n.p+"assets/images/general-network-partition-0-667e6f6ccbd7b800d06b9fc27fc540a6.png"},7338:function(e,t,n){t.Z=n.p+"assets/images/general-77265212a425429df275210ec40dc0d3.png"},3870:function(e,t,n){t.Z=n.p+"assets/images/growing-requests-network-partition-0-a3d400e4e8bec72c48189151d7bbff0d.png"},6506:function(e,t,n){t.Z=n.p+"assets/images/grpc-after-restart-8a184cf51d1500f578f3ef9c091bcc53.png"},8898:function(e,t,n){t.Z=n.p+"assets/images/grpc-stabilized-bc0d89ce10d5ac3f12cad3098bc06156.png"},1083:function(e,t,n){t.Z=n.p+"assets/images/healed-dcae54d03eb0087d45932ad50d05d3c8.png"},8815:function(e,t,n){t.Z=n.p+"assets/images/network-partition-happening-333f089ad90b18a58d1e6711fc276b23.png"},7871:function(e,t,n){t.Z=n.p+"assets/images/new-grpc-ca15020aa84f56bf831a442262a2f91f.png"},8415:function(e,t,n){t.Z=n.p+"assets/images/new-heartbeats-7313901d7e8d103c49ac15df8246d1e8.png"},4940:function(e,t,n){t.Z=n.p+"assets/images/new-partition-70b12561484d135dc4fe7f01543cd558.png"},2965:function(e,t,n){t.Z=n.p+"assets/images/new-start-broker-4-c366161635e83933b3e5bd108ebc23fe.png"},3337:function(e,t,n){t.Z=n.p+"assets/images/node-died-0-a0f1aa1003ea8ee0c626c80a217975ec.png"},2502:function(e,t,n){t.Z=n.p+"assets/images/second-restart-5a3f48be2651f0086c23d6bf7a52b868.png"},7553:function(e,t,n){t.Z=n.p+"assets/images/snapshot-metrics-e54d615ace93975f93b7224031f07140.png"},8397:function(e,t,n){t.Z=n.p+"assets/images/snapshot-f716de884366a3f30bcaa747daea36c5.png"}}]);