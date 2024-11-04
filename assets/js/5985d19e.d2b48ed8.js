"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[707],{10841:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>h,contentTitle:()=>i,default:()=>p,frontMatter:()=>r,metadata:()=>n,toc:()=>l});var n=o(85091),a=o(74848),s=o(28453);const r={layout:"posts",title:"Corrupted Snapshot Experiment Investigation",date:new Date("2021-04-29T00:00:00.000Z"),categories:["chaos_experiment","broker","snapshots"],tags:["availability"],authors:"zell"},i="Chaos Day Summary",h={authorsImageUrls:[void 0]},l=[];function c(e){const t={a:"a",p:"p",strong:"strong",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["A while ago we have written an experiment, which should verify that followers are not able to become leader, if they have a corrupted snapshot. You can find that specific experiment ",(0,a.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/tree/master/chaos-experiments/helm/snapshot-corruption",children:"here"}),". This experiment was executed regularly against Production-M and Production-S Camunda Cloud cluster plans. With the latest changes, in the upcoming 1.0 release, we changed some behavior in regard to detect snapshot corruption on followers."]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"NEW"})," If a follower is restarted and has a corrupted snapshot it will detect it on bootstrap and will refuse to\nstart related services and crash. This means the pod will end in a crash loop, until this is manually fixed."]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"OLD"})," The follower only detects the corrupted snapshot on becoming leader when opening the database. On the restart of a follower this will not be detected."]}),"\n",(0,a.jsxs)(t.p,{children:["The behavior change caused to fail our automated chaos experiments, since we corrupt the snapshot on followers and on a later experiment we restart followers. For this reason we had to disable the execution of the snapshot corruption experiment, see related issue\n",(0,a.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-cluster-testbench/issues/303",children:"zeebe-io/zeebe-cluster-testbench#303"}),"."]}),"\n",(0,a.jsxs)(t.p,{children:["In this chaos day we wanted to investigate whether we can improve the experiment and bring it back. For reference, I also opened a issue to discuss the current corruption detection approach ",(0,a.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/6907",children:"zeebe#6907"})]})]})}function p(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},28453:(e,t,o)=>{o.d(t,{R:()=>r,x:()=>i});var n=o(96540);const a={},s=n.createContext(a);function r(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),n.createElement(s.Provider,{value:t},e.children)}},85091:e=>{e.exports=JSON.parse('{"permalink":"/zeebe-chaos/2021/04/29/Corrupted-Snapshot","editUrl":"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-04-29-Corrupted-Snapshot/index.md","source":"@site/blog/2021-04-29-Corrupted-Snapshot/index.md","title":"Corrupted Snapshot Experiment Investigation","description":"A while ago we have written an experiment, which should verify that followers are not able to become leader, if they have a corrupted snapshot. You can find that specific experiment here. This experiment was executed regularly against Production-M and Production-S Camunda Cloud cluster plans. With the latest changes, in the upcoming 1.0 release, we changed some behavior in regard to detect snapshot corruption on followers.","date":"2021-04-29T00:00:00.000Z","tags":[{"inline":true,"label":"availability","permalink":"/zeebe-chaos/tags/availability"}],"readingTime":7.195,"hasTruncateMarker":true,"authors":[{"name":"Christopher Kujawa","title":"Chaos Engineer @ Zeebe","url":"https://github.com/zelldon","page":{"permalink":"/zeebe-chaos/authors/zell"},"imageURL":"https://github.com/zelldon.png","key":"zell"}],"frontMatter":{"layout":"posts","title":"Corrupted Snapshot Experiment Investigation","date":"2021-04-29T00:00:00.000Z","categories":["chaos_experiment","broker","snapshots"],"tags":["availability"],"authors":"zell"},"unlisted":false,"prevItem":{"title":"Time travel Experiment","permalink":"/zeebe-chaos/2021/05/25/Reset-Clock"},"nextItem":{"title":"BPMN meets Chaos Engineering","permalink":"/zeebe-chaos/2021/04/03/bpmn-meets-chaos-engineering"}}')}}]);