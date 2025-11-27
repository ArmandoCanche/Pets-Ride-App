const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Inicializar App
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// --- IMPORTAR RUTAS MODULARES ---
const authRoutes = require('./routes/auth.routes');
const petsRoutes = require('./routes/pets.routes');
const bookingsRoutes = require('./routes/bookings.routes');
const reviewsRoutes = require('./routes/reviews.routes'); 

// --- DEFINICIÓN DE ENDPOINTS ---

// 1. Autenticación (Login/Register)
// Esto habilitará: POST /api/login y POST /api/register
app.use('/api', authRoutes); 

// 2. Mascotas
// Habilita rutas como: GET /api/pets, POST /api/pets
app.use('/api/pets', petsRoutes);

// 3. Reservas
// Habilita rutas como: POST /api/bookings
app.use('/api/bookings', bookingsRoutes);

// 4. Reseñas
// Habilita rutas como: POST /api/reviews
app.use('/api/reviews', reviewsRoutes);

// --- START ---
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo limpio en http://localhost:${PORT}`);
});