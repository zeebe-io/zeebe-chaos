"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[9722],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>y});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),c=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),h=n,y=u["".concat(s,".").concat(h)]||u[h]||m[h]||o;return r?a.createElement(y,i(i({ref:t},p),{},{components:r})):a.createElement(y,i({ref:t},p))}));function y(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:n,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}h.displayName="MDXCreateElement"},372:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=r(7462),n=(r(7294),r(3905));const o={layout:"posts",title:"Recursive call activity",date:new Date("2023-02-23T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["availability"],authors:"zell"},i="Chaos Day Summary",l={permalink:"/zeebe-chaos/2023/02/23/Recursive-call-activity",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2023-02-23-Recursive-call-activity/index.md",source:"@site/blog/2023-02-23-Recursive-call-activity/index.md",title:"Recursive call activity",description:"Long time no see. Happy to do my first chaos day this year. In the last week have implemented interesting features, which I would like to experiment with.",date:"2023-02-23T00:00:00.000Z",formattedDate:"February 23, 2023",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:4.03,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Recursive call activity",date:"2023-02-23T00:00:00.000Z",categories:["chaos_experiment","bpmn"],tags:["availability"],authors:"zell"},nextItem:{title:"Message Correlation after Network Partition",permalink:"/zeebe-chaos/2022/08/31/Message-Correlation-after-Network-Partition"}},s={authorsImageUrls:[void 0]},c=[],p={toc:c},u="wrapper";function m(e){let{components:t,...r}=e;return(0,n.kt)(u,(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Long time no see. Happy to do my first chaos day this year. In the last week have implemented interesting features, which I would like to experiment with.\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/camunda/zeebe/issues/11416"},"Batch processing")," was one of them."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"TL;DR;")," Chaos experiment failed. \ud83d\udca5 Batch processing doesn't seem to respect the configured limit, which causes issues with processing and influences the health of the system. We found a bug \ud83d\udcaa"))}m.isMDXComponent=!0}}]);