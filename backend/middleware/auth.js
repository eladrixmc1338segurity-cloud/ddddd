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

exports.authorizeOwner = (req, res, next) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({
      success: false,
      message: 'Solo el Owner puede realizar esta acción'
    });
  }
  next();
};
