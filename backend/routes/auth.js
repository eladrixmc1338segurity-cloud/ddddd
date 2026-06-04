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

  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
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

module.exports = router;
