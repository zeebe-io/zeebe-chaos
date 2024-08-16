"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[3852],{78074:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var n=a(74848),r=a(28453);const o={layout:"posts",title:"Correlate Message after failover",date:new Date("2020-06-18T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],authors:"zell"},s="Chaos day Summary:",i={permalink:"/zeebe-chaos/2020/06/18/correlate-message-after-failover",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-06-18-correlate-message-after-failover/index.md",source:"@site/blog/2020-06-18-correlate-message-after-failover/index.md",title:"Correlate Message after failover",description:"* Documented failure cases for engine and stream processor. I think almost all possible failure cases I can think of we already handle, except problems on reading, which I think can't be handled.",date:"2020-06-18T00:00:00.000Z",tags:[],readingTime:.91,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell",page:null}],frontMatter:{layout:"posts",title:"Correlate Message after failover",date:"2020-06-18T00:00:00.000Z",categories:["chaos_experiment","bpmn"],authors:"zell"},unlisted:!1,prevItem:{title:"Gateway Network Partition",permalink:"/zeebe-chaos/2020/06/25/gateway-network-partition"},nextItem:{title:"High CPU load on Standalone Gateway",permalink:"/zeebe-chaos/2020/06/11/high-cpu-gateway"}},l={authorsImageUrls:[void 0]},c=[];function h(e){const t={a:"a",li:"li",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Documented failure cases for engine and stream processor. I think almost all possible failure cases I can think of we already handle, except problems on reading, which I think can't be handled."}),"\n",(0,n.jsxs)(t.li,{children:["Checked what the current issue is with the automated chaos experiments. It seems it is a infra problem. You can check the discussion in #infra. It might be affected due to ",(0,n.jsx)(t.a,{href:"https://jira.camunda.com/browse/INFRA-1292",children:"Infra-1292"})]}),"\n",(0,n.jsx)(t.li,{children:"Run a chaos experiment, where we correlate a message after fail over."}),"\n"]})}function u(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},28453:(e,t,a)=>{a.d(t,{R:()=>s,x:()=>i});var n=a(96540);const r={},o=n.createContext(r);function s(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);