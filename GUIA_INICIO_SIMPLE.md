# 🚀 GUÍA DEFINITIVA - CÓMO PRENDER LA PLATAFORMA

## ⚠️ IMPORTANTE: LEE ESTO PRIMERO

Necesitas **DOS TERMINALES DIFERENTES** abiertas al mismo tiempo. No cierres una mientras corre la otra.

---

## 📋 PASO A PASO (SUPER SIMPLE)

### PASO 1️⃣: Abre la PRIMERA Terminal

**Presiona**: `Windows + R` (o `cmd` desde inicio)

Escribe y presiona Enter:
```
powershell
```

Deberías ver algo como:
```
PS C:\Users\tuusuario>
```

---

### PASO 2️⃣: En la PRIMERA Terminal, ve a la carpeta Backend

**Copia esto y pégalo en la terminal:**

```powershell
cd "C:\Users\eladr\OneDrive\Desktop\Pagina web setups\backend"
```

Presiona **Enter**

Deberías ver:
```
PS C:\Users\eladr\OneDrive\Desktop\Pagina web setups\backend>
```

✅ Si ves `backend` en el camino, ¡estás bien!

---

### PASO 3️⃣: En la PRIMERA Terminal, inicia el BACKEND

**Copia esto:**

```powershell
npm start
```

Presiona **Enter**

**ESPERA** a que aparezca algo como:
```
Servidor ejecutándose en puerto 5000
Ambiente: development
```

⚠️ **NO CIERRES esta terminal. Déjala corriendo.**

---

### PASO 4️⃣: Abre una SEGUNDA Terminal

**Presiona**: `Windows + R` (o `cmd` desde inicio)

Escribe:
```
powershell
```

Presiona **Enter**

Ahora tienes **DOS terminales** abiertas.

---

### PASO 5️⃣: En la SEGUNDA Terminal, ve a la carpeta Frontend

**Copia esto y pégalo:**

```powershell
cd "C:\Users\eladr\OneDrive\Desktop\Pagina web setups\frontend"
```

Presiona **Enter**

Deberías ver:
```
PS C:\Users\eladr\OneDrive\Desktop\Pagina web setups\frontend>
```

✅ Si ves `frontend` en el camino, ¡estás bien!

---

### PASO 6️⃣: En la SEGUNDA Terminal, inicia el FRONTEND

**Copia esto:**

```powershell
npm start
```

Presiona **Enter**

**ESPERA** a que se abra automáticamente una ventana del navegador en:
```
http://localhost:3000
```

Si NO se abre, **abre tú mismo el navegador** y ve a: `http://localhost:3000`

---

## ✅ ¡LISTO!

Deberías tener:

### Terminal 1 (BACKEND)
```
Servidor ejecutándose en puerto 5000
Ambiente: development
```
✅ **DÉJALA ABIERTA Y CORRIENDO**

### Terminal 2 (FRONTEND)
```
Está compilando React...
webpack compiled
```
✅ **TAMBIÉN DÉJALA ABIERTA**

### Navegador
```
http://localhost:3000
Verás la página de LOGIN
```
✅ **¡ERES LIBRE DE NAVEGAR!**

---

## 🔑 ACCESO - ELIGE UNA OPCIÓN

### Opción A: Usa la cuenta ADMIN (acceso completo)
```
Email:     eladrixmc1338.segurity@gmail.com
Contraseña: CambiarEstoEnProduccion123!
```

Después de loguear:
- Haz clic en "Panel Admin" en la esquina superior derecha
- O ve directamente a: `http://localhost:3000/admin`

### Opción B: Crea tu propia cuenta (usuario normal)
1. Haz clic en "Registrarse"
2. Ingresa cualquier email y contraseña
3. ¡Acceso automático!

---

## 🎮 ¿QUÉ PUEDES HACER?

### Con cualquier cuenta:
- ✅ Ver 5 canales (Configuraciones, Setups, Mapas, Schematics, Otros)
- ✅ Descargar mapas
- ✅ Ver tu perfil

