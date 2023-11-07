"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[5952],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),c=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(r),d=n,h=u["".concat(l,".").concat(d)]||u[d]||m[d]||o;return r?a.createElement(h,i(i({ref:t},p),{},{components:r})):a.createElement(h,i({ref:t},p))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:n,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},13839:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var a=r(87462),n=(r(67294),r(3905));const o={layout:"posts",title:"Fault-tolerant processing of process instances",date:new Date("2021-03-09T00:00:00.000Z"),categories:["chaos_experiment","broker","processing"],tags:["availability","data"],authors:"zell"},i="Chaos Day Summary",s={permalink:"/zeebe-chaos/2021/03/09/cont-workflow-instance",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-03-09-cont-workflow-instance/index.md",source:"@site/blog/2021-03-09-cont-workflow-instance/index.md",title:"Fault-tolerant processing of process instances",description:"Today I wanted to add another chaos experiment, to increase our automated chaos experiments collection. This time we will deploy a process model (with timer start event), restart a node and complete the process instance via zbctl.",date:"2021-03-09T00:00:00.000Z",formattedDate:"March 9, 2021",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"},{label:"data",permalink:"/zeebe-chaos/tags/data"}],readingTime:5.98,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Fault-tolerant processing of process instances",date:"2021-03-09T00:00:00.000Z",categories:["chaos_experiment","broker","processing"],tags:["availability","data"],authors:"zell"},prevItem:{title:"Camunda Cloud network partition",permalink:"/zeebe-chaos/2021/03/23/camunda-cloud-network-partition"},nextItem:{title:"Automating Deployment Distribution Chaos Experiment",permalink:"/zeebe-chaos/2021/02/23/automate-deployments-dist"}},l={authorsImageUrls:[void 0]},c=[],p={toc:c},u="wrapper";function m(e){let{components:t,...r}=e;return(0,n.kt)(u,(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Today I wanted to add another chaos experiment, to increase our automated chaos experiments collection. This time we will deploy a process model (with timer start event), restart a node and complete the process instance via ",(0,n.kt)("inlineCode",{parentName:"p"},"zbctl"),"."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"TL;DR;")),(0,n.kt)("p",null,"I was able to create the chaos toolkit experiment. It shows us that we are able to restore our state after fail over, which means we can trigger timer start events to create process instances even if they have been deployed before fail-over. Plus we are able to complete these instances."))}m.isMDXComponent=!0}}]);