"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[3811],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>b});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=r.createContext({}),c=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},m="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(a),u=n,b=m["".concat(l,".").concat(u)]||m[u]||h[u]||o;return a?r.createElement(b,i(i({ref:t},p),{},{components:a})):r.createElement(b,i({ref:t},p))}));function b(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:n,i[1]=s;for(var c=2;c<o;c++)i[c]=a[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},76167:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=a(87462),n=(a(67294),a(3905));const o={layout:"posts",title:"Many Job Timeouts",date:new Date("2020-11-11T00:00:00.000Z"),categories:["chaos_experiment","broker"],tags:["availability"],authors:"zell"},i="Chaos Day Summary",s={permalink:"/zeebe-chaos/2020/11/11/job-timeouts",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-11-11-job-timeouts/index.md",source:"@site/blog/2020-11-11-job-timeouts/index.md",title:"Many Job Timeouts",description:"In the last game day (on friday 06.11.2020) I wanted to test whether we can break a partition if many messages time out at the same time. What I did was I send many many messages with a decreasing TTL, which all targeting a specific point in time, such that they will all timeout at the same time. I expected that if this happens that the processor will try to time out all at once and break because the batch is to big. Fortunately this didn't happen, the processor was able to handle this.",date:"2020-11-11T00:00:00.000Z",formattedDate:"November 11, 2020",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:3.885,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Many Job Timeouts",date:"2020-11-11T00:00:00.000Z",categories:["chaos_experiment","broker"],tags:["availability"],authors:"zell"},prevItem:{title:"Message Correlation after Failover",permalink:"/zeebe-chaos/2020/11/24/message-correlation-after-failover"},nextItem:{title:"Investigate failing Chaos Tests",permalink:"/zeebe-chaos/2020/11/03/investigate-failing-tests"}},l={authorsImageUrls:[void 0]},c=[],p={toc:c},m="wrapper";function h(e){let{components:t,...a}=e;return(0,n.kt)(m,(0,r.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"In the last game day (on friday 06.11.2020) I wanted to test whether we can break a partition if many messages time out at the same time. What I did was I send many many messages with a decreasing TTL, which all targeting a specific point in time, such that they will all timeout at the same time. I expected that if this happens that the processor will try to time out all at once and break because the batch is to big. Fortunately this didn't happen, the processor was able to handle this."),(0,n.kt)("p",null,"I wanted to verify the same with job time out's."))}h.isMDXComponent=!0}}]);