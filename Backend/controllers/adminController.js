const db = require('../config/db');

exports.addProduct = (req, res) => {
  const { name, price, image, category } = req.body;
  const query = 'INSERT INTO products (name, price, image, category) VALUES (?, ?, ?, ?)';
  db.query(query, [name, price, image, category], (err, result) => {
    if (err) throw err;
    res.send('Product added successfully');
  });
};
