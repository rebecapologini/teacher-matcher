import{r as p,c as u,a as h,b as x,j as e,s as j}from"./index-CQGQ5QzC.js";const w=()=>{const[s,r]=p.useState({name:"",email:"",password:""}),[o]=u(),i=h(),l=x(),t=n=>{const{name:a,value:d}=n.target;r(c=>({...c,[a]:d}))},m=async n=>{n.preventDefault();try{const a=await o(s).unwrap();i(j(a)),l("/")}catch(a){console.error("Failed to register:",a)}};return e.jsxs("form",{onSubmit:m,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",children:"Name:"}),e.jsx("input",{type:"text",id:"name",name:"name",value:s.name,onChange:t,autoComplete:"name"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",children:"Email"}),e.jsx("input",{type:"email",id:"email",name:"email",value:s.email,onChange:t,autoComplete:"email"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",children:"Password"}),e.jsx("input",{type:"password",id:"password",name:"password",value:s.password,onChange:t,autoComplete:"new-password"})]}),e.jsx("button",{type:"submit",children:"Register"})]})};export{w as default};