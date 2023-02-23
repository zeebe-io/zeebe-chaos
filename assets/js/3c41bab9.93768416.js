"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[9945],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>d});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=r.createContext({}),c=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},h="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),h=c(a),p=n,d=h["".concat(l,".").concat(p)]||h[p]||m[p]||o;return a?r.createElement(d,i(i({ref:t},u),{},{components:a})):r.createElement(d,i({ref:t},u))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[h]="string"==typeof e?e:n,i[1]=s;for(var c=2;c<o;c++)i[c]=a[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}p.displayName="MDXCreateElement"},963:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=a(7462),n=(a(7294),a(3905));const o={layout:"posts",title:"Set file immutable",date:new Date("2021-03-30T00:00:00.000Z"),categories:["chaos_experiment","filesystem","immutable"],authors:"zell"},i="Chaos Day Summary",s={permalink:"/zeebe-chaos/2021/03/30/set-file-immutable",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-03-30-set-file-immutable/index.md",source:"@site/blog/2021-03-30-set-file-immutable/index.md",title:"Set file immutable",description:"This chaos day was a bit different. Actually I wanted to experiment again with camunda cloud and verify that our high load chaos experiments are now working with the newest cluster plans, see zeebe-cluster-testbench#135.",date:"2021-03-30T00:00:00.000Z",formattedDate:"March 30, 2021",tags:[],readingTime:6.5,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Set file immutable",date:"2021-03-30T00:00:00.000Z",categories:["chaos_experiment","filesystem","immutable"],authors:"zell"},prevItem:{title:"BPMN meets Chaos Engineering",permalink:"/zeebe-chaos/2021/04/03/bpmn-meets-chaos-engineering"},nextItem:{title:"Camunda Cloud network partition",permalink:"/zeebe-chaos/2021/03/23/camunda-cloud-network-partition"}},l={authorsImageUrls:[void 0]},c=[],u={toc:c},h="wrapper";function m(e){let{components:t,...a}=e;return(0,n.kt)(h,(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"This chaos day was a bit different. Actually I wanted to experiment again with camunda cloud and verify that our high load chaos experiments are now working with the newest cluster plans, see ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-cluster-testbench/issues/135"},"zeebe-cluster-testbench#135"),".\nUnfortunately I found out that our test chaos cluster was in a way broken, that we were not able to create new clusters. Luckily this was fixed at the end of the day, thanks to @immi :) "),(0,n.kt)("p",null,"Because of these circumstances I thought about different things to experiment with, and I remembered that in the ",(0,n.kt)("a",{parentName:"p",href:"/zeebe-chaos/2021/03/23/camunda-cloud-network-partition"},"last chaos day")," we worked with patching running deployments, in order to add more capabilities.\nThis allowed us to create ip routes and experiment with the zeebe deployment distribution. During this I have read the ",(0,n.kt)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man7/capabilities.7.html"},"capabilities list of linux"),", and found out that we can mark files as immutable, which might be interesting for a chaos experiment."),(0,n.kt)("p",null,"In this chaos day I planned to find out how marking a file immutable affects our brokers and I made the hypothesis that: ",(0,n.kt)("em",{parentName:"p"},"If a leader has a write error, which is not recoverable, it will step down and another leader should take over.")," I put this in our hypothesis backlog (",(0,n.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/issues/52"},"zeebe-chaos#52"),"). "),(0,n.kt)("p",null,"In order to really run this kind of experiment I need to find out whether marking a file immutable will cause any problems and if not how I can cause write errors such that affects the broker.\nUnfortunately it turned out that immutable files will not cause issues on already opened file channels, but I found some other bugs/issues, which you can read below."),(0,n.kt)("p",null,"In the next chaos days I will search for a way to cause write errors proactively, so we can verify that our system can handle such issues."))}m.isMDXComponent=!0}}]);