"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[7246],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),h=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=h(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=h(n),d=o,m=u["".concat(l,".").concat(d)]||u[d]||p[d]||i;return n?a.createElement(m,r(r({ref:t},c),{},{components:n})):a.createElement(m,r({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,r[1]=s;for(var h=2;h<i;h++)r[h]=n[h];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},319:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return h},assets:function(){return c},toc:function(){return p},default:function(){return d}});var a=n(7462),o=n(3366),i=(n(7294),n(3905)),r=["components"],s={layout:"posts",title:"BPMN meets Chaos Engineering",date:new Date("2021-04-03T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["tools"],authors:"zell"},l="BPMN meets Chaos Engineering",h={permalink:"/zeebe-chaos/2021/04/03/bpmn-meets-chaos-engineering",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-04-03-bpmn-meets-chaos-engineering/index.md",source:"@site/blog/2021-04-03-bpmn-meets-chaos-engineering/index.md",title:"BPMN meets Chaos Engineering",description:"On the first of April (2021) we ran our Spring Hackday at Camunda. This is an event where the developers at camunda come together to work on projects they like or on new ideas/approaches they want to try out. This time we (Philipp and me) wanted to orchestrate our Chaos Experiments with BPMN. If you already know how we automated our chaos experiments before, you can skip the next section",date:"2021-04-03T00:00:00.000Z",formattedDate:"April 3, 2021",tags:[{label:"tools",permalink:"/zeebe-chaos/tags/tools"}],readingTime:7.615,truncated:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],prevItem:{title:"Corrupted Snapshot Experiment Investigation",permalink:"/zeebe-chaos/2021/04/29/Corrupted-Snapshot"},nextItem:{title:"Set file immutable",permalink:"/zeebe-chaos/2021/03/30/set-file-immutable"}},c={authorsImageUrls:[void 0]},p=[{value:"Previous Chaos Automation",id:"previous-chaos-automation",children:[{value:"List of Chaos Experiments",id:"list-of-chaos-experiments",children:[]},{value:"Automated Chaos Experiments",id:"automated-chaos-experiments",children:[]},{value:"Challenges",id:"challenges",children:[]}]},{value:"Hackday Project",id:"hackday-project",children:[{value:"Results",id:"results",children:[]},{value:"Further Work",id:"further-work",children:[]}]}],u={toc:p};function d(e){var t=e.components,s=(0,o.Z)(e,r);return(0,i.kt)("wrapper",(0,a.Z)({},u,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"On the first of April (2021) we ran our Spring Hackday at Camunda. This is an event where the developers at camunda come together to work on projects they like or on new ideas/approaches they want to try out. This time we (",(0,i.kt)("a",{parentName:"p",href:"https://github.com/saig0"},"Philipp")," and ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/zelldon"},"me"),") wanted to orchestrate our Chaos Experiments with BPMN. If you already know how we automated our chaos experiments before, you can skip the next section\nand jump directly to the ",(0,i.kt)("a",{parentName:"p",href:"#hackday-project"},"Hackday Project section"),"."),(0,i.kt)("p",null,"In order to understand this blogpost make sure that you have a little understanding of Zeebe, Camunda Cloud and Chaos Engineering. Read the following resources to get a better understanding."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://docs.camunda.io/docs/guides/"},"Get Started with Camund cloud")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://docs.camunda.io/docs/product-manuals/clients/cli-client/get-started"},"Quickstart Guide")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://camunda.com/de/products/cloud/"},"Camunda Cloud")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://docs.camunda.io/docs/product-manuals/zeebe/zeebe-overview/"},"Zeebe Process Engine")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://www.omg.org/spec/BPMN/2.0/About-BPMN/"},"BPMN 2.0")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://principlesofchaos.org/"},"Principles of Chaos"))),(0,i.kt)("h2",{id:"previous-chaos-automation"},"Previous Chaos Automation"),(0,i.kt)("p",null,"In the previous Chaos Day summaries I described that we use ",(0,i.kt)("a",{parentName:"p",href:"https://chaostoolkit.org/"},"ChaosToolkit")," to run our chaos experiments. The chaos experiments have as prerequisite that an Zeebe cluster is already running, on which they should be executed. ChaosToolkit needs/uses a specific DSL to describe and execute Chaos Experiments. An example experiment looks like the following:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "version": "0.1.0",\n    "title": "Zeebe follower restart non-graceful experiment",\n    "description": "Zeebe should be fault-tolerant. Zeebe should be able to handle followers terminations.",\n    "contributions": {\n        "reliability": "high",\n        "availability": "high"\n    },\n    "steady-state-hypothesis": {\n        "title": "Zeebe is alive",\n        "probes": [\n            {\n                "name": "All pods should be ready",\n                "type": "probe",\n                "tolerance": 0,\n                "provider": {\n                    "type": "process",\n                    "path": "verify-readiness.sh",\n                    "timeout": 900\n                }\n            },\n            {\n                "name": "Should be able to create workflow instances on partition 1",\n                "type": "probe",\n                "tolerance": 0,\n                "provider": {\n                    "type": "process",\n                    "path": "verify-steady-state.sh",\n                    "arguments": "1",\n                    "timeout": 900\n                }\n            }\n        ]\n    },\n    "method": [\n        {\n            "type": "action",\n            "name": "Terminate follower of partition 1",\n            "provider": {\n                "type": "process",\n                "path": "terminate-partition.sh",\n                "arguments": [ "Follower", "1"]\n            }\n        }\n    ],\n    "rollbacks": []\n}\n')),(0,i.kt)("p",null,"This JSON describes a chaos experiment where a follower of partition one is terminated, and where we expect that we can create a new process instance before and after this termination. The follower termination should not affect our steady state."),(0,i.kt)("p",null,"In the JSON structure we can see the defined steady state of the Zeebe Cluster and the method/action which should be executed (the chaos which should be injected). The defined steady state is verified at the beginning of the experiment and at the end, after the methods are executed. The execution logic is quite simple. You can also define rollback actions, which should be executed if the experiment fails. Timeouts can be defined for each action and probe. Since the ",(0,i.kt)("inlineCode",{parentName:"p"},"chaosToolkit")," is written in Python you can reference python modules/functions, which should be called during execution. Additionally, it supports bash scripts, which we normally use. Unfortunately bash scripts are sometimes not easy to understand and to maintain. This is one of the reason why we already thought more than once to replace the ",(0,i.kt)("inlineCode",{parentName:"p"},"chaosToolkit")," with something different."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"chaosToolkit")," has more features and extensions, but these are not used by us. "),(0,i.kt)("h3",{id:"list-of-chaos-experiments"},"List of Chaos Experiments"),(0,i.kt)("p",null,"The experiment above is just one experiment of our continuous growing collection of chaos experiments, which we have already defined. There exist chaos experiments for the helm charts, but also for camunda cloud, for each cluster plan separately. You can find them ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/tree/master/chaos-experiments"},"here"),"."),(0,i.kt)("h3",{id:"automated-chaos-experiments"},"Automated Chaos Experiments"),(0,i.kt)("p",null,"Chaos experiments need to be executed continously, not only once. For that we have build an automated pipeline, which runs the chaos experiments every night or if requested. We did that with help of the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-cluster-testbench"},"Zeebe Cluster Testbench"),", we call it just ",(0,i.kt)("inlineCode",{parentName:"p"},"testbench"),". The ",(0,i.kt)("inlineCode",{parentName:"p"},"testbench")," creates for each cluster plan, in camunda cloud, a Zeebe cluster and runs the corresponding experiments against these clusters. The process model looks quite simple."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"chaos-test",src:n(3339).Z})),(0,i.kt)("p",null,"It is executed via a ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-cluster-testbench/tree/develop/core/chaos-workers"},"zbctl chaos worker"),", which is part of the ",(0,i.kt)("inlineCode",{parentName:"p"},"testbench"),". The ",(0,i.kt)("inlineCode",{parentName:"p"},"chaos worker")," polls for new jobs at the ",(0,i.kt)("inlineCode",{parentName:"p"},"testbench"),". On new jobs it executes, based on the cluster plan, against the given/created Zeebe cluster the chaos experiments, via the ",(0,i.kt)("inlineCode",{parentName:"p"},"chaostoolkit"),"."),(0,i.kt)("p",null,"In general this was a good first solution, which is quite extensible since we just needed to add new experiments in the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos"},"zeebe-chaos")," repository and on the next run the experiments are executed, without any further adjustments. "),(0,i.kt)("h3",{id:"challenges"},"Challenges"),(0,i.kt)("p",null,"Still, we had some challenges with this approach. "),(0,i.kt)("h4",{id:"additional-dependency"},"Additional Dependency"),(0,i.kt)("p",null,"With the ",(0,i.kt)("inlineCode",{parentName:"p"},"chaosToolkit")," we had an additional dependency. If you want to implement/write new chaos experiments you need to set up the ",(0,i.kt)("inlineCode",{parentName:"p"},"chaosToolkit")," on your machine, with the correct Python etc. In general the setup guide was straight forward, but still it was something you need to have. It made the adoption harder."),(0,i.kt)("h4",{id:"root-cause-analysis"},"Root Cause Analysis"),(0,i.kt)("p",null,"Due to our setup it was a bit more challenging todo the root cause analysis."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"ChaosOutput",src:n(2923).Z})),(0,i.kt)("p",null,"We run a ",(0,i.kt)("inlineCode",{parentName:"p"},"zbctl")," worker in a docker image, which picks up the ",(0,i.kt)("inlineCode",{parentName:"p"},"chaos")," typed jobs. An ",(0,i.kt)("inlineCode",{parentName:"p"},"zbctl")," worker will complete jobs with the output of the called handler script. This means that everything, which you want to log, needs to be logged in a separate file. The ",(0,i.kt)("inlineCode",{parentName:"p"},"chaosToolkit")," will print its output into an own log file. The output of the bash scripts, which are executed by the ",(0,i.kt)("inlineCode",{parentName:"p"},"chaosToolkit"),", will also end in that ",(0,i.kt)("inlineCode",{parentName:"p"},"chaosToolkit.log")," file. I tried to visualize this a bit with the image above."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"chaos-test",src:n(1076).Z})),(0,i.kt)("p",null,"If the chaos worker completes a job, the process instance in ",(0,i.kt)("inlineCode",{parentName:"p"},"testbench")," is continued. If a chaos experiment fails, then the job is still completed normally, but with an error result. In the process instance execution this means that a different path is taken. The ",(0,i.kt)("inlineCode",{parentName:"p"},"testbench")," will write a slack notification to a specific channel, such that the current Zeebe medic can look at it. "),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"run-test",src:n(2364).Z})),(0,i.kt)("p",null,"After the notification the medic needs to find out which experiment has failed, this is part of the payload of the completed job at least, but he also needs to find out why the experiment failed. For this root cause analysis he has to check the log of the ",(0,i.kt)("inlineCode",{parentName:"p"},"chaostoolkit"),", which is stored somewhere in the chaos worker pod (",(0,i.kt)("inlineCode",{parentName:"p"},"data/chaostoolkit.log")," it is an ever growing log)."),(0,i.kt)("h2",{id:"hackday-project"},"Hackday Project"),(0,i.kt)("p",null,"With our Hackday Project we had two goals:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"lower the bar for team adoption "),(0,i.kt)("li",{parentName:"ol"},"make root cause analysis easier")),(0,i.kt)("p",null,"For that we wanted to replace ",(0,i.kt)("inlineCode",{parentName:"p"},"chaosToolkit")," with a BPMN Process, which should be executed by Zeebe. We wanted to stick with the experiment description (the ",(0,i.kt)("inlineCode",{parentName:"p"},"chaosToolkit"),"/openchaos DSL) for our chaos experiments."),(0,i.kt)("p",null,"We modeled two processes. One root process, which reads for a given cluster plan all experiments and runs then each experiment. This is done via a ",(0,i.kt)("a",{parentName:"p",href:"https://docs.camunda.io/docs/0.25/product-manuals/zeebe/bpmn-workflows/multi-instance/multi-instance/"},"multi instance")," ",(0,i.kt)("a",{parentName:"p",href:"https://docs.camunda.io/docs/reference/bpmn-workflows/call-activities/call-activities/"},"call activity"),"."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"ChaosOutput",src:n(5247).Z})),(0,i.kt)("p",null,"The other process model is used for the real chaos experiment execution. As the ",(0,i.kt)("inlineCode",{parentName:"p"},"chaosToolkit")," execution itself was quite simple, the resulting BPMN model is as well. All activities are\nsequential multi instances, since we can have multiple probes/actions for the steady state, but also for the injection of chaos. On the root level of the process we have an interrupting ",(0,i.kt)("a",{parentName:"p",href:"https://docs.camunda.io/docs/reference/bpmn-workflows/event-subprocesses/event-subprocesses/"},"event sub process")," to timeout the chaos experiment if the experiment takes to long."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"ChaosExperiment",src:n(2411).Z})),(0,i.kt)("p",null,"As payload of the process instances we have the defined chaos experiment in JSON, which we have seen earlier. In this JSON we have all information we need to orchestrate this experiment."),(0,i.kt)("p",null,"We have implemented two Kotlin workers, one to read all experiment JSON files and one to execute the bash scripts, which are referenced in the chaos experiment descriptions. You can find the code ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-chaos/tree/master/chaos-model/chaos-worker"},"here"),", it is just 100 lines long."),(0,i.kt)("h3",{id:"results"},"Results"),(0,i.kt)("p",null,"We orchestrated the follower/leader termination and graceful shutdown experiments via Camunda Cloud and the created process models. The experiments have been executed against another Zeebe cluster successfully."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"success",src:n(1228).Z})),(0,i.kt)("p",null,"To see how we improved the observability, we provoked an experiment to fail. Operate shows use via an incident that an experiment failed, and exactly at which step. "),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"failure",src:n(5251).Z})),(0,i.kt)("p",null,"We can even see the standard output and error output of the executed script in operate, without searching different log files."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"failuremsg",src:n(9775).Z})),(0,i.kt)("p",null,"An timeout of an experiment will look like this:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"timeout",src:n(8290).Z})),(0,i.kt)("p",null,"As we can see the observability improved here a lot. We are able to understand why it failed based on the error message, since the complete error output is printed, and we can see the progress of the process instance on running the chaos experiment. "),(0,i.kt)("p",null,"With these models we were able to completely replace the ",(0,i.kt)("inlineCode",{parentName:"p"},"chaosToolkit")," usage, so in the end we can remove an additional dependency."),(0,i.kt)("h3",{id:"further-work"},"Further Work"),(0,i.kt)("p",null,"Next step would be to integrate this in ",(0,i.kt)("inlineCode",{parentName:"p"},"testbench"),", such that we can replace the old ",(0,i.kt)("inlineCode",{parentName:"p"},"chaos worker"),"."),(0,i.kt)("p",null,"Furthermore, we plan to replace step by step the new worker, which calls the scripts, by workers which have the script logic inside. For example with workers written in go or kotlin. This should improve the adoption and maintainability further."),(0,i.kt)("p",null,"For simplicity and to make progress we modeled quite generic process models, which are feed with the chaos experiment DSL. In the future we can also think of modeling the chaos experiments directly as BPMN model."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Thanks to ",(0,i.kt)("a",{parentName:"strong",href:"https://github.com/pihme"},"Peter")," for giving the impulse and his awesome work on ",(0,i.kt)("inlineCode",{parentName:"strong"},"testbench")," and ",(0,i.kt)("a",{parentName:"strong",href:"https://github.com/saig0"},"Philipp")," which worked with me on this Hackday project.")))}d.isMDXComponent=!0},2923:function(e,t,n){t.Z=n.p+"assets/images/ChaosOutput-d308a3d2d0bcccb37e4f284e6f0644ad.png"},3339:function(e,t,n){t.Z=n.p+"assets/images/chaos-test-8f97386338e64270714be0f3a7adc291.png"},2411:function(e,t,n){t.Z=n.p+"assets/images/chaosExperiment-a625cf5634ccf0629a70f3717115be82.png"},5247:function(e,t,n){t.Z=n.p+"assets/images/chaosToolkit-b205b8a3611844c5a45a1f0a6f0723bd.png"},9775:function(e,t,n){t.Z=n.p+"assets/images/fail-run-output-06271ff74f1049c9036ce88895dfb39e.png"},5251:function(e,t,n){t.Z=n.p+"assets/images/fail-run-4f1f6cbbb18170bd0947abf0a9d471f8.png"},1076:function(e,t,n){t.Z=n.p+"assets/images/failed-chaos-experiment-testbench-31d2cac3b2dd367edfa979255a11ba49.png"},2364:function(e,t,n){t.Z=n.p+"assets/images/run-test-in-camunda-cloud-61406278623b76fb1720819df03769a1.png"},1228:function(e,t,n){t.Z=n.p+"assets/images/success-run-d7e1671a0d070ea7290ae2565902b4a8.png"},8290:function(e,t,n){t.Z=n.p+"assets/images/timeout-run-67874e1d4b6c866fc3c04dfdf16148dd.png"}}]);