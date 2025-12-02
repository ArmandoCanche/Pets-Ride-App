const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Crear reseña (Protegido)
router.post('/', verifyToken, reviewsController.createReview);

router.get('/providers/:providerId', reviewsController.getProviderReviews);

router.get('/count', verifyToken, reviewsController.getClientReviewCount);

module.exports = router;