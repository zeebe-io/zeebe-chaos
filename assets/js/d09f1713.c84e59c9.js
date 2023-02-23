"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[2657],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>b});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(r),d=o,b=u["".concat(c,".").concat(d)]||u[d]||m[d]||a;return r?n.createElement(b,i(i({ref:t},p),{},{components:r})):n.createElement(b,i({ref:t},p))}));function b(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[u]="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3829:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var n=r(7462),o=(r(7294),r(3905));const a={layout:"posts",title:"Disconnect Leader and one Follower",date:new Date("2021-01-07T00:00:00.000Z"),categories:["chaos_experiment","broker","bpmn"],tags:["availability"],authors:"zell"},i="Chaos Day Summary",l={permalink:"/zeebe-chaos/2021/01/07/disconnect-leader-and-follower",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-01-07-disconnect-leader-and-follower/index.md",source:"@site/blog/2021-01-07-disconnect-leader-and-follower/index.md",title:"Disconnect Leader and one Follower",description:"Happy new year everyone",date:"2021-01-07T00:00:00.000Z",formattedDate:"January 7, 2021",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:7.64,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Disconnect Leader and one Follower",date:"2021-01-07T00:00:00.000Z",categories:["chaos_experiment","broker","bpmn"],tags:["availability"],authors:"zell"},prevItem:{title:"Network partitions",permalink:"/zeebe-chaos/2021/01/19/network-partition"},nextItem:{title:"Message Correlation after Failover",permalink:"/zeebe-chaos/2020/11/24/message-correlation-after-failover"}},c={authorsImageUrls:[void 0]},s=[],p={toc:s},u="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Happy new year everyone \ud83c\udf89"),(0,o.kt)("p",null,"This time I wanted to verify the following hypothesis ",(0,o.kt)("inlineCode",{parentName:"p"},"Disconnecting Leader and one Follower should not make cluster disruptive")," (",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/issues/45"},"#45"),").\nBut in order to do that we need to extract the Leader and Follower node for a partition from the Topology. Luckily in December we got an ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe/pull/5943"},"external contribution")," which allows us to print ",(0,o.kt)("inlineCode",{parentName:"p"},"zbctl status")," as json.\nThis gives us now more possibilities, since we can extract values much better out of it."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"TL;DR")," The experiment was successful \ud83d\udc4d"))}m.isMDXComponent=!0}}]);