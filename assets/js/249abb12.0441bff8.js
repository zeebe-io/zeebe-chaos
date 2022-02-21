"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[6396],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),h=o,m=d["".concat(s,".").concat(h)]||d[h]||p[h]||a;return n?r.createElement(m,i(i({ref:t},u),{},{components:n})):r.createElement(m,i({ref:t},u))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5481:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},assets:function(){return u},toc:function(){return p},default:function(){return h}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={layout:"posts",title:"Non-graceful Shutdown Broker",date:new Date("2020-10-20T00:00:00.000Z"),categories:["chaos_experiment","broker"],authors:"zell"},s="Chaos Day Summary",c={permalink:"/zeebe-chaos/2020/10/20/non-graceful-shutdown",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-10-20-non-graceful-shutdown/index.md",source:"@site/blog/2020-10-20-non-graceful-shutdown/index.md",title:"Non-graceful Shutdown Broker",description:"Today I had not much time for the chaos day, because of writing Gameday Summary, Incident review, taking part of incidents etc. So enough chaos for one day :)",date:"2020-10-20T00:00:00.000Z",formattedDate:"October 20, 2020",tags:[],readingTime:1.83,truncated:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],prevItem:{title:"Investigate failing Chaos Tests",permalink:"/zeebe-chaos/2020/11/03/investigate-failing-tests"},nextItem:{title:"Gateway memory consumption",permalink:"/zeebe-chaos/2020/10/27/standalone-gw-memory"}},u={authorsImageUrls:[void 0]},p=[{value:"PR Merge",id:"pr-merge",children:[]},{value:"Non-graceful shutdown",id:"non-graceful-shutdown",children:[]},{value:"Participants",id:"participants",children:[]}],d={toc:p};function h(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Today I had not much time for the chaos day, because of writing Gameday Summary, Incident review, taking part of incidents etc. So enough chaos for one day :)"),(0,a.kt)("p",null,"But I wanted to merge the PR from Peter and test how our brokers behave if they are not gracefully shutdown.\nI did that on Wednesday (21-10-2020)."),(0,a.kt)("h2",{id:"pr-merge"},"PR Merge"),(0,a.kt)("p",null,"I tried again the new chaos experiment with a Production M cluster, before merging. It worked quite smooth.\nPR is merged ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/pull/41"},"#41")," \ud83c\udf89"),(0,a.kt)("h2",{id:"non-graceful-shutdown"},"Non-graceful shutdown"),(0,a.kt)("p",null,"Currently in our experiments we do a normal ",(0,a.kt)("inlineCode",{parentName:"p"},"kubectl delete pod"),", which does an graceful shutdown. The application has time to stop it's services etc. It would be interesting how Zeebe handles non-graceful shutdowns. In order to achieve that we can use the option ",(0,a.kt)("inlineCode",{parentName:"p"},"--grace-period=0"),". For more information you can read for example ",(0,a.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/run-application/force-delete-stateful-set-pod/#force-deletion"},"this")),(0,a.kt)("p",null,"I added additional experiments to our normal follower and leader restarts experiments, such that we have both graceful and non-graceful restarts.\nBoth seem to work without any issues. I was also able to fix some bash script error with the help of ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/koalaman/shellcheck"},"shellcheck"),". Related issue ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/issues/42"},"https://github.com/zeebe-io/zeebe-chaos/issues/42"),"."),(0,a.kt)("p",null,"Example output:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"(chaostk) [zell kubernetes/ ns:f45d4dee-f73a-4733-9cd4-a4aa8b022376-zeebe]$ chaos run leader-terminate/experiment.json \n[2020-10-21 15:57:23 INFO] Validating the experiment's syntax\n[2020-10-21 15:57:23 INFO] Experiment looks valid\n[2020-10-21 15:57:23 INFO] Running experiment: Zeebe Leader restart non-graceful experiment\n[2020-10-21 15:57:23 INFO] Steady-state strategy: default\n[2020-10-21 15:57:23 INFO] Rollbacks strategy: default\n[2020-10-21 15:57:23 INFO] Steady state hypothesis: Zeebe is alive\n[2020-10-21 15:57:23 INFO] Probe: All pods should be ready\n[2020-10-21 15:57:23 INFO] Probe: Should be able to create workflow instances on partition 3\n[2020-10-21 15:57:27 INFO] Steady state hypothesis is met!\n[2020-10-21 15:57:27 INFO] Playing your experiment's method now...\n[2020-10-21 15:57:27 INFO] Action: Terminate leader of partition 3 non-gracefully\n[2020-10-21 15:57:33 INFO] Steady state hypothesis: Zeebe is alive\n[2020-10-21 15:57:33 INFO] Probe: All pods should be ready\n[2020-10-21 15:58:28 INFO] Probe: Should be able to create workflow instances on partition 3\n[2020-10-21 15:58:32 INFO] Steady state hypothesis is met!\n[2020-10-21 15:58:32 INFO] Let's rollback...\n[2020-10-21 15:58:32 INFO] No declared rollbacks, let's move on.\n[2020-10-21 15:58:32 INFO] Experiment ended with status: completed\n")),(0,a.kt)("p",null,"Related commits:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/zeebe-io/zeebe-chaos/commit/e6260cb8612a983c8ed74fd2a37a249987ad3d3d"},"Restart leader non-gracefully")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/zeebe-io/zeebe-chaos/commit/63c481c0c7dd7026f03be4e51d61a918613b0140"},"Restart follower non-gracefully"))),(0,a.kt)("h2",{id:"participants"},"Participants"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"@zelldon")))}h.isMDXComponent=!0}}]);