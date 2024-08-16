"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[4387],{91646:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>h,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var a=s(74848),n=s(28453);const o={layout:"posts",title:"High CPU load on Standalone Gateway",date:new Date("2020-06-11T00:00:00.000Z"),categories:["chaos_experiment","gateway"],authors:"zell"},i="Chaos Day Summary",r={permalink:"/zeebe-chaos/2020/06/11/high-cpu-gateway",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-06-11-high-cpu-gateway/index.md",source:"@site/blog/2020-06-11-high-cpu-gateway/index.md",title:"High CPU load on Standalone Gateway",description:"* Updated failure cases documentation for exporter based on review",date:"2020-06-11T00:00:00.000Z",tags:[],readingTime:1.985,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",page:{permalink:"/zeebe-chaos/authors/zell"},imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"High CPU load on Standalone Gateway",date:"2020-06-11T00:00:00.000Z",categories:["chaos_experiment","gateway"],authors:"zell"},unlisted:!1,prevItem:{title:"Correlate Message after failover",permalink:"/zeebe-chaos/2020/06/18/correlate-message-after-failover"},nextItem:{title:"First Chaos Day!",permalink:"/zeebe-chaos/2020/06/04/first-chaos-day"}},h={authorsImageUrls:[void 0]},c=[{value:"Chaos experiment:",id:"chaos-experiment",level:2},{value:"What was unexpected or what we found out:",id:"what-was-unexpected-or-what-we-found-out",level:3},{value:"Participants",id:"participants",level:2}];function l(e){const t={a:"a",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",ul:"ul",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Updated failure cases documentation for exporter based on review"}),"\n",(0,a.jsx)(t.li,{children:"Documented failure cases for ZeebeDB"}),"\n",(0,a.jsx)(t.li,{children:"Wrote an chaostoolkit experiment based on the last manual Chaos experiment"}),"\n",(0,a.jsxs)(t.li,{children:["Run a chaos experiment with @Deepthi, where we put high CPU load on the standalone gateway ",(0,a.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/issues/28",children:"https://github.com/zeebe-io/zeebe-chaos/issues/28"})]}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"chaos-experiment",children:"Chaos experiment:"}),"\n",(0,a.jsx)(t.p,{children:"We did today an chaos experiment where we used our standard setup with a baseline load of 100 workflow instance and 6 workers, which can activate 120 jobs max.\nOn our steady state we saw that we are able to start and complete 100 workflow instances in a second. One instance took 1 - 2.5 seconds."}),"\n",(0,a.jsx)(t.p,{children:"We expected when we introduce stress on the standalone gateway CPU that the latency of the processing goes up and the throughput goes down, but there should be no cluster wide failures happening. We expected that after removing the stress the system should come back to normal and the baseline should be reached again."}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.img,{alt:"/assets/2020-06-11/gw-stress-proc",src:s(62892).A+"",width:"1827",height:"612"}),"\n",(0,a.jsx)(t.img,{alt:"/assets/2020-06-11/gw-cpu",src:s(15087).A+"",width:"918",height:"309"}),"\n",(0,a.jsx)(t.img,{alt:"/assets/2020-06-11/gw-stress-proc-latency",src:s(43189).A+"",width:"1833",height:"880"})]}),"\n",(0,a.jsx)(t.p,{children:"The results look promising. We have seen no outage.\nWe tested it twice and saw that the throughput goes down and latency up on stress, but comes back to normal after removing it."}),"\n",(0,a.jsx)(t.h3,{id:"what-was-unexpected-or-what-we-found-out",children:"What was unexpected or what we found out:"}),"\n",(0,a.jsxs)(t.p,{children:["Unexpected was that our Broker back pressure goes up, which means it drops requests during the stress time. This was not expected, since the latency between writing to dispatcher and processing the event should not change. We probably need to investigate this more. Current assumption is that the gateway sends requests in batches and this causes in higher spikes on the back pressure. We need more metrics on the transport module to verify that. There is already an open issue for that ",(0,a.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe/issues/4487",children:"https://github.com/zeebe-io/zeebe/issues/4487"})," We might need to tackle this, before we can find out more here."]}),"\n",(0,a.jsxs)(t.p,{children:["We found out that the standalone gateway is not resource limited, which caused that we used at some point 12 CPU cores. It seems there is also an open issue for that on the helm charts ",(0,a.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-cluster-helm/issues/74",children:"https://github.com/zeebe-io/zeebe-cluster-helm/issues/74"})]}),"\n",(0,a.jsx)(t.p,{children:"We want to improve on our current chaos toolkit test. We want to introduce failures and verify the steady state during the failure is happening, on rollback we should remove the failure again. We currently just verify that we can recover, but not the behavior during a failure, which might be also interesting."}),"\n",(0,a.jsx)(t.h2,{id:"participants",children:"Participants"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"@deepthidevaki"}),"\n",(0,a.jsx)(t.li,{children:"@zelldon"}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},15087:(e,t,s)=>{s.d(t,{A:()=>a});const a=s.p+"assets/images/gw-cpu-4fb1a8297395d890b879ce25f6d82433.png"},43189:(e,t,s)=>{s.d(t,{A:()=>a});const a=s.p+"assets/images/gw-stress-proc-latency-7f90a7904267f553730c5b85ceac779a.png"},62892:(e,t,s)=>{s.d(t,{A:()=>a});const a=s.p+"assets/images/gw-stress-proc-10e34653c245822fd9bdc216e82b87fa.png"},28453:(e,t,s)=>{s.d(t,{R:()=>i,x:()=>r});var a=s(96540);const n={},o=a.createContext(n);function i(e){const t=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),a.createElement(o.Provider,{value:t},e.children)}}}]);