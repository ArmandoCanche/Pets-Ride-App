// routes/client.routes.js
const express = require('express');
const router = express.Router();
const { registerClient } = require('../controllers/client.controller');

// Ruta: POST /api/clients/register
router.post('/register', registerClient);

module.exports = router;
