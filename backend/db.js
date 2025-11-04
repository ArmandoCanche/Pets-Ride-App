const { Pool } = require('pg');
const path = require('path');

// Cargar .env explícitamente desde backend/
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

// DEBUG (temporal): imprime la config sin exponer la contraseña
console.log('[DB cfg]', {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  db: process.env.DB_NAME,
  port: process.env.DB_PORT,
  hasPass: typeof process.env.DB_PASS === 'string' && process.env.DB_PASS.length > 0
});

// Falla rápido si no hay password
if (!process.env.DB_PASS) {
  throw new Error('DB_PASS no está definido (revisa backend/.env o el working directory)');
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  // fuerza a string
  password: String(process.env.DB_PASS),
  port: Number(process.env.DB_PORT || 5432),
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
