const express = require('express');
const router = express.Router();
const { login } = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/login', login);

router.get('/dashboard', auth, (req, res) => {
  res.send('Admin Dashboard');
});

module.exports = router;
