"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[7135],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return h}});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=o.createContext({}),p=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),h=a,m=u["".concat(l,".").concat(h)]||u[h]||d[h]||i;return n?o.createElement(m,r(r({ref:t},c),{},{components:n})):o.createElement(m,r({ref:t},c))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,r=new Array(i);r[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,r[1]=s;for(var p=2;p<i;p++)r[p]=n[p];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6184:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return p},assets:function(){return c},toc:function(){return d},default:function(){return h}});var o=n(7462),a=n(3366),i=(n(7294),n(3905)),r=["components"],s={layout:"posts",title:"Bring Deployment distribution experiment back",date:new Date("2022-08-02T00:00:00.000Z"),categories:["chaos_experiment","bpmn","deployment"],tags:["availability"],authors:"zell"},l="Chaos Day Summary",p={permalink:"/zeebe-chaos/2022/08/02/deployment-distribution",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2022-08-02-deployment-distribution/index.md",source:"@site/blog/2022-08-02-deployment-distribution/index.md",title:"Bring Deployment distribution experiment back",description:"We encountered recently a severe bug zeebe#9877 where I was wondering why we haven't spotted it earlier, since we have chaos experiments for it. I realized two things:",date:"2022-08-02T00:00:00.000Z",formattedDate:"August 2, 2022",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:8.155,truncated:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],nextItem:{title:"Standalone Gateway in CCSaaS",permalink:"/zeebe-chaos/2022/02/15/Standalone-Gateway-in-CCSaaS"}},c={authorsImageUrls:[void 0]},d=[{value:"Chaos Experiment",id:"chaos-experiment",children:[{value:"Expected",id:"expected",children:[]},{value:"Actual",id:"actual",children:[]}]},{value:"Further Work",id:"further-work",children:[]},{value:"Found Bugs",id:"found-bugs",children:[]}],u={toc:d};function h(e){var t=e.components,s=(0,a.Z)(e,r);return(0,i.kt)("wrapper",(0,o.Z)({},u,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"We encountered recently a severe bug ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/camunda/zeebe/issues/9877"},"zeebe#9877")," where I was wondering why we haven't spotted it earlier, since we have chaos experiments for it. I realized two things:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"The experiments only check for parts of it (BPMN resource only). The production code has changed, a new feature have been added (DMN) but the experiments / tests haven't been adjusted."),(0,i.kt)("li",{parentName:"ol"},"More importantly we disabled the automated execution of the deployment distribution experiment because it was flaky due to missing standalone gateway in Camunda Cloud SaaS ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/zeebe-io/zeebe-chaos/issues/61"},"zeebe-io/zeebe-chaos#61"),". This is no longer the case, see ",(0,i.kt)("a",{parentName:"li",href:"/zeebe-chaos/2022/02/15/Standalone-Gateway-in-CCSaaS"},"Standalone Gateway in CCSaaS"))),(0,i.kt)("p",null,"In this chaos day I want to bring the automation of this chaos experiment back to live. If I have still time I want to enhance the experiment. "),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"TL;DR;")," The experiment still worked, our deployment distribution is still resilient against network partitions. It also works with DMN resources. I can enable the experiment again and we can close ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/issues/61"},"zeebe-io/zeebe-chaos#61"),"."),(0,i.kt)("h2",{id:"chaos-experiment"},"Chaos Experiment"),(0,i.kt)("h3",{id:"expected"},"Expected"),(0,i.kt)("p",null,"In short, we will disconnect certain leaders and deploy multiple process versions, after connecting the leaders again we expect that the deployments are distributed, and we can create instances of the last version on all partitions. For more details about the original experiment you can read ",(0,i.kt)("a",{parentName:"p",href:"/zeebe-chaos/2021/01/26/deployments"},"Deployment Distribution"),". We will run the existing experiment against the latest minor version, to verify whether the experiment still works. When we enable the experiment again for automation it will be executed against SNAPSHOT automatically."),(0,i.kt)("h3",{id:"actual"},"Actual"),(0,i.kt)("h4",{id:"setup"},"Setup"),(0,i.kt)("p",null,"As a first step we created a new Production-S cluster, which has three partition, three nodes (brokers) and two standalone gateways. The Zeebe version was set to 8.0.4 (latest minor)."),(0,i.kt)("p",null,"It was a while since I used the ",(0,i.kt)("a",{parentName:"p",href:"https://chaostoolkit.org/"},"chaostoolkit")," which is the reason I had to reinstall it again, which is quite simple see ",(0,i.kt)("a",{parentName:"p",href:"https://chaostoolkit.org/reference/usage/install/"},"here"),"."),(0,i.kt)("p",null,"TL;DR:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"python3 -m venv ~/.venvs/chaostk\nsource  ~/.venvs/chaostk/bin/activate\npip install -U chaostoolkit\nchaos --version\n")),(0,i.kt)("h4",{id:"executing-chaos-toolkit"},"Executing chaos toolkit"),(0,i.kt)("p",null,"As mentioned, the deployment distribution was not enabled for Production-S clusters, which is currently the only configuration we test via ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-cluster-testbench"},"Zeebe Testbench"),". We have to use the experiment that is defined under ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/tree/master/chaos-workers/chaos-experiments/camunda-cloud/production-l/deployment-distribution"},"production-l/deployment-distribution"),", which is the same."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"}," chaos run production-l/deployment-distribution/experiment.json \n[2022-08-02 09:35:25 INFO] Validating the experiment's syntax\n[2022-08-02 09:35:25 INFO] Experiment looks valid\n[2022-08-02 09:35:25 INFO] Running experiment: Zeebe deployment distribution\n[2022-08-02 09:35:25 INFO] Steady-state strategy: default\n[2022-08-02 09:35:25 INFO] Rollbacks strategy: default\n[2022-08-02 09:35:25 INFO] Steady state hypothesis: Zeebe is alive\n[2022-08-02 09:35:25 INFO] Probe: All pods should be ready\n[2022-08-02 09:35:25 INFO] Steady state hypothesis is met!\n[2022-08-02 09:35:25 INFO] Playing your experiment's method now...\n[2022-08-02 09:35:25 INFO] Action: Enable net_admin capabilities\n[2022-08-02 09:35:26 WARNING] This process returned a non-zero exit code. This may indicate some error and not what you expected. Please have a look at the logs.\n[2022-08-02 09:35:26 INFO] Pausing after activity for 180s...\n[2022-08-02 09:38:26 INFO] Probe: All pods should be ready\n[2022-08-02 09:38:33 INFO] Action: Create network partition between leaders\n[2022-08-02 09:38:34 WARNING] This process returned a non-zero exit code. This may indicate some error and not what you expected. Please have a look at the logs.\n[2022-08-02 09:38:34 INFO] Action: Deploy different deployment versions.\n[2022-08-02 09:38:40 INFO] Action: Delete network partition\n[2022-08-02 09:38:42 INFO] Probe: Create process instance of latest version on partition one\n[2022-08-02 09:38:43 INFO] Probe: Create process instance of latest version on partition two\n[2022-08-02 09:38:44 INFO] Probe: Create process instance of latest version on partition three\n[2022-08-02 09:38:44 INFO] Steady state hypothesis: Zeebe is alive\n[2022-08-02 09:38:44 INFO] Probe: All pods should be ready\n[2022-08-02 09:38:45 INFO] Steady state hypothesis is met!\n[2022-08-02 09:38:45 INFO] Let's rollback...\n[2022-08-02 09:38:45 INFO] No declared rollbacks, let's move on.\n[2022-08-02 09:38:45 INFO] Experiment ended with status: completed\n")),(0,i.kt)("p",null,"Based from the tool output it looks like it succeed, to make sure it really worked, we will take a look at the logs in stackdriver."),(0,i.kt)("p",null,"In the following logs we can see that deployment distribution is failing for partition 3 and is retried, which is expected and what we wanted."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"2022-08-02 09:38:53.114 CEST zeebe Failed to receive deployment response for partition 3 (on topic 'deployment-response-2251799813685347-3'). Retrying\n2022-08-02 09:38:53.115 CEST zeebe Deployment DISTRIBUTE command for deployment 2251799813685347 was written on partition 3\n2022-08-02 09:38:53.157 CEST zeebe Received new exporter state {elasticsearch=228, MetricsExporter=228} \n2022-08-02 09:38:53.157 CEST zeebe Received new exporter state {elasticsearch=228, MetricsExporter=228}\n2022-08-02 09:38:53.241 CEST zeebe Received new exporter state {elasticsearch=232, MetricsExporter=232}\n2022-08-02 09:38:53.241 CEST zeebe Received new exporter state {elasticsearch=232, MetricsExporter=232}\n2022-08-02 09:38:53.464 CEST zeebe Failed to receive deployment response for partition 3 (on topic 'deployment-response-2251799813685351-3'). Retrying\n2022-08-02 09:38:53.466 CEST zeebe Deployment DISTRIBUTE command for deployment 2251799813685351 was written on partition 3\n2022-08-02 09:38:54.216 CEST zeebe Failed to receive deployment response for partition 3 (on topic 'deployment-response-2251799813685353-3'). Retrying\n2022-08-02 09:38:54.218 CEST zeebe Deployment DISTRIBUTE command for deployment 2251799813685353 was written on partition 3\n2022-08-02 09:38:54.224 CEST zeebe Failed to receive deployment response for partition 3 (on topic 'deployment-response-2251799813685355-3'). Retrying\n2022-08-02 09:38:54.225 CEST zeebe Deployment DISTRIBUTE command for deployment 2251799813685355 was written on partition 3\n2022-08-02 09:38:55.055 CEST zeebe Failed to receive deployment response for partition 3 (on topic 'deployment-response-2251799813685359-3'). Retrying\n2022-08-02 09:38:55.057 CEST zeebe Deployment DISTRIBUTE command for deployment 2251799813685359 was written on partition 3\n2022-08-02 09:38:55.689 CEST zeebe Received new exporter state {elasticsearch=299, MetricsExporter=299}\n2022-08-02 09:38:55.690 CEST zeebe Received new exporter state {elasticsearch=299, MetricsExporter=299}\n2022-08-02 09:38:56.089 CEST zeebe Failed to receive deployment response for partition 3 (on topic 'deployment-response-2251799813685357-3'). Retrying\n2022-08-02 09:38:56.090 CEST zeebe Deployment DISTRIBUTE command for deployment 2251799813685357 was written on partition 3\n2022-08-02 09:38:56.272 CEST zeebe Failed to receive deployment response for partition 3 (on topic 'deployment-response-2251799813685363-3'). Retrying\n2022-08-02 09:38:56.273 CEST zeebe Deployment DISTRIBUTE command for deployment 2251799813685363 was written on partition 3\n2022-08-02 09:38:56.920 CEST zeebe Failed to receive deployment response for partition 3 (on topic 'deployment-response-2251799813685361-3'). Retrying\n2022-08-02 09:38:56.922 CEST zeebe Deployment DISTRIBUTE command for deployment 2251799813685361 was written on partition 3\n2022-08-02 09:39:08.369 CEST zeebe Received new exporter state {elasticsearch=252, MetricsExporter=252}\n")),(0,i.kt)("p",null,"At some point the retry stopped and we can see in the experiment output that we were able to start process instances on all partitions. This is great, because it means the experiment was successful executed and our deployment distribution is failure tolerant."),(0,i.kt)("h4",{id:"enhancement"},"Enhancement"),(0,i.kt)("p",null,"As described earlier the current experiment only deploys a BPMN process model it looks like this:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"v1",src:n(3108).Z})),(0,i.kt)("p",null,"In order to make DMN part of the experiment we change the service task to a ",(0,i.kt)("a",{parentName:"p",href:"https://docs.camunda.io/docs/components/modeler/bpmn/business-rule-tasks/"},"Business Rule task"),". "),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"v2",src:n(8734).Z})),(0,i.kt)("p",null,"The decision is really simply and just defines a static input and returns that as output."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"decision",src:n(409).Z})),(0,i.kt)("p",null,"When we run our experiment and create process instances on all partitions the DMN needs to be available otherwise the execution would fail. Currently, we can't specify a specific version of the DMN in the Business Rule Task (always the latest will be executed). Because of that, we will not deploy different DMN model versions, since it is currently not that easy to verify whether the right version was chosen. "),(0,i.kt)("p",null,"After adjusting the model and adjusting the script, we run the experiment again."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"$ chaos run production-l/deployment-distribution/experiment.json \n[2022-08-02 11:05:12 INFO] Validating the experiment's syntax\n[2022-08-02 11:05:12 INFO] Experiment looks valid\n[2022-08-02 11:05:12 INFO] Running experiment: Zeebe deployment distribution\n[2022-08-02 11:05:12 INFO] Steady-state strategy: default\n[2022-08-02 11:05:12 INFO] Rollbacks strategy: default\n[2022-08-02 11:05:12 INFO] Steady state hypothesis: Zeebe is alive\n[2022-08-02 11:05:12 INFO] Probe: All pods should be ready\n[2022-08-02 11:05:13 INFO] Steady state hypothesis is met!\n[2022-08-02 11:05:13 INFO] Playing your experiment's method now...\n[2022-08-02 11:05:13 INFO] Action: Enable net_admin capabilities\n[2022-08-02 11:05:13 WARNING] This process returned a non-zero exit code. This may indicate some error and not what you expected. Please have a look at the logs.\n[2022-08-02 11:05:13 INFO] Pausing after activity for 180s...\n[2022-08-02 11:08:14 INFO] Probe: All pods should be ready\n[2022-08-02 11:08:14 INFO] Action: Create network partition between leaders\n[2022-08-02 11:08:16 WARNING] This process returned a non-zero exit code. This may indicate some error and not what you expected. Please have a look at the logs.\n[2022-08-02 11:08:16 INFO] Action: Deploy different deployment versions.\n[2022-08-02 11:08:25 INFO] Action: Delete network partition\n[2022-08-02 11:08:27 INFO] Probe: Create process instance of latest version on partition one\n[2022-08-02 11:08:27 INFO] Probe: Create process instance of latest version on partition two\n[2022-08-02 11:08:28 INFO] Probe: Create process instance of latest version on partition three\n[2022-08-02 11:08:29 INFO] Steady state hypothesis: Zeebe is alive\n[2022-08-02 11:08:29 INFO] Probe: All pods should be ready\n[2022-08-02 11:08:29 INFO] Steady state hypothesis is met!\n[2022-08-02 11:08:29 INFO] Let's rollback...\n[2022-08-02 11:08:29 INFO] No declared rollbacks, let's move on.\n[2022-08-02 11:08:29 INFO] Experiment ended with status: completed\n")),(0,i.kt)("p",null,"It succeeded as well."),(0,i.kt)("p",null,"We can see in operate that the process instances have been completed, the business rule task have been executed and the decisions as well."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"businessRuleTask",src:n(3059).Z}),"\n",(0,i.kt)("img",{alt:"decisions",src:n(1155).Z})),(0,i.kt)("p",null,"We can adjust the experiment further to await the result of the process execution, but I will stop here and leave that for a later point."),(0,i.kt)("h2",{id:"further-work"},"Further Work"),(0,i.kt)("p",null,"Based on today's outcome we can enable again the Deployment Distribution experiment for Production-S, such that is executed by Zeebe Testbench (our automation tooling). We can close ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/issues/61"},"zeebe-io/zeebe-chaos#61")),(0,i.kt)("p",null,"We should adjust our Chaos Worker implementation such that we also deploy DMN resources as we did in today's Chaos Day, since the scripts we changed aren't used in the automation."),(0,i.kt)("p",null,"The experiment didn't reproduce the bug in ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/camunda/zeebe/issues/9877"},"zeebe#9877"),", since the DMN resource has to be distributed before the network partition is created and the distribution should be retried. This means the experiment to reproduce the bug is a bit more complex, but I think with today's changes we already did a good step in the right direction, and we can improve based on that. I will create a follow-up issue to improve our experiment."),(0,i.kt)("h2",{id:"found-bugs"},"Found Bugs"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"none")))}h.isMDXComponent=!0},3059:function(e,t,n){t.Z=n.p+"assets/images/businessruletask-cb3cc6dd0a4b8c7974adbb0b9e5c6c3c.png"},409:function(e,t,n){t.Z=n.p+"assets/images/decision-3e1b9db140fbc19b0250ee1fd804a33d.png"},1155:function(e,t,n){t.Z=n.p+"assets/images/decisions-04846ed5d76e8805be3dae396ad498b7.png"},3108:function(e,t,n){t.Z=n.p+"assets/images/multiVersionModel-bae5089e350bb8e3ef1f11b3e01be25c.png"},8734:function(e,t,n){t.Z=n.p+"assets/images/multiVersionModelv2-7fa903fb40c6a640222206e5922de001.png"}}]);