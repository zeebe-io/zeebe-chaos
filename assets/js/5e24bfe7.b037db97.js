"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[1734],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),c=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(r),f=n,h=u["".concat(s,".").concat(f)]||u[f]||m[f]||o;return r?a.createElement(h,l(l({ref:t},p),{},{components:r})):a.createElement(h,l({ref:t},p))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,l=new Array(o);l[0]=f;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:n,l[1]=i;for(var c=2;c<o;c++)l[c]=r[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}f.displayName="MDXCreateElement"},5228:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var a=r(7462),n=(r(7294),r(3905));const o={layout:"posts",title:"Correlate Message after failover",date:new Date("2020-06-18T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],authors:"zell"},l="Chaos day Summary:",i={permalink:"/zeebe-chaos/2020/06/18/correlate-message-after-failover",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-06-18-correlate-message-after-failover/index.md",source:"@site/blog/2020-06-18-correlate-message-after-failover/index.md",title:"Correlate Message after failover",description:"* Documented failure cases for engine and stream processor. I think almost all possible failure cases I can think of we already handle, except problems on reading, which I think can't be handled.",date:"2020-06-18T00:00:00.000Z",formattedDate:"June 18, 2020",tags:[],readingTime:.91,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Correlate Message after failover",date:"2020-06-18T00:00:00.000Z",categories:["chaos_experiment","bpmn"],authors:"zell"},prevItem:{title:"Gateway Network Partition",permalink:"/zeebe-chaos/2020/06/25/gateway-network-partition"},nextItem:{title:"High CPU load on Standalone Gateway",permalink:"/zeebe-chaos/2020/06/11/high-cpu-gateway"}},s={authorsImageUrls:[void 0]},c=[],p={toc:c},u="wrapper";function m(e){let{components:t,...r}=e;return(0,n.kt)(u,(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Documented failure cases for engine and stream processor. I think almost all possible failure cases I can think of we already handle, except problems on reading, which I think can't be handled."),(0,n.kt)("li",{parentName:"ul"},"Checked what the current issue is with the automated chaos experiments. It seems it is a infra problem. You can check the discussion in #infra. It might be affected due to ",(0,n.kt)("a",{parentName:"li",href:"https://jira.camunda.com/browse/INFRA-1292"},"Infra-1292")),(0,n.kt)("li",{parentName:"ul"},"Run a chaos experiment, where we correlate a message after fail over.")))}m.isMDXComponent=!0}}]);