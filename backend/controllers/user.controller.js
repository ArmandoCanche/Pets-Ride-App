const db = require('../db');
const bcrypt = require('bcryptjs');

const getProfile = async (req, res) => {
  const userId = req.user.id; 

  try {
    const result = await db.query(
      `SELECT 
         user_id, 
         email, 
         first_name, 
         last_name, 
         phone_number, 
         address, 
         latitude, 
         longitude,
         role, 
         bio, 
         profile_picture_url, 
         is_verified,
         created_at 
       FROM Users 
       WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};

// --- ACTUALIZAR PERFIL (UPDATE) ---
const updateProfile = async (req, res) => {
  const userId = req.user.id;
  
  // Desestructuramos lo que el usuario puede cambiar
  const { 
    firstName, 
    lastName, 
    phone, 
    address, 
    bio,
    latitude,
    longitude 
  } = req.body;

  // Si subieron foto nueva, construimos la URL
  const photoUrl = req.file ? `http://localhost:3001/uploads/${req.file.filename}` : null;

  try {
    // Construcción dinámica de la query para la foto
    // Si photoUrl existe, actualizamos. Si no, dejamos la que estaba.
    
    const query = `
      UPDATE Users 
      SET 
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        phone_number = COALESCE($3, phone_number),
        address = COALESCE($4, address),
        bio = COALESCE($5, bio),
        latitude = COALESCE($6, latitude),
        longitude = COALESCE($7, longitude),
        profile_picture_url = COALESCE($8, profile_picture_url),
        updated_at = NOW()
      WHERE user_id = $9
      RETURNING 
         user_id, email, first_name, last_name, phone_number, 
         address, bio, profile_picture_url, role;
    `;

    const values = [
      firstName, 
      lastName, 
      phone, 
      address, 
      bio, 
      latitude || null, 
      longitude || null,
      photoUrl, 
      userId
    ];

    const result = await db.query(query, values);

    res.json({
      message: 'Perfil actualizado correctamente',
      user: result.rows[0]
    });

  } catch (error) {
    console.error("Error updateProfile:", error);
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
};

// --- ELIMINAR CUENTA (DELETE) ---
const deleteUser = async (req, res) => {
  const userId = req.user.id;

  try {
    // Al tener ON DELETE CASCADE en las tablas dependientes (pets, bookings, etc.),
    // solo necesitamos borrar el usuario de la tabla Users.
    const result = await db.query('DELETE FROM Users WHERE user_id = $1', [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Cuenta eliminada correctamente' });
  } catch (error) {
    console.error("Error deleteUser:", error);
    res.status(500).json({ error: 'Error al eliminar la cuenta' });
  }
};

// --- CAMBIAR CONTRASEÑA ---
const changePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Debes proporcionar la contraseña actual y la nueva' });
  }

  try {
    // 1. Obtener el hash actual de la base de datos
    const userResult = await db.query('SELECT password_hash FROM Users WHERE user_id = $1', [userId]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const storedHash = userResult.rows[0].password_hash;

    // 2. Verificar que la contraseña actual sea correcta
    const isMatch = await bcrypt.compare(currentPassword, storedHash); //
    if (!isMatch) {
      return res.status(401).json({ error: 'La contraseña actual es incorrecta' });
    }

    // 3. Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(10); //
    const newHash = await bcrypt.hash(newPassword, salt); //

    // 4. Actualizar en la base de datos
    await db.query('UPDATE Users SET password_hash = $1, updated_at = NOW() WHERE user_id = $2', [newHash, userId]);

    res.json({ message: 'Contraseña actualizada correctamente' });

  } catch (error) {
    console.error("Error changePassword:", error);
    res.status(500).json({ error: 'Error al cambiar la contraseña' });
  }
};

module.exports = { getProfile, updateProfile, deleteUser, changePassword };
