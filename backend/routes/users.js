const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

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

  db.run('UPDATE users SET role = ? WHERE id = ?', [role, id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    res.status(200).json({
      success: true,
      message: 'Rol actualizado'
    });
  });
});

// PUT - Desactivar usuario (solo admin)
router.put('/:id/deactivate', protect, authorize('admin'), (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

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

module.exports = router;
