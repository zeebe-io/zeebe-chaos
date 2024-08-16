"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[6620],{52205:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>h});var n=a(74848),r=a(28453);const s={layout:"posts",title:"Time travel Experiment",date:new Date("2021-05-25T00:00:00.000Z"),categories:["chaos_experiment","broker","time"],tags:["data"],authors:"zell"},i="Chaos Day Summary",o={permalink:"/zeebe-chaos/2021/05/25/Reset-Clock",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-05-25-Reset-Clock/index.md",source:"@site/blog/2021-05-25-Reset-Clock/index.md",title:"Time travel Experiment",description:"Recently we run a Game day where a lot of messages with high TTL have been stored in the state. This was based on an earlier incident, which we had seen in production. One suggested approach to resolve that incident was to increase the time, such that all messages are removed from the state. This and the fact that summer and winter time shifts can cause in other systems evil bugs, we wanted to find out how our system can handle time shifts. Phil joined me as participant and observer. There was a related issue which covers this topic as well, zeebe-chaos#3.",date:"2021-05-25T00:00:00.000Z",tags:[{inline:!0,label:"data",permalink:"/zeebe-chaos/tags/data"}],readingTime:8.205,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",page:{permalink:"/zeebe-chaos/authors/zell"},imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Time travel Experiment",date:"2021-05-25T00:00:00.000Z",categories:["chaos_experiment","broker","time"],tags:["data"],authors:"zell"},unlisted:!1,prevItem:{title:"Full Disk Recovery",permalink:"/zeebe-chaos/2021/06/08/Full-Disk"},nextItem:{title:"Corrupted Snapshot Experiment Investigation",permalink:"/zeebe-chaos/2021/04/29/Corrupted-Snapshot"}},c={authorsImageUrls:[void 0]},h=[{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Expected",id:"expected",level:3},{value:"Changing Time",id:"changing-time",level:3},{value:"Experiment on Benchmark Cluster",id:"experiment-on-benchmark-cluster",level:3},{value:"Move Time Forward",id:"move-time-forward",level:4},{value:"Move Time Backwards",id:"move-time-backwards",level:4},{value:"Experiment on INT",id:"experiment-on-int",level:3},{value:"How to change the time on INT",id:"how-to-change-the-time-on-int",level:4},{value:"Move Time Forward on INT",id:"move-time-forward-on-int",level:4}];function l(e){const t={a:"a",br:"br",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://confluence.camunda.com/display/ZEEBE/Game+Day+18.05.2021",children:"Recently we run a Game day"})," where a lot of messages with high TTL have been stored in the state. This was based on an earlier incident, which we had seen in production. One suggested approach to resolve that incident was to increase the time, such that all messages are removed from the state. This and the fact that summer and winter time shifts can cause in other systems evil bugs, we wanted to find out how our system can handle time shifts. ",(0,n.jsx)(t.a,{href:"https://github.com/saig0",children:"Phil"})," joined me as participant and observer. There was a related issue which covers this topic as well, ",(0,n.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/issues/3",children:"zeebe-chaos#3"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"TL;DR;"})," Zeebe is able to handle time shifts back and forth, without observable issues. Operate seems to dislike it."]}),"\n",(0,n.jsx)(t.h2,{id:"chaos-experiment",children:"Chaos Experiment"}),"\n",(0,n.jsx)(t.p,{children:"As part of the experiment we had to define what we expect, if we change the time. In order to keep it simple we decided to experiment with one-hour move forward and backwards. We wanted to run the experiment first against our normal benchmark cluster and afterwards against a Production - S Cluster on INT. Furthermore, we decided to test the time shift only on leaders, for now."}),"\n",(0,n.jsx)(t.h3,{id:"expected",children:"Expected"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.em,{children:"If we move the time one-hour forward we expect:"})}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"in general, timers should be triggered (snapshot, message TTL, job timeouts, timers etc.)"}),"\n",(0,n.jsx)(t.li,{children:"the system should operate normal, means zeebe and operate should be healthy and continue working"}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.em,{children:"If we move the time one-hour backwards we expect:"})}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"timers should not be triggered, until the deadline + 1 hour is reached"}),"\n",(0,n.jsx)(t.li,{children:"the system should operate normal"}),"\n",(0,n.jsx)(t.li,{children:"with operate we were not sure whether it has issues with exported records on the same time"}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"Before we started, with running the experiment, we had to find out how we can change the time in a docker container."}),"\n",(0,n.jsx)(t.h3,{id:"changing-time",children:"Changing Time"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsxs)(t.em,{children:[(0,n.jsx)(t.strong,{children:"Note:"})," If you're not interested in how we change the time you can jump to the ",(0,n.jsx)(t.a,{href:"#experiment-on-benchmark-cluster",children:"next section"})]})}),"\n",(0,n.jsxs)(t.p,{children:["If you search for it, you find quite quickly answers in how to change the time in a docker container. For example, we found this ",(0,n.jsx)(t.a,{href:"https://serverfault.com/a/898842/283059",children:"answer"}),", which was quite useful."]}),"\n",(0,n.jsxs)(t.p,{children:["In order to apply this, we first need to make sure that we have the right ",(0,n.jsx)(t.a,{href:"https://man7.org/linux/man-pages/man7/capabilities.7.html",children:"linux capabilities"})," to change the system time. For that we need the ",(0,n.jsx)(t.code,{children:"SYS_TIME"})," capability. In our benchmarks this is quite easy to do, we just need to change ",(0,n.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/blob/develop/benchmarks/setup/default/zeebe-values.yaml#L16",children:"this line"})," and add ",(0,n.jsx)(t.code,{children:"SYS_TIME"}),"."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-yaml",children:'podSecurityContext:\n  capabilities:\n        add: ["NET_ADMIN", "SYS_TIME"]\n'})}),"\n",(0,n.jsxs)(t.p,{children:["After changing this, we can set the time via ",(0,n.jsx)(t.a,{href:"https://man7.org/linux/man-pages/man1/date.1.html",children:(0,n.jsx)(t.code,{children:"date -s"})}),". Since we were not sure whether this really works for our java process, we started a ",(0,n.jsx)(t.a,{href:"https://docs.oracle.com/javase/9/tools/jshell.htm#JSWOR-GUID-C337353B-074A-431C-993F-60C226163F00",children:(0,n.jsx)(t.code,{children:"jshell"})})," to verify that. ",(0,n.jsx)(t.em,{children:"Note:"})," the jshell is only available if you use an container image with jdk. This is available, if you build your own zeebe docker image via ",(0,n.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/blob/develop/createBenchmark.sh",children:"zeebe/createBenchmark.sh"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"Changing the time:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sh",children:'root@zell-phil-chaos-zeebe-1:/usr/local/zeebe# date\nTue May 25 10:29:33 UTC 2021\nroot@zell-phil-chaos-zeebe-1:/usr/local/zeebe# date +%T -s "09:29:00"\n09:29:00\nroot@zell-phil-chaos-zeebe-1:/usr/local/zeebe# date\nTue May 25 09:29:01 UTC 2021\nroot@zell-phil-chaos-zeebe-1:/usr/local/zeebe# jshell\nPicked up JAVA_TOOL_OPTIONS: -XX:MaxRAMPercentage=25.0 -XX:+ExitOnOutOfMemoryError -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/usr/local/zeebe/data -XX:ErrorFile=/usr/local/zeebe/data/zeebe_error%p.log -Xlog:gc*:file=/usr/local/zeebe/data/gc.log:time:filecount=7,filesize=8M\nMay 25, 2021 9:29:03 AM java.util.prefs.FileSystemPreferences$1 run\nINFO: Created user preferences directory.\n|  Welcome to JShell -- Version 11.0.11\n|  For an introduction type: /help intro\n\njshell> new Date()\n$1 ==> Tue May 25 09:29:08 UTC 2021\n'})}),"\n",(0,n.jsx)(t.p,{children:"After we found out how we can actually change the time we moved forward and run the described chaos experiment."}),"\n",(0,n.jsx)(t.h3,{id:"experiment-on-benchmark-cluster",children:"Experiment on Benchmark Cluster"}),"\n",(0,n.jsx)(t.p,{children:"As usual, we have set up a normal benchmark cluster with three nodes, three partitions and replication factor three. We run 200 PI/s and 12 workers against that cluster."}),"\n",(0,n.jsx)(t.h4,{id:"move-time-forward",children:"Move Time Forward"}),"\n",(0,n.jsx)(t.p,{children:"After setting up the cluster we had to find out who is the Leader and picked the one who is Leader for the most of the partitions."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:"$ k exec -it zell-phil-chaos-zeebe-0 -- zbctl status --insecure\nBrokers:\n  Broker 0 - zell-phil-chaos-zeebe-0.zell-phil-chaos-zeebe.zell-phil-chaos.svc.cluster.local:26501\n    Version: 1.1.0-SNAPSHOT\n    Partition 1 : Follower, Healthy\n    Partition 2 : Leader, Healthy\n    Partition 3 : Leader, Healthy\n    ....\n"})}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"On Broker 0 we increased the time by one hour."})," After doing this we observed the metrics, but we haven't noticed any issues. We verified logs in stackdriver, but no errors were thrown.\n",(0,n.jsx)(t.img,{alt:"inc-1-hour-general",src:a(49273).A+"",width:"1195",height:"901"})]}),"\n",(0,n.jsxs)(t.p,{children:["We noticed, looking at the metrics, that the snapshot was triggered when we moved the time forward. This was what we actually expected. Plus also new scheduled snapshot have been triggered and created.\n",(0,n.jsx)(t.img,{alt:"inc-1-hour-snapshot",src:a(49261).A+"",width:"1191",height:"633"})]}),"\n",(0,n.jsxs)(t.p,{children:["On the elastic exporter we can see that flushing has happened earlier than usual, because we increased the time. This was also expected.",(0,n.jsx)(t.br,{}),"\n",(0,n.jsx)(t.img,{alt:"inc-1-hour-export",src:a(65047).A+"",width:"1191",height:"411"})]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Experiment succeeded"})," ","\u2714\ufe0f"]}),"\n",(0,n.jsx)(t.h4,{id:"move-time-backwards",children:"Move Time Backwards"}),"\n",(0,n.jsx)(t.p,{children:"In order to run the experiment again, with moving the timer backwards, we set up a new benchmark cluster. This time we run the experiment on Broker 1, since he was the leader of the most partitions."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-sh",children:"Broker 1 - zell-phil-chaos-zeebe-1.zell-phil-chaos-zeebe.zell-phil-chaos.svc.cluster.local:26501\n  Version: 1.1.0-SNAPSHOT\n  Partition 1 : Follower, Healthy\n  Partition 2 : Leader, Healthy\n  Partition 3 : Leader, Healthy\n"})}),"\n",(0,n.jsxs)(t.p,{children:["No general issues have been detected, as expected no longer snapshots were taken.\n",(0,n.jsx)(t.img,{alt:"dec-1-hour-general",src:a(97573).A+"",width:"1196",height:"895"})]}),"\n",(0,n.jsxs)(t.p,{children:["We have run the benchmark for a bit longer, to see whether the snapshot will be triggered later, which was indeed the case.\n",(0,n.jsx)(t.img,{alt:"dec-1-hour-snapshot-later",src:a(23748).A+"",width:"1195",height:"579"})]}),"\n",(0,n.jsxs)(t.p,{children:["We could also observe how the journal segments increased until we took the next snapshot.\n",(0,n.jsx)(t.img,{alt:"dec-1-hour-snapshot-segments",src:a(7090).A+"",width:"1185",height:"612"})]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Experiment succeeded"})," ","\u2714\ufe0f"]}),"\n",(0,n.jsx)(t.h3,{id:"experiment-on-int",children:"Experiment on INT"}),"\n",(0,n.jsxs)(t.p,{children:["After running the experiment against our benchmark clusters we were confident to run it against a Production S cluster on INT.\nWe have set up a Production S cluster in our chaos cluster and run the ",(0,n.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/blob/develop/benchmarks/setup/newCloudBenchmark.sh",children:"cloud benchmark"})," against it. It starts starter and worker against that Production S cluster, turned out not with the same load (luckily this doesn't matter for this experiment). The starter and workers are deployed in the Zeebe Team gke cluster."]}),"\n",(0,n.jsx)(t.h4,{id:"how-to-change-the-time-on-int",children:"How to change the time on INT"}),"\n",(0,n.jsxs)(t.p,{children:["On INT, it is not that simple to get the ",(0,n.jsx)(t.code,{children:"SYS_TIME"})," capability, which we need to change the time. Luckily we already have experience, with getting the necessary capability we need to have.\nOn a previous chaos day we have added ",(0,n.jsx)(t.code,{children:"NET_ADMIN"})," capability to a running zeebe container in order to experiment with network partitioning, you can read about that ",(0,n.jsx)(t.a,{href:"/zeebe-chaos/2021/03/23/camunda-cloud-network-partition",children:"here"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["The following patch adds the ",(0,n.jsx)(t.code,{children:"SYS_TIME"})," cap to our linux container."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-yaml",children:'spec:\n  template:\n    spec:\n      containers:\n        - name: "zeebe"\n          securityContext:\n            capabilities:\n              add:\n                - "SYS_TIME"\n'})}),"\n",(0,n.jsx)(t.p,{children:"The following script applies the patch to our Zeebe cluster."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:'#!/bin/bash\nset -euo pipefail\n\nscriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )\nsource utils.sh\n\nnamespace=$(getNamespace)\n\nCLUSTERID=${namespace%-zeebe}\n\nkubectl patch zb "$CLUSTERID" --type merge --patch=\'{"spec":{"controller":{"reconcileDisabled":true}}}\'\nkubectl patch statefulset zeebe -n "$namespace" --patch "$(cat $scriptPath/sys_time_patch.yaml)"\nkubectl delete pod -l "$(getLabel)" -n "$namespace"\n'})}),"\n",(0,n.jsx)(t.h4,{id:"move-time-forward-on-int",children:"Move Time Forward on INT"}),"\n",(0,n.jsx)(t.p,{children:"After we patched our resources we can now change the time as before."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:'root@zeebe-0:/usr/local/zeebe# date\nTue May 25 09:55:33 UTC 2021\nroot@zeebe-0:/usr/local/zeebe# date +%T -s "10:55:00"\n10:55:00\nroot@zeebe-0:/usr/local/zeebe# date\nTue May 25 10:55:01 UTC 2021\n'})}),"\n",(0,n.jsxs)(t.p,{children:["In the general section of our Grafana Dashboard everything looks fine. We can't see any issues here, except that the exporting is much less than the processing.\n",(0,n.jsx)(t.img,{alt:"int-inc-1-hour-general",src:a(28805).A+"",width:"1198",height:"901"})]}),"\n",(0,n.jsxs)(t.p,{children:["We took a closer look at the processing panels and saw that the exporter lag a lot behind, which causes Operate lagging behind and that fewer segments are deleted.\n",(0,n.jsx)(t.img,{alt:"int-inc-1-hour-exporting",src:a(40507).A+"",width:"1195",height:"424"})]}),"\n",(0,n.jsxs)(t.p,{children:["On moving the time forward we see as expected the snapshotting has been triggered.\n",(0,n.jsx)(t.img,{alt:"int-inc-1-hour-snapshot",src:a(14497).A+"",width:"1200",height:"644"})]}),"\n",(0,n.jsx)(t.p,{children:"Stackdriver shows no errors for the Zeebe service. But later, in operate we observed that no new data was imported after 11:50, we moved the time at 11:55 forward. In the logs we found the following exceptions, which need to be investigated further."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:"Exception occurred when importing data: io.camunda.operate.exceptions.PersistenceException: Update request failed for [operate-import-position-1.0.0_] and id [1-process-instance] with the message [Elasticsearch exception [type=version_conflict_engine_exception, reason=[1-process-instance]: version conflict, required seqNo [1681], primary term [1]. current document has seqNo [1688] and primary term [1]]].\n"})}),"\n",(0,n.jsx)(t.p,{children:"The exception in more detail:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-java",children:'io.camunda.operate.exceptions.PersistenceException: Update request failed for [operate-import-position-1.0.0_] and id [2-job] with the message [Elasticsearch exception [type=version_conflict_engine_exception, reason=[2-job]: version conflict, required seqNo [1765], primary term [1]. current document has seqNo [1771] and primary term [1]]].\n\tat io.camunda.operate.util.ElasticsearchUtil.executeUpdate(ElasticsearchUtil.java:271) ~[operate-els-schema-1.0.0.jar!/:?]\n\tat io.camunda.operate.zeebeimport.ImportPositionHolder.recordLatestLoadedPosition(ImportPositionHolder.java:100) ~[operate-qa-importer-1.0.0.jar!/:?]\n\tat io.camunda.operate.zeebeimport.ImportJob.call(ImportJob.java:86) ~[operate-qa-importer-1.0.0.jar!/:?]\n\tat io.camunda.operate.zeebeimport.RecordsReader.lambda$scheduleImport$1(RecordsReader.java:217) ~[operate-qa-importer-1.0.0.jar!/:?]\n\tat java.util.concurrent.FutureTask.run(Unknown Source) [?:?]\n\tat java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source) [?:?]\n\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source) [?:?]\n\tat java.lang.Thread.run(Unknown Source) [?:?]\nCaused by: org.elasticsearch.ElasticsearchStatusException: Elasticsearch exception [type=version_conflict_engine_exception, reason=[2-job]: version conflict, required seqNo [1765], primary term [1]. current document has seqNo [1771] and primary term [1]]\n\tat org.elasticsearch.rest.BytesRestResponse.errorFromXContent(BytesRestResponse.java:176) ~[elasticsearch-7.12.1.jar!/:7.12.1]\n\tat org.elasticsearch.client.RestHighLevelClient.parseEntity(RestHighLevelClient.java:1933) ~[elasticsearch-rest-high-level-client-7.12.1.jar!/:7.12.1]\n\tat org.elasticsearch.client.RestHighLevelClient.parseResponseException(RestHighLevelClient.java:1910) ~[elasticsearch-rest-high-level-client-7.12.1.jar!/:7.12.1]\n\tat org.elasticsearch.client.RestHighLevelClient.internalPerformRequest(RestHighLevelClient.java:1667) ~[elasticsearch-rest-high-level-client-7.12.1.jar!/:7.12.1]\n\tat org.elasticsearch.client.RestHighLevelClient.performRequest(RestHighLevelClient.java:1624) ~[elasticsearch-rest-high-level-client-7.12.1.jar!/:7.12.1]\n\tat org.elasticsearch.client.RestHighLevelClient.performRequestAndParseEntity(RestHighLevelClient.java:1594) ~[elasticsearch-rest-high-level-client-7.12.1.jar!/:7.12.1]\n\tat org.elasticsearch.client.RestHighLevelClient.update(RestHighLevelClient.java:1061) ~[elasticsearch-rest-high-level-client-7.12.1.jar!/:7.12.1]\n\tat io.camunda.operate.util.ElasticsearchUtil.executeUpdate(ElasticsearchUtil.java:266) ~[operate-els-schema-1.0.0.jar!/:?]\n\t... 7 more\n\tSuppressed: org.elasticsearch.client.ResponseException: method [POST], host [http://elasticsearch:9200], URI [/operate-import-position-1.0.0_/_update/2-job?refresh=true&timeout=1m], status line [HTTP/1.1 409 Conflict]\n{"error":{"root_cause":[{"type":"version_conflict_engine_exception","reason":"[2-job]: version conflict, required seqNo [1765], primary term [1]. current document has seqNo [1771] and primary term [1]","index_uuid":"7jsKYxw7RxWQhba-UIG5Wg","shard":"0","index":"operate-import-position-1.0.0_"}],"type":"version_conflict_engine_exception","reason":"[2-job]: version conflict, required seqNo [1765], primary term [1]. current document has seqNo [1771] and primary term [1]","index_uuid":"7jsKYxw7RxWQhba-UIG5Wg","shard":"0","index":"operate-import-position-1.0.0_"},"status":409}\n\t\tat org.elasticsearch.client.RestClient.convertResponse(RestClient.java:326) ~[elasticsearch-rest-client-7.12.1.jar!/:7.12.1]\n\t\tat org.elasticsearch.client.RestClient.performRequest(RestClient.java:296) ~[elasticsearch-rest-client-7.12.1.jar!/:7.12.1]\n\t\tat org.elasticsearch.client.RestClient.performRequest(RestClient.java:270) ~[elasticsearch-rest-client-7.12.1.jar!/:7.12.1]\n\t\tat org.elasticsearch.client.RestHighLevelClient.internalPerformRequest(RestHighLevelClient.java:1654) ~[elasticsearch-rest-high-level-client-7.12.1.jar!/:7.12.1]\n\t\tat org.elasticsearch.client.RestHighLevelClient.performRequest(RestHighLevelClient.java:1624) ~[elasticsearch-rest-high-level-client-7.12.1.jar!/:7.12.1]\n\t\tat org.elasticsearch.client.RestHighLevelClient.performRequestAndParseEntity(RestHighLevelClient.java:1594) ~[elasticsearch-rest-high-level-client-7.12.1.jar!/:7.12.1]\n\t\tat org.elasticsearch.client.RestHighLevelClient.update(RestHighLevelClient.java:1061) ~[elasticsearch-rest-high-level-client-7.12.1.jar!/:7.12.1]\n\t\tat io.camunda.operate.util.ElasticsearchUtil.executeUpdate(ElasticsearchUtil.java:266) ~[operate-els-schema-1.0.0.jar!/:?]\n\t\tat io.camunda.operate.zeebeimport.ImportPositionHolder.recordLatestLoadedPosition(ImportPositionHolder.java:100) ~[operate-qa-importer-1.0.0.jar!/:?]\n\t\tat io.camunda.operate.zeebeimport.ImportJob.call(ImportJob.java:86) ~[operate-qa-importer-1.0.0.jar!/:?]\n\t\tat io.camunda.operate.zeebeimport.RecordsReader.lambda$scheduleImport$1(RecordsReader.java:217) ~[operate-qa-importer-1.0.0.jar!/:?]\n\t\tat java.util.concurrent.FutureTask.run(Unknown Source) [?:?]\n\t\tat java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source) [?:?]\n\t\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source) [?:?]\n\t\tat java.lang.Thread.run(Unknown Source) [?:?]\n'})}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Experiment failed"})," ","\u274c"]}),"\n",(0,n.jsx)(t.p,{children:"Operate was not operating normal, the exceptions were not expected."}),"\n",(0,n.jsxs)(t.p,{children:["It seems that changing the time on INT, causes some unexpected problems for Operate. We need to investigate that further and resolve them before we can continue here and make that an automated test. Furthermore, we need to investigate how problematic it is that our exporting lags behind, which is related to ",(0,n.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/6747",children:"zeebe#6747"}),", and how we can resolve that."]}),"\n",(0,n.jsx)(t.p,{children:"In general, we saw that Zeebe has no real issues with time shifts and that timers can be triggered by changing the underlying system time. Still we should make sure that our containers are running on UTC time nodes (which we do), such that we avoid issues with daylight saving time."})]})}function d(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},97573:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/dec-1-hour-general-d20ebf3b510bacc0bae5a2533d7e3f1d.png"},23748:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/dec-1-hour-snapshot-later-9a9aa6dd1f828ccc63e0d67370765945.png"},7090:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/dec-1-hour-snapshot-segments-342d9ead5f0535ae7a52b5d0e7f8fe89.png"},65047:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/inc-1-hour-export-f6f3d566842ac4cf305ceb7d010b5c59.png"},49273:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/inc-1-hour-general-e76624008b7d3eb96d0c869f5fe6c1af.png"},49261:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/inc-1-hour-snapshot-bc4a81c9e31d5fcba49d7a916f3e8e52.png"},40507:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/int-inc-1-hour-exporting-ad1008f03377d042cc502110006a02fb.png"},28805:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/int-inc-1-hour-general-f5fa293ae793ae59f4cc83da19456a2d.png"},14497:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/int-inc-1-hour-snapshot-7f4800f402632a8efb38d4a8ef1b370a.png"},28453:(e,t,a)=>{a.d(t,{R:()=>i,x:()=>o});var n=a(96540);const r={},s=n.createContext(r);function i(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);