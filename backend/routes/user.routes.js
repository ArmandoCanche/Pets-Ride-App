const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// Todas las rutas son protegidas
router.use(verifyToken);

// GET /api/users/profile
router.get('/profile', userController.getProfile);

// PATCH /api/users/profile (Soporta imagen 'profileImage')
router.patch('/profile', upload.single('image'), userController.updateProfile);

module.exports = router;