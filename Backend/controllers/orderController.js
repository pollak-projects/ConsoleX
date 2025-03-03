// controllers/orderController.js

const db = require('../config/db');

// Create a new order
exports.createOrder = (req, res) => {
  const { name, street, houseNumber, postalCode, paymentMethod, totalAmount } = req.body;
  const query = 'INSERT INTO orders (name, street, houseNumber, postalCode, paymentMethod, totalAmount) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [name, street, houseNumber, postalCode, paymentMethod, totalAmount], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Failed to place order', error });
    }

    res.status(201).json({ message: 'Order placed successfully', orderId: results.insertId });
  });
};
