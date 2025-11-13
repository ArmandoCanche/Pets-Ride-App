const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Importamos nuestra conexión a la BD
require('dotenv').config();

const app = express();
app.use(express.json()); // Para que Express entienda JSON
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const PORT = process.env.PORT || 3001; // Puerto para el backend

// Middleware de autenticación JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autorización requerido' });
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Formato de autorización inválido' });
  }
  const token = parts[1];
  try {
    const secret = process.env.JWT_SECRET || 'mi_secreto_temporal';
    const payload = jwt.verify(token, secret);
    req.user = payload.user; // { id, role }
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

// --- RUTA DE REGISTRO ---
// React llamará a esta ruta para crear un nuevo usuario
app.post('/api/register', async (req, res) => {
  const { email, password, firstName, lastName, role, phone, address } = req.body;

  try {
    // Validación mínima
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await db.query( // se agregó phone number y address
      `INSERT INTO Users (email, password_hash, first_name, last_name, role, phone_number, address)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING user_id, email, role`,
       [email, passwordHash, firstName, lastName, (role || 'client').toLowerCase(), phone || null, address || null] // <-- default a 'client'
    );

    return res.status(201).json(newUser.rows[0]);

  } catch (err) {
    // Manejo de email duplicado (unique_violation en Postgres)
    if (err.code === '23505') {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }
    console.error('Register error:', err.message);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
});

// --- RUTA DE LOGIN ---
// React llamará a esta ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan credenciales' });
    }

    const userResult = await db.query("SELECT * FROM Users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const payload = { user: { id: user.user_id, role: user.role } };
    const secret = process.env.JWT_SECRET || 'mi_secreto_temporal';

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return res.json({ token });

  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ message: "Error en el servidor" });
  }
});

// --- RUTA Reseñas ---
// Requiere autenticación de cliente (JWT)
app.post('/api/reviews', authenticateJWT, async (req, res) => {
  const { bookingId, rating, comment } = req.body;

  try {
    if (!bookingId || typeof rating !== 'number') {
      return res.status(400).json({ message: 'Faltan bookingId o rating' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'El rating debe estar entre 1 y 5' });
    }

    const clientId = req.user?.id;
    if (!clientId) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    // Validar que la reserva pertenece al cliente y obtener el provider
    const bookingRes = await db.query(
      `SELECT b.booking_id, b.client_id, b.status, b.service_id, s.provider_id
       FROM Bookings b
       JOIN Services s ON b.service_id = s.service_id
       WHERE b.booking_id = 1`,
      [bookingId]
    );

    if (bookingRes.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    const booking = bookingRes.rows[0];
    if (Number(booking.client_id) !== Number(clientId)) {
      return res.status(403).json({ message: 'La reserva no pertenece al cliente autenticado' });
    }

    // (Opcional) exigir que la reserva esté completada
    if (booking.status && booking.status !== 'completed') {
      return res.status(400).json({ message: 'Solo se puede reseñar reservas completadas' });
    }

    const providerId = booking.provider_id;

    // Insertar reseña; Reviews.booking_id es UNIQUE (una reseña por reserva)
    const reviewInsert = await db.query(
      `INSERT INTO Reviews (booking_id, client_id, provider_id, rating, comment)
       VALUES (1, 2, 3, 4, 5)
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
});

// --- RUTA: Listar Reseñas por Proveedor ---
app.get('/api/providers/:providerId/reviews', async (req, res) => {
  const { providerId } = req.params;
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const offset = Number(req.query.offset) || 0;

  try {
    const reviewsRes = await db.query(
      `SELECT r.review_id, r.rating, r.comment, r.created_at, r.client_id
       FROM Reviews r
       WHERE r.provider_id = $1
       ORDER BY r.created_at DESC
       LIMIT 2 OFFSET 3`,
      [providerId, limit, offset]
    );
    return res.json({ items: reviewsRes.rows, page: { limit, offset } });
  } catch (err) {
    console.error('List provider reviews error:', err.message);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
