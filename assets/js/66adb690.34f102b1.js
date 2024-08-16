"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[8771],{86320:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var a=s(74848),n=s(28453);const r={layout:"posts",title:"Job push resiliency",date:new Date("2023-12-06T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["availability","resiliency"],authors:["zell","nicolas"]},i="Chaos Day Summary",l={permalink:"/zeebe-chaos/2023/12/06/Job-Push-resiliency",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2023-12-06-Job-Push-resiliency/index.md",source:"@site/blog/2023-12-06-Job-Push-resiliency/index.md",title:"Job push resiliency",description:"In today's chaos day we experimented with job push resiliency.",date:"2023-12-06T00:00:00.000Z",tags:[{inline:!0,label:"availability",permalink:"/zeebe-chaos/tags/availability"},{inline:!0,label:"resiliency",permalink:"/zeebe-chaos/tags/resiliency"}],readingTime:6.41,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",imageURL:"https://github.com/zelldon.png",key:"zell",page:null},{name:"Nicolas Pepin-Perreault",title:"Senior Software Engineer @ Zeebe",url:"https://github.com/npepinpe",imageURL:"https://github.com/npepinpe.png",key:"nicolas",page:null}],frontMatter:{layout:"posts",title:"Job push resiliency",date:"2023-12-06T00:00:00.000Z",categories:["chaos_experiment","bpmn"],tags:["availability","resiliency"],authors:["zell","nicolas"]},unlisted:!1,prevItem:{title:"Dynamically scaling brokers",permalink:"/zeebe-chaos/2023/12/18/Dynamically-scaling-brokers"},nextItem:{title:"Job push overloading",permalink:"/zeebe-chaos/2023/11/30/Job-push-overloading"}},d={authorsImageUrls:[void 0,void 0]},c=[{value:"Gateway restarts",id:"gateway-restarts",level:2},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3},{value:"Verify steady state",id:"verify-steady-state",level:4},{value:"Injecting chaos",id:"injecting-chaos",level:4},{value:"Verify steady state",id:"verify-steady-state-1",level:4},{value:"Result",id:"result",level:3},{value:"With termination",id:"with-termination",level:3},{value:"Leader restart",id:"leader-restart",level:2},{value:"Expected",id:"expected-1",level:3},{value:"Actual",id:"actual-1",level:3},{value:"Verify steady state",id:"verify-steady-state-2",level:4},{value:"Inject chaos",id:"inject-chaos",level:4},{value:"Verify steady state",id:"verify-steady-state-3",level:4},{value:"Result",id:"result-1",level:3},{value:"Complete cluster restart",id:"complete-cluster-restart",level:2},{value:"Expected",id:"expected-2",level:3},{value:"Actual",id:"actual-2",level:3},{value:"Verify steady state",id:"verify-steady-state-4",level:4},{value:"Inject chaos",id:"inject-chaos-1",level:4},{value:"Verify steady state",id:"verify-steady-state-5",level:4},{value:"Result",id:"result-2",level:3},{value:"Found Bugs",id:"found-bugs",level:2}];function o(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.p,{children:"In today's chaos day we experimented with job push resiliency."}),"\n",(0,a.jsx)(t.p,{children:"The following experiments we have done today:"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsx)(t.li,{children:"Job streams should be resilient to gateway restarts/crash"}),"\n",(0,a.jsx)(t.li,{children:"Job streams should be resilient to leadership changes/leader restarts"}),"\n",(0,a.jsx)(t.li,{children:"Job streams should be resilient to cluster restarts"}),"\n"]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"TL;DR;"})," All experiments succeeded and showcased the resiliency even on component restarts. ","\ud83d\ude80"]}),"\n",(0,a.jsx)(t.p,{children:"To reduce the blast radius and to better verify that everything works as expected we use a trimmed version of our benchmark setup. This means three brokers, one partition, replication factor three, and one gateway. No starter deployed. We deployed one worker with a very high polling interval, to make sure that we rely on streaming."}),"\n",(0,a.jsx)(t.h2,{id:"gateway-restarts",children:"Gateway restarts"}),"\n",(0,a.jsx)(t.p,{children:"In our first experiment, we wanted to verify that: Job streaming should be resilient to gateway restarts/crashes."}),"\n",(0,a.jsx)(t.p,{children:"The experiment will look like the following:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["Verify steady state:","\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Cluster is healthy"}),"\n",(0,a.jsx)(t.li,{children:"When creating an instance, and start streaming we can retrieve and complete the corresponding job"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["Chaos injection:","\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Restarting the gateway"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["Verify steady state:","\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Cluster is healthy"}),"\n",(0,a.jsx)(t.li,{children:"When creating an instance, and start streaming we can retrieve and complete the corresponding job"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(t.h3,{id:"expected",children:"Expected"}),"\n",(0,a.jsx)(t.p,{children:"We expect that even after a gateway restart we can retrieve a job (the stream should be recreated) and complete our new instance."}),"\n",(0,a.jsx)(t.h3,{id:"actual",children:"Actual"}),"\n",(0,a.jsxs)(t.p,{children:["We deployed the worker (with a replica of one), and configured it with a high polling interval ",(0,a.jsx)(t.code,{children:"-Dapp.worker.pollingDelay=24h"}),"."]}),"\n",(0,a.jsx)(t.p,{children:"To run any instances we need to deploy once the benchmark process model"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"zbchaos deploy process\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nDeployed given process model , under key 2251799813685249!\n"})}),"\n",(0,a.jsx)(t.h4,{id:"verify-steady-state",children:"Verify steady state"}),"\n",(0,a.jsx)(t.p,{children:"We verify the readiness and the instance creation."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sh",children:"$ zbchaos verify readiness\nAll Zeebe nodes are running.\n\n$ zbchaos verify instance-creation --awaitResult --verbose\nFlags: {1 LEADER -1  10  msg true 1 LEADER -1 2 LEADER -1 1701853048870 false false true false false 30 false -1 benchmark 30   1 1 benchmark-task}\nConnecting to ck-np-chaos-day-job-push\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nRunning experiment in self-managed environment.\nPort forward to ck-np-chaos-day-job-push-zeebe-gateway-68695d9cb5-lhgg5\nSuccessfully created port forwarding tunnel\nWe await the result of the process instance creation, thus we skip the partition id check.\nSend create process instance command, with BPMN process ID 'benchmark' and version '-1' (-1 means latest) [variables: '', awaitResult: true]\nCreated process instance with key 2251799813685251 on partition 1, required partition 0.\nThe steady-state was successfully verified!\n"})}),"\n",(0,a.jsx)(t.h4,{id:"injecting-chaos",children:"Injecting chaos"}),"\n",(0,a.jsx)(t.p,{children:"Next, we will restart the gateway."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ zbchaos restart gateway --verbose\nFlags: {1 LEADER -1  10  msg false 1 LEADER -1 2 LEADER -1 1701853221588 false false true false false 30 false -1 benchmark 30   1 1 benchmark-task}\nConnecting to ck-np-chaos-day-job-push\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nRunning experiment in self-managed environment.\nRestarted ck-np-chaos-day-job-push-zeebe-gateway-68695d9cb5-lhgg5\n"})}),"\n",(0,a.jsx)(t.h4,{id:"verify-steady-state-1",children:"Verify steady state"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ zbchaos verify readiness\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nAll Zeebe nodes are running.\n"})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ zbchaos verify instance-creation --awaitResult\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nThe steady-state was successfully verified!\n"})}),"\n",(0,a.jsx)(t.h3,{id:"result",children:"Result"}),"\n",(0,a.jsxs)(t.p,{children:["The experiment succeeded. We were able to verify the steady state after the chaos injection. Furthermore, we observe in the metrics as well that the jobs have been pushed after the gateway restart. ","\u2705"]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{src:s(52459).A+"",width:"939",height:"667"})}),"\n",(0,a.jsx)(t.h3,{id:"with-termination",children:"With termination"}),"\n",(0,a.jsx)(t.p,{children:"We wanted to verify the same by terminating the gateway instead of a graceful shutdown (which is done within the restart command)."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ zbchaos terminate gateway --verbose\nFlags: {1 LEADER -1  10  msg false 1 LEADER -1 2 LEADER -1 1701853482263 false false true false false 30 false -1 benchmark 30   1 1 benchmark-task}\nConnecting to ck-np-chaos-day-job-push\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nRunning experiment in self-managed environment.\nTerminated ck-np-chaos-day-job-push-zeebe-gateway-68695d9cb5-jqfzg\n"})}),"\n",(0,a.jsx)(t.p,{children:"Verifying the steady stated again showed no unexpected issues."}),"\n",(0,a.jsx)(t.p,{children:"Out of interest we checked what is happening in worker:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"09:05:44.047 [pool-5-thread-3] WARN  io.camunda.zeebe.client.job.worker - Failed to stream jobs of type 'benchmark-task' to worker 'benchmark-worker'\nio.grpc.StatusRuntimeException: UNAVAILABLE: io exception\n...\n"})}),"\n",(0,a.jsxs)(t.p,{children:["We see as expected several ",(0,a.jsx)(t.code,{children:"UNAVAILABLE: io exception"})," and later the worker recovered."]}),"\n",(0,a.jsx)(t.p,{children:"Based on the metrics we can observe the same. Jobs are pushed to the workers even after restarting the gateway."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{src:s(96883).A+"",width:"941",height:"658"})}),"\n",(0,a.jsx)(t.h2,{id:"leader-restart",children:"Leader restart"}),"\n",(0,a.jsx)(t.p,{children:"In this experiment, we want to verify how resilient job push is on leader changes/restarts."}),"\n",(0,a.jsx)(t.p,{children:"The verification of the steady state is the same as above, so I will skip this description here."}),"\n",(0,a.jsx)(t.h3,{id:"expected-1",children:"Expected"}),"\n",(0,a.jsx)(t.p,{children:"Workers shouldn't care about leader change, this should be handled fully by the gateway."}),"\n",(0,a.jsx)(t.h3,{id:"actual-1",children:"Actual"}),"\n",(0,a.jsx)(t.h4,{id:"verify-steady-state-2",children:"Verify steady state"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"$ zbchaos verify readiness\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nAll Zeebe nodes are running.\n$ zbchaos verify instance-creation --awaitResult\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nThe steady-state was successfully verified!\n"})}),"\n",(0,a.jsx)(t.h4,{id:"inject-chaos",children:"Inject chaos"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ zbchaos restart broker --partitionId 1 --role LEADER\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nRestarted ck-np-chaos-day-job-push-zeebe-0\n"})}),"\n",(0,a.jsx)(t.h4,{id:"verify-steady-state-3",children:"Verify steady state"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-shell",children:"$ zbchaos verify readiness\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nAll Zeebe nodes are running.\n$ zbchaos verify instance-creation --awaitResult\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nThe steady-state was successfully verified!\n"})}),"\n",(0,a.jsx)(t.h3,{id:"result-1",children:"Result"}),"\n",(0,a.jsx)(t.p,{children:"We were able to verify that a leader restart doesn't cause issues and job push can handle such events."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{src:s(4854).A+"",width:"926",height:"866"})}),"\n",(0,a.jsxs)(t.p,{children:["We can see that the leader was changed, and also switched back shortly after.\n",(0,a.jsx)(t.img,{src:s(34298).A+"",width:"475",height:"311"})]}),"\n",(0,a.jsxs)(t.p,{children:["This is caused by our leader-balancing cron job.\n",(0,a.jsx)(t.img,{src:s(50260).A+"",width:"1799",height:"421"})]}),"\n",(0,a.jsx)(t.p,{children:"This also means we had two leader changes, and the push was even pushed by the restarted node."}),"\n",(0,a.jsx)(t.h2,{id:"complete-cluster-restart",children:"Complete cluster restart"}),"\n",(0,a.jsx)(t.p,{children:"In this experiment, we wanted to verify whether job push can also handle a complete cluster restart."}),"\n",(0,a.jsx)(t.h3,{id:"expected-2",children:"Expected"}),"\n",(0,a.jsx)(t.p,{children:"Job push can handle a cluster restart and a corresponding job is pushed to the worker afterwards."}),"\n",(0,a.jsx)(t.h3,{id:"actual-2",children:"Actual"}),"\n",(0,a.jsx)(t.h4,{id:"verify-steady-state-4",children:"Verify steady state"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"\u276f zbchaos verify readiness\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nAll Zeebe nodes are running.\n\u276f zbchaos verify instance-creation --awaitResult\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nThe steady-state was successfully verified!\n"})}),"\n",(0,a.jsx)(t.h4,{id:"inject-chaos-1",children:"Inject chaos"}),"\n",(0,a.jsxs)(t.p,{children:["Right now ",(0,a.jsx)(t.code,{children:"zbchaos"})," doesn't support restarting a complete cluster, so we had to fall back to ",(0,a.jsx)(t.code,{children:"kubectl"}),"."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-sh",children:'$ kubectl delete pod -l=app=camunda-platform\npod "ck-np-chaos-day-job-push-zeebe-0" deleted\npod "ck-np-chaos-day-job-push-zeebe-1" deleted\npod "ck-np-chaos-day-job-push-zeebe-2" deleted\npod "ck-np-chaos-day-job-push-zeebe-gateway-68695d9cb5-hj2pf" deleted\n'})}),"\n",(0,a.jsx)(t.h4,{id:"verify-steady-state-5",children:"Verify steady state"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"$ zbchaos verify readiness\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nAll Zeebe nodes are running.\n$ zbchaos verify instance-creation --awaitResult\nFailed to retrieve SaaS CRD, fallback to self-managed mode. the server could not find the requested resource\nThe steady-state was successfully verified!\n"})}),"\n",(0,a.jsx)(t.h3,{id:"result-2",children:"Result"}),"\n",(0,a.jsx)(t.p,{children:"Again we were able to show that job push is resilient, and can even handle a complete cluster restart."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{src:s(87023).A+"",width:"930",height:"677"})}),"\n",(0,a.jsx)(t.h2,{id:"found-bugs",children:"Found Bugs"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"On restart (especially on cluster restart) it looks like job push engine metrics are counted multiple times"}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:"https://github.com/camunda/camunda/blob/a86decce9a46218798663e3466267a49adef506e/transport/src/main/java/io/camunda/zeebe/transport/stream/impl/RemoteStreamPusher.java#L55-L56C14",children:"We found a place where we should better handle the exception in pushing async."})}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}},87023:(e,t,s)=>{s.d(t,{A:()=>a});const a=s.p+"assets/images/job-push-cluster-restart-69a928cd76f5613126f41c66f5fd7644.png"},52459:(e,t,s)=>{s.d(t,{A:()=>a});const a=s.p+"assets/images/job-push-gw-restart-16711afa005a27b6101bbd940f6f1489.png"},96883:(e,t,s)=>{s.d(t,{A:()=>a});const a=s.p+"assets/images/job-push-gw-terminate-0600fa2a9e4d0c5696531dc2da3bf391.png"},50260:(e,t,s)=>{s.d(t,{A:()=>a});const a=s.p+"assets/images/job-push-leader-restart-cronjob-fed9e516c29fde4f814cdfcb68e3f4c2.png"},4854:(e,t,s)=>{s.d(t,{A:()=>a});const a=s.p+"assets/images/job-push-leader-restart-6e33baa1365cba88fc41cc9bbe92442b.png"},34298:(e,t,s)=>{s.d(t,{A:()=>a});const a=s.p+"assets/images/leaderchanges-2760fa1660e1759211f9b7c3351b0ab7.png"},28453:(e,t,s)=>{s.d(t,{R:()=>i,x:()=>l});var a=s(96540);const n={},r=a.createContext(n);function i(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);