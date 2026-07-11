require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { errorHandler } = require('./middleware/errorHandler');

// Crear aplicación Express
const app = express();

// Configurar SQLite con ruta persistente y estable
const dbPath = process.env.DB_PATH ? path.resolve(process.env.DB_PATH) : path.join(__dirname, 'database.db');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

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
  db.run('PRAGMA foreign_keys = ON');
  db.run('PRAGMA journal_mode = WAL');
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
      images TEXT DEFAULT '[]',
      tags TEXT,
      version INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (uploader) REFERENCES users(id)
    )
  `, (err) => {
    if (!err) console.log('✅ Tabla mapas creada');
  });

  // Asegurar columna de imágenes si la tabla ya existía sin ella
  db.run(`ALTER TABLE maps ADD COLUMN images TEXT DEFAULT '[]'`, (err) => {
    if (err && !/duplicate column name/i.test(err.message)) {
      console.error('❌ Error añadiendo columna images a maps:', err.message);
    }
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

  // Tabla de claves secretas de administrador
  db.run(`
    CREATE TABLE IF NOT EXISTS admin_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL UNIQUE,
      keyHash TEXT NOT NULL,
      isRevoked BOOLEAN DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `, (err) => {
    if (!err) console.log('✅ Tabla claves de admin creada');
  });

  // Tabla de sesiones de acceso de administrador
  db.run(`
    CREATE TABLE IF NOT EXISTS admin_access_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL UNIQUE,
      accessToken TEXT NOT NULL,
      expiresAt DATETIME NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `, (err) => {
    if (!err) console.log('✅ Tabla sesiones de acceso admin creada');
  });

  // Migrar tabla de sesiones de acceso si existe sin accessToken
  db.run(`ALTER TABLE admin_access_sessions ADD COLUMN accessToken TEXT DEFAULT ''`, (err) => {
    if (err && !/duplicate column name/i.test(err.message)) {
      console.error('❌ Error añadiendo columna accessToken en admin_access_sessions:', err.message);
    }
  });

  // Tabla de log de accesos al panel admin
  db.run(`
    CREATE TABLE IF NOT EXISTS access_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      ip TEXT,
      success BOOLEAN NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `, (err) => {
    if (!err) console.log('✅ Tabla log de accesos creada');
  });

  // Tabla de reseñas
  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mapId INTEGER NOT NULL,
      userId INTEGER NOT NULL,
      username TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      isActive BOOLEAN DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (mapId) REFERENCES maps(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `, (err) => {
    if (!err) console.log('✅ Tabla reseñas creada');
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

  // Crear/actualizar Owner (administrador principal)
  const adminEmail = process.env.ADMIN_EMAIL || 'eladrixmc1338.segurity@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin12345!';
  if (adminEmail) {
    db.get('SELECT id, role, password FROM users WHERE email = ?', [adminEmail], async (err, row) => {
      if (err) {
        console.error('❌ Error buscando al Owner:', err.message);
        return;
      }

      if (!row) {
        const hashed = await bcrypt.hash(adminPassword, 10);
        db.run(
          'INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)',
          [adminEmail, 'admin', hashed, 'owner'],
          (insErr) => {
            if (!insErr) console.log('✅ Owner (administrador principal) creado:', adminEmail);
            if (insErr) console.error('❌ Error creando al Owner:', insErr.message);
          }
        );
        return;
      }

      if (row.role !== 'owner') {
        db.run('UPDATE users SET role = ? WHERE id = ?', ['owner', row.id], (upErr) => {
          if (!upErr) console.log('✅ Usuario ascendido a Owner:', adminEmail);
          if (upErr) console.error('❌ Error ascendiendo al Owner:', upErr.message);
        });
      }

      const passwordMatches = await bcrypt.compare(adminPassword, row.password || '');
      if (!passwordMatches) {
        const hashed = await bcrypt.hash(adminPassword, 10);
        db.run('UPDATE users SET password = ? WHERE id = ?', [hashed, row.id], (upErr) => {
          if (!upErr) {
            console.log('✅ Contraseña del Owner sincronizada correctamente');
          } else {
            console.error('❌ Error actualizando la contraseña del Owner:', upErr.message);
          }
        });
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
const adminKeysRoutes = require('./routes/adminKeys');
const reviewRoutes = require('./routes/reviews');

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/monetization', monetizationRoutes);
app.use('/api/admin-keys', adminKeysRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Servidor funcionando correctamente',
    database: 'SQLite'
  });
});

// Serve frontend static files when build exists (useful for single deploy)
const frontendBuildPath = path.join(__dirname, 'frontend', 'build');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  // Serve index.html for non-API routes
  app.get('/*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
} else {
  // 404 for non-api routes when no frontend is available
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Ruta no encontrada'
    });
  });
}

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
