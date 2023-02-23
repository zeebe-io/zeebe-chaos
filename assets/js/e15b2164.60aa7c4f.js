"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[1833],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>h});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),c=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(r),d=n,h=p["".concat(i,".").concat(d)]||p[d]||m[d]||o;return r?a.createElement(h,s(s({ref:t},u),{},{components:r})):a.createElement(h,s({ref:t},u))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,s=new Array(o);s[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[p]="string"==typeof e?e:n,s[1]=l;for(var c=2;c<o;c++)s[c]=r[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9694:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=r(7462),n=(r(7294),r(3905));const o={layout:"posts",title:"Extract K8 resources from namespace",date:new Date("2020-07-02T00:00:00.000Z"),categories:["kubernetes"],authors:"zell"},s="Chaos Day Summary:",l={permalink:"/zeebe-chaos/2020/07/02/extract-k8-resources",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-07-02-extract-k8-resources/index.md",source:"@site/blog/2020-07-02-extract-k8-resources/index.md",title:"Extract K8 resources from namespace",description:"* Research: Read about DiRT (Disaster Recovery Tests) @ google - gave me same new ideas for more game days",date:"2020-07-02T00:00:00.000Z",formattedDate:"July 2, 2020",tags:[],readingTime:1.02,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Extract K8 resources from namespace",date:"2020-07-02T00:00:00.000Z",categories:["kubernetes"],authors:"zell"},prevItem:{title:"Experiment with Timers and Huge Variables",permalink:"/zeebe-chaos/2020/07/09/timer-and-huge-variables"},nextItem:{title:"Gateway Network Partition",permalink:"/zeebe-chaos/2020/06/25/gateway-network-partition"}},i={authorsImageUrls:[void 0]},c=[],u={toc:c},p="wrapper";function m(e){let{components:t,...r}=e;return(0,n.kt)(p,(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Research: Read about DiRT (Disaster Recovery Tests) @ google - gave me same new ideas for more game days"),(0,n.kt)("li",{parentName:"ul"},"Failure documentation about Log Appender")),(0,n.kt)("p",null,"Unfortunately I had no time today for new chaos experiment, but I spent with @pihme some time to investigate how we can run the cluster plans in our gke.\nWe did a bit of progress. I'm finally able to create cluster plans in the ultratest and can extract all resource definitions via command line."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl get pvc,configmap,service,deployment,statefulset,cronjob,storageclasses -o yaml --export | sed -e '/resourceVersion: \"[0-9]\\+\"/d' -e '/uid: [a-z0-9-]\\+/d' -e '/selfLink: [a-z0-9A-Z/]\\+/d' -e '/status:/d' -e '/phase:/d' -e '/creationTimestamp:/d' > s-cluster.yaml\n")),(0,n.kt)("p",null,"We now need to find a way to successfully deploy it in our cluster - it haven't been successful yet. We thought about using kustomize to adjust some values they use.\nMuch easier would be to just deploy the operator they use in our gke cloud and use the CRD to deploy the cluster plans. I think we need to investigate a bit more here what is the best approach. In the end I would like to run our chaos experiments against clusters which correspond to the real deployed ones."))}m.isMDXComponent=!0}}]);