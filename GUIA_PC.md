# 🖥️ Guía: Hostear la web en tu PC (local)

Esta guía explica cómo ejecutar la plataforma en tu propio ordenador para usarla o probarla.

## 1. Requisitos

- **Node.js v16 o superior** → <https://nodejs.org/> (instala la versión "LTS").
- Comprueba que está instalado abriendo una terminal (PowerShell) y escribiendo:
  ```powershell
  node -v
  npm -v
  ```
  Si te muestran números de versión, todo bien.

## 2. Configurar el backend (`.env`)

Dentro de la carpeta `backend` debe existir un archivo llamado `.env`. Si no existe, créalo (en VS Code: clic derecho sobre `backend` → Nuevo archivo → `.env`) con este contenido:

```env
PORT=5000
NODE_ENV=development

DATABASE_TYPE=sqlite
SQLITE_PATH=./database.db

JWT_SECRET=clave_secreta_local_setups_2026
JWT_EXPIRE=7d

# Admin: usa un correo que NO exista ya como usuario normal
ADMIN_EMAIL=admin@setups.com
ADMIN_PASSWORD=Admin12345!

FRONTEND_URL=http://localhost:3000
```

> ⚠️ El admin solo se crea automáticamente si el `ADMIN_EMAIL` **no existía** antes en la base de datos. Si pones un correo que ya está registrado como usuario normal, no se ascenderá a admin.

## 3. Arrancar el backend

Abre una terminal en la carpeta del proyecto:

```powershell
cd backend
npm install      # solo la primera vez (descarga dependencias)
npm start
```

Al arrancar verás algo como:
```
✅ SQLite conectado correctamente
🚀 Servidor ejecutándose en puerto 5000
✅ Usuario administrador por defecto creado: admin@setups.com
```

Deja esta terminal abierta.

## 4. Arrancar el frontend

Abre **otra** terminal (sin cerrar la del backend):

```powershell
cd frontend
npm install      # solo la primera vez
npm start
```

Se abrirá solo en <http://localhost:3000>.

## 5. Listo

- Web pública: <http://localhost:3000>
- API backend: <http://localhost:5000/api>

Para entrar al panel de administrador y usar la web, mira **[GUIA_USO.md](./GUIA_USO.md)**.

## ❓ Problemas comunes

- **"npm no se reconoce":** no tienes Node.js instalado o la terminal está abierta desde antes de instalarlo. Cierra y abre la terminal de nuevo.
- **El puerto 5000 o 3000 está ocupado:** cierra otras apps que los usen, o cambia `PORT` en el `.env`.
- **No puedo entrar al panel admin:** revisa que el `ADMIN_EMAIL` del `.env` sea un correo nuevo y reinicia el backend (`Ctrl + C` y `npm start`).
