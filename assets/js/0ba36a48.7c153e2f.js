"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[216],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>m});var n=a(7294);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,l=function(e,t){if(null==e)return{};var a,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var s=n.createContext({}),c=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,l=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=c(a),h=l,m=d["".concat(s,".").concat(h)]||d[h]||u[h]||o;return a?n.createElement(m,r(r({ref:t},p),{},{components:a})):n.createElement(m,r({ref:t},p))}));function m(e,t){var a=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var o=a.length,r=new Array(o);r[0]=h;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[d]="string"==typeof e?e:l,r[1]=i;for(var c=2;c<o;c++)r[c]=a[c];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},9878:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var n=a(7462),l=(a(7294),a(3905));const o={layout:"posts",title:"Handling of Big Variables",date:new Date("2022-01-19T00:00:00.000Z"),categories:["chaos_experiment","bpmn","variables"],tags:["availability"],authors:"zell"},r="Chaos Day Summary",i={permalink:"/zeebe-chaos/2022/01/19/big-variables",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2022-01-19-big-variables/index.md",source:"@site/blog/2022-01-19-big-variables/index.md",title:"Handling of Big Variables",description:"New Year;New Chaos",date:"2022-01-19T00:00:00.000Z",formattedDate:"January 19, 2022",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:5.29,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Handling of Big Variables",date:"2022-01-19T00:00:00.000Z",categories:["chaos_experiment","bpmn","variables"],tags:["availability"],authors:"zell"},prevItem:{title:"High Snapshot Frequency",permalink:"/zeebe-chaos/2022/02/01/High-Snapshot-Frequency"},nextItem:{title:"Worker count should not impact performance",permalink:"/zeebe-chaos/2021/11/24/Worker-count-should-not-impact-performance"}},s={authorsImageUrls:[void 0]},c=[{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3},{value:"Base",id:"base",level:4},{value:"Small Payload",id:"small-payload",level:4},{value:"Big Payload",id:"big-payload",level:4},{value:"Increasing Resources",id:"increasing-resources",level:5},{value:"Camunda Cloud",id:"camunda-cloud",level:3},{value:"Result",id:"result",level:3},{value:"Found Bugs",id:"found-bugs",level:3},{value:"Message pack is not valid",id:"message-pack-is-not-valid",level:2},{value:"Configure the Starter payload",id:"configure-the-starter-payload",level:2}],p={toc:c},d="wrapper";function u(e){let{components:t,...o}=e;return(0,l.kt)(d,(0,n.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"New Year;\ud83c\udf89New Chaos\ud83d\udc12"),(0,l.kt)("p",null,'This time I wanted to experiment with "big" variables. Zeebe supports a ',(0,l.kt)("inlineCode",{parentName:"p"},"maxMessageSize")," of 4 MB, which is quite big. In general, it should be clear that using big variables will cause performance issues, but today I also want to find out whether the system can handle big variables (~1 MB) at all. "),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"TL;DR;")," Our Chaos experiment failed! Zeebe and Camunda Cloud is not able to handle (per default) big variables (~1 MB) without issues."),(0,l.kt)("h2",{id:"chaos-experiment"},"Chaos Experiment"),(0,l.kt)("p",null,"Normally we run our benchmarks with ~32 KB payload size. This time we want to try out a payload size of ~1 MB and verify whether the system can handle such payload sizes. The payload we use can be found ",(0,l.kt)("a",{parentName:"p",href:"pathname://big_payload.json"},"here"),". "),(0,l.kt)("p",null,"The benchmark setup, is similar to default Zeebe benchmarks you can find ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/camunda-cloud/zeebe/tree/develop/benchmarks/setup/default"},"here"),". To make it work and fair we updated the starter and worker resources for both, base and the chaos cluster."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-diff"},'diff --git a/benchmarks/setup/default/starter.yaml b/benchmarks/setup/default/starter.yaml\nindex 78c6e81dbb..d0404d4d3e 100644\n--- a/benchmarks/setup/default/starter.yaml\n+++ b/benchmarks/setup/default/starter.yaml\n@@ -30,11 +30,11 @@ spec:\n             value: "warn"\n         resources:\n           limits:\n-            cpu: 250m\n-            memory: 256Mi\n+            cpu: 1G\n+            memory: 2Gi\n           requests:\n-            cpu: 250m\n-            memory: 256Mi\n+            cpu: 1G\n+            memory: 2Gi\n ---\n apiVersion: v1\n kind: Service\ndiff --git a/benchmarks/setup/default/worker.yaml b/benchmarks/setup/default/worker.yaml\nindex cd6f5ffeb6..05b195291f 100644\n--- a/benchmarks/setup/default/worker.yaml\n+++ b/benchmarks/setup/default/worker.yaml\n@@ -31,11 +31,11 @@ spec:\n             value: "warn"\n         resources:\n           limits:\n-            cpu: 500m\n-            memory: 256Mi\n+            cpu: 1G\n+            memory: 1Gi\n           requests:\n-            cpu: 500m\n-            memory: 256Mi\n+            cpu: 1G\n+            memory: 1Gi\n')),(0,l.kt)("h3",{id:"expected"},"Expected"),(0,l.kt)("p",null,"It is expected that the performance will drop, we formulate the following hypothesis."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Hypothesis: With a bigger payload size of e.g. 1 MB, Zeebe should be still able to handle process instances, maybe under a degraded performance, but in general the availability must not suffer from such a payload size.")),(0,l.kt)("h3",{id:"actual"},"Actual"),(0,l.kt)("h4",{id:"base"},"Base"),(0,l.kt)("p",null,"We started a base benchmark with ~32 KB to verify how it looks like normally."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"base",src:a(8724).Z,width:"1838",height:"912"})),(0,l.kt)("h4",{id:"small-payload"},"Small Payload"),(0,l.kt)("p",null,"In order to verify how Zeebe handles different payload, we first started with a small payload ~130 bytes, which is part of the Starter application (called ",(0,l.kt)("inlineCode",{parentName:"p"},"small_payload.json"),"). "),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"small-payload",src:a(3749).Z,width:"1835",height:"910"})),(0,l.kt)("p",null,"We can see that the system handles such payload without any issues, and we can reach ~190 process instances per second (PI/s)."),(0,l.kt)("h4",{id:"big-payload"},"Big Payload"),(0,l.kt)("p",null,"After running with a small payload, we changed the payload to a size of ~1 MB. This immediately broke the standalone gateways."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"big-payload",src:a(9526).Z,width:"1835",height:"904"})),(0,l.kt)("p",null,"The gateways went out of memory (OOM) in a loop. No processing was made in this time."),(0,l.kt)("h5",{id:"increasing-resources"},"Increasing Resources"),(0,l.kt)("p",null,"In order to continue the experiment and to verify how Zeebe itself can handle it, we increased the gateway resources."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-diff"},"diff --git a/benchmarks/setup/default/zeebe-values.yaml b/benchmarks/setup/default/zeebe-values.yaml\nindex 371ba538dc..7a11c10366 100644\n--- a/benchmarks/setup/default/zeebe-values.yaml\n+++ b/benchmarks/setup/default/zeebe-values.yaml\n@@ -38,10 +38,10 @@ gateway:\n   resources:\n     limits:\n       cpu: 1\n-      memory: 512Mi\n+      memory: 4Gi\n     requests:\n       cpu: 1\n-      memory: 512Mi\n+      memory: 4Gi\n")),(0,l.kt)("p",null,"But this doesn't help. The gateway went no longer OOM, but it was still not able to handle the payload."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"increase-res",src:a(8195).Z,width:"1834",height:"912"})),(0,l.kt)("p",null,'We can see that in a short period of time some events have been processed (small spike in the "Current Events" panel), but this stopped quite fast again. In the gateway logs there are endless warnings:'),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},'Warning 2022-01-20 10:09:32.644 CET zeebe-cluster-helm "Stream Error"\nWarning 2022-01-20 10:09:56.847 CET zeebe-cluster-helm "Stream Error"\n')),(0,l.kt)("p",null,"With an underlying exception: ",(0,l.kt)("inlineCode",{parentName:"p"},"io.netty.handler.codec.http2.Http2Exception$StreamException: Stream closed before write could take place")," "),(0,l.kt)("details",null,(0,l.kt)("summary",null,"Stacktrace"),"``` io.netty.handler.codec.http2.Http2Exception$StreamException: Stream closed before write could take place at io.netty.handler.codec.http2.Http2Exception.streamError(Http2Exception.java:172) ~[netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.DefaultHttp2RemoteFlowController$FlowState.cancel(DefaultHttp2RemoteFlowController.java:481) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.DefaultHttp2RemoteFlowController$1.onStreamClosed(DefaultHttp2RemoteFlowController.java:105) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.DefaultHttp2Connection.notifyClosed(DefaultHttp2Connection.java:357) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.DefaultHttp2Connection$ActiveStreams.removeFromActiveStreams(DefaultHttp2Connection.java:1007) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.DefaultHttp2Connection$ActiveStreams.deactivate(DefaultHttp2Connection.java:963) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.DefaultHttp2Connection$DefaultStream.close(DefaultHttp2Connection.java:515) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.DefaultHttp2Connection$DefaultStream.close(DefaultHttp2Connection.java:521) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.Http2ConnectionHandler.closeStream(Http2ConnectionHandler.java:613) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.DefaultHttp2ConnectionDecoder$FrameReadListener.onRstStreamRead(DefaultHttp2ConnectionDecoder.java:444) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.Http2InboundFrameLogger$1.onRstStreamRead(Http2InboundFrameLogger.java:80) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.DefaultHttp2FrameReader.readRstStreamFrame(DefaultHttp2FrameReader.java:509) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.DefaultHttp2FrameReader.processPayloadState(DefaultHttp2FrameReader.java:259) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.DefaultHttp2FrameReader.readFrame(DefaultHttp2FrameReader.java:159) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.Http2InboundFrameLogger.readFrame(Http2InboundFrameLogger.java:41) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.DefaultHttp2ConnectionDecoder.decodeFrame(DefaultHttp2ConnectionDecoder.java:173) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.Http2ConnectionHandler$FrameDecoder.decode(Http2ConnectionHandler.java:378) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.http2.Http2ConnectionHandler.decode(Http2ConnectionHandler.java:438) [netty-codec-http2-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.ByteToMessageDecoder.decodeRemovalReentryProtection(ByteToMessageDecoder.java:510) [netty-codec-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.ByteToMessageDecoder.callDecode(ByteToMessageDecoder.java:449) [netty-codec-4.1.73.Final.jar:4.1.73.Final] at io.netty.handler.codec.ByteToMessageDecoder.channelRead(ByteToMessageDecoder.java:279) [netty-codec-4.1.73.Final.jar:4.1.73.Final] at io.netty.channel.AbstractChannelHandlerContext.invokeChannelRead(AbstractChannelHandlerContext.java:379) [netty-transport-4.1.73.Final.jar:4.1.73.Final] at io.netty.channel.AbstractChannelHandlerContext.invokeChannelRead(AbstractChannelHandlerContext.java:365) [netty-transport-4.1.73.Final.jar:4.1.73.Final] at io.netty.channel.AbstractChannelHandlerContext.fireChannelRead(AbstractChannelHandlerContext.java:357) [netty-transport-4.1.73.Final.jar:4.1.73.Final] at io.netty.channel.DefaultChannelPipeline$HeadContext.channelRead(DefaultChannelPipeline.java:1410) [netty-transport-4.1.73.Final.jar:4.1.73.Final] at io.netty.channel.AbstractChannelHandlerContext.invokeChannelRead(AbstractChannelHandlerContext.java:379) [netty-transport-4.1.73.Final.jar:4.1.73.Final] at io.netty.channel.AbstractChannelHandlerContext.invokeChannelRead(AbstractChannelHandlerContext.java:365) [netty-transport-4.1.73.Final.jar:4.1.73.Final] at io.netty.channel.DefaultChannelPipeline.fireChannelRead(DefaultChannelPipeline.java:919) [netty-transport-4.1.73.Final.jar:4.1.73.Final] at io.netty.channel.epoll.AbstractEpollStreamChannel$EpollStreamUnsafe.epollInReady(AbstractEpollStreamChannel.java:795) [netty-transport-classes-epoll-4.1.73.Final.jar:4.1.73.Final] at io.netty.channel.epoll.EpollEventLoop.processReady(EpollEventLoop.java:480) [netty-transport-classes-epoll-4.1.73.Final.jar:4.1.73.Final] at io.netty.channel.epoll.EpollEventLoop.run(EpollEventLoop.java:378) [netty-transport-classes-epoll-4.1.73.Final.jar:4.1.73.Final] at io.netty.util.concurrent.SingleThreadEventExecutor$4.run(SingleThreadEventExecutor.java:986) [netty-common-4.1.73.Final.jar:4.1.73.Final] at io.netty.util.internal.ThreadExecutorMap$2.run(ThreadExecutorMap.java:74) [netty-common-4.1.73.Final.jar:4.1.73.Final] at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30) [netty-common-4.1.73.Final.jar:4.1.73.Final] at java.lang.Thread.run(Unknown Source) ```"),(0,l.kt)("p",null,"On the client side we can see that the Zeebe cluster seems to be unavailable."),(0,l.kt)("h3",{id:"camunda-cloud"},"Camunda Cloud"),(0,l.kt)("p",null,"We wanted to verify how Camunda Cloud and our standard Cluster plan (GA Hardware Plan) handles such a payload. But the result was the same."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"cc-general",src:a(9657).Z,width:"1835",height:"882"})),(0,l.kt)("p",null,"The processing stopped quite fast due to OOM of the gateway. We can see that operate is also not able to handle such load."),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"failed-op",src:a(7766).Z,width:"1866",height:"713"})),(0,l.kt)("p",null,"In our console overview we see that all services (exception Zeebe) went unhealthy"),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"console-healthy",src:a(3398).Z,width:"739",height:"733"})),(0,l.kt)("h3",{id:"result"},"Result"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},(0,l.kt)("em",{parentName:"p"},"Hypothesis: With a bigger payload size of e.g. 1 MB Zeebe, should be still able to handle process instances, maybe under a degraded performance but in general the availability must not suffer from such a payload size."))),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"We were not able to validate our hypothesis, which means our chaos experiment failed!")," \ud83d\udca5"),(0,l.kt)("h3",{id:"found-bugs"},"Found Bugs"),(0,l.kt)("p",null,"We opened the following bug issues:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Gateway can't handle bigger payload sizes ",(0,l.kt)("a",{parentName:"li",href:"https://github.com/camunda-cloud/zeebe/issues/8621"},"#8621"))),(0,l.kt)("h1",{id:"outtakes"},"Outtakes"),(0,l.kt)("p",null,"Interesting issues I run into when doing the chaos experiment, could be count as TIL events and mentioning them might help others."),(0,l.kt)("h2",{id:"message-pack-is-not-valid"},"Message pack is not valid"),(0,l.kt)("p",null,"When I first generated the JSON payload, it was an array on root level, which is not supported by Zeebe. "),(0,l.kt)("p",null,"I spent sometime to understand why I see no progress in processing. Taking a look at the gateway logs we can see:"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"\"Expected to handle gRPC request, but messagepack property was invalid: io.camunda.zeebe.msgpack.MsgpackPropertyException: Property 'variables' is invalid: Expected document to be a root level object, but was 'ARRAY'\"")),(0,l.kt)("p",null,"On the client side (if the logging is turned on, starter needs info logging) we see:"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"INVALID_ARGUMENT: Property 'variables' is invalid: Expected document to be a root level object, but was 'ARRAY'")),(0,l.kt)("h2",{id:"configure-the-starter-payload"},"Configure the Starter payload"),(0,l.kt)("p",null,"In order to use different JSON payload for the starter we support a configuration on the starter application (",(0,l.kt)("inlineCode",{parentName:"p"},"-Dapp.starter.payloadPath"),"). I had a lot of ",(0,l.kt)("em",{parentName:"p"},'"fun"')," to find out the right syntax:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},'-Dapp.starter.payloadPath="bpmn/small_payload.json" - ',(0,l.kt)("em",{parentName:"li"},"DOESN'T WORK")),(0,l.kt)("li",{parentName:"ul"},'-Dapp.starter.payloadPath="/bpmn/small_payload.json" - ',(0,l.kt)("em",{parentName:"li"},"DOESN'T WORK")),(0,l.kt)("li",{parentName:"ul"},"-Dapp.starter.payloadPath=/bpmn/small_payload.json - ",(0,l.kt)("em",{parentName:"li"},"DOESN'T WORK")),(0,l.kt)("li",{parentName:"ul"},"-Dapp.starter.payloadPath=bpmn/big_payload.json - ",(0,l.kt)("em",{parentName:"li"},"WORKS"))),(0,l.kt)("p",null,"So be aware don't use ",(0,l.kt)("inlineCode",{parentName:"p"},'"')," and no ",(0,l.kt)("inlineCode",{parentName:"p"},"/")," in front, otherwise you might get a ",(0,l.kt)("inlineCode",{parentName:"p"},'java.io.FileNotFoundException: "bpmn/small_payload.json" (No such file or directory)')," in your starter deployment and wonder why you see no progress."))}u.isMDXComponent=!0},8724:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/base-general-6f2d98f4e1437e7d6ccaeb9106e1ad4e.png"},8195:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/big-payload-increase-res-ccf66088a1363c2c7bbf3d10cd430c9e.png"},9526:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/big-payload-starter-gw-restarts-18e517c14c161d58190bd23b618b87cf.png"},9657:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/cc-general-bd2b9235be276f75cd8c485229bf9b44.png"},3398:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/console-healthy-23ed317bbe9dc53934403731fb72b55c.png"},7766:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/failed-operate-6cc764529ec07f8c422fb62e53289a02.png"},3749:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/small-payload-7275166d05a6c32e2a0e7d86125f3c44.png"}}]);