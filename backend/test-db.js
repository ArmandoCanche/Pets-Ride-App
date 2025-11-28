// backend/test-db.js
const db = require('./db'); // Importamos nuestro módulo de DB

async function testConnection() {
  console.log('Intentando conectar a la base de datos...');
  try {
    // 1. Ejecutar una consulta súper simple
    const result = await db.query('SELECT NOW()');
    // 2. Si funciona, mostrar la hora del servidor de la BD
    console.log('✅ ¡Conexión exitosa!');
    console.log('Hora actual de la base de datos:', result.rows[0].now);

  } catch (err) {
    // 3. Si falla, mostrar el error
    console.error('❌ ¡Error al conectar a la base de datos!');
    console.error(err.message);
  } finally {
    // 4. Cerrar la conexión para que el script termine
    await db.pool.end();
    console.log('Conexión cerrada.');
  }
}

// Ejecutar la función
testConnection();