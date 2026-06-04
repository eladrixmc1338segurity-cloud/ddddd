# 🏗️ ARQUITECTURA DEL PROYECTO

## Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                        INTERNET BROWSER                         │
│                                                                  │
│              http://localhost:3000 (REACT FRONTEND)             │
└────────────────────────────┬──────────────────────────────────┘
                             │
                             │ HTTP/REST API
                             │ Axios Requests
                             │
        ┌────────────────────▼─────────────────────┐
        │                                          │
        │    FRONTEND (React - Puerto 3000)        │
        │                                          │
        │  ┌──────────────────────────────────┐   │
        │  │     React Pages                  │   │
        │  │  ✓ Login.js                      │   │
        │  │  ✓ Register.js                   │   │
        │  │  ✓ Dashboard.js                  │   │
        │  │  ✓ AdminPanel.js                 │   │
        │  └──────────────────────────────────┘   │
        │                                          │
        │  ┌──────────────────────────────────┐   │
        │  │   React Context                  │   │
        │  │  • AuthContext.js (JWT tokens)   │   │
        │  └──────────────────────────────────┘   │
        │                                          │
        │  ┌──────────────────────────────────┐   │
        │  │   API Services                   │   │
        │  │  • api.js (Axios calls)          │   │
        │  └──────────────────────────────────┘   │
        │                                          │
        │  ┌──────────────────────────────────┐   │
        │  │   Styling                        │   │
        │  │  • global.css (animaciones)      │   │
        │  │  • navbar.css (navegación)       │   │
        │  │  • auth.css (login/register)     │   │
        │  │  • dashboard.css (canales)       │   │
        │  │  • admin.css (panel admin)       │   │
        │  └──────────────────────────────────┘   │
        │                                          │
        └────────────────────┬─────────────────────┘
                             │
                             │ REST API Endpoints
                             │ /api/auth
                             │ /api/maps
                             │ /api/users
                             │
        ┌────────────────────▼─────────────────────┐
        │                                          │
        │    BACKEND (Express - Puerto 5000)       │
        │                                          │
        │  ┌──────────────────────────────────┐   │
        │  │   API Routes                     │   │
        │  │  ✓ /auth (register, login)       │   │
        │  │  ✓ /maps (CRUD)                  │   │
        │  │  ✓ /users (admin only)           │   │
        │  └──────────────────────────────────┘   │
        │                                          │
        │  ┌──────────────────────────────────┐   │
        │  │   Controllers                    │   │
        │  │  • authController.js             │   │
        │  │  • mapController.js              │   │
        │  │  • userController.js             │   │
        │  └──────────────────────────────────┘   │
        │                                          │
        │  ┌──────────────────────────────────┐   │
        │  │   Middleware                     │   │
        │  │  • auth.js (JWT validation)      │   │
        │  │  • errorHandler.js               │   │
        │  └──────────────────────────────────┘   │
        │                                          │
        │  ┌──────────────────────────────────┐   │
        │  │   Models (Mongoose)              │   │
        │  │  • User.js                       │   │
        │  │  • Map.js                        │   │
        │  │  • Channel.js                    │   │
        │  └──────────────────────────────────┘   │
        │                                          │
        │  ┌──────────────────────────────────┐   │
        │  │   Config                         │   │
        │  │  • database.js (MongoDB)         │   │
        │  └──────────────────────────────────┘   │
        │                                          │
        └────────────────────┬─────────────────────┘
                             │
                             │ Mongoose Queries
                             │ Database Operations
                             │
        ┌────────────────────▼─────────────────────┐
        │                                          │
        │   DATABASE (MongoDB/SQLite)              │
        │                                          │
        │  ┌──────────────────────────────────┐   │
        │  │   Collections/Tables             │   │
        │  │  ✓ users                         │   │
        │  │  ✓ maps                          │   │
        │  │  ✓ channels                      │   │
        │  │  ✓ permissions                   │   │
        │  └──────────────────────────────────┘   │
        │                                          │
        │  Almacenamiento de:                      │
        │  • Credenciales (encriptadas)            │
        │  • Perfiles de usuarios                  │
        │  • Información de mapas                  │
        │  • Permisos y roles                      │
        │                                          │
        └──────────────────────────────────────────┘
