# 📍 GUÍA DE NAVEGACIÓN DEL PROYECTO

Esta guía te ayuda a encontrar exactamente lo que necesitas.

---

## 🎯 SI ERES NUEVO EN EL PROYECTO

👉 **Empieza por aquí (en este orden):**

1. **[00_LEEME_PRIMERO.md](00_LEEME_PRIMERO.md)** ⭐ (5 minutos)
   - Resumen completo de lo que se hizo
   - Checklist de características
   - Cómo empezar

2. **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** ⚡ (5 minutos)
   - Pasos exactos para ejecutar
   - Quick troubleshooting
   - Tips útiles

3. **[EJECUTAR.md](EJECUTAR.md)** 🚀 (Cuando estés listo)
   - Instrucciones detalladas de ejecución
   - Características implementadas
   - Solucionar problemas

---

## 📚 DOCUMENTACIÓN TÉCNICA

| Documento | Para Qué | Tiempo |
|-----------|----------|--------|
| [README.md](README.md) | Visión general del proyecto | 10 min |
| [ARQUITECTURA.md](ARQUITECTURA.md) | Diagramas técnicos y flujos | 15 min |
| [PROYECTO_COMPLETADO.md](PROYECTO_COMPLETADO.md) | Resumen técnico completo | 20 min |
| [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) | Instalación paso a paso | 20 min |
| [docs/ADMIN_SETUP.md](docs/ADMIN_SETUP.md) | Cómo acceder a admin panel | 10 min |

---

## 🗂️ ESTRUCTURA DE CARPETAS

### Backend (`backend/`)
**Puerto 5000** - Servidor Node.js + Express

```
backend/
├── server.js              ← PUNTO DE ENTRADA
├── package.json           ← Dependencias (npm install aquí)
├── .env                   ← CONFIGURACIÓN (ya creado)
│
├── models/                ← MODELOS DE DATOS
│   ├── User.js           ← Usuarios (email, contraseña, rol)
│   ├── Map.js            ← Mapas (para descargar)
│   └── Channel.js        ← Canales (Configuraciones, Setups, etc)
│
├── routes/                ← ENDPOINTS API
│   ├── auth.js           ← /api/auth (login, registro)
│   ├── maps.js           ← /api/maps (CRUD mapas)
│   └── users.js          ← /api/users (solo admin)
│
├── controllers/           ← LÓGICA DE NEGOCIO
│   ├── authController.js ← Autenticación
│   ├── mapController.js  ← Gestión de mapas
│   └── userController.js ← Gestión de usuarios
│
└── middleware/            ← SEGURIDAD
    ├── auth.js           ← Verificación JWT
    └── errorHandler.js   ← Manejo de errores
```

**Para iniciar:**
```bash
cd backend
npm start
```

### Frontend (`frontend/`)
**Puerto 3000** - Aplicación React

```
frontend/
├── package.json                  ← Dependencias (npm install aquí)
├── .env                          ← CONFIGURACIÓN (ya creado)
│
└── src/
    ├── App.js                   ← PUNTO DE ENTRADA (router)
    ├── index.js                 ← Renderiza en HTML
    │
    ├── pages/                   ← PÁGINAS COMPLETAS
    │   ├── Login.js            ← Página de login
    │   ├── Register.js         ← Página de registro
    │   ├── Dashboard.js        ← Panel principal (5 canales)
    │   └── AdminPanel.js       ← Panel de administrador
    │
    ├── components/              ← COMPONENTES REUTILIZABLES
    │   └── Navbar.js           ← Barra de navegación
    │
    ├── services/                ← LLAMADAS A API
    │   └── api.js              ← Funciones Axios
    │
    ├── context/                 ← ESTADO GLOBAL
    │   └── AuthContext.js      ← Autenticación y tokens
    │
    ├── styles/                  ← ESTILOS CSS
    │   ├── global.css          ← Estilos globales + animaciones
    │   ├── navbar.css          ← Navegación
    │   ├── auth.css            ← Login/Register
    │   ├── dashboard.css       ← Canales y mapas
    │   └── admin.css           ← Panel de admin
    │
    └── public/
        └── index.html          ← HTML principal
```

**Para iniciar:**
```bash
cd frontend
npm start
```

### Documentación (`docs/`)

```
docs/
├── GETTING_STARTED.md    ← Guía de instalación completa
├── ADMIN_SETUP.md        ← Cómo acceder al panel admin
└── README.md             ← (en raíz) Información del proyecto
```

---

## 🔧 CONFIGURACIÓN

### Variables de Entorno

**Backend: `backend/.env`**
```env
PORT=5000                          ← Puerto del servidor
MONGODB_URI=mongodb://...          ← Conexión BD
JWT_SECRET=tu_clave_secreta        ← Seguridad
ADMIN_EMAIL=tu@email.com           ← Email admin
ADMIN_PASSWORD=contraseña          ← Contraseña admin
FRONTEND_URL=http://localhost:3000 ← URL del frontend
```

**Frontend: `frontend/.env`**
```env
REACT_APP_API_URL=http://localhost:5000/api ← URL del backend
```

---

## 🚀 COMANDOS ÚTILES

### Backend
```bash
cd backend
npm install          # Instalar dependencias (solo primera vez)
npm start            # Iniciar servidor
npm run dev          # Iniciar con nodemon (auto-reload)
```

