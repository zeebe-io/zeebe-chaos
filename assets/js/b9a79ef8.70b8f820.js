"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[9031],{82262:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var s=a(74848),n=a(28453);const i={layout:"posts",title:"Slow Network",date:new Date("2021-07-06T00:00:00.000Z"),categories:["chaos_experiment","broker","network","leader"],tags:["availability"],authors:"zell"},o="Chaos Day Summary",r={permalink:"/zeebe-chaos/2021/07/06/Slow-Network",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-07-06-Slow-Network/index.md",source:"@site/blog/2021-07-06-Slow-Network/index.md",title:"Slow Network",description:"On a previous Chaos Day we played around with ToxiProxy , which allows injecting failures on the network level. For example dropping packages, causing latency etc.",date:"2021-07-06T00:00:00.000Z",tags:[{inline:!0,label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:5.905,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",page:{permalink:"/zeebe-chaos/authors/zell"},imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Slow Network",date:"2021-07-06T00:00:00.000Z",categories:["chaos_experiment","broker","network","leader"],tags:["availability"],authors:"zell"},unlisted:!1,prevItem:{title:"Old-Clients",permalink:"/zeebe-chaos/2021/09/23/Old-Clients"},nextItem:{title:"Full Disk Recovery",permalink:"/zeebe-chaos/2021/06/08/Full-Disk"}},l={authorsImageUrls:[void 0]},c=[{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Hypothesis",id:"hypothesis",level:3},{value:"Experiment",id:"experiment",level:3},{value:"TC",id:"tc",level:4},{value:"Actual",id:"actual",level:4},{value:"Steady State",id:"steady-state",level:5},{value:"100 ms",id:"100-ms",level:5},{value:"250 ms",id:"250-ms",level:5},{value:"Result",id:"result",level:3}];function h(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",h5:"h5",img:"img",p:"p",pre:"pre",strong:"strong",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["On a previous ",(0,s.jsx)(t.a,{href:"/zeebe-chaos/2020/10/06/toxi-proxy",children:"Chaos Day"})," we played around with ",(0,s.jsx)(t.a,{href:"https://github.com/Shopify/toxiproxy",children:"ToxiProxy"})," , which allows injecting failures on the network level. For example dropping packages, causing latency etc."]}),"\n",(0,s.jsxs)(t.p,{children:["Last week ",(0,s.jsx)(t.a,{href:"https://github.com/deepthidevaki",children:"@Deepthi"})," mentioned to me that we can do similar things with ",(0,s.jsx)(t.a,{href:"https://man7.org/linux/man-pages/man8/tc.8.html",children:"tc"}),", which is a built-in linux command. Today I wanted to experiment with latency between leader and followers using ",(0,s.jsx)(t.code,{children:"tc"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"TL;DR;"})," The experiment failed; With adding 100ms network delay to the Leader we broke the complete processing throughput. ","\ud83d\udca5"]}),"\n",(0,s.jsx)(t.h2,{id:"chaos-experiment",children:"Chaos Experiment"}),"\n",(0,s.jsx)(t.p,{children:"We want to experiment with network latency and what kind of effect has a slow network on the cluster."}),"\n",(0,s.jsx)(t.h3,{id:"hypothesis",children:"Hypothesis"}),"\n",(0,s.jsx)(t.p,{children:"We expect that we can handle certain network latency, due to our heartbeat and election time timeouts. After, reaching the deadlines we expect fail overs and followers which are lagging behind."}),"\n",(0,s.jsx)(t.p,{children:"This means under a certain threshold we should be able to still process user commands, with slightly delay but without real issues. After reaching the deadline and the fail overs, it should be possible to continue, since we will add only to one node the delay."}),"\n",(0,s.jsx)(t.h3,{id:"experiment",children:"Experiment"}),"\n",(0,s.jsx)(t.h4,{id:"tc",children:"TC"}),"\n",(0,s.jsxs)(t.p,{children:["TC is a built in linux command, the manpage summarizes it as ",(0,s.jsx)(t.code,{children:"tc - show / manipulate traffic control settings"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["In order to ",(0,s.jsx)(t.a,{href:"https://netbeez.net/blog/how-to-use-the-linux-traffic-control/",children:"add delay to a network interface"}),", we can run the following:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"tc qdisc add dev eth0 root netem delay 200ms\n"})}),"\n",(0,s.jsxs)(t.p,{children:["More details (",(0,s.jsx)(t.a,{href:"https://netbeez.net/blog/how-to-use-the-linux-traffic-control/",children:"taken from the blog post"}),"):"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"qdisc: modify the scheduler (aka queuing discipline)\nadd: add a new rule\ndev eth0: rules will be applied on device eth0\nroot: modify the outbound traffic scheduler (aka known as the egress qdisc)\nnetem: use the network emulator to emulate a WAN property\ndelay: the network property that is modified\n200ms: introduce delay of 200 ms\n"})}),"\n",(0,s.jsx)(t.p,{children:"Adding this kind of rule means that we add a delay to all outgoing connections, which are going over this network interface."}),"\n",(0,s.jsx)(t.h4,{id:"actual",children:"Actual"}),"\n",(0,s.jsx)(t.p,{children:"In order to reduce the blast radius we will run the experiment with one partition on a three broker cluster (replication factor 3)."}),"\n",(0,s.jsx)(t.h5,{id:"steady-state",children:"Steady State"}),"\n",(0,s.jsx)(t.p,{children:"As we can see in the benchmark we are able to reach in avg. ~77 process instance creation and completions per second."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base",src:a(6730).A+"",width:"1194",height:"963"})}),"\n",(0,s.jsxs)(t.p,{children:["The process instance execution time (from start to end) is under 1 second.\n",(0,s.jsx)(t.img,{alt:"base",src:a(5528).A+"",width:"1189",height:"636"})]}),"\n",(0,s.jsxs)(t.p,{children:["The commit latency is about 100 ms.\n",(0,s.jsx)(t.img,{alt:"base",src:a(23731).A+"",width:"594",height:"265"})]}),"\n",(0,s.jsx)(t.p,{children:"We can see that one of the followers is a bit lagging behind, but not too far."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base",src:a(69626).A+"",width:"1187",height:"575"})}),"\n",(0,s.jsx)(t.h5,{id:"100-ms",children:"100 ms"}),"\n",(0,s.jsx)(t.p,{children:"In the first iteration of the experiment we added a 100 ms delay to the leaders outgoing traffic."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sh",children:"[zell zell-chaos-day/ cluster: zeebe-cluster ns:zell-chaos-day]$ k exec -it zell-chaos-day-zeebe-gateway-579c76978f-npz2k -- zbctl status --insecure\nCluster size: 3\nPartitions count: 1\nReplication factor: 3\nGateway version: 1.1.0-SNAPSHOT\nBrokers:\n  Broker 0 - zell-chaos-day-zeebe-0.zell-chaos-day-zeebe.zell-chaos-day.svc.cluster.local:26501\n    Version: 1.1.0-SNAPSHOT\n    Partition 1 : Follower, Healthy  Broker 1 - zell-chaos-day-zeebe-1.zell-chaos-day-zeebe.zell-chaos-day.svc.cluster.local:26501\n    Version: 1.1.0-SNAPSHOT\n    Partition 1 : Follower, Healthy  Broker 2 - zell-chaos-day-zeebe-2.zell-chaos-day-zeebe.zell-chaos-day.svc.cluster.local:26501\n    Version: 1.1.0-SNAPSHOT\n    Partition 1 : Leader, Healthy\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Based on the ",(0,s.jsx)(t.code,{children:"zbctl"})," output, or the grafana dashboard we can find out who is the leader. Note that the output of ",(0,s.jsx)(t.code,{children:"zbctl"})," looks still a bit broken, related issue ",(0,s.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/6692",children:"#6692"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"With the following commands we can add the delay of 100 ms to the leaders outgoing traffic."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-sh",children:"[zell zell-chaos-day/ cluster: zeebe-cluster ns:zell-chaos-day]$ k exec -it zell-chaos-day-zeebe-2 -- bash\nroot@zell-chaos-day-zeebe-2:/usr/local/zeebe# tc qdisc add dev eth0 root netem delay 100ms\nroot@zell-chaos-day-zeebe-2:/usr/local/zeebe# tc -s qdisc\nqdisc noqueue 0: dev lo root refcnt 2 \n Sent 0 bytes 0 pkt (dropped 0, overlimits 0 requeues 0) \n backlog 0b 0p requeues 0\nqdisc netem 8001: dev eth0 root refcnt 2 limit 1000 delay 100.0ms\n Sent 11635496 bytes 10086 pkt (dropped 0, overlimits 0 requeues 0) \n backlog 339773b 77p requeues 0\n"})}),"\n",(0,s.jsx)(t.p,{children:"Almost immediately we see a drop in our general section of the Grafana Dashboard."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base",src:a(61332).A+"",width:"1196",height:"962"})}),"\n",(0,s.jsx)(t.p,{children:"The backpressure increased significantly. As expected the commit latency increased."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base",src:a(50101).A+"",width:"597",height:"266"})}),"\n",(0,s.jsx)(t.p,{children:"The processing latency as well."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base",src:a(98174).A+"",width:"1191",height:"642"})}),"\n",(0,s.jsx)(t.p,{children:"It was unexpected that the throughput breaks down so much. We can see in the send request that a lot of the requests are ended with timeouts or with resource exhausted."}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.img,{alt:"base",src:a(92858).A+"",width:"1187",height:"640"}),"\n",(0,s.jsx)(t.img,{alt:"base",src:a(52246).A+"",width:"1191",height:"647"})]}),"\n",(0,s.jsx)(t.p,{children:"Interesting is that no worker is able to activate nor complete any job. This cause increasing of the running process instances, so the state is growing."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base",src:a(8372).A+"",width:"1181",height:"419"})}),"\n",(0,s.jsx)(t.p,{children:"Taking a look at the raft metrics we see that this already caused some heartbeat misses, but no leader change."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base",src:a(72493).A+"",width:"1193",height:"613"})}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base",src:a(42444).A+"",width:"1194",height:"576"})}),"\n",(0,s.jsxs)(t.p,{children:["The follower is now lagging far more behind. We can see in the logs that the Leader tries to send ",(0,s.jsx)(t.code,{children:"InstallRequests"}),", but these are also timing out."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:'RaftServer{raft-partition-partition-1} - InstallRequest{currentTerm=1, leader=2, index=1173627, term=1, version=1, chunkId=HeapByteBuffer{position=0, remaining=10, limit=10, capacity=10, mark=java.nio.HeapByteBuffer[pos=0 lim=10 cap=10], hash=1744147670}, nextChunkId=HeapByteBuffer{position=0, remaining=7, limit=7, capacity=7, mark=java.nio.HeapByteBuffer[pos=0 lim=7 cap=7], hash=1283029304}, data=HeapByteBuffer{position=0, remaining=10626817, limit=10626817, capacity=10626817, mark=java.nio.HeapByteBuffer[pos=0 lim=10626817 cap=10626817], hash=1083445787}, initial=false, complete=false} to 1 failed: java.util.concurrent.CompletionException: java.util.concurrent.TimeoutException: Request ProtocolRequest{id=489616, subject=raft-partition-partition-1-install, sender=zell-chaos-day-zeebe-2.zell-chaos-day-zeebe.zell-chaos-day.svc.cluster.local:26502, payload=byte[]{length=10647731, hash=1655826849}} to zell-chaos-day-zeebe-1.zell-chaos-day-zeebe.zell-chaos-day.svc.cluster.local:26502 timed out in PT5S"\n'})}),"\n",(0,s.jsx)(t.p,{children:"The follower is starting regularly elections, but is not able to overturn the existing leader."}),"\n",(0,s.jsx)(t.p,{children:"In general, in the Gateway logs we can see the start of the delay injection quite good."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"D 2021-07-06T10:05:51.263195Z Received REACHABILITY_CHANGED for broker 2, do nothing.\nD 2021-07-06T10:05:53.264480Z Received REACHABILITY_CHANGED for broker 1, do nothing.\nD 2021-07-06T10:05:54.184981Z Received REACHABILITY_CHANGED for broker 2, do nothing.\nD 2021-07-06T10:05:54.213904Z Received REACHABILITY_CHANGED for broker 1, do nothing.\nD 2021-07-06T10:05:54.361408Z Received REACHABILITY_CHANGED for broker 0, do nothing.\nD 2021-07-06T10:05:54.986270Z Received REACHABILITY_CHANGED for broker 0, do nothing.\nD 2021-07-06T10:05:56.617134Z Received REACHABILITY_CHANGED for broker 2, do nothing.\nD 2021-07-06T10:05:57.072707Z Expected to handle gRPC request, but request timed out between gateway and broker\nD 2021-07-06T10:05:57.126207Z Expected to handle gRPC request, but request timed out between gateway and broker\nD 2021-07-06T10:05:57.157683Z Expected to handle gRPC request, but request timed out between gateway and broker\n"})}),"\n",(0,s.jsx)(t.p,{children:"Similar logs we see on the broker side."}),"\n",(0,s.jsx)(t.p,{children:"In general, we can say the experiment failed. The cluster was not able to run our normal workload. It seem to behave quite bad, but there were no leader change at all."}),"\n",(0,s.jsx)(t.h5,{id:"250-ms",children:"250 ms"}),"\n",(0,s.jsx)(t.p,{children:"In order to verify whether 250 ms, will cause a leader election we reconfigured the delay. It looked quite similar, performance wise, but the heartbeats for one of the followers increased. Still it was not enough to cause a leader change."}),"\n",(0,s.jsx)(t.p,{children:"After several minutes (~30) of running this configuration we were able to observe that one of the other followers missed heartbeats as well. This finally caused a leader change."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base",src:a(50991).A+"",width:"1204",height:"603"})}),"\n",(0,s.jsx)(t.p,{children:"The throughput came back, it was similar to what is was before."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base",src:a(25368).A+"",width:"1191",height:"964"})}),"\n",(0,s.jsx)(t.p,{children:"The processing execution latency was higher than usual."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base",src:a(17434).A+"",width:"1187",height:"645"})}),"\n",(0,s.jsx)(t.p,{children:"Similar to the commit latency, interesting to see such an affect caused by a follower with network issues."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base",src:a(7633).A+"",width:"597",height:"265"})}),"\n",(0,s.jsx)(t.h3,{id:"result",children:"Result"}),"\n",(0,s.jsx)(t.p,{children:"As written before the experiment failed, the hypothesis was not met. We were not able to add latency to the network, which is much lower than our deadlines (heartbeat timeout is 2.5 seconds), without causing any harm to our processing throughput/latency."}),"\n",(0,s.jsx)(t.p,{children:"Still we had some interesting observations we can use for our next experiments and insight which we need to consider on setting up Zeebe in environment where the network might be unreliable/slow."})]})}function d(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},50101:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/100ms-commit-lat-e9f2fb099ca82d84761ef6ffaca428db.png"},42444:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/100ms-follower-93ff4bcec9b9cba018a65268f6f069d0.png"},52246:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/100ms-gateway-767136da5cb5e9032275d4ee41b05fff.png"},61332:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/100ms-general-a6a99e2144909bf47c029ebcd8543f33.png"},92858:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/100ms-grpc-5c44c33e0cfa6d55da14c7cc5092c705.png"},72493:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/100ms-heartbeats-1b9a59af419679228f9d703afe1819e9.png"},98174:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/100ms-latency-85f7dc47d9d5606469244efc363cc638.png"},8372:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/100ms-running-proc-8f4fadc0b12cf5ae463c8f82894c5cd5.png"},7633:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/250ms-commit-lat-0a8e3826a19cdea9b948f42fa639bd6f.png"},25368:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/250ms-general-95e282a9fbe58ff95fe883e7d80c2739.png"},17434:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/250ms-latency-0dd3474f142f7d3642605a2b8353186d.png"},50991:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/250ms-raft-55d2027e863459de3a070d017e813d59.png"},23731:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/commit-lat-9b72095b6933ef77b97f994ece9d17f9.png"},6730:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/general-18fcb0bda36206ab196aeb507a0c1eac.png"},5528:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/latency-50564f2ce63c84257c134178924d2c57.png"},69626:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/images/raft-follower-7e8113946fa0a082e57f5ae190a21baa.png"},28453:(e,t,a)=>{a.d(t,{R:()=>o,x:()=>r});var s=a(96540);const n={},i=s.createContext(n);function o(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);