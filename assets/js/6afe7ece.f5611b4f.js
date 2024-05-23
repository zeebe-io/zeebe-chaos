"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[348],{44963:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>o,contentTitle:()=>r,default:()=>d,frontMatter:()=>t,metadata:()=>c,toc:()=>l});var n=i(85893),a=i(11151);const t={layout:"posts",title:"Broker Scaling and Performance",date:new Date("2023-12-20T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["availability","performance"],authors:["ole","deepthi"]},r="Chaos Day Summary",c={permalink:"/zeebe-chaos/2023/12/20/Broker-scaling-performance",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2023-12-20-Broker-scaling-performance/index.md",source:"@site/blog/2023-12-20-Broker-scaling-performance/index.md",title:"Broker Scaling and Performance",description:"With Zeebe now supporting the addition and removal of brokers to a running cluster, we wanted to test three things:",date:"2023-12-20T00:00:00.000Z",formattedDate:"December 20, 2023",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"},{label:"performance",permalink:"/zeebe-chaos/tags/performance"}],readingTime:5.9,hasTruncateMarker:!0,authors:[{name:"Ole Sch\xf6nburg",title:"Senior Software Engineer @ Zeebe",url:"https://github.com/oleschoenburg",imageURL:"https://github.com/oleschoenburg.png",key:"ole"},{name:"Deepthi Akkoorath",title:"Senior Software Engineer @ Zeebe",url:"https://github.com/deepthidevaki",imageURL:"https://github.com/deepthidevaki.png",key:"deepthi"}],frontMatter:{layout:"posts",title:"Broker Scaling and Performance",date:"2023-12-20T00:00:00.000Z",categories:["chaos_experiment","bpmn"],tags:["availability","performance"],authors:["ole","deepthi"]},unlisted:!1,prevItem:{title:"Reducing the job activation delay",permalink:"/zeebe-chaos/2024/01/19/Job-Activation-Latency"},nextItem:{title:"Dynamic Scaling with Dataloss",permalink:"/zeebe-chaos/2023/12/19/Dynamic-Scaling-with-Dataloss"}},o={authorsImageUrls:[void 0,void 0]},l=[{value:"Impact of scaling on processing performance",id:"impact-of-scaling-on-processing-performance",level:2},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3},{value:"Scaling under load",id:"scaling-under-load",level:2},{value:"Expected",id:"expected-1",level:3},{value:"Actual",id:"actual-1",level:3},{value:"Scaling up to improve performance",id:"scaling-up-to-improve-performance",level:2},{value:"Expected",id:"expected-2",level:3},{value:"Actual",id:"actual-2",level:3}];function h(e){const s={a:"a",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.p,{children:"With Zeebe now supporting the addition and removal of brokers to a running cluster, we wanted to test three things:"}),"\n",(0,n.jsxs)(s.ol,{children:["\n",(0,n.jsx)(s.li,{children:"Is there an impact on processing performance while scaling?"}),"\n",(0,n.jsx)(s.li,{children:"Is scaling resilient to high processing load?"}),"\n",(0,n.jsx)(s.li,{children:"Can scaling up improve processing performance?"}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"TL;DR;"})," Scaling up works even under high load and has low impact on processing performance. After scaling is complete, processing performance improves in both throughput and latency."]}),"\n",(0,n.jsx)(s.h2,{id:"impact-of-scaling-on-processing-performance",children:"Impact of scaling on processing performance"}),"\n",(0,n.jsx)(s.p,{children:"Scaling up and down is an expensive operation where partition data is transferred between brokers, and leadership for partitions changes.\nWe wanted to test how much impact this has on regular processing performance."}),"\n",(0,n.jsx)(s.p,{children:"To do this, we ran a benchmark with 3 brokers, 6 partitions and replication factor 3."}),"\n",(0,n.jsx)(s.p,{children:"The brokers are limited to 1.35 CPUs and 4GiB RAM each.\nThey run with additional safety checks that are usually disabled in production and that slightly decrease the baseline processing performance.\nEach broker uses a small 32GiB SSD for storage, limiting them to a few thousand IOPS."}),"\n",(0,n.jsx)(s.p,{children:"The processing load was 150 processes per second, with a large payload of 32KiB each.\nEach process instance has a single service task:"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{src:i(45553).Z+"",width:"999",height:"276"})}),"\n",(0,n.jsxs)(s.p,{children:["The processing load is generated by our own ",(0,n.jsx)(s.a,{href:"https://github.com/camunda/camunda/tree/9e723b21b0e408fc2b97fd7d3f6b092af8e62dbe/benchmarks",children:"benchmarking application"}),"."]}),"\n",(0,n.jsx)(s.h3,{id:"expected",children:"Expected"}),"\n",(0,n.jsx)(s.p,{children:"When we scale up from 3 to 6 brokers, we expect a small impact on processing performance.\nRequest latency may increase slightly, some requests may time out and some will be rejected due to backpressure.\nThe overall throughput in terms of created and completed process instances as well as jobs may similarly decrease slightly."}),"\n",(0,n.jsx)(s.h3,{id:"actual",children:"Actual"}),"\n",(0,n.jsx)(s.p,{children:"Following are screenshots of collected metrics.\nThe blue annotation marks the time where scaling occurred."}),"\n",(0,n.jsx)(s.p,{children:"We see a short increase in process instance duration, meaning that some process instances were finished slightly slower than before."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{src:i(91731).Z+"",width:"840",height:"296"})}),"\n",(0,n.jsx)(s.p,{children:"The throughput in terms of created and completed process instances and jobs remained very stable."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{src:i(8625).Z+"",width:"1665",height:"296"})}),"\n",(0,n.jsx)(s.p,{children:"We see a small increase in requests timing out or getting rejected by backpressure."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{src:i(63496).Z+"",width:"840",height:"296"})}),"\n",(0,n.jsx)(s.p,{children:"Overall, this matches our expectation and shows that scaling up has a small impact on processing performance."}),"\n",(0,n.jsx)(s.h2,{id:"scaling-under-load",children:"Scaling under load"}),"\n",(0,n.jsx)(s.p,{children:"Since scaling up is supposed to alleviate high processing load for brokers, it's important that it works even under high load.\nFor this test, we increased the load on the same cluster setup as before to 210 instead of 150 process instances per second.\nThis is roughly the maximum throughput that the 3 brokers with 6 partitions and replication factor 3 can handle.\nWe can see this from the relatively high backpressure, as well as high process instance duration."}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.img,{src:i(30207).Z+"",width:"628",height:"220"}),"\n",(0,n.jsx)(s.img,{src:i(4294).Z+"",width:"840",height:"296"})]}),"\n",(0,n.jsx)(s.h3,{id:"expected-1",children:"Expected"}),"\n",(0,n.jsx)(s.p,{children:"We expect that scaling up to 6 brokers will still complete successfully, even under high load.\nThe time it takes until scaling is complete might be slightly higher.\nThe impact on processing performance, both in terms of throughput and latency, may be slightly larger than in the previous experiment."}),"\n",(0,n.jsx)(s.h3,{id:"actual-1",children:"Actual"}),"\n",(0,n.jsxs)(s.p,{children:["The process instance duration did not increase, and even decreased slightly.\n",(0,n.jsx)(s.img,{src:i(84428).Z+"",width:"840",height:"296"})]}),"\n",(0,n.jsxs)(s.p,{children:["Similarly, the throughput in terms of created and completed process instances and jobs remained relatively stable.\n",(0,n.jsx)(s.img,{src:i(55353).Z+"",width:"1687",height:"296"})]}),"\n",(0,n.jsxs)(s.p,{children:["The number of failed requests increased slightly, but still well within an acceptable range.\n",(0,n.jsx)(s.img,{src:i(45331).Z+"",width:"840",height:"296"})]}),"\n",(0,n.jsx)(s.p,{children:"The scaling operation took 5 minutes, a good portion of which is waiting for the new brokers to get scheduled and start up."}),"\n",(0,n.jsx)(s.p,{children:"Overall, this matches our expectation and shows that scaling can complete fast and with low impact on processing performance, even under high load."}),"\n",(0,n.jsx)(s.h2,{id:"scaling-up-to-improve-performance",children:"Scaling up to improve performance"}),"\n",(0,n.jsx)(s.p,{children:"The most obvious goal of scaling brokers is to unlock additional processing performance.\nWhile vertical scaling is also a great option, this can hit limits imposed by your infrastructure provider.\nFor example, some machine types may offer great CPU performance but are severely limited in IOPS.\nAdditionally, vertical scaling is often more expensive than horizontal scaling.\nIt also comes with increased risk when a single machine fails because the remaining machines may already run at their limits and will then struggle to handle the additional load during failover."}),"\n",(0,n.jsx)(s.p,{children:"To show how broker scaling can improve processing performance, we reused the same cluster setup as before.\nWe have 3 brokers, 6 partitions and replication factor 3."}),"\n",(0,n.jsx)(s.p,{children:"The brokers are limited to 1.35 CPUs and 4GiB RAM each.\nThey run with additional safety checks that are usually disabled in production and that slightly decrease the baseline processing performance.\nEach broker uses a small 32GiB SSD for storage, limiting them to a few thousand IOPS."}),"\n",(0,n.jsx)(s.p,{children:"We changed the processing load slightly to simulate a more realistic scenario.\nThe new process model consists of 10 tasks with two timers in-between, each delaying the process instance by 1 minute."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{src:i(47932).Z+"",width:"5823",height:"576"})}),"\n",(0,n.jsxs)(s.p,{children:["The processing load is generated by our own ",(0,n.jsx)(s.a,{href:"https://github.com/camunda/camunda/tree/9e723b21b0e408fc2b97fd7d3f6b092af8e62dbe/benchmarks",children:"benchmarking application"}),", initially starting 40 process instances per second."]}),"\n",(0,n.jsx)(s.p,{children:"This results in 400 jobs created and completed per second."}),"\n",(0,n.jsxs)(s.p,{children:["This stresses the 3 brokers and we see backpressure on all partitions.\n",(0,n.jsx)(s.img,{src:i(4754).Z+"",width:"628",height:"220"})]}),"\n",(0,n.jsxs)(s.p,{children:["We also see a few jobs timing out, indicating that the cluster is unable to handle this load consistency:\n",(0,n.jsx)(s.img,{src:i(94885).Z+"",width:"840",height:"220"})]}),"\n",(0,n.jsxs)(s.p,{children:["We also see that many jobs are active for much longer than 1 second, even though the workers only delay completion by 50ms.\n",(0,n.jsx)(s.img,{src:i(49214).Z+"",width:"840",height:"296"})]}),"\n",(0,n.jsx)(s.p,{children:"As hinted at before, much of this performance limit can be attributed to the limited IOPS of the small SSDs.\nWe see this in a very high commit and write latency, while the IOPS remain stable, right at the limit of what the SSDs can handle."}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.img,{src:i(87482).Z+"",width:"840",height:"296"}),"\n",(0,n.jsx)(s.img,{src:i(94348).Z+"",width:"840",height:"258"}),"\n",(0,n.jsx)(s.img,{src:i(97671).Z+"",width:"840",height:"258"})]}),"\n",(0,n.jsx)(s.h3,{id:"expected-2",children:"Expected"}),"\n",(0,n.jsx)(s.p,{children:"When we scale up to 6 brokers, and thus distribute the partitions such that each broker is only leader for 1 instead of 2 partitions, we expect that processing performance improves."}),"\n",(0,n.jsx)(s.p,{children:"As these things usually go, we don't expect a doubling in performance but aiming for a 1.5x improvement seems reasonable."}),"\n",(0,n.jsx)(s.h3,{id:"actual-2",children:"Actual"}),"\n",(0,n.jsxs)(s.p,{children:["Shortly after scaling up and after partition leadership has balanced, we see a significant improvement in backpressure.\n",(0,n.jsx)(s.img,{src:i(21066).Z+"",width:"628",height:"220"})]}),"\n",(0,n.jsxs)(s.p,{children:["The job lifetime decreases dramatically, with most jobs now taking < 50ms from creation until completion.\n",(0,n.jsx)(s.img,{src:i(24498).Z+"",width:"840",height:"296"})]}),"\n",(0,n.jsxs)(s.p,{children:["Overall processing latency improves similarly.\n",(0,n.jsx)(s.img,{src:i(40711).Z+"",width:"1688",height:"258"})]}),"\n",(0,n.jsx)(s.p,{children:"Much of this improvement can be attributed to the reduced IOPS."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{src:i(23952).Z+"",width:"840",height:"296"})}),"\n",(0,n.jsxs)(s.p,{children:["Commit and write latency improves accordingly.\n",(0,n.jsx)(s.img,{src:i(74012).Z+"",width:"840",height:"258"}),"\n",(0,n.jsx)(s.img,{src:i(20086).Z+"",width:"840",height:"258"})]}),"\n",(0,n.jsxs)(s.p,{children:["Another source for improved performance is reduced CPU load.\nWith 3 brokers being leader for 2 partitions each, they were hitting their CPU limits and got throttled by the underlying infrastructure.\nWith 6 brokers, each only being leader for 1 partition, the CPU load is reduced and brokers are no longer throttled.\n",(0,n.jsx)(s.img,{src:i(53562).Z+"",width:"840",height:"296"})]}),"\n",(0,n.jsx)(s.p,{children:"While this is already a success, we can push things further now.\nWe are able to increase the load from 40 to 65 process instances per second, resulting in 650 jobs created and completed per second.\nThis is a 1.6x improvement over the initial load while achieving similar backpressure."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{src:i(85982).Z+"",width:"628",height:"220"})}),"\n",(0,n.jsxs)(s.p,{children:["Job lifetime and overall processing latency is still better than before scaling up, even though load increased by 1.6x\n",(0,n.jsx)(s.img,{src:i(62055).Z+"",width:"840",height:"296"}),"\n",(0,n.jsx)(s.img,{src:i(10629).Z+"",width:"1688",height:"258"})]}),"\n",(0,n.jsx)(s.p,{children:"Overall, this shows that scaling up can improve processing performance significantly, especially when the initial cluster setup is resource limited and vertical scaling is not possible."})]})}function d(e={}){const{wrapper:s}={...(0,a.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},63496:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/failed_requests-47e5e20dec7558d9bf262572e4bceef2.png"},30207:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/high_load_backpressure-5c264822dfc52c8f31072e9a41e892e3.png"},4294:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/high_load_latency-75cc8b8a9b6ceb63a32d418e96a649f4.png"},45331:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/high_load_scaling_failed_requests-74619f4fae76f750b3dd1a7e548ae5a9.png"},84428:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/high_load_scaling_latency-bda55e145412ae73d60bcefa7129ea4c.png"},55353:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/high_load_scaling_throughput-d1da75d1c6483a9801c0cb46c85dd112.png"},91731:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/increased_process_duration-3bc31b565412bb200dd5004cf1a393f9.png"},45553:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/one_task-f083f237e568d87cc17eef056cb45d73.png"},21066:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_after_backpressure-8ea0858dc7e2dbd99c1d9072ad4e9d9e.png"},74012:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_after_commit_latency-3038b133286dfe6303ae585152b74ddf.png"},53562:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_after_cpu-27360ba363b21f8be99ae11009830041.png"},23952:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_after_iops-9d4cfe0e830dc5b2172dba4cf77c772b.png"},24498:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_after_job_lifetime-1484937ab54af54c7c9c62e4d3f40bed.png"},40711:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_after_processing_latency-0dc8cc62dc0d3416af386c2f7f3b8a7a.png"},20086:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_after_write_latency-83d3d31f30acf064ee5c31792718e02c.png"},85982:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_increased_load_backpressure-50539a70042461e4c0f57395ab9a2981.png"},62055:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_increased_load_job_lifetime-357a5db1cfce78fb1788dc3bd8dd83c5.png"},10629:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_increased_load_processing_latency-629f9fc40962d34a30a3a51c2b62c7ba.png"},4754:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_initial_backpressure-ff99c218bd0d2169e80612db06918bee.png"},94348:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_initial_commit_latency-1618c887bba63eaf893d2073070c58a6.png"},87482:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_initial_iops-ef1bfdab00c42f7e496bb8361b82837f.png"},49214:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_initial_job_lifetime-aa635408ad750e58f3c4d5aba42cfb71.png"},94885:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_initial_timeouts-184ec92cae00e964d1cb981d81c9094c.png"},97671:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/perf_initial_write_latency-fdfbc2b5a7814ded4ce935a4432c27b2.png"},8625:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/stable_throughput-92c3e8b4711794408ae03779025d148b.png"},47932:(e,s,i)=>{i.d(s,{Z:()=>n});const n=i.p+"assets/images/ten_tasks-97eff1de6db0dbb79ae9681cedd14a93.png"},11151:(e,s,i)=>{i.d(s,{Z:()=>c,a:()=>r});var n=i(67294);const a={},t=n.createContext(a);function r(e){const s=n.useContext(t);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),n.createElement(t.Provider,{value:s},e.children)}}}]);