### Solo con ADMIN:
- ✅ Ir a http://localhost:3000/admin
- ✅ Subir nuevos mapas
- ✅ Editar mapas
- ✅ Eliminar mapas
- ✅ Ver todos los usuarios
- ✅ Promover usuarios a admin
- ✅ Desactivar usuarios

---

## 🆘 PROBLEMAS COMUNES

### ❌ "Error: cd: No se encuentra..."
**Problema**: Escribiste mal la ruta

**Solución**: Copia exactamente lo que digo. Si tienes espacios raros en el camino, enciérralo en comillas: `"C:\..."`

### ❌ "port 3000 is already in use"
**Problema**: El puerto 3000 ya está ocupado

**Solución**: 
- Cierra otras ventanas de navegador o servidores
- O cambia el puerto en `frontend/.env`

### ❌ "MongoDB connection error"
**Problema**: MongoDB no está instalado

**Solución**: 
- Instala MongoDB desde: https://www.mongodb.com/try/download/community
- O el backend usará SQLite automáticamente

### ❌ Frontend se abre pero no funciona nada
**Problema**: Backend no está corriendo

**Solución**: Verifica que la PRIMERA terminal (backend) esté abierta y muestre:
```
Servidor ejecutándose en puerto 5000
```

### ❌ La terminal dice "npm: command not found"
**Problema**: Node.js no está instalado

**Solución**: Instala Node.js desde: https://nodejs.org/
- Descarga la versión LTS
- Reinicia la terminal después de instalar

---

## 📌 RESUMEN EN 6 PASOS

| Paso | Acción | Resultado |
|------|--------|-----------|
| 1 | Abre Terminal 1 | Ves `PS C:\...>` |
| 2 | `cd "C:\Users\eladr\OneDrive\Desktop\Pagina web setups\backend"` | Estás en backend |
| 3 | `npm start` | Ves `Puerto 5000` - **DEJAR ABIERTA** |
| 4 | Abre Terminal 2 | Ves `PS C:\...>` |
| 5 | `cd "C:\Users\eladr\OneDrive\Desktop\Pagina web setups\frontend"` | Estás en frontend |
| 6 | `npm start` | Se abre `http://localhost:3000` - **LISTO!** |

---

## 🔐 CREDENCIALES

| Dato | Valor |
|------|-------|
| **Email Admin** | eladrixmc1338.segurity@gmail.com |
| **Contraseña Admin** | CambiarEstoEnProduccion123! |
| **URL Admin** | http://localhost:3000/admin |
| **URL Principal** | http://localhost:3000 |
| **Backend** | http://localhost:5000 |

---

## ✨ CANALES QUE VERÁS

1. **⚙️ Configuraciones** - Configuraciones del servidor
2. **🎮 Setups** - Configuraciones de gameplay
3. **🗺️ Mapas** - Mapas para descargar
4. **📐 Schematics** - Esquemas y plantillas
5. **📦 Otros** - Recursos adicionales

---

## 🛑 PARA DETENER TODO

### Para cerrar el BACKEND:
- En la Terminal 1, presiona: `Ctrl + C`
- Confirma: `Y` (yes)

### Para cerrar el FRONTEND:
- En la Terminal 2, presiona: `Ctrl + C`
- Confirma: `Y` (yes)

---

## 💡 TIPS

- **No cierres las terminales** mientras estés usando la app
- **Si cambias código**, las terminales se recargarán automáticamente
- **Usa Ctrl + C** para detener, no cierres la ventana
- **Si algo falla**, reinicia las terminales

---

## ✅ CHECKLIST FINAL

Antes de empezar:
- ☑️ Tengo 2 terminales listas
- ☑️ Copié correctamente los caminos
- ☑️ Sé que debo dejar las terminales abiertas
- ☑️ Tengo Node.js instalado
- ☑️ Tengo un navegador moderno (Chrome, Firefox, Edge)

---

## 🎉 ¡LISTO PARA EMPEZAR!

Sigue los 6 pasos anterior y en 2 minutos tendrás tu plataforma **Setups Platform** corriendo perfectamente.

**¿Necesitas ayuda?** Revisa la sección "PROBLEMAS COMUNES" anterior.

---

*Setups Platform - Junio 2026*  
*Guía Definitiva de Inicio*
