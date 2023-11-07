"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[5547],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>g});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},b=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(r),b=a,g=u["".concat(c,".").concat(b)]||u[b]||m[b]||o;return r?n.createElement(g,i(i({ref:t},l),{},{components:r})):n.createElement(g,i({ref:t},l))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=b;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}b.displayName="MDXCreateElement"},54762:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var n=r(87462),a=(r(67294),r(3905));const o={layout:"posts",title:"Hot backups impact on processing",date:new Date("2023-11-07T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["availability"],authors:"zell"},i="Chaos Day Summary",s={permalink:"/zeebe-chaos/2023/11/07/Hot-backups-impact-on-processing",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2023-11-07-Hot-backups-impact-on-processing/index.md",source:"@site/blog/2023-11-07-Hot-backups-impact-on-processing/index.md",title:"Hot backups impact on processing",description:"Today, we want to experiment with hot backups in SaaS and a larger runtime state in Zeebe and how it impacts the ongoing processing in Zeebe (or not?). This is part of the investigation of a recently created bug issue we wanted to verify/reproduce #14696.",date:"2023-11-07T00:00:00.000Z",formattedDate:"November 7, 2023",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:3.82,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Hot backups impact on processing",date:"2023-11-07T00:00:00.000Z",categories:["chaos_experiment","bpmn"],tags:["availability"],authors:"zell"},nextItem:{title:"Using Large Multi-Instance",permalink:"/zeebe-chaos/2023/06/02/Using-Large-Multi-Instance"}},c={authorsImageUrls:[void 0]},p=[],l={toc:p},u="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Today, we want to experiment with hot backups in SaaS and a larger runtime state in Zeebe and how it impacts the ongoing processing in Zeebe (or not?). This is part of the investigation of a recently created bug issue we wanted to verify/reproduce ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/camunda/zeebe/issues/14696"},"#14696"),"."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"TL;DR;")," We were able to prove that hot backups are indeed not impacting overall processing throughput in Zeebe. We found that having a full Elasticsearch disk might impact or even fail your backups, which is intransparent to the user."))}m.isMDXComponent=!0}}]);