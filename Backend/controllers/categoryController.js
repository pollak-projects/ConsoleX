const db = require('../config/db');

exports.getAllCategories = (req, res) => {
    const sqlQuery = 'SELECT category_id, category_name FROM category';
    
    db.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Hiba a kategóriák lekérésekor:', err);
        return res.status(500).json({ message: 'Hiba történt a kategóriák lekérésekor' });
      }
      res.json({ categories: results });
    });
  };