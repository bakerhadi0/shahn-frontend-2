import React, { useEffect, useState } from 'react'
import { api } from '../api.js'

export default function Products(){
  const [list, setList] = useState([])
  const [form, setForm] = useState({ name:'', category:'', size:'', price:0, printingType:'', template:'' })
  const [msg, setMsg] = useState('')

  async function load(){ setList(await api('/api/products')) }

  async function add(e){
    e.preventDefault(); setMsg('')
    try{
      await api('/api/products', { method:'POST', json: form })
      setForm({ name:'', category:'', size:'', price:0, printingType:'', template:'' })
      load()
    }catch(err){ setMsg(err.message) }
  }

  useEffect(()=>{ load() }, [])

  return (
    <div className="card">
      <h3>المنتجات</h3>
      <form onSubmit={add} className="row">
        <input placeholder="الاسم" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input placeholder="التصنيف" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
        <input placeholder="المقاس" value={form.size} onChange={e=>setForm({...form, size:e.target.value})} />
        <input placeholder="السعر (SAR)" type="number" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})} />
        <input placeholder="نوع الطباعة" value={form.printingType} onChange={e=>setForm({...form, printingType:e.target.value})} />
        <input placeholder="القالب" value={form.template} onChange={e=>setForm({...form, template:e.target.value})} />
        <button type="submit">إضافة</button>
      </form>
      {msg && <div className="danger">{msg}</div>}
      <table style={{width:'100%', marginTop:12, borderCollapse:'collapse'}}>
        <thead><tr><th>المنتج</th><th>السعر</th><th>القالب</th><th>أضيف</th></tr></thead>
        <tbody>
          {list.map(p=>(
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{Number(p.price).toLocaleString('ar-SA',{style:'currency',currency:'SAR'})}</td>
              <td>{p.template||'-'}</td>
              <td>{new Date(p.createdAt).toLocaleString('ar-SA')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
