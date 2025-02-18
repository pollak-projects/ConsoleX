const db = require('../config/db');

exports.createOrder = (req, res) => {
  const { userId, products, totalPrice } = req.body;

  const sqlQuery = 'INSERT INTO orders (user_id, products, total_price) VALUES (?, ?, ?)';
  db.query(sqlQuery, [userId, JSON.stringify(products), totalPrice], (err, result) => {
    if (err) {
      console.error('Hiba a rendelés létrehozása során:', err);
      return res.status(500).json({ message: 'Hiba történt a rendelés létrehozásakor' });
    }
    res.status(201).json({ message: 'Rendelés sikeresen létrehozva', orderId: result.insertId });
  });
};
