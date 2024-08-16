"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[2788],{12604:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var a=n(74848),s=n(28453);const i={layout:"posts",title:"Dynamic Scaling with Dataloss",date:new Date("2023-12-19T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["availability"],authors:"lena"},o="Chaos Day Summary",r={permalink:"/zeebe-chaos/2023/12/19/Dynamic-Scaling-with-Dataloss",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2023-12-19-Dynamic-Scaling-with-Dataloss/index.md",source:"@site/blog/2023-12-19-Dynamic-Scaling-with-Dataloss/index.md",title:"Dynamic Scaling with Dataloss",description:"We continue our previous experiments with dynamically scaling by now also testing whether",date:"2023-12-19T00:00:00.000Z",tags:[{inline:!0,label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:4.425,hasTruncateMarker:!0,authors:[{name:"Lena Sch\xf6nburg",title:"Senior Software Engineer @ Zeebe",url:"https://github.com/lenaschoenburg",imageURL:"https://github.com/lenaschoenburg.png",key:"lena",page:null}],frontMatter:{layout:"posts",title:"Dynamic Scaling with Dataloss",date:"2023-12-19T00:00:00.000Z",categories:["chaos_experiment","bpmn"],tags:["availability"],authors:"lena"},unlisted:!1,prevItem:{title:"Broker Scaling and Performance",permalink:"/zeebe-chaos/2023/12/20/Broker-scaling-performance"},nextItem:{title:"Dynamically scaling brokers",permalink:"/zeebe-chaos/2023/12/18/Dynamically-scaling-brokers"}},l={authorsImageUrls:[void 0]},c=[];function h(e){const t={a:"a",p:"p",strong:"strong",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["We continue our ",(0,a.jsx)(t.a,{href:"/zeebe-chaos/2023/12/18/Dynamically-scaling-brokers",children:"previous experiments"})," with dynamically scaling by now also testing whether\nthe cluster survives dataloss during the process."]}),"\n",(0,a.jsx)(t.p,{children:"One goal is to verify that we haven't accidentally introduced a single point of failure in the cluster.\nAnother is to ensure that data loss does not corrupt the cluster topology."}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"TL;DR;"}),"\nEven with dataloss, the scaling completes successfully and with the expected results.\nWe found that during scaling, a single broker of the previous cluster configuration can become a single point of failure by preventing a partition from electing a leader.\nThis is not exactly a bug, but something that we want to improve."]})]})}function u(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>r});var a=n(96540);const s={},i=a.createContext(s);function o(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),a.createElement(i.Provider,{value:t},e.children)}}}]);