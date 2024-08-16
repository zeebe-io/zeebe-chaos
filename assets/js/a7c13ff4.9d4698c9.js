"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[9370],{67555:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var a=n(74848),i=n(28453);const r={layout:"posts",title:"Set file immutable",date:new Date("2021-03-30T00:00:00.000Z"),categories:["chaos_experiment","filesystem","immutable"],authors:"zell"},o="Chaos Day Summary",s={permalink:"/zeebe-chaos/2021/03/30/set-file-immutable",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-03-30-set-file-immutable/index.md",source:"@site/blog/2021-03-30-set-file-immutable/index.md",title:"Set file immutable",description:"This chaos day was a bit different. Actually I wanted to experiment again with camunda cloud and verify that our high load chaos experiments are now working with the newest cluster plans, see zeebe-cluster-testbench#135.",date:"2021-03-30T00:00:00.000Z",tags:[],readingTime:6.5,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell",page:null}],frontMatter:{layout:"posts",title:"Set file immutable",date:"2021-03-30T00:00:00.000Z",categories:["chaos_experiment","filesystem","immutable"],authors:"zell"},unlisted:!1,prevItem:{title:"BPMN meets Chaos Engineering",permalink:"/zeebe-chaos/2021/04/03/bpmn-meets-chaos-engineering"},nextItem:{title:"Camunda Cloud network partition",permalink:"/zeebe-chaos/2021/03/23/camunda-cloud-network-partition"}},l={authorsImageUrls:[void 0]},c=[{value:"Immutable File",id:"immutable-file",level:3},{value:"Found Bugs",id:"found-bugs",level:4}];function d(e){const t={a:"a",code:"code",em:"em",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["This chaos day was a bit different. Actually I wanted to experiment again with camunda cloud and verify that our high load chaos experiments are now working with the newest cluster plans, see ",(0,a.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-cluster-testbench/issues/135",children:"zeebe-cluster-testbench#135"}),".\nUnfortunately I found out that our test chaos cluster was in a way broken, that we were not able to create new clusters. Luckily this was fixed at the end of the day, thanks to @immi :)"]}),"\n",(0,a.jsxs)(t.p,{children:["Because of these circumstances I thought about different things to experiment with, and I remembered that in the ",(0,a.jsx)(t.a,{href:"/zeebe-chaos/2021/03/23/camunda-cloud-network-partition",children:"last chaos day"})," we worked with patching running deployments, in order to add more capabilities.\nThis allowed us to create ip routes and experiment with the zeebe deployment distribution. During this I have read the ",(0,a.jsx)(t.a,{href:"https://man7.org/linux/man-pages/man7/capabilities.7.html",children:"capabilities list of linux"}),", and found out that we can mark files as immutable, which might be interesting for a chaos experiment."]}),"\n",(0,a.jsxs)(t.p,{children:["In this chaos day I planned to find out how marking a file immutable affects our brokers and I made the hypothesis that: ",(0,a.jsx)(t.em,{children:"If a leader has a write error, which is not recoverable, it will step down and another leader should take over."})," I put this in our hypothesis backlog (",(0,a.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/issues/52",children:"zeebe-chaos#52"}),")."]}),"\n",(0,a.jsx)(t.p,{children:"In order to really run this kind of experiment I need to find out whether marking a file immutable will cause any problems and if not how I can cause write errors such that affects the broker.\nUnfortunately it turned out that immutable files will not cause issues on already opened file channels, but I found some other bugs/issues, which you can read below."}),"\n",(0,a.jsx)(t.p,{children:"In the next chaos days I will search for a way to cause write errors proactively, so we can verify that our system can handle such issues."}),"\n",(0,a.jsx)(t.h3,{id:"immutable-file",children:"Immutable File"}),"\n",(0,a.jsxs)(t.p,{children:["In order to ",(0,a.jsx)(t.a,{href:"https://delightlylinux.wordpress.com/2012/12/11/file-immutable-attribute/",children:"mark a file as immutable"})," we can use the command ",(0,a.jsx)(t.code,{children:"chattr +i"}),". For that we need a specific capability called ",(0,a.jsx)(t.code,{children:"LINUX_IMMUTABLE"}),". Since we were at this time not able to create new clusters I tested it with the helm charts, where it is anyway easier to give us these capabilities."]}),"\n",(0,a.jsxs)(t.p,{children:["We just need to add in our ",(0,a.jsx)(t.em,{children:"values"})," files the following:"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:'podSecurityContext:\n  capabilities:\n        add: [ "LINUX_IMMUTABLE" ]\n'})}),"\n",(0,a.jsxs)(t.p,{children:["Since we want to experiment with leaders I need to get the current topology from the gateway, here I found an issue on our latest zbctl build and the human output (",(0,a.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/6692",children:"camunda-cloud/zeebe#6692"}),"). This is already fixed, thanks to ",(0,a.jsx)(t.a,{href:"https://github.com/MiguelPires",children:"Miguel"})," ","\ud83d\ude80","!"]}),"\n",(0,a.jsx)(t.p,{children:"After finding the correct leader we can execute on the corresponding broker/pod following commands to mark a file as immutable."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"[zell ns:zell-chaos]$ k exec -it zell-chaos-zeebe-1 -- bash # opens an interactive shell on zell-chaos-zeebe-1\nroot@zell-chaos-zeebe-1# cd data/raft-partition/partitions/1/\nroot@zell-chaos-zeebe-1# chattr +i raft-partition-partition-1-1.log # marks the log file immutable\nroot@zell-chaos-zeebe-1# lsattr raft-partition-partition-1-1.log\n----i---------e---- raft-partition-partition-1-1.log\n"})}),"\n",(0,a.jsxs)(t.p,{children:["With the last command ",(0,a.jsx)(t.code,{children:"lsattr"})," we print out the file attributes, where we see that the immutable flag is set (the ",(0,a.jsx)(t.code,{children:"i"})," in the output).\nAfter setting the log file to immutable nothing really happens. I checked again the manual page and read that this not affects already created file channels."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"CHATTR(1)                           General Commands Manual                          CHATTR(1)\n\nNAME\n       chattr - change file attributes on a Linux file system\n\n      ...\n      i      A  file with the 'i' attribute cannot be modified: it cannot be deleted or renamed, no link can be created to this file, most of the file's metadata can not be modified, and the\n              file can not be opened in write mode.  Only the superuser or a process possessing the CAP_LINUX_IMMUTABLE capability can set or clear this attribute.\n      ...\n      \n      BUGS AND LIMITATIONS\n       The 'c', 's',  and 'u' attributes are not honored by the ext2, ext3, and ext4 filesystems as implemented in the current mainline Linux kernels.  Setting 'a' and 'i' attributes will not\n       affect the ability to write to already existing file descriptors.\n"})}),"\n",(0,a.jsx)(t.p,{children:"So we actually are not able to use it to cause any write errors on a running leader, but interesting was what happened later when the pod was restarted. The pod was not able to restart, since the log was still immutable. We can see the following bootstrap sequence and the related errors:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"D 2021-03-30T09:11:02.433467Z Found segment: 1 (raft-partition-partition-2-1.log) \nI 2021-03-30T09:11:02.499079Z RaftServer{raft-partition-partition-2} - Transitioning to FOLLOWER \nI 2021-03-30T09:11:02.500847Z RaftPartitionServer{raft-partition-partition-1} - Starting server for partition PartitionId{id=1, group=raft-partition} \nI 2021-03-30T09:11:02.506876Z RaftServer{raft-partition-partition-2} - Server join completed. Waiting for the server to be READY \nE 2021-03-30T09:11:02.508400Z Bootstrap Broker-1 [6/13]: cluster services failed with unexpected exception. \nI 2021-03-30T09:11:02.523239Z Closing Broker-1 [1/5]: subscription api \nD 2021-03-30T09:11:02.525497Z Closing Broker-1 [1/5]: subscription api closed in 2 ms \nI 2021-03-30T09:11:02.526484Z Closing Broker-1 [2/5]: command api handler \nD 2021-03-30T09:11:02.528108Z Closing Broker-1 [2/5]: command api handler closed in 1 ms \nI 2021-03-30T09:11:02.528740Z Closing Broker-1 [3/5]: command api transport \nI 2021-03-30T09:11:03.519309Z RaftServer{raft-partition-partition-2} - Found leader 2 \nI 2021-03-30T09:11:03.521376Z RaftServer{raft-partition-partition-2} - Setting firstCommitIndex to 2. RaftServer is ready only after it has committed events upto this index \nI 2021-03-30T09:11:03.522206Z RaftPartitionServer{raft-partition-partition-2} - Successfully started server for partition PartitionId{id=2, group=raft-partition} in 1171ms \nI 2021-03-30T09:11:04.553825Z Stopped \nD 2021-03-30T09:11:04.555166Z Closing Broker-1 [3/5]: command api transport closed in 2026 ms \nI 2021-03-30T09:11:04.556177Z Closing Broker-1 [4/5]: membership and replication protocol \nI 2021-03-30T09:11:04.558282Z RaftServer{raft-partition-partition-2} - Transitioning to INACTIVE \nE 2021-03-30T09:11:04.558408Z Closing Broker-1 [4/5]: membership and replication protocol failed to close. \nI 2021-03-30T09:11:04.560776Z Closing Broker-1 [5/5]: actor scheduler \nD 2021-03-30T09:11:04.561558Z Closing actor thread ground 'Broker-1-zb-fs-workers' \nD 2021-03-30T09:11:04.563600Z Closing segment: JournalSegment{id=1, version=1, index=1} \nD 2021-03-30T09:11:04.563881Z Closing actor thread ground 'Broker-1-zb-fs-workers': closed successfully \nD 2021-03-30T09:11:04.564448Z Closing actor thread ground 'Broker-1-zb-actors' \nD 2021-03-30T09:11:04.566157Z Closing actor thread ground 'Broker-1-zb-actors': closed successfully \nD 2021-03-30T09:11:04.567716Z Closing Broker-1 [5/5]: actor scheduler closed in 6 ms \nI 2021-03-30T09:11:04.568366Z Closing Broker-1 succeeded. Closed 5 steps in 2045 ms. \nE 2021-03-30T09:11:04.568908Z Failed to start broker 1! \nI 2021-03-30T09:11:04.574482Z \n\nError starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled. \nE 2021-03-30T09:11:04.595919Z Application run failed \nI 2021-03-30T09:11:04.627321Z Shutting down ExecutorService 'applicationTaskExecutor' \n"})}),"\n",(0,a.jsx)(t.p,{children:"The following exception occurred on opening the log:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-java",children:"java.util.concurrent.CompletionException: io.zeebe.journal.JournalException: java.nio.file.FileSystemException: /usr/local/zeebe/data/raft-partition/partitions/1/raft-partition-partition-1-1.log: Operation not permitted\n\tat java.util.concurrent.CompletableFuture.encodeThrowable(Unknown Source) ~[?:?]\n\tat java.util.concurrent.CompletableFuture.completeThrowable(Unknown Source) ~[?:?]\n\tat java.lang.Thread.run(Unknown Source) ~[?:?]\nCaused by: io.zeebe.journal.JournalException: java.nio.file.FileSystemException: /usr/local/zeebe/data/raft-partition/partitions/1/raft-partition-partition-1-1.log: Operation not permitted\n\tat io.zeebe.journal.file.SegmentedJournal.openChannel(SegmentedJournal.java:468) ~[zeebe-journal-1.0.0-SNAPSHOT.jar:1.0.0-SNAPSHOT]\n\tat io.zeebe.journal.file.SegmentedJournal.loadSegments(SegmentedJournal.java:490) ~[zeebe-journal-1.0.0-SNAPSHOT.jar:1.0.0-SNAPSHOT]\n"})}),"\n",(0,a.jsxs)(t.p,{children:["After this exception on bootstrap the broker tries to close itself, and we see an error on closing a step ",(0,a.jsx)(t.code,{children:"2021-03-30 11:11:04.558 CEST Closing Broker-1 [4/5]: membership and replication protocol failed to close."})," This seems to be caused by a NPE."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"\njava.lang.NullPointerException: null\n\tat io.atomix.raft.partition.impl.RaftPartitionServer.stop(RaftPartitionServer.java:141) ~[atomix-cluster-1.0.0-SNAPSHOT.jar:1.0.0-SNAPSHOT]\n\tat io.atomix.raft.partition.RaftPartition.closeServer(RaftPartition.java:165) ~[atomix-cluster-1.0.0-SNAPSHOT.jar:1.0.0-SNAPSHOT]\n\tat io.atomix.raft.partition.RaftPartition.close(RaftPartition.java:155) ~[atomix-cluster-1.0.0-SNAPSHOT.jar:1.0.0-SNAPSHOT]\n"})}),"\n",(0,a.jsx)(t.p,{children:"The problem now here is that the broker never comes back. It is not restarted, which is a bit confusing. Furthermore it hasn't retried on opening, which is also unexpected, since it might be a temporary exception."}),"\n",(0,a.jsx)(t.p,{children:"We can see in stackdriver that the new leader is not able to connect, which is expected. But we also see that the other Broker never comes back which is unexpected!"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"\nW 2021-03-30T09:11:05.006825Z RaftServer{raft-partition-partition-2} - AppendRequest{term=2, leader=2, prevLogIndex=2, prevLogTerm=2, entries=0, commitIndex=2} to 1 failed: java.util.concurrent.CompletionException: io.atomix.cluster.messaging.MessagingException$NoRemoteHandler: No remote message handler registered for this message \nW 2021-03-30T09:11:05.256830Z RaftServer{raft-partition-partition-2} - AppendRequest{term=2, leader=2, prevLogIndex=2, prevLogTerm=2, entries=0, commitIndex=2} to 1 failed: java.util.concurrent.CompletionException: io.atomix.cluster.messaging.MessagingException$NoRemoteHandler: No remote message handler registered for this message \nW 2021-03-30T09:11:08.450683Z RaftServer{raft-partition-partition-3} - AppendRequest{term=2, leader=2, prevLogIndex=1, prevLogTerm=1, entries=0, commitIndex=2} to 1 failed: java.util.concurrent.CompletionException: io.atomix.cluster.messaging.MessagingException$NoRemoteHandler: No remote message handler registered for this message \nW 2021-03-30T09:11:12.897492Z RaftServer{raft-partition-partition-1} - AppendRequest{term=2, leader=2, prevLogIndex=1, prevLogTerm=1, entries=0, commitIndex=2} to 1 failed: java.util.concurrent.CompletionException: io.atomix.cluster.messaging.MessagingException$NoRemoteHandler: No remote message handler registered for this message \nW 2021-03-30T09:11:25.950363Z RaftServer{raft-partition-partition-3} - AppendRequest{term=2, leader=2, prevLogIndex=1, prevLogTerm=1, entries=0, commitIndex=2} to 1 failed: java.util.concurrent.CompletionException: io.atomix.cluster.messaging.MessagingException$NoRemoteHandler: No remote message handler registered for this message\n"})}),"\n",(0,a.jsxs)(t.p,{children:["We need to investigate this issue ",(0,a.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/6702",children:"camunda-cloud/zeebe#6702"})," further, and I need to find out how we can cause write errors proactively."]}),"\n",(0,a.jsx)(t.h4,{id:"found-bugs",children:"Found Bugs"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Int Console was not able to create new clusters in ultrachaos"}),"\n",(0,a.jsxs)(t.li,{children:["Zbctl human output looks broken ",(0,a.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/6692",children:"#6692"})]}),"\n",(0,a.jsxs)(t.li,{children:["Broker is not correctly shutdown ",(0,a.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/6702",children:"#6702"})]}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>s});var a=n(96540);const i={},r=a.createContext(i);function o(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);