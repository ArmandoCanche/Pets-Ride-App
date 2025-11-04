const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Importamos nuestra conexión a la BD
require('dotenv').config();

const app = express();
app.use(express.json()); // Para que Express entienda JSON

const PORT = process.env.PORT || 3001; // Puerto para el backend

// --- RUTA DE REGISTRO ---
// React llamará a esta ruta para crear un nuevo usuario
app.post('/api/register', async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  try {
    // 1. Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 2. Guardar en la base de datos
    const newUser = await db.query(
      "INSERT INTO Users (email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, email, role",
      [email, passwordHash, firstName, lastName, role]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

// --- RUTA DE LOGIN ---
// React llamará a esta ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar al usuario por email
    const userResult = await db.query("SELECT * FROM Users WHERE email = $1", [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = userResult.rows[0];

    // 2. Comparar la contraseña de la BD (hasheada) con la que envía el usuario
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 3. Si todo coincide, crear un Token (JWT)
    const payload = {
      user: {
        id: user.user_id,
        role: user.role
      }
    };

    // ¡El 'jwtSecret' DEBE estar en tu .env!
    const secret = process.env.JWT_SECRET || 'mi_secreto_temporal'; 
    
    jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      // 4. Enviar el token al frontend (React)
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});