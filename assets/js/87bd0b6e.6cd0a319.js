"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[7167],{84086:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>h});var a=n(74848),o=n(28453);const r={layout:"posts",title:"Camunda Cloud network partition",date:new Date("2021-03-23T00:00:00.000Z"),categories:["chaos_experiment","camunda_cloud","network"],authors:"zell"},i="Chaos Day Summary",s={permalink:"/zeebe-chaos/2021/03/23/camunda-cloud-network-partition",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-03-23-camunda-cloud-network-partition/index.md",source:"@site/blog/2021-03-23-camunda-cloud-network-partition/index.md",title:"Camunda Cloud network partition",description:"This time Deepthi was joining me on my regular Chaos Day.",date:"2021-03-23T00:00:00.000Z",tags:[],readingTime:7.18,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",page:{permalink:"/zeebe-chaos/authors/zell"},imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Camunda Cloud network partition",date:"2021-03-23T00:00:00.000Z",categories:["chaos_experiment","camunda_cloud","network"],authors:"zell"},unlisted:!1,prevItem:{title:"Set file immutable",permalink:"/zeebe-chaos/2021/03/30/set-file-immutable"},nextItem:{title:"Fault-tolerant processing of process instances",permalink:"/zeebe-chaos/2021/03/09/cont-workflow-instance"}},c={authorsImageUrls:[void 0]},h=[];function l(e){const t={a:"a",p:"p",strong:"strong",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["This time ",(0,a.jsx)(t.a,{href:"https://github.com/deepthidevaki",children:"Deepthi"})," was joining me on my regular Chaos Day. ","\ud83c\udf89"]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:"/zeebe-chaos/2021/02/23/automate-deployments-dist",children:"In the second last chaos day"})," I created an automated chaos experiment, which verifies that the deployments are distributed after a network partition. Later it turned out that this doesn't work for camunda cloud, only for our helm setup. ",(0,a.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-cluster-testbench/issues/237",children:"The issue"})," was that on our camunda cloud zeebe clusters we had no ",(0,a.jsx)(t.a,{href:"https://man7.org/linux/man-pages/man7/capabilities.7.html",children:"NET_ADMIN"})," capability to create ip routes (used for the network partitions). After discussing with our SRE's they proposed a good way to overcome this. On running chaos experiments, which are network related, we will patch our target cluster to add this capability. This means we don't need to add such functionality in camunda cloud and the related zeebe operate/controller. Big thanks to ",(0,a.jsx)(t.a,{href:"https://github.com/hisImminence",children:"Immi"})," and ",(0,a.jsx)(t.a,{href:"https://github.com/Faffnir",children:"David"})," for providing this fix."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:"TL;DR;"})}),"\n",(0,a.jsx)(t.p,{children:"We were able to enhance the deployment distribution experiment and run it in the camunda cloud via testbench. We have enabled the experiment for Production M and L cluster plans. We had to adjust the rights for the testbench service account to make this work."})]})}function d(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>s});var a=n(96540);const o={},r=a.createContext(o);function i(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);