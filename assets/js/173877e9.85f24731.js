"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[4520],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>b});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(r),h=a,b=u["".concat(l,".").concat(h)]||u[h]||m[h]||o;return r?n.createElement(b,i(i({ref:t},p),{},{components:r})):n.createElement(b,i({ref:t},p))}));function b(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},8364:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const o={layout:"posts",title:"Message Correlation after Network Partition",date:new Date("2022-08-31T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["availability"],authors:"zell"},i="Chaos Day Summary",s={permalink:"/zeebe-chaos/2022/08/31/Message-Correlation-after-Network-Partition",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2022-08-31-Message-Correlation-after-Network-Partition/index.md",source:"@site/blog/2022-08-31-Message-Correlation-after-Network-Partition/index.md",title:"Message Correlation after Network Partition",description:"In the last weeks, we made several changes in our core components, we introduce some new abstractions, and changed how we communicate between partitions.",date:"2022-08-31T00:00:00.000Z",formattedDate:"August 31, 2022",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:9.97,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Message Correlation after Network Partition",date:"2022-08-31T00:00:00.000Z",categories:["chaos_experiment","bpmn"],tags:["availability"],authors:"zell"},prevItem:{title:"Recursive call activity",permalink:"/zeebe-chaos/2023/02/23/Recursive-call-activity"},nextItem:{title:"Bring Deployment distribution experiment back",permalink:"/zeebe-chaos/2022/08/02/deployment-distribution"}},l={authorsImageUrls:[void 0]},c=[],p={toc:c},u="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"In the last weeks, we made several changes in our core components, we introduce some new abstractions, and changed how we communicate between partitions."),(0,a.kt)("p",null,"Due to these changes, we thought it might make sense to run some more chaos experiments in that direction and area since our benchmarks also recently found some interesting edge cases."),(0,a.kt)("p",null,"Today we experimented with Message Correlation and what happens when a network partition disturbs the correlation process."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"TL;DR;")," The experiment was partially successful (after retry), we were able to publish messages during a network partition that have been correlated after the network partition. We need to verify whether we can also publish messages before a network partition and during the partition create the related instances."))}m.isMDXComponent=!0}}]);