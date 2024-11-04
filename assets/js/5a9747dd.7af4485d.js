"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[634],{8680:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>i,contentTitle:()=>h,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var o=s(58654),a=s(74848),n=s(28453);const r={layout:"posts",title:"Throughput on big state",date:new Date("2021-10-29T00:00:00.000Z"),categories:["chaos_experiment","bpmn","processing"],tags:["performance"],authors:"zell"},h="Chaos Day Summary",i={authorsImageUrls:[void 0]},c=[];function p(e){const t={a:"a",p:"p",strong:"strong",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["In this chaos day we wanted to prove the hypothesis that the throughput should not significantly change even if we have bigger state, see ",(0,a.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/issues/64",children:"zeebe-chaos#64"})]}),"\n",(0,a.jsxs)(t.p,{children:["This came up due observations from the ",(0,a.jsx)(t.a,{href:"/zeebe-chaos/2021/10/05/recovery-time",children:"last chaos day"}),". We already had a bigger investigation here ",(0,a.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/7955",children:"zeebe#7955"}),"."]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"TL;DR;"})," We were not able to prove the hypothesis. Bigger state, more than 100k+ process instances in the state, seems to have an big impact on the processing throughput."]})]})}function u(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},28453:(e,t,s)=>{s.d(t,{R:()=>r,x:()=>h});var o=s(96540);const a={},n=o.createContext(a);function r(e){const t=o.useContext(n);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function h(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),o.createElement(n.Provider,{value:t},e.children)}},58654:e=>{e.exports=JSON.parse('{"permalink":"/zeebe-chaos/2021/10/29/Throughput-on-big-state","editUrl":"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-10-29-Throughput-on-big-state/index.md","source":"@site/blog/2021-10-29-Throughput-on-big-state/index.md","title":"Throughput on big state","description":"In this chaos day we wanted to prove the hypothesis that the throughput should not significantly change even if we have bigger state, see zeebe-chaos#64","date":"2021-10-29T00:00:00.000Z","tags":[{"inline":true,"label":"performance","permalink":"/zeebe-chaos/tags/performance"}],"readingTime":3.145,"hasTruncateMarker":true,"authors":[{"name":"Christopher Kujawa","title":"Chaos Engineer @ Zeebe","url":"https://github.com/zelldon","page":{"permalink":"/zeebe-chaos/authors/zell"},"imageURL":"https://github.com/zelldon.png","key":"zell"}],"frontMatter":{"layout":"posts","title":"Throughput on big state","date":"2021-10-29T00:00:00.000Z","categories":["chaos_experiment","bpmn","processing"],"tags":["performance"],"authors":"zell"},"unlisted":false,"prevItem":{"title":"Not produce duplicate Keys","permalink":"/zeebe-chaos/2021/11/11/Not-produce-duplicate-Keys"},"nextItem":{"title":"Recovery (Fail Over) time","permalink":"/zeebe-chaos/2021/10/05/recovery-time"}}')}}]);