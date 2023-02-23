"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[2274],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),c=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),f=n,h=u["".concat(s,".").concat(f)]||u[f]||m[f]||o;return r?a.createElement(h,i(i({ref:t},p),{},{components:r})):a.createElement(h,i({ref:t},p))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:n,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}f.displayName="MDXCreateElement"},4087:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=r(7462),n=(r(7294),r(3905));const o={layout:"posts",title:"Gateway Network Partition",date:new Date("2020-06-25T00:00:00.000Z"),categories:["chaos_experiment","gateway"],authors:"zell"},i="Chaos Day Summary",l={permalink:"/zeebe-chaos/2020/06/25/gateway-network-partition",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-06-25-gateway-network-partition/index.md",source:"@site/blog/2020-06-25-gateway-network-partition/index.md",title:"Gateway Network Partition",description:"* Documented failure cases for AsyncSnasphortDirector. Gave me some ideas where it might make sense to reinstall partition. Discussed a bit with @Deepthi",date:"2020-06-25T00:00:00.000Z",formattedDate:"June 25, 2020",tags:[],readingTime:2.34,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Gateway Network Partition",date:"2020-06-25T00:00:00.000Z",categories:["chaos_experiment","gateway"],authors:"zell"},prevItem:{title:"Extract K8 resources from namespace",permalink:"/zeebe-chaos/2020/07/02/extract-k8-resources"},nextItem:{title:"Correlate Message after failover",permalink:"/zeebe-chaos/2020/06/18/correlate-message-after-failover"}},s={authorsImageUrls:[void 0]},c=[],p={toc:c},u="wrapper";function m(e){let{components:t,...r}=e;return(0,n.kt)(u,(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Documented failure cases for AsyncSnasphortDirector. Gave me some ideas where it might make sense to reinstall partition. Discussed a bit with @Deepthi"),(0,n.kt)("li",{parentName:"ul"},"Still our automated chaos experiments are not running. I need some time for that, but I had no time for that today."),(0,n.kt)("li",{parentName:"ul"},"Run a chaos experiment together with @pihme, where we do a network partition with the gateway.")))}m.isMDXComponent=!0}}]);