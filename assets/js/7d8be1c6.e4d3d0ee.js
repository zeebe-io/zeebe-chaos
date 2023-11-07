"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[2085],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(r),d=a,h=u["".concat(l,".").concat(d)]||u[d]||m[d]||o;return r?n.createElement(h,i(i({ref:t},p),{},{components:r})):n.createElement(h,i({ref:t},p))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},22873:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var n=r(87462),a=(r(67294),r(3905));const o={layout:"posts",title:"Big Multi Instance",date:new Date("2020-07-16T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],authors:"zell"},i="Chaos Day Summary",c={permalink:"/zeebe-chaos/2020/07/16/big-multi-instance",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-07-16-big-multi-instance/index.md",source:"@site/blog/2020-07-16-big-multi-instance/index.md",title:"Big Multi Instance",description:"* investigate and fix automated chaos experiments - works again with 88c404f and cd8d685",date:"2020-07-16T00:00:00.000Z",formattedDate:"July 16, 2020",tags:[],readingTime:2.82,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Big Multi Instance",date:"2020-07-16T00:00:00.000Z",categories:["chaos_experiment","bpmn"],authors:"zell"},prevItem:{title:"Experiment without Exporters",permalink:"/zeebe-chaos/2020/07/30/experiment-without-exporters"},nextItem:{title:"Experiment with Timers and Huge Variables",permalink:"/zeebe-chaos/2020/07/09/timer-and-huge-variables"}},l={authorsImageUrls:[void 0]},s=[],p={toc:s},u="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"investigate and fix automated chaos experiments - works again with ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/zeebe-io/zeebe-chaos/commit/88c404f97514d4a7a511ce9751085acdd1720cd9"},"88c404f")," and ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/zeebe-io/zeebe-chaos/commit/cd8d685b83eaa1ac9050ad3d16868389e1c0c36d"},"cd8d685")),(0,a.kt)("li",{parentName:"ul"},"Closed some issues in the backlog"),(0,a.kt)("li",{parentName:"ul"},"Run a chaos experiment with bigger multi instance to reach ",(0,a.kt)("inlineCode",{parentName:"li"},"maxMessageSize"))))}m.isMDXComponent=!0}}]);