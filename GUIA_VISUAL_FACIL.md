# 🎯 GUÍA VISUAL - PASO A PASO

## LO QUE NECESITAS HACER EN ESTE ORDEN

---

## 🔵 PRIMER PASO - Abre Terminal 1

### Presiona en tu PC:
```
Windows + R
```

Se abrirá una ventanita, escribe:
```
powershell
```

Presiona **Enter**

---

## 🟡 SEGUNDO PASO - Ve a la carpeta Backend (en Terminal 1)

### COPIA ESTO EXACTAMENTE:

```
cd "C:\Users\eladr\OneDrive\Desktop\Pagina web setups\backend"
```

### PÉGALO EN LA TERMINAL:
- Haz clic derecho en la terminal
- Selecciona "Paste"
- Presiona **Enter**

### Deberías ver esto:
```
PS C:\Users\eladr\OneDrive\Desktop\Pagina web setups\backend>
```

✅ Si ves `backend` en la ruta, **¡PERFECTO!**

---

## 🟢 TERCER PASO - Inicia el Backend (en Terminal 1)

### ESCRIBE:
```
npm start
```

Presiona **Enter**

### ESPERA a ver esto:
```
Servidor ejecutándose en puerto 5000
Ambiente: development
```

### ⚠️ **MUY IMPORTANTE:**
**NO CIERRES esta terminal. Déjala corriendo mientras usas la app.**

---

## 🔵 CUARTO PASO - Abre Terminal 2

### Presiona en tu PC:
```
Windows + R
```

Escribe:
```
powershell
```

Presiona **Enter**

### Ahora tienes 2 terminales abiertas
- Terminal 1: Backend (corriendo)
- Terminal 2: Frontend (nueva, donde estás ahora)

---

## 🟡 QUINTO PASO - Ve a la carpeta Frontend (en Terminal 2)

### COPIA ESTO EXACTAMENTE:

```
cd "C:\Users\eladr\OneDrive\Desktop\Pagina web setups\frontend"
```

### PÉGALO EN LA TERMINAL 2:
- Haz clic derecho
- Selecciona "Paste"
- Presiona **Enter**

### Deberías ver esto:
```
PS C:\Users\eladr\OneDrive\Desktop\Pagina web setups\frontend>
```

✅ Si ves `frontend` en la ruta, **¡PERFECTO!**

---

## 🟢 SEXTO PASO - Inicia el Frontend (en Terminal 2)

### ESCRIBE:
```
npm start
```

Presiona **Enter**

### ESPERA (demora 10-30 segundos)

Verás algo como:
```
Compiling...
webpack compiled...
```

### Luego se abrirá automáticamente tu navegador en:
```
http://localhost:3000
```

✅ **¡ERES LIBRE DE NAVEGAR!**

---

## ✅ RESULTADO FINAL

### Terminal 1 (Backend) - SIEMPRE ABIERTA
```
Servidor ejecutándose en puerto 5000
```

### Terminal 2 (Frontend) - SIEMPRE ABIERTA
```
webpack compiled successfully
```

### Navegador
```
http://localhost:3000
Ves la página de LOGIN
```

---

## 🔑 ACCESO - ELIGE UNA

### OPCIÓN A: Usa Admin (acceso total)
```
Email: eladrixmc1338.segurity@gmail.com
Contraseña: CambiarEstoEnProduccion123!
```

Después:
1. Haz clic en "Panel Admin"
2. ¡Gestiona todo!

### OPCIÓN B: Crea tu propia cuenta
1. Haz clic en "Registrarse"
2. Ingresa email y contraseña
3. ¡Listo!

---

## 🚨 SI ALGO SALE MAL

### ERROR 1: "cd: No se encuentra la ruta"
```
❌ Escribiste mal
✅ Copia exactamente lo que digo, con comillas
```

### ERROR 2: "port 3000 is already in use"
```
❌ Otro programa usa el puerto
✅ Reinicia tu PC o espera 5 minutos
```

### ERROR 3: "npm: command not found"
```
❌ Node.js no está instalado
✅ Instala desde: https://nodejs.org/
```

### ERROR 4: Backend no responde
```
❌ Terminal 1 no está corriendo
✅ Verifica que Terminal 1 diga "Puerto 5000"
```

### ERROR 5: Frontend no carga
```
❌ Espera más tiempo a npm start
✅ Si tarda más de 1 minuto, reinicia
```

---

## 📊 DIAGRAMA VISUAL

```
TU PC
│
├─── Terminal 1 (Backend)
│    ├─ cd backend
│    └─ npm start
│        └─ Corre en: http://localhost:5000
│
├─── Terminal 2 (Frontend)
│    ├─ cd frontend
│    └─ npm start
│        └─ Corre en: http://localhost:3000
│
└─── Navegador
     └─ http://localhost:3000
        ├─ Login
        ├─ Registrarse
        ├─ Dashboard (5 canales)
        └─ Admin Panel (/admin)
```

---

## ⏱️ TIEMPO ESTIMADO

| Paso | Tiempo |
|------|--------|
| Abrir Terminal 1 | 10 seg |
| Ir a Backend | 5 seg |
| npm start (Backend) | 5 seg |
| Abrir Terminal 2 | 10 seg |
| Ir a Frontend | 5 seg |
| npm start (Frontend) | 30 seg |
| **TOTAL** | **1 minuto** |

---

## 💾 ACCESOS RÁPIDOS

```
Backend:    http://localhost:5000
Frontend:   http://localhost:3000
Admin:      http://localhost:3000/admin

Email Admin:      eladrixmc1338.segurity@gmail.com
Password Admin:   CambiarEstoEnProduccion123!
```

---

## ✨ ¿QUÉ VAS A VER?

### Página de Login
```
[Logo de Setups Platform]
[Campo Email]
[Campo Contraseña]
[Botón Iniciar Sesión]
[Link: ¿No tienes cuenta? Regístrate]
```

### Dashboard (después de loguear)
```
[Navbar con tu usuario]
[5 Canales:]
  ⚙️ Configuraciones
  🎮 Setups
  🗺️ Mapas
  📐 Schematics
  📦 Otros
[Grid con mapas descargables]
```

### Panel Admin
```
[Gestión de Mapas]
  - Subir nuevo mapa
  - Ver todos los mapas
  - Editar/Eliminar

[Gestión de Usuarios]
  - Ver todos los usuarios
  - Promover a admin
  - Desactivar usuario
```

---

## 🎯 PRÓXIMAS ACCIONES

1. ✅ Sigue los 6 pasos anterior
2. ✅ Espera a que se abra http://localhost:3000
3. ✅ Registra una cuenta O usa admin
4. ✅ Explora los 5 canales
5. ✅ Si eres admin, ve a /admin

---

## 🆘 SI NECESITAS AYUDA

**Revisa esta checklist:**
- ☑️ ¿Tengo Node.js instalado? (escribe: `node -v` en una terminal)
- ☑️ ¿Tengo 2 terminales abiertas?
- ☑️ ¿Terminal 1 está corriendo el Backend?
- ☑️ ¿Terminal 2 está corriendo el Frontend?
- ☑️ ¿El navegador abrió en http://localhost:3000?

Si respondiste "NO" a alguno, revisa la sección "SI ALGO SALE MAL"

---

## 🎉 ¡LISTO!

Sigue los **6 pasos** y en **1 minuto** tendrás tu plataforma corriendo.

**¡Disfruta!** 🚀

---

*Guía Simple - Setups Platform - Junio 2026*
