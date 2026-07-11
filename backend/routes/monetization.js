const express = require('express');
const router = express.Router();
const { protect, authorizeAdminAccess } = require('../middleware/auth');

const FIELDS = [
  'paypalUrl',
  'kofiUrl',
  'patreonUrl',
  'discordUrl',
  'customLinks',
  'bannerEnabled',
  'bannerText',
  'bannerLink',
  'bannerImage'
];

const formatConfig = (row) => {
  if (!row) {
    return {
      paypalUrl: '',
      kofiUrl: '',
      patreonUrl: '',
      discordUrl: '',
      customLinks: [],
      bannerEnabled: false,
      bannerText: '',
      bannerLink: '',
      bannerImage: ''
    };
  }

  let customLinks = [];
  try {
    customLinks = row.customLinks ? JSON.parse(row.customLinks) : [];
  } catch (e) {
    customLinks = [];
  }

  return {
    paypalUrl: row.paypalUrl || '',
    kofiUrl: row.kofiUrl || '',
    patreonUrl: row.patreonUrl || '',
    discordUrl: row.discordUrl || '',
    customLinks,
    bannerEnabled: !!row.bannerEnabled,
    bannerText: row.bannerText || '',
    bannerLink: row.bannerLink || '',
    bannerImage: row.bannerImage || ''
  };
};

// GET - Configuración pública de monetización (enlaces + banner)
router.get('/', (req, res) => {
  const db = req.app.locals.db;

  db.get('SELECT * FROM monetization WHERE id = 1', [], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    res.status(200).json({
      success: true,
      monetization: formatConfig(row)
    });
  });
});

// PUT - Actualizar configuración (solo admin con clave verificada)
router.put('/', protect, authorizeAdminAccess, (req, res) => {
  const db = req.app.locals.db;
  const body = req.body || {};

  const values = {
    paypalUrl: body.paypalUrl || '',
    kofiUrl: body.kofiUrl || '',
    patreonUrl: body.patreonUrl || '',
    discordUrl: body.discordUrl || '',
    customLinks: JSON.stringify(Array.isArray(body.customLinks) ? body.customLinks : []),
    bannerEnabled: body.bannerEnabled ? 1 : 0,
    bannerText: body.bannerText || '',
    bannerLink: body.bannerLink || '',
    bannerImage: body.bannerImage || ''
  };

  const setClause = FIELDS.map((f) => `${f} = ?`).join(', ');
  const params = FIELDS.map((f) => values[f]);

  db.run(
    `UPDATE monetization SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = 1`,
    params,
    function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      res.status(200).json({
        success: true,
        message: 'Configuración de monetización actualizada',
        monetization: formatConfig({ ...values })
      });
    }
  );
});

module.exports = router;
