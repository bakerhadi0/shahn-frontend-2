import React, { useState } from "react";
import api from "./http";
export default function Login() {
  const [email,setEmail]=useState("abuohadi2@gmail.com");
  const [password,setPassword]=useState("Baker@2030");
  const [error,setError]=useState("");
  async function onSubmit(e){
    e.preventDefault(); setError("");
    try{
      const {data}=await api.post("/api/auth/login",{email,password});
      const token=data?.token||data?.access_token||data?.data?.token;
      if(!token) throw new Error("no token");
      localStorage.setItem("token", token);
      location.href="/customers";
    }catch(err){ setError("فشل تسجيل الدخول"); }
  }
  return (
    <form onSubmit={onSubmit} style={{maxWidth:420,margin:"40px auto"}}>
      <h2>تسجيل الدخول</h2>
      {error && <div style={{color:"crimson"}}>{error}</div>}
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="الإيميل" style={{display:"block",width:"100%",margin:"8px 0"}}/>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="الرمز" style={{display:"block",width:"100%",margin:"8px 0"}}/>
      <button>دخول</button>
    </form>
  );
}
