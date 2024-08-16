"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[4034],{92018:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>n,metadata:()=>o,toc:()=>h});var a=r(74848),s=r(28453);const n={layout:"posts",title:"Operate load handling",date:new Date("2024-08-16T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["performance"],authors:"zell"},i="Chaos Day Summary",o={permalink:"/zeebe-chaos/2024/08/16/Operate-load-handling",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2024-08-16-Operate-load-handling/index.md",source:"@site/blog/2024-08-16-Operate-load-handling/index.md",title:"Operate load handling",description:"Happy to announce that we are broadening the scope of our Chaos days, to look holistically at the whole Camunda Platform, starting today.",date:"2024-08-16T00:00:00.000Z",tags:[{inline:!0,label:"performance",permalink:"/zeebe-chaos/tags/performance"}],readingTime:7.145,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",page:{permalink:"/zeebe-chaos/authors/zell"},imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Operate load handling",date:"2024-08-16T00:00:00.000Z",categories:["chaos_experiment","bpmn"],tags:["performance"],authors:"zell"},unlisted:!1,nextItem:{title:"Using flow control to handle bottleneck on exporting",permalink:"/zeebe-chaos/2024/07/25/Using-flow-control-to-handle-bottlenecked-exporting"}},l={authorsImageUrls:[void 0]},h=[{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3},{value:"Base",id:"base",level:4},{value:"High load",id:"high-load",level:4},{value:"Low load",id:"low-load",level:4},{value:"Result",id:"result",level:3},{value:"Next",id:"next",level:2}];function d(e){const t={a:"a",br:"br",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components},{Details:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["\ud83c\udf89"," Happy to announce that we are broadening the scope of our Chaos days, to look holistically at the whole Camunda Platform, starting today.\nIn the past Chaos days we often had a close look (or concentrated mostly) at Zeebe performance and stability."]}),"\n",(0,a.jsx)(t.p,{children:"Today, we will look at the Operate import performance and how Zeebe processing throughput might affect (or not?) the throughput and latency of the Operate import. Is it decoupled as we thought?"}),"\n",(0,a.jsx)(t.p,{children:"The import time is an important metric, representing the time until data from Zeebe processing is\nvisible to the User (excluding Elasticsearch's indexing). It is measured from when the record is written to the log, by the Zeebe processor, until Operate reads/imports it from Elasticsearch and converts it into its data model. We got much feedback (and experienced this on our own) that\nOperate is often lagging behind or is too slow, and of course we want to tackle and investigate this further."}),"\n",(0,a.jsxs)(t.p,{children:["The results from this Chaos day and related benchmarks should allow us to better understand how the current importing\nof Operate performs, and what its affects. Likely it will be a series of posts to investigate this further. In general,\nthe data will give us some guidance and comparable numbers for the future to improve the importing time. See also related GitHub issue ",(0,a.jsx)(t.a,{href:"https://github.com/camunda/camunda/issues/16912",children:"#16912"})," which targets to improve such."]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"TL;DR;"})," We were not able to show that Zeebe throughput doesn't affect Operate importing time. We have seen that Operate can be positively affected by the throughput of Zeebe. Surprisingly, Operate was faster to\nimport if Zeebe produced more data (with a higher throughput). One explanation of this might be that Operate was then less idle."]}),"\n",(0,a.jsx)(t.h2,{id:"chaos-experiment",children:"Chaos Experiment"}),"\n",(0,a.jsx)(t.p,{children:"As previously mentioned we will today look at the Operate's import latency and throughput. For that, I have created a\nnew Benchmark dashboard. That allows us to see Zeebe and Operate performance together, at once."}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.img,{alt:"default-latency",src:r(21088).A+"",width:"1898",height:"344"}),"\n",(0,a.jsx)(t.img,{alt:"default-throughput",src:r(71942).A+"",width:"1897",height:"486"})]}),"\n",(0,a.jsx)(t.p,{children:"During building that dashboard I realized that we missed some detail metrics. For example, the latency of writing and then exporting a record,\nis currently not measured. Furthermore, we have operating limited metrics, thus allowing us only to see the average\nlatency, not p99 nor p90. This needs to be enhanced in the future."}),"\n",(0,a.jsxs)(t.p,{children:["We will run three benchmarks (base, high load, and low load), and use again our ",(0,a.jsx)(t.a,{href:"https://github.com/zeebe-io/benchmark-helm",children:"benchmark helm chart"})," for such.\nAll defaults from the helm charts are used, if not other specified. The most important ones, which are static over all benchmarks are listed below."]}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Config"}),(0,a.jsx)(t.th,{children:"Value"})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Broker"}),(0,a.jsx)(t.td,{children:"3"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Partitions"}),(0,a.jsx)(t.td,{children:"3"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Replication"}),(0,a.jsx)(t.td,{children:"3"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Broker Mem"}),(0,a.jsx)(t.td,{children:"4G"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Broker CPU"}),(0,a.jsx)(t.td,{children:"1350m"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Broker Disk"}),(0,a.jsx)(t.td,{children:"32g"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Gateways"}),(0,a.jsx)(t.td,{children:"2"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Gateway Mem"}),(0,a.jsx)(t.td,{children:"1G"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Gateway CPU"}),(0,a.jsx)(t.td,{children:"450m"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"ES nodes"}),(0,a.jsx)(t.td,{children:"3"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"ES CPU"}),(0,a.jsx)(t.td,{children:"2"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"ES Mem"}),(0,a.jsx)(t.td,{children:"6G"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"ES Disk"}),(0,a.jsx)(t.td,{children:"128g"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Operate replicas"}),(0,a.jsx)(t.td,{children:"1"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Operate Memory"}),(0,a.jsx)(t.td,{children:"2g"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Operate CPU"}),(0,a.jsx)(t.td,{children:"2"})]})]})]}),"\n",(0,a.jsxs)(t.p,{children:["With the base, we should see how the import performs normally. As base, we will use the same configuration as we use in our weekly benchmarks, see\n",(0,a.jsx)(t.a,{href:"https://github.com/camunda/camunda/blob/main/.github/workflows/zeebe-medic-benchmarks.yml#L78-L89",children:"here"}),"."]}),"\n",(0,a.jsxs)(t.p,{children:["We use the same applications that we use for our other benchmarks, the code can be found ",(0,a.jsx)(t.a,{href:"https://github.com/camunda/camunda/tree/main/zeebe/benchmarks/project",children:"here"})]}),"\n",(0,a.jsx)(t.p,{children:"The base looks like the following:"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Config"}),(0,a.jsx)(t.th,{children:"Value"})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Starter"}),(0,a.jsx)(t.td,{children:"5 PI/s"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Worker"}),(0,a.jsx)(t.td,{children:"1 Replica"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Timer"}),(0,a.jsx)(t.td,{children:"5  PI/s"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Publisher"}),(0,a.jsx)(t.td,{children:"5   PI/s"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"Variables"}),(0,a.jsx)(t.td,{children:"46 Kb"})]})]})]}),"\n",(0,a.jsx)(t.p,{children:'The "Starter" deploys a process model with one task and creates instances at a rate of 5 process instances per second (PI/s). The "Worker" is handling such related tasks. The "Timer" deploys a process model with one timer catch event, and creates instances in a rate of 5 PI/s. The "Publisher" deploys a process model with a message catch event, and publishes messages at a rate of 5 per second. On each process instance variables of the size of 46 kilobytes are sent as payload, to mimic a more realistic scenario.'}),"\n",(0,a.jsx)(t.p,{children:"Going out of the base configuration we are adjusting the rate to a higher value (multiplied by 10), and to a lower value (divided by 5). This means for the high load benchmark we will have a rate of 50 PI/s per application (~150 PI/s), and for the lower load, we will have a rate of 1 PI/s per application (~3 PI/s)."}),"\n",(0,a.jsx)(t.h3,{id:"expected",children:"Expected"}),"\n",(0,a.jsx)(t.p,{children:"With the base benchmark, we will see how Operate is performing on a moderate load. As the importing of Operate is decoupled the higher load nor the lower load should have a significant impact on the importing time. It might be that due to a higher load on Zeebe, and a slightly bigger backlog the import time might be a bit higher for Operate."}),"\n",(0,a.jsx)(t.h3,{id:"actual",children:"Actual"}),"\n",(0,a.jsx)(t.h4,{id:"base",children:"Base"}),"\n",(0,a.jsxs)(n,{children:[(0,a.jsx)("summary",{children:"Helm install command"}),(0,a.jsx)("pre",{children:(0,a.jsxs)(t.p,{children:["helm install $(releaseName) $(chartPath) --render-subchart-notes ",(0,a.jsx)(t.br,{}),"\n","--set global.image.tag=ck-operate-benchmark-1ad8f375 ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.image.repository=gcr.io/zeebe-io/zeebe ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.image.tag=ck-operate-benchmark-1ad8f375 ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebeGateway.image.repository=gcr.io/zeebe-io/zeebe ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebeGateway.image.tag=ck-operate-benchmark-1ad8f375 ",(0,a.jsx)(t.br,{}),"\n","--set starter.rate=5 ",(0,a.jsx)(t.br,{}),"\n","--set worker.replicas=1 ",(0,a.jsx)(t.br,{}),"\n","--set timer.replicas=1 ",(0,a.jsx)(t.br,{}),"\n","--set timer.rate=5 ",(0,a.jsx)(t.br,{}),"\n","--set publisher.replicas=1 ",(0,a.jsx)(t.br,{}),"\n","--set publisher.rate=5 ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.operate.enabled=true ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.operate.image.repository=gcr.io/zeebe-io/operate ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.operate.image.tag=ck-operate-benchmark ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.elasticsearch.master.persistence.size=128Gi ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.retention.minimumAge=1d \\"]})})]}),"\n",(0,a.jsx)(t.p,{children:"With a moderate load (as described above) we can see how large the import delay already is."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"base-latency",src:r(21088).A+"",width:"1898",height:"344"})}),"\n",(0,a.jsx)(t.p,{children:"The import latency from Operate is above 5 seconds."}),"\n",(0,a.jsx)(t.p,{children:"As expected we can see that we complete 15 process instances per second. We process around 145 records per second, and export 415 records per second. Operate is only reading 370 records per second because not all records are consumed by Operate."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"base-throughput",src:r(71942).A+"",width:"1897",height:"486"})}),"\n",(0,a.jsx)(t.p,{children:"Here it might make sense to configure the exporter, to only export the important ones."}),"\n",(0,a.jsx)(t.h4,{id:"high-load",children:"High load"}),"\n",(0,a.jsxs)(n,{children:[(0,a.jsx)("summary",{children:"Helm install command"}),(0,a.jsx)("pre",{children:(0,a.jsxs)(t.p,{children:["helm install $(releaseName) $(chartPath) --render-subchart-notes ",(0,a.jsx)(t.br,{}),"\n","--set global.image.tag=ck-operate-benchmark-1ad8f375 ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.image.repository=gcr.io/zeebe-io/zeebe ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.image.tag=ck-operate-benchmark-1ad8f375 ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebeGateway.image.repository=gcr.io/zeebe-io/zeebe ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebeGateway.image.tag=ck-operate-benchmark-1ad8f375 ",(0,a.jsx)(t.br,{}),"\n","--set starter.rate=50 ",(0,a.jsx)(t.br,{}),"\n","--set worker.replicas=3 ",(0,a.jsx)(t.br,{}),"\n","--set timer.replicas=1 ",(0,a.jsx)(t.br,{}),"\n","--set timer.rate=50 ",(0,a.jsx)(t.br,{}),"\n","--set publisher.replicas=1 ",(0,a.jsx)(t.br,{}),"\n","--set publisher.rate=50 ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.operate.enabled=true ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.operate.image.repository=gcr.io/zeebe-io/operate ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.operate.image.tag=ck-operate-benchmark ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.elasticsearch.master.persistence.size=128Gi ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.retention.minimumAge=1d \\"]})})]}),"\n",(0,a.jsx)(t.p,{children:"Looking at the high load benchmark, we can see something surprising. The Operate import latency has been decreased. From ~5.7 to 4.4 seconds, which is a 30% improvement. The Zeebe processing latency has been increased due to the higher load."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"high-load-latency",src:r(18942).A+"",width:"1904",height:"346"})}),"\n",(0,a.jsx)(t.p,{children:"We can see that Zeebe is not able to handle ~150 instances, this can have multiple causes, too few workers, or other configurations, but this is irrelevant for today's benchmark."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"high-load-throughput",src:r(10540).A+"",width:"1904",height:"493"})}),"\n",(0,a.jsx)(t.p,{children:"A huge amount of records (3158) are imported by Operate per second, with the same configuration as for the base benchmark. It looks like there is still room (we might investigate this further next time)."}),"\n",(0,a.jsx)(t.h4,{id:"low-load",children:"Low load"}),"\n",(0,a.jsxs)(n,{children:[(0,a.jsx)("summary",{children:"Helm install command"}),(0,a.jsx)("pre",{children:(0,a.jsxs)(t.p,{children:["helm install $(releaseName) $(chartPath) --render-subchart-notes ",(0,a.jsx)(t.br,{}),"\n","--set global.image.tag=ck-operate-benchmark-1ad8f375 ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.image.repository=gcr.io/zeebe-io/zeebe ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.image.tag=ck-operate-benchmark-1ad8f375 ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebeGateway.image.repository=gcr.io/zeebe-io/zeebe ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebeGateway.image.tag=ck-operate-benchmark-1ad8f375 ",(0,a.jsx)(t.br,{}),"\n","--set starter.rate=1 ",(0,a.jsx)(t.br,{}),"\n","--set worker.replicas=1 ",(0,a.jsx)(t.br,{}),"\n","--set timer.replicas=1 ",(0,a.jsx)(t.br,{}),"\n","--set timer.rate=1 ",(0,a.jsx)(t.br,{}),"\n","--set publisher.replicas=1 ",(0,a.jsx)(t.br,{}),"\n","--set publisher.rate=1 ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.operate.enabled=true ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.operate.image.repository=gcr.io/zeebe-io/operate ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.operate.image.tag=ck-operate-benchmark ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.elasticsearch.master.persistence.size=128Gi ",(0,a.jsx)(t.br,{}),"\n","--set camunda-platform.zeebe.retention.minimumAge=1d \\"]})})]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"low-load-latency",src:r(29250).A+"",width:"1897",height:"343"})}),"\n",(0,a.jsx)(t.p,{children:"Unexpected or even counterintuitive is that on a lower load the import time went up again or is similar to the base benchmark ~5.7 seconds to import a record."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"low-load-throughput",src:r(14632).A+"",width:"1905",height:"494"})}),"\n",(0,a.jsx)(t.p,{children:"Zeebe is reaching the 3 PI/s and exporting again a bit more than Operate is importing, as described before likely to some filters."}),"\n",(0,a.jsx)(t.h3,{id:"result",children:"Result"}),"\n",(0,a.jsx)(t.p,{children:"We were not able to prove that Zeebe throughput doesn't affect Operate's import time. What we have seen is that higher throughput on the Zeebe side positively affects Operate's import time (import delay decreases from 5.7 seconds to 4.4 seconds). This was not just a short outlier, it was shown over a long period."}),"\n",(0,a.jsx)(t.p,{children:'It is likely related to how Zeebe exporting and Operate importing work together. Zeebe exporting collects several data before it is sent to Elasticsearch. Either if a certain time is due or a certain amount is reached. Operate might be idle from time to time and "sleep" and wake up every certain seconds to import again.'}),"\n",(0,a.jsx)(t.p,{children:"We have to investigate this further to understand all the details, but I think this as already an interesting learning."}),"\n",(0,a.jsx)(t.h2,{id:"next",children:"Next"}),"\n",(0,a.jsx)(t.p,{children:"In the following, I listed some potential improvements and investigations we might want to do next:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"We need better metrics in Operate, e.g. histograms to have p99, and p90 for import latency"}),"\n",(0,a.jsx)(t.li,{children:"We need the measure the export latency, to better understand and compare how long the import time really is"}),"\n",(0,a.jsx)(t.li,{children:"Investigate whether we can better configure exporting and importing, to reduce delays."}),"\n",(0,a.jsx)(t.li,{children:"Can we filter more records and this affects positively the importing?"}),"\n"]})]})}function c(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},21088:(e,t,r)=>{r.d(t,{A:()=>a});const a=r.p+"assets/images/default-latency-42bb59a3c0e41198245a39881eb5efe6.png"},71942:(e,t,r)=>{r.d(t,{A:()=>a});const a=r.p+"assets/images/default-throughput-633e5b518b1315340f16824249676ad4.png"},18942:(e,t,r)=>{r.d(t,{A:()=>a});const a=r.p+"assets/images/high-load-latency-e3e962e93add61bbff99b5bb718735f7.png"},10540:(e,t,r)=>{r.d(t,{A:()=>a});const a=r.p+"assets/images/high-load-throughput-a7467757d779975bc0daa55c7214a683.png"},29250:(e,t,r)=>{r.d(t,{A:()=>a});const a=r.p+"assets/images/low-load-latency-c26a6962a6679f059431e24501a86518.png"},14632:(e,t,r)=>{r.d(t,{A:()=>a});const a=r.p+"assets/images/low-load-throughput-87a6f32932cbb31cea39dc24a4f2af8c.png"},28453:(e,t,r)=>{r.d(t,{R:()=>i,x:()=>o});var a=r(96540);const s={},n=a.createContext(s);function i(e){const t=a.useContext(n);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),a.createElement(n.Provider,{value:t},e.children)}}}]);