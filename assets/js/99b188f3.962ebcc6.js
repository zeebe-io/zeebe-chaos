"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[4143],{27098:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var a=o(74848),n=o(28453);const i={layout:"posts",title:"Slow Network",date:new Date("2021-07-06T00:00:00.000Z"),categories:["chaos_experiment","broker","network","leader"],tags:["availability"],authors:"zell"},r="Chaos Day Summary",l={permalink:"/zeebe-chaos/2021/07/06/Slow-Network",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-07-06-Slow-Network/index.md",source:"@site/blog/2021-07-06-Slow-Network/index.md",title:"Slow Network",description:"On a previous Chaos Day we played around with ToxiProxy , which allows injecting failures on the network level. For example dropping packages, causing latency etc.",date:"2021-07-06T00:00:00.000Z",tags:[{inline:!0,label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:5.905,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",page:{permalink:"/zeebe-chaos/authors/zell"},imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Slow Network",date:"2021-07-06T00:00:00.000Z",categories:["chaos_experiment","broker","network","leader"],tags:["availability"],authors:"zell"},unlisted:!1,prevItem:{title:"Old-Clients",permalink:"/zeebe-chaos/2021/09/23/Old-Clients"},nextItem:{title:"Full Disk Recovery",permalink:"/zeebe-chaos/2021/06/08/Full-Disk"}},s={authorsImageUrls:[void 0]},c=[];function h(e){const t={a:"a",code:"code",p:"p",strong:"strong",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["On a previous ",(0,a.jsx)(t.a,{href:"/zeebe-chaos/2020/10/06/toxi-proxy",children:"Chaos Day"})," we played around with ",(0,a.jsx)(t.a,{href:"https://github.com/Shopify/toxiproxy",children:"ToxiProxy"})," , which allows injecting failures on the network level. For example dropping packages, causing latency etc."]}),"\n",(0,a.jsxs)(t.p,{children:["Last week ",(0,a.jsx)(t.a,{href:"https://github.com/deepthidevaki",children:"@Deepthi"})," mentioned to me that we can do similar things with ",(0,a.jsx)(t.a,{href:"https://man7.org/linux/man-pages/man8/tc.8.html",children:"tc"}),", which is a built-in linux command. Today I wanted to experiment with latency between leader and followers using ",(0,a.jsx)(t.code,{children:"tc"}),"."]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"TL;DR;"})," The experiment failed; With adding 100ms network delay to the Leader we broke the complete processing throughput. ","\ud83d\udca5"]})]})}function p(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},28453:(e,t,o)=>{o.d(t,{R:()=>r,x:()=>l});var a=o(96540);const n={},i=a.createContext(n);function r(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),a.createElement(i.Provider,{value:t},e.children)}}}]);