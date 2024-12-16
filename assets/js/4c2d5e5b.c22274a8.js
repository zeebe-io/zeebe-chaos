"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[3289],{36526:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>h});var o=a(89949),n=a(74848),s=a(28453);const r={layout:"posts",title:"Recovery (Fail Over) time",date:new Date("2021-10-05T00:00:00.000Z"),categories:["chaos_experiment","fail_over"],tags:["availability"],authors:"zell"},i="Chaos Day Summary",l={authorsImageUrls:[void 0]},h=[];function c(e){const t={a:"a",p:"p",strong:"strong",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:['In the last quarter we worked on a new "feature" which is called "building state on followers". In short,\nit means that the followers apply the events to build there state, which makes regular snapshot\nreplication unnecessary and allows faster role transition between Follower-to-Leader. In this chaos\nday I wanted to experiment a bit with this property, we already did some benchmarks ',(0,n.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/7515",children:"here"}),".\nToday, I want to see how it behaves with larger state (bigger snapshots), since this needed to be\ncopied in previous versions of Zeebe, and the broker had to replay more than with the newest version."]}),"\n",(0,n.jsxs)(t.p,{children:["If you want to now more about build state on followers check out the ",(0,n.jsx)(t.a,{href:"https://github.com/zeebe-io/enhancements/blob/master/ZEP007-build-state-on-followers.md",children:"ZEP"})]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"TL;DR;"})," In our experiment we had almost no downtime, with version 1.2, the new leader was very fast able to pick up the next work (accept new commands)."]})]})}function u(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},28453:(e,t,a)=>{a.d(t,{R:()=>r,x:()=>i});var o=a(96540);const n={},s=o.createContext(n);function r(e){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),o.createElement(s.Provider,{value:t},e.children)}},89949:e=>{e.exports=JSON.parse('{"permalink":"/zeebe-chaos/2021/10/05/recovery-time","editUrl":"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-10-05-recovery-time/index.md","source":"@site/blog/2021-10-05-recovery-time/index.md","title":"Recovery (Fail Over) time","description":"In the last quarter we worked on a new \\"feature\\" which is called \\"building state on followers\\". In short,","date":"2021-10-05T00:00:00.000Z","tags":[{"inline":true,"label":"availability","permalink":"/zeebe-chaos/tags/availability"}],"readingTime":4.895,"hasTruncateMarker":true,"authors":[{"name":"Christopher Kujawa","title":"Chaos Engineer @ Zeebe","url":"https://github.com/ChrisKujawa","page":{"permalink":"/zeebe-chaos/authors/zell"},"imageURL":"https://github.com/ChrisKujawa.png","key":"zell"}],"frontMatter":{"layout":"posts","title":"Recovery (Fail Over) time","date":"2021-10-05T00:00:00.000Z","categories":["chaos_experiment","fail_over"],"tags":["availability"],"authors":"zell"},"unlisted":false,"prevItem":{"title":"Throughput on big state","permalink":"/zeebe-chaos/2021/10/29/Throughput-on-big-state"},"nextItem":{"title":"Old-Clients","permalink":"/zeebe-chaos/2021/09/23/Old-Clients"}}')}}]);