"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[9406],{43775:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>c,toc:()=>h});var r=o(74848),n=o(28453);const a={layout:"posts",title:"Worker count should not impact performance",date:new Date("2021-11-24T00:00:00.000Z"),categories:["chaos_experiment","bpmn","performance"],tags:["performance"],authors:"zell"},s="Chaos Day Summary",c={permalink:"/zeebe-chaos/2021/11/24/Worker-count-should-not-impact-performance",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-11-24-Worker-count-should-not-impact-performance/index.md",source:"@site/blog/2021-11-24-Worker-count-should-not-impact-performance/index.md",title:"Worker count should not impact performance",description:"In this chaos day we experimented with the worker count, since we saw recently that it might affect the performance (throughput) negatively if there are more workers deployed. This is related to #7955 and #8244.",date:"2021-11-24T00:00:00.000Z",tags:[{inline:!0,label:"performance",permalink:"/zeebe-chaos/tags/performance"}],readingTime:2.5,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",page:{permalink:"/zeebe-chaos/authors/zell"},imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Worker count should not impact performance",date:"2021-11-24T00:00:00.000Z",categories:["chaos_experiment","bpmn","performance"],tags:["performance"],authors:"zell"},unlisted:!1,prevItem:{title:"Handling of Big Variables",permalink:"/zeebe-chaos/2022/01/19/big-variables"},nextItem:{title:"Not produce duplicate Keys",permalink:"/zeebe-chaos/2021/11/11/Not-produce-duplicate-Keys"}},i={authorsImageUrls:[void 0]},h=[];function l(e){const t={a:"a",p:"p",strong:"strong",...(0,n.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["In this chaos day we experimented with the worker count, since we saw recently that it might affect the performance (throughput) negatively if there are more workers deployed. This is related to ",(0,r.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/7955",children:"#7955"})," and ",(0,r.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/8244",children:"#8244"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"We wanted to prove, that even if we have more workers deployed the throughput of the process instance execution should not have an negative impact."}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"TL;DR;"})," We were not able to prove our hypothesis. Scaling of workers can have a negative impact on performance. Check out the ",(0,r.jsx)(t.a,{href:"#third-chaos-experiment",children:"third chaos experiment"}),"."]})]})}function p(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},28453:(e,t,o)=>{o.d(t,{R:()=>s,x:()=>c});var r=o(96540);const n={},a=r.createContext(n);function s(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);