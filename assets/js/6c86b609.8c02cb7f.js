"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[1997],{29504:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>n,metadata:()=>r,toc:()=>c});var i=a(74848),s=a(28453);const n={layout:"posts",title:"Message Correlation after Failover",date:new Date("2020-11-24T00:00:00.000Z"),categories:["chaos_experiment","broker","bpmn"],tags:["availability"],authors:"zell"},o="Chaos Day Summary",r={permalink:"/zeebe-chaos/2020/11/24/message-correlation-after-failover",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-11-24-message-correlation-after-failover/index.md",source:"@site/blog/2020-11-24-message-correlation-after-failover/index.md",title:"Message Correlation after Failover",description:"Today I wanted to finally implement an experiment which I postponed for long time, see #24.",date:"2020-11-24T00:00:00.000Z",tags:[{inline:!0,label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:3.38,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell",page:null}],frontMatter:{layout:"posts",title:"Message Correlation after Failover",date:"2020-11-24T00:00:00.000Z",categories:["chaos_experiment","broker","bpmn"],tags:["availability"],authors:"zell"},unlisted:!1,prevItem:{title:"Disconnect Leader and one Follower",permalink:"/zeebe-chaos/2021/01/07/disconnect-leader-and-follower"},nextItem:{title:"Many Job Timeouts",permalink:"/zeebe-chaos/2020/11/11/job-timeouts"}},l={authorsImageUrls:[void 0]},c=[{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Hypothesis",id:"hypothesis",level:3},{value:"Actual",id:"actual",level:3},{value:"Implementation",id:"implementation",level:4},{value:"Result",id:"result",level:4},{value:"New Issues",id:"new-issues",level:2},{value:"Participants",id:"participants",level:2}];function h(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(t.p,{children:["Today I wanted to finally implement an experiment which I postponed for long time, see ",(0,i.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/issues/24",children:"#24"}),".\nThe problem was that previous we were not able to determine on which partition the message was published, so we were not able to assert that it was published on the correct partition. With this ",(0,i.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe/issues/4794",children:"#4794"})," it is now possible, which was btw an community contribution. ","\ud83c\udf89"]}),"\n",(0,i.jsx)(t.h2,{id:"chaos-experiment",children:"Chaos Experiment"}),"\n",(0,i.jsx)(t.p,{children:"We want to publish a message to a specific partition. After publishing the message we want to restart the corresponding leader of that partition, deploy and create a workflow instance to which the message should correlate to."}),"\n",(0,i.jsx)(t.h3,{id:"hypothesis",children:"Hypothesis"}),"\n",(0,i.jsx)(t.p,{children:"We expect that even due to a leader change messages can be correlated to a workflow instance, after a new leader comes up for that partition."}),"\n",(0,i.jsx)(t.h3,{id:"actual",children:"Actual"}),"\n",(0,i.jsx)(t.h4,{id:"implementation",children:"Implementation"}),"\n",(0,i.jsxs)(t.p,{children:["The experiment should ideally work on all cluster plans, since we run the chaos experiments now with all existing cluster plans. For that we want to publish the message on partition one. In Zeebe the messages are distributed over the partitions via the correlation key. Our current cluster plans have 1, 4 or 8 partitions. In order to always reach the same partition we need a correlation key which is modulo the partition count always the same number. Ideally it is just one character, which makes the calculation easier. If we take a look at the ASCII table we see that for example ",(0,i.jsx)(t.code,{children:"48 mod 1, 4 or 8"})," is always ",(0,i.jsx)(t.code,{children:"0"}),'. This would correspond then to partition one, since in the partition calculation we add 1. If we use "0" as correlation key we can be sure this will end up in the production clusters on partition one. For more information about the calculate you can check the ',(0,i.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe/blob/develop/protocol-impl/src/main/java/io/zeebe/protocol/impl/SubscriptionUtil.java",children:"SubscriptionUtil"})," class."]}),"\n",(0,i.jsx)(t.p,{children:"The process is quite simple, we just have one intermediate message catch event and we will create an new instance and await the result. With that we make sure that the message was correlated correctly."}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"oneReceiveMsgEvent",src:a(70024).A+"",width:"723",height:"144"})}),"\n",(0,i.jsxs)(t.p,{children:["On testing the separate scripts I had at the begining problems with the ",(0,i.jsx)(t.code,{children:"awaitResult"}),". I got always timeouts."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-sh",children:"Error: rpc error: code = DeadlineExceeded desc = Time out between gateway and broker: Request type command-api-4 timed out in 8999 milliseconds\ncommand terminated with exit code 1\n+ echo 'Failed to execute: '\\''awaitInstance'\\''. Retry.'\n"})}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"operate",src:a(66016).A+"",width:"2151",height:"866"})}),"\n",(0,i.jsxs)(t.p,{children:["Via operate nor via zbctl it is easy to find out what is the real issue. I'm not able to see any details regarding the intermediate message catch event in operate. With help of ",(0,i.jsx)(t.a,{href:"https://github.com/Zelldon/zdb",children:"zdb"})," I was able to track down the issue. The time to live was to small. The published messages have been already deleted before I created the corresponding workflow instancs. Per default the time to live is ",(0,i.jsx)(t.code,{children:"5s"})," with ",(0,i.jsx)(t.code,{children:"zbctl"}),". It is not easy to find out why the message doesn't correlate. After setting the ",(0,i.jsx)(t.code,{children:"ttl"})," quite high it works and I can run my experiment successfully."]}),"\n",(0,i.jsx)(t.h4,{id:"result",children:"Result"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-sh",children:"$ chaos run production-m/msg-correlation/experiment.json \n[2020-11-24 14:56:28 INFO] Validating the experiment's syntax\n[2020-11-24 14:56:28 INFO] Experiment looks valid\n[2020-11-24 14:56:28 INFO] Running experiment: Zeebe message correlation experiment\n[2020-11-24 14:56:28 INFO] Steady-state strategy: default\n[2020-11-24 14:56:28 INFO] Rollbacks strategy: default\n[2020-11-24 14:56:28 INFO] Steady state hypothesis: Zeebe is alive\n[2020-11-24 14:56:28 INFO] Probe: All pods should be ready\n[2020-11-24 14:56:28 INFO] Steady state hypothesis is met!\n[2020-11-24 14:56:28 INFO] Playing your experiment's method now...\n[2020-11-24 14:56:28 INFO] Action: Publish message to partition one\n[2020-11-24 14:56:29 INFO] Action: Terminate leader of partition 1 non-gracefully\n[2020-11-24 14:56:34 INFO] Probe: Should be able to create a workflow and await the message correlation\n[2020-11-24 14:56:39 INFO] Steady state hypothesis: Zeebe is alive\n[2020-11-24 14:56:39 INFO] Probe: All pods should be ready\n[2020-11-24 14:57:16 INFO] Steady state hypothesis is met!\n[2020-11-24 14:57:16 INFO] Let's rollback...\n[2020-11-24 14:57:16 INFO] No declared rollbacks, let's move on.\n[2020-11-24 14:57:16 INFO] Experiment ended with status: completed\n"})}),"\n",(0,i.jsx)(t.p,{children:"Experiment added to all cluster plans:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/commit/adeab53915e12b4a76fd4d49bb359684619b117f",children:"https://github.com/zeebe-io/zeebe-chaos/commit/adeab53915e12b4a76fd4d49bb359684619b117f"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/commit/93daf11864fdd851267dae67fdfc31e0ea78b407",children:"https://github.com/zeebe-io/zeebe-chaos/commit/93daf11864fdd851267dae67fdfc31e0ea78b407"})}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"new-issues",children:"New Issues"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["Operate: Show details of an intermediate catch event ",(0,i.jsx)(t.a,{href:"https://jira.camunda.com/browse/OPE-1165",children:"OPE-1165"})]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"participants",children:"Participants"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"@zelldon"}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},70024:(e,t,a)=>{a.d(t,{A:()=>i});const i=a.p+"assets/images/oneReceiveMsgEvent-2795ef3f34dd852761d225085a683cf3.png"},66016:(e,t,a)=>{a.d(t,{A:()=>i});const i=a.p+"assets/images/operate-bd2d8997ed8f19c2f1e3c0364ffc01f8.png"},28453:(e,t,a)=>{a.d(t,{R:()=>o,x:()=>r});var i=a(96540);const s={},n=i.createContext(s);function o(e){const t=i.useContext(n);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(n.Provider,{value:t},e.children)}}}]);