"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[1030],{367:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var o=n(85893),a=n(11151);const i={layout:"posts",title:"Reducing the job activation delay",date:new Date("2024-01-19T00:00:00.000Z"),categories:["performance","bpmn"],tags:["availability"],authors:"nicolas"},s="Reducing the job activation delay",c={permalink:"/zeebe-chaos/2024/01/19/Job-Activation-Latency",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2024-01-19-Job-Activation-Latency/index.md",source:"@site/blog/2024-01-19-Job-Activation-Latency/index.md",title:"Reducing the job activation delay",description:"With the addition of end-to-end job streaming capabilities in Zeebe, we wanted to measure the improvements in job activation latency:",date:"2024-01-19T00:00:00.000Z",formattedDate:"January 19, 2024",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:11.045,hasTruncateMarker:!0,authors:[{name:"Nicolas Pepin-Perreault",title:"Senior Software Engineer @ Zeebe",url:"https://github.com/npepinpe",imageURL:"https://github.com/npepinpe.png",key:"nicolas"}],frontMatter:{layout:"posts",title:"Reducing the job activation delay",date:"2024-01-19T00:00:00.000Z",categories:["performance","bpmn"],tags:["availability"],authors:"nicolas"},unlisted:!1,prevItem:{title:"Using flow control to handle uncontrolled process loops",permalink:"/zeebe-chaos/2024/07/25/Using-flow-control-to-handle-uncontrolled-process-loops"},nextItem:{title:"Broker Scaling and Performance",permalink:"/zeebe-chaos/2023/12/20/Broker-scaling-performance"}},r={authorsImageUrls:[void 0]},l=[];function d(e){const t={a:"a",li:"li",p:"p",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.p,{children:"With the addition of end-to-end job streaming capabilities in Zeebe, we wanted to measure the improvements in job activation latency:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"How much is a single job activation latency reduced?"}),"\n",(0,o.jsx)(t.li,{children:"How much is the activation latency reduced between each task of the same process instance?"}),"\n",(0,o.jsx)(t.li,{children:"How much is the activation latency reduced on large clusters with a high broker and partition count?"}),"\n"]}),"\n",(0,o.jsx)(t.p,{children:"Additionally, we wanted to guarantee that every component involved in streaming, including clients, would remain resilient in the face of load surges."}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:"TL;DR;"})," Job activation latency is greatly reduced, with task based workloads seeing up to 50% reduced overall execution latency. Completing a task now immediately triggers pushing out the next one, meaning the latency to activate the next task in a sequence is bounded by how much time it takes to process its completion in Zeebe. Activation latency is unaffected by how many partitions or brokers there in a cluster, as opposed to job polling, thus ensuring scalability of the system. Finally, reuse of gRPC's flow control mechanism ensure clients cannot be overloaded even in the face of load surges, without impacting other workloads in the cluster."]}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.a,{href:"https://docs.camunda.io/docs/components/concepts/job-workers/#job-streaming",children:"Head over to the documentation to learn how to start using job push!"})})]})}function h(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>c,a:()=>s});var o=n(67294);const a={},i=o.createContext(a);function s(e){const t=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),o.createElement(i.Provider,{value:t},e.children)}}}]);