"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[6352],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},h="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),h=c(n),u=r,m=h["".concat(l,".").concat(u)]||h[u]||d[u]||o;return n?a.createElement(m,s(s({ref:t},p),{},{components:n})):a.createElement(m,s({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[h]="string"==typeof e?e:r,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},9893:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const o={layout:"posts",title:"Fault-tolerant processing of process instances",date:new Date("2021-03-09T00:00:00.000Z"),categories:["chaos_experiment","broker","processing"],tags:["availability","data"],authors:"zell"},s="Chaos Day Summary",i={permalink:"/zeebe-chaos/2021/03/09/cont-workflow-instance",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-03-09-cont-workflow-instance/index.md",source:"@site/blog/2021-03-09-cont-workflow-instance/index.md",title:"Fault-tolerant processing of process instances",description:"Today I wanted to add another chaos experiment, to increase our automated chaos experiments collection. This time we will deploy a process model (with timer start event), restart a node and complete the process instance via zbctl.",date:"2021-03-09T00:00:00.000Z",formattedDate:"March 9, 2021",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"},{label:"data",permalink:"/zeebe-chaos/tags/data"}],readingTime:5.98,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Fault-tolerant processing of process instances",date:"2021-03-09T00:00:00.000Z",categories:["chaos_experiment","broker","processing"],tags:["availability","data"],authors:"zell"},prevItem:{title:"Camunda Cloud network partition",permalink:"/zeebe-chaos/2021/03/23/camunda-cloud-network-partition"},nextItem:{title:"Automating Deployment Distribution Chaos Experiment",permalink:"/zeebe-chaos/2021/02/23/automate-deployments-dist"}},l={authorsImageUrls:[void 0]},c=[{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Expected",id:"expected",level:3},{value:"Experiment Definition",id:"experiment-definition",level:3},{value:"Timer start events",id:"timer-start-events",level:4},{value:"Continue process instance",id:"continue-process-instance",level:4},{value:"Outcome",id:"outcome",level:3},{value:"Testbench",id:"testbench",level:4},{value:"Found Bugs",id:"found-bugs",level:4},{value:"Chaos Experiments not working correctly",id:"chaos-experiments-not-working-correctly",level:5},{value:"Redeployment causes retrigger timer",id:"redeployment-causes-retrigger-timer",level:5}],p={toc:c},h="wrapper";function d(e){let{components:t,...o}=e;return(0,r.kt)(h,(0,a.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Today I wanted to add another chaos experiment, to increase our automated chaos experiments collection. This time we will deploy a process model (with timer start event), restart a node and complete the process instance via ",(0,r.kt)("inlineCode",{parentName:"p"},"zbctl"),"."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"TL;DR;")),(0,r.kt)("p",null,"I was able to create the chaos toolkit experiment. It shows us that we are able to restore our state after fail over, which means we can trigger timer start events to create process instances even if they have been deployed before fail-over. Plus we are able to complete these instances."),(0,r.kt)("h2",{id:"chaos-experiment"},"Chaos Experiment"),(0,r.kt)("p",null,"For testing, I have run our normal setup of three nodes, three partitions and replication factor three in our zeebe gke cluster.\nLater I want to automate the experiment against the production cluster plans."),(0,r.kt)("h3",{id:"expected"},"Expected"),(0,r.kt)("p",null,"We want to verify whether the processing of process instances continues even if we restart a leader in between. For that we do the following experiment:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Verify Steady State: All Pods are ready"),(0,r.kt)("li",{parentName:"ol"},"Introduce Chaos:",(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("em",{parentName:"li"},"Action:")," Deploy process with timer start event (",(0,r.kt)("inlineCode",{parentName:"li"},"PT1M"),")"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("em",{parentName:"li"},"Action:")," Restart leader of partition one"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("em",{parentName:"li"},"Probe:")," We can activate and complete an job of a specific type"))),(0,r.kt)("li",{parentName:"ol"},"Verify Steady State: All Pods are ready")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Note:")," ",(0,r.kt)("em",{parentName:"p"},"We know that timer start events currently only scheduled on partition one, which means it is enough to just restart the leader of partition one for our experiment.")," We use this property to reduce the blast radius. Later we could introduce an intermediate timer catch event and start many workflow instances on multiple partitions to verify whether this works on all partitions."),(0,r.kt)("p",null,"Model will look like this:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"model",src:n(3192).Z,width:"903",height:"276"}),")"),(0,r.kt)("h3",{id:"experiment-definition"},"Experiment Definition"),(0,r.kt)("p",null,"The experiment definition looks like the following:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "version": "0.1.0",\n    "title": "Zeebe process instance continuation",\n    "description": "Zeebe processing of process instances should be fault-tolerant. Zeebe should be able to handle fail-overs and continue process instances after a new leader starts with processing.",\n    "contributions": {\n        "reliability": "high",\n        "availability": "high"\n    },\n    "steady-state-hypothesis": {\n        "title": "Zeebe is alive",\n        "probes": [\n            {\n                "name": "All pods should be ready",\n                "type": "probe",\n                "tolerance": 0,\n                "provider": {\n                    "type": "process",\n                    "path": "verify-readiness.sh",\n                    "timeout": 900\n                }\n            }\n        ]\n    },\n    "method": [\n        {\n            "type": "action",\n            "name": "Deploy process model",\n            "provider": {\n                "type": "process",\n                "path": "deploy-specific-model.sh", \n                "arguments": [ "chaosTimerStart.bpmn" ]\n            }\n        },\n         {\n              "type": "action",\n              "name": "Restart partition leader",\n              "provider": {\n                   "type": "process",\n                   "path": "shutdown-gracefully-partition.sh",\n                   "arguments": [ "Leader", "1" ]\n              }\n         },\n        {\n            "type": "probe",\n            "name": "Complete process instance",\n            "tolerance": 0,\n            "provider": {\n                "type": "process",\n                "path": "complete-instance.sh",\n                "arguments": ["chaos"],\n                "timeout": 900\n            }\n        }\n    ],\n    "rollbacks": []\n}\n')),(0,r.kt)("h4",{id:"timer-start-events"},"Timer start events"),(0,r.kt)("p",null,"In order to trigger the timer start event, after 1 minute, after successful deployment. I used the following ",(0,r.kt)("a",{parentName:"p",href:"https://docs.camunda.io/docs/reference/feel/what-is-feel"},"feel expression"),": ",(0,r.kt)("inlineCode",{parentName:"p"},'=now()+ duration("PT1M")'),". This is necessary, since only date and cycle are supported for ",(0,r.kt)("a",{parentName:"p",href:"https://docs.camunda.io/docs/reference/bpmn-workflows/timer-events/timer-events/#timer-start-events"},"timer start events"),"."),(0,r.kt)("h4",{id:"continue-process-instance"},"Continue process instance"),(0,r.kt)("p",null,"To continue and finish the process instance, we will activate the job with the ",(0,r.kt)("inlineCode",{parentName:"p"},"chaos")," job type and complete that job. If there is no job to activate/complete we will loop here until we reach the timeout. With this we can make sure that the timer was scheduled and the process instance was created even after restart. We are not using here an job worker, since the activate-complete commands make it currently easier to mark it as success or fail. With the job worker we would introduce another concurrency layer. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'#!/bin/bash\nset -euox pipefail\n\nsource utils.sh\n\njobType=$1\nnamespace=$(getNamespace)\npod=$(getGateway)\n\nfunction completeJob() {\n  # we want to first activate the job with the given job type and then complete it with the given job key\n  # if we are not able to activate an job with the given type the function will return an error\n  # and retried from outside\n  jobs=$(kubectl exec -it "$pod" -n "$namespace" -- zbctl --insecure activate jobs "$jobType")\n  key=$(echo "$jobs" | jq -r \'.jobs[0].key\')\n  kubectl exec -it "$pod" -n "$namespace" -- zbctl --insecure complete job "$key"\n}\n\nretryUntilSuccess completeJob\n')),(0,r.kt)("h3",{id:"outcome"},"Outcome"),(0,r.kt)("p",null,"After running this experiment we get the following output, which shows us that the experiment ",(0,r.kt)("strong",{parentName:"p"},"SUCCEEDED"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"(chaostk) [zell helm/ cluster: zeebe-cluster ns:zell-chaos]$ chaos run process-continuation/experiment.json \n[2021-03-09 13:16:34 INFO] Validating the experiment's syntax\n[2021-03-09 13:16:34 INFO] Experiment looks valid\n[2021-03-09 13:16:34 INFO] Running experiment: Zeebe process instance continuation\n[2021-03-09 13:16:34 INFO] Steady-state strategy: default\n[2021-03-09 13:16:34 INFO] Rollbacks strategy: default\n[2021-03-09 13:16:34 INFO] Steady state hypothesis: Zeebe is alive\n[2021-03-09 13:16:34 INFO] Probe: All pods should be ready\n[2021-03-09 13:16:35 INFO] Steady state hypothesis is met!\n[2021-03-09 13:16:35 INFO] Playing your experiment's method now...\n[2021-03-09 13:16:35 INFO] Action: Deploy process model\n[2021-03-09 13:16:37 INFO] Action: Restart partition leader\n[2021-03-09 13:16:46 INFO] Probe: Complete process instance\n[2021-03-09 13:17:38 INFO] Steady state hypothesis: Zeebe is alive\n[2021-03-09 13:17:38 INFO] Probe: All pods should be ready\n[2021-03-09 13:17:38 INFO] Steady state hypothesis is met!\n[2021-03-09 13:17:38 INFO] Let's rollback...\n[2021-03-09 13:17:38 INFO] No declared rollbacks, let's move on.\n")),(0,r.kt)("h4",{id:"testbench"},"Testbench"),(0,r.kt)("p",null,"Tbd."),(0,r.kt)("p",null,"We have currently some problems with running the chaos experiments against camunda cloud, like ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-cluster-testbench/issues/247"},"testbench#247")," or ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/zeebe-io/zeebe-cluster-testbench/issues/248"},"testbench#248"),". This is the reason why I postponed it."),(0,r.kt)("h4",{id:"found-bugs"},"Found Bugs"),(0,r.kt)("h5",{id:"chaos-experiments-not-working-correctly"},"Chaos Experiments not working correctly"),(0,r.kt)("p",null,"I realized that most of the experiments are no longer run correctly, since they referring to ",(0,r.kt)("inlineCode",{parentName:"p"},'"Leader"')," as the raft role, where the raft role in the topology is ",(0,r.kt)("inlineCode",{parentName:"p"},"LEADER"),". This causes that on some experiments pods are not really restarted."),(0,r.kt)("p",null,"Almost everywhere we use constructs like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'\n        {\n            "type": "action",\n            "name": "Terminate leader of partition 3",\n            "provider": {\n                "type": "process",\n                "path": "shutdown-gracefully-partition.sh",\n                "arguments": [ "Leader", "3" ]\n            }\n        }\n')),(0,r.kt)("p",null,"In the utils script we use a ",(0,r.kt)("inlineCode",{parentName:"p"},"jq")," expression to get the node which is in a certain state for a certain partition."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"jq")," expression looks like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'  index=$(echo "$topology" | jq "[.brokers[]|select(.partitions[]| select(.partitionId == $partition) and .role == \\"$state\\")][0].nodeId")\n')),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"jq")," is not able to find the raft ",(0,r.kt)("inlineCode",{parentName:"p"},"state")," which is returned by topology, if we use not capital letters."),(0,r.kt)("p",null,"When we run the chaos experiment we see warnings like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"(chaostk) [zell helm/ cluster: zeebe-cluster ns:zell-chaos]$ chaos run process-continuation/experiment.json \n[2021-03-09 13:27:01 INFO] Validating the experiment's syntax\n[2021-03-09 13:27:01 INFO] Experiment looks valid\n[2021-03-09 13:27:01 INFO] Running experiment: Zeebe process instance continuation\n[2021-03-09 13:27:01 INFO] Steady-state strategy: default\n[2021-03-09 13:27:01 INFO] Rollbacks strategy: default\n[2021-03-09 13:27:01 INFO] Steady state hypothesis: Zeebe is alive\n[2021-03-09 13:27:01 INFO] Probe: All pods should be ready\n[2021-03-09 13:27:02 INFO] Steady state hypothesis is met!\n[2021-03-09 13:27:02 INFO] Playing your experiment's method now...\n[2021-03-09 13:27:02 INFO] Action: Deploy process model\n[2021-03-09 13:27:03 INFO] Action: Restart partition leader\n[2021-03-09 13:27:05 WARNING] This process returned a non-zero exit code. This may indicate some error and not what you expected. Please have a look at the logs.\n\n")),(0,r.kt)("p",null,"The experiment still continues (in effect it does nothing, since it was not able to find the right pod to restart).\nConverting the state into capital letters fixes this issue easily."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'function getIndexOfPodForPartitionInState()\n{\n  partition="$1"\n  # expect caps for raft roles\n  state=${2^^}\n')),(0,r.kt)("h5",{id:"redeployment-causes-retrigger-timer"},"Redeployment causes retrigger timer"),(0,r.kt)("p",null,"During running the chaos experiment and testing the scripts I realized that the timer start event is retriggered everytime I redeployed the exact deployment, which was kind of unexpected.\nI created a bug issue for that ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/camunda-cloud/zeebe/issues/6515"},"zeebe#6515"),"."))}d.isMDXComponent=!0},3192:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/chaosTimerStart-0c9330fda76374b0b56d57e595aea79d.png"}}]);