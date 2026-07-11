const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No está autorizado para acceder a esta ruta'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta');
    
    // Leer rol actual de la BD (no del JWT) para que cambios de rol se apliquen inmediatamente
    const db = req.app.locals.db;
    if (db) {
      const user = await new Promise((resolve, reject) => {
        db.get('SELECT id, role FROM users WHERE id = ?', [decoded.id], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
      if (user) {
        req.user = { id: user.id, role: user.role };
      } else {
        req.user = decoded;
      }
    } else {
      req.user = decoded;
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token no válido',
      error: error.message
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Owner siempre tiene acceso a rutas de admin
    if (req.user.role === 'owner') return next();
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'No tiene permiso para realizar esta acción'
      });
    }
    next();
  };
};

exports.authorizeAdminAccess = (req, res, next) => {
  if (req.user.role === 'owner') return next();
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'No tiene permiso para acceder a esta sección'
    });
  }

  const accessToken = req.headers['x-admin-access-token'];
  if (!accessToken) {
    return res.status(403).json({
      success: false,
      message: 'Debes verificar tu clave secreta para acceder al panel de administración'
    });
  }

  const db = req.app.locals.db;
  db.get(
    'SELECT id FROM admin_access_sessions WHERE userId = ? AND accessToken = ? AND expiresAt > ?',
    [req.user.id, accessToken, new Date().toISOString()],
    (err, sessionRow) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      if (!sessionRow) {
        return res.status(403).json({
          success: false,
          message: 'Debes verificar tu clave secreta para acceder al panel de administración'
        });
      }
      next();
    }
  );
};

exports.authorizeOwner = (req, res, next) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({
      success: false,
      message: 'Solo el Owner puede realizar esta acción'
    });
  }
  next();
};
