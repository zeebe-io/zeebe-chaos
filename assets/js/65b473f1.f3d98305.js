"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[7793],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var a=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,o=function(e,t){if(null==e)return{};var r,a,o={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,o=e.mdxType,n=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),m=o,d=u["".concat(s,".").concat(m)]||u[m]||h[m]||n;return r?a.createElement(d,i(i({ref:t},p),{},{components:r})):a.createElement(d,i({ref:t},p))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var n=r.length,i=new Array(n);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<n;c++)i[c]=r[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},88812:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>h,frontMatter:()=>n,metadata:()=>l,toc:()=>c});var a=r(87462),o=(r(67294),r(3905));const n={layout:"posts",title:"First Chaos Day!",date:new Date("2020-06-04T00:00:00.000Z"),categories:["chaos_experiment","broker"],authors:"zell"},i="Chaos Day Summary",l={permalink:"/zeebe-chaos/2020/06/04/first-chaos-day",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-06-04-first-chaos-day/index.md",source:"@site/blog/2020-06-04-first-chaos-day/index.md",title:"First Chaos Day!",description:"First Chaos day",date:"2020-06-04T00:00:00.000Z",formattedDate:"June 4, 2020",tags:[],readingTime:1.095,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"First Chaos Day!",date:"2020-06-04T00:00:00.000Z",categories:["chaos_experiment","broker"],authors:"zell"},prevItem:{title:"High CPU load on Standalone Gateway",permalink:"/zeebe-chaos/2020/06/11/high-cpu-gateway"}},s={authorsImageUrls:[void 0]},c=[],p={toc:c},u="wrapper";function h(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"First Chaos day \ud83c\udf89"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Documented failure cases for exporter (already some exist, it seemed) gave me a new idea for ZEP"),(0,o.kt)("li",{parentName:"ul"},"Introduced Peter to our Chaos Repository, discussed a bit about the hypothesis backlog, reopened the Chaos Trello board where we will organize ourselves"),(0,o.kt)("li",{parentName:"ul"},"Run a chaos experiment, where we put high CPU load on the Leader ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/zeebe-io/zeebe-chaos/issues/6"},"#6"))))}h.isMDXComponent=!0}}]);