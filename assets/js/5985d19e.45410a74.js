"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[5661],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},h="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),h=c(r),d=a,m=h["".concat(l,".").concat(d)]||h[d]||u[d]||o;return r?n.createElement(m,i(i({ref:t},p),{},{components:r})):n.createElement(m,i({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[h]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},81158:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=r(87462),a=(r(67294),r(3905));const o={layout:"posts",title:"Corrupted Snapshot Experiment Investigation",date:new Date("2021-04-29T00:00:00.000Z"),categories:["chaos_experiment","broker","snapshots"],tags:["availability"],authors:"zell"},i="Chaos Day Summary",s={permalink:"/zeebe-chaos/2021/04/29/Corrupted-Snapshot",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-04-29-Corrupted-Snapshot/index.md",source:"@site/blog/2021-04-29-Corrupted-Snapshot/index.md",title:"Corrupted Snapshot Experiment Investigation",description:"A while ago we have written an experiment, which should verify that followers are not able to become leader, if they have a corrupted snapshot. You can find that specific experiment here. This experiment was executed regularly against Production-M and Production-S Camunda Cloud cluster plans. With the latest changes, in the upcoming 1.0 release, we changed some behavior in regard to detect snapshot corruption on followers.",date:"2021-04-29T00:00:00.000Z",formattedDate:"April 29, 2021",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:7.195,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Corrupted Snapshot Experiment Investigation",date:"2021-04-29T00:00:00.000Z",categories:["chaos_experiment","broker","snapshots"],tags:["availability"],authors:"zell"},prevItem:{title:"Time travel Experiment",permalink:"/zeebe-chaos/2021/05/25/Reset-Clock"},nextItem:{title:"BPMN meets Chaos Engineering",permalink:"/zeebe-chaos/2021/04/03/bpmn-meets-chaos-engineering"}},l={authorsImageUrls:[void 0]},c=[],p={toc:c},h="wrapper";function u(e){let{components:t,...r}=e;return(0,a.kt)(h,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"A while ago we have written an experiment, which should verify that followers are not able to become leader, if they have a corrupted snapshot. You can find that specific experiment ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/tree/master/chaos-experiments/helm/snapshot-corruption"},"here"),". This experiment was executed regularly against Production-M and Production-S Camunda Cloud cluster plans. With the latest changes, in the upcoming 1.0 release, we changed some behavior in regard to detect snapshot corruption on followers. "),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"NEW")," If a follower is restarted and has a corrupted snapshot it will detect it on bootstrap and will refuse to\nstart related services and crash. This means the pod will end in a crash loop, until this is manually fixed."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"OLD")," The follower only detects the corrupted snapshot on becoming leader when opening the database. On the restart of a follower this will not be detected."),(0,a.kt)("p",null,"The behavior change caused to fail our automated chaos experiments, since we corrupt the snapshot on followers and on a later experiment we restart followers. For this reason we had to disable the execution of the snapshot corruption experiment, see related issue\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-cluster-testbench/issues/303"},"zeebe-io/zeebe-cluster-testbench#303"),"."),(0,a.kt)("p",null,"In this chaos day we wanted to investigate whether we can improve the experiment and bring it back. For reference, I also opened a issue to discuss the current corruption detection approach ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/camunda-cloud/zeebe/issues/6907"},"zeebe#6907")))}u.isMDXComponent=!0}}]);