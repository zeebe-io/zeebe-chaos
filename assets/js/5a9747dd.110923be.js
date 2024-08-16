"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[634],{8680:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>h,contentTitle:()=>r,default:()=>l,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var s=o(74848),n=o(28453);const a={layout:"posts",title:"Throughput on big state",date:new Date("2021-10-29T00:00:00.000Z"),categories:["chaos_experiment","bpmn","processing"],tags:["performance"],authors:"zell"},r="Chaos Day Summary",i={permalink:"/zeebe-chaos/2021/10/29/Throughput-on-big-state",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-10-29-Throughput-on-big-state/index.md",source:"@site/blog/2021-10-29-Throughput-on-big-state/index.md",title:"Throughput on big state",description:"In this chaos day we wanted to prove the hypothesis that the throughput should not significantly change even if we have bigger state, see zeebe-chaos#64",date:"2021-10-29T00:00:00.000Z",tags:[{inline:!0,label:"performance",permalink:"/zeebe-chaos/tags/performance"}],readingTime:3.145,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell",page:null}],frontMatter:{layout:"posts",title:"Throughput on big state",date:"2021-10-29T00:00:00.000Z",categories:["chaos_experiment","bpmn","processing"],tags:["performance"],authors:"zell"},unlisted:!1,prevItem:{title:"Not produce duplicate Keys",permalink:"/zeebe-chaos/2021/11/11/Not-produce-duplicate-Keys"},nextItem:{title:"Recovery (Fail Over) time",permalink:"/zeebe-chaos/2021/10/05/recovery-time"}},h={authorsImageUrls:[void 0]},c=[];function u(e){const t={a:"a",p:"p",strong:"strong",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["In this chaos day we wanted to prove the hypothesis that the throughput should not significantly change even if we have bigger state, see ",(0,s.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/issues/64",children:"zeebe-chaos#64"})]}),"\n",(0,s.jsxs)(t.p,{children:["This came up due observations from the ",(0,s.jsx)(t.a,{href:"/zeebe-chaos/2021/10/05/recovery-time",children:"last chaos day"}),". We already had a bigger investigation here ",(0,s.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/7955",children:"zeebe#7955"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"TL;DR;"})," We were not able to prove the hypothesis. Bigger state, more than 100k+ process instances in the state, seems to have an big impact on the processing throughput."]})]})}function l(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},28453:(e,t,o)=>{o.d(t,{R:()=>r,x:()=>i});var s=o(96540);const n={},a=s.createContext(n);function r(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);