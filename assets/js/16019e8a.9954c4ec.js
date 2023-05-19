"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[7961],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(n),d=r,m=u["".concat(s,".").concat(d)]||u[d]||h[d]||l;return n?a.createElement(m,o(o({ref:t},p),{},{components:n})):a.createElement(m,o({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:r,o[1]=i;for(var c=2;c<l;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5951:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>i,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const l={layout:"posts",title:"SST Partitioning toggle",date:new Date("2023-05-15T00:00:00.000Z"),categories:["chaos_experiment","configuration"],tags:["availability","data"],authors:"zell"},o="Chaos Day Summary",i={permalink:"/zeebe-chaos/2023/05/15/SST-Partitioning-toggle",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2023-05-15-SST-Partitioning-toggle/index.md",source:"@site/blog/2023-05-15-SST-Partitioning-toggle/index.md",title:"SST Partitioning toggle",description:"On this chaos day I wanted to experiment with a new experimental feature we have released recently. The enablement of the partitioning of the SST files in RocksDB. This is an experimental feature from RocksDb, which we made available now for our users as well, since we have seen great benefits in performance, especially with larger runtime data.",date:"2023-05-15T00:00:00.000Z",formattedDate:"May 15, 2023",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"},{label:"data",permalink:"/zeebe-chaos/tags/data"}],readingTime:6.695,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"SST Partitioning toggle",date:"2023-05-15T00:00:00.000Z",categories:["chaos_experiment","configuration"],tags:["availability","data"],authors:"zell"},prevItem:{title:"Continuing SST Partitioning toggle",permalink:"/zeebe-chaos/2023/05/19/Continuing-SST-Partitioning-toggle"},nextItem:{title:"Gateway Termination",permalink:"/zeebe-chaos/2023/04/06/gateway-termination"}},s={authorsImageUrls:[void 0]},c=[{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3},{value:"First Part: Verify Steady state",id:"first-part-verify-steady-state",level:4},{value:"First Part: Chaos Action",id:"first-part-chaos-action",level:4},{value:"Second Part:",id:"second-part",level:4},{value:"Further investigation",id:"further-investigation",level:4},{value:"Conclusion",id:"conclusion",level:3}],p={toc:c},u="wrapper";function h(e){let{components:t,...l}=e;return(0,r.kt)(u,(0,a.Z)({},p,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"On this chaos day I wanted to experiment with a new experimental feature we have released recently. The ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/camunda/zeebe/pull/12483"},"enablement of the partitioning of the SST files in RocksDB"),". This is an experimental feature from RocksDb, which we made available now for our users as well, since we have seen great benefits in performance, especially with larger runtime data."),(0,r.kt)("p",null,"I wanted to experiment a bit with the SST partitioning and find out whether it would be possible to enable and disable the flag/configuration without issues."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"TL;DR;")," The first experiment was successful, it looks like we can enable and disable the partitioning without impacting the execution of one existing PI. We need to experiment a bit more with larger data sets to force RocksDB compaction, to be fully sure. "),(0,r.kt)("h2",{id:"chaos-experiment"},"Chaos Experiment"),(0,r.kt)("p",null,"For our chaos experiment we set up again our ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/camunda/zeebe/tree/main/benchmarks/setup"},"normal benchmark cluster"),", this time without any clients (no workers/starters)."),(0,r.kt)("p",null,"Setting all client replicas to zero:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"$ diff default/values.yaml zell-chaos/values.yaml \n40c40\n<   replicas: 3\n---\n>   replicas: 0\n47c47\n<   replicas: 1\n---\n>   replicas: 0\n")),(0,r.kt)("p",null,"The experiment we want to do on this chaos day will look like the following:"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"First part:")," "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Verify steady state:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"verify the readiness of the cluster "),(0,r.kt)("li",{parentName:"ul"},"deploy a process model (which contains a ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/zeebe-io/zeebe-chaos/blob/main/go-chaos/internal/bpmn/one_task.bpmn"},"simple model"),")"))),(0,r.kt)("li",{parentName:"ul"},"Chaos Action: ",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"start a process instance (PI), with a service task"),(0,r.kt)("li",{parentName:"ul"},"enable the SST partitioning"),(0,r.kt)("li",{parentName:"ul"},"restart the cluster"),(0,r.kt)("li",{parentName:"ul"},"verify the readiness"),(0,r.kt)("li",{parentName:"ul"},"verify that job is activatable"),(0,r.kt)("li",{parentName:"ul"},"complete the job (in consequence the PI)")))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Second part:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Chaos Action:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"start a process instance (PI), with a service task"),(0,r.kt)("li",{parentName:"ul"},"disable the SST partitioning"),(0,r.kt)("li",{parentName:"ul"},"restart the cluster"),(0,r.kt)("li",{parentName:"ul"},"verify the readiness"),(0,r.kt)("li",{parentName:"ul"},"verify that job is activatable"),(0,r.kt)("li",{parentName:"ul"},"complete the job (in consequence the PI)")))),(0,r.kt)("h3",{id:"expected"},"Expected"),(0,r.kt)("p",null,"When operating a cluster, I can enable the SST partitioning without an impact on executing existing process instances. Existing PIs should still be executable and completable."),(0,r.kt)("h3",{id:"actual"},"Actual"),(0,r.kt)("p",null,"As linked above I used again our ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/camunda/zeebe/tree/main/benchmarks/setup"},"benchmark/setup")," scripts to set up a cluster."),(0,r.kt)("h4",{id:"first-part-verify-steady-state"},"First Part: Verify Steady state"),(0,r.kt)("p",null,"To verify the readiness and run all actions I used the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/tree/zbchaos-v1.0.0"},"zbchaos")," tool."),(0,r.kt)("p",null,"Verifying readiness is fairly easy with zbchaos."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ zbchaos verify readiness -v\nConnecting to zell-chaos\nRunning experiment in self-managed environment.\nPod zell-chaos-zeebe-0 is in phase Pending, and not ready. Wait for some seconds.\n[...]\nPod zell-chaos-zeebe-0 is in phase Running, and not ready. Wait for some seconds.\nPod zell-chaos-zeebe-0 is in phase Running, and not ready. Wait for some seconds.\nAll Zeebe nodes are running.\n")),(0,r.kt)("p",null,"We then deploy the mentioned simple process model:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ zbchaos deploy process -v\nConnecting to zell-chaos\nRunning experiment in self-managed environment.\nPort forward to zell-chaos-zeebe-gateway-7bbdf9fd58-dl97j\nSuccessfully created port forwarding tunnel\nDeploy file bpmn/one_task.bpmn (size: 2526 bytes).\nDeployed process model bpmn/one_task.bpmn successful with key 2251799813685249.\nDeployed given process model , under key 2251799813685249!\n")),(0,r.kt)("h4",{id:"first-part-chaos-action"},"First Part: Chaos Action"),(0,r.kt)("p",null,"As the first step in the chaos action we create a process instance. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ zbchaos verify instance-creation -v\nConnecting to zell-chaos\nRunning experiment in self-managed environment.\nPort forward to zell-chaos-zeebe-gateway-7bbdf9fd58-dl97j\nSuccessfully created port forwarding tunnel\nSend create process instance command, with BPMN process ID 'benchmark' and version '-1' (-1 means latest) [variables: '', awaitResult: false]\nCreated process instance with key 2251799813685251 on partition 1, required partition 1.\nThe steady-state was successfully verified!\n")),(0,r.kt)("p",null,"Next, we enable the SST partitioning in our broker configuration, we can do this in the ",(0,r.kt)("inlineCode",{parentName:"p"},"values.yaml")," file and run a ",(0,r.kt)("inlineCode",{parentName:"p"},"helm update"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ diff ../default/values.yaml values.yaml \n85a86\n>     zeebe.broker.experimental.rocksdb.enableSstPartitioning: "true"\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ make update\nhelm upgrade --namespace zell-chaos zell-chaos zeebe-benchmark/zeebe-benchmark -f values.yaml\nRelease "zell-chaos" has been upgraded. Happy Helming!\nNAME: zell-chaos\nLAST DEPLOYED: Mon May 15 15:54:24 2023\nNAMESPACE: zell-chaos\nSTATUS: deployed\nREVISION: 2\nNOTES:\n# Zeebe Benchmark\n\nInstalled Zeebe cluster with:\n\n * 3 Brokers\n * 2 Gateways\n\nThe benchmark is running with:\n\n * Starter replicas=0\n * Worker replicas=0\n * Publisher replicas=0\n * Timer replicas=0\n')),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note"),"\nChanging the configmap doesn't restart pods! We need to delete all Zeebe pods, to apply the configuration.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ k delete pod -l app=camunda-platform\npod "zell-chaos-zeebe-0" deleted\npod "zell-chaos-zeebe-1" deleted\npod "zell-chaos-zeebe-2" deleted\npod "zell-chaos-zeebe-gateway-7bbdf9fd58-8j7d6" deleted\npod "zell-chaos-zeebe-gateway-7bbdf9fd58-dl97j" deleted\n')),(0,r.kt)("p",null,"Next we can use ",(0,r.kt)("inlineCode",{parentName:"p"},"zbchaos verify readiness")," again to await the readiness of the cluster."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"All Zeebe nodes are running.\n")),(0,r.kt)("p",null,"Taking a look at the logs of the broker we can also see that the broker configuration was correctly set:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'   \\"disableWal\\" : true,\\n      \\"enableSstPartitioning\\" : true\\n    }\n')),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note"),"\nRight now zbchaos can't complete an job (missing feature). We use zbctl for that, we need to port-forward to the gateway in order to send the commands.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ k port-forward svc/zell-chaos-zeebe-gateway 26500\nForwarding from 127.0.0.1:26500 -> 26500\nForwarding from [::1]:26500 -> 26500\n\n")),(0,r.kt)("p",null,"Activating the right job."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ zbctl --insecure activate jobs benchmark-task\n{\n  "jobs":  [\n    {\n      "key":  "2251799813685256",\n      "type":  "benchmark-task",\n      "processInstanceKey":  "2251799813685251",\n      "bpmnProcessId":  "benchmark",\n      "processDefinitionVersion":  1,\n      "processDefinitionKey":  "2251799813685249",\n      "elementId":  "task",\n      "elementInstanceKey":  "2251799813685255",\n      "customHeaders":  "{}",\n      "worker":  "zbctl",\n      "retries":  3,\n      "deadline":  "1684173544716",\n      "variables":  "{}"\n    }\n  ]\n}\n')),(0,r.kt)("p",null,"Completing the job and the PI."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ zbctl complete job 2251799813685256 --insecure\nCompleted job with key '2251799813685256' and variables '{}'\n")),(0,r.kt)("h4",{id:"second-part"},"Second Part:"),(0,r.kt)("p",null,"Create again a process instance ",(0,r.kt)("inlineCode",{parentName:"p"},"$ zbchaos verify instance-creation")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Created process instance with key 2251799813685263 on partition 1, required partition 1.\nThe steady-state was successfully verified!\n")),(0,r.kt)("p",null,"Disabling the configuration again, and running the update."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ diff default/values.yaml zell-chaos/values.yaml \n85a86\n>     zeebe.broker.experimental.rocksdb.enableSstPartitioning: "false"\n\n\n$ make update \nhelm upgrade --namespace zell-chaos zell-chaos zeebe-benchmark/zeebe-benchmark -f values.yaml\nRelease "zell-chaos" has been upgraded. Happy Helming!\nNAME: zell-chaos\nLAST DEPLOYED: Mon May 15 20:00:53 2023\n...\n\n$ k delete pod -l app=camunda-platform\n$ zbchaos verify readiness\nAll Zeebe nodes are running.\n')),(0,r.kt)("p",null,"Again the job completion worked without problems (skipping here the port-forward and activate output)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"$ zbctl complete job 2251799813685268 --insecure\nCompleted job with key '2251799813685268' and variables '{}'\n")),(0,r.kt)("p",null,"\u2705 The experiment was successful. "),(0,r.kt)("h4",{id:"further-investigation"},"Further investigation"),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(1109).Z,width:"1848",height:"701"})),(0,r.kt)("p",null,"When running the experiment I also observed the metrics of the cluster and was not able to see any differences in the snapshot file counts, which we would expect on the SST partitioning (there should be more files)."),(0,r.kt)("p",null,"Before the experiment:\n",(0,r.kt)("img",{src:n(6562).Z,width:"932",height:"814"})),(0,r.kt)("p",null,"After the experiment, we still see that for each partition we have around ~6 files.\n",(0,r.kt)("img",{src:n(4687).Z,width:"938",height:"818"})),(0,r.kt)("p",null,"In order to make sure whether the options have been applied correctly I investigated the RocksDB log files and option files."),(0,r.kt)("p",null,"In the current LOG file, we can see the current options printed, which is indeed the disabled partitioner. Since this is the default as well it is not a proof yet."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"2023/05/15-18:01:46.223234 139711509092096 [/column_family.cc:621] --------------- Options for column family [default]:\n2023/05/15-18:01:46.223237 139711509092096               Options.comparator: leveldb.BytewiseComparator\n2023/05/15-18:01:46.223239 139711509092096           Options.merge_operator: None\n2023/05/15-18:01:46.223241 139711509092096        Options.compaction_filter: None\n2023/05/15-18:01:46.223242 139711509092096        Options.compaction_filter_factory: None\n2023/05/15-18:01:46.223244 139711509092096  Options.sst_partitioner_factory: None\n")),(0,r.kt)("p",null,"What we can see in the runtime folder of the partition is that there exist two Options files, an older one ",(0,r.kt)("inlineCode",{parentName:"p"},"OPTIONS-000014"),", and a newer one ",(0,r.kt)("inlineCode",{parentName:"p"},"OPTIONS-000023"),"."),(0,r.kt)("p",null,"The older one contains the expected configuration for the SST partitioning:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ cat OPTIONS-000014 \n[CFOptions "default"]\n...\n  sst_partitioner_factory={id=SstPartitionerFixedPrefixFactory;length=8;}\n')),(0,r.kt)("p",null,"The most recent options file has the configuration set to null."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'\n$ cat OPTIONS-000023\n[CFOptions "default"]\n...\nsst_partitioner_factory=nullptr\n\n')),(0,r.kt)("p",null,"We can see that the current snapshot only copied the most recent options file:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"$ ll ../snapshots/188-4-230-244\ntotal 56\ndrwxr-xr-x 2 root root 4096 May 15 18:13 ./\ndrwxr-xr-x 3 root root 4096 May 15 18:13 ../\n...\n-rw-r--r-- 2 root root 7015 May 15 18:01 OPTIONS-000023\n-rw-r--r-- 1 root root   92 May 15 18:13 zeebe.metadata\n")),(0,r.kt)("h3",{id:"conclusion"},"Conclusion"),(0,r.kt)("p",null,"We were able to toggle the SST partitioning flag without problems back and forth. We were able to make still progress on an existing process instance, which we wanted to prove."),(0,r.kt)("p",null,"Nevertheless, we need to prove this once more for multiple process instances (100-1000 PIs), which cause or forces compaction of the SST files. Right now I'm not 100% convinced whether this experiment was enough, but it was a good first step."))}h.isMDXComponent=!0},1109:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/general-after2-e0b4149303fb10808ec4d1e9215ed7af.png"},4687:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/snapshot-after2-ca6970a41ba78ee802c74de8b18c195d.png"},6562:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/snapshot-before-2140893bacefcc15a0d450c89274d8e2.png"}}]);