```

---

## 🔄 FLUJO DE AUTENTICACIÓN

```
┌─────────────────────────────────────────────────┐
│  USUARIO                                        │
└──────────────────┬──────────────────────────────┘
                   │
                   │ 1. Ingresa email y contraseña
                   │
        ┌──────────▼──────────┐
        │ Frontend: Login.js  │
        └──────────┬──────────┘
                   │
                   │ 2. POST /api/auth/login
                   │ Axios envía credenciales
                   │
        ┌──────────▼──────────────────────┐
        │ Backend: authController.login   │
        │ - Valida formato                │
        │ - Busca usuario en BD           │
        │ - Compara contraseña con bcrypt │
        └──────────┬──────────────────────┘
                   │
                   │ 3. Si es válido: JWT generado
                   │    Firma: JWT.sign({id, role}, SECRET)
                   │
        ┌──────────▼────────────────────────────┐
        │ Frontend: Almacena token              │
        │ localStorage.setItem('authToken', token)
        └──────────┬────────────────────────────┘
                   │
                   │ 4. Configura Axios header
                   │    Authorization: Bearer {token}
                   │
        ┌──────────▼──────────────┐
        │ Frontend: Protected Route│
        │ Redirige a /dashboard    │
        └──────────┬──────────────┘
                   │
                   │ 5. Próximas peticiones incluyen token
                   │    GET /api/auth/profile
                   │
        ┌──────────▼──────────────────────┐
        │ Backend: Middleware protect()    │
        │ - Extrae token del header       │
        │ - Verifica firma JWT.verify()   │
        │ - Adjunta usuario a req         │
        └──────────┬──────────────────────┘
                   │
                   │ 6. Acceso CONCEDIDO ✓
                   │    Usuario en sesión
                   │
        ┌──────────▼────────────┐
        │ Dashboard Renderizado  │
        │ Muestra canales        │
        └───────────────────────┘
```

---

## 📊 FLUJO DE DESCARGA DE MAPA

```
┌────────────────────────────────────────────┐
│  USUARIO VE MAPA EN CANAL                 │
└────────────────┬─────────────────────────┘
                 │
                 │ 1. Click en botón "Descargar"
                 │
        ┌────────▼──────────────────────────┐
        │ Frontend: onClick handler         │
        │ - Obtiene URL del archivo         │
        │ - Abre link en nueva pestaña      │
        └────────┬──────────────────────────┘
                 │
                 │ 2. GET /api/maps/:id
                 │ (Registra descarga)
                 │
        ┌────────▼──────────────────────────┐
        │ Backend: getMapById()              │
        │ - Busca mapa en BD                 │
        │ - Incrementa downloadCount ++      │
        │ - Retorna información              │
        │ - Guarda en BD                     │
        └────────┬──────────────────────────┘
                 │
                 │ 3. Archivo descargado
                 │ del servidor/CDN
                 │
        ┌────────▼──────────────────────────┐
        │ Usuario: Archivo en carpeta        │
        │ de descargas                       │
        └───────────────────────────────────┘
```

---

## 👥 FLUJO DE GESTIÓN DE USUARIOS (ADMIN)

```
┌─────────────────────────────────────────────────┐
│  ADMIN ACCEDE A http://localhost:3000/admin    │
└──────────────────┬──────────────────────────────┘
                   │
                   │ 1. Verificación de rol
                   │ ProtectedRoute + authorize('admin')
                   │
        ┌──────────▼──────────────────────┐
        │ Es admin? ✓ SÍ                  │
        │ → Carga AdminPanel.js            │
        └──────────┬──────────────────────┘
                   │
                   │ 2a. Pestaña: Gestión de Mapas
                   │
        ┌──────────▼──────────────────────┐
        │ GET /api/maps                    │
        │ Obtiene todos los mapas          │
        └──────────┬──────────────────────┘
                   │
                   ├─ Ver mapas en tabla
                   ├─ Botón "Eliminar"
                   │  DELETE /api/maps/:id
                   └─ Form "Subir Mapa"
                      POST /api/maps
                   │
        ┌──────────▼──────────────────────┐
        │                                  │
        │ 2b. Pestaña: Gestión de Usuarios│
        │                                  │
        └──────────┬──────────────────────┘
                   │
                   │ GET /api/users
                   │ Obtiene lista de usuarios
                   │
        ┌──────────▼──────────────────────┐
        │ Tabla de usuarios con acciones   │
        │                                  │
        │ - Promover: PUT /:id/role        │
        │ - Desactivar: PUT /:id/deactivate│
        │                                  │
        └──────────────────────────────────┘
