const db = require('../db');

// --- OBTENER MASCOTAS (Solo las ACTIVAS) ---
const getMyPets = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await db.query(
      `SELECT * FROM Pets 
       WHERE owner_id = $1 AND is_active = true 
       ORDER BY created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener tus mascotas' });
  }
};

// --- CREAR MASCOTA ---
const createPet = async (req, res) => {
  const userId = req.user.id;
  const { name, species, breed, weight, birthDate, medicalNotes} = req.body;

  const photoUrl = req.file ? `http://localhost:3001/uploads/${req.file.filename}` : null; 

  if (!name || !species) {
    return res.status(400).json({ error: 'Nombre y especie son obligatorios' });
  }

  try {
    const result = await db.query(
      `INSERT INTO Pets (owner_id, name, species, breed, weight_kg, birth_date, medical_notes, photo_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [userId, name, species, breed, weight || null, birthDate || null, medicalNotes || null, photoUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear mascota' });
  }
};

// --- OBTENER DETALLE ---
const getPetById = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM Pets WHERE pet_id = $1 AND owner_id = $2`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// --- ACTUALIZAR MASCOTA ---
const updatePet = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name, species, breed, weight, medicalNotes } = req.body;
  
  // Si Multer procesó un archivo, creamos la URL. Si no, es null.
  const photoUrl = req.file ? `http://localhost:3001/uploads/${req.file.filename}` : null;

  try {
    const result = await db.query(
      `UPDATE Pets 
       SET name = COALESCE($1, name),
           species = COALESCE($2, species),
           breed = COALESCE($3, breed),
           weight_kg = COALESCE($4, weight_kg),
           medical_notes = COALESCE($5, medical_notes),
           photo_url = COALESCE($6, photo_url), 
           updated_at = NOW()
       WHERE pet_id = $7 AND owner_id = $8 AND is_active = true
       RETURNING *`,
      [name, species, breed, weight, medicalNotes, photoUrl, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mascota no encontrada o no se puede editar' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar mascota' });
  }
};

// --- ELIMINAR MASCOTA (SOFT DELETE - BORRADO LÓGICO) ---
const deletePet = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    // 1. Verificamos si tiene reservas PENDIENTES o CONFIRMADAS activas
    // No deberíamos dejar "borrar" una mascota si tiene una cita mañana.
    const activeBookings = await db.query(
      `SELECT booking_id FROM Bookings 
       WHERE pet_id = $1 
       AND status IN ('pending', 'confirmed')`,
      [id]
    );

    if (activeBookings.rows.length > 0) {
        return res.status(400).json({ 
            error: 'No puedes eliminar esta mascota porque tiene reservas activas. Cancélalas primero.' 
        });
    }

    // 2. Ejecutamos el Soft Delete
    const result = await db.query(
      `UPDATE Pets 
       SET is_active = false, 
           deleted_at = NOW() 
       WHERE pet_id = $1 AND owner_id = $2 
       RETURNING pet_id`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    res.json({ message: 'Mascota archivada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar mascota' });
  }
};

module.exports = {
  getMyPets,
  createPet,
  getPetById,
  updatePet,
  deletePet
};