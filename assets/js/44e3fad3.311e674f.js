"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[8523],{45526:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var r=t(77476),s=t(74848),n=t(28453);const o={layout:"posts",title:"Correlate Message after failover",date:new Date("2020-06-18T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],authors:"zell"},i="Chaos day Summary:",l={authorsImageUrls:[void 0]},c=[{value:"Chaos Experiment",id:"chaos-experiment",level:2}];function h(e){const a={a:"a",h2:"h2",li:"li",p:"p",ul:"ul",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:"Documented failure cases for engine and stream processor. I think almost all possible failure cases I can think of we already handle, except problems on reading, which I think can't be handled."}),"\n",(0,s.jsxs)(a.li,{children:["Checked what the current issue is with the automated chaos experiments. It seems it is a infra problem. You can check the discussion in #infra. It might be affected due to ",(0,s.jsx)(a.a,{href:"https://jira.camunda.com/browse/INFRA-1292",children:"Infra-1292"})]}),"\n",(0,s.jsx)(a.li,{children:"Run a chaos experiment, where we correlate a message after fail over."}),"\n"]}),"\n",(0,s.jsx)(a.h2,{id:"chaos-experiment",children:"Chaos Experiment"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:"Start our normal setup and deploy a workflow with an intermediate message catch event."}),"\n",(0,s.jsx)(a.li,{children:"Publish a message and kill a random broker."}),"\n",(0,s.jsx)(a.li,{children:"Create a workflow instance and await the result."}),"\n"]}),"\n",(0,s.jsxs)(a.p,{children:["I did this experiment several times and it works without any problems, as far as I can tell. First I was wondering that the message was only correlated to one instance, but this seems to be expected ",(0,s.jsx)(a.a,{href:"https://docs.zeebe.io/reference/message-correlation/message-correlation.html#message-cardinality",children:"message-correlation.html#message-cardinality"})," So learned something new today about our messages ","\ud83d\ude01","."]}),"\n",(0,s.jsx)(a.p,{children:"I prepared already an automatable chaos experiment for that. Have to fine tune it a bit."}),"\n",(0,s.jsx)(a.p,{children:"No pictures today."})]})}function d(e={}){const{wrapper:a}={...(0,n.R)(),...e.components};return a?(0,s.jsx)(a,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},28453:(e,a,t)=>{t.d(a,{R:()=>o,x:()=>i});var r=t(96540);const s={},n=r.createContext(s);function o(e){const a=r.useContext(n);return r.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function i(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(n.Provider,{value:a},e.children)}},77476:e=>{e.exports=JSON.parse('{"permalink":"/zeebe-chaos/2020/06/18/correlate-message-after-failover","editUrl":"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-06-18-correlate-message-after-failover/index.md","source":"@site/blog/2020-06-18-correlate-message-after-failover/index.md","title":"Correlate Message after failover","description":"* Documented failure cases for engine and stream processor. I think almost all possible failure cases I can think of we already handle, except problems on reading, which I think can\'t be handled.","date":"2020-06-18T00:00:00.000Z","tags":[],"readingTime":0.91,"hasTruncateMarker":true,"authors":[{"name":"Christopher Kujawa","title":"Chaos Engineer @ Zeebe","url":"https://github.com/ChrisKujawa","page":{"permalink":"/zeebe-chaos/authors/zell"},"imageURL":"https://github.com/ChrisKujawa.png","key":"zell"}],"frontMatter":{"layout":"posts","title":"Correlate Message after failover","date":"2020-06-18T00:00:00.000Z","categories":["chaos_experiment","bpmn"],"authors":"zell"},"unlisted":false,"prevItem":{"title":"Gateway Network Partition","permalink":"/zeebe-chaos/2020/06/25/gateway-network-partition"},"nextItem":{"title":"High CPU load on Standalone Gateway","permalink":"/zeebe-chaos/2020/06/11/high-cpu-gateway"}}')}}]);