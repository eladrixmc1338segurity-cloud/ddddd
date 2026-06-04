# ⚡ Setups Platform

Plataforma web para compartir y gestionar **setups, configuraciones, plantillas/schematics y mapas de Minecraft**, con autenticación, panel de administrador y monetización (enlaces de donación + banner).

## 🧩 Tecnologías

- **Frontend:** React 18 + React Router + Axios
- **Backend:** Node.js + Express
- **Base de datos:** SQLite (archivo `backend/database.db`, no requiere instalar nada)
- **Auth:** JWT + bcrypt

## 📚 Guías (solo 4, para no perderte)

1. **[GUIA_PC.md](./GUIA_PC.md)** — Cómo ejecutarla/hostearla en tu PC (local).
2. **[GUIA_WEB.md](./GUIA_WEB.md)** — Cómo subirla a una web (hosting online).
3. **[GUIA_USO.md](./GUIA_USO.md)** — Cómo usar la web y el panel de administrador.
4. **README.md** — Este archivo (resumen general).

## 🚀 Inicio rápido (PC)

Abre **dos** terminales:

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start
```

```bash
# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

Luego abre <http://localhost:3000>. Detalles completos en **[GUIA_PC.md](./GUIA_PC.md)**.

## 📁 Estructura

```
├── backend/        # API REST (Express + SQLite)
│   ├── routes/     # auth, maps, users, stats, monetization
│   ├── middleware/ # protección JWT y roles
│   └── server.js   # arranque + creación de tablas
├── frontend/       # Aplicación React
│   └── src/
│       ├── pages/      # Landing, Dashboard, AdminPanel, Profile, Login, Register
│       ├── components/ # Navbar
│       └── services/   # api.js (llamadas al backend)
├── README.md
├── GUIA_PC.md
├── GUIA_WEB.md
└── GUIA_USO.md
```

## 🎯 Canales

⚙️ Configuraciones · 🎮 Setups · 🗺️ Mapas · 📐 Schematics · 📦 Otros

## 📝 Licencia

MIT — libre para usar y modificar.
