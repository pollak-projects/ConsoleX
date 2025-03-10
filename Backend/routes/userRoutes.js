// routes/userRoutes.js
const express = require('express');
const { login, getProfile } = require('./controllers/UserController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/login', login); // Login route
router.get('/profile', authenticate, getProfile); // Profile route (requires authentication)

module.exports = router;
