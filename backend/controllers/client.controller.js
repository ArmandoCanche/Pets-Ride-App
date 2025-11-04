// controllers/client.controller.js
const bcrypt = require('bcryptjs');
const db = require('../db');

async function registerClient(req, res) {
  const { email, password, firstName, lastName } = req.body;

  try {
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await db.query(
      `INSERT INTO Users (email, password_hash, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, 'client')
       RETURNING user_id, email, role`,
      [email, passwordHash, firstName, lastName]
    );

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: result.rows[0],
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }
    console.error('Error en registerClient:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

module.exports = { registerClient };
