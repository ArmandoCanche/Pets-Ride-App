const express = require('express');
const router = express.Router();
const petsController = require('../controllers/pets.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Todas las rutas requieren estar logueado
router.use(verifyToken);

// Rutas Base (/api/pets)
router.get('/', petsController.getMyPets);
router.post('/', petsController.createPet);

// Rutas Específicas (/api/pets/:id)
router.get('/:id', petsController.getPetById);
router.patch('/:id', petsController.updatePet);
router.delete('/:id', petsController.deletePet);

module.exports = router;