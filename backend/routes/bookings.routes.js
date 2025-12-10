const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Rutas protegidas con el middleware de verificación de token
router.post('/', verifyToken, bookingsController.createBooking);
router.get('/', verifyToken, bookingsController.getMyBookings);
router.patch('/:id/status', verifyToken, bookingsController.updateBookingStatus);

router.get('/stats', verifyToken, bookingsController.getProviderStats);

module.exports = router;