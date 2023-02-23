"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[2756],{3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>y});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},m=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),p=c(r),h=o,y=p["".concat(l,".").concat(h)]||p[h]||u[h]||a;return r?n.createElement(y,i(i({ref:t},m),{},{components:r})):n.createElement(y,i({ref:t},m))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},5725:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var n=r(7462),o=(r(7294),r(3905));const a={layout:"posts",title:"Gateway memory consumption",date:new Date("2020-10-20T00:00:00.000Z"),categories:["chaos_experiment","gateway","resources"],authors:"zell"},i="Chaos Day Summary",s={permalink:"/zeebe-chaos/2020/10/27/standalone-gw-memory",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-10-27-standalone-gw-memory/index.md",source:"@site/blog/2020-10-27-standalone-gw-memory/index.md",title:"Gateway memory consumption",description:"In the last weeks I check multiple benchmarks and clusters in incidents. Often I had the feeling that the memory consumption from the gateway is not ideal",date:"2020-10-20T00:00:00.000Z",formattedDate:"October 20, 2020",tags:[],readingTime:3.775,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Gateway memory consumption",date:"2020-10-20T00:00:00.000Z",categories:["chaos_experiment","gateway","resources"],authors:"zell"},prevItem:{title:"Non-graceful Shutdown Broker",permalink:"/zeebe-chaos/2020/10/20/non-graceful-shutdown"},nextItem:{title:"Multiple Leader Changes",permalink:"/zeebe-chaos/2020/10/13/multiple-leader-changes"}},l={authorsImageUrls:[void 0]},c=[],m={toc:c},p="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"In the last weeks I check multiple benchmarks and clusters in incidents. Often I had the feeling that the memory consumption from the gateway is not ideal\nor that there is a memory leak. I wanted to experiment regarding this memory consumptions. Since we saw in investigating ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe/issues/5641"},"https://github.com/zeebe-io/zeebe/issues/5641")," a high memory spike\nwhen the gateway was not able to talk to other nodes I suspected that here might be some bugs hiding"))}u.isMDXComponent=!0}}]);