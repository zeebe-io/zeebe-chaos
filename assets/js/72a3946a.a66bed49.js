"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[1412],{29871:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>h,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var a=s(74848),n=s(28453);const i={layout:"posts",title:"Time travel Experiment",date:new Date("2021-05-25T00:00:00.000Z"),categories:["chaos_experiment","broker","time"],tags:["data"],authors:"zell"},o="Chaos Day Summary",r={permalink:"/zeebe-chaos/2021/05/25/Reset-Clock",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-05-25-Reset-Clock/index.md",source:"@site/blog/2021-05-25-Reset-Clock/index.md",title:"Time travel Experiment",description:"Recently we run a Game day where a lot of messages with high TTL have been stored in the state. This was based on an earlier incident, which we had seen in production. One suggested approach to resolve that incident was to increase the time, such that all messages are removed from the state. This and the fact that summer and winter time shifts can cause in other systems evil bugs, we wanted to find out how our system can handle time shifts. Phil joined me as participant and observer. There was a related issue which covers this topic as well, zeebe-chaos#3.",date:"2021-05-25T00:00:00.000Z",tags:[{inline:!0,label:"data",permalink:"/zeebe-chaos/tags/data"}],readingTime:8.205,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell",page:null}],frontMatter:{layout:"posts",title:"Time travel Experiment",date:"2021-05-25T00:00:00.000Z",categories:["chaos_experiment","broker","time"],tags:["data"],authors:"zell"},unlisted:!1,prevItem:{title:"Full Disk Recovery",permalink:"/zeebe-chaos/2021/06/08/Full-Disk"},nextItem:{title:"Corrupted Snapshot Experiment Investigation",permalink:"/zeebe-chaos/2021/04/29/Corrupted-Snapshot"}},h={authorsImageUrls:[void 0]},c=[];function l(e){const t={a:"a",p:"p",strong:"strong",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:"https://confluence.camunda.com/display/ZEEBE/Game+Day+18.05.2021",children:"Recently we run a Game day"})," where a lot of messages with high TTL have been stored in the state. This was based on an earlier incident, which we had seen in production. One suggested approach to resolve that incident was to increase the time, such that all messages are removed from the state. This and the fact that summer and winter time shifts can cause in other systems evil bugs, we wanted to find out how our system can handle time shifts. ",(0,a.jsx)(t.a,{href:"https://github.com/saig0",children:"Phil"})," joined me as participant and observer. There was a related issue which covers this topic as well, ",(0,a.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/issues/3",children:"zeebe-chaos#3"}),"."]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"TL;DR;"})," Zeebe is able to handle time shifts back and forth, without observable issues. Operate seems to dislike it."]})]})}function d(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},28453:(e,t,s)=>{s.d(t,{R:()=>o,x:()=>r});var a=s(96540);const n={},i=a.createContext(n);function o(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),a.createElement(i.Provider,{value:t},e.children)}}}]);