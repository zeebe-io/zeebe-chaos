"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[6480],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>y});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=c(r),h=a,y=u["".concat(p,".").concat(h)]||u[h]||m[h]||o;return r?n.createElement(y,l(l({ref:t},s),{},{components:r})):n.createElement(y,l({ref:t},s))}));function y(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=h;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[u]="string"==typeof e?e:a,l[1]=i;for(var c=2;c<o;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},326:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const o={layout:"posts",title:"Slow Network",date:new Date("2021-07-06T00:00:00.000Z"),categories:["chaos_experiment","broker","network","leader"],tags:["availability"],authors:"zell"},l="Chaos Day Summary",i={permalink:"/zeebe-chaos/2021/07/06/Slow-Network",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-07-06-Slow-Network/index.md",source:"@site/blog/2021-07-06-Slow-Network/index.md",title:"Slow Network",description:"On a previous Chaos Day we played around with ToxiProxy , which allows injecting failures on the network level. For example dropping packages, causing latency etc.",date:"2021-07-06T00:00:00.000Z",formattedDate:"July 6, 2021",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:5.905,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Slow Network",date:"2021-07-06T00:00:00.000Z",categories:["chaos_experiment","broker","network","leader"],tags:["availability"],authors:"zell"},prevItem:{title:"Old-Clients",permalink:"/zeebe-chaos/2021/09/23/Old-Clients"},nextItem:{title:"Full Disk Recovery",permalink:"/zeebe-chaos/2021/06/08/Full-Disk"}},p={authorsImageUrls:[void 0]},c=[],s={toc:c},u="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"On a previous ",(0,a.kt)("a",{parentName:"p",href:"/zeebe-chaos/2020/10/06/toxi-proxy"},"Chaos Day")," we played around with ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Shopify/toxiproxy"},"ToxiProxy")," , which allows injecting failures on the network level. For example dropping packages, causing latency etc."),(0,a.kt)("p",null,"Last week ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/deepthidevaki"},"@Deepthi")," mentioned to me that we can do similar things with ",(0,a.kt)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man8/tc.8.html"},"tc"),", which is a built-in linux command. Today I wanted to experiment with latency between leader and followers using ",(0,a.kt)("inlineCode",{parentName:"p"},"tc"),"."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"TL;DR;")," The experiment failed; With adding 100ms network delay to the Leader we broke the complete processing throughput. \ud83d\udca5"))}m.isMDXComponent=!0}}]);