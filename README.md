# Shahn Sales — Frontend (React + Vite)

## تشغيل محليًا
```bash
npm install
npm run dev
```
يفتح على: http://localhost:5173

> غيّر عنوان الـ API عند الحاجة بوضع ملف `.env` وجواه:
```
VITE_API_BASE_URL=https://shahn-sales.onrender.com
```

## بناء للنشر
```bash
npm run build
npm run preview
```

## نشر سريع
- **Netlify**: اربط المستودع → build command: `npm run build` → publish dir: `dist`
- **Render (Static Site)**: 
  - Build Command: `npm run build`
  - Publish Directory: `dist`
