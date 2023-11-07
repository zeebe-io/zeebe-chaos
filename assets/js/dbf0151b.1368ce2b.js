"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[3093],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},b=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(r),b=a,f=p["".concat(c,".").concat(b)]||p[b]||m[b]||o;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=b;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[p]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}b.displayName="MDXCreateElement"},24722:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var n=r(87462),a=(r(67294),r(3905));const o={layout:"posts",title:"Experiment with Timers and Huge Variables",date:new Date("2020-07-09T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],authors:"zell"},i="Chaos Day Summary",l={permalink:"/zeebe-chaos/2020/07/09/timer-and-huge-variables",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-07-09-timer-and-huge-variables/index.md",source:"@site/blog/2020-07-09-timer-and-huge-variables/index.md",title:"Experiment with Timers and Huge Variables",description:"* Failure documentation about RAFT",date:"2020-07-09T00:00:00.000Z",formattedDate:"July 9, 2020",tags:[],readingTime:3.43,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Experiment with Timers and Huge Variables",date:"2020-07-09T00:00:00.000Z",categories:["chaos_experiment","bpmn"],authors:"zell"},prevItem:{title:"Big Multi Instance",permalink:"/zeebe-chaos/2020/07/16/big-multi-instance"},nextItem:{title:"Extract K8 resources from namespace",permalink:"/zeebe-chaos/2020/07/02/extract-k8-resources"}},c={authorsImageUrls:[void 0]},s=[],u={toc:s},p="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Failure documentation about RAFT"),(0,a.kt)("li",{parentName:"ul"},"Added chaos day summaries to repo"),(0,a.kt)("li",{parentName:"ul"},"Run Chaos experiment with a lot of timers"),(0,a.kt)("li",{parentName:"ul"},"Run Chaos experiment with huge variables")))}m.isMDXComponent=!0}}]);