const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'tu_clave_secreta', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// POST - Registrarse
router.post('/register', (req, res) => {
  const { email, username, password, passwordConfirm } = req.body;
  const db = req.app.locals.db;

  // Validaciones
  if (!email || !username || !password || !passwordConfirm) {
    return res.status(400).json({
      success: false,
      message: 'Por favor proporcione todos los datos requeridos'
    });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({
      success: false,
      message: 'Las contraseñas no coinciden'
    });
  }

  // Verificar si existe
  db.get('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], async (err, row) => {
    if (row) {
      return res.status(400).json({
        success: false,
        message: 'Email o usuario ya en uso'
      });
    }

    // Hash contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    db.run(
      'INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)',
      [email, username, hashedPassword, 'user'],
      function(err) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: error.message
          });
        }

        const token = generateToken(this.lastID, 'user');

        res.status(201).json({
          success: true,
          token,
          user: {
            id: this.lastID,
            email,
            username,
            role: 'user'
          }
        });
      }
    );
  });
});

// POST - Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = req.app.locals.db;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Por favor proporcione email y contraseña'
    });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Email o contraseña no válidos'
      });
    }

    // Actualizar lastLogin
    db.run('UPDATE users SET lastLogin = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

    const token = generateToken(user.id, user.role);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  });
});

// GET - Obtener perfil
router.get('/profile', protect, (req, res) => {
  const db = req.app.locals.db;
  const userId = req.user.id;

  db.get('SELECT id, email, username, role, avatar, isActive, lastLogin, createdAt FROM users WHERE id = ?', [userId], (err, user) => {
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  });
});

// PUT - Actualizar perfil del usuario autenticado
router.put('/profile', protect, (req, res) => {
  const db = req.app.locals.db;
  const userId = req.user.id;
  const { username, avatar, currentPassword, newPassword } = req.body;

  db.get('SELECT * FROM users WHERE id = ?', [userId], async (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const updates = [];
    const params = [];

    if (typeof username === 'string' && username.trim().length >= 3) {
      updates.push('username = ?');
      params.push(username.trim());
    }

    if (typeof avatar === 'string') {
      updates.push('avatar = ?');
      params.push(avatar);
    }

    // Cambio de contraseña (requiere contraseña actual)
    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'La nueva contraseña debe tener al menos 6 caracteres'
        });
      }

      const passwordOk = await bcrypt.compare(currentPassword || '', user.password);
      if (!passwordOk) {
        return res.status(401).json({
          success: false,
          message: 'La contraseña actual no es correcta'
        });
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      updates.push('password = ?');
      params.push(hashed);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No hay cambios para guardar'
      });
    }

    updates.push('updatedAt = CURRENT_TIMESTAMP');
    params.push(userId);

    db.run(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params, function (updErr) {
      if (updErr) {
        if (updErr.message && updErr.message.includes('UNIQUE')) {
          return res.status(400).json({
            success: false,
            message: 'Ese nombre de usuario ya está en uso'
          });
        }
        return res.status(500).json({ success: false, message: updErr.message });
      }

      db.get('SELECT id, email, username, role, avatar, isActive FROM users WHERE id = ?', [userId], (selErr, updatedUser) => {
        if (selErr) {
          return res.status(500).json({ success: false, message: selErr.message });
        }

        res.status(200).json({
          success: true,
          message: 'Perfil actualizado correctamente',
          user: updatedUser
        });
      });
    });
  });
});

module.exports = router;
