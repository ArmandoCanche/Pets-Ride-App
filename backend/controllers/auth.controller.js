const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  const { 
    email, 
    password, 
    firstName, 
    lastName, 
    role, 
    phone, 
    address, 
    latitude, 
    longitude  
  } = req.body;

  try {
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      `INSERT INTO Users (
          email, 
          password_hash, 
          first_name, 
          last_name, 
          role, 
          phone_number, 
          address,
          latitude, 
          longitude
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING user_id, email, first_name, last_name, role, profile_picture_url`, 
       [
         email, 
         passwordHash, 
         firstName, 
         lastName, 
         (role || 'client').toLowerCase(), 
         phone || null, 
         address || null,
         latitude || null, 
         longitude || null
       ]
    );

    return res.status(201).json(newUser.rows[0]);

  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }
    console.error('Register error:', err.message);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// --- LOGIN DE USUARIO ---
const login = async (req, res) => {
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

    // Estructura del payload del Token
    const payload = { 
        user: { 
            id: user.user_id, 
            role: user.role 
        } 
    };

    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
        throw new Error("JWT_SECRET is missing");
    }

    const token = jwt.sign(payload, secret, { expiresIn: '8h' });

    // Respuesta al Frontend:
    // Devolvemos datos extra para que React pueda pintar el perfil sin hacer otra petición
    return res.json({ 
        token, 
        user: {
            id: user.user_id,
            role: user.role,
            firstName: user.first_name,
            lastName: user.last_name,
            photoUrl: user.profile_picture_url, 
            address: user.address,
            coordinates: {
                lat: user.latitude,
                lng: user.longitude
            }
        } 
    });

  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { register, login };