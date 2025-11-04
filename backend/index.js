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

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});