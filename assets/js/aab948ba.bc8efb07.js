"use strict";(self.webpackChunkzell_chaos=self.webpackChunkzell_chaos||[]).push([[7190],{69057:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var n=a(85893),r=a(11151);const o={layout:"posts",title:"Dynamically scaling brokers",date:new Date("2023-12-18T00:00:00.000Z"),categories:["chaos_experiment","bpmn"],tags:["availability","performance"],authors:"lena"},s="Chaos Day Summary",i={permalink:"/zeebe-chaos/2023/12/18/Dynamically-scaling-brokers",editUrl:"https://github.com/zeebe-io/zeebe-chaos/blob/master/chaos-days/blog/2023-12-18-Dynamically-scaling-brokers/index.md",source:"@site/blog/2023-12-18-Dynamically-scaling-brokers/index.md",title:"Dynamically scaling brokers",description:"We experimented with the first version of dynamic scaling in Zeebe, adding or removing brokers for a running cluster.",date:"2023-12-18T00:00:00.000Z",formattedDate:"December 18, 2023",tags:[{label:"availability",permalink:"/zeebe-chaos/tags/availability"},{label:"performance",permalink:"/zeebe-chaos/tags/performance"}],readingTime:6.05,hasTruncateMarker:!0,authors:[{name:"Lena Sch\xf6nburg",title:"Senior Software Engineer @ Zeebe",url:"https://github.com/lenaschoenburg",imageURL:"https://github.com/lenaschoenburg.png",key:"lena"}],frontMatter:{layout:"posts",title:"Dynamically scaling brokers",date:"2023-12-18T00:00:00.000Z",categories:["chaos_experiment","bpmn"],tags:["availability","performance"],authors:"lena"},unlisted:!1,prevItem:{title:"Dynamic Scaling with Dataloss",permalink:"/zeebe-chaos/2023/12/19/Dynamic-Scaling-with-Dataloss"},nextItem:{title:"Job push resiliency",permalink:"/zeebe-chaos/2023/12/06/Job-Push-resiliency"}},l={authorsImageUrls:[void 0]},c=[];function h(e){const t={a:"a",code:"code",p:"p",strong:"strong",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["We experimented with the first version of ",(0,n.jsx)(t.a,{href:"https://docs.camunda.io/docs/next/self-managed/zeebe-deployment/operations/cluster-scaling/",children:"dynamic scaling in Zeebe"}),", adding or removing brokers for a running cluster."]}),"\n",(0,n.jsxs)(t.p,{children:["Scaling up and down is a high-level operation that consists of many steps that need to be carried co-operatively by all brokers in the cluster.\nFor example, adding new brokers first adds them to the replication group of the assigned partitions and then removes some of the older brokers from the replication group.\nAdditionally, ",(0,n.jsx)(t.a,{href:"https://docs.camunda.io/docs/next/self-managed/zeebe-deployment/configuration/priority-election/",children:"priorities"})," need to be reconfigured to ensure that the cluster approaches balanced leadership eventually."]}),"\n",(0,n.jsxs)(t.p,{children:["This orchestration over multiple steps ensures that all partitions are replicated by at least as many brokers as configured with the ",(0,n.jsx)(t.code,{children:"replicationFactor"}),".\nAs always, when it comes to orchestrating distributed systems, there are many edge cases and failure modes to consider."]}),"\n",(0,n.jsx)(t.p,{children:"The goal of this experiment was to verify that the operation is resilient to broker restarts.\nWe can accept that operations take longer than usual to complete, but we need to make sure that the operation eventually succeeds with the expected cluster topology as result."}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"TL;DR;"})," Both scaling up and down is resilient to broker restarts, with the only effect that the operation takes longer than usual to complete."]})]})}function d(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},11151:(e,t,a)=>{a.d(t,{Z:()=>i,a:()=>s});var n=a(67294);const r={},o=n.createContext(r);function s(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);