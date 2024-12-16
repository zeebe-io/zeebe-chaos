"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[8503],{68225:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var o=a(57392),n=a(74848),s=a(28453);const r={layout:"posts",title:"Network partitions",date:new Date("2021-01-19T00:00:00.000Z"),categories:["chaos_experiment","broker","network"],tags:["availability"],authors:"zell"},i="Chaos Day Summary",l={authorsImageUrls:[void 0]},c=[];function h(e){const t={em:"em",li:"li",p:"p",ul:"ul",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["As you can see, I migrated the old chaos day summaries to github pages, for better readability.\nI always wanted to play around with github pages and jekyll so this was a good opportunity. I hope you like it. ","\ud83d\ude04"]}),"\n",(0,n.jsxs)(t.p,{children:["On the last Chaos Day, we experimented with disconnecting a Leader and ",(0,n.jsx)(t.em,{children:"one"})," follower. We expected no bigger disturbance, since we still have quorum and can process records. Today I want to experiment with bigger network partitions."]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["In the first chaos experiment: I had a cluster of 5 nodes and split that into two groups, the processing continued as expected, since we had still quorum. ","\ud83d\udcaa"]}),"\n",(0,n.jsx)(t.li,{children:"In the second chaos experiment: I split the cluster again into two groups, but this time we added one follower of the bigger group to the smaller group after snapshot was taken and compaction was done. The smaller group needed to keep up with the newer state, before new processing can be started again, but everything worked fine."}),"\n"]})]})}function p(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},28453:(e,t,a)=>{a.d(t,{R:()=>r,x:()=>i});var o=a(96540);const n={},s=o.createContext(n);function r(e){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),o.createElement(s.Provider,{value:t},e.children)}},57392:e=>{e.exports=JSON.parse('{"permalink":"/zeebe-chaos/2021/01/19/network-partition","editUrl":"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-01-19-network-partition/index.md","source":"@site/blog/2021-01-19-network-partition/index.md","title":"Network partitions","description":"As you can see, I migrated the old chaos day summaries to github pages, for better readability.","date":"2021-01-19T00:00:00.000Z","tags":[{"inline":true,"label":"availability","permalink":"/zeebe-chaos/tags/availability"}],"readingTime":7.03,"hasTruncateMarker":true,"authors":[{"name":"Christopher Kujawa","title":"Chaos Engineer @ Zeebe","url":"https://github.com/ChrisKujawa","page":{"permalink":"/zeebe-chaos/authors/zell"},"imageURL":"https://github.com/ChrisKujawa.png","key":"zell"}],"frontMatter":{"layout":"posts","title":"Network partitions","date":"2021-01-19T00:00:00.000Z","categories":["chaos_experiment","broker","network"],"tags":["availability"],"authors":"zell"},"unlisted":false,"prevItem":{"title":"Deployment Distribution","permalink":"/zeebe-chaos/2021/01/26/deployments"},"nextItem":{"title":"Disconnect Leader and one Follower","permalink":"/zeebe-chaos/2021/01/07/disconnect-leader-and-follower"}}')}}]);