### Frontend
```bash
cd frontend
npm install          # Instalar dependencias (solo primera vez)
npm start            # Iniciar servidor
npm run build        # Compilar para producción
```

---

## 👤 ACCESO INICIAL

### Admin
- Email: `eladrixmc1338.segurity@gmail.com`
- Password: `CambiarEstoEnProduccion123!` (editable en `.env`)
- Panel: http://localhost:3000/admin

### Regular User
- Registrarse en: http://localhost:3000/register
- Cualquier email y contraseña válidos

---

## 🎨 PALETA DE COLORES

```css
--primary-blue: #0055CC;      /* Azul principal */
--secondary-blue: #2E5090;    /* Azul secundario */
--light-blue: #E3F2FD;        /* Azul claro (backgrounds) */
--dark-blue: #003399;         /* Azul oscuro (hover) */
--accent-blue: #005AB5;       /* Azul acento */
--border-color: #000000;      /* Negro (bordes) */
```

---

## 📊 ENDPOINTS API

### Autenticación
- `POST /api/auth/register` - Registrarse
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (protegido)
- `PUT /api/auth/profile` - Actualizar perfil (protegido)

### Mapas
- `GET /api/maps` - Obtener todos los mapas
- `GET /api/maps/:id` - Obtener mapa específico
- `POST /api/maps` - Crear mapa (solo admin)
- `PUT /api/maps/:id` - Editar mapa (admin o creador)
- `DELETE /api/maps/:id` - Eliminar mapa (admin o creador)

### Usuarios (Solo Admin)
- `GET /api/users` - Ver todos los usuarios
- `GET /api/users/:id` - Ver usuario específico
- `PUT /api/users/:id/permissions` - Cambiar permisos
- `PUT /api/users/:id/role` - Cambiar rol
- `PUT /api/users/:id/deactivate` - Desactivar usuario

---

## 🎯 CARACTERÍSTICAS POR ARCHIVO

### Componentes React
| Archivo | Características |
|---------|-----------------|
| `Login.js` | Form, validación, manejo de errores |
| `Register.js` | Form, validación de contraseñas |
| `Dashboard.js` | 5 canales, grid de mapas, descarga |
| `AdminPanel.js` | Gestión de mapas y usuarios |
| `Navbar.js` | Navegación, logout, usuario info |

### Estilos
| Archivo | Contiene |
|---------|----------|
| `global.css` | Animaciones, colores, fuentes |
| `navbar.css` | Barra de navegación |
| `auth.css` | Login y registro |
| `dashboard.css` | Canales y tarjetas de mapas |
| `admin.css` | Panel de administración |

---

## ✨ ANIMACIONES DISPONIBLES

```css
.fade-in         /* Aparece gradualmente */
.slide-down      /* Se desliza hacia abajo */
.float           /* Flota en el aire */
.pulse           /* Pulsación repetida */
.shimmer         /* Efecto de brillo */
```

---

## 🔒 SEGURIDAD

### Implementado
- ✅ JWT para autenticación
- ✅ Bcrypt para contraseñas
- ✅ Roles y permisos
- ✅ Validación de datos
- ✅ CORS configurado
- ✅ Panel admin protegido

### Acciones Protegidas
- ✅ Solo admin puede subir mapas
- ✅ Solo admin puede ver panel admin
- ✅ Solo usuario autenticado puede descargar
- ✅ Solo creador o admin pueden editar/eliminar

---

## 📱 RESPONSIVO

El proyecto es 100% responsivo:
- **Mobile** (< 480px): Una columna, navegación adaptada
- **Tablet** (480px - 768px): Dos columnas, sidebar oculto
- **Desktop** (> 768px): Sidebar fijo, grid completo

---

## 🐛 SI ALGO FALLA

| Problema | Solución | Documentación |
|----------|----------|---------------|
| npm install lento | Esperar, es normal | [INICIO_RAPIDO.md](INICIO_RAPIDO.md) |
| MongoDB no conecta | Instalar o usar SQLite | [GETTING_STARTED.md](docs/GETTING_STARTED.md) |
| Puerto en uso | Cambiar en .env | [EJECUTAR.md](EJECUTAR.md) |
| Frontend no se conecta | Verificar REACT_APP_API_URL | [INICIO_RAPIDO.md](INICIO_RAPIDO.md) |
| Error de permisos | Ejecutar como admin | [GETTING_STARTED.md](docs/GETTING_STARTED.md) |

---

## 📞 CONTACTO

Si tienes dudas:
1. Revisa [00_LEEME_PRIMERO.md](00_LEEME_PRIMERO.md)
2. Consulta [INICIO_RAPIDO.md](INICIO_RAPIDO.md)
3. Lee [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md)

---

## 🎓 ORDEN RECOMENDADO DE LECTURA

```
1. 00_LEEME_PRIMERO.md       ← EMPIEZA AQUÍ (5 min)
   ↓
2. INICIO_RAPIDO.md           ← Después (5 min)
   ↓
3. EJECUTAR.md                ← Cuando ejecutes (10 min)
   ↓
4. Opcional: ARQUITECTURA.md  ← Para entender técnicamente (15 min)
   ↓
5. Opcional: PROYECTO_COMPLETADO.md ← Resumen completo (20 min)
```

---

*Última actualización: Junio 2026*  
*Setups Platform - 100% Completada*
