# 🌐 Guía: Hostear la web en Render con GitHub

Si quieres publicar esta plataforma usando solo Render y GitHub, sigue esta guía. La app tiene dos partes:

- **Backend (Node + Express + SQLite):** se sube como un servicio web en Render.
- **Frontend (React):** se sube como un sitio estático en Render.

> Importante: en este proyecto el frontend no está en la raíz; está dentro de la carpeta `backend/frontend`.

---

## 1. Sube el proyecto a GitHub

1. Crea un repositorio nuevo en GitHub.
2. Sube toda la carpeta del proyecto, incluyendo:
   - `backend/`
   - `README.md`
   - `GUIA_PC.md`
   - `GUIA_WEB.md`
3. Asegúrate de que el repositorio tenga la carpeta `backend/frontend`.

---

## 2. Publicar el BACKEND en Render

1. Entra a <https://render.com> y crea una cuenta.
2. Haz clic en **New** → **Web Service**.
3. Conecta tu cuenta de GitHub y selecciona el repositorio.
4. En la configuración usa esto:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. En **Environment Variables** añade estas variables:
   ```
   NODE_ENV=production
   JWT_SECRET=pon_una_clave_larga_y_secreta
   JWT_EXPIRE=7d
   ADMIN_EMAIL=admin@tudominio.com
   ADMIN_PASSWORD=una_contraseña_fuerte
   FRONTEND_URL=https://tu-frontend.onrender.com
   ```
6. Pulsa **Create Web Service**.
7. Cuando termineInvoke-WebRequest https://tu-backend.onrender.com/api/health | Select-Object -Expand Content, Render te dará una URL pública como:
   ```
   https://tu-backend.onrender.com
   ```

> No necesitas definir `PORT`; Render lo asigna automáticamente.

---

## 3. Publicar el FRONTEND en Render

1. En Render, haz clic en **New** → **Static Site**.
2. Conecta el mismo repositorio de GitHub.
3. En la configuración usa esto:
   - **Root Directory:** `backend/frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. En **Environment Variables** añade:
   ```
   REACT_APP_API_URL=https://tu-backend.onrender.com/api
   ```
   (usa la URL del backend del paso 2, terminada en `/api`).
5. Pulsa **Create Static Site**.
6. Render te dará una URL pública como:
   ```
   https://tu-frontend.onrender.com
   ```

---

## 4. Conectar las dos partes

1. Vuelve al servicio del backend en Render.
2. Cambia `FRONTEND_URL` por la URL exacta del frontend que acabas de crear.
3. Guarda y espera a que Render redeploye el backend.
4. Abre la URL del frontend y prueba entrar a la web.

---

## ✅ Comprobación final

- Abre esta URL del backend:
  ```
  https://tu-backend.onrender.com/api/health
  ```
  Debe responder algo como:
  ```json
  {"success":true,"message":"Servidor funcionando correctamente"}
  ```
- Abre la URL del frontend y prueba registrarte o iniciar sesión.
- Para entrar al panel admin, usa el `ADMIN_EMAIL` y `ADMIN_PASSWORD` que pusiste en Render.

---

## ❓ Problemas comunes

- **La web se ve vacía o no carga datos:** revisa que `REACT_APP_API_URL` sea correcto y termine en `/api`.
- **Error de CORS:** `FRONTEND_URL` en el backend no coincide con la URL real del frontend.
- **El admin no se crea:** usa un correo que no exista ya como usuario.
- **Las rutas del frontend dan 404 al recargar:** en Render, activa la opción de SPA rewrite o usa un redirect a `index.html` en el sitio estático.
