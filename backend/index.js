const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Inicializar App
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/uploads', express.static('uploads'));

// --- IMPORTAR RUTAS MODULARES ---
const authRoutes = require('./routes/auth.routes');
const petsRoutes = require('./routes/pets.routes');
const bookingsRoutes = require('./routes/bookings.routes');
const reviewsRoutes = require('./routes/reviews.routes'); 
const servicesRoutes = require('./routes/services.routes');
const userRoutes = require('./routes/user.routes');

// --- DEFINICIÓN DE ENDPOINTS ---

// Autenticación (Login/Register)
// Esto habilitará: POST /api/login y POST /api/register
app.use('/api', authRoutes); 

// Mascotas
// Habilita rutas como: GET /api/pets, POST /api/pets
app.use('/api/pets', petsRoutes);
app.use('/api/services', servicesRoutes);

// Reservas
// Habilita rutas como: POST /api/bookings
app.use('/api/bookings', bookingsRoutes);

// Reseñas
// Habilita rutas como: POST /api/reviews
app.use('/api/reviews', reviewsRoutes);

// Ruta para operaciones de usuario (perfil, etc.)
app.use('/api/users', userRoutes);

// --- START ---
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo limpio en http://localhost:${PORT}`);
});