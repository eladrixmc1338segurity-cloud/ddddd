# 🖥️ Guía: Cómo prender la web en tu PC (Windows + Visual Studio Code)

Sigue estos pasos **exactos** para encender la web en tu ordenador. Necesitas dos cosas abiertas a la vez: el **backend** (servidor) y el **frontend** (la web que ves).

---

## Paso 1 — Instalar Node.js (solo la primera vez)

1. Ve a <https://nodejs.org/> y descarga la versión **LTS** (el botón grande verde).
2. Instálalo dándole "Next" a todo (no cambies nada).
3. **Reinicia VS Code** después de instalar para que lo reconozca.
4. Para comprobar que quedó bien, abre una terminal en VS Code (`Ctrl + ñ`) y escribe:
   ```
   node -v
   ```
   Si te sale un número como `v20.x.x`, está bien. Si dice "no se reconoce", cierra VS Code completamente y ábrelo otra vez.

---

## Paso 2 — Abrir tu proyecto en VS Code

1. Abre **Visual Studio Code**.
2. Ve a `Archivo` → `Abrir carpeta...` (o `File` → `Open Folder...`).
3. Navega hasta tu escritorio y abre la carpeta **"Pagina web setups"**.
4. Deberías ver en el explorador de la izquierda: `backend/`, `backend/frontend/`, `.gitignore`, `README.md`, etc.

---

## Paso 3 — Crear el archivo `.env` del backend (solo la primera vez)

El backend necesita un archivo de configuración llamado `.env` dentro de la carpeta `backend`. Sin este archivo, **no arranca**.

1. En el explorador de VS Code, haz clic en la flecha de la carpeta **`backend`** para expandirla.
2. Mira si ya existe un archivo llamado `.env` (sin extensión, solo `.env`).
   - **Si ya existe:** ábrelo y comprueba que tiene las líneas de abajo. Si le falta algo, cópialo.
   - **Si NO existe:** haz clic derecho sobre la carpeta `backend` → `Nuevo archivo` → escribe exactamente `.env` → pulsa Enter.
3. Pega esto dentro del archivo `.env` y guarda con `Ctrl + S`:

```
PORT=5000
NODE_ENV=development
DATABASE_TYPE=sqlite
SQLITE_PATH=./database.db
JWT_SECRET=clave_secreta_local_setups_2026
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@setups.com
ADMIN_PASSWORD=Admin12345!
FRONTEND_URL=http://localhost:3000
```

> ⚠️ **Importante:** El admin solo se crea automáticamente si ese correo **no existía** antes como usuario normal. Si quieres usar otro correo de admin, cámbialo aquí (siempre que NO esté ya registrado en la web).

---

## Paso 4 — Encender el BACKEND (Terminal 1)

1. En VS Code, abre una terminal: pulsa **`Ctrl + ñ`** (o ve a `Terminal` → `New Terminal` en el menú de arriba).
2. En esa terminal, escribe estos dos comandos **uno por uno** (pulsa Enter después de cada uno):

```
cd backend
```
```
npm install
```

Espera a que termine (puede tardar 1-2 minutos la primera vez, descarga archivos de internet). Cuando veas que vuelve a aparecer `PS C:\...>` ya acabó.

3. Ahora escribe:
```
npm start
```

4. **¿Qué deberías ver?** Algo parecido a esto:
```
✅ SQLite conectado correctamente
🚀 Servidor ejecutándose en puerto 5000
✅ Usuario administrador por defecto creado: admin@setups.com
```

Si ves eso, **el backend está encendido**. **NO cierres esta terminal.** Déjala abierta y abierta todo el rato que quieras usar la web.

### ❌ Si te da error:
- **"npm no se reconoce"** → No tienes Node.js instalado (vuelve al Paso 1) o no reiniciaste VS Code después de instalarlo.
- **"Cannot find module..."** → El `npm install` no terminó bien. Ejecuta `npm install` otra vez y espera a que acabe.
- **"EADDRINUSE: port 5000"** → Ya tienes algo usando el puerto 5000. Cierra otras terminales o apps, o cambia `PORT=5001` en el `.env`.
- **No aparece "Usuario administrador creado"** → Ese correo ya existe como usuario normal en la base de datos. Cambia `ADMIN_EMAIL` en el `.env` por otro correo (ej: `admin2@setups.com`) y reinicia con `Ctrl + C` luego `npm start`.

---

## Paso 5 — Encender el FRONTEND (Terminal 2)

1. **Sin cerrar la terminal del backend**, abre **otra terminal nueva**: haz clic en el botón **`+`** que aparece arriba a la derecha del panel de terminal en VS Code (al lado del nombre "powershell"). O pulsa **`Ctrl + Shift + ñ`**.
2. En esa nueva terminal, escribe:

```
cd backend/frontend
```
```
npm install
```

Espera a que termine (1-2 minutos la primera vez).

3. Luego escribe:
```
npm start
```

4. **¿Qué deberías ver?** Algo como:
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
```

Se abrirá **automáticamente** tu navegador en `http://localhost:3000` con la web funcionando.

### ❌ Si te da error:
- **"npm no se reconoce"** → Mismo que arriba, instala Node.js.
- **"EADDRINUSE: port 3000"** → Ya tienes algo en el puerto 3000. Cierra pestañas del navegador con localhost:3000, o cierra otras terminales.
- **La página se queda en blanco** → Abre la consola del navegador (`F12` → pestaña Console) y mira si hay un error en rojo. Normalmente es que el backend no está encendido (vuelve al Paso 4).

---

## Paso 6 — Usar la web

1. Abre tu navegador en **http://localhost:3000** (normalmente se abre solo).
2. Haz clic en **"Iniciar Sesión"**.
3. Entra con:
   - **Email:** `admin@setups.com`
   - **Contraseña:** `Admin12345!`
4. Arriba a la derecha verás el botón **"Panel Admin"** → haz clic para gestionar usuarios, mapas y monetización.

Para más detalles de cómo usar el panel, mira **[GUIA_USO.md](./GUIA_USO.md)**.

---

## Cómo apagar la web

1. En la terminal del **frontend**: pulsa `Ctrl + C` → escribe `S` (o `Y`) y Enter.
2. En la terminal del **backend**: pulsa `Ctrl + C`.
3. Ya puedes cerrar VS Code.

## Cómo volver a encenderla (después de la primera vez)

Solo necesitas repetir los comandos de arranque (ya no hace falta `npm install`):

**Terminal 1:**
```
cd backend
npm start
```

**Terminal 2:**
```
cd backend/frontend
npm start
```

Y abre `http://localhost:3000` en tu navegador.
