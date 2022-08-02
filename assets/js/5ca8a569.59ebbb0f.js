"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[764],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),c=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,h=d["".concat(i,".").concat(m)]||d[m]||u[m]||o;return n?a.createElement(h,l(l({ref:t},p),{},{components:n})):a.createElement(h,l({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var c=2;c<o;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9248:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return i},metadata:function(){return c},assets:function(){return p},toc:function(){return u},default:function(){return m}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),l=["components"],s={layout:"posts",title:"Play around with ToxiProxy",date:new Date("2020-10-06T00:00:00.000Z"),categories:["chaos_experiment","toxiProxy"],tags:["tools"],authors:"zell"},i="Chaos Day Summary",c={permalink:"/zeebe-chaos/2020/10/06/toxi-proxy",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-10-06-toxi-proxy/index.md",source:"@site/blog/2020-10-06-toxi-proxy/index.md",title:"Play around with ToxiProxy",description:"First chaos day since my parental leave.",date:"2020-10-06T00:00:00.000Z",formattedDate:"October 6, 2020",tags:[{label:"tools",permalink:"/zeebe-chaos/tags/tools"}],readingTime:3.275,truncated:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],prevItem:{title:"Multiple Leader Changes",permalink:"/zeebe-chaos/2020/10/13/multiple-leader-changes"},nextItem:{title:"Experiment with Camunda Cloud",permalink:"/zeebe-chaos/2020/08/20/experiment-with-camunda-cloud"}},p={authorsImageUrls:[void 0]},u=[{value:"Run ToxiProxy",id:"run-toxiproxy",children:[{value:"Slice packages",id:"slice-packages",children:[]}]},{value:"Chaos Experiment",id:"chaos-experiment",children:[{value:"No Leader change on high load",id:"no-leader-change-on-high-load",children:[]},{value:"Time reset",id:"time-reset",children:[]}]},{value:"Participants",id:"participants",children:[]}],d={toc:u};function m(e){var t=e.components,n=(0,r.Z)(e,l);return(0,o.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"First chaos day since my parental leave \ud83c\udf89."),(0,o.kt)("p",null,"Today I wanted to play a bit with ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Shopify/toxiproxy"},"ToxiProxy"),". Toxiproxy is a framework for simulating network conditions and ideal to do some chaos on the network."),(0,o.kt)("h2",{id:"run-toxiproxy"},"Run ToxiProxy"),(0,o.kt)("p",null,"Download from the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Shopify/toxiproxy/releases"},"release page")," the latest version (server and cli)."),(0,o.kt)("p",null,"Start a broker via docker."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"docker pull camunda/zeebe:SNAPSHOT\ndocker run -p 26500:26500 camunda/zeebe:SNAPSHOT\n")),(0,o.kt)("p",null,"Start the toxi proxy server."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"./toxiproxy-server-linux-amd64 start\n")),(0,o.kt)("p",null,"Create a proxy for zeebe"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"./toxiproxy-cli-linux-amd64 create zeebe-proxy -l localhost:26379 -u localhost:26500\nCreated new proxy zeebe-proxy\n")),(0,o.kt)("p",null,"You should see something in the toxy proxy server log:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"INFO[0031] Started proxy                                 name=zeebe-proxy proxy=127.0.0.1:26379 upstream=localhost:26500\n")),(0,o.kt)("p",null,"Try zbctl to request the topology."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"./zbctl --address localhost:26379 status --insecure\n\nCluster size: 1\nPartitions count: 1\nReplication factor: 1\nGateway version: 0.25.0-SNAPSHOT\nBrokers:\n  Broker 0 - 172.17.0.2:26501\n    Version: 0.25.0-SNAPSHOT\n    Partition 1 : Leader\n")),(0,o.kt)("p",null,"In the toxy proxy server log it should be shown as:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"INFO[0149] Accepted client                               client=127.0.0.1:41510 name=zeebe-proxy proxy=127.0.0.1:26379 upstream=localhost:26500\nWARN[0149] Source terminated                             bytes=245 err=read tcp 127.0.0.1:56178->127.0.0.1:26500: use of closed network connection name=zeebe-proxy\n")),(0,o.kt)("p",null,"Add latency to requests"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"$ ./toxiproxy-cli-linux-amd64 toxic add -t latency -a latency=5000 zeebe-proxy\nAdded downstream latency toxic 'latency_downstream' on proxy 'zeebe-proxy'\n")),(0,o.kt)("p",null,"Running zbctl again:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"}," ./zbctl --address localhost:26379 status --insecure\nError: rpc error: code = DeadlineExceeded desc = context deadline exceeded\n")),(0,o.kt)("p",null,"Updating existing toxy:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"./toxiproxy-cli-linux-amd64 toxic update -n latency_downstream -t latency -a latency=500 zeebe-proxy\n")),(0,o.kt)("p",null,"Running zbctl again:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"time ./zbctl --address localhost:26379 status --insecure\nCluster size: 1\nPartitions count: 1\nReplication factor: 1\nGateway version: 0.25.0-SNAPSHOT\nBrokers:\n  Broker 0 - 172.17.0.2:26501\n    Version: 0.25.0-SNAPSHOT\n    Partition 1 : Leader\n\nreal    0m1.045s\nuser    0m0.012s\nsys 0m0.021s\n\n")),(0,o.kt)("p",null,"Inspect existing toxics:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"$ ./toxiproxy-cli-linux-amd64 inspect zeebe-proxy\nName: zeebe-proxy   Listen: 127.0.0.1:26379 Upstream: localhost:26500\n======================================================================\nUpstream toxics:\nProxy has no Upstream toxics enabled.\n\nDownstream toxics:\nlatency_downstream: type=latency    stream=downstream   toxicity=1.00   attributes=[    jitter=0    latency=500 ]\n\n")),(0,o.kt)("p",null,"With toxicity we can change whether it should be applied on all requests or only on some. It is possible to add the latency instead of downstream to upstream. There also other things we can inject, like slicing and delaying packages, dropping packages and limiting the bandwith."),(0,o.kt)("p",null,"Possible new experiments:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"introduce latency between one follower and leader - if only one follower experience delays we expect that no election is started"),(0,o.kt)("li",{parentName:"ul"},"introduce latency betweem gw and broker - see whether command timeout"),(0,o.kt)("li",{parentName:"ul"},"slice packages - drop packages, but not every packages - expect that command is send correctly since requests are retried")),(0,o.kt)("h3",{id:"slice-packages"},"Slice packages"),(0,o.kt)("p",null,"Slices packages after 128 bytes:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"./toxiproxy-cli-linux-amd64 toxic add zeebe-proxy -t slicer -a average_size=128\n")),(0,o.kt)("p",null,"Publish message seem to work:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'$ time ./zbctl --address localhost:26379 publish message failing --insecure --correlationKey key --variables "{}"\n{\n  "key": 2251799813685253\n}\n')),(0,o.kt)("p",null,"After limiting it to 32 bytes:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"$ ./toxiproxy-cli-linux-amd64 toxic update -n slicer_downstream -a average_size=32 zeebe-proxy\nUpdated toxic 'slicer_downstream' on proxy 'zeebe-proxy'\n")),(0,o.kt)("p",null,"The publish message seem to not work as expected."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},'$ time ./zbctl --address localhost:26379 publish message failing --insecure --correlationKey key --variables "{}"\nnull\n\nreal    0m0.039s\nuser    0m0.007s\nsys 0m0.023s\n')),(0,o.kt)("p",null,"Actually I would expect here an error instead of just returning null."),(0,o.kt)("h2",{id:"chaos-experiment"},"Chaos Experiment"),(0,o.kt)("h3",{id:"no-leader-change-on-high-load"},"No Leader change on high load"),(0,o.kt)("p",null," Peter volunteered for automating a new chaos experiment, where we put high load on a broker and expect that we have no leader change. This was previous an issue, since the leaders were not able to send heartbeats in time. Related issue #7."),(0,o.kt)("h3",{id:"time-reset"},"Time reset"),(0,o.kt)("p",null,"I wanted to work on the clock reset ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/issues/3"},"#3"),".\nThis seems to be not easily possible in kubernetes or at least with our current images, since we need for that root privilges."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"root@zell-time-reset-zeebe-0:/usr/local/zeebe# date -s $(date +%Y-%m-%dT%H:%M:%S)\ndate: cannot set date: Operation not permitted\nTue Oct  6 11:51:19 UTC 2020\n")),(0,o.kt)("p",null,"It seems that chaos mesh supports something like that for kubernetes maybe worth to look at\n",(0,o.kt)("a",{parentName:"p",href:"https://pingcap.com/blog/simulating-clock-skew-in-k8s-without-affecting-other-containers-on-node"},"https://pingcap.com/blog/simulating-clock-skew-in-k8s-without-affecting-other-containers-on-node")),(0,o.kt)("h2",{id:"participants"},"Participants"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"@pihme"),(0,o.kt)("li",{parentName:"ul"},"@zelldon")))}m.isMDXComponent=!0}}]);