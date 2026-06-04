# 🚀 Setups Platform - Guía de Administrador

## Acceso al Panel de Administrador

### Importante: URL Específica
El panel de administrador **NO está accesible desde el menú público** por razones de seguridad. Solo se puede acceder directamente mediante la URL específica.

### Instrucciones de Acceso

1. **Inicia sesión** en la plataforma con tus credenciales de administrador:
   - Email: `eladrixmc1338.segurity@gmail.com`
   - Contraseña: La que configuraste durante la instalación

2. **Accede directamente a la URL del panel**:
   ```
   http://localhost:3000/admin
   ```
   O en producción:
   ```
   https://tu-dominio.com/admin
   ```

3. Si no eres administrador, verás el mensaje: **"Acceso Denegado"**

### Funcionalidades del Panel de Admin

#### 📦 Gestión de Mapas
- **Ver todos los mapas** subidos en el sistema
- **Subir nuevos mapas** en diferentes categorías:
  - Configuraciones
  - Setups
  - Mapas
  - Schematics
  - Otros
- **Eliminar mapas** inapropiados o antiguos
- **Ver estadísticas** de descargas

#### 👥 Gestión de Usuarios
- **Ver lista completa** de usuarios registrados
- **Promover usuarios** a administradores (se requiere cuidado)
- **Desactivar/Activar** usuarios
- **Ver último login** de cada usuario
- **Gestionar permisos** individuales

### Seguridad

⚠️ **Medidas de Seguridad Implementadas:**
- Token JWT para autenticación
- Contraseñas encriptadas con bcrypt
- Validación en backend de roles de admin
- Solo usuarios con rol "admin" pueden acceder
- La URL directa requiere estar autenticado

### Cambiar Contraseña

⚠️ **Para cambiar la contraseña de admin, contacta al soporte técnico**

### Crear Nuevos Administradores

1. Desde el panel de admin, ve a **Gestión de Usuarios**
2. Encuentra el usuario que deseas promover
3. Haz clic en **"Promover a Admin"**
4. Confirma la acción

### Monitoreo

- **Última actividad**: Visualiza el último login de cada usuario
- **Descargas**: Rastrea cuántas veces se ha descargado cada mapa
- **Estado de usuarios**: Activo/Inactivo

## Soporte

Si tienes problemas para acceder al panel de admin, verifica:
- ✅ Que estés logueado con credenciales de admin
- ✅ Que la URL sea correcta: `http://localhost:3000/admin`
- ✅ Que el backend esté corriendo correctamente
- ✅ Que la base de datos esté conectada

---

**Última actualización**: Junio 2026
