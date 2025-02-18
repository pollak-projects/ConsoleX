const express = require('express');
const { getAllProducts, getAllOrders, createOrder, addOrderItems } = require('../controllers/orderController');

const router = express.Router();

router.get('/products', getAllProducts); // Get all products
router.get('/orders', getAllOrders); // Get all orders
router.post('/order', createOrder); // Create a new order
router.post('/order-item', addOrderItems); // Add an item to an order

module.exports = router;
