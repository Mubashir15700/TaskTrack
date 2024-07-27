import{q as _,r as $,j as s,F,X as R,E as S,G as C,L as I,t as v,H as E,S as L,I as a,_ as x,s as D}from"./index-9d72eabb.js";import{I as q}from"./imageUrls-ebc684b3.js";const T=()=>{var g,N,A,k;const n=_(),[j,w]=$.useState(((g=n.state)==null?void 0:g.applicantsData)||[]),h=(N=n.state)==null?void 0:N.job,l=(A=n.state)==null?void 0:A.jobId,f=(k=n.state)==null?void 0:k.fieldName,b=async(e,r)=>{const d=await L.confirmAction(`${r==="accept"?"Accept":"Reject"}`,`Are you sure you want to ${r} this request?`,`${r==="accept"?"Approve":"Reject"}`,"#d9534f",`${r==="reject"?"text":""}`);d.isConfirmed&&y(e,r,d.value)},y=async(e,r,d)=>{try{const o=r==="accept"?"accepted":"rejected",c=await a({jobId:l,fieldName:f,laborerId:e,actionTook:o,reason:d});c&&c.status===200?(x.success("Success"),w(i=>i.map(t=>{var u;return((u=t==null?void 0:t.userId)==null?void 0:u._id)===e?{...t,status:o}:t})),D.emit("application_action",{laborerId:e,jobId:l,actionTook:o})):x.error(`Failed to ${r} applicant`)}catch(o){x.error("An error occured"),console.log("Take applicant action error: ",o)}};return s.jsxs("div",{className:"col-10 mx-auto my-3",children:[s.jsxs("h3",{className:"mb-4",children:[h," Applicants"]}),s.jsxs("p",{children:["Field: ",f]}),j.length?j.map((e,r)=>{var d,o,c,i,t,u;return s.jsxs(F,{children:[s.jsx(R,{children:s.jsxs("div",{className:"d-flex justify-content-between align-items-center",children:[s.jsxs("div",{className:"d-flex align-items-center",children:[s.jsx("img",{src:(d=e==null?void 0:e.userId)!=null&&d.profile?`https://tasktrack.online/uploads/profile/${(o=e==null?void 0:e.userId)==null?void 0:o.profile}`:q.avatar,alt:"",style:{width:"45px",height:"45px"},className:"rounded-circle"}),s.jsx("div",{className:"mx-3",children:s.jsx("p",{className:"mb-1",children:(c=e==null?void 0:e.userId)==null?void 0:c.username})})]}),h.status!=="closed"&&s.jsx("div",{className:"d-flex flex-column flex-md-row align-items-center",children:(e==null?void 0:e.status)==="pending"?s.jsxs(s.Fragment,{children:[s.jsx("button",{className:"btn btn-sm btn-warning m-1",onClick:()=>{var m;return b((m=e==null?void 0:e.userId)==null?void 0:m._id,"accept")},children:s.jsx("i",{class:"bi bi-check2"})}),s.jsx("button",{className:"btn btn-sm btn-danger",onClick:()=>{var m;return b((m=e==null?void 0:e.userId)==null?void 0:m._id,"reject")},children:s.jsx("i",{class:"bi bi-x-lg"})})]}):s.jsx(S,{pill:!0,color:(e==null?void 0:e.status)==="accepted"?"success":"danger",light:!0,children:e==null?void 0:e.status})})]})}),s.jsxs(C,{background:"light",border:"0",className:"p-2 d-flex justify-content-around",children:[s.jsx(I,{to:`/laborers/${(i=e==null?void 0:e.userId)==null?void 0:i._id}`,children:s.jsx(v,{size:"sm",rounded:!0,color:"link",children:"View"})}),s.jsx(I,{to:`/chat/${(t=e==null?void 0:e.userId)==null?void 0:t._id}/${(u=e==null?void 0:e.userId)==null?void 0:u.username}`,children:s.jsxs(v,{color:"link",rippleColor:"primary",className:"text-reset m-0",children:["Message ",s.jsx(E,{fas:!0,icon:"envelope"})]})})]})]},r)}):s.jsx("div",{children:"No applicants found"})]})};export{T as default};