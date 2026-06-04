# 📋 Setups Platform - Guía de Instalación y Uso

## Requisitos Previos

- **Node.js** v16 o superior ([descargar](https://nodejs.org/))
- **npm** v8 o superior (viene con Node.js)
- **MongoDB** v4.4+ ([descargar](https://www.mongodb.com/try/download/community)) O SQLite (incluido)
- **Git** ([descargar](https://git-scm.com/))

## Instalación

### 1. Clonar o Descargar el Proyecto

```bash
# Si es un repositorio Git
git clone <url-del-repositorio>
cd Pagina-web-setups

# O si descargaste el ZIP
# Extrae los archivos y accede a la carpeta
```

### 2. Configurar Backend

```bash
cd backend

# Copiar archivo de configuración
cp .env.example .env

# Editar .env con tus datos (ver sección .env más abajo)
# En Windows: abre .env con un editor de texto

# Instalar dependencias
npm install
```

**Configurar `.backend/.env`:**
```env
PORT=5000
NODE_ENV=development

# Para MongoDB (recomendado)
MONGODB_URI=mongodb://localhost:27017/setups-platform

# Para SQLite (alternativa - descomenta)
# DATABASE_TYPE=sqlite

JWT_SECRET=tu_clave_secreta_muy_segura_y_unica
JWT_EXPIRE=7d

ADMIN_EMAIL=eladrixmc1338.segurity@gmail.com
ADMIN_PASSWORD=TuContraseñaSegura123!

FRONTEND_URL=http://localhost:3000
```

### 3. Configurar Frontend

```bash
cd ../frontend

# Copiar archivo de configuración
cp .env.example .env

# El .env debería verse así:
# REACT_APP_API_URL=http://localhost:5000/api

# Instalar dependencias
npm install
```

## Iniciar la Aplicación

### Opción 1: Terminal Separadas (Recomendado)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# O para desarrollo con auto-reload:
npm run dev
```
Deberías ver: `Servidor ejecutándose en puerto 5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Se abrirá automáticamente en `http://localhost:3000`

### Opción 2: Script Unificado

En la carpeta raíz:
```bash
# Iniciar ambos servidores (si existe script)
npm start
```

## Uso de la Plataforma

### 🔐 Autenticación

1. **Registrarse**: Click en "Registrarse"
   - Email
   - Usuario (mínimo 3 caracteres)
   - Contraseña (mínimo 6 caracteres)

2. **Iniciar Sesión**: Con tu email y contraseña

3. **Panel de Admin**: Solo con credenciales de admin, accede a `/admin`

### 🎮 Canales Disponibles

- **⚙️ Configuraciones**: Configuraciones del servidor
- **🎮 Setups**: Configuraciones de gameplay
- **🗺️ Mapas**: Mapas descargables
- **📐 Schematics**: Esquemas y plantillas
- **📦 Otros**: Otros recursos

### 📦 Descargar Mapas

1. Selecciona un canal
2. Haz click en el botón "Descargar" de cualquier mapa
3. El archivo se descargará a tu computadora

### 🔐 Acceso Admin

Solo usuarios con rol admin pueden:

1. Ir a `/admin` directamente en la URL
2. **Gestionar Mapas**: Subir, editar, eliminar
3. **Gestionar Usuarios**: Ver, promover, desactivar

[Ver guía completa de admin](./ADMIN_SETUP.md)

## Solucionar Problemas

### El frontend no se conecta con el backend

**Error**: `Error: Network Error` o `Cannot POST /api/...`

**Solución**:
- Verifica que el backend esté corriendo en puerto 5000
- Comprueba que `REACT_APP_API_URL` en `frontend/.env` es correcto
- Reinicia ambos servidores

### MongoDB no se conecta

**Error**: `Error conectando a MongoDB: connect ECONNREFUSED 127.0.0.1:27017`

**Solución**:
- Asegúrate de tener MongoDB instalado y ejecutándose
- En Windows: Ejecuta MongoDB Community Server desde Services
- O usa SQLite como alternativa (sin MongoDB instalado)

### Puerto 3000 o 5000 ya está en uso

**Solución**:
```bash
# Cambiar puerto del backend en .env
PORT=5001

# O matar el proceso que está usando el puerto
# En Windows: netstat -ano | findstr :3000
# En Mac/Linux: lsof -i :3000
```

### Contraseña de admin no funciona

1. Verifica que el valor en `backend/.env` sea correcto
2. Reinicia el backend
3. Los usuarios registrados inicialmente no serán admin automáticamente

## Estructura del Proyecto

```
Pagina-web-setups/
├── backend/              # Servidor Node.js + Express
│   ├── models/          # Modelos de datos (User, Map, etc)
│   ├── routes/          # Rutas API
│   ├── controllers/      # Lógica de negocio
│   ├── middleware/       # Autenticación, errores
│   ├── config/          # Configuración
│   └── server.js        # Punto de entrada
├── frontend/            # Aplicación React
│   ├── src/
│   │   ├── pages/       # Páginas (Login, Dashboard, Admin)
│   │   ├── components/  # Componentes reutilizables
│   │   ├── services/    # Llamadas a API
│   │   ├── context/     # Contexto de autenticación
│   │   ├── styles/      # Estilos CSS
│   │   └── App.js       # Componente principal
│   ├── public/          # HTML público
│   └── package.json
├── docs/                # Documentación
│   ├── ADMIN_SETUP.md  # Guía de admin
│   └── GETTING_STARTED.md
└── README.md           # Este archivo
```

## Despliegue en Producción

### Backend (Ejemplo: Heroku)

```bash
cd backend
heroku login
heroku create nombre-app-backend
git push heroku main
```

### Frontend (Ejemplo: Vercel)

```bash
cd frontend
npm install -g vercel
vercel --prod
```

## Seguridad

⚠️ **IMPORTANTE ANTES DE PRODUCCIÓN:**

1. Cambiar `JWT_SECRET` a una clave única y segura
2. Cambiar `ADMIN_PASSWORD`
3. Configurar HTTPS
4. Usar variables de entorno reales
5. Habilitar CORS solo para dominios permitidos
6. Configurar MongoDB con autenticación

## Soporte y Contribuciones

Para reportar bugs o sugerencias, crea un issue en el repositorio.

---

**Versión**: 1.0.0  
**Última actualización**: Junio 2026
