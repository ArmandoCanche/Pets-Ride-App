const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Exportamos una función para hacer consultas
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool
};