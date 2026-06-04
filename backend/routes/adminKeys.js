const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { protect, authorize, authorizeOwner } = require('../middleware/auth');

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

// POST - Verificar clave secreta para acceder al panel admin
router.post('/verify', protect, authorize('admin'), (req, res) => {
  const { key } = req.body;
  const db = req.app.locals.db;
  const userId = req.user.id;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (!key) {
    return res.status(400).json({ success: false, message: 'Introduce tu clave secreta' });
  }

  // Comprobar bloqueo temporal
  const lockoutCutoff = new Date(Date.now() - LOCKOUT_MINUTES * 60 * 1000).toISOString();
  db.all(
    'SELECT id FROM access_log WHERE userId = ? AND success = 0 AND createdAt > ?',
    [userId, lockoutCutoff],
    (err, rows) => {
      if (err) return res.status(500).json({ success: false, message: err.message });

      if (rows && rows.length >= MAX_FAILED_ATTEMPTS) {
        return res.status(429).json({
          success: false,
          message: `Demasiados intentos fallidos. Espera ${LOCKOUT_MINUTES} minutos.`
        });
      }

      // Buscar clave del usuario
      db.get('SELECT * FROM admin_keys WHERE userId = ?', [userId], async (err, row) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        if (!row) {
          return res.status(403).json({
            success: false,
            message: 'No tienes una clave secreta asignada. Contacta con el Owner.'
          });
        }

        const valid = await bcrypt.compare(key, row.keyHash);

        // Registrar intento
        db.run(
          'INSERT INTO access_log (userId, ip, success) VALUES (?, ?, ?)',
          [userId, ip, valid ? 1 : 0]
        );

        if (!valid) {
          return res.status(401).json({ success: false, message: 'Clave secreta incorrecta' });
        }

        res.status(200).json({ success: true, message: 'Acceso concedido' });
      });
    }
  );
});

// GET - Listar admins con estado de clave (solo owner)
router.get('/', protect, authorizeOwner, (req, res) => {
  const db = req.app.locals.db;

  db.all(
    `SELECT u.id, u.email, u.username, u.role, u.isActive,
            ak.id as keyId, ak.createdAt as keyCreatedAt, ak.updatedAt as keyUpdatedAt
     FROM users u
     LEFT JOIN admin_keys ak ON u.id = ak.userId
     WHERE u.role IN ('admin', 'owner')
     ORDER BY u.role DESC, u.username ASC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.status(200).json({ success: true, admins: rows || [] });
    }
  );
});

// GET - Log de accesos (solo owner)
router.get('/log', protect, authorizeOwner, (req, res) => {
  const db = req.app.locals.db;

  db.all(
    `SELECT al.id, al.userId, u.username, u.email, al.ip, al.success, al.createdAt
     FROM access_log al
     JOIN users u ON al.userId = u.id
     ORDER BY al.createdAt DESC
     LIMIT 100`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.status(200).json({ success: true, log: rows || [] });
    }
  );
});

// POST - Crear/asignar clave secreta a un admin (solo owner)
router.post('/assign', protect, authorizeOwner, async (req, res) => {
  const { userId } = req.body;
  const db = req.app.locals.db;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'userId requerido' });
  }

  // Verificar que el usuario es admin
  db.get('SELECT id, role, username FROM users WHERE id = ?', [userId], async (err, user) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    if (user.role !== 'admin') {
      return res.status(400).json({ success: false, message: 'Solo se pueden asignar claves a administradores' });
    }

    // Generar clave aleatoria segura
    const plainKey = crypto.randomBytes(16).toString('hex');
    const keyHash = await bcrypt.hash(plainKey, 10);

    // Eliminar clave anterior si existe (UNIQUE constraint en userId)
    db.run('DELETE FROM admin_keys WHERE userId = ?', [userId], (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });

      // Insertar nueva clave
      db.run(
        'INSERT INTO admin_keys (userId, keyHash) VALUES (?, ?)',
        [userId, keyHash],
        (err) => {
          if (err) return res.status(500).json({ success: false, message: err.message });

          // Devolver la clave en texto plano SOLO esta vez
          res.status(201).json({
            success: true,
            message: `Clave creada para ${user.username}. Guárdala, no se mostrará de nuevo.`,
            key: plainKey,
            username: user.username
          });
        }
      );
    });
  });
});

// PUT - Regenerar clave secreta (solo owner)
router.put('/regenerate/:userId', protect, authorizeOwner, async (req, res) => {
  const { userId } = req.params;
  const db = req.app.locals.db;

  db.get('SELECT id, username FROM users WHERE id = ? AND role = ?', [userId, 'admin'], async (err, user) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!user) return res.status(404).json({ success: false, message: 'Admin no encontrado' });

    // Eliminar clave anterior (UNIQUE constraint en userId)
    db.run('DELETE FROM admin_keys WHERE userId = ?', [userId]);

    // Generar nueva clave
    const plainKey = crypto.randomBytes(16).toString('hex');
    const keyHash = await bcrypt.hash(plainKey, 10);

    db.run(
      'INSERT INTO admin_keys (userId, keyHash) VALUES (?, ?)',
      [userId, keyHash],
      (err) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        res.status(200).json({
          success: true,
          message: `Nueva clave generada para ${user.username}. Guárdala, no se mostrará de nuevo.`,
          key: plainKey,
          username: user.username
        });
      }
    );
  });
});

// DELETE - Revocar clave de un admin (solo owner)
router.delete('/revoke/:userId', protect, authorizeOwner, (req, res) => {
  const { userId } = req.params;
  const db = req.app.locals.db;

  db.run(
    'DELETE FROM admin_keys WHERE userId = ?',
    [userId],
    function(err) {
      if (err) return res.status(500).json({ success: false, message: err.message });

      res.status(200).json({
        success: true,
        message: 'Clave revocada. El administrador ya no podrá acceder al panel.'
      });
    }
  );
});

module.exports = router;
