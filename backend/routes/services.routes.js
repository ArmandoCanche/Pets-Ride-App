
const express = require('express');
const router = express.Router();
const { createService, 
    getProviderServices, 
    updateService, 
    toggleServiceStatus, 
    deleteService,
    getAllServices } = require('../controllers/services.controller');

// RUTAS
router.post('/', createService);
router.get('/provider/:providerId', getProviderServices);
router.put('/:id', updateService);         // Editar info completa
router.patch('/:id/status', toggleServiceStatus); // Solo cambiar activo/inactivo
router.delete('/:id', deleteService);      // Eliminar
router.get('/', getAllServices); // Obtener todos los servicios activos

module.exports = router;