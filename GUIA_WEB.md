# 🌐 Guía: Hostear la web en internet (hosting online)

Esta guía explica cómo publicar la plataforma para que cualquiera pueda entrar desde internet. La app tiene **dos partes** que se despliegan por separado:

- **Frontend (React):** se sube a un hosting de webs estáticas (Vercel, Netlify…).
- **Backend (Node + SQLite):** se sube a un servidor que ejecuta Node (Render, Railway…).

> Recomendado por ser gratis y sencillo: **Frontend en Vercel** + **Backend en Render**.

---

## 1. Subir el BACKEND (Render)

1. Crea una cuenta en <https://render.com> y conéctala a tu GitHub.
2. **New → Web Service** y elige tu repositorio.
3. Configuración:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. En **Environment** añade las variables (las mismas del `.env`):
   ```
   NODE_ENV=production
   JWT_SECRET=pon_una_clave_larga_y_secreta
   JWT_EXPIRE=7d
   ADMIN_EMAIL=admin@tudominio.com
   ADMIN_PASSWORD=una_contraseña_fuerte
   FRONTEND_URL=https://TU-FRONTEND.vercel.app
   ```
   > No definas `PORT`: Render lo asigna solo y el código ya usa `process.env.PORT`.
5. Crea el servicio. Cuando termine, copia la URL pública (algo como `https://tu-backend.onrender.com`).

> ⚠️ **Nota sobre SQLite:** en planes gratuitos el disco puede reiniciarse y borrar `database.db`. Para un proyecto serio conviene usar una base de datos persistente o un disco persistente del proveedor. Para pruebas, SQLite funciona bien.

---

## 2. Subir el FRONTEND (Vercel)

1. Crea una cuenta en <https://vercel.com> y conéctala a tu GitHub.
2. **Add New → Project** y elige tu repositorio.
3. Configuración:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Create React App (se detecta solo).
4. En **Environment Variables** añade:
   ```
   REACT_APP_API_URL=https://tu-backend.onrender.com/api
   ```
   (la URL del backend del paso 1, terminada en `/api`).
5. Pulsa **Deploy**. Al terminar tendrás una URL como `https://tu-frontend.vercel.app`.

---

## 3. Conectar las dos partes

1. Vuelve a Render y asegúrate de que `FRONTEND_URL` es exactamente la URL de Vercel (para que CORS funcione).
2. Guarda y deja que el backend se reinicie.
3. Abre tu URL de Vercel: la web ya debería cargar las estadísticas y permitir registro/login.

---

## ✅ Comprobación final

- Abre `https://tu-backend.onrender.com/api/health` → debe responder `{"success":true,...}`.
- Abre tu web de Vercel y crea una cuenta.
- Entra al panel admin con el `ADMIN_EMAIL`/`ADMIN_PASSWORD` que pusiste en Render (mira **[GUIA_USO.md](./GUIA_USO.md)**).

## ❓ Problemas comunes

- **La web carga pero no trae datos:** revisa que `REACT_APP_API_URL` apunte al backend correcto y termine en `/api`.
- **Error de CORS en la consola:** `FRONTEND_URL` en el backend no coincide con la URL real del frontend.
- **El admin no se crea:** usa un `ADMIN_EMAIL` que no exista ya como usuario.
