# ⚡ Setups Platform

Una plataforma web moderna y segura para gestionar mapas, configuraciones y recursos con sistema de autenticación JWT y panel de administrador.

## 🌟 Características

✨ **Autenticación Segura**
- Registro e inicio de sesión con email y contraseña
- Tokens JWT seguros
- Contraseñas encriptadas con bcrypt

🎨 **Diseño Moderno**
- Interfaz intuitiva con tonos azules
- Animaciones suaves y transiciones fluidas
- Diseño completamente responsivo
- Botones interactivos con hover effects

📦 **Gestión de Contenido**
- 5 canales temáticos (Configuraciones, Setups, Mapas, Schematics, Otros)
- Sistema de descarga de mapas
- Búsqueda y filtrado por categoría
- Contador de descargas

👑 **Panel de Administrador**
- Gestión completa de mapas (crear, editar, eliminar)
- Gestión de usuarios (promover, desactivar)
- Control de permisos
- Acceso seguro solo con URL específica
- Estadísticas de uso

🔒 **Seguridad Empresarial**
- Autenticación JWT con expiración
- Validación de datos en backend
- Protección contra CORS
- Roles de usuario (admin, user)
- Base de datos MongoDB con datos cifrados

## 🚀 Inicio Rápido

### Requisitos
- Node.js v16+
- npm v8+
- MongoDB (o SQLite como alternativa)

### Instalación

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm start

# En otra terminal - Frontend
cd frontend
npm install
npm start
```

Abre http://localhost:3000 en tu navegador.

## 📚 Documentación

- [Guía de Instalación Completa](./docs/GETTING_STARTED.md)
- [Panel de Administrador](./docs/ADMIN_SETUP.md)

## 🔧 Tecnologías

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT para autenticación
- Bcrypt para encriptación

**Frontend**
- React 18
- React Router DOM
- Axios para API calls
- CSS3 con animaciones

## 📁 Estructura

```
├── backend/        # Servidor REST API
├── frontend/       # Aplicación React
└── docs/           # Documentación
    ├── GETTING_STARTED.md
    └── ADMIN_SETUP.md
```

## 👤 Usuario Admin por Defecto

- **Email**: `eladrixmc1338.segurity@gmail.com`
- **Contraseña**: Configurada en `backend/.env`

Acceso al panel: http://localhost:3000/admin

## 🎯 Canales Disponibles

1. **⚙️ Configuraciones** - Configuraciones del servidor y sistema
2. **🎮 Setups** - Configuraciones de gameplay y mecánicas
3. **🗺️ Mapas** - Mapas personalizados descargables
4. **📐 Schematics** - Esquemas y plantillas
5. **📦 Otros** - Recursos y utilidades adicionales

## 🛡️ Seguridad

✅ Autenticación JWT  
✅ Contraseñas hasheadas  
✅ Validación de datos  
✅ Control de CORS  
✅ Roles y permisos  
✅ Panel admin protegido  

## 📝 Licencia

MIT License - Siéntete libre de usar y modificar.

## 💬 Soporte

Para preguntas o problemas, contacta al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Creado**: Junio 2026  
**Autor**: Equipo de Desarrollo
