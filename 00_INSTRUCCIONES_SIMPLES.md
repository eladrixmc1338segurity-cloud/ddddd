# ▶️ COMIENZA AQUÍ - Instrucciones Simples

## 🎯 Lo que vamos a hacer (3 pasos simples)

1. Instalar Backend
2. Instalar Frontend  
3. Ejecutar ambos

---

## PASO 1️⃣ - Abre PowerShell NUEVA

Presiona: `⊞ Windows + R`

Escribe: `powershell`

Presiona: `Enter`

---

## PASO 2️⃣ - Copia y pega ESTO en PowerShell

```powershell
cd "C:\Users\eladr\OneDrive\Desktop\Pagina web setups\backend"
npm install
```

Presiona `Enter` **dos veces** (una para cada línea).

**Espera a que termine (2-3 minutos).**

Verás al final:
```
added X packages
```

---

## PASO 3️⃣ - En la MISMA ventana, ahora ejecuta

```powershell
npm start
```

Presiona `Enter`.

**Verás esto cuando funcione:**
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

**IMPORTANTE:** Deja esta ventana ABIERTA. No la cierres ni presiones Ctrl+C.

---

## PASO 4️⃣ - Abre OTRA PowerShell NUEVA

Presiona: `⊞ Windows + R`

Escribe: `powershell`

Presiona: `Enter`

---

## PASO 5️⃣ - En la NUEVA ventana, copia y pega

```powershell
cd "C:\Users\eladr\OneDrive\Desktop\Pagina web setups\frontend"
npm install
```

Presiona `Enter` **dos veces**.

**Espera (3-5 minutos).**

---

## PASO 6️⃣ - En la MISMA ventana (frontend)

```powershell
npm start
```

Presiona `Enter`.

**Espera unos segundos y...**

Se abrirá tu navegador automáticamente con la página.

---

## 🎉 ¡YA ESTÁ!

Deberías ver:
- Página **azul y moderna**
- Botones **"Registrarse"** y **"Login"**

---

## 🧪 Prueba Rápida

### Registrarse
1. Click en **"Registrarse"**
2. Email: `test@prueba.com`
3. Usuario: `testuser`
4. Contraseña: `Prueba123`
5. Click **"Registrar"**

✅ Debería entrar al dashboard

### Login como Admin
1. Click en **"Login"**
2. Email: `eladrixmc1338.segurity@gmail.com`
3. Contraseña: `ambiarEstoEnProduccion123!`
4. Click **"Entrar"**

✅ Verás el botón **"Panel Admin"** en la esquina superior

---

## 🆘 Si algo no funciona

### "Error en npm install"
- Cierra PowerShell
- Abre PowerShell como Administrador
- Repite el paso

### "Puerto en uso"
- Cierra PowerShell de backend
- Espera 10 segundos
- Abre nueva PowerShell
- Ejecuta nuevamente

### "Página en blanco"
- Cierra PowerShell frontend
- En la ventana del backend verifica que esté verde ✅
- Abre nueva PowerShell y repite "npm start" en frontend

---

## 📞 ¿Necesitas ayuda?

Envíame una captura de pantalla mostrando:
1. Las dos ventanas de PowerShell abiertas
2. Qué error ves (si lo hay)C
3. En qué paso estás

**¡Mándame un mensaje cuando todo esté funcionando!** 🎉
