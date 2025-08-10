import React, { useState } from 'react'
import { api, setToken } from '../api.js'

export default function Login({ onLogged }){
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('123456')
  const [name, setName] = useState('Admin')
  const [mode, setMode] = useState('login')
  const [msg, setMsg] = useState('')

  async function submit(e){
    e.preventDefault()
    setMsg('')
    try{
      const path = mode==='login'? '/api/auth/login' : '/api/auth/register'
      const body = mode==='login'? { email, password } : { name, email, password }
      const data = await api(path, { method:'POST', json: body, auth:false })
      setToken(data.token)
      onLogged?.()
    }catch(err){
      setMsg(err.message)
    }
  }

  return (
    <div className="container" style={{maxWidth:520}}>
      <div className="card">
        <h2>Shahn Sales — {mode==='login'?'تسجيل الدخول':'تسجيل مستخدم'}</h2>
        <form onSubmit={submit} className="row">
          {mode==='register' && <input placeholder="الاسم" value={name} onChange={e=>setName(e.target.value)} />}
          <input placeholder="البريد" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="كلمة المرور" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div className="row">
            <button type="submit">{mode==='login'?'دخول':'تسجيل'}</button>
            <button type="button" onClick={()=>setMode(mode==='login'?'register':'login')}>تبديل</button>
          </div>
          {msg && <div className="danger">{msg}</div>}
        </form>
        <div className="muted">تأكّد أن لديك مستخدم مسجل أولًا. أول مستخدم يصبح Admin تلقائيًا.</div>
      </div>
    </div>
  )
}
