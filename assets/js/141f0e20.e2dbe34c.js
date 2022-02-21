"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[1917],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=u(n),m=o,h=d["".concat(s,".").concat(m)]||d[m]||p[m]||a;return n?r.createElement(h,i(i({ref:t},l),{},{components:n})):r.createElement(h,i({ref:t},l))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var u=2;u<a;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2606:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return s},metadata:function(){return u},assets:function(){return l},toc:function(){return p},default:function(){return m}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],c={layout:"posts",title:"Not produce duplicate Keys",date:new Date("2021-11-11T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["data"],authors:"zell"},s="Chaos Day Summary",u={permalink:"/zeebe-chaos/2021/11/11/Not-produce-duplicate-Keys",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-11-11-Not-produce-duplicate-Keys/index.md",source:"@site/blog/2021-11-11-Not-produce-duplicate-Keys/index.md",title:"Not produce duplicate Keys",description:"Due to some incidents and critical bugs we observed in the last weeks, I wanted to spent some time to understand the issues better and experiment how we could detect them. One of the issue we have observed was that keys were generated more than once, so they were no longer unique (#8129). I will describe this property in the next section more in depth.",date:"2021-11-11T00:00:00.000Z",formattedDate:"November 11, 2021",tags:[{label:"data",permalink:"/zeebe-chaos/tags/data"}],readingTime:5.425,truncated:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],prevItem:{title:"Worker count should not impact performance",permalink:"/zeebe-chaos/2021/11/24/Worker-count-should-not-impact-performance"},nextItem:{title:"Throughput on big state",permalink:"/zeebe-chaos/2021/10/29/Throughput-on-big-state"}},l={authorsImageUrls:[void 0]},p=[],d={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Due to some incidents and critical bugs we observed in the last weeks, I wanted to spent some time to understand the issues better and experiment how we could detect them. One of the issue we have observed was that keys were generated more than once, so they were no longer unique (",(0,a.kt)("a",{parentName:"p",href:"https://github.com/camunda-cloud/zeebe/issues/8129"},"#8129"),"). I will describe this property in the next section more in depth."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"TL;DR;")," We were able to design an experiment which helps us to detect duplicated keys in the log. Further work should be done to automate such experiment and run it agains newer versions."))}m.isMDXComponent=!0}}]);