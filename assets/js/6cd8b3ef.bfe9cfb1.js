"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[2130],{30798:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>n,metadata:()=>i,toc:()=>h});var r=a(74848),s=a(28453);const n={layout:"posts",title:"Improve Operate import latency",date:new Date("2024-08-19T00:00:00.000Z"),categories:["chaos_experiment","operate"],tags:["performance"],authors:"zell"},o="Chaos Day Summary",i={permalink:"/zeebe-chaos/2024/08/19/Operate-improve-import-latency",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2024-08-19-Operate-improve-import-latency/index.md",source:"@site/blog/2024-08-19-Operate-improve-import-latency/index.md",title:"Improve Operate import latency",description:"In our last Chaos Day we experimented with Operate and different load (Zeebe throughput). We observed that a higher load caused a lower import latency in Operate. The conclusion was that it might be related to Zeebe's exporting configuration, which is affected by a higher load.",date:"2024-08-19T00:00:00.000Z",tags:[{inline:!0,label:"performance",permalink:"/zeebe-chaos/tags/performance"}],readingTime:7.73,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",page:{permalink:"/zeebe-chaos/authors/zell"},imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Improve Operate import latency",date:"2024-08-19T00:00:00.000Z",categories:["chaos_experiment","operate"],tags:["performance"],authors:"zell"},unlisted:!1,nextItem:{title:"Operate load handling",permalink:"/zeebe-chaos/2024/08/16/Operate-load-handling"}},l={authorsImageUrls:[void 0]},h=[{value:"Background",id:"background",level:2},{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3},{value:"First experiment: Lower flush delay",id:"first-experiment-lower-flush-delay",level:4},{value:"Second Experiment: Lower delay with higher load",id:"second-experiment-lower-delay-with-higher-load",level:4},{value:"Additional finding",id:"additional-finding",level:5},{value:"Third experiment",id:"third-experiment",level:4},{value:"Potential improvements",id:"potential-improvements",level:2}];function c(e){const t={a:"a",blockquote:"blockquote",br:"br",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components},{Details:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:"/zeebe-chaos/2024/08/16/Operate-load-handling",children:"In our last Chaos Day"})," we experimented with Operate and different load (Zeebe throughput). We observed that a higher load caused a lower import latency in Operate. The conclusion was that it might be related to Zeebe's exporting configuration, which is affected by a higher load."]}),"\n",(0,r.jsx)(t.p,{children:"In today's chaos day we want to verify how different export and import configurations can affect the importing latency."}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"TL;DR;"})," We were able to decrease the import latency by ~35% (from 5.7 to 3.7 seconds), by simply reducing the ",(0,r.jsx)(t.code,{children:"bulk.delay"})," configuration. This worked on load and even higher load, whereas on higher load we have even improved Zeebe's throughput by ~13%."]}),"\n",(0,r.jsx)(t.h2,{id:"background",children:"Background"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsxs)(t.em,{children:["In the following I want to briefly explain a bit more the background of how exporting and importing play together. If you are already aware feel free to jump to the ",(0,r.jsx)(t.a,{href:"#chaos-experiment",children:"next section"}),"."]})}),"\n",(0,r.jsx)(t.hr,{}),"\n",(0,r.jsx)(t.p,{children:"To understand how the importing of Operate is affected and works, we first have to take a look at Zeebe."}),"\n",(0,r.jsx)(t.p,{children:"Zeebe exports data to Elasticsearch via its Elasticsearch Exporter. The exporter collects data before sending it to Elasticsearch in bulk requests. The amount of data, which is collected in the exporter, is configurable and by default set to 1000 records per batch/bulk. Additionally, there is a memory limit which is taken into account that is set to 10 MB. When the bulk request is reaching that size, the request is sent as well. To cover cases of low load, there is a delay option, which is per default set to 5 seconds. This means, that every 5 seconds the bulk request is sent, even if it is not full."}),"\n",(0,r.jsxs)(t.p,{children:["This explains also the results from ",(0,r.jsx)(t.a,{href:"/zeebe-chaos/2024/08/16/Operate-load-handling",children:"our last Chaos Day"}),", where the import latency was around 5 seconds on a lower load."]}),"\n",(0,r.jsx)(t.p,{children:"In the following, we have written down the sequence of steps a command has to take, and its resulting events until it is visible to the user in Operate. This should allow to better understand how and by what the import latency is affected, and what we might want to tune and experiment further."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"User Command is sent to Gateway \n--\x3eGateway sents Command to the right Broker\n----\x3eBroker processes command and produces events\n------\x3eEvents are exported by Broker to ES (worst case: 5s flush) \n--------\x3eES refreshes after one second\n----------\x3eOperate import processing/rewriting data\n------------\x3eES refreshes after one second\n--------------\x3eOperate can query the data -> User can see the data \n"})}),"\n",(0,r.jsxs)(t.p,{children:["About Elasticsearch and its default refresh configuration, etc. you can read ",(0,r.jsx)(t.a,{href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-indexing-speed.html#_unset_or_increase_the_refresh_interval",children:"here"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"Based on this, we know we have the following minimum delay:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"delay = 2 seconds (due to ES refresh)\n      + (5 seconds from exporter on low load)\n      + network delay \n      + processing delay \n      + Exporter and Operate data un/marshaling/processing\n"})}),"\n",(0,r.jsx)(t.p,{children:"Today, we will experiment with the Elasticsearch exporter configurations to improve the import latency."}),"\n",(0,r.jsx)(t.h2,{id:"chaos-experiment",children:"Chaos Experiment"}),"\n",(0,r.jsxs)(t.p,{children:["As we have seen ",(0,r.jsx)(t.a,{href:"/zeebe-chaos/2024/08/16/Operate-load-handling",children:"in a previous chaos day"})," high load affects the importing latency positively. The thesis is that this is due to the export flush delay, which is mostly affecting the exporting on lower load."]}),"\n",(0,r.jsx)(t.p,{children:"Today we want to prove the following:"}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"Hypothesis"})}),"\n",(0,r.jsx)(t.p,{children:"When we set the exporting/flush delay to a lower value (ex. 1 second), we are improving the import latency for lower load scenarios without affecting the system negatively."}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["We can define the following ",(0,r.jsx)(t.code,{children:"unknowns"}),", that we want to explore further as well:"]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"It is not clear how lower flush delay affects the system on higher loads."}),"\n",(0,r.jsx)(t.li,{children:"It is not clear how smaller values (under 1 second) for the flush delay affect the system, no matter of high or low load."}),"\n"]}),"\n",(0,r.jsx)(t.h3,{id:"expected",children:"Expected"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsx)(t.li,{children:"When we set the exporting/flush delay to a lower value (ex. 1 second), we are improving the import latency for lower load scenarios without affecting the system negatively."}),"\n",(0,r.jsxs)(t.li,{children:["When we set the exporting/flush delay to a lower value (ex. 1 second), we are improving the import latency for higher load scenarios, ",(0,r.jsx)(t.strong,{children:"but decreasing the import throughput"})]}),"\n",(0,r.jsx)(t.li,{children:"When we set the exporting/flush delay to a small value (under 1 second), we are affecting the import throughput negatively"}),"\n"]}),"\n",(0,r.jsx)(t.h3,{id:"actual",children:"Actual"}),"\n",(0,r.jsxs)(t.p,{children:["As always, we set a base installation up to compare against. The load is moderate-to-low (15 PI/s). We can compare the data from the ",(0,r.jsx)(t.a,{href:"/zeebe-chaos/2024/08/16/Operate-load-handling",children:"last chaos day"})," here as well."]}),"\n",(0,r.jsxs)(n,{children:[(0,r.jsx)("summary",{children:"Base: Helm install command"}),(0,r.jsx)("pre",{children:(0,r.jsxs)(t.p,{children:["helm install $(releaseName) $(chartPath) --render-subchart-notes ",(0,r.jsx)(t.br,{}),"\n","--set global.image.tag=ck-operate-benchmark-1ad8f375 ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.image.repository=gcr.io/zeebe-io/zeebe ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.image.tag=ck-operate-benchmark-1ad8f375 ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebeGateway.image.repository=gcr.io/zeebe-io/zeebe ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebeGateway.image.tag=ck-operate-benchmark-1ad8f375 ",(0,r.jsx)(t.br,{}),"\n","--set starter.rate=5 ",(0,r.jsx)(t.br,{}),"\n","--set worker.replicas=1 ",(0,r.jsx)(t.br,{}),"\n","--set timer.replicas=1 ",(0,r.jsx)(t.br,{}),"\n","--set timer.rate=5 ",(0,r.jsx)(t.br,{}),"\n","--set publisher.replicas=1 ",(0,r.jsx)(t.br,{}),"\n","--set publisher.rate=5 ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.operate.enabled=true ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.operate.image.repository=gcr.io/zeebe-io/operate ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.operate.image.tag=ck-operate-benchmark ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.elasticsearch.master.persistence.size=128Gi ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.retention.minimumAge=1d \\"]})})]}),"\n",(0,r.jsxs)(t.p,{children:["We see similar results as on the ",(0,r.jsx)(t.a,{href:"/zeebe-chaos/2024/08/16/Operate-load-handling#base",children:"last Chaos day"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.img,{alt:"base-latency",src:a(74934).A+"",width:"949",height:"340"}),"\n",(0,r.jsx)(t.img,{alt:"base-throughput",src:a(76052).A+"",width:"948",height:"262"})]}),"\n",(0,r.jsx)(t.p,{children:"We are able to import around 360 records per second, while Zeebe exports 413. Be aware that some are ignored by Operate.\nA record has on average a delay of 5.69 seconds from being written by Zeebe to being imported by Operate (and written into the\nend Elasticsearch index)."}),"\n",(0,r.jsx)(t.h4,{id:"first-experiment-lower-flush-delay",children:"First experiment: Lower flush delay"}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsx)(t.p,{children:"When we set the exporting/flush delay to a lower value (ex. 1 second), we are improving the import latency for lower load scenarios without affecting the system negatively."}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"To reduce the exporter flush delay we use the following configuration:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-yaml",children:"exporters:\n  elasticsearch:\n    args:\n      bulk:\n        delay: 1\n"})}),"\n",(0,r.jsxs)(t.p,{children:["This can be set in our ",(0,r.jsx)(t.a,{href:"https://github.com/zeebe-io/benchmark-helm",children:"benchmark-helm"})," directly via: ",(0,r.jsx)(t.code,{children:"--set zeebe.config.zeebe.broker.exporters.elasticsearch.args.bulk.delay=1"})]}),"\n",(0,r.jsxs)(n,{children:[(0,r.jsx)("summary",{children:"Lower flush delay: Helm install command"}),(0,r.jsx)("pre",{children:(0,r.jsxs)(t.p,{children:["helm install $(releaseName) $(chartPath) --render-subchart-notes ",(0,r.jsx)(t.br,{}),"\n","--set global.image.tag=ck-operate-benchmark-1ad8f375 ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.image.repository=gcr.io/zeebe-io/zeebe ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.image.tag=ck-operate-benchmark-1ad8f375 ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebeGateway.image.repository=gcr.io/zeebe-io/zeebe ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebeGateway.image.tag=ck-operate-benchmark-1ad8f375 ",(0,r.jsx)(t.br,{}),"\n","--set starter.rate=5 ",(0,r.jsx)(t.br,{}),"\n","--set worker.replicas=1 ",(0,r.jsx)(t.br,{}),"\n","--set timer.replicas=1 ",(0,r.jsx)(t.br,{}),"\n","--set timer.rate=5 ",(0,r.jsx)(t.br,{}),"\n","--set publisher.replicas=1 ",(0,r.jsx)(t.br,{}),"\n","--set publisher.rate=5 ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.operate.enabled=true ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.operate.image.repository=gcr.io/zeebe-io/operate ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.operate.image.tag=ck-operate-benchmark ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.elasticsearch.master.persistence.size=128Gi ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.retention.minimumAge=1d ",(0,r.jsx)(t.br,{}),"\n","--set zeebe.config.zeebe.broker.exporters.elasticsearch.args.bulk.delay=1"]})})]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.img,{alt:"lower-delay",src:a(46285).A+"",width:"942",height:"350"}),"\n",(0,r.jsx)(t.img,{alt:"lower-delay-throughput",src:a(94913).A+"",width:"931",height:"264"})]}),"\n",(0,r.jsxs)(t.p,{children:["With setting the ",(0,r.jsx)(t.code,{children:"bulk.delay"})," to one second, we were able to reduce the import latency by ~2 seconds, from 5.69 to 3.68 seconds.\nThat is a 35% decrease, while other factors stay the same. We can observe that the throughput stays the same (while of course, the load is rather moderate-to-low)."]}),"\n",(0,r.jsxs)(t.p,{children:["This proved our first hypothesis from above. ","\u2705"]}),"\n",(0,r.jsx)(t.h4,{id:"second-experiment-lower-delay-with-higher-load",children:"Second Experiment: Lower delay with higher load"}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsxs)(t.p,{children:["When we set the exporting/flush delay to a lower value (ex. 1 second), we are improving the import latency for higher load scenarios, ",(0,r.jsx)(t.strong,{children:"but decreasing the import throughput"})]}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["Similar to the first experiment we set the delay to one second, and increased the load in the same way as we did\n",(0,r.jsx)(t.a,{href:"/zeebe-chaos/2024/08/16/Operate-load-handling#high-load",children:"here"})," before."]}),"\n",(0,r.jsxs)(n,{children:[(0,r.jsx)("summary",{children:"Lower flush delay with high load: Helm install command"}),(0,r.jsx)("pre",{children:(0,r.jsxs)(t.p,{children:["helm install $(releaseName) $(chartPath) --render-subchart-notes ",(0,r.jsx)(t.br,{}),"\n","--set global.image.tag=ck-operate-benchmark-1ad8f375 ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.image.repository=gcr.io/zeebe-io/zeebe ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.image.tag=ck-operate-benchmark-1ad8f375 ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebeGateway.image.repository=gcr.io/zeebe-io/zeebe ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebeGateway.image.tag=ck-operate-benchmark-1ad8f375 ",(0,r.jsx)(t.br,{}),"\n","--set starter.rate=50 ",(0,r.jsx)(t.br,{}),"\n","--set worker.replicas=1 ",(0,r.jsx)(t.br,{}),"\n","--set timer.replicas=1 ",(0,r.jsx)(t.br,{}),"\n","--set timer.rate=50 ",(0,r.jsx)(t.br,{}),"\n","--set publisher.replicas=1 ",(0,r.jsx)(t.br,{}),"\n","--set publisher.rate=50 ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.operate.enabled=true ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.operate.image.repository=gcr.io/zeebe-io/operate ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.operate.image.tag=ck-operate-benchmark ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.elasticsearch.master.persistence.size=128Gi ",(0,r.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.retention.minimumAge=1d ",(0,r.jsx)(t.br,{}),"\n","--set zeebe.config.zeebe.broker.exporters.elasticsearch.args.bulk.delay=1"]})})]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.img,{alt:"higher-load",src:a(752).A+"",width:"1903",height:"339"}),"\n",(0,r.jsx)(t.img,{alt:"higher-load-throughput",src:a(14486).A+"",width:"1895",height:"252"})]}),"\n",(0,r.jsxs)(t.p,{children:["We can see that the latency has been increased a bit, versus the lower load benchmark, but it has improved compared to the\nbenchmark ",(0,r.jsx)(t.a,{href:"/zeebe-chaos/2024/08/16/Operate-load-handling#high-load",children:"the last chaos day"}),". :information: An interesting factor is that it seems that the throughput from Zeebe has changed as well, that in consequence increased the import throughput."]}),"\n",(0,r.jsx)(t.p,{children:"Looking into it further, we can see that the job and process instance creation and completion have changed by ~13-18 percent. Before we had around 130 process instance completion per second."}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"backpressure-higher-load",src:a(77013).A+"",width:"707",height:"450"})}),"\n",(0,r.jsx)(t.p,{children:"In the recent benchmark, we almost reach our target load (150 PI/s) with 147 process instance completions per second."}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"backpressure-higher-load-lower-delay",src:a(64043).A+"",width:"709",height:"454"})}),"\n",(0,r.jsxs)(t.p,{children:["The reason seem to be the different backpressure. Backpressure has been decreased from ~20 % to 5-10%. This might be because our backpressure strategy has recently changed and now takes exporting into account. See also ",(0,r.jsx)(t.a,{href:"/zeebe-chaos/2024/07/25/Using-flow-control-to-handle-bottlenecked-exporting",children:"related chaos day about this topic"}),"."]}),"\n",(0,r.jsx)(t.h5,{id:"additional-finding",children:"Additional finding"}),"\n",(0,r.jsx)(t.p,{children:"An interesting additional finding has been done. When the Operate import fails or restarts (that can easily happen with preemptive nodes), then the importer backlog can be significant. This is especially an issue on higher constant load."}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"import-delay",src:a(35325).A+"",width:"1908",height:"446"})}),"\n",(0,r.jsx)(t.p,{children:"In our benchmark after the importer failed, it took ~20 minutes until the backlog was processed and the import latency was back to normal."}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"recover-import-delay",src:a(23970).A+"",width:"1906",height:"349"})}),"\n",(0,r.jsxs)(t.p,{children:["This shows that Operate, especially the importer is quite sensitive to restarts. This is likely to be changed and improved when\nOperates importing mechanism is moved into Zeebe, as a separate exporter see ",(0,r.jsx)(t.a,{href:"https://github.com/camunda/camunda/issues/16912",children:"related GH issue"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"On a lower load, the impact of an importer restart is negligible, as we can see below."}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"no-impoact-low-load-restart",src:a(22877).A+"",width:"1900",height:"446"})}),"\n",(0,r.jsx)(t.h4,{id:"third-experiment",children:"Third experiment"}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsx)(t.p,{children:"When we set the exporting/flush delay to a small value (under 1 second), we are affecting the import throughput negatively"}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["We were not able to set the ",(0,r.jsx)(t.code,{children:"bulk.delay"})," to a smaller value than 1 second, as the configuration only accepts longs. The values seem to be expected to be seconds. When setting it to zero, no improvement has been observed (versus one second)."]}),"\n",(0,r.jsx)(t.h2,{id:"potential-improvements",children:"Potential improvements"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["Allow to configure ",(0,r.jsx)(t.code,{children:"bulk.delay"})," in non-second format (be able to specify the time/duration format)"]}),"\n",(0,r.jsx)(t.li,{children:"Importing is highly affected by pod restarts, this can cause issues on higher load, due to a growing backlog. Making import idempotent, and scaling importers would help here."}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},77013:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/backpressure-higher-load-7ea4904a9e4209bb0f55935db995a5a6.png"},64043:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/backpressure-lower-delay-higher-load-690a52e13a2e7d988eb29d2cf103250f.png"},74934:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/base-latency-b7ca1d69a5c6419365516c262ccea9fa.png"},76052:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/base-throughput-55ff3e3256fa6ddc44ed107960c6a18d.png"},23970:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/import-delay-recover-6be36a1bd65171855f7b87125cdea6b5.png"},35325:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/import-delay-90beae953db149d42fff5c116f738a60.png"},94913:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/lower-delay-base-load-throughput-2f84411bbd0df079f7c760b882b00f1f.png"},46285:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/lower-delay-base-d12d1ae908d186eaa1e7c53db1c25df3.png"},752:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/lower-delay-high-load-latency-0e25d5853d6c133948c594bb1efb631b.png"},14486:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/lower-delay-high-load-throughput-30c09f7fe98dd22bd5f4199e48fd79bb.png"},22877:(e,t,a)=>{a.d(t,{A:()=>r});const r=a.p+"assets/images/no-import-delay-restart-low-load-181ded52fb60f7d19889f6663b5454d0.png"},28453:(e,t,a)=>{a.d(t,{R:()=>o,x:()=>i});var r=a(96540);const s={},n=r.createContext(s);function o(e){const t=r.useContext(n);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(n.Provider,{value:t},e.children)}}}]);