const db = require('../config/db');

exports.createOrder = (req, res) => {
  const { userDetails, products } = req.body;

  const insertUserQuery = `
    INSERT INTO user_orders (name, address, payment_method)
    VALUES (?, ?, ?)
  `;

  db.query(
    insertUserQuery,
    [userDetails.name, userDetails.address, userDetails.paymentMethod],
    (userErr, userResult) => {
      if (userErr) {
        console.error('Error saving user:', userErr);
        return res.status(500).json({ message: 'Failed to save user details.' });
      }

      const userId = userResult.insertId;

      const insertOrderQuery = `
        INSERT INTO orders (user_id, order_price)
        VALUES (?, ?)
      `;

      products.forEach((product) => {
        db.query(
          insertOrderQuery,
          [userId, product.name, product.price],
          (orderErr) => {
            if (orderErr) {
              console.error('Error saving order:', orderErr);
              return res.status(500).json({ message: 'Failed to save order.' });
            }
          }
        );
      });

      res.status(200).json({ message: 'Order successfully placed!' });
    }
  );
};
