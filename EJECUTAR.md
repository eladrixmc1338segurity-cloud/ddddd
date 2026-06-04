# 🚀 INSTRUCCIONES PARA EJECUTAR SETUPS PLATFORM

## Requisitos Instalados ✅
- ✅ Estructura completa de carpetas
- ✅ Backend con Express configurado
- ✅ Frontend con React configurado
- ✅ Modelos de base de datos
- ✅ Rutas y controladores
- ✅ Componentes UI con animaciones azules
- ✅ Panel de administrador
- ✅ Autenticación JWT
- ✅ Estilos responsivos

## Archivos .env Creados
- `backend/.env` - Configuración del servidor
- `frontend/.env` - Configuración de React

## Pasos Para Ejecutar

### 1. Asegurate de tener MongoDB instalado (Opcional)
Si usas MongoDB:
```bash
# En Windows: 
# Inicia MongoDB Community Server desde Services
# O ejecuta mongod.exe si está instalado localmente
```

Si prefieres SQLite (sin instalación requerida):
```bash
# El backend usará SQLite por defecto si no hay MongoDB
```

### 2. Ejecutar Backend (Terminal 1)
```bash
cd backend
npm start
```

Deberías ver:
```
Servidor ejecutándose en puerto 5000
Ambiente: development
```

### 3. Ejecutar Frontend (Terminal 2)
```bash
cd frontend
npm start
```

Se abrirá automáticamente en: **http://localhost:3000**

## Acceso Inicial

### Usuario Regular (para probar)
1. Click en "Registrarse"
2. Usa cualquier email y contraseña

### Usuario Admin
- Email: `eladrixmc1338.segurity@gmail.com`
- Contraseña: (la que configuraste en backend/.env)
- Acceso: http://localhost:3000/admin

## Canales Disponibles

- ⚙️ **Configuraciones** - Configuraciones del servidor
- 🎮 **Setups** - Configuraciones de gameplay  
- 🗺️ **Mapas** - Mapas descargables
- 📐 **Schematics** - Esquemas y plantillas
- 📦 **Otros** - Otros recursos

## Documentación

Consulta estos archivos para más información:
- [README.md](./README.md) - Visión general del proyecto
- [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md) - Guía completa de instalación
- [docs/ADMIN_SETUP.md](./docs/ADMIN_SETUP.md) - Guía del panel de administrador

## Solucionar Problemas

### El frontend no se conecta
- Verifica que backend esté en puerto 5000
- Revisa que `frontend/.env` tenga `REACT_APP_API_URL=http://localhost:5000/api`
- Reinicia ambos servidores

### MongoDB Error
- Si usas MongoDB, asegúrate de tener mongod corriendo
- O usa SQLite comentando MONGODB_URI en backend/.env

### Puerto en uso
- Cambia el puerto en `backend/.env`: `PORT=5001`
- El frontend auto-usará puerto 3000, o te lo indicará

---

## Características Implementadas ✨

### Frontend
- ✅ Diseño moderno en tonos azules
- ✅ Animaciones suaves (fade-in, slide-down, float)
- ✅ Botones con bordes negros y hover effects
- ✅ Interfaz responsiva (mobile, tablet, desktop)
- ✅ Navegación con React Router
- ✅ Gestión de autenticación con contexto

### Backend
- ✅ API REST completa
- ✅ Autenticación con JWT
- ✅ Contraseñas encriptadas (bcrypt)
- ✅ Modelos de User, Map, Channel
- ✅ Control de roles y permisos
- ✅ Validación de datos

### Base de Datos
- ✅ Modelos Mongoose para MongoDB
- ✅ Soporte para SQLite como alternativa
- ✅ Esquemas validados

### Seguridad
- ✅ JWT con expiración
- ✅ CORS configurado
- ✅ Roles de usuario
- ✅ Panel admin protegido
- ✅ Validación en backend

---

¡La plataforma está lista para usar! 🎉

Para desarrollo: npm start en ambas carpetas
Para producción: Ver guía de despliegue en GETTING_STARTED.md
