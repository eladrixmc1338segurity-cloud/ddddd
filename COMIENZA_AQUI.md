# 📱 GUÍA VISUAL - CÓMO EJECUTAR TODO

## 🎯 OBJETIVO FINAL
Tener dos ventanas abiertas:
- **Ventana 1**: Backend corriendo en puerto 5000
- **Ventana 2**: Frontend corriendo en puerto 3000

---

## 📋 PASO A PASO

### PASO 1️⃣ - Abre PowerShell Primera Vez (Backend)

1. Presiona `⊞ Windows + R`
2. Escribe: `powershell`
3. Presiona `Enter`

Ahora tienes la **VENTANA 1** abierta

```
PS C:\Users\eladr>
```

---

### PASO 2️⃣ - Navega a Backend (VENTANA 1)

Copia y pega esto en PowerShell:

```powershell
cd "C:\Users\eladr\OneDrive\Desktop\Pagina web setups\backend"
```

Presiona `Enter`. Verás:

```
PS C:\Users\eladr\OneDrive\Desktop\Pagina web setups\backend>
```

---

### PASO 3️⃣ - Instala Backend (VENTANA 1)

Escribe:

```powershell
npm install
```

Presiona `Enter`.

**¿QUÉ PASA?**
- Se descarga en la pantalla mucho texto
- Tarda 2-3 minutos
- Verás: `added XXX packages`

**NO HAGAS NADA, espera a que termine.**

```
PS C:\Users\eladr\OneDrive\Desktop\Pagina web setups\backend> npm install

up to date, audited X packages in X s
```

---

### PASO 4️⃣ - Abre PowerShell Segunda Vez (Frontend)

1. Presiona `⊞ Windows + R`
2. Escribe: `powershell`
3. Presiona `Enter`

Ahora tienes la **VENTANA 2** abierta

---

### PASO 5️⃣ - Navega a Frontend (VENTANA 2)

Copia y pega esto en la NUEVA PowerShell:

```powershell
cd "C:\Users\eladr\OneDrive\Desktop\Pagina web setups\frontend"
```

Presiona `Enter`. Verás:

```
PS C:\Users\eladr\OneDrive\Desktop\Pagina web setups\frontend>
```

---

### PASO 6️⃣ - Instala Frontend (VENTANA 2)

Escribe:

```powershell
npm install
```

Presiona `Enter`.

**¿QUÉ PASA?**
- Se descarga mucho texto (React es más grande)
- Tarda 3-5 minutos
- Verás: `added XXX packages`

**NO HAGAS NADA, espera a que termine.**

---

### PASO 7️⃣ - Inicia Backend (VENTANA 1)

En la **PRIMERA ventana** (backend), escribe:

```powershell
npm start
```

Presiona `Enter`.

**VERÁS ESTO SI FUNCIONA:**
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

**✅ LISTO - No toques esta ventana. Déjala así.**

---

### PASO 8️⃣ - Inicia Frontend (VENTANA 2)

En la **SEGUNDA ventana** (frontend), escribe:

```powershell
npm start
```

Presiona `Enter`.

**VERÁS ESTO SI FUNCIONA:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**Se abrirá automáticamente tu navegador con la página azul.**

---

## 🎉 ¡YA ESTÁ CORRIENDO!

Deberías ver:
- Una página **azul y moderna**
- Botón **"Registrarse"**
- Botón **"Login"**
- Un bonito diseño

---

## 🧪 PRUEBA AHORA

### ✅ Prueba 1: Registrarse

1. Click en **"Registrarse"**
2. Email: escribe tu email (ej: `test@prueba.com`)
3. Usuario: escribe un usuario (ej: `miusuario`)
4. Contraseña: escribe una contraseña
5. Click en **"Registrar"**

**Si funciona:** Se abre el dashboard con 5 canales.

---

### ✅ Prueba 2: Login como Admin

1. Click en **"Login"**
2. Email: `eladrixmc1338.segurity@gmail.com`
3. Contraseña: `CambiarEstoEnProduccion123!`
4. Click en **"Entrar"**

**Si funciona:** Ves el panel con botón **"Panel Admin"** en la parte superior derecha.

---

### ✅ Prueba 3: Panel Admin

1. Click en **"Panel Admin"** (está en la barra superior)
2. Verás dos tabs: **Mapas** y **Usuarios**
3. En **Mapas** puedes subir archivos
4. En **Usuarios** puedes ver todos los usuarios

**Si funciona:** ¡Todo está perfecto!** 🎉

---

## 🚨 SI ALGO NO FUNCIONA

### ❌ "No encuentra el backend"
**Solución:**
- Verifica que la VENTANA 1 (backend) esté ejecutando `npm start`
- Verás `🚀 Servidor ejecutándose en puerto 5000` en rojo o verde

### ❌ "No se abre el navegador"
**Solución:**
- Abre manualmente: `http://localhost:3000`

### ❌ "Error al registrarse"
**Solución:**
1. Cierra el backend (en VENTANA 1, presiona `Ctrl + C`)
2. Cierra el frontend (en VENTANA 2, presiona `Ctrl + C`)
3. Vuelve al PASO 7️⃣

---

## 💾 CREDENCIALES IMPORTANTES

Guarda esto:

| Tipo | Email | Contraseña |
|------|-------|-----------|
| **Admin** | eladrixmc1338.segurity@gmail.com | CambiarEstoEnProduccion123! |
| **Nuevo usuario** | Lo que registres | Lo que registres |

---

## 📝 RESUMEN VISUAL

```
VENTANA 1 (Backend)              VENTANA 2 (Frontend)
┌──────────────────────┐        ┌──────────────────────┐
│ npm start            │        │ npm start            │
│ 🚀 Puerto 5000       │        │ 🌐 http://localhost  │
│ ✅ SQLite conectado  │        │ 📖 React corriendo   │
│                      │        │                      │
│ DEJAR ABIERTO ✅     │        │ DEJAR ABIERTO ✅     │
└──────────────────────┘        └──────────────────────┘
         ↓                              ↓
    BASE DE DATOS              APLICACIÓN WEB
              ↓↑
        ↔ COMUNICACIÓN ↔
              ↓
    http://localhost:3000
     (Tu navegador)
```

---

## ✅ CHECKLIST FINAL

Marca cuando completes cada paso:

- [ ] Ventana 1 abierta (PowerShell)
- [ ] Ventana 2 abierta (PowerShell)
- [ ] Backend: `npm install` completado
- [ ] Frontend: `npm install` completado
- [ ] Backend: `npm start` corriendo (VENTANA 1)
- [ ] Frontend: `npm start` corriendo (VENTANA 2)
- [ ] Página abierta en navegador
- [ ] Registro funcionando
- [ ] Login como admin funcionando
- [ ] Panel Admin accesible

**Cuando todo esté marcado ✅, ¡tu aplicación está COMPLETA y FUNCIONANDO!**
