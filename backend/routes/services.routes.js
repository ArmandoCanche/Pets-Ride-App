const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services.controller');
const verifyToken = require('../middlewares/auth.middleware');

// --- RUTAS PÚBLICAS (Cualquiera puede ver servicios) ---
router.get('/', servicesController.getAllServices);
//router.get('/:id', servicesController.getServiceById); 


// --- RUTAS PROTEGIDAS (Requieren Token) ---
router.use(verifyToken);

// Crear Servicio
router.post('/', servicesController.createService);

// Actualizar Servicio
router.patch('/:id', servicesController.updateService);

// Toggle Estado (Activar/Desactivar)
router.patch('/:id/toggle', servicesController.toggleServiceStatus);

// Eliminar Servicio
router.delete('/:id', servicesController.deleteService);

// Obtener mis servicios (como proveedor)
router.get('/provider/:providerId', servicesController.getProviderServices);

module.exports = router;