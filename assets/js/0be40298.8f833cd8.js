"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[9227],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return u}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),h=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=h(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=h(n),u=r,m=d["".concat(s,".").concat(u)]||d[u]||c[u]||o;return n?a.createElement(m,i(i({ref:t},p),{},{components:n})):a.createElement(m,i({ref:t},p))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var h=2;h<o;h++)i[h]=n[h];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9292:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return h},assets:function(){return p},toc:function(){return c},default:function(){return u}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),i=["components"],l={layout:"posts",title:"Multiple Leader Changes",date:new Date("2020-10-13T00:00:00.000Z"),categories:["chaos_experiment","broker"],authors:"zell"},s="Chaos Day Summary",h={permalink:"/zeebe-chaos/2020/10/13/multiple-leader-changes",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2020-10-13-multiple-leader-changes/index.md",source:"@site/blog/2020-10-13-multiple-leader-changes/index.md",title:"Multiple Leader Changes",description:"Today I wanted to add new chaostoolkit experiment, which we can automate.",date:"2020-10-13T00:00:00.000Z",formattedDate:"October 13, 2020",tags:[],readingTime:3.39,truncated:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],prevItem:{title:"Gateway memory consumption",permalink:"/zeebe-chaos/2020/10/27/standalone-gw-memory"},nextItem:{title:"Play around with ToxiProxy",permalink:"/zeebe-chaos/2020/10/06/toxi-proxy"}},p={authorsImageUrls:[void 0]},c=[{value:"Chaos Experiment: Multiple Leader Elections",id:"chaos-experiment-multiple-leader-elections",children:[{value:"Steady State",id:"steady-state",children:[]},{value:"Hypothesis",id:"hypothesis",children:[]},{value:"Method",id:"method",children:[]},{value:"Result",id:"result",children:[]}]},{value:"Chaos Experiment: High Load",id:"chaos-experiment-high-load",children:[{value:"Steady State",id:"steady-state-1",children:[]},{value:"Hypothesis",id:"hypothesis-1",children:[]},{value:"Method",id:"method-1",children:[]},{value:"Result",id:"result-1",children:[]}]},{value:"Participants",id:"participants",children:[]}],d={toc:c};function u(e){var t=e.components,l=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},d,l,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Today I wanted to add new chaostoolkit experiment, which we can automate.\nWe already have experiments like restarting followers and leaders for a partition, but in the past what also caused issues was multiple restarts/leader changes\nin a short period of time. This is the reason why I created ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/issues/39"},"#39"),". "),(0,o.kt)("h2",{id:"chaos-experiment-multiple-leader-elections"},"Chaos Experiment: Multiple Leader Elections"),(0,o.kt)("p",null,"In order to reduce the blast radius I setup an new Zeebe cluster with one partition (clusterplan: production-s). This makes it possible that we exactly restart the leader for that one partition.\nLater we can also try it out with multiple partitions. In our automated environment it is anyway executed with multiple partitions."),(0,o.kt)("h3",{id:"steady-state"},"Steady State"),(0,o.kt)("p",null,"All Brokers are ready and we are able to create new workflow instances on the partition one."),(0,o.kt)("h3",{id:"hypothesis"},"Hypothesis"),(0,o.kt)("p",null,"Even if we cause multiple leader changes due to broker restarts we should still be able to start new workflow instances on the corresponding partition."),(0,o.kt)("h3",{id:"method"},"Method"),(0,o.kt)("p",null,"We requesting the Topology, determine the leader for partition one restart that corresponding node and wait until it is up again. We repeat that multiple times (three times)."),(0,o.kt)("h3",{id:"result"},"Result"),(0,o.kt)("p",null,"The corresponding experiment was added via this ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/commit/11c3a96fc87991f649fb1559363ba335b2bf42a1"},"commit"),".\nWe were able to prove that our hypothesis is true. we are able to handle multiple leader changes even in a short period of time."),(0,o.kt)("h4",{id:"metrics"},"Metrics"),(0,o.kt)("p",null,"In the metrics we can see the behavior during the experiment and also we can see that it becomes healthy at the end."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"general.png",src:n(3585).Z})),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"atomix.png",src:n(9831).Z})),(0,o.kt)("p",null,"I also run this with a cluster plan M cluster with the same results:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"multiple.png",src:n(6977).Z})),(0,o.kt)("h4",{id:"chaostoolkit"},"Chaostoolkit"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"(chaostk) [zell kubernetes/ ns:4ac065c1-a67e-4f47-8782-38a10d67515d-zeebe]$ chaos run multiple-leader-restart/experiment.json \n[2020-10-13 14:01:30 INFO] Validating the experiment's syntax\n[2020-10-13 14:01:30 INFO] Experiment looks valid\n[2020-10-13 14:01:30 INFO] Running experiment: Zeebe Leader restart multiple times experiment\n[2020-10-13 14:01:30 INFO] Steady-state strategy: default\n[2020-10-13 14:01:30 INFO] Rollbacks strategy: default\n[2020-10-13 14:01:30 INFO] Steady state hypothesis: Zeebe is alive\n[2020-10-13 14:01:30 INFO] Probe: All pods should be ready\n[2020-10-13 14:01:30 INFO] Probe: Should be able to create workflow instances on partition one\n[2020-10-13 14:01:32 INFO] Steady state hypothesis is met!\n[2020-10-13 14:01:32 INFO] Playing your experiment's method now...\n[2020-10-13 14:01:32 INFO] Action: Terminate leader of partition one\n[2020-10-13 14:01:42 INFO] Pausing after activity for 5s...\n[2020-10-13 14:01:47 INFO] Probe: All pods should be ready\n[2020-10-13 14:02:32 INFO] Action: Terminate leader of partition one\n[2020-10-13 14:02:41 INFO] Pausing after activity for 5s...\n[2020-10-13 14:02:46 INFO] Probe: All pods should be ready\n[2020-10-13 14:03:23 INFO] Action: Terminate leader of partition one\n[2020-10-13 14:03:33 INFO] Pausing after activity for 5s...\n[2020-10-13 14:03:38 INFO] Steady state hypothesis: Zeebe is alive\n[2020-10-13 14:03:38 INFO] Probe: All pods should be ready\n[2020-10-13 14:04:12 INFO] Probe: Should be able to create workflow instances on partition one\n[2020-10-13 14:04:16 INFO] Steady state hypothesis is met!\n[2020-10-13 14:04:16 INFO] Let's rollback...\n[2020-10-13 14:04:16 INFO] No declared rollbacks, let's move on.\n[2020-10-13 14:04:16 INFO] Experiment ended with status: completed\n")),(0,o.kt)("h2",{id:"chaos-experiment-high-load"},"Chaos Experiment: High Load"),(0,o.kt)("p",null,"As mentioned last week @pihme has reported voluntarily that he wants to implement another chaos experiment.\nHe worked on #7, where we expect that even we put high load on the Zeebe cluster we will cause no leader changes. This was in the past an failure case, where high load disrupted the cluster."),(0,o.kt)("h3",{id:"steady-state-1"},"Steady State"),(0,o.kt)("p",null,"All Brokers are ready and we can create workflow instances on all partitions. We store the begining topology for later."),(0,o.kt)("h3",{id:"hypothesis-1"},"Hypothesis"),(0,o.kt)("p",null,"We expect that even on high load we are not able to disrupt the cluster and that this will not cause any leader changes."),(0,o.kt)("h3",{id:"method-1"},"Method"),(0,o.kt)("p",null,"Put high load on the cluster for several minutes, via creating workflow instances"),(0,o.kt)("h3",{id:"result-1"},"Result"),(0,o.kt)("p",null,"@pihme create a new PR to add the experiment ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/pull/41"},"#41")," "),(0,o.kt)("h4",{id:"metrics-1"},"Metrics"),(0,o.kt)("p",null,"We see that we already put some load on the cluster but it is not enough to exhaust the request limits and reach back pressure."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"highload",src:n(9388).Z})),(0,o.kt)("p",null,"We neeed to find a good way how put high load on the Zeebe cluster. We will continue on this."),(0,o.kt)("h2",{id:"participants"},"Participants"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"@pihme"),(0,o.kt)("li",{parentName:"ul"},"@zelldon")))}u.isMDXComponent=!0},9831:function(e,t,n){t.Z=n.p+"assets/images/atomix-21a9647bff5ea46a48d314b015a95687.png"},3585:function(e,t,n){t.Z=n.p+"assets/images/general-c5d51de85e74d262744025b00dcbb6f8.png"},9388:function(e,t,n){t.Z=n.p+"assets/images/highload-d7d6a7b22d9314ca056bb4b669dfe8fd.png"},6977:function(e,t,n){t.Z=n.p+"assets/images/multiple-6ca96f4dfef92ecc711e92eb2f739444.png"}}]);