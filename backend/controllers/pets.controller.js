const db = require("../db");

// Crear mascota
const createPet = async (req, res) => {
  try {
  console.log("Datos recibidos en createPet:", req.body);
    const {
      owner_id,
      name,
      species,
      breed,
      birth_date,
      medical_notes,
      weight_kg,
      special_needs,
      medical_history,
      gender,
      age
    } = req.body;

    if (!owner_id || !name) {
      return res.status(400).json({ message: "owner_id y name son obligatorios" });
    }

    const query = `
      INSERT INTO pets (
        owner_id, name, species, breed, birth_date, medical_notes,
        weight_kg, special_needs, medical_history, gender, age
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *;
    `;

    const values = [
      owner_id,
      name,
      species,
      breed,
      birth_date,
      medical_notes,
      weight_kg,
      special_needs,
      medical_history,
      gender,
      age
    ];

    const result = await db.query(query, values);
    console.log("Mascota insertada:", result.rows[0]);

    return res.status(201).json({
      success: true,
      message: "Mascota creada",
      pet: result.rows[0]
    });

  } catch (err) {
    console.error("Error al crear mascota:", err);
    return res.status(500).json({ message: "Error al crear mascota" });
  }
};

module.exports = { createPet };