"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[1501],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return f}});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),c=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=c(r),f=n,h=m["".concat(s,".").concat(f)]||m[f]||p[f]||o;return r?a.createElement(h,i(i({ref:t},u),{},{components:r})):a.createElement(h,i({ref:t},u))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7696:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},assets:function(){return u},toc:function(){return p},default:function(){return f}});var a=r(7462),n=r(3366),o=(r(7294),r(3905)),i=["components"],l={layout:"posts",title:"Correlate Message after failover",date:new Date("2020-06-18T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],authors:"zell"},s="Chaos day Summary:",c={permalink:"/zeebe-chaos/2020/06/18/correlate-message-after-failover",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-06-18-correlate-message-after-failover/index.md",source:"@site/blog/2020-06-18-correlate-message-after-failover/index.md",title:"Correlate Message after failover",description:"* Documented failure cases for engine and stream processor. I think almost all possible failure cases I can think of we already handle, except problems on reading, which I think can't be handled.",date:"2020-06-18T00:00:00.000Z",formattedDate:"June 18, 2020",tags:[],readingTime:.91,truncated:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],prevItem:{title:"Gateway Network Partition",permalink:"/zeebe-chaos/2020/06/25/gateway-network-partition"},nextItem:{title:"High CPU load on Standalone Gateway",permalink:"/zeebe-chaos/2020/06/11/high-cpu-gateway"}},u={authorsImageUrls:[void 0]},p=[{value:"Chaos Experiment",id:"chaos-experiment",children:[]}],m={toc:p};function f(e){var t=e.components,r=(0,n.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Documented failure cases for engine and stream processor. I think almost all possible failure cases I can think of we already handle, except problems on reading, which I think can't be handled."),(0,o.kt)("li",{parentName:"ul"},"Checked what the current issue is with the automated chaos experiments. It seems it is a infra problem. You can check the discussion in #infra. It might be affected due to ",(0,o.kt)("a",{parentName:"li",href:"https://jira.camunda.com/browse/INFRA-1292"},"Infra-1292")),(0,o.kt)("li",{parentName:"ul"},"Run a chaos experiment, where we correlate a message after fail over.")),(0,o.kt)("h2",{id:"chaos-experiment"},"Chaos Experiment"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Start our normal setup and deploy a workflow with an intermediate message catch event."),(0,o.kt)("li",{parentName:"ul"},"Publish a message and kill a random broker."),(0,o.kt)("li",{parentName:"ul"},"Create a workflow instance and await the result.")),(0,o.kt)("p",null,"I did this experiment several times and it works without any problems, as far as I can tell. First I was wondering that the message was only correlated to one instance, but this seems to be expected ",(0,o.kt)("a",{parentName:"p",href:"https://docs.zeebe.io/reference/message-correlation/message-correlation.html#message-cardinality"},"message-correlation.html#message-cardinality")," So learned something new today about our messages \ud83d\ude01."),(0,o.kt)("p",null,"I prepared already an automatable chaos experiment for that. Have to fine tune it a bit."),(0,o.kt)("p",null,"No pictures today."))}f.isMDXComponent=!0}}]);