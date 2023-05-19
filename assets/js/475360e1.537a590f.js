"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[9933],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),h=r,m=p["".concat(s,".").concat(h)]||p[h]||g[h]||o;return n?a.createElement(m,i(i({ref:t},u),{},{components:n})):a.createElement(m,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},8509:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>g,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const o={layout:"posts",title:"Continuing SST Partitioning toggle",date:new Date("2023-05-19T00:00:00.000Z"),categories:["chaos_experiment","configuration"],tags:["availability","data"],authors:"zell"},i="Chaos Day Summary",l={permalink:"/zeebe-chaos/2023/05/19/Continuing-SST-Partitioning-toggle",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2023-05-19-Continuing-SST-Partitioning-toggle/index.md",source:"@site/blog/2023-05-19-Continuing-SST-Partitioning-toggle/index.md",title:"Continuing SST Partitioning toggle",description:"Today we want to continue with the experiment from last Chaos day, but this time",date:"2023-05-19T00:00:00.000Z",formattedDate:"May 19, 2023",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"},{label:"data",permalink:"/zeebe-chaos/tags/data"}],readingTime:8.06,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Continuing SST Partitioning toggle",date:"2023-05-19T00:00:00.000Z",categories:["chaos_experiment","configuration"],tags:["availability","data"],authors:"zell"},nextItem:{title:"SST Partitioning toggle",permalink:"/zeebe-chaos/2023/05/15/SST-Partitioning-toggle"}},s={authorsImageUrls:[void 0]},c=[],u={toc:c},p="wrapper";function g(e){let{components:t,...n}=e;return(0,r.kt)(p,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Today we want to continue with the experiment from ",(0,r.kt)("a",{parentName:"p",href:"/zeebe-chaos/2023/05/15/SST-Partitioning-toggle"},"last Chaos day"),", but this time\nwith a bit more load. This should make sure that we trigger the compaction of RocksDB and cause the SST partitioning to happen, for real."),(0,r.kt)("p",null,"The reasons stay's the same we want to find out whether it would be possible to enable and disable the flag/configuration without issues."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"TL;DR;")," Today's, experiments succeeded :rocket. We were able to show that even with higher number of process instances (bigger state) we can easily disable and enable the SST partitioning flag without issues. I also got a confirmation of a RocksDb contributor that our observations are correct, that we can easily toggle this feature without issues."))}g.isMDXComponent=!0}}]);