"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[2828],{60414:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var n=a(74848),i=a(28453);const s={layout:"posts",title:"Camunda Exporter MVP",date:new Date("2024-10-24T00:00:00.000Z"),categories:["camunda","exporter"],tags:["performance"],authors:"zell"},r="Chaos Day Summary",o={permalink:"/zeebe-chaos/2024/10/24/Camunda-Exporter-MVP",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2024-10-24-Camunda-Exporter-MVP/index.md",source:"@site/blog/2024-10-24-Camunda-Exporter-MVP/index.md",title:"Camunda Exporter MVP",description:"After a long pause, I come back with an interesting topic to share and experiment with. Right now we are re-architecture",date:"2024-10-24T00:00:00.000Z",tags:[{inline:!0,label:"performance",permalink:"/zeebe-chaos/tags/performance"}],readingTime:6.15,hasTruncateMarker:!0,authors:[{name:"Christopher Kujawa",title:"Chaos Engineer @ Zeebe",url:"https://github.com/zelldon",page:{permalink:"/zeebe-chaos/authors/zell"},imageURL:"https://github.com/zelldon.png",key:"zell"}],frontMatter:{layout:"posts",title:"Camunda Exporter MVP",date:"2024-10-24T00:00:00.000Z",categories:["camunda","exporter"],tags:["performance"],authors:"zell"},unlisted:!1,nextItem:{title:"Optimizing cluster sizing using a real world benchmark",permalink:"/zeebe-chaos/2024/10/14/Optimizing-cluster-sizing-using-a-real-world-benchmark"}},l={authorsImageUrls:[void 0]},c=[{value:"Camunda Exporter",id:"camunda-exporter",level:2},{value:"MVP",id:"mvp",level:3},{value:"Chaos Experiment",id:"chaos-experiment",level:2},{value:"Expected",id:"expected",level:3},{value:"Actual",id:"actual",level:3},{value:"Installation",id:"installation",level:3},{value:"Basic First Verification",id:"basic-first-verification",level:3},{value:"Verify Operate Data",id:"verify-operate-data",level:3},{value:"Investigating missing data",id:"investigating-missing-data",level:4},{value:"Conclusion",id:"conclusion",level:2},{value:"Additional notes",id:"additional-notes",level:3},{value:"Found Bugs",id:"found-bugs",level:3}];function d(e){const t={a:"a",blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"After a long pause, I come back with an interesting topic to share and experiment with. Right now we are re-architecture\nCamunda 8. One important part (which I'm contributing to) is to get rid of Webapps Importer/Archivers and move\ndata aggregation closer to the engine (inside a Zeebe Exporter)."}),"\n",(0,n.jsx)(t.p,{children:"Today, I want to experiment with the first increment/iteration of our so-called MVP. The MVP targets green field installations where you simply deploy Camunda (with a new Camunda Exporter enabled) without Importers."}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"TL;DR;"})," All our experiments were successful. The MVP is a success, and we are looking forward to further improvements and additions. Next stop Iteration 2: Adding Archiving historic data and preparing for data migration (and polishing MVP)."]}),"\n",(0,n.jsx)(t.h2,{id:"camunda-exporter",children:"Camunda Exporter"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.a,{href:"https://github.com/camunda/product-hub/issues/2128",children:"Camunda Exporter project"})," deserves a complete own blog post, here is just a short summary."]}),"\n",(0,n.jsx)(t.p,{children:"Our current Camunda architecture looks something like this (simplified)."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"current",src:a(11535).A+"",width:"1096",height:"885"})}),"\n",(0,n.jsx)(t.p,{children:"It has certain challenges, like:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Space: duplication of data in ES"}),"\n",(0,n.jsx)(t.li,{children:"Maintenance: duplication of importer and archiver logic"}),"\n",(0,n.jsx)(t.li,{children:"Performance: Round trip (delay) of data visible to the user"}),"\n",(0,n.jsx)(t.li,{children:"Complexity: installation and operational complexity (we need separate pods to deploy)"}),"\n",(0,n.jsx)(t.li,{children:"Scalability: The Importer is not scalable in the same way as Zeebe or brokers (and workload) are."}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"These challenges we obviously wanted to overcome and the plan (as mentioned earlier) is to get rid of the need of separate importers and archivers (and in general to have separate application; but this is a different topic)."}),"\n",(0,n.jsx)(t.p,{children:"The plan for this project looks something like this:"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"plan",src:a(45852).A+"",width:"1228",height:"904"})}),"\n",(0,n.jsx)(t.p,{children:"We plan to:"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsx)(t.li,{children:"Harmonize the existing indices stored in Elasticsearch/Opensearch\n2. Space: Reduce the unnecessary data duplication"}),"\n",(0,n.jsx)(t.li,{children:"Move importer and archiver logic into a new Camunda exporter\n3. Performance: This should allow us to reduce one additional hop (as we don't need to use ES/OS as a queue)\n4. Maintenance: Indices and business logic is maintained in one place\n5. Scalability: With this approach, we can scale with partitions, as Camunda Exporters are executed for each partition separately (soon partition scaling will be introduced)\n6. Complexity: The Camunda Exporter will be built-in and shipped with Zeebe/Camunda 8. No additional pod/application is needed."}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"Note: Optimize is right now out of scope (due to time), but will later be part of this as well."}),"\n",(0,n.jsx)(t.h3,{id:"mvp",children:"MVP"}),"\n",(0,n.jsx)(t.p,{children:"After we know what we want to achieve what is the Minimum viable product (MVP)?"}),"\n",(0,n.jsxs)(t.p,{children:["We have divided the Camunda Exporter in 3-4 iterations. You can see and read more about this ",(0,n.jsx)(t.a,{href:"https://github.com/camunda/issues/issues/803",children:"here"}),"."]}),"\n",(0,n.jsx)(t.p,{children:"The first iteration contains the MVP (the first breakthrough). Providing the Camunda Exporter with the basic functionality ported from the Operate and Tasklist importers, writing into harmonized indices."}),"\n",(0,n.jsx)(t.p,{children:"The MVP is targeting green field installations (clean installations) of Camunda 8 with Camunda Exporter without running the old Importer (no data migration yet),"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"mvp",src:a(71082).A+"",width:"1069",height:"870"})}),"\n",(0,n.jsx)(t.h2,{id:"chaos-experiment",children:"Chaos Experiment"}),"\n",(0,n.jsx)(t.p,{children:"What I want to verify today, when I deploy the Camunda 8 stack with Camunda Exporter (and Importer disabled):"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Are webapps schemas created in ES, by the new Camunda Exporter"}),"\n",(0,n.jsx)(t.li,{children:"Is data exported into the indices"}),"\n",(0,n.jsx)(t.li,{children:"Can Operate show data? (right now just checking for basic functionality)"}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"Additionally, I would like to understand what the performance looks like, how the system behaves with two ES exporters (the old ES exporter and the new Camunda Exporter), and more."}),"\n",(0,n.jsxs)(t.p,{children:["For our experiment, I use a ",(0,n.jsx)(t.a,{href:"https://github.com/camunda/camunda/issues/21472",children:"newly defined realistic benchmark"})," (with a more complex process model). More about this in a separate blog post."]}),"\n",(0,n.jsx)(t.h3,{id:"expected",children:"Expected"}),"\n",(0,n.jsx)(t.p,{children:"I can deploy the newest helm charts (alpha stage), by disabling Importer manually, and will be able to use Zeebe and Operate together. See the verifications above."}),"\n",(0,n.jsx)(t.h3,{id:"actual",children:"Actual"}),"\n",(0,n.jsxs)(t.p,{children:["As always we use our ",(0,n.jsx)(t.a,{href:"https://github.com/zeebe-io/benchmark-helm",children:"benchmark-helm charts"})," (that building on top of our ",(0,n.jsx)(t.a,{href:"https://github.com/camunda/camunda-platform-helm",children:"Camunda Platform Helm"})," charts)."]}),"\n",(0,n.jsx)(t.h3,{id:"installation",children:"Installation"}),"\n",(0,n.jsxs)(t.p,{children:["I had to adjust our benchmarks to ",(0,n.jsx)(t.a,{href:"https://github.com/zeebe-io/benchmark-helm/commit/db682a89788d6c511083ec743c6cf7d358155e3c",children:"use the alpha snapshots "})]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-yaml",children:'dependencies:\n  - name: camunda-platform\n    repository: "oci://ghcr.io/camunda/helm"\n    version: "0.0.0-snapshot-alpha"\n    condition: "camunda.enabled"\n'})}),"\n",(0,n.jsxs)(t.p,{children:["and ",(0,n.jsx)(t.a,{href:"https://github.com/zeebe-io/benchmark-helm/commit/aafac6e9ec78e9cfd2e59a5b6f30bf887a4fcbd0",children:"disable the Importer via ENV"})]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-yaml",children:'env:\n- name: CAMUNDA_OPERATE_IMPORTERENABLED\nvalue: "false"\n'})}),"\n",(0,n.jsx)(t.p,{children:"With that, we can install our chart:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:"$ helm install zeebe-benchmark-test charts/zeebe-benchmark/ --render-subchart-notes -f charts/zeebe-benchmark/values-realistic-benchmark.yaml --set global.elasticsearch.prefix=null\n"})}),"\n",(0,n.jsx)(t.h3,{id:"basic-first-verification",children:"Basic First Verification"}),"\n",(0,n.jsxs)(t.p,{children:["After our benchmark chart is deployed we can already see the first time our Camunda Exporter running ","\ud83c\udf89"]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"firsttime",src:a(50322).A+"",width:"1253",height:"528"})}),"\n",(0,n.jsx)(t.p,{children:"Worth mentioning that the Camunda Export already comes with some metrics, visible on our Zeebe Dashboard"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.img,{alt:"metrics",src:a(49611).A+"",width:"1293",height:"751"}),"\n",(0,n.jsx)(t.img,{alt:"metrics2",src:a(37169).A+"",width:"1263",height:"407"})]}),"\n",(0,n.jsx)(t.p,{children:"The general overview also looks good. No obvious problem."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"general",src:a(27404).A+"",width:"2532",height:"812"})}),"\n",(0,n.jsx)(t.p,{children:"Looking into logs we can see that at the start it fails temporarily because ES is not yet ready to accept the schema creation."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:"ERROR - Failed to open exporter 'CamundaExporter'. Retrying...\n"})}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"log",src:a(21213).A+"",width:"1004",height:"198"})}),"\n",(0,n.jsx)(t.p,{children:"At some point, the exporter can be opened and the loop stops."}),"\n",(0,n.jsx)(t.p,{children:"I think generally it shouldn't be an ERROR but more a WARN (but these are details we can fix). Follow-up."}),"\n",(0,n.jsx)(t.h3,{id:"verify-operate-data",children:"Verify Operate Data"}),"\n",(0,n.jsx)(t.p,{children:"To make sure that Operate is not importing, I checked the Operate dashboard. We can see that there is no Importer metrics. Furthermore, in the configuration and logs we see no indication of importing."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"op-metrics",src:a(30510).A+"",width:"2548",height:"531"})}),"\n",(0,n.jsx)(t.p,{children:"We can now start to port-forward to operate:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:"k port-forward svc/zeebe-benchmark-test-operate 8081:80\n"})}),"\n",(0,n.jsx)(t.p,{children:"When opening Operate we see unfortunately no data."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"operate-no-data",src:a(80875).A+"",width:"2448",height:"862"})}),"\n",(0,n.jsx)(t.h4,{id:"investigating-missing-data",children:"Investigating missing data"}),"\n",(0,n.jsx)(t.p,{children:"We need to understand why there is no data available for Operate."}),"\n",(0,n.jsx)(t.p,{children:"What we saw is that the Camunda Exporter is open (logs), that it is also makes progress and data is written to elastic (metrics). What we haven't checked Elasticsearch in detail."}),"\n",(0,n.jsx)(t.p,{children:"Looking into ES dashboard we can see that indices are created, but the Operate indices seem to be empty."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"es-indices",src:a(74346).A+"",width:"2531",height:"588"})}),"\n",(0,n.jsx)(t.p,{children:"When checking the Zeebe indices:"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"zeebe-indices",src:a(1528).A+"",width:"2542",height:"537"})}),"\n",(0,n.jsx)(t.p,{children:"we can see that they are filled. An attentive reader will also chekc that there actuall some prefix problem in the indices."}),"\n",(0,n.jsxs)(t.p,{children:["Thanks to Deepthi which spotted this as well (and told me), we were exporting to the wrong index names. There was a ",(0,n.jsx)(t.a,{href:"https://github.com/camunda/camunda-platform-helm/blob/46f6ee9d828439b0b1cf37bae4d135ba5281a832/charts/camunda-platform-alpha/templates/zeebe/configmap.yaml#L66",children:"bug"})," existing in the current alpha Helm chart version."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"wrong-prefix",src:a(3824).A+"",width:"2530",height:"429"})}),"\n",(0,n.jsxs)(t.p,{children:["This has been fixed with ",(0,n.jsx)(t.a,{href:"https://github.com/camunda/camunda-platform-helm/pull/2506",children:"PR-2506"}),". Until this gets merged I changed this manually via:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:"# Get the templates \nhelm template zeebe-benchmark-test charts/zeebe-benchmark/ --render-subchart-notes -f charts/zeebe-benchmark/values-realistic-benchmark.yaml --output-dir templates\n\n# Adjust the config map - remove the prefix\nvim templates/zeebe-benchmark/charts/camunda-platform/templates/zeebe/configmap.yaml \n\n# Apply all manifests\nk apply -f . --recursive\n"})}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:"Note:"})}),"\n",(0,n.jsx)(t.p,{children:"I also tried"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-shell",children:"helm template charts/zeebe-benchmark/ --version 0.0.0-snapshot-alpha     --show-only charts/camunda-platform/templates/zeebe/configmap.yaml --set global.elasticsearch.prefix=null\n"})}),"\n",(0,n.jsx)(t.p,{children:"But this breaks the ES exporter."}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"With this change we were can see that indices are correctly created and filled!"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"indices-filled",src:a(65755).A+"",width:"1269",height:"390"})}),"\n",(0,n.jsxs)(t.p,{children:["Finally, we are able to see data in Operate! ","\ud83d\ude80"," ",(0,n.jsx)(t.strong,{children:"WITHOUT ANY IMPORTER."})]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.img,{alt:"mvp-operate-data.png",src:a(18333).A+"",width:"1258",height:"524"}),"\n",(0,n.jsx)(t.img,{alt:"mvp-operate-instance.png",src:a(68524).A+"",width:"2536",height:"926"}),"\n",(0,n.jsx)(t.img,{alt:"mvp-operate-pi.png",src:a(27356).A+"",width:"1243",height:"888"}),"\n",(0,n.jsx)(t.img,{alt:"operate-overview",src:a(34863).A+"",width:"1261",height:"944"})]}),"\n",(0,n.jsx)(t.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,n.jsx)(t.p,{children:"The MVP is a success. We were able to provide a Camunda Exporter that creates the necessary harmonized schema and migrate the basic business logic from Operate and Tasklist into the exporter. This allows us to use only the Camunda Exporter without running any Importer pod/application."}),"\n",(0,n.jsxs)(t.p,{children:["Great work Team ","\ud83d\ude80"," ","\ud83c\udf89"]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.strong,{children:"Next stop:"})}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.em,{children:"Iteration 2:"})}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Implementing migration logic for old data"}),"\n",(0,n.jsx)(t.li,{children:"Moving Archiver logic (for historical data) into the Exporter"}),"\n",(0,n.jsx)(t.li,{children:"Polish MVP state (add some missing features like TreePath, etc.)"}),"\n"]}),"\n",(0,n.jsx)(t.h3,{id:"additional-notes",children:"Additional notes"}),"\n",(0,n.jsx)(t.p,{children:"This time I was not able to deep dive into performance or stability for this change. I plan to do this next."}),"\n",(0,n.jsx)(t.h3,{id:"found-bugs",children:"Found Bugs"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"ERROR log level for logs that are transitive"}),"\n",(0,n.jsx)(t.li,{children:"Auth/User indices are still prefixed with identity"}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11535:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/current-miro-659b193b670b1b604ebb32ff30b067a4.png"},21213:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/exporter-opened-ed454d2a9960e13dd721f43ff2fe47ec.png"},50322:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/first-time-seeing-camunda-exporter-70ed9f616eb84150a74085d4c29a3bff.png"},45852:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/how-brown-field-929f9a23e6dfee9ede15e76b1a134fdc.png"},71082:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/it1-mvp-421ca897b91c0d03c1d77adde73b48a7.png"},49611:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mvp-c8-exporter-metrics-c26a2e069e64c8a894ec4d5ffa718a70.png"},37169:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mvp-c8-exporter-metrics2-062900d6bdddbdc951da85805bf2d89e.png"},34863:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mvp-decisions-cea9463cdf38ecc36a14fbc131985a9b.png"},65755:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mvp-fixed-prefix-indices-1fb3dae117514d6a849127d776edad93.png"},27404:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mvp-general-overview-ee162c7186d9914428efb78c3f57c8f1.png"},80875:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mvp-no-data-operate-a93144c5143ac98ec9aef7e9a4b82329.png"},18333:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mvp-operate-data-eb8f2bc8a636a72be68760c53817192a.png"},74346:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mvp-operate-indices-empty-546f9dc0740acb0c660046b97d81e621.png"},68524:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mvp-operate-instance-27c3cfefb626236cc70f14ae7fb55d17.png"},27356:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mvp-operate-pi-9a30d4606bee4f381e9643812a3b0471.png"},3824:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mvp-wrong-prefix-817f26674c55ba97e399e60d0e7261fe.png"},1528:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/mvp-zeebe-indices-filled-1125b6776b8ca7d9e08b2c2e4043b3c5.png"},30510:(e,t,a)=>{a.d(t,{A:()=>n});const n=a.p+"assets/images/no-importer-metrics-4adf3f44ee863313bc7db7536fb82476.png"},28453:(e,t,a)=>{a.d(t,{R:()=>r,x:()=>o});var n=a(96540);const i={},s=n.createContext(i);function r(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);