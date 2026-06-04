exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Error Interno del Servidor';

  // Errores de validación de Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    return res.status(400).json({
      success: false,
      message: message
    });
  }

  // Errores de clave duplicada
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `${field} ya existe`
    });
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
