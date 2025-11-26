
const express = require('express');
const router = express.Router();
const { createService, getProviderServices } = require('../controllers/services.controller');

// POST /api/services -> Crear nuevo servicio
router.post('/', createService);

// GET /api/services/provider/:providerId -> Ver servicios del proveedor
router.get('/provider/:providerId', getProviderServices);

module.exports = router;