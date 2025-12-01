const db = require('../db');

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

module.exports = { getProfile, updateProfile };