"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[557],{26900:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var n=a(74848),i=a(28453);const s={layout:"posts",title:"Gateway Termination",date:new Date("2023-04-06T00:00:00.000Z"),categories:["chaos_experiment","gateway"],tags:["availability","resiliency"],authors:"zell"},o="Chaos Day Summary",r={permalink:"/zeebe-chaos/2023/04/06/gateway-termination",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2023-04-06-gateway-termination/index.md",source:"@site/blog/2023-04-06-gateway-termination/index.md",title:"Gateway Termination",description:"In today's chaos day, we wanted to experiment with the gateway and resiliency of workers.",date:"2023-04-06T00:00:00.000Z",tags:[{inline:!0,label:"availability",permalink:"/zeebe-chaos/tags/availability"},{inline:!0,label:"resiliency",permalink:"/zeebe-chaos/tags/resiliency"}],readingTime:7.24,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell",page:null}],frontMatter:{layout:"posts",title:"Gateway Termination",date:"2023-04-06T00:00:00.000Z",categories:["chaos_experiment","gateway"],tags:["availability","resiliency"],authors:"zell"},unlisted:!1,prevItem:{title:"SST Partitioning toggle",permalink:"/zeebe-chaos/2023/05/15/SST-Partitioning-toggle"},nextItem:{title:"Recursive call activity",permalink:"/zeebe-chaos/2023/02/23/Recursive-call-activity"}},c={authorsImageUrls:[void 0]},l=[];function h(e){const t={a:"a",p:"p",strong:"strong",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"In today's chaos day, we wanted to experiment with the gateway and resiliency of workers."}),"\n",(0,n.jsxs)(t.p,{children:["We have seen in recent weeks some issues within our benchmarks when gateways have been restarted,\nsee ",(0,n.jsx)(t.a,{href:"https://github.com/camunda/camunda/issues/11975",children:"zeebe#11975"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["We did a similar experiment ",(0,n.jsx)(t.a,{href:"/zeebe-chaos/2022/02/15/Standalone-Gateway-in-CCSaaS",children:"in the past"}),",\ntoday we want to focus on self-managed (",(0,n.jsx)(t.a,{href:"https://helm.camunda.io/",children:"benchmarks with our helm charts"}),").\nIdeally, we can automate this as well soon."]}),"\n",(0,n.jsxs)(t.p,{children:["Today ",(0,n.jsx)(t.a,{href:"https://github.com/npepinpe",children:"Nicolas"})," joined me on the chaos day ","\ud83c\udf89"]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"TL;DR;"})," We were able to show that the workers (clients) can reconnect after a gateway is shutdown ","\u2705","\nFurthermore, we have discovered a potential performance issue on lower load, which impacts process execution latency (",(0,n.jsx)(t.a,{href:"https://github.com/camunda/camunda/issues/12311",children:"zeebe#12311"}),")."]})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},28453:(e,t,a)=>{a.d(t,{R:()=>o,x:()=>r});var n=a(96540);const i={},s=n.createContext(i);function o(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);