```

---

## 🔒 FLUJO DE SEGURIDAD

```
┌─────────────────────────────────────────┐
│  PETICIÓN HTTP LLEGA AL BACKEND         │
└──────────────┬──────────────────────────┘
               │
               │ 1. CORS Check
               │ ¿Origen permitido?
               │
        ┌──────▼──────────┐
        │ ✓ Sí → Continúa  │
        │ ✗ No → 403 Error │
        └──────┬───────────┘
               │
               │ 2. Validación de datos
               │ Esquema Mongoose
               │
        ┌──────▼──────────────────────────┐
        │ ✓ Válido → Continúa              │
        │ ✗ Inválido → 400 Bad Request    │
        └──────┬──────────────────────────┘
               │
               │ 3. ¿Requiere autenticación?
               │
        ┌──────▼──────────────────────────┐
        │ Sí → Busca token en header       │
        │ Authorization: Bearer {token}    │
        └──────┬──────────────────────────┘
               │
               │ 4. JWT Verification
               │ jwt.verify(token, SECRET)
               │
        ┌──────▼──────────────────────────┐
        │ ✓ Token válido → Adjunta usuario │
        │ ✗ Token inválido → 401 Unauth   │
        └──────┬──────────────────────────┘
               │
               │ 5. ¿Requiere rol específico?
               │ authorize('admin')
               │
        ┌──────▼──────────────────────────┐
        │ ✓ Es admin → Procesa request     │
        │ ✗ No admin → 403 Forbidden       │
        └──────┬──────────────────────────┘
               │
               │ 6. Ejecuta lógica de negocio
               │ Controller function
               │
        ┌──────▼──────────────────────────┐
        │ Base de datos queries            │
        │ Mongoose operations              │
        └──────┬──────────────────────────┘
               │
               │ 7. Respuesta JSON
               │ { success, data/message }
               │
        ┌──────▼──────────────────────────┐
        │ Error Handler (si hay error)     │
        │ Retorna error structure          │
        └──────┬──────────────────────────┘
               │
        ┌──────▼──────────────────────────┐
        │ Frontend recibe respuesta        │
        │ Actualiza estado y UI            │
        └──────────────────────────────────┘
```

---

## 📱 ESTRUCTURA DE CARPETAS DETALLADA

```
frontend/src/
├── pages/
│   ├── Login.js              # Página de login
│   ├── Register.js           # Página de registro
│   ├── Dashboard.js          # Panel principal con canales
│   └── AdminPanel.js         # Panel de administrador
│
├── components/
│   └── Navbar.js             # Barra de navegación
│
├── services/
│   └── api.js                # Funciones para llamadas API
│
├── context/
│   └── AuthContext.js        # Contexto global de autenticación
│
├── styles/
│   ├── global.css            # Estilos globales + animaciones
│   ├── navbar.css            # Estilos de navbar
│   ├── auth.css              # Estilos de login/register
│   ├── dashboard.css         # Estilos del dashboard
│   └── admin.css             # Estilos del panel admin
│
├── App.js                    # Componente raíz con rutas
└── index.js                  # Punto de entrada
```

```
backend/
├── models/
│   ├── User.js               # Esquema de usuario
│   ├── Map.js                # Esquema de mapa
│   └── Channel.js            # Esquema de canal
│
├── routes/
│   ├── auth.js               # Rutas de autenticación
│   ├── maps.js               # Rutas de mapas
│   └── users.js              # Rutas de usuarios (admin)
│
├── controllers/
│   ├── authController.js     # Lógica de autenticación
│   ├── mapController.js      # Lógica de mapas
│   └── userController.js     # Lógica de usuarios
│
├── middleware/
│   ├── auth.js               # Middleware de JWT
│   └── errorHandler.js       # Manejador de errores
│
├── config/
│   └── database.js           # Conexión a MongoDB
│
├── uploads/                  # Almacenamiento temporal
│
├── server.js                 # Punto de entrada
├── package.json              # Dependencias
└── .env                      # Variables de entorno
```

---

Este es el diagrama arquitectónico completo del proyecto. Toda la estructura está diseñada para escalabilidad, seguridad y mantenibilidad. 🚀
