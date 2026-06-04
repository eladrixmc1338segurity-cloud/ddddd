const express = require('express');
const router = express.Router();

// GET - Estadísticas públicas para la página de inicio
router.get('/', (req, res) => {
  const db = req.app.locals.db;

  const stats = {
    totalMaps: 0,
    totalDownloads: 0,
    totalUsers: 0,
    categories: []
  };

  db.get('SELECT COUNT(*) AS count, COALESCE(SUM(downloadCount), 0) AS downloads FROM maps WHERE status = "active"', [], (err, mapsRow) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    stats.totalMaps = mapsRow ? mapsRow.count : 0;
    stats.totalDownloads = mapsRow ? mapsRow.downloads : 0;

    db.get('SELECT COUNT(*) AS count FROM users WHERE isActive = 1', [], (err2, usersRow) => {
      if (err2) {
        return res.status(500).json({ success: false, message: err2.message });
      }

      stats.totalUsers = usersRow ? usersRow.count : 0;

      db.all(
        'SELECT category, COUNT(*) AS count FROM maps WHERE status = "active" GROUP BY category',
        [],
        (err3, categoryRows) => {
          if (err3) {
            return res.status(500).json({ success: false, message: err3.message });
          }

          stats.categories = categoryRows || [];

          res.status(200).json({
            success: true,
            stats
          });
        }
      );
    });
  });
});

module.exports = router;
