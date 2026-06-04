const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const PERMISSION_FIELDS = ['canUploadMaps', 'canDeleteMaps', 'canEditUsers', 'canManageChannels'];

// GET - Obtener todos los usuarios (solo admin)
router.get('/', protect, authorize('admin'), (req, res) => {
  const db = req.app.locals.db;

  db.all('SELECT id, email, username, role, isActive, lastLogin, createdAt FROM users', [], (err, users) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    res.status(200).json({
      success: true,
      count: users ? users.length : 0,
      users: users || []
    });
  });
});

// PUT - Cambiar rol de usuario (solo admin)
router.put('/:id/role', protect, authorize('admin'), (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const db = req.app.locals.db;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({
      success: false,
      message: 'Rol no válido'
    });
  }

  // Evitar que un admin se quite a sí mismo el rol y se quede sin acceso
  if (Number(id) === Number(req.user.id) && role !== req.user.role) {
    return res.status(400).json({
      success: false,
      message: 'No puedes cambiarte el rol a ti mismo'
    });
  }

  // Proteger al Owner: solo el owner puede modificar a otro owner
  db.get('SELECT role FROM users WHERE id = ?', [id], (lookupErr, target) => {
    if (lookupErr) return res.status(500).json({ success: false, message: lookupErr.message });
    if (!target) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    if (target.role === 'owner' && req.user.role !== 'owner') {
      return res.status(403).json({ success: false, message: 'No puedes modificar al Owner' });
    }

    db.run('UPDATE users SET role = ? WHERE id = ?', [role, id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

      res.status(200).json({
        success: true,
        message: role === 'admin' ? 'Usuario promovido a administrador' : 'Administrador degradado a usuario'
      });
    });
  });
});

// PUT - Desactivar usuario (solo admin)
router.put('/:id/deactivate', protect, authorize('admin'), (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  if (Number(id) === Number(req.user.id)) {
    return res.status(400).json({
      success: false,
      message: 'No puedes desactivar tu propia cuenta'
    });
  }

  // Proteger al Owner
  db.get('SELECT role FROM users WHERE id = ?', [id], (lookupErr, target) => {
    if (lookupErr) return res.status(500).json({ success: false, message: lookupErr.message });
    if (target && target.role === 'owner' && req.user.role !== 'owner') {
      return res.status(403).json({ success: false, message: 'No puedes desactivar al Owner' });
    }

    db.run('UPDATE users SET isActive = 0 WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      res.status(200).json({
        success: true,
        message: 'Usuario desactivado'
      });
    });
  });
});

// PUT - Reactivar usuario (solo admin)
router.put('/:id/activate', protect, authorize('admin'), (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  db.run('UPDATE users SET isActive = 1 WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    res.status(200).json({
      success: true,
      message: 'Usuario activado'
    });
  });
});

// GET - Obtener permisos de un usuario (solo admin)
router.get('/:id/permissions', protect, authorize('admin'), (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  db.get('SELECT * FROM permissions WHERE userId = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    const permissions = {};
    PERMISSION_FIELDS.forEach(field => {
      permissions[field] = row ? !!row[field] : false;
    });

    res.status(200).json({ success: true, permissions });
  });
});

// PUT - Actualizar permisos de un usuario (solo admin)
router.put('/:id/permissions', protect, authorize('admin'), (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;
  const db = req.app.locals.db;

  if (!permissions || typeof permissions !== 'object') {
    return res.status(400).json({ success: false, message: 'Permisos no válidos' });
  }

  const values = PERMISSION_FIELDS.map(field => (permissions[field] ? 1 : 0));

  db.get('SELECT id FROM permissions WHERE userId = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    const done = (uErr) => {
      if (uErr) {
        return res.status(500).json({ success: false, message: uErr.message });
      }
      res.status(200).json({ success: true, message: 'Permisos actualizados' });
    };

    if (row) {
      db.run(
        `UPDATE permissions SET ${PERMISSION_FIELDS.map(f => `${f} = ?`).join(', ')} WHERE userId = ?`,
        [...values, id],
        done
      );
    } else {
      db.run(
        `INSERT INTO permissions (userId, ${PERMISSION_FIELDS.join(', ')}) VALUES (?, ${PERMISSION_FIELDS.map(() => '?').join(', ')})`,
        [id, ...values],
        done
      );
    }
  });
});

module.exports = router;
