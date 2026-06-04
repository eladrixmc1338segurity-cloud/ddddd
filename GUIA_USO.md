# 📖 Guía de uso y panel de administrador

## 1. La página principal (Landing)

Al entrar en la web verás:

- Una **barra superior** con accesos rápidos: **Inicio** (te lleva a las estadísticas), **Canales**, **Productos** y **Apoyo**.
- **Estadísticas** en vivo (recursos, descargas, usuarios).
- **Canales y categorías** (Configuraciones, Setups, Mapas, Schematics, Otros).
- **Productos** y, si está configurado, la sección **Apoyo** con enlaces de donación y un banner.

## 2. Cuenta de usuario

- **Registrarse / Iniciar sesión** desde los botones de la barra.
- Una vez dentro, puedes **editar tu perfil** (nombre, avatar, contraseña) desde "Mi Perfil".
- En el **Dashboard** se explora el contenido por canales.

## 3. Entrar al panel de administrador

1. Inicia sesión con una cuenta **de administrador**.
   - Por defecto: el `ADMIN_EMAIL` / `ADMIN_PASSWORD` de tu archivo `.env` (ej. `admin@setups.com` / `Admin12345!`).
2. Arriba a la derecha pulsa **"Panel Admin"**.
3. Verás tres pestañas: **Gestión**, **Gestionar Usuarios** y **Monetización**.

> Si entras con una cuenta normal, el panel te mostrará "Acceso denegado".

## 4. Pestaña "Gestión" (mapas/recursos)

- Subir un nuevo recurso (nombre, descripción, categoría, URL del archivo).
- Ver la lista de recursos y **eliminarlos**.

## 5. Pestaña "Gestionar Usuarios"

Para cada usuario puedes:

- **Promover a admin** / **Quitar admin**: cambia el rol sin borrar la cuenta.
- **Activar / Desactivar**: desactivar bloquea el acceso sin eliminar la cuenta; puedes **volver a activarla** cuando quieras.
- **Permisos**: pulsa "Permisos" para abrir un panel con casillas y marcar qué puede hacer ese usuario:
  - Subir recursos
  - Eliminar recursos
  - Editar usuarios
  - Gestionar canales

  Marca/desmarca y pulsa **"Guardar permisos"**.

> 🔒 Por seguridad no puedes quitarte el rol de admin ni desactivar tu **propia** cuenta (para no quedarte sin acceso).

## 6. Pestaña "Monetización"

Configura lo que se mostrará en la página principal:

- Enlaces de **PayPal, Ko-fi, Patreon, Discord** y enlaces personalizados.
- Un **banner promocional** (texto, enlace e imagen opcional) que aparece arriba en la landing.

Pulsa **"Guardar configuración"** y los cambios se reflejan en la web pública.

## ❓ Dudas frecuentes

- **No veo el botón "Panel Admin":** tu cuenta no es admin. Revisa el `ADMIN_EMAIL` del `.env` o pide a otro admin que te promueva.
- **Desactivé a alguien por error:** entra a "Gestionar Usuarios" y pulsa **"Activar"** en esa fila.
