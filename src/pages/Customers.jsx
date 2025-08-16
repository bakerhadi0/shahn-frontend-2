import React, { useEffect, useState } from "react";
import api from "../http";

export default function Customers(){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [form,setForm]=useState({name:"",company:"",phone:"",location:"",notes:""});

  async function load(){
    try{
      setLoading(true); setError("");
      const {data}=await api.get("/api/customers");
      setItems(Array.isArray(data)?data:[]);
    }catch(e){ setError("تعذر تحميل العملاء"); }
    finally{ setLoading(false); }
  }

  async function add(){
    try{
      setError("");
      if(!form.name.trim()) return;
      const {data}=await api.post("/api/customers", form);
      setItems([data, ...items]);
      setForm({name:"",company:"",phone:"",location:"",notes:""});
    }catch(e){ setError("تعذر الحفظ"); }
  }

  useEffect(()=>{ load(); },[]);

  return (
    <div style={{maxWidth:900,margin:"20px auto"}}>
      <h2>العملاء</h2>
      {error && <div style={{color:"crimson"}}>{error}</div>}
      <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 1fr 1fr 1fr",gap:8}}>
        <input placeholder="الاسم" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="الشركة" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/>
        <input placeholder="الهاتف" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
        <input placeholder="الموقع" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
        <input placeholder="ملاحظات" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
      </div>
      <button style={{marginTop:8}} onClick={add} disabled={loading}>إضافة</button>

      <table style={{width:"100%",marginTop:16,borderCollapse:"collapse"}}>
        <thead><tr><th>الاسم</th><th>الشركة</th><th>الهاتف</th><th>الموقع</th><th>ملاحظات</th></tr></thead>
        <tbody>
          {items.map(x=>(
            <tr key={x._id||x.id}>
              <td>{x.name}</td><td>{x.company}</td><td>{x.phone}</td><td>{x.location}</td><td>{x.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
