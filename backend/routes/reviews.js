const express = require('express');
const router = express.Router();
const { protect, authorizeOwner } = require('../middleware/auth');

const getMapReviewsHandler = (req, res) => {
  const { mapId } = req.params;
  const db = req.app.locals.db;

  db.all(
    `SELECT r.id, r.mapId, r.userId, r.username, r.rating, r.comment, r.isActive, r.createdAt
     FROM reviews r
     WHERE r.mapId = ? AND r.isActive = 1
     ORDER BY r.createdAt DESC`,
    [mapId],
    (err, reviews) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      res.status(200).json({ success: true, reviews: reviews || [] });
    }
  );
};

const createReviewHandler = (req, res) => {
  const { mapId } = req.params;
  const { rating, comment } = req.body;
  const db = req.app.locals.db;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: 'La calificación debe ser entre 1 y 5 estrellas' });
  }
  if (!comment || typeof comment !== 'string' || comment.trim().length < 5) {
    return res.status(400).json({ success: false, message: 'El comentario debe tener al menos 5 caracteres' });
  }

  db.get('SELECT username FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

    db.run(
      'INSERT INTO reviews (mapId, userId, username, rating, comment) VALUES (?, ?, ?, ?, ?)',
      [mapId, req.user.id, user.username, rating, comment.trim()],
      function (insertErr) {
        if (insertErr) {
          return res.status(500).json({ success: false, message: insertErr.message });
        }

        res.status(201).json({ success: true, message: 'Reseña enviada correctamente' });
      }
    );
  });
};

// GET - Obtener reseñas de un mapa
router.get('/map/:mapId', getMapReviewsHandler);
router.get('/:mapId', getMapReviewsHandler);

// POST - Crear reseña (usuarios autenticados)
router.post('/map/:mapId', protect, createReviewHandler);
router.post('/:mapId', protect, createReviewHandler);

// GET - Listar reseñas pendientes/activas (solo owner)
router.get('/', protect, authorizeOwner, (req, res) => {
  const db = req.app.locals.db;

  db.all(
    `SELECT r.id, r.mapId, r.userId, r.username, r.rating, r.comment, r.isActive, r.createdAt,
            m.name AS mapName, m.category
     FROM reviews r
     JOIN maps m ON r.mapId = m.id
     ORDER BY r.createdAt DESC`,
    [],
    (err, reviews) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      res.status(200).json({ success: true, reviews: reviews || [] });
    }
  );
});

// PUT - Activar / desactivar reseña (solo owner)
router.put('/:id', protect, authorizeOwner, (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  const db = req.app.locals.db;

  db.run(
    'UPDATE reviews SET isActive = ? WHERE id = ?',
    [isActive ? 1 : 0, id],
    function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      res.status(200).json({ success: true, message: 'Estado de reseña actualizado' });
    }
  );
});

// DELETE - Eliminar reseña (solo owner)
router.delete('/:id', protect, authorizeOwner, (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  db.run('DELETE FROM reviews WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    res.status(200).json({ success: true, message: 'Reseña eliminada' });
  });
});

module.exports = router;
