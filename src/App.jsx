import React, { useEffect, useState } from 'react'
import Login from './pages/Login.jsx'
import Products from './pages/Products.jsx'
import Sales from './pages/Sales.jsx'
import { getToken, clearToken } from './api.js'

export default function App(){
  const [tab, setTab] = useState('products')
  const [authed, setAuthed] = useState(!!getToken())

  useEffect(()=>{
    if(!getToken()) setAuthed(false);
  }, [])

  if(!authed) return <Login onLogged={()=>setAuthed(true)} />

  return (
    <div className="container">
      <div className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex', gap:8}}>
          <button onClick={()=>setTab('products')}>المنتجات</button>
          <button onClick={()=>setTab('sales')}>المبيعات</button>
        </div>
        <div className="row" style={{maxWidth:360}}>
          <button onClick={()=>{clearToken(); location.reload();}}>تسجيل الخروج</button>
        </div>
      </div>

      {tab==='products' && <Products />}
      {tab==='sales' && <Sales />}

      <div className="muted" style={{textAlign:'center',marginTop:16}}>
        الاتصال بالخادم: <code>{(import.meta.env.VITE_API_BASE_URL)||'https://shahn-sales.onrender.com'}</code>
      </div>
    </div>
  )
}
