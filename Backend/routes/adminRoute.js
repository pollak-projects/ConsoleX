const express = require('express');
const router = express.Router();
const { login, getUsers } = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/login', login);
router.get('/users', auth, getUsers);

module.exports = router;
