const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/admin', adminController.addProduct);
router.get('/admin', adminController.getProducts);
router.delete('/admin/:id', adminController.deleteProduct);
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;