const db = require('../db');

// --- CREAR RESEÑA ---
const createReview = async (req, res) => {
  const { bookingId, rating, comment } = req.body;

  try {
    if (!bookingId || typeof rating !== 'number') {
      return res.status(400).json({ message: 'Faltan bookingId o rating' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'El rating debe estar entre 1 y 5' });
    }

    const clientId = req.user.id; 

    // Validamos Booking
    const bookingRes = await db.query(
      `SELECT b.booking_id, b.client_id, b.status, s.provider_id
       FROM Bookings b
       JOIN Services s ON b.service_id = s.service_id
       WHERE b.booking_id = $1`,
      [bookingId]
    );

    if (bookingRes.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    const booking = bookingRes.rows[0];

    if (Number(booking.client_id) !== Number(clientId)) {
      return res.status(403).json({ message: 'La reserva no pertenece al cliente autenticado' });
    }

    const providerId = booking.provider_id;

    const reviewInsert = await db.query(
      `INSERT INTO Reviews (booking_id, client_id, provider_id, rating, comment)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING review_id, booking_id, client_id, provider_id, rating, comment, created_at`,
      [bookingId, clientId, providerId, rating, comment || null]
    );

    return res.status(201).json(reviewInsert.rows[0]);

  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Esta reserva ya tiene una reseña' });
    }
    console.error('Create review error:', err.message);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getProviderReviews = async (req, res) => {
  const { providerId } = req.params;
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const offset = Number(req.query.offset) || 0;

  try {
    const reviewsRes = await db.query(
      `SELECT 
          r.review_id, 
          r.rating, 
          r.comment, 
          r.created_at, 
          r.client_id, 
          u.first_name, 
          u.last_name,       -- Agregamos apellido
          u.profile_picture_url -- <-- ¡IMPORTANTE! Campo nuevo de la DB v3.2
       FROM Reviews r
       JOIN Users u ON r.client_id = u.user_id 
       WHERE r.provider_id = $1
       ORDER BY r.created_at DESC
       LIMIT $2 OFFSET $3`,
      [providerId, limit, offset]
    );
    return res.json({ items: reviewsRes.rows, page: { limit, offset } });
  } catch (err) {
    console.error('List provider reviews error:', err.message);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { createReview, getProviderReviews };