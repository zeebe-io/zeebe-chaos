"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[7564],{34129:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>h,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>o});var s=n(25251),a=n(74848),i=n(28453);const r={layout:"posts",title:"High Snapshot Frequency",date:new Date("2022-02-01T00:00:00.000Z"),categories:["chaos_experiment","data"],tags:["availability"],authors:"zell"},h="Chaos Day Summary",l={authorsImageUrls:[void 0]},o=[{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Snapshot Interval",id:"snapshot-interval",level:3},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3},{value:"Smaller intervals",id:"smaller-intervals",level:4},{value:"Bigger intervals",id:"bigger-intervals",level:4},{value:"Result",id:"result",level:3},{value:"Found Bugs",id:"found-bugs",level:2}];function c(e){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["Today we wanted to experiment with the snapshot interval and verify that a high snapshot frequency will not impact our availability (",(0,a.jsx)(t.a,{href:"https://github.com/zeebe-io/zeebe-chaos/issues/21",children:"#21"}),")."]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"TL;DR;"})," The chaos experiment succeeded ","\ud83d\udcaa"," We were able to prove our hypothesis."]}),"\n",(0,a.jsx)(t.h2,{id:"chaos-experiment",children:"Chaos Experiment"}),"\n",(0,a.jsx)(t.h3,{id:"snapshot-interval",children:"Snapshot Interval"}),"\n",(0,a.jsxs)(t.p,{children:["As we can see in the ",(0,a.jsx)(t.a,{href:"https://docs.camunda.io/docs/self-managed/zeebe-deployment/operations/resource-planning/#snapshots",children:"docs"})," a snapshot is defined as:"]}),"\n",(0,a.jsxs)(t.blockquote,{children:["\n",(0,a.jsx)(t.p,{children:"A snapshot is a projection of all events that represent the current running state of the processes running on the partition. It contains all active data, for example, deployed processes, active process instances, and not yet completed jobs."}),"\n"]}),"\n",(0,a.jsxs)(t.p,{children:["Per default snapshots are taken every 5 minutes, by leaders and followers. If a follower is lagging behind (with replication) the leader will, after reaching a certain threshold, prefer to send the follower a snapshot instead of replicating X amount of records. We recently observed that this currently happens quite often, see ",(0,a.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/8565",children:"#8565"}),"."]}),"\n",(0,a.jsxs)(t.p,{children:["The snapshot interval can be changed via an environment variable: ",(0,a.jsx)(t.code,{children:"ZEEBE_BROKER_DATA_SNAPSHOTPERIOD"})]}),"\n",(0,a.jsx)(t.h3,{id:"expected",children:"Expected"}),"\n",(0,a.jsx)(t.p,{children:"We expect that even if the snapshot interval is low (so the frequency of taking snapshot is high) we not run into any availability issues and the cluster should still be healthy. Lower snapshot interval might impact the performance, since taking a snapshot can take some time but other than that it shouldn't have any effect."}),"\n",(0,a.jsx)(t.h3,{id:"actual",children:"Actual"}),"\n",(0,a.jsxs)(t.p,{children:["As usual, we run again two benchmarks to compare them. One base which has the ",(0,a.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/tree/develop/benchmarks/setup/default",children:"default benchmark configuration"})," and one with a changed snapshot interval."]}),"\n",(0,a.jsx)(t.p,{children:"For the second benchmark we set the snapshot interval to one minute. Like this:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:'env:\n  ...\n    - name: ZEEBE_BROKER_DATA_SNAPSHOTPERIOD\n    value: "1m"\n'})}),"\n",(0,a.jsx)(t.p,{children:"Throughput wise we can see a small difference, but this might be more related that on the base benchmark one node is leader for all partitions."}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Base"}),(0,a.jsx)(t.th,{children:"Chaos"})]})}),(0,a.jsx)(t.tbody,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:(0,a.jsx)(t.img,{src:n(51818).A+"",width:"1842",height:"992"})}),(0,a.jsx)(t.td,{children:(0,a.jsx)(t.img,{src:n(3644).A+"",width:"1834",height:"994"})})]})})]}),"\n",(0,a.jsx)(t.p,{children:"In general the cluster with the small snapshot interval shows no negative effect. What we can see is that the install request rate increased. It seems to be currently have no affect, but it is likely that if more partitions are added it might become an issue."}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Base"}),(0,a.jsx)(t.th,{children:"Chaos"})]})}),(0,a.jsx)(t.tbody,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:(0,a.jsx)(t.img,{src:n(50584).A+"",width:"1832",height:"539"})}),(0,a.jsx)(t.td,{children:(0,a.jsx)(t.img,{src:n(90346).A+"",width:"1831",height:"538"})})]})})]}),"\n",(0,a.jsxs)(t.p,{children:["Further investigation needs to be done as part of ",(0,a.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/8565",children:"#8565"}),"."]}),"\n",(0,a.jsx)(t.h4,{id:"smaller-intervals",children:"Smaller intervals"}),"\n",(0,a.jsxs)(t.p,{children:["The smallest interval which Zeebe supports is ",(0,a.jsx)(t.code,{children:"1m == 1 minute"}),". If we configure for example ",(0,a.jsx)(t.code,{children:"1s"})]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:'env:\n  ...\n    - name: ZEEBE_BROKER_DATA_SNAPSHOTPERIOD\n    value: "1s"\n'})}),"\n",(0,a.jsx)(t.p,{children:"We see the following exception in the log and the broker fails to start."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"java.lang.IllegalArgumentException: Snapshot period PT1S needs to be larger then or equals to one minute.\n"})}),"\n",(0,a.jsx)(t.h4,{id:"bigger-intervals",children:"Bigger intervals"}),"\n",(0,a.jsx)(t.p,{children:"In order to verify how Zeebe reacts on a bigger snapshot interval we have set the interval to 30 minutes."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:'env:\n  ...\n    - name: ZEEBE_BROKER_DATA_SNAPSHOTPERIOD\n    value: "30m"\n'})}),"\n",(0,a.jsx)(t.p,{children:"In general, it looked good. What we can see is that one node was restarted in between and took a while to come back."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{src:n(49790).A+"",width:"1840",height:"986"})}),"\n",(0,a.jsx)(t.p,{children:"This is expected due to the high snapshot interval, but interesting to observe. The leader had no snapshot yet produced, which means it had to replicate all events to the restarted follower. Only if the follower catches up on all partitions its bootstrap process is complete, and it can mark itself as ready. As we see it can take a while if there is no snapshot available, since new records are incoming all the time."}),"\n",(0,a.jsx)(t.p,{children:"After the leader of partition two took a snapshot and the leader sent this snapshot to the follower, the follower were able to become ready."}),"\n",(0,a.jsx)(t.p,{children:"Even with a big snapshot interval we can see that as soon as a new snapshot is taken it is sent to the followers, which is suboptimal."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{src:n(36292).A+"",width:"2472",height:"274"})}),"\n",(0,a.jsx)(t.p,{children:"An important thing to keep in mind when playing around with snapshots is the logstream/journal size. The journal is only compacted after taking a snapshot, if we take snapshot less frequent this means we clean up less frequent. The log can grow much bigger with big snapshot intervals."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{src:n(76338).A+"",width:"1219",height:"295"})}),"\n",(0,a.jsx)(t.h3,{id:"result",children:"Result"}),"\n",(0,a.jsxs)(t.p,{children:["The chaos experiment succeeded ","\ud83c\udf89"," We verified that a smaller snapshot interval has no negative impact on the cluster availability, at least for a small amount of partitions."]}),"\n",(0,a.jsx)(t.h2,{id:"found-bugs",children:"Found Bugs"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["Existing issue regarding the install requests ",(0,a.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/8565",children:"#8565"})]}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},49790:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/big-general-799179b5b7dc76032320f1a31488778f.png"},36292:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/big-install-freq-ec4ff83707c476e44d9469cc1969b106.png"},76338:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/big-interval-log-84637b403e2e447d914fbf9fc386e164.png"},51818:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/chaos-base-general-93cd02e76e4ef0ed2125c457d5137ac0.png"},50584:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/chaos-base-install-freq-8110ca25fd510d004d558c30a6a75ad6.png"},3644:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/chaos-general-5d09330d3230f0843593e5384da1563f.png"},90346:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/chaos-install-freq-aea78deeffe000efe95cf1c111dade6f.png"},28453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>h});var s=n(96540);const a={},i=s.createContext(a);function r(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function h(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),s.createElement(i.Provider,{value:t},e.children)}},25251:e=>{e.exports=JSON.parse('{"permalink":"/zeebe-chaos/2022/02/01/High-Snapshot-Frequency","editUrl":"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2022-02-01-High-Snapshot-Frequency/index.md","source":"@site/blog/2022-02-01-High-Snapshot-Frequency/index.md","title":"High Snapshot Frequency","description":"Today we wanted to experiment with the snapshot interval and verify that a high snapshot frequency will not impact our availability (#21).","date":"2022-02-01T00:00:00.000Z","tags":[{"inline":true,"label":"availability","permalink":"/zeebe-chaos/tags/availability"}],"readingTime":3.52,"hasTruncateMarker":true,"authors":[{"name":"Christopher Kujawa","title":"Chaos Engineer @ Zeebe","url":"https://github.com/ChrisKujawa","page":{"permalink":"/zeebe-chaos/authors/zell"},"imageURL":"https://github.com/ChrisKujawa.png","key":"zell"}],"frontMatter":{"layout":"posts","title":"High Snapshot Frequency","date":"2022-02-01T00:00:00.000Z","categories":["chaos_experiment","data"],"tags":["availability"],"authors":"zell"},"unlisted":false,"prevItem":{"title":"Standalone Gateway in CCSaaS","permalink":"/zeebe-chaos/2022/02/15/Standalone-Gateway-in-CCSaaS"},"nextItem":{"title":"Handling of Big Variables","permalink":"/zeebe-chaos/2022/01/19/big-variables"}}')}}]);