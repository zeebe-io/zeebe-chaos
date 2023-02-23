"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[8061],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>h});var a=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,o=function(e,t){if(null==e)return{};var r,a,o={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=a.createContext({}),p=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},d="mdxType",b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,o=e.mdxType,n=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(r),m=o,h=d["".concat(l,".").concat(m)]||d[m]||b[m]||n;return r?a.createElement(h,i(i({ref:t},c),{},{components:r})):a.createElement(h,i({ref:t},c))}));function h(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var n=r.length,i=new Array(n);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:o,i[1]=s;for(var p=2;p<n;p++)i[p]=r[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},2646:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>b,frontMatter:()=>n,metadata:()=>s,toc:()=>p});var a=r(7462),o=(r(7294),r(3905));const n={layout:"posts",title:"Experiment without Exporters",date:new Date("2020-07-30T00:00:00.000Z"),categories:["chaos_experiment","exporters"],authors:"zell"},i="Chaos Day Summary",s={permalink:"/zeebe-chaos/2020/07/30/experiment-without-exporters",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-07-30-experiment-without-exporters/index.md",source:"@site/blog/2020-07-30-experiment-without-exporters/index.md",title:"Experiment without Exporters",description:"* Run a chaos experiment without exporters",date:"2020-07-30T00:00:00.000Z",formattedDate:"July 30, 2020",tags:[],readingTime:5.755,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Experiment without Exporters",date:"2020-07-30T00:00:00.000Z",categories:["chaos_experiment","exporters"],authors:"zell"},prevItem:{title:"Experiment with Low Load",permalink:"/zeebe-chaos/2020/08/06/low-load"},nextItem:{title:"Big Multi Instance",permalink:"/zeebe-chaos/2020/07/16/big-multi-instance"}},l={authorsImageUrls:[void 0]},p=[{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3},{value:"General Observations",id:"general-observations",level:4},{value:"RocksDB",id:"rocksdb",level:5},{value:"Atomix Bootstrap",id:"atomix-bootstrap",level:5},{value:"Merged log statement",id:"merged-log-statement",level:5},{value:"Wrong Exporter Configuration",id:"wrong-exporter-configuration",level:5},{value:"Code",id:"code",level:3},{value:"Participants",id:"participants",level:2}],c={toc:p},d="wrapper";function b(e){let{components:t,...n}=e;return(0,o.kt)(d,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Run a chaos experiment without exporters")),(0,o.kt)("h2",{id:"chaos-experiment"},"Chaos Experiment"),(0,o.kt)("p",null," We wanted to run a chaos experiment, which covers ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/issues/20"},"#20"),".\nFurthermore, it was recently asked in the forum whether it makes a difference performance wise to run a broker without exporters, see ",(0,o.kt)("a",{parentName:"p",href:"https://forum.zeebe.io/t/zeebe-low-performance/1356/17"},"here")," "),(0,o.kt)("h3",{id:"expected"},"Expected"),(0,o.kt)("p",null," Running Broker without exporter should work without any problems. We should be able to delete data on every snapshot interval.\nPerformance wise there should be no difference. "),(0,o.kt)("h3",{id:"actual"},"Actual"),(0,o.kt)("p",null," We have setup three different benchmarks:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"default with elastic and metrics exporter enabled")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"only with metrics exporter")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"without any exporter"),(0,o.kt)("p",{parentName:"li"},"These benchmarks run overnight without bigger issues. This means all of three where able to take snapshots and compact the log. This satisfy our hypothesis of ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/issues/20"},"https://github.com/zeebe-io/zeebe-chaos/issues/20")," ."))),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Default"),(0,o.kt)("th",{parentName:"tr",align:null},"Without exporters"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("img",{alt:"default-pvc",src:r(301).Z,width:"1839",height:"570"})),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("img",{alt:"without-exporter-pvc",src:r(7978).Z,width:"1837",height:"570"}))))),(0,o.kt)("p",null,"The resource consumption seem to be kind of similar, but we still see that the memory usage increases overtime. This seems to be related to ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe/issues/4812"},"#4812")),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Default"),(0,o.kt)("th",{parentName:"tr",align:null},"Metric Exporter"),(0,o.kt)("th",{parentName:"tr",align:null},"Without exporters"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("img",{alt:"default",src:r(6990).Z,width:"1829",height:"645"})),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("img",{alt:"metric",src:r(3514).Z,width:"1826",height:"638"})),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("img",{alt:"without",src:r(213).Z,width:"1828",height:"639"}))))),(0,o.kt)("p",null," Unexpected was that we see a difference in throughput. The benchmark without exporters seem to have a better throughput overall. It is able to complete ~ 30 workflow instances more per second, then the other benchmarks."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Default"),(0,o.kt)("th",{parentName:"tr",align:null},"Metric Exporter"),(0,o.kt)("th",{parentName:"tr",align:null},"Without exporters"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("img",{alt:"default",src:r(1966).Z,width:"1848",height:"915"})),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("img",{alt:"metric",src:r(7266).Z,width:"1847",height:"924"})),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("img",{alt:"without",src:r(3280).Z,width:"1850",height:"908"}))))),(0,o.kt)("p",null,"  We compared also other benchmarks which we have currently running, e.g. a snapshot from 24-07-2020 or from the 0.24.1 release. "),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Snapshot 24-07"),(0,o.kt)("th",{parentName:"tr",align:null},"Release 0.24.1"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("img",{alt:"snapshot",src:r(5531).Z,width:"1845",height:"916"})),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("img",{alt:"release-241",src:r(5410).Z,width:"1845",height:"916"}))))),(0,o.kt)("p",null,"  All benchmarks with exporters seem to have a throughput around ~140 workflow instance completions per second, but the benchmarks without exporters reaches ~170 workflow instance completions per second.\nWhen we check the metrics we can see that sometimes brokers are leader for all partition and sometimes it is good distributed, but even this makes not that huge difference as the fact to having no exporter.\nThis is unexpected and we need to investigate further, created new issue for this ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe/issues/5085"},"#5085")),(0,o.kt)("p",null," The latency seems to be not affected by this."),(0,o.kt)("h4",{id:"general-observations"},"General Observations"),(0,o.kt)("h5",{id:"rocksdb"},"RocksDB"),(0,o.kt)("p",null,"After taking a look at the metrics of the different benchmarks we can see that at one benchmark we have a higher live data size, which is unexepected."),(0,o.kt)("p",null,"  ",(0,o.kt)("img",{alt:"without-exporter-rocksdb",src:r(6054).Z,width:"1844",height:"719"}),"\n",(0,o.kt)("img",{alt:"default-rocksdb",src:r(1791).Z,width:"1834",height:"713"}),"\n",(0,o.kt)("img",{alt:"metric-exporter-rocksdb",src:r(1791).Z,width:"1834",height:"713"})),(0,o.kt)("p",null,"Created an issue for it ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe/issues/5081"},"#5081")),(0,o.kt)("h5",{id:"atomix-bootstrap"},"Atomix Bootstrap"),(0,o.kt)("p",null,"On taking a look at the logs during starting the benchmarks we can see that the logging of atomix is not really useful."),(0,o.kt)("p",null,"It prints several statements which seem to be just noisy."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"I 2020-07-30T10:17:54.198527Z TCP server listening for connections on 0.0.0.0:26502 \nI 2020-07-30T10:17:54.199468Z Started \nI 2020-07-30T10:17:54.223547Z UDP server listening for connections on 0.0.0.0:26502 \nI 2020-07-30T10:17:54.224941Z Joined \nI 2020-07-30T10:17:54.228644Z Started \nI 2020-07-30T10:17:54.229384Z Started \nI 2020-07-30T10:17:54.229856Z Started \nI 2020-07-30T10:17:54.231121Z Started \n")),(0,o.kt)("p",null,"Created an issue for it ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe/issues/5080"},"#5080")),(0,o.kt)("h5",{id:"merged-log-statement"},"Merged log statement"),(0,o.kt)("p",null,"Another issue we can see during startup is that from time the log statements are merged together in stackdriver."),(0,o.kt)("p",null,"Looks like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'I 2020-07-30T09:16:47.053339Z Bootstrap Broker-1 partitions succeeded. Started 3 steps in 166 ms. \nI 2020-07-30T09:16:47.053352763Z {"severity":"DEBUG","logging.googleapis.com/sourceLocation":{"function":"startStepByStep","file":"StartProcess.java","line":63},"message":"Bootstrap Broker-1 partitions [3/3]: partition 1 started in 7 ms","serviceContext":{"service":"zeebe-broker","version":"zeebe-chaos-metric-exporter"},"context":{"threadId":1,"broker-id":"Broker-1","threadPriority":5,"loggerName":"io.zeebe.broker.system","threadName":"main"},"timestampSeconds":1596100607,"timestampNanos":52869000,"logger":"io.zeebe.broker.system","thread":"main"}{"severity":"DEBUG","logging.googleapis.com/sourceLocation":{"function":"calculateHealth","file":"CriticalComponentsHealthMonitor.java","line":91},"message":"The components are healthy. The current health status of components: {ZeebePartition-1=HEALTHY}","serviceContext":{"service":"zeebe-broker","version":"zeebe-chaos-metric-exporter"},"context":{"threadId":263,"threadPriority":5,"loggerName":"io.zeebe.broker.system","threadName":"Broker-1-zb-actors-3","actor-name":"Broker-1-ZeebePartition-1"},"timestampSeconds":1596100607,"timestampNanos":52860000,"logger":"io.zeebe.broker.system","thread":"Broker-1-zb-actors-3"}\n \nI 2020-07-30T09:16:47.053379451Z \n\n')),(0,o.kt)("p",null,"Created an issue for it ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe/issues/5079"},"#5079")),(0,o.kt)("h5",{id:"wrong-exporter-configuration"},"Wrong Exporter Configuration"),(0,o.kt)("p",null,"When Exporter is configured falsely it breaks the start up, which means the exporter can't be loaded and we see an exception."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'{\n insertId: "1mp0o7821rhxwebj4"  \n jsonPayload: {\n  context: {\u2026}   \n  exception: "java.lang.IllegalStateException: Failed to load exporter with configuration: ExporterCfg{, jarPath=\'null\', className=\'\', args={index={ignoreVariablesAbove=32767}, url=http://elasticsearch-master:9200}}\n    at io.zeebe.broker.system.partitions.ZeebePartition.<init>(ZeebePartition.java:145) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.Broker.lambda$partitionsStep$22(Broker.java:344) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.bootstrap.StartProcess.lambda$startStepByStep$2(StartProcess.java:60) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.bootstrap.StartProcess.takeDuration(StartProcess.java:88) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.bootstrap.StartProcess.startStepByStep(StartProcess.java:58) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.bootstrap.StartProcess.takeDuration(StartProcess.java:88) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.bootstrap.StartProcess.start(StartProcess.java:43) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.Broker.partitionsStep(Broker.java:352) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.Broker.lambda$initStart$10(Broker.java:184) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.bootstrap.StartProcess.lambda$startStepByStep$2(StartProcess.java:60) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.bootstrap.StartProcess.takeDuration(StartProcess.java:88) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.bootstrap.StartProcess.startStepByStep(StartProcess.java:58) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.bootstrap.StartProcess.takeDuration(StartProcess.java:88) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.bootstrap.StartProcess.start(StartProcess.java:43) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.Broker.internalStart(Broker.java:135) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.util.LogUtil.doWithMDC(LogUtil.java:21) [zeebe-util-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.Broker.start(Broker.java:115) [zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.StandaloneBroker.run(StandaloneBroker.java:65) [zeebe-distribution-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at org.springframework.boot.SpringApplication.callRunner(SpringApplication.java:795) [spring-boot-2.3.1.RELEASE.jar:2.3.1.RELEASE]\n    at org.springframework.boot.SpringApplication.callRunners(SpringApplication.java:779) [spring-boot-2.3.1.RELEASE.jar:2.3.1.RELEASE]\n    at org.springframework.boot.SpringApplication.run(SpringApplication.java:322) [spring-boot-2.3.1.RELEASE.jar:2.3.1.RELEASE]\n    at org.springframework.boot.SpringApplication.run(SpringApplication.java:1237) [spring-boot-2.3.1.RELEASE.jar:2.3.1.RELEASE]\n    at org.springframework.boot.SpringApplication.run(SpringApplication.java:1226) [spring-boot-2.3.1.RELEASE.jar:2.3.1.RELEASE]\n    at io.zeebe.broker.StandaloneBroker.main(StandaloneBroker.java:52) [zeebe-distribution-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\nCaused by: io.zeebe.broker.exporter.repo.ExporterLoadException: Cannot load exporter [elasticsearch]: cannot load specified class\n    at io.zeebe.broker.exporter.repo.ExporterRepository.load(ExporterRepository.java:81) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.system.partitions.ZeebePartition.<init>(ZeebePartition.java:143) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    ... 23 more\nCaused by: java.lang.ClassNotFoundException: \n    at jdk.internal.loader.BuiltinClassLoader.loadClass(Unknown Source) ~[?:?]\n    at jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(Unknown Source) ~[?:?]\n    at java.lang.ClassLoader.loadClass(Unknown Source) ~[?:?]\n    at io.zeebe.broker.exporter.repo.ExporterRepository.load(ExporterRepository.java:78) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    at io.zeebe.broker.system.partitions.ZeebePartition.<init>(ZeebePartition.java:143) ~[zeebe-broker-0.25.0-SNAPSHOT.jar:0.25.0-SNAPSHOT]\n    ... 23 more\n"   \n  logger: "io.zeebe.broker.system"   \n  message: "Bootstrap Broker-1 [11/12]: zeebe partitions failed with unexpected exception."   \n  serviceContext: {\u2026}   \n  thread: "main"   \n }\n labels: {\u2026}  \n logName: "projects/zeebe-io/logs/stdout"  \n receiveTimestamp: "2020-07-30T04:58:07.561999605Z"  \n resource: {\u2026}  \n severity: "INFO"  \n sourceLocation: {\u2026}  \n timestamp: "2020-07-30T04:58:04.221614Z"  \n}\n')),(0,o.kt)("p",null,"The Broker is shutdown afterwards."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"I 2020-07-30T05:02:58.275180Z Bootstrap Broker-1 partitions [1/3]: partition 3 \nI 2020-07-30T05:02:58.288302Z Bootstrap Broker-1 partitions [1/3]: partition 3 failed with unexpected exception. \nI 2020-07-30T05:02:58.289941Z Closing Broker-1 partitions succeeded. Closed 0 steps in 0 ms. \nI 2020-07-30T05:02:58.290305Z Bootstrap Broker-1 [11/12]: zeebe partitions failed with unexpected exception. \nI 2020-07-30T05:02:58.291341Z Closing Broker-1 [1/10]: leader management request handler \nD 2020-07-30T05:02:58.293136Z Closing Broker-1 [1/10]: leader management request handler closed in 2 ms \nI 2020-07-30T05:02:58.293512Z Closing Broker-1 [2/10]: disk space monitor \nD 2020-07-30T05:02:58.294140Z Closing Broker-1 [2/10]: disk space monitor closed in 1 ms \nI 2020-07-30T05:02:58.294509Z Closing Broker-1 [3/10]: monitoring services \nD 2020-07-30T05:02:58.295059Z Closing Broker-1 [3/10]: monitoring services closed in 1 ms \nI 2020-07-30T05:02:58.295371Z Closing Broker-1 [4/10]: topology manager \nD 2020-07-30T05:02:58.295964Z Closing Broker-1 [4/10]: topology manager closed in 0 ms \nI 2020-07-30T05:02:58.296264Z Closing Broker-1 [5/10]: cluster services \nD 2020-07-30T05:02:58.296612Z Closing Broker-1 [5/10]: cluster services closed in 0 ms \nI 2020-07-30T05:02:58.296928Z Closing Broker-1 [6/10]: subscription api \nD 2020-07-30T05:02:58.297450Z Closing Broker-1 [6/10]: subscription api closed in 0 ms \nI 2020-07-30T05:02:58.297763Z Closing Broker-1 [7/10]: command api handler \nD 2020-07-30T05:02:58.298951Z Closing Broker-1 [7/10]: command api handler closed in 0 ms \nI 2020-07-30T05:02:58.299366Z Closing Broker-1 [8/10]: command api transport \nI 2020-07-30T05:03:00.320886Z Stopped \nD 2020-07-30T05:03:00.321691Z Closing Broker-1 [8/10]: command api transport closed in 2022 ms \nI 2020-07-30T05:03:00.322220Z Closing Broker-1 [9/10]: membership and replication protocol \nI 2020-07-30T05:03:00.323776Z RaftServer{raft-partition-partition-3} - Transitioning to INACTIVE \nI 2020-07-30T05:03:00.324179Z RaftServer{raft-partition-partition-2} - Transitioning to INACTIVE \nI 2020-07-30T05:03:00.324205Z RaftServer{raft-partition-partition-1} - Transitioning to INACTIVE \nI 2020-07-30T05:03:00.343039Z Stopped \nI 2020-07-30T05:03:00.344506Z Stopped \nI 2020-07-30T05:03:00.345422Z Stopped \nI 2020-07-30T05:03:00.346547Z Stopped \nI 2020-07-30T05:03:00.347267Z 1 - Member deactivated: Member{id=1, address=zeebe-chaos-zeebe-1.zeebe-chaos-zeebe.zeebe-chaos.svc.cluster.local:26502, properties={brokerInfo=EADJAAAAAQABAAAAAwAAAAMAAAADAAAAAAABCgAAAGNvbW1hbmRBcGlJAAAAemVlYmUtY2hhb3MtemVlYmUtMS56ZWViZS1jaGFvcy16ZWViZS56ZWViZS1jaGFvcy5zdmMuY2x1c3Rlci5sb2NhbDoyNjUwMQUAAAwAAA8AAAAwLjI1LjAtU05BUFNIT1Q=}} \nI 2020-07-30T05:03:00.347747Z Stopped \nI 2020-07-30T05:03:00.348326Z Left \nI 2020-07-30T05:03:00.349083Z Stopped \nI 2020-07-30T05:03:04.364059Z Stopped \nI 2020-07-30T05:03:04.364994Z Stopped \nD 2020-07-30T05:03:04.365955Z Closing Broker-1 [9/10]: membership and replication protocol closed in 4043 ms \nI 2020-07-30T05:03:04.366433Z Closing Broker-1 [10/10]: actor scheduler \nD 2020-07-30T05:03:04.366879Z Closing blocking task runner \nD 2020-07-30T05:03:04.367217Z Closing actor thread ground 'Broker-1-zb-fs-workers' \nD 2020-07-30T05:03:04.368641Z Closing actor thread ground 'Broker-1-zb-fs-workers': closed successfully \nD 2020-07-30T05:03:04.369018Z Closing actor thread ground 'Broker-1-zb-actors' \nD 2020-07-30T05:03:04.369955Z Closing blocking task runner: closed successfully \nD 2020-07-30T05:03:04.370112Z Closing actor thread ground 'Broker-1-zb-actors': closed successfully \nD 2020-07-30T05:03:04.371034Z Closing Broker-1 [10/10]: actor scheduler closed in 4 ms \nI 2020-07-30T05:03:04.371414Z Closing Broker-1 succeeded. Closed 10 steps in 6080 ms. \nE 2020-07-30T05:03:04.371769Z Failed to start broker 1! \n")),(0,o.kt)("p",null,"This is works without problems. I think this is good to know."),(0,o.kt)("h3",{id:"code"},"Code"),(0,o.kt)("p",null,"To deploy a benchmark without exporters we had to do a ",(0,o.kt)("inlineCode",{parentName:"p"},"helm template")," and remove all exporter related env variables."),(0,o.kt)("h2",{id:"participants"},"Participants"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"@zelldon")))}b.isMDXComponent=!0},1966:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/default-general-4ec70f62414cc8ac4f8f553053f2eccf.png"},301:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/default-pvc-469e3d330b70e812076b1a698fca2536.png"},6990:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/default-resources-a917df422fb30b6089b249ec5f2578c1.png"},1791:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/default-rocksdb-6affdc45a3b5336205e162491a99d5e4.png"},7266:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/metric-exporter-general-6355043145eca161da102ca2fb6b6991.png"},3514:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/metric-exporter-resources-d8b4e6c86bb038799ffc8ab101633be1.png"},5410:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/release-0241-general-e0ec563cac1ee40807464ef0520833ea.png"},5531:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/snapshot-24-7-general-96cf8d8a9a28fd3ea52c3ef883b666d2.png"},3280:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/without-exporter-general-9ef196f675dfde45fd87c9b728da719f.png"},7978:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/without-exporter-pvc-a0f2ffb742d96daa354f10954cf113ba.png"},213:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/without-exporter-resources-147a33a8d947f84836877a0e0b04149a.png"},6054:(e,t,r)=>{r.d(t,{Z:()=>a});const a=r.p+"assets/images/without-exporter-rocksdb-eda01ef46c63c7224081729ba13606b5.png"}}]);