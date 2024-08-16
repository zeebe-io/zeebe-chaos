"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[3083],{34615:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var r=t(74848),s=t(28453);const a={layout:"posts",title:"Dynamically scaling brokers",date:new Date("2023-12-18T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["availability","performance"],authors:"lena"},i="Chaos Day Summary",o={permalink:"/zeebe-chaos/2023/12/18/Dynamically-scaling-brokers",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2023-12-18-Dynamically-scaling-brokers/index.md",source:"@site/blog/2023-12-18-Dynamically-scaling-brokers/index.md",title:"Dynamically scaling brokers",description:"We experimented with the first version of dynamic scaling in Zeebe, adding or removing brokers for a running cluster.",date:"2023-12-18T00:00:00.000Z",tags:[{inline:!0,label:"availability",permalink:"/zeebe-chaos/tags/availability"},{inline:!0,label:"performance",permalink:"/zeebe-chaos/tags/performance"}],readingTime:6.05,hasTruncateMarker:!0,authors:[{name:"Lena Sch\xf6nburg",title:"Senior Software Engineer @ Zeebe",url:"https://github.com/lenaschoenburg",imageURL:"https://github.com/lenaschoenburg.png",key:"lena",page:null}],frontMatter:{layout:"posts",title:"Dynamically scaling brokers",date:"2023-12-18T00:00:00.000Z",categories:["chaos_experiment","bpmn"],tags:["availability","performance"],authors:"lena"},unlisted:!1,prevItem:{title:"Dynamic Scaling with Dataloss",permalink:"/zeebe-chaos/2023/12/19/Dynamic-Scaling-with-Dataloss"},nextItem:{title:"Job push resiliency",permalink:"/zeebe-chaos/2023/12/06/Job-Push-resiliency"}},l={authorsImageUrls:[void 0]},c=[{value:"Scaling up should be resilient to broker restarts",id:"scaling-up-should-be-resilient-to-broker-restarts",level:2},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3},{value:"Verify steady state",id:"verify-steady-state",level:4},{value:"Scaling up with broker restarts",id:"scaling-up-with-broker-restarts",level:4},{value:"Result",id:"result",level:3},{value:"Scaling down should be resilient to broker restarts",id:"scaling-down-should-be-resilient-to-broker-restarts",level:2},{value:"Expected",id:"expected-1",level:3},{value:"Actual",id:"actual-1",level:3},{value:"Verify steady state",id:"verify-steady-state-1",level:4},{value:"Scaling down with broker restarts",id:"scaling-down-with-broker-restarts",level:4},{value:"Result",id:"result-1",level:3}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:["We experimented with the first version of ",(0,r.jsx)(n.a,{href:"https://docs.camunda.io/docs/next/self-managed/zeebe-deployment/operations/cluster-scaling/",children:"dynamic scaling in Zeebe"}),", adding or removing brokers for a running cluster."]}),"\n",(0,r.jsxs)(n.p,{children:["Scaling up and down is a high-level operation that consists of many steps that need to be carried co-operatively by all brokers in the cluster.\nFor example, adding new brokers first adds them to the replication group of the assigned partitions and then removes some of the older brokers from the replication group.\nAdditionally, ",(0,r.jsx)(n.a,{href:"https://docs.camunda.io/docs/next/self-managed/zeebe-deployment/configuration/priority-election/",children:"priorities"})," need to be reconfigured to ensure that the cluster approaches balanced leadership eventually."]}),"\n",(0,r.jsxs)(n.p,{children:["This orchestration over multiple steps ensures that all partitions are replicated by at least as many brokers as configured with the ",(0,r.jsx)(n.code,{children:"replicationFactor"}),".\nAs always, when it comes to orchestrating distributed systems, there are many edge cases and failure modes to consider."]}),"\n",(0,r.jsx)(n.p,{children:"The goal of this experiment was to verify that the operation is resilient to broker restarts.\nWe can accept that operations take longer than usual to complete, but we need to make sure that the operation eventually succeeds with the expected cluster topology as result."}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"TL;DR;"})," Both scaling up and down is resilient to broker restarts, with the only effect that the operation takes longer than usual to complete."]}),"\n",(0,r.jsx)(n.h2,{id:"scaling-up-should-be-resilient-to-broker-restarts",children:"Scaling up should be resilient to broker restarts"}),"\n",(0,r.jsx)(n.p,{children:"We start with a cluster of 3 brokers, 6 partitions and replication factor 3.\nIf leadership is balanced, each broker should be leader for 2 partitions and follower for 4 partitions.\nUsing more partitions than brokers allows us to scale up to more brokers, distributing the partitions such that each broker has less work to do."}),"\n",(0,r.jsx)(n.p,{children:"For this experiment, we introduce chaos by letting a random broker restart every 30 seconds."}),"\n",(0,r.jsx)(n.h3,{id:"expected",children:"Expected"}),"\n",(0,r.jsx)(n.p,{children:"Even when brokers are restarting, the scale operation should eventually succeed.\nThe expected cluster topology after scaling up is 6 brokers, 6 partitions and replication factor 3, leading to 3 partitions for each broker instead of 6."}),"\n",(0,r.jsx)(n.h3,{id:"actual",children:"Actual"}),"\n",(0,r.jsx)(n.h4,{id:"verify-steady-state",children:"Verify steady state"}),"\n",(0,r.jsxs)(n.p,{children:["The current cluster topology queried with ",(0,r.jsx)(n.code,{children:"zbchaos cluster status"})," shows 6 partitions with 3 replicas each, evenly distributed across the 3 brokers."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "Brokers": [\n    {\n      "Id": 1,\n      "Partitions": [\n        {\n          "Id": 1,\n        },\n        {\n          "Id": 2,\n        },\n        {\n          "Id": 3,\n        },\n        {\n          "Id": 4,\n        },\n        {\n          "Id": 5,\n        },\n        {\n          "Id": 6,\n        }\n      ]\n    },\n    {\n      "Id": 2,\n      ...\n    },\n    {\n      "Id": 0,\n      ...\n    }\n  ],\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"The above is an abbreviated version of the actual output, which contains more information."}),"\n",(0,r.jsx)(n.p,{children:"All partitions are reported as healthy and leadership is balanced::"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ zbchaos topology\nNode      |Partition 1         |Partition 2         |Partition 3         |Partition 4         |Partition 5         |Partition 6\n0         |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)\n1         |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)\n2         |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)\n"})}),"\n",(0,r.jsx)(n.h4,{id:"scaling-up-with-broker-restarts",children:"Scaling up with broker restarts"}),"\n",(0,r.jsxs)(n.p,{children:["We start the scaling with ",(0,r.jsx)(n.code,{children:"zbchaos cluster scale --brokers 6"})," and restart a random broker every 30 seconds:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ zbchaos cluster scale --brokers 6 & \n$ while true; do sleep 30; zbchaos restart broker --nodeId $(shuf -i 0-5 -n 1); done\n"})}),"\n",(0,r.jsx)(n.p,{children:"After the scaling completed, we stop the restarting and let the cluste settle again for a few minutes."}),"\n",(0,r.jsx)(n.h3,{id:"result",children:"Result"}),"\n",(0,r.jsx)(n.p,{children:"The scale operation succeeds and the newly reported cluster topology shows us 6 partitions with 3 replicas each, evenly distributed across 6 instead of 3 brokers:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "Brokers": [\n    {\n      "Id": 1,\n      "Partitions": [\n        {\n          "Id": 1,\n        },\n        {\n          "Id": 2,\n        },\n        {\n          "Id": 6,\n        }\n      ]\n    },\n    {\n      "Id": 2,\n      ...\n    },\n    {\n      "Id": 3,\n      ...\n    },\n    {\n      "Id": 4,\n      ...\n    },\n    {\n      "Id": 5,\n      ...\n    },\n    {\n      "Id": 0,\n      ...\n    }\n  ],\n  "LastChange": {\n    "Id": 14,\n    "Status": "COMPLETED",\n    "StartedAt": "2023-12-18T15:12:57.790824149Z",\n    "CompletedAt": "2023-12-18T15:30:20.920657536Z"\n  },\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"All partitions are reported as healthy and leadership is balanced:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ zbchaos topology\nNode      |Partition 1         |Partition 2         |Partition 3         |Partition 4         |Partition 5         |Partition 6\n0         |LEADER (HEALTHY)    |                    |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)\n1         |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |                    |                    |FOLLOWER (HEALTHY)\n2         |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |                    |\n3         |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |\n4         |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |\n5         |                    |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The operation succeeded in about 17 minutes, longer than usual because of the restarts:\n",(0,r.jsx)(n.img,{src:t(42248).A+"",width:"840",height:"296"})]}),"\n",(0,r.jsx)(n.h2,{id:"scaling-down-should-be-resilient-to-broker-restarts",children:"Scaling down should be resilient to broker restarts"}),"\n",(0,r.jsx)(n.p,{children:"Exactly like scaling up, scaling down is also a high-level operation that consists of many steps that need to be carried out by all brokers in the cluster.\nBefore a broker can leave, another broker first needs to join the replication group to ensure that we maintain a replication factor of 3 at all times."}),"\n",(0,r.jsx)(n.h3,{id:"expected-1",children:"Expected"}),"\n",(0,r.jsx)(n.p,{children:"Even when brokers are restarting, the scale operation should eventually succeed with the expected cluster topology as result."}),"\n",(0,r.jsx)(n.h3,{id:"actual-1",children:"Actual"}),"\n",(0,r.jsx)(n.h4,{id:"verify-steady-state-1",children:"Verify steady state"}),"\n",(0,r.jsx)(n.p,{children:"We start with the cluster topology that we got as result of the previous experiment.\n6 partitions with 3 replicas distributed over 6 brokers:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "Brokers": [\n    {\n      "Id": 1,\n      "Partitions": [\n        {\n          "Id": 1,\n        },\n        {\n          "Id": 2,\n        },\n        {\n          "Id": 6,\n        }\n      ]\n    },\n    {\n      "Id": 2,\n      ...\n    },\n    {\n      "Id": 3,\n      ...\n    },\n    {\n      "Id": 4,\n      ...\n    },\n    {\n      "Id": 5,\n      ...\n    },\n    {\n      "Id": 0,\n      ...\n    }\n  ],\n  "LastChange": {\n    "Id": 14,\n    "Status": "COMPLETED",\n    "StartedAt": "2023-12-18T15:12:57.790824149Z",\n    "CompletedAt": "2023-12-18T15:30:20.920657536Z"\n  },\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"All partitions are reported as healthy and leadership is balanced:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ zbchaos topology\nNode      |Partition 1         |Partition 2         |Partition 3         |Partition 4         |Partition 5         |Partition 6\n0         |LEADER (HEALTHY)    |                    |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)\n1         |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |                    |                    |FOLLOWER (HEALTHY)\n2         |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |                    |\n3         |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |                    |\n4         |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |\n5         |                    |                    |                    |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)\n"})}),"\n",(0,r.jsx)(n.h4,{id:"scaling-down-with-broker-restarts",children:"Scaling down with broker restarts"}),"\n",(0,r.jsxs)(n.p,{children:["We scale down with ",(0,r.jsx)(n.code,{children:"zbchaos cluster scale --brokers 3"})," and restart a random broker every 30 seconds:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ zbchaos cluster scale --brokers 3 &\n$ while true; do sleep 30; zbchaos restart broker --nodeId $(shuf -i 0-5 -n 1); done\n"})}),"\n",(0,r.jsx)(n.h3,{id:"result-1",children:"Result"}),"\n",(0,r.jsx)(n.p,{children:"All 6 partitions with 3 replicas each are evenly distributed across 3 brokers, leading to 6 partitions for each broker again."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "Brokers": [\n    {\n      "Id": 1,\n      "Partitions": [\n        {\n          "Id": 1,\n        },\n        {\n          "Id": 2,\n        },\n        {\n          "Id": 3,\n        },\n        {\n          "Id": 4,\n        },\n        {\n          "Id": 5,\n        },\n        {\n          "Id": 6,\n        }\n      ]\n    },\n    {\n      "Id": 2,\n      ...\n    },\n    {\n      "Id": 0,\n      ...\n    }\n  ],\n  "LastChange": {\n    "Id": 16,\n    "Status": "COMPLETED",\n    "StartedAt": "2023-12-18T16:07:07.208363298Z",\n    "CompletedAt": "2023-12-18T16:28:58.836369836Z"\n  },\n  "PendingChange": null\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"All partitions are healthy and leadership is distributed evenly:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"$ zbchaos topology\nNode      |Partition 1         |Partition 2         |Partition 3           |Partition 4         |Partition 5         |Partition 6\n0         |LEADER (UNHEALTHY)  |FOLLOWER (HEALTHY)  |FOLLOWER (UNHEALTHY)  |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)  |FOLLOWER (UNHEALTHY)\n1         |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)    |FOLLOWER (HEALTHY)    |FOLLOWER (HEALTHY)  |LEADER (UNHEALTHY)  |FOLLOWER (HEALTHY)\n2         |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)      |FOLLOWER (HEALTHY)  |FOLLOWER (HEALTHY)  |LEADER (HEALTHY)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The operation completes in 21 minutes, longer than usual because of the restarts:\n",(0,r.jsx)(n.img,{src:t(62311).A+"",width:"840",height:"296"})]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},62311:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/scaledown-completed-5e14c6c4d0bd0ef621e64b075c1620ab.png"},42248:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/scaleup-completed-dc316353bae64ec8f5db4e3b15b5388f.png"},28453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>o});var r=t(96540);const s={},a=r.createContext(s);function i(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);