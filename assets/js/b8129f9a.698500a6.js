"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[3779],{3905:(e,t,a)=>{a.d(t,{Zo:()=>h,kt:()=>m});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=r.createContext({}),c=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},h=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,h=i(e,["components","mdxType","originalType","parentName"]),u=c(a),d=n,m=u["".concat(l,".").concat(d)]||u[d]||p[d]||o;return a?r.createElement(m,s(s({ref:t},h),{},{components:a})):r.createElement(m,s({ref:t},h))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,s=new Array(o);s[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:n,s[1]=i;for(var c=2;c<o;c++)s[c]=a[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},178:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=a(7462),n=(a(7294),a(3905));const o={layout:"posts",title:"High CPU load on Standalone Gateway",date:new Date("2020-06-11T00:00:00.000Z"),categories:["chaos_experiment","gateway"],authors:"zell"},s="Chaos Day Summary",i={permalink:"/zeebe-chaos/2020/06/11/high-cpu-gateway",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-06-11-high-cpu-gateway/index.md",source:"@site/blog/2020-06-11-high-cpu-gateway/index.md",title:"High CPU load on Standalone Gateway",description:"* Updated failure cases documentation for exporter based on review",date:"2020-06-11T00:00:00.000Z",formattedDate:"June 11, 2020",tags:[],readingTime:1.985,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"High CPU load on Standalone Gateway",date:"2020-06-11T00:00:00.000Z",categories:["chaos_experiment","gateway"],authors:"zell"},prevItem:{title:"Correlate Message after failover",permalink:"/zeebe-chaos/2020/06/18/correlate-message-after-failover"},nextItem:{title:"First Chaos Day!",permalink:"/zeebe-chaos/2020/06/04/first-chaos-day"}},l={authorsImageUrls:[void 0]},c=[{value:"Chaos experiment:",id:"chaos-experiment",level:2},{value:"What was unexpected or what we found out:",id:"what-was-unexpected-or-what-we-found-out",level:3},{value:"Participants",id:"participants",level:2}],h={toc:c},u="wrapper";function p(e){let{components:t,...o}=e;return(0,n.kt)(u,(0,r.Z)({},h,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Updated failure cases documentation for exporter based on review"),(0,n.kt)("li",{parentName:"ul"},"Documented failure cases for ZeebeDB"),(0,n.kt)("li",{parentName:"ul"},"Wrote an chaostoolkit experiment based on the last manual Chaos experiment"),(0,n.kt)("li",{parentName:"ul"},"Run a chaos experiment with @Deepthi, where we put high CPU load on the standalone gateway ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/zeebe-io/zeebe-chaos/issues/28"},"https://github.com/zeebe-io/zeebe-chaos/issues/28"))),(0,n.kt)("h2",{id:"chaos-experiment"},"Chaos experiment:"),(0,n.kt)("p",null,"We did today an chaos experiment where we used our standard setup with a baseline load of 100 workflow instance and 6 workers, which can activate 120 jobs max.\nOn our steady state we saw that we are able to start and complete 100 workflow instances in a second. One instance took 1 - 2.5 seconds."),(0,n.kt)("p",null,"We expected when we introduce stress on the standalone gateway CPU that the latency of the processing goes up and the throughput goes down, but there should be no cluster wide failures happening. We expected that after removing the stress the system should come back to normal and the baseline should be reached again."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"/assets/2020-06-11/gw-stress-proc",src:a(8717).Z,width:"1827",height:"612"}),"\n",(0,n.kt)("img",{alt:"/assets/2020-06-11/gw-cpu",src:a(8597).Z,width:"918",height:"309"}),"\n",(0,n.kt)("img",{alt:"/assets/2020-06-11/gw-stress-proc-latency",src:a(2903).Z,width:"1833",height:"880"})),(0,n.kt)("p",null,"The results look promising. We have seen no outage.\nWe tested it twice and saw that the throughput goes down and latency up on stress, but comes back to normal after removing it."),(0,n.kt)("h3",{id:"what-was-unexpected-or-what-we-found-out"},"What was unexpected or what we found out:"),(0,n.kt)("p",null,"Unexpected was that our Broker back pressure goes up, which means it drops requests during the stress time. This was not expected, since the latency between writing to dispatcher and processing the event should not change. We probably need to investigate this more. Current assumption is that the gateway sends requests in batches and this causes in higher spikes on the back pressure. We need more metrics on the transport module to verify that. There is already an open issue for that ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe/issues/4487"},"https://github.com/zeebe-io/zeebe/issues/4487")," We might need to tackle this, before we can find out more here."),(0,n.kt)("p",null,"We found out that the standalone gateway is not resource limited, which caused that we used at some point 12 CPU cores. It seems there is also an open issue for that on the helm charts ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-cluster-helm/issues/74"},"https://github.com/zeebe-io/zeebe-cluster-helm/issues/74")),(0,n.kt)("p",null,"We want to improve on our current chaos toolkit test. We want to introduce failures and verify the steady state during the failure is happening, on rollback we should remove the failure again. We currently just verify that we can recover, but not the behavior during a failure, which might be also interesting."),(0,n.kt)("h2",{id:"participants"},"Participants"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"@deepthidevaki"),(0,n.kt)("li",{parentName:"ul"},"@zelldon")))}p.isMDXComponent=!0},8597:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/gw-cpu-4fb1a8297395d890b879ce25f6d82433.png"},2903:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/gw-stress-proc-latency-7f90a7904267f553730c5b85ceac779a.png"},8717:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/gw-stress-proc-10e34653c245822fd9bdc216e82b87fa.png"}}]);