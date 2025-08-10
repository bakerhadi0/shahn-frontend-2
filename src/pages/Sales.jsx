import React, { useEffect, useState } from 'react'
import { api } from '../api.js'

export default function Sales(){
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState([])
  const [form, setForm] = useState({ product:'', quantity:1, total:0, note:'' })

  async function load(){
    setProducts(await api('/api/products'))
    setSales(await api('/api/sales'))
  }

  async function add(e){
    e.preventDefault()
    const prod = products.find(p=>p._id===form.product)
    const total = form.total || (prod? prod.price * form.quantity : 0)
    await api('/api/sales', { method:'POST', json:{...form, total} })
    setForm({ product:'', quantity:1, total:0, note:'' })
    load()
  }

  useEffect(()=>{ load() }, [])

  return (
    <div className="card">
      <h3>المبيعات</h3>
      <form onSubmit={add} className="row">
        <select value={form.product} onChange={e=>setForm({...form, product:e.target.value})}>
          <option value="">اختر المنتج</option>
          {products.map(p=>(<option key={p._id} value={p._id}>{p.name}</option>))}
        </select>
        <input type="number" min="1" value={form.quantity} onChange={e=>setForm({...form, quantity:Number(e.target.value)})} />
        <input type="number" min="0" step="0.01" placeholder="الإجمالي (SAR)" value={form.total} onChange={e=>setForm({...form, total:Number(e.target.value)})} />
        <input placeholder="ملاحظة" value={form.note} onChange={e=>setForm({...form, note:e.target.value})} />
        <button type="submit">تسجيل عملية</button>
      </form>

      <table style={{width:'100%', marginTop:12, borderCollapse:'collapse'}}>
        <thead><tr><th>المنتج</th><th>الكمية</th><th>الإجمالي</th><th>التاريخ</th></tr></thead>
        <tbody>
          {sales.map(s=>(
            <tr key={s._id}>
              <td>{s.product?.name || '-'}</td>
              <td>{s.quantity}</td>
              <td>{Number(s.total).toLocaleString('ar-SA',{style:'currency',currency:'SAR'})}</td>
              <td>{new Date(s.createdAt).toLocaleString('ar-SA')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
