const express = require('express');
const router = express.Router();
const petsController = require('../controllers/pets.controller');
const verifyToken = require('../middlewares/auth.middleware');

const upload = require('../middlewares/upload.middleware');

// Debugging: Si esto imprime "undefined", el middleware está mal exportado.
console.log("Multer instance loaded:", !!upload.single); 

router.use(verifyToken);

// GET /api/pets
router.get('/', petsController.getMyPets);
router.post('/', upload.single('image'), petsController.createPet);

// PATCH /api/pets/:id
router.patch('/:id', upload.single('image'), petsController.updatePet);

// GET /api/pets/:id
router.get('/:id', petsController.getPetById);

// DELETE /api/pets/:id
router.delete('/:id', petsController.deletePet);

module.exports = router;