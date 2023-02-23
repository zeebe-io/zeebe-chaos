"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[9802],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>g});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},l=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},h="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),h=p(r),m=o,g=h["".concat(c,".").concat(m)]||h[m]||u[m]||a;return r?n.createElement(g,s(s({ref:t},l),{},{components:r})):n.createElement(g,s({ref:t},l))}));function g(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[h]="string"==typeof e?e:o,s[1]=i;for(var p=2;p<a;p++)s[p]=r[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},4835:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var n=r(7462),o=(r(7294),r(3905));const a={layout:"posts",title:"Throughput on big state",date:new Date("2021-10-29T00:00:00.000Z"),categories:["chaos_experiment","bpmn","processing"],tags:["performance"],authors:"zell"},s="Chaos Day Summary",i={permalink:"/zeebe-chaos/2021/10/29/Throughput-on-big-state",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-10-29-Throughput-on-big-state/index.md",source:"@site/blog/2021-10-29-Throughput-on-big-state/index.md",title:"Throughput on big state",description:"In this chaos day we wanted to prove the hypothesis that the throughput should not significantly change even if we have bigger state, see zeebe-chaos#64",date:"2021-10-29T00:00:00.000Z",formattedDate:"October 29, 2021",tags:[{label:"performance",permalink:"/zeebe-chaos/tags/performance"}],readingTime:3.145,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Throughput on big state",date:"2021-10-29T00:00:00.000Z",categories:["chaos_experiment","bpmn","processing"],tags:["performance"],authors:"zell"},prevItem:{title:"Not produce duplicate Keys",permalink:"/zeebe-chaos/2021/11/11/Not-produce-duplicate-Keys"},nextItem:{title:"Recovery (Fail Over) time",permalink:"/zeebe-chaos/2021/10/05/recovery-time"}},c={authorsImageUrls:[void 0]},p=[],l={toc:p},h="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(h,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"In this chaos day we wanted to prove the hypothesis that the throughput should not significantly change even if we have bigger state, see ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/issues/64"},"zeebe-chaos#64")),(0,o.kt)("p",null,"This came up due observations from the ",(0,o.kt)("a",{parentName:"p",href:"/zeebe-chaos/2021/10/05/recovery-time"},"last chaos day"),". We already had a bigger investigation here ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/camunda-cloud/zeebe/issues/7955"},"zeebe#7955"),". "),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"TL;DR;")," We were not able to prove the hypothesis. Bigger state, more than 100k+ process instances in the state, seems to have an big impact on the processing throughput."))}u.isMDXComponent=!0}}]);