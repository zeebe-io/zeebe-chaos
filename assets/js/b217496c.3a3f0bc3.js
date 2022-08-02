"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[1961],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=c(n),h=a,d=m["".concat(l,".").concat(h)]||m[h]||p[h]||o;return n?r.createElement(d,i(i({ref:t},u),{},{components:n})):r.createElement(d,i({ref:t},u))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8487:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},assets:function(){return u},toc:function(){return p},default:function(){return h}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],s={layout:"posts",title:"Bring Deployment distribution experiment back",date:new Date("2022-08-02T00:00:00.000Z"),categories:["chaos_experiment","bpmn","deployment"],tags:["availability"],authors:"zell"},l="Chaos Day Summary",c={permalink:"/zeebe-chaos/2022/08/02/deployment-distribution",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2022-08-02-deployment-distribution/index.md",source:"@site/blog/2022-08-02-deployment-distribution/index.md",title:"Bring Deployment distribution experiment back",description:"We encountered recently a severe bug zeebe#9877 where I was wondering why we haven't spotted it earlier, since we have chaos experiments for it. I realized two things:",date:"2022-08-02T00:00:00.000Z",formattedDate:"August 2, 2022",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:9.62,truncated:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],nextItem:{title:"Standalone Gateway in CCSaaS",permalink:"/zeebe-chaos/2022/02/15/Standalone-Gateway-in-CCSaaS"}},u={authorsImageUrls:[void 0]},p=[],m={toc:p};function h(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"We encountered recently a severe bug ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/camunda/zeebe/issues/9877"},"zeebe#9877")," where I was wondering why we haven't spotted it earlier, since we have chaos experiments for it. I realized two things:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"The experiments only check for parts of it (BPMN resource only). The production code has changed, a new feature have been added (DMN) but the experiments / tests haven't been adjusted."),(0,o.kt)("li",{parentName:"ol"},"More importantly we disabled the automated execution of the deployment distribution experiment because it was flaky due to missing standalone gateway in Camunda Cloud SaaS ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/zeebe-io/zeebe-chaos/issues/61"},"zeebe-io/zeebe-chaos#61"),". This is no longer the case, see ",(0,o.kt)("a",{parentName:"li",href:"/zeebe-chaos/2022/02/15/Standalone-Gateway-in-CCSaaS"},"Standalone Gateway in CCSaaS"))),(0,o.kt)("p",null,"In this chaos day I want to bring the automation of this chaos experiment back to live. If I have still time I want to enhance the experiment. "),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"TL;DR;")," The experiment still worked, our deployment distribution is still resilient against network partitions. It also works with DMN resources. I can enable the experiment again, and we can close ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/issues/61"},"zeebe-io/zeebe-chaos#61"),". Unfortunately, we were not able to reproduce ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/camunda/zeebe/issues/9877"},"zeebe#9877")," but we did some good preparation work for it."))}h.isMDXComponent=!0}}]);