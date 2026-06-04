require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');
const { errorHandler } = require('./middleware/errorHandler');

// Crear aplicación Express
const app = express();

// Configurar SQLite
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error conectando a SQLite:', err.message);
  } else {
    console.log('✅ SQLite conectado correctamente');
    console.log('📁 Base de datos:', dbPath);
  }
});

// Crear tablas si no existen
db.serialize(() => {
  // Tabla de usuarios
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      avatar TEXT,
      isActive BOOLEAN DEFAULT 1,
      lastLogin DATETIME,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (!err) console.log('✅ Tabla usuarios creada');
  });

  // Tabla de mapas
  db.run(`
    CREATE TABLE IF NOT EXISTS maps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      fileUrl TEXT NOT NULL,
      fileName TEXT,
      uploader INTEGER NOT NULL,
      downloadCount INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      thumbnail TEXT,
      tags TEXT,
      version INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (uploader) REFERENCES users(id)
    )
  `, (err) => {
    if (!err) console.log('✅ Tabla mapas creada');
  });

  // Tabla de canales
  db.run(`
    CREATE TABLE IF NOT EXISTS channels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      icon TEXT,
      color TEXT DEFAULT '#0055CC',
      createdBy INTEGER,
      isActive BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (createdBy) REFERENCES users(id)
    )
  `, (err) => {
    if (!err) console.log('✅ Tabla canales creada');
  });

  // Tabla de permisos
  db.run(`
    CREATE TABLE IF NOT EXISTS permissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      canUploadMaps BOOLEAN DEFAULT 0,
      canDeleteMaps BOOLEAN DEFAULT 0,
      canEditUsers BOOLEAN DEFAULT 0,
      canManageChannels BOOLEAN DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `, (err) => {
    if (!err) console.log('✅ Tabla permisos creada');
  });

  // Tabla de monetización (enlaces de donación/compra y banner)
  db.run(`
    CREATE TABLE IF NOT EXISTS monetization (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      paypalUrl TEXT DEFAULT '',
      kofiUrl TEXT DEFAULT '',
      patreonUrl TEXT DEFAULT '',
      discordUrl TEXT DEFAULT '',
      customLinks TEXT DEFAULT '[]',
      bannerEnabled INTEGER DEFAULT 0,
      bannerText TEXT DEFAULT '',
      bannerLink TEXT DEFAULT '',
      bannerImage TEXT DEFAULT '',
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (!err) {
      console.log('✅ Tabla monetización creada');
      db.run('INSERT OR IGNORE INTO monetization (id) VALUES (1)');
    }
  });

  // Crear usuario administrador por defecto si no existe
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    db.get('SELECT id FROM users WHERE email = ?', [adminEmail], async (err, row) => {
      if (!err && !row) {
        const hashed = await bcrypt.hash(adminPassword, 10);
        db.run(
          'INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)',
          [adminEmail, 'admin', hashed, 'admin'],
          (insErr) => {
            if (!insErr) console.log('✅ Usuario administrador por defecto creado:', adminEmail);
          }
        );
      }
    });
  }
});

// Guardar db en app para que otros archivos la usen
app.locals.db = db;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Importar rutas
const authRoutes = require('./routes/auth');
const mapRoutes = require('./routes/maps');
const userRoutes = require('./routes/users');
const statsRoutes = require('./routes/stats');
const monetizationRoutes = require('./routes/monetization');

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/monetization', monetizationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Servidor funcionando correctamente',
    database: 'SQLite'
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📊 Base de datos: SQLite`);
  console.log(`${'='.repeat(50)}\n`);
  console.log('✅ El servidor está LISTO.\n');
});

module.exports = app;
