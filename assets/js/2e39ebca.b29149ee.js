"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[7814],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),h=r,m=d["".concat(l,".").concat(h)]||d[h]||u[h]||o;return n?a.createElement(m,i(i({ref:t},c),{},{components:n})):a.createElement(m,i({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:r,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},3274:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const o={layout:"posts",title:"Not produce duplicate Keys",date:new Date("2021-11-11T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["data"],authors:"zell"},i="Chaos Day Summary",s={permalink:"/zeebe-chaos/2021/11/11/Not-produce-duplicate-Keys",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-11-11-Not-produce-duplicate-Keys/index.md",source:"@site/blog/2021-11-11-Not-produce-duplicate-Keys/index.md",title:"Not produce duplicate Keys",description:"Due to some incidents and critical bugs we observed in the last weeks, I wanted to spent some time to understand the issues better and experiment how we could detect them. One of the issue we have observed was that keys were generated more than once, so they were no longer unique (#8129). I will describe this property in the next section more in depth.",date:"2021-11-11T00:00:00.000Z",formattedDate:"November 11, 2021",tags:[{label:"data",permalink:"/zeebe-chaos/tags/data"}],readingTime:5.425,hasTruncateMarker:!0,authors:[{name:"Christopher Zell",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Not produce duplicate Keys",date:"2021-11-11T00:00:00.000Z",categories:["chaos_experiment","bpmn"],tags:["data"],authors:"zell"},prevItem:{title:"Worker count should not impact performance",permalink:"/zeebe-chaos/2021/11/24/Worker-count-should-not-impact-performance"},nextItem:{title:"Throughput on big state",permalink:"/zeebe-chaos/2021/10/29/Throughput-on-big-state"}},l={authorsImageUrls:[void 0]},p=[{value:"Unique Keys",id:"unique-keys",level:2},{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3}],c={toc:p},d="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Due to some incidents and critical bugs we observed in the last weeks, I wanted to spent some time to understand the issues better and experiment how we could detect them. One of the issue we have observed was that keys were generated more than once, so they were no longer unique (",(0,r.kt)("a",{parentName:"p",href:"https://github.com/camunda-cloud/zeebe/issues/8129"},"#8129"),"). I will describe this property in the next section more in depth."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"TL;DR;")," We were able to design an experiment which helps us to detect duplicated keys in the log. Further work should be done to automate such experiment and run it agains newer versions."),(0,r.kt)("h2",{id:"unique-keys"},"Unique Keys"),(0,r.kt)("p",null,"In Zeebe each element must have an cluster wide unique key. This is a property we expect in several areas inside, but also outside of Zeebe (external services). We can call it an invariant we have to guarantee."),(0,r.kt)("p",null,"In order to have cluster wide unique key's we encode the partition id in the key's. You can check this ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/camunda-cloud/zeebe/blob/develop/protocol/src/main/java/io/camunda/zeebe/protocol/Protocol.java#L71-L73"},"code")," for more details. Furthermore only the Leader (of a partition) are in charge and allowed to generate new keys. If a fail-over happens the new leader need to continue with generating new keys, he has to resume where the other Leader have left-of. "),(0,r.kt)("p",null,"The last part was exactly the issue we had, see ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/camunda-cloud/zeebe/issues/8129"},"#8129"),". The new leader generated key's, which have been already generated by the previous leader. This caused inconsistency in our internal state, but also in external services like Operate."),(0,r.kt)("h2",{id:"chaos-experiment"},"Chaos Experiment"),(0,r.kt)("p",null,"This time it is a bit different approach, since we know it will ",(0,r.kt)("em",{parentName:"p"},"fail")," and we want to examine how we can detect the weakness.\nIn order to understand how we can detect and prevent/verify that this will not happen again, I want to run an experiment against 1.2.0. Later we should try to automate this experiment and run it against newer versions."),(0,r.kt)("p",null,"As described ",(0,r.kt)("a",{parentName:"p",href:"#unique-keys"},"above")," the issue was caused due to a fail-over, to be more specific, the Follower has already reached the end of the log (replayed all events) and on fail-over he had nothing to replay. In order to reproduce this situation we will do the following experiment:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Deploy an simple process model, with start and end event."),(0,r.kt)("li",{parentName:"ol"},"Start an instance and await the result ",(0,r.kt)("inlineCode",{parentName:"li"},'zbctl create instance "simpleProcess" --withResult --insecure')),(0,r.kt)("li",{parentName:"ol"},"Wait a short period of time"),(0,r.kt)("li",{parentName:"ol"},"Restart the current Leader ",(0,r.kt)("inlineCode",{parentName:"li"},"k delete pod zell-chaos-zeebe-2")),(0,r.kt)("li",{parentName:"ol"},"Wait until a new Leader is choosen"),(0,r.kt)("li",{parentName:"ol"},"Start an instance and await the result ",(0,r.kt)("inlineCode",{parentName:"li"},'zbctl create instance "simpleProcess" --withResult --insecure'))),(0,r.kt)("p",null,"After doing this we should copy the data from the new Leader and exermine the log (with ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Zelldon/zdb"},"zdb"),"). Alternatively, we could also verify the exporter log in elastic."),(0,r.kt)("p",null,"In general it should be clear that if we take a look at the log the key can appear multiple times, but they should only reference one single entity/element."),(0,r.kt)("p",null,"A key is normally generated when processing a command and written as follow up event the first time to the log. For example when we process the ",(0,r.kt)("inlineCode",{parentName:"p"},"ACTIVATE_ELEMENT")," command we write the key of the new entity on ",(0,r.kt)("inlineCode",{parentName:"p"},"ELEMENT_ACTIVATED")," to the log.\nKeys are assigned for other types of entities as well, like process instance creations, deployments etc. Here it works similar."),(0,r.kt)("p",null,"If the follow-up event contains a key which doesn't occurre the first time, then we have a problem, and this is how we want to detect it."),(0,r.kt)("h3",{id:"expected"},"Expected"),(0,r.kt)("p",null,"To follow the chaos engineering approach we will define here a hypothesis, even if we know it might not true for 1.2.0. But later we can reuse it for newer version, because here it should apply."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"We expect even if we processed all records and have a fail-over that the new leader should not generate the same keys again.")),(0,r.kt)("h3",{id:"actual"},"Actual"),(0,r.kt)("p",null,"We started a benchmark with version 1.2.0, three brokers and one partition to reduce the scope and followed the described experiment above."),(0,r.kt)("p",null,"The second process instance creation returned a key (",(0,r.kt)("inlineCode",{parentName:"p"},"2251799813685258"),") which was incremented by one, compared to the other process instance (",(0,r.kt)("inlineCode",{parentName:"p"},"2251799813685257"),"). Here we already knew that our experiment caused the issue. Because, multiple new entities are generated during processing of a process instance and we awaited the result, at the first process instance creation. This means we have generated already more than one key (on the old leader), which hasn't been picked up by the new leader."),(0,r.kt)("p",null,"We copyed the data from the new Leader and exermined the log via ",(0,r.kt)("inlineCode",{parentName:"p"},"zdb"),". First we printed the complete log into a separate file as json:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"  zdb log print -p raft-partition/partitions/1 | jq > data.json\n")),(0,r.kt)("p",null,"This makes it human readable and also processable by other tools, like ",(0,r.kt)("inlineCode",{parentName:"p"},"jq"),". After checking the file we already found one duplicate."),(0,r.kt)("p",null,"The first key was part of index 12 in term one and the duplicate was part of index 20 in term 2 (new leader term)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},' {\n      "index": 12,\n      "term": 1,\n      "entries": [\n        {\n          "partitionId": 1,\n          "value": {\n            "version": 1,\n            "processDefinitionKey": 2251799813685249,\n            "bpmnProcessId": "simpleProcess",\n            "processInstanceKey": 2251799813685256,\n            "parentElementInstanceKey": -1,\n            "flowScopeKey": -1,\n            "parentProcessInstanceKey": -1,\n            "elementId": "simpleProcess",\n            "bpmnElementType": "PROCESS"\n          },\n          "timestamp": 1636627776427,\n          "position": 26,\n          "valueType": "PROCESS_INSTANCE",\n          "intent": "ACTIVATE_ELEMENT",\n          "recordType": "COMMAND",\n          "rejectionType": "NULL_VAL",\n          "rejectionReason": "",\n          "brokerVersion": "1.2.0",\n          "sourceRecordPosition": 25,\n          "key": 2251799813685256\n        },\n        {\n          "partitionId": 1,\n          "value": {\n            "version": 1,\n            "processDefinitionKey": 2251799813685249,\n            "bpmnProcessId": "simpleProcess",\n            "processInstanceKey": 2251799813685256,\n            "variables": {}\n          },\n          "timestamp": 1636627776427,\n          "position": 27,\n          "valueType": "PROCESS_INSTANCE_CREATION",\n          "intent": "CREATED",\n          "recordType": "EVENT",\n          "rejectionType": "NULL_VAL",\n          "rejectionReason": "",\n          "brokerVersion": "1.2.0",\n          "sourceRecordPosition": 25,\n          "key": 2251799813685257\n        }\n      ]\n    },\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},' {\n      "index": 20,\n      "term": 2,\n      "entries": [\n        {\n          "partitionId": 1,\n          "value": {\n            "version": 1,\n            "processDefinitionKey": 2251799813685249,\n            "bpmnProcessId": "simpleProcess",\n            "processInstanceKey": 2251799813685257,\n            "parentElementInstanceKey": -1,\n            "flowScopeKey": -1,\n            "parentProcessInstanceKey": -1,\n            "elementId": "simpleProcess",\n            "bpmnElementType": "PROCESS"\n          },\n          "timestamp": 1636627887305,\n          "position": 46,\n          "valueType": "PROCESS_INSTANCE",\n          "intent": "ACTIVATE_ELEMENT",\n          "recordType": "COMMAND",\n          "rejectionType": "NULL_VAL",\n          "rejectionReason": "",\n          "brokerVersion": "1.2.0",\n          "sourceRecordPosition": 45,\n          "key": 2251799813685257\n        },\n        {\n          "partitionId": 1,\n          "value": {\n            "version": 1,\n            "processDefinitionKey": 2251799813685249,\n            "bpmnProcessId": "simpleProcess",\n            "processInstanceKey": 2251799813685257,\n            "variables": {}\n          },\n          "timestamp": 1636627887305,\n          "position": 47,\n          "valueType": "PROCESS_INSTANCE_CREATION",\n          "intent": "CREATED",\n          "recordType": "EVENT",\n          "rejectionType": "NULL_VAL",\n          "rejectionReason": "",\n          "brokerVersion": "1.2.0",\n          "sourceRecordPosition": 45,\n          "key": 2251799813685258\n        }\n')),(0,r.kt)("p",null,"Since reading and checking the complete file is a bit hard and error prone, we tried to exermine the data with ",(0,r.kt)("inlineCode",{parentName:"p"},"jq"),". This worked quite well, we were able to detect the duplicates with an ",(0,r.kt)("inlineCode",{parentName:"p"},"jq")," expression."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"cat data.json | jq -r '.records[] | select(.entries  != null) |  .entries[] | select (.intent == \"ELEMENT_ACTIVATED\" or .intent == \"CREATED\") | .key' data.json | sort | uniq -c -d | awk '{print $2}'\n\n2251799813685257\n2251799813685258\n2251799813685263\n2251799813685264\n")),(0,r.kt)("p",null,"This expression we can use for further experiments and for automating such."))}u.isMDXComponent=!0}}]);