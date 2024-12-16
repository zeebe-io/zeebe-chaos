"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[1426],{17006:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var a=s(57030),r=s(74848),n=s(28453);const o={layout:"posts",title:"Extract K8 resources from namespace",date:new Date("2020-07-02T00:00:00.000Z"),categories:["kubernetes"],authors:"zell"},i="Chaos Day Summary:",l={authorsImageUrls:[void 0]},c=[{value:"Participants",id:"participants",level:2}];function u(e){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Research: Read about DiRT (Disaster Recovery Tests) @ google - gave me same new ideas for more game days"}),"\n",(0,r.jsx)(t.li,{children:"Failure documentation about Log Appender"}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"Unfortunately I had no time today for new chaos experiment, but I spent with @pihme some time to investigate how we can run the cluster plans in our gke.\nWe did a bit of progress. I'm finally able to create cluster plans in the ultratest and can extract all resource definitions via command line."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-shell",children:"kubectl get pvc,configmap,service,deployment,statefulset,cronjob,storageclasses -o yaml --export | sed -e '/resourceVersion: \"[0-9]\\+\"/d' -e '/uid: [a-z0-9-]\\+/d' -e '/selfLink: [a-z0-9A-Z/]\\+/d' -e '/status:/d' -e '/phase:/d' -e '/creationTimestamp:/d' > s-cluster.yaml\n"})}),"\n",(0,r.jsx)(t.p,{children:"We now need to find a way to successfully deploy it in our cluster - it haven't been successful yet. We thought about using kustomize to adjust some values they use.\nMuch easier would be to just deploy the operator they use in our gke cloud and use the CRD to deploy the cluster plans. I think we need to investigate a bit more here what is the best approach. In the end I would like to run our chaos experiments against clusters which correspond to the real deployed ones."}),"\n",(0,r.jsx)(t.h2,{id:"participants",children:"Participants"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"@pihme"}),"\n",(0,r.jsx)(t.li,{children:"@zelldon"}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},28453:(e,t,s)=>{s.d(t,{R:()=>o,x:()=>i});var a=s(96540);const r={},n=a.createContext(r);function o(e){const t=a.useContext(n);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),a.createElement(n.Provider,{value:t},e.children)}},57030:e=>{e.exports=JSON.parse('{"permalink":"/zeebe-chaos/2020/07/02/extract-k8-resources","editUrl":"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-07-02-extract-k8-resources/index.md","source":"@site/blog/2020-07-02-extract-k8-resources/index.md","title":"Extract K8 resources from namespace","description":"* Research: Read about DiRT (Disaster Recovery Tests) @ google - gave me same new ideas for more game days","date":"2020-07-02T00:00:00.000Z","tags":[],"readingTime":1.02,"hasTruncateMarker":true,"authors":[{"name":"Christopher Kujawa","title":"Chaos Engineer @ Zeebe","url":"https://github.com/ChrisKujawa","page":{"permalink":"/zeebe-chaos/authors/zell"},"imageURL":"https://github.com/ChrisKujawa.png","key":"zell"}],"frontMatter":{"layout":"posts","title":"Extract K8 resources from namespace","date":"2020-07-02T00:00:00.000Z","categories":["kubernetes"],"authors":"zell"},"unlisted":false,"prevItem":{"title":"Experiment with Timers and Huge Variables","permalink":"/zeebe-chaos/2020/07/09/timer-and-huge-variables"},"nextItem":{"title":"Gateway Network Partition","permalink":"/zeebe-chaos/2020/06/25/gateway-network-partition"}}')}}]);