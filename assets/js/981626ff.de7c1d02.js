"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[2973],{48058:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>l,frontMatter:()=>r,metadata:()=>h,toc:()=>d});var s=n(74848),a=n(28453);const r={layout:"posts",title:"Recovery (Fail Over) time",date:new Date("2021-10-05T00:00:00.000Z"),categories:["chaos_experiment","fail_over"],tags:["availability"],authors:"zell"},i="Chaos Day Summary",h={permalink:"/zeebe-chaos/2021/10/05/recovery-time",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2021-10-05-recovery-time/index.md",source:"@site/blog/2021-10-05-recovery-time/index.md",title:"Recovery (Fail Over) time",description:'In the last quarter we worked on a new "feature" which is called "building state on followers". In short,',date:"2021-10-05T00:00:00.000Z",tags:[{inline:!0,label:"availability",permalink:"/zeebe-chaos/tags/availability"}],readingTime:4.895,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",page:{permalink:"/zeebe-chaos/authors/zell"},imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Recovery (Fail Over) time",date:"2021-10-05T00:00:00.000Z",categories:["chaos_experiment","fail_over"],tags:["availability"],authors:"zell"},unlisted:!1,prevItem:{title:"Throughput on big state",permalink:"/zeebe-chaos/2021/10/29/Throughput-on-big-state"},nextItem:{title:"Old-Clients",permalink:"/zeebe-chaos/2021/09/23/Old-Clients"}},o={authorsImageUrls:[void 0]},d=[{value:"First Chaos Experiment",id:"first-chaos-experiment",level:2},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3},{value:"Second Chaos Experiment",id:"second-chaos-experiment",level:2},{value:"Expected",id:"expected-1",level:3},{value:"Actual",id:"actual-1",level:3},{value:"Running Instances",id:"running-instances",level:2},{value:"Performance",id:"performance",level:2}];function c(e){const t={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:['In the last quarter we worked on a new "feature" which is called "building state on followers". In short,\nit means that the followers apply the events to build there state, which makes regular snapshot\nreplication unnecessary and allows faster role transition between Follower-to-Leader. In this chaos\nday I wanted to experiment a bit with this property, we already did some benchmarks ',(0,s.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/7515",children:"here"}),".\nToday, I want to see how it behaves with larger state (bigger snapshots), since this needed to be\ncopied in previous versions of Zeebe, and the broker had to replay more than with the newest version."]}),"\n",(0,s.jsxs)(t.p,{children:["If you want to now more about build state on followers check out the ",(0,s.jsx)(t.a,{href:"https://github.com/zeebe-io/enhancements/blob/master/ZEP007-build-state-on-followers.md",children:"ZEP"})]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"TL;DR;"})," In our experiment we had almost no downtime, with version 1.2, the new leader was very fast able to pick up the next work (accept new commands)."]}),"\n",(0,s.jsx)(t.h2,{id:"first-chaos-experiment",children:"First Chaos Experiment"}),"\n",(0,s.jsx)(t.p,{children:"We will run two benchmarks one with 1.1 version and one with 1.2, to compare the differences between\nthe versions. We will run three brokers, with one partition and replication factor three."}),"\n",(0,s.jsxs)(t.p,{children:["In order to build up state we run the ",(0,s.jsx)(t.code,{children:"starter"})," with a ",(0,s.jsx)(t.code,{children:"durationLimit"}),", example cfg:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-shell",children:"            value: >-\n              -Dapp.brokerUrl=zell-chaos-12-zeebe-gateway:26500\n              -Dapp.starter.rate=100\n              -Dapp.starter.durationLimit=1000\n              -Dzeebe.client.requestTimeout=62000\n              -XX:+HeapDumpOnOutOfMemoryError\n"})}),"\n",(0,s.jsx)(t.p,{children:'This means that we run a rate of 100 PI/s creations over 1000 seconds. We expect at the end around\n100.000 PI, which should be enough to simulate a "big state".'}),"\n",(0,s.jsx)(t.p,{children:"After executing the starters we can see in the metrics the running instances:"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"instances",src:n(31854).A+"",width:"1187",height:"191"})}),"\n",(0,s.jsx)(t.p,{children:"And that the snapshot is around 600 to 700 MB."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"snapshot",src:n(37184).A+"",width:"591",height:"304"})}),"\n",(0,s.jsx)(t.h3,{id:"expected",children:"Expected"}),"\n",(0,s.jsx)(t.p,{children:"We expect that if we restart the current leader that a new leader is fast (under seconds) able to\ntake over and continues the work. The version 1.2 should perform here much better than 1.1."}),"\n",(0,s.jsx)(t.h3,{id:"actual",children:"Actual"}),"\n",(0,s.jsx)(t.p,{children:"Just normal bootstrap takes some time, on version 1.1:"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base-start-up",src:n(22664).A+"",width:"2468",height:"501"})}),"\n",(0,s.jsx)(t.p,{children:"For version 1.2:"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"12-start-up",src:n(5926).A+"",width:"2477",height:"494"})}),"\n",(0,s.jsxs)(t.p,{children:["After running the starters for a certain duration and restarting the leader we can see that\nthe processor recovery takes by ",(0,s.jsx)(t.em,{children:"factor 10"})," longer on version 1.1. Unfortunately, we have not the\nleader transition metric in that version to compare against."]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:(0,s.jsx)(t.strong,{children:"Version"})}),(0,s.jsx)(t.th,{children:(0,s.jsx)(t.strong,{children:"1.1"})}),(0,s.jsx)(t.th,{children:(0,s.jsx)(t.strong,{children:"1.2"})})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Recovery"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(93390).A+"",children:(0,s.jsx)(t.img,{alt:"base-recovery",src:n(21355).A+"",width:"1198",height:"490"})})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(87508).A+"",children:(0,s.jsx)(t.img,{alt:"12-recovery",src:n(4741).A+"",width:"1191",height:"495"})})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"General"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(92177).A+"",children:(0,s.jsx)(t.img,{alt:"base-recovery-general",src:n(22596).A+"",width:"1188",height:"957"})})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(56963).A+"",children:(0,s.jsx)(t.img,{alt:"12-recovery-general",src:n(14674).A+"",width:"1191",height:"948"})})})]})]})]}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.em,{children:"Sorry for the small pictures"})}),"\n",(0,s.jsx)(t.p,{children:'In general what we have seen is that it is not so easy to compare if there is no longer load on the\nsystem, which is the reason I did a second experiment with: A) "big state" and B) steady load.'}),"\n",(0,s.jsx)(t.h2,{id:"second-chaos-experiment",children:"Second Chaos Experiment"}),"\n",(0,s.jsx)(t.p,{children:'Similar setup to the first experiment, but additionally after the "big state" is reached a steady\nload is put on the system. One starter with a rate of 100 PI/s and one worker completing some jobs.'}),"\n",(0,s.jsx)(t.p,{children:"With that setup we want to verify how it affects the system if now a leader change happens."}),"\n",(0,s.jsx)(t.h3,{id:"expected-1",children:"Expected"}),"\n",(0,s.jsx)(t.p,{children:"Similar to above expect that if we restart the current leader that a new leader is fast\n(under seconds) able to take over and continues the work. The version 1.2 should perform here much\nbetter than 1.1."}),"\n",(0,s.jsx)(t.h3,{id:"actual-1",children:"Actual"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:(0,s.jsx)(t.strong,{children:"Version"})}),(0,s.jsx)(t.th,{children:(0,s.jsx)(t.strong,{children:"1.1"})}),(0,s.jsx)(t.th,{children:(0,s.jsx)(t.strong,{children:"1.2"})})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Recovery"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(61229).A+"",children:(0,s.jsx)(t.img,{alt:"base-general-state-and-throughput-recover-time.png",src:n(69290).A+"",width:"1192",height:"489"})})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(33804).A+"",children:(0,s.jsx)(t.img,{alt:"12-general-state-and-throughput-recover-time.png",src:n(45989).A+"",width:"1195",height:"487"})})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"General"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(87336).A+"",children:(0,s.jsx)(t.img,{alt:"base-general-state-and-throughput-recover-general.png",src:n(33421).A+"",width:"1187",height:"953"})})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(1071).A+"",children:(0,s.jsx)(t.img,{alt:"12-general-state-and-throughput-recover-general.png",src:n(14192).A+"",width:"1194",height:"970"})})})]})]})]}),"\n",(0,s.jsx)(t.p,{children:"After running the experiment again, this time with load, we can see that the version 1.1 took almost\n2 minutes! The newest Zeebe version (1.2), with building state on followers, took ~80 milliseconds!"}),"\n",(0,s.jsx)(t.p,{children:"We can see this much better also in the processing and throughput metrics on version 1.1 we have ~2\nminutes gap."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"base-general-state-and-throughput-recover-general-zoom.png",src:n(49997).A+"",width:"1185",height:"650"})}),"\n",(0,s.jsx)(t.p,{children:"The exporters can recover a bit faster than the processing, but we are for a while not able to accept\nany commands."}),"\n",(0,s.jsx)(t.p,{children:"In version 1.2 on the other hand we are able to almost immediately continue with the processing, some\nmetrics are not even able to show a gap in between, like the current events."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"12-general-state-and-throughput-recover-general-zoom.png",src:n(73318).A+"",width:"1191",height:"680"})}),"\n",(0,s.jsx)(t.h1,{id:"result",children:"Result"}),"\n",(0,s.jsx)(t.p,{children:"In general, we were able to show that the new approach of building state on followers, gives us an\nexcellent benefit in transitioning between Follower and Leader. Furthermore, it allows us to handle\nmuch larger state, since this doesn't need to be replicated on a regular basis."}),"\n",(0,s.jsx)(t.h1,{id:"found-bugs",children:"Found Bugs"}),"\n",(0,s.jsx)(t.h2,{id:"running-instances",children:"Running Instances"}),"\n",(0,s.jsx)(t.p,{children:"When experimenting with the clusters, building the state and deploying the steady load I\naccidentally deployed to many workers. This caused to complete all existing running instances. The\nissues here is that on the new leader the metric is zero, which results in a negative metric."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"broken-metric",src:n(67062).A+"",width:"1193",height:"196"})}),"\n",(0,s.jsx)(t.p,{children:"More problematic is actually that if you than build state again, you might reach the zero and if you\nobserve the cluster you can't be sure what the actual count of instances are. This makes the metric\nkind of useless."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.img,{alt:"broken-metric",src:n(58071).A+"",width:"1191",height:"825"})}),"\n",(0,s.jsx)(t.h2,{id:"performance",children:"Performance"}),"\n",(0,s.jsx)(t.p,{children:"During the experimenting it looked like that the performance of 1.2 degraded compared to 1.1. At the\nend I had on each benchmark one starter with 100 PI/s and one worker with capacity 12."}),"\n",(0,s.jsxs)(t.p,{children:["With version 1.1 it looked like we reached ~100 PI/s created/completed\n",(0,s.jsx)(t.img,{alt:"base-general-state-and-throughput-recovery-general-perf.png",src:n(54512).A+"",width:"1193",height:"928"})]}),"\n",(0,s.jsxs)(t.p,{children:["With version 1.2 we just reached ~30, which means it reduced by factor 3.\n",(0,s.jsx)(t.img,{alt:"12-general-state-and-throughput-recovery-general-perf.png",src:n(24398).A+"",width:"1188",height:"912"})]}),"\n",(0,s.jsx)(t.p,{children:"I think we need to verify whether this is really the case."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Update:"})}),"\n",(0,s.jsx)(t.p,{children:"I run again a benchmark for both versions, with one worker and one starter. It showed no significant\ndifference on throughput."}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:(0,s.jsx)(t.strong,{children:"Version"})}),(0,s.jsx)(t.th,{children:(0,s.jsx)(t.strong,{children:"1.1"})}),(0,s.jsx)(t.th,{children:(0,s.jsx)(t.strong,{children:"1.2"})})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Performance"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(65443).A+"",children:(0,s.jsx)(t.img,{alt:"perf-11",src:n(10270).A+"",width:"2468",height:"789"})})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(28584).A+"",children:(0,s.jsx)(t.img,{alt:"perf-12",src:n(77621).A+"",width:"2483",height:"786"})})})]})})]}),"\n",(0,s.jsx)(t.p,{children:"My current assumption is that it was related to the previous build up state and switching between\ndifferent worker configurations etc. Let us see whether we can observe this again."}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Update 2:"})}),"\n",(0,s.jsxs)(t.p,{children:["The second benchmark failed several days again, without any intervention. I investigated that issue further and it seem to be related to frequent install requests, which are sent by the leader. See for more information the related issue ",(0,s.jsx)(t.a,{href:"https://github.com/camunda-cloud/zeebe/issues/7955",children:"https://github.com/camunda-cloud/zeebe/issues/7955"})]})]})}function l(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1071:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/files/12-general-state-and-throughput-recovery-general-803fd268a252c919fb75fd5a0368a6a7.png"},33804:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/files/12-general-state-and-throughput-recovery-time-25934f696f3d76a60017fd5c85dda9ea.png"},56963:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/files/12-recovery-general-fa5b6920c1d994b36be40ee7130c86b0.png"},87508:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/files/12-recovery-fadf67de59709ef23de1048730aa1fa6.png"},87336:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/files/base-general-state-and-throughput-recover-general-494ebfac74f239ed6ab1e40c424e6719.png"},61229:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/files/base-general-state-and-throughput-recover-time-b9c20296a6c02ab22b64a90c8e5b0f3a.png"},92177:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/files/base-recovery-general-71b7de7df76b17ee89efd539b6a3b5b3.png"},93390:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/files/base-recovery-bee7a028446f8d3ee578efdcfb0ce458.png"},65443:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/files/perf-11-a3343c029716f6f663f5b3d93db133bc.png"},28584:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/files/perf-12-92bc1dfd1a0442252e1541a3bd41b310.png"},24398:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/12-general-state-and-throughput-recovery-general-perf-2e3b08a10dd42bd106818643de200518.png"},73318:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/12-general-state-and-throughput-recovery-general-zoom-cbb1fd991e637f0f84eded0bcb33ba3f.png"},14192:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/12-general-state-and-throughput-recovery-general-803fd268a252c919fb75fd5a0368a6a7.png"},45989:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/12-general-state-and-throughput-recovery-time-25934f696f3d76a60017fd5c85dda9ea.png"},14674:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/12-recovery-general-fa5b6920c1d994b36be40ee7130c86b0.png"},4741:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/12-recovery-fadf67de59709ef23de1048730aa1fa6.png"},5926:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/12-start-up-04e2050bd718b765993f07dc097b7678.png"},49997:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/base-general-state-and-throughput-recover-general-zoom-346e51e9a7d1c8fd37a995dcf13ec030.png"},33421:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/base-general-state-and-throughput-recover-general-494ebfac74f239ed6ab1e40c424e6719.png"},69290:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/base-general-state-and-throughput-recover-time-b9c20296a6c02ab22b64a90c8e5b0f3a.png"},54512:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/base-general-state-and-throughput-recovery-general-perf-cfb3b2c8bfa21e6c6499cda6b58d19f0.png"},22596:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/base-recovery-general-71b7de7df76b17ee89efd539b6a3b5b3.png"},21355:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/base-recovery-bee7a028446f8d3ee578efdcfb0ce458.png"},22664:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/base-start-up-990e2a69500f27068362d59e86bedbdc.png"},58071:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/broken-metric-zero-5d8e95304f288e82921bf536402882d5.png"},67062:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/broken-metric-11b08dba5d36a8392efda2c2ebe5580d.png"},31854:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/instances-8b991c2d040baa3627ded5a001ef43d1.png"},10270:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/perf-11-a3343c029716f6f663f5b3d93db133bc.png"},77621:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/perf-12-92bc1dfd1a0442252e1541a3bd41b310.png"},37184:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/snapshot-73e2affb2bb52e3c38343994b6b7bf7f.png"},28453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>h});var s=n(96540);const a={},r=s.createContext(a);function i(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function h(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);