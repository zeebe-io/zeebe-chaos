"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[7840],{62662:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>a,toc:()=>h});var a=o(73908),n=o(74848),r=o(28453);const s={layout:"posts",title:"Operate load handling",date:new Date("2024-08-16T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["performance"],authors:"zell"},i="Chaos Day Summary",l={authorsImageUrls:[void 0]},h=[];function c(e){const t={a:"a",p:"p",strong:"strong",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["\ud83c\udf89"," Happy to announce that we are broadening the scope of our Chaos days, to look holistically at the whole Camunda Platform, starting today.\nIn the past Chaos days we often had a close look (or concentrated mostly) at Zeebe performance and stability."]}),"\n",(0,n.jsx)(t.p,{children:"Today, we will look at the Operate import performance and how Zeebe processing throughput might affect (or not?) the throughput and latency of the Operate import. Is it decoupled as we thought?"}),"\n",(0,n.jsx)(t.p,{children:"The import time is an important metric, representing the time until data from Zeebe processing is\nvisible to the User (excluding Elasticsearch's indexing). It is measured from when the record is written to the log, by the Zeebe processor, until Operate reads/imports it from Elasticsearch and converts it into its data model. We got much feedback (and experienced this on our own) that\nOperate is often lagging behind or is too slow, and of course we want to tackle and investigate this further."}),"\n",(0,n.jsxs)(t.p,{children:["The results from this Chaos day and related benchmarks should allow us to better understand how the current importing\nof Operate performs, and what its affects. Likely it will be a series of posts to investigate this further. In general,\nthe data will give us some guidance and comparable numbers for the future to improve the importing time. See also related GitHub issue ",(0,n.jsx)(t.a,{href:"https://github.com/camunda/camunda/issues/16912",children:"#16912"})," which targets to improve such."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"TL;DR;"})," We were not able to show that Zeebe throughput doesn't affect Operate importing time. We have seen that Operate can be positively affected by the throughput of Zeebe. Surprisingly, Operate was faster to\nimport if Zeebe produced more data (with a higher throughput). One explanation of this might be that Operate was then less idle."]})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},28453:(e,t,o)=>{o.d(t,{R:()=>s,x:()=>i});var a=o(96540);const n={},r=a.createContext(n);function s(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),a.createElement(r.Provider,{value:t},e.children)}},73908:e=>{e.exports=JSON.parse('{"permalink":"/zeebe-chaos/2024/08/16/Operate-load-handling","editUrl":"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2024-08-16-Operate-load-handling/index.md","source":"@site/blog/2024-08-16-Operate-load-handling/index.md","title":"Operate load handling","description":"Happy to announce that we are broadening the scope of our Chaos days, to look holistically at the whole Camunda Platform, starting today.","date":"2024-08-16T00:00:00.000Z","tags":[{"inline":true,"label":"performance","permalink":"/zeebe-chaos/tags/performance"}],"readingTime":7.145,"hasTruncateMarker":true,"authors":[{"name":"Christopher Kujawa","title":"Chaos Engineer @ Zeebe","url":"https://github.com/zelldon","page":{"permalink":"/zeebe-chaos/authors/zell"},"imageURL":"https://github.com/zelldon.png","key":"zell"}],"frontMatter":{"layout":"posts","title":"Operate load handling","date":"2024-08-16T00:00:00.000Z","categories":["chaos_experiment","bpmn"],"tags":["performance"],"authors":"zell"},"unlisted":false,"prevItem":{"title":"Improve Operate import latency","permalink":"/zeebe-chaos/2024/08/19/Operate-improve-import-latency"},"nextItem":{"title":"Using flow control to handle bottleneck on exporting","permalink":"/zeebe-chaos/2024/07/25/Using-flow-control-to-handle-bottlenecked-exporting"}}')}}]);