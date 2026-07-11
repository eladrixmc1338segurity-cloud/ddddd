const express = require('express');
const router = express.Router();
const { protect, authorizeAdminAccess } = require('../middleware/auth');

// GET - Obtener todos los mapas
router.get('/', (req, res) => {
  const { category, search } = req.query;
  const db = req.app.locals.db;
  
  let query = 'SELECT maps.*, users.username AS uploaderName FROM maps LEFT JOIN users ON maps.uploader = users.id WHERE maps.status = "active"';
  let params = [];

  if (category) {
    query += ' AND maps.category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (maps.name LIKE ? OR maps.description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY maps.createdAt DESC';

  db.all(query, params, (err, maps) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    res.status(200).json({
      success: true,
      count: maps ? maps.length : 0,
      maps: maps || []
    });
  });
});

// GET - Obtener mapa por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  db.get('SELECT maps.*, users.username AS uploaderName FROM maps LEFT JOIN users ON maps.uploader = users.id WHERE maps.id = ?', [id], (err, map) => {
    if (!map) {
      return res.status(404).json({
        success: false,
        message: 'Mapa no encontrado'
      });
    }

    // Incrementar descargas
    db.run('UPDATE maps SET downloadCount = downloadCount + 1 WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      map
    });
  });
});

// POST - Crear mapa (solo admin con clave verificada)
router.post('/', protect, authorizeAdminAccess, (req, res) => {
  const { name, description, category, fileUrl, fileName, thumbnail, tags, images } = req.body;
  const db = req.app.locals.db;
  const uploader = req.user.id;

  const imageList = Array.isArray(images) ? images.filter((img) => typeof img === 'string' && img.trim()) : [];
  if (imageList.length < 1) {
    return res.status(400).json({ success: false, message: 'Debes incluir al menos una foto para publicar.' });
  }
  if (imageList.length > 15) {
    return res.status(400).json({ success: false, message: 'No puedes incluir más de 15 fotos.' });
  }

  if (!name || !description || !category || !fileUrl) {
    return res.status(400).json({
      success: false,
      message: 'Faltan datos requeridos'
    });
  }

  db.run(
    'INSERT INTO maps (name, description, category, fileUrl, fileName, thumbnail, images, tags, uploader) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, description, category, fileUrl, fileName, thumbnail, JSON.stringify(imageList), tags ? tags.join(',') : '', uploader],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      res.status(201).json({
        success: true,
        message: 'Mapa creado exitosamente',
        map: { id: this.lastID, name, description, category, images: imageList }
      });
    }
  );
});

// PUT - Actualizar mapa (solo admin con clave verificada)
router.put('/:id', protect, authorizeAdminAccess, (req, res) => {
  const { id } = req.params;
  const { name, description, category, fileUrl, fileName, thumbnail, tags, images } = req.body;
  const db = req.app.locals.db;

  const imageList = Array.isArray(images) ? images.filter((img) => typeof img === 'string' && img.trim()) : [];
  if (imageList.length < 1) {
    return res.status(400).json({ success: false, message: 'Debes incluir al menos una foto para publicar.' });
  }
  if (imageList.length > 15) {
    return res.status(400).json({ success: false, message: 'No puedes incluir más de 15 fotos.' });
  }

  db.run(
    'UPDATE maps SET name = ?, description = ?, category = ?, fileUrl = ?, fileName = ?, thumbnail = ?, images = ?, tags = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [name, description, category, fileUrl, fileName, thumbnail, JSON.stringify(imageList), tags ? (Array.isArray(tags) ? tags.join(',') : tags) : '', id],
    function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      res.status(200).json({
        success: true,
        message: 'Mapa actualizado exitosamente'
      });
    }
  );
});

// DELETE - Eliminar mapa (solo admin con clave verificada)
router.delete('/:id', protect, authorizeAdminAccess, (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  db.run('DELETE FROM maps WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    res.status(200).json({
      success: true,
      message: 'Mapa eliminado exitosamente'
    });
  });
});

module.exports = router;
