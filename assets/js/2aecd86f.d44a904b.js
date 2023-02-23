"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[2410],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(r),h=a,f=p["".concat(l,".").concat(h)]||p[h]||g[h]||o;return r?n.createElement(f,s(s({ref:t},u),{},{components:r})):n.createElement(f,s({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=h;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:a,s[1]=i;for(var c=2;c<o;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},3075:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>g,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const o={layout:"posts",title:"Investigate failing Chaos Tests",date:new Date("2020-11-03T00:00:00.000Z"),categories:["investigation"],tags:["tests"],authors:"zell"},s="Chaos Day Summary",i={permalink:"/zeebe-chaos/2020/11/03/investigate-failing-tests",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-11-03-investigate-failing-tests/index.md",source:"@site/blog/2020-11-03-investigate-failing-tests/index.md",title:"Investigate failing Chaos Tests",description:"Today as part of the Chaos Day I wanted to investigate why our current Chaos Tests are failing and why our targeting cluster has been broken by them,",date:"2020-11-03T00:00:00.000Z",formattedDate:"November 3, 2020",tags:[{label:"tests",permalink:"/zeebe-chaos/tags/tests"}],readingTime:4.57,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Investigate failing Chaos Tests",date:"2020-11-03T00:00:00.000Z",categories:["investigation"],tags:["tests"],authors:"zell"},prevItem:{title:"Many Job Timeouts",permalink:"/zeebe-chaos/2020/11/11/job-timeouts"},nextItem:{title:"Non-graceful Shutdown Broker",permalink:"/zeebe-chaos/2020/10/20/non-graceful-shutdown"}},l={authorsImageUrls:[void 0]},c=[],u={toc:c},p="wrapper";function g(e){let{components:t,...r}=e;return(0,a.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Today as part of the Chaos Day I wanted to investigate why our current Chaos Tests are failing and why our targeting cluster has been broken by them,\nsee the related issue ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe/issues/5688"},"#5688"),"."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"TL;DR")),(0,a.kt)("p",null,"We found three new bugs regarding the reprocessing detection and deployment distribution, but still were not able to reproduce the real issue."))}g.isMDXComponent=!0}}]);