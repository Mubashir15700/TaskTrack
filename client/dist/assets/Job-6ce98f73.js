import{j as s,L as l}from"./index-9d72eabb.js";import{I as x}from"./imageUrls-ebc684b3.js";const h=({isListed:e,title:r,profile:a,username:t,description:i,village:o,district:n,postedAt:d,status:m,id:c})=>s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"card-header",children:r}),s.jsxs("div",{className:"card-body d-flex flex-wrap justify-content-between",children:[!e&&s.jsxs("div",{className:"col-md-3 col-12 mb-3",children:[s.jsx("img",{src:a?`https://tasktrack.online/uploads/profile/${a}`:x.avatar,alt:"Profile",style:{width:"50px"},className:"rounded-circle mb-2 mx-auto img-fluid"}),s.jsx("p",{children:t})]}),s.jsxs("div",{className:"col-md-6 col-12 mb-3",children:[s.jsxs("p",{className:"card-text",children:[i.slice(0,100),"..."]}),s.jsxs("p",{className:"mb-1",children:["Location: ",o,", ",n]}),s.jsxs("p",{className:"mb-1",children:["Posted on: ",new Date(d).toLocaleString()]})]}),s.jsxs("div",{className:"col-md-3 col-12 mb-3",children:[s.jsxs("p",{children:["Status: ",m]}),e?s.jsx(l,{to:`/jobs/listed-jobs/${c}`,className:"btn btn-primary btn-block",children:"Edit"}):s.jsx(l,{to:`/jobs/${c}`,className:"btn btn-primary btn-block",children:"View More"})]})]})]});export{h as J};