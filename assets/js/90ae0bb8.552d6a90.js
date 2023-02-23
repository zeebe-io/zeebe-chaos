"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[3537],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=s(r),f=o,d=p["".concat(l,".").concat(f)]||p[f]||m[f]||a;return r?n.createElement(d,c(c({ref:t},u),{},{components:r})):n.createElement(d,c({ref:t},u))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,c=new Array(a);c[0]=f;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:o,c[1]=i;for(var s=2;s<a;s++)c[s]=r[s];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},3260:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>m,frontMatter:()=>a,metadata:()=>i,toc:()=>s});var n=r(7462),o=(r(7294),r(3905));const a={layout:"posts",title:"Non-graceful Shutdown Broker",date:new Date("2020-10-20T00:00:00.000Z"),categories:["chaos_experiment","broker"],authors:"zell"},c="Chaos Day Summary",i={permalink:"/zeebe-chaos/2020/10/20/non-graceful-shutdown",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-10-20-non-graceful-shutdown/index.md",source:"@site/blog/2020-10-20-non-graceful-shutdown/index.md",title:"Non-graceful Shutdown Broker",description:"Today I had not much time for the chaos day, because of writing Gameday Summary, Incident review, taking part of incidents etc. So enough chaos for one day :)",date:"2020-10-20T00:00:00.000Z",formattedDate:"October 20, 2020",tags:[],readingTime:1.83,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Non-graceful Shutdown Broker",date:"2020-10-20T00:00:00.000Z",categories:["chaos_experiment","broker"],authors:"zell"},prevItem:{title:"Investigate failing Chaos Tests",permalink:"/zeebe-chaos/2020/11/03/investigate-failing-tests"},nextItem:{title:"Gateway memory consumption",permalink:"/zeebe-chaos/2020/10/27/standalone-gw-memory"}},l={authorsImageUrls:[void 0]},s=[],u={toc:s},p="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Today I had not much time for the chaos day, because of writing Gameday Summary, Incident review, taking part of incidents etc. So enough chaos for one day :)"),(0,o.kt)("p",null,"But I wanted to merge the PR from Peter and test how our brokers behave if they are not gracefully shutdown.\nI did that on Wednesday (21-10-2020)."))}m.isMDXComponent=!0}}]);