const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.createOrder);
router.get('/orders/:userId', orderController.getUserOrders);
router.delete('/orders/:orderId', orderController.deleteOrder);

module.exports = router;
