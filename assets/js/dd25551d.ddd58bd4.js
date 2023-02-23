"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[7289],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>m});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=n.createContext({}),c=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},u=function(e){var t=c(e.components);return n.createElement(i.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(a),h=r,m=d["".concat(i,".").concat(h)]||d[h]||p[h]||o;return a?n.createElement(m,l(l({ref:t},u),{},{components:a})):n.createElement(m,l({ref:t},u))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,l=new Array(o);l[0]=h;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[d]="string"==typeof e?e:r,l[1]=s;for(var c=2;c<o;c++)l[c]=a[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},2215:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=a(7462),r=(a(7294),a(3905));const o={layout:"posts",title:"Standalone Gateway in CCSaaS",date:new Date("2022-02-15T00:00:00.000Z"),categories:["chaos_experiment","gateway"],tags:["availability"],authors:"zell"},l="Chaos Day Summary",s={permalink:"/zeebe-chaos/2022/02/15/Standalone-Gateway-in-CCSaaS",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2022-02-15-Standalone-Gateway-in-CCSaaS/index.md",source:"@site/blog/2022-02-15-Standalone-Gateway-in-CCSaaS/index.md",title:"Standalone Gateway in CCSaaS",description:"We recently introduced the Zeebe Standalone Gateway in CCSaaS. Today I wanted to do a first simple",date:"2022-02-15T00:00:00.000Z",formattedDate:"February 15, 2022",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:3.935,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Standalone Gateway in CCSaaS",date:"2022-02-15T00:00:00.000Z",categories:["chaos_experiment","gateway"],tags:["availability"],authors:"zell"},prevItem:{title:"Bring Deployment distribution experiment back",permalink:"/zeebe-chaos/2022/08/02/deployment-distribution"},nextItem:{title:"High Snapshot Frequency",permalink:"/zeebe-chaos/2022/02/01/High-Snapshot-Frequency"}},i={authorsImageUrls:[void 0]},c=[{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3},{value:"Result",id:"result",level:2},{value:"Found Issues",id:"found-issues",level:2},{value:"Optimize resources",id:"optimize-resources",level:3},{value:"Gateway metrics",id:"gateway-metrics",level:3},{value:"Gateway Anti-affinity",id:"gateway-anti-affinity",level:3}],u={toc:c},d="wrapper";function p(e){let{components:t,...o}=e;return(0,r.kt)(d,(0,n.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"We recently introduced the Zeebe Standalone Gateway in CCSaaS. Today I wanted to do a first simple\nchaos experiment with the gateway, where we just restart one gateway. "),(0,r.kt)("p",null,"Ideally in the future we could enable some gateway chaos experiments again, which we currently only support for ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/tree/master/chaos-workers/chaos-experiments/helm"},"helm"),"."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"TL;DR;")," Our Camunda Cloud clusters can handle gateway restarts without issues. "),(0,r.kt)("h2",{id:"chaos-experiment"},"Chaos Experiment"),(0,r.kt)("p",null,"This experiment is a simple restart / kill pod experiment. We want to verify that our cluster\ncan still make progress even if a gateway is restarted / killed in between. Currently, we are running two gateway replicas in the CCSaaS. "),(0,r.kt)("p",null,"In order to start with our experiment we created a new CCSaaS cluster with a ",(0,r.kt)("inlineCode",{parentName:"p"},"Production - S")," plan, and the latest version (1.3.4).\nTo run some load on the cluster we used the cloud benchmark deployments, which you can find ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/camunda-cloud/zeebe/tree/main/benchmarks/setup/cloud-default"},"here"),".\nThe load was rather low with ~ 100 PI/s."),(0,r.kt)("h3",{id:"expected"},"Expected"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Hypothesis: When restarting / killing a zeebe standalone gateway we expect only a small\nimpact on current requests, new requests should be routed to the right gateway and the cluster can\nmake progress.")),(0,r.kt)("h3",{id:"actual"},"Actual"),(0,r.kt)("p",null,"After creating the cluster and starting the benchmark we checked the current resource usage, to find a cluster which does most of the work. It looks like that the requests are well distributed."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"[zell zell-chaos/ cluster: ultrachaos ns:448f5091-8d15-4c01-a0ee-202437c09d83-zeebe]$ k top pod\nNAME                                                     CPU(cores)   MEMORY(bytes)   \n...      \nzeebe-gateway-6c9f95b557-f2zbf                           294m         407Mi           \nzeebe-gateway-6c9f95b557-gk57z                           202m         396Mi\n")),(0,r.kt)("p",null,"We deleted the first pod ",(0,r.kt)("inlineCode",{parentName:"p"},"zeebe-gateway-6c9f95b557-f2zbf")," and observed the metrics."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'[zell zell-chaos/ cluster: ultrachaos ns:448f5091-8d15-4c01-a0ee-202437c09d83-zeebe]$ k delete pod zeebe-gateway-6c9f95b557-f2zbf\npod "zeebe-gateway-6c9f95b557-f2zbf" deleted\n')),(0,r.kt)("p",null,"We can see that a new gateway pod is created quite fast."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"[zell zell-chaos/ cluster: ultrachaos ns:448f5091-8d15-4c01-a0ee-202437c09d83-zeebe]$ kgpo\nNAME                                                     READY   STATUS             RESTARTS   AGE\n...\nzeebe-gateway-6c9f95b557-flgz6                           0/1     Running            0          16s\nzeebe-gateway-6c9f95b557-gk57z                           1/1     Running            0          156m\n")),(0,r.kt)("p",null,"As expected we see no high impact due to the restart. "),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(7168).Z,width:"1834",height:"682"})),(0,r.kt)("p",null,"Just out of interest I deleted all gateway pods:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ k delete pod -l app.kubernetes.io/component=standalone-gateway\npod "zeebe-gateway-6c9f95b557-flgz6" deleted\npod "zeebe-gateway-6c9f95b557-gk57z" deleted\n')),(0,r.kt)("p",null,"We can see that the throughput goes almost directly down, but recovers again. It took ~4 min until we\nreached the normal state (normal throughput of 100 PI/s) again. But we can also see that it is only a short period\nof time, where nothing happens. "),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(4190).Z,width:"1828",height:"685"})),(0,r.kt)("p",null,"Ideally we would define some anti-affinity on the gateway pods, to reduce the risk of losing all gateways at once."),(0,r.kt)("h2",{id:"result"},"Result"),(0,r.kt)("p",null,"We were able to verify and proof our hypothesis."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("em",{parentName:"p"},"Hypothesis: When restarting / killing a zeebe standalone gateway we expect only a small\nimpact on current requests, new requests should be routed to the right gateway and the cluster can\nmake progress."))),(0,r.kt)("p",null,"As we saw above the resources were almost equally used, which is in our normal zeebe benchmarks not the case.\nIn the benchmarks we use the helm charts and there is no ingress controller enabled,\nso we have no good load balancing of the incoming requests."),(0,r.kt)("p",null,"The benefit of the standalone gateway now stands out: losing one is not too problematic than one broker with an embedded gateway,\nsince a broker takes longer to restart and is likely to be an leader for a partition, which will then also cause a leader change.\nFurthermore, we can scale the gateways independently. "),(0,r.kt)("h2",{id:"found-issues"},"Found Issues"),(0,r.kt)("h3",{id:"optimize-resources"},"Optimize resources"),(0,r.kt)("p",null,"During experiment with the CCSaaS cluster I observed that the Optimize importer was crashlooping due to this load (PI 100/s)."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"[zell zell-chaos/ cluster: ultrachaos ns:448f5091-8d15-4c01-a0ee-202437c09d83-zeebe]$ kgpo\nNAME                                                     READY   STATUS             RESTARTS   AGE\n...\noptimize-deployment-importer-archiver-65679b6449-pb7kz   0/1     CrashLoopBackOff   5          128m\n...\n")),(0,r.kt)("p",null,"Checking the pod shows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"    State:          Waiting\n      Reason:       CrashLoopBackOff\n    Last State:     Terminated\n      Reason:       Error\n      Exit Code:    3\n      Started:      Tue, 15 Feb 2022 14:25:36 +0100\n      Finished:     Tue, 15 Feb 2022 14:26:33 +0100\n    Ready:          False\n")),(0,r.kt)("p",null,"Checking the logs we can see that it runs continuously out of memory."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'\nZell\ufffc  13 minutes ago\n13:32:48.493 [ZeebeImportScheduler-1] WARN  org.elasticsearch.client.RestClient - request [POST http://elasticsearch:9200/zeebe-record-process-instance/_search?routing=2&typed_keys=true&max_concurrent_shard_requests=5&ignore_unavailable=false&expand_wildcards=open&allow_no_indices=true&ignore_throttled=true&request_cache=false&search_type=query_then_fetch&batched_reduce_size=512&ccs_minimize_roundtrips=true] returned 1 warnings: [299 Elasticsearch-7.16.2-2b937c44140b6559905130a8650c64dbd0879cfb "[ignore_throttled] parameter is deprecated because frozen indices have been deprecated. Consider cold or frozen tiers in place of frozen indices."]\n13:32:49.104 [ImportJobExecutor-pool-ZeebeProcessInstanceImportService-0] WARN  org.elasticsearch.client.RestClient - request [HEAD http://elasticsearch:9200/optimize-process-instance-benchmark?ignore_throttled=false&ignore_unavailable=false&expand_wildcards=open%2Cclosed&allow_no_indices=false] returned 1 warnings: [299 Elasticsearch-7.16.2-2b937c44140b6559905130a8650c64dbd0879cfb "[ignore_throttled] parameter is deprecated because frozen indices have been deprecated. Consider cold or frozen tiers in place of frozen indices."]\njava.lang.OutOfMemoryError: Java heap space\nDumping heap to java_pid8.hprof ...\nHeap dump file created [611503401 bytes in 1.070 secs]\nTerminating due to java.lang.OutOfMemoryError: Java heap space\n')),(0,r.kt)("h3",{id:"gateway-metrics"},"Gateway metrics"),(0,r.kt)("p",null,"It looks like that in our latest ccsm helm charts, we no longer export the gateway metrics which we should fix."),(0,r.kt)("h3",{id:"gateway-anti-affinity"},"Gateway Anti-affinity"),(0,r.kt)("p",null,"Currently, we have no anti-affinity defined for the gateway, which could cause on preemption to take down all gateways."))}p.isMDXComponent=!0},7168:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/restart-5fbac0a50fb69d699a0721209d956d9d.png"},4190:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/restart2-a5fd3b37472ebf79e5edac7f1ed513e5.png"}}]);