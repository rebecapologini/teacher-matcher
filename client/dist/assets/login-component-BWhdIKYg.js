import{r as d,u as p,a as h,b as x,j as a,s as g}from"./index-CQGQ5QzC.js";const w=()=>{const[e,n]=d.useState({email:"",password:""}),[r]=p(),i=h(),l=x(),o=t=>{const{name:s,value:u}=t.target;n(c=>({...c,[s]:u}))},m=async t=>{t.preventDefault();try{const s=await r(e).unwrap();i(g(s)),l("/")}catch(s){console.error("Failed to login:",s)}};return a.jsxs("form",{onSubmit:m,children:[a.jsxs("div",{children:[a.jsx("label",{htmlFor:"email",children:"Email"}),a.jsx("input",{type:"email",id:"email",name:"email",value:e.email,onChange:o,autoComplete:"email"})]}),a.jsxs("div",{children:[a.jsx("label",{htmlFor:"password",children:"Password"}),a.jsx("input",{type:"password",id:"password",name:"password",value:e.password,onChange:o,autoComplete:"current-password"})]}),a.jsx("button",{type:"submit",children:"Login"})]})};export{w as default};
