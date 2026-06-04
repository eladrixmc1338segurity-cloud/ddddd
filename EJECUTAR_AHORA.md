# 🚀 EJECUTAR LA APLICACIÓN - Paso a Paso

> **IMPORTANTE**: Ahora usamos **SQLite** (base de datos integrada). NO necesitas MongoDB instalado.

## ✅ PASO 1: Instalar Dependencias del Backend

Abre **PowerShell** y ejecuta:

```powershell
cd "C:\Users\eladr\OneDrive\Desktop\Pagina web setups\backend"
npm install
```

**¿Qué pasa?** Se descargan e instalan todos los paquetes necesarios.  
**Tiempo**: 2-3 minutos

---

## ✅ PASO 2: Instalar Dependencias del Frontend

Abre **otra ventana de PowerShell** y ejecuta:

```powershell
cd "C:\Users\eladr\OneDrive\Desktop\Pagina web setups\frontend"
npm install
```

**¿Qué pasa?** Se descargan e instalan React y todas las librerías.  
**Tiempo**: 3-5 minutos

---

## ✅ PASO 3: Iniciar el Backend

En la **primera ventana de PowerShell** (donde instalaste backend):

```powershell
npm start
```

**Verás esto si funciona:**
```
==================================================
🚀 Servidor ejecutándose en puerto 5000
🌐 URL: http://localhost:5000
📊 Base de datos: SQLite
==================================================

✅ Tabla usuarios creada
✅ Tabla mapas creada
✅ Tabla canales creada
✅ Tabla permisos creada
✅ SQLite conectado correctamente

✅ El servidor está LISTO.
```

**Si VES ESTO, el backend funciona perfectamente** ✅

---

## ✅ PASO 4: Iniciar el Frontend

En la **segunda ventana de PowerShell** (donde instalaste frontend):

```powershell
npm start
```

**Verás esto si funciona:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

Se abrirá automáticamente en tu navegador.

---

## 🎯 AHORA YA PUEDES USAR LA APP

### 1️⃣ Registrarte (Crear cuenta nueva)
- Click en **"Registrarse"**
- Email: lo que quieras (ej: `test@ejemplo.com`)
- Usuario: lo que quieras (ej: `miusuario`)
- Contraseña: lo que quieras
- Click en **"Registrar"**

### 2️⃣ Acceder como Admin
- Click en **"Login"**
- Email: `eladrixmc1338.segurity@gmail.com`
- Contraseña: `CambiarEstoEnProduccion123!`
- Click en **"Entrar"**

Una vez dentro, verás el botón **"Panel Admin"** en la barra superior.

### 3️⃣ Usar el Panel de Admin
- Click en **"Panel Admin"**
- Tab "Mapas": Sube tus archivos de mapa
- Tab "Usuarios": Gestiona usuarios y roles

---

## 🐛 Si Algo No Funciona

### Backend no inicia
```powershell
# En la carpeta backend:
rm -r node_modules
npm install
npm start
```

### Frontend no se abre
```powershell
# En la carpeta frontend:
rm -r node_modules
npm install
npm start
```

### Error de puerto en uso
Si dice "puerto 5000 en uso" o "puerto 3000 en uso":
```powershell
# Cierra todas las ventanas de PowerShell y terminal
# Espera 10 segundos
# Abre nuevas ventanas y ejecuta de nuevo
```

---

## 📝 RESUMEN DE CREDENCIALES

| Tipo | Email | Contraseña |
|------|-------|-----------|
| **Admin** | eladrixmc1338.segurity@gmail.com | CambiarEstoEnProduccion123! |
| **Test** | test@ejemplo.com | Lo que registres |

---

## 🗄️ Base de Datos

La base de datos SQLite se crea automáticamente en:
```
backend/database.db
```

No necesitas hacer nada, se crea sola cuando inicia el backend.

---

## ✅ Checklist de Ejecución

- [ ] Backend npm install completado
- [ ] Frontend npm install completado
- [ ] Backend iniciado (puerto 5000)
- [ ] Frontend iniciado (puerto 3000)
- [ ] Página abierta en navegador
- [ ] Pruebas: Registro ✅ | Login ✅ | Admin ✅

---

¿Necesitas ayuda? Verifica que:
1. Las dos ventanas de PowerShell estén ejecutando npm start
2. No veas errores en rojo
3. El navegador muestre la página azul
