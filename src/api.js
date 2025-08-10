const BASE = import.meta.env.VITE_API_BASE_URL || 'https://shahn-sales.onrender.com';

const tokenKey = 'shahn_token';
export const getToken = () => localStorage.getItem(tokenKey);
export const setToken = (t) => localStorage.setItem(tokenKey, t);
export const clearToken = () => localStorage.removeItem(tokenKey);

export async function api(path, { method='GET', json, auth=true } = {}){
  const headers = { 'Content-Type':'application/json' };
  if(auth && getToken()) headers['Authorization'] = 'Bearer ' + getToken();
  const res = await fetch(BASE + path, { method, headers, body: json? JSON.stringify(json) : undefined });
  if(!res.ok){
    let msg = 'Error '+res.status;
    try{ const j = await res.json(); msg = j.message || msg }catch{}
    throw new Error(msg);
  }
  return res.json();
}
