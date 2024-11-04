"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[5482],{37969:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>h});var o=n(23717),s=n(74848),a=n(28453);const r={layout:"posts",title:"BPMN meets Chaos Engineering",date:new Date("2021-04-03T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["tools"],authors:"zell"},i="BPMN meets Chaos Engineering",c={authorsImageUrls:[void 0]},h=[];function l(e){const t={a:"a",li:"li",p:"p",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["On the first of April (2021) we ran our Spring Hackday at Camunda. This is an event where the developers at camunda come together to work on projects they like or on new ideas/approaches they want to try out. This time we (",(0,s.jsx)(t.a,{href:"https://github.com/saig0",children:"Philipp"})," and ",(0,s.jsx)(t.a,{href:"https://github.com/zelldon",children:"me"}),") wanted to orchestrate our Chaos Experiments with BPMN. If you already know how we automated our chaos experiments before, you can skip the next section\nand jump directly to the ",(0,s.jsx)(t.a,{href:"#hackday-project",children:"Hackday Project section"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"In order to understand this blogpost make sure that you have a little understanding of Zeebe, Camunda Cloud and Chaos Engineering. Read the following resources to get a better understanding."}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://docs.camunda.io/docs/guides/",children:"Get Started with Camund cloud"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://docs.camunda.io/docs/product-manuals/clients/cli-client/get-started",children:"Quickstart Guide"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://camunda.com/de/products/cloud/",children:"Camunda Cloud"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://docs.camunda.io/docs/product-manuals/zeebe/zeebe-overview/",children:"Zeebe Process Engine"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://www.omg.org/spec/BPMN/2.0/About-BPMN/",children:"BPMN 2.0"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://principlesofchaos.org/",children:"Principles of Chaos"})}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>i});var o=n(96540);const s={},a=o.createContext(s);function r(e){const t=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),o.createElement(a.Provider,{value:t},e.children)}},23717:e=>{e.exports=JSON.parse('{"permalink":"/zeebe-chaos/2021/04/03/bpmn-meets-chaos-engineering","editUrl":"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-04-03-bpmn-meets-chaos-engineering/index.md","source":"@site/blog/2021-04-03-bpmn-meets-chaos-engineering/index.md","title":"BPMN meets Chaos Engineering","description":"On the first of April (2021) we ran our Spring Hackday at Camunda. This is an event where the developers at camunda come together to work on projects they like or on new ideas/approaches they want to try out. This time we (Philipp and me) wanted to orchestrate our Chaos Experiments with BPMN. If you already know how we automated our chaos experiments before, you can skip the next section","date":"2021-04-03T00:00:00.000Z","tags":[{"inline":true,"label":"tools","permalink":"/zeebe-chaos/tags/tools"}],"readingTime":7.615,"hasTruncateMarker":true,"authors":[{"name":"Christopher Kujawa","title":"Chaos Engineer @ Zeebe","url":"https://github.com/zelldon","page":{"permalink":"/zeebe-chaos/authors/zell"},"imageURL":"https://github.com/zelldon.png","key":"zell"}],"frontMatter":{"layout":"posts","title":"BPMN meets Chaos Engineering","date":"2021-04-03T00:00:00.000Z","categories":["chaos_experiment","bpmn"],"tags":["tools"],"authors":"zell"},"unlisted":false,"prevItem":{"title":"Corrupted Snapshot Experiment Investigation","permalink":"/zeebe-chaos/2021/04/29/Corrupted-Snapshot"},"nextItem":{"title":"Set file immutable","permalink":"/zeebe-chaos/2021/03/30/set-file-immutable"}}')}}]);