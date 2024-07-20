import{u as p,e as b,j as s,F as f,X as j,W as u,L as t,t as h,Z as o}from"./index-9d72eabb.js";import{g}from"./laborer-52efcbe7.js";import{I as N}from"./imageUrls-ebc684b3.js";const L=()=>{const e=p(a=>a.user.userData),i=b(),l=async()=>{try{const a=await g(e._id);if(a&&a.status===200){const{languages:r,education:c,avlDays:n,avlTimes:d,fields:m}=a.laborer,x={userId:e._id,languages:r??"",education:c??"",avlDays:n,avlTimes:d,fields:m||[defaultField]};i("/laborer-profile",{state:{laborerProfileData:x}})}else o.error(a.message)}catch(a){o.error("An error occurerd while fetching data"),console.log("Get laborer profile error: ",a)}};return s.jsx("div",{className:"col-10 my-3 mx-auto",children:s.jsxs("div",{className:"d-md-flex align-items-center",children:[s.jsx("div",{className:"col-md-5 card mb-3",children:s.jsx(f,{children:s.jsxs(j,{className:"text-center",children:[s.jsx(u,{src:e!=null&&e.profile?`https://tasktrack.online/uploads/profile/${e==null?void 0:e.profile}`:N.avatar,alt:"avatar",className:"rounded-circle",style:{width:"150px"},fluid:!0}),s.jsx("p",{className:"mb-1",children:e==null?void 0:e.username}),s.jsx("p",{className:"text-muted mb-1",children:e==null?void 0:e.email}),s.jsx("p",{className:"text-muted mb-1",children:e==null?void 0:e.phone}),s.jsx(t,{to:"/profile",className:"d-flex justify-content-center",children:s.jsx(h,{children:"Edit"})}),e.isJobSeeker&&s.jsx("div",{className:"d-flex justify-content-center",children:s.jsx(t,{onClick:l,children:"Manage Laborer Profile"})})]})})}),s.jsxs("div",{className:"d-grid gap-2 col-md-6 mx-auto",children:[s.jsx(t,{to:"/jobs/listed-jobs",className:"btn btn-outline-primary",children:"Listed Jobs"}),s.jsx(t,{to:"/jobs/works-history",className:"btn btn-outline-primary",children:"Work History"}),s.jsx(t,{to:"/manage-subscription",className:"btn btn-outline-primary",children:"Manage Subscriptions"})]})]})})};export{L as default};