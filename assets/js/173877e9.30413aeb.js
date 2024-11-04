"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[9894],{64023:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>n,toc:()=>c});var n=a(7558),r=a(74848),o=a(28453);const s={layout:"posts",title:"Message Correlation after Network Partition",date:new Date("2022-08-31T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["availability"],authors:"zell"},i="Chaos Day Summary",l={authorsImageUrls:[void 0]},c=[];function h(e){const t={p:"p",strong:"strong",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.p,{children:"In the last weeks, we made several changes in our core components, we introduce some new abstractions, and changed how we communicate between partitions."}),"\n",(0,r.jsx)(t.p,{children:"Due to these changes, we thought it might make sense to run some more chaos experiments in that direction and area since our benchmarks also recently found some interesting edge cases."}),"\n",(0,r.jsx)(t.p,{children:"Today we experimented with Message Correlation and what happens when a network partition disturbs the correlation process."}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"TL;DR;"})," The experiment was partially successful (after retry), we were able to publish messages during a network partition that have been correlated after the network partition. We need to verify whether we can also publish messages before a network partition and during the partition create the related instances."]})]})}function p(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},28453:(e,t,a)=>{a.d(t,{R:()=>s,x:()=>i});var n=a(96540);const r={},o=n.createContext(r);function s(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),n.createElement(o.Provider,{value:t},e.children)}},7558:e=>{e.exports=JSON.parse('{"permalink":"/zeebe-chaos/2022/08/31/Message-Correlation-after-Network-Partition","editUrl":"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2022-08-31-Message-Correlation-after-Network-Partition/index.md","source":"@site/blog/2022-08-31-Message-Correlation-after-Network-Partition/index.md","title":"Message Correlation after Network Partition","description":"In the last weeks, we made several changes in our core components, we introduce some new abstractions, and changed how we communicate between partitions.","date":"2022-08-31T00:00:00.000Z","tags":[{"inline":true,"label":"availability","permalink":"/zeebe-chaos/tags/availability"}],"readingTime":9.97,"hasTruncateMarker":true,"authors":[{"name":"Christopher Kujawa","title":"Chaos Engineer @ Zeebe","url":"https://github.com/zelldon","page":{"permalink":"/zeebe-chaos/authors/zell"},"imageURL":"https://github.com/zelldon.png","key":"zell"}],"frontMatter":{"layout":"posts","title":"Message Correlation after Network Partition","date":"2022-08-31T00:00:00.000Z","categories":["chaos_experiment","bpmn"],"tags":["availability"],"authors":"zell"},"unlisted":false,"prevItem":{"title":"Recursive call activity","permalink":"/zeebe-chaos/2023/02/23/Recursive-call-activity"},"nextItem":{"title":"Bring Deployment distribution experiment back","permalink":"/zeebe-chaos/2022/08/02/deployment-distribution"}}')}}]);