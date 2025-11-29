const db = require("../db");

// --- CREAR SERVICIO ---
const createService = async (req, res) => {
  try {
    const providerId = req.user.id; // Obtenido del token (Seguridad)
    
    // Desestructurar TODOS los campos nuevos
    const {
      name,
      description,
      price,
      duration, // Frontend manda 'duration' (minutos)
      category, // Nombre de la categoría (ej: "Paseo")
      coverageArea,
      priceUnit,      // 'session', 'hour', 'night'
      acceptedSpecies, // Array ['perro', 'gato']
      serviceDays      // Array ['monday', 'friday']
    } = req.body;

    // Validación básica
    if (!name || !price || !category) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // 1. Obtener category_id
    const categoryResult = await db.query(
      "SELECT category_id FROM Service_Categories WHERE name ILIKE $1", 
      [category]
    );

    let categoryId;
    if (categoryResult.rows.length > 0) {
      categoryId = categoryResult.rows[0].category_id;
    } else {
      return res.status(400).json({ message: `Categoría '${category}' no válida.` });
    }

    // 2. Insertar con los NUEVOS CAMPOS
    const query = `
      INSERT INTO Services (
        provider_id, 
        category_id, 
        name, 
        description, 
        price, 
        duration_minutes,
        coverage_area,     -- Nuevo
        price_unit,        -- Nuevo
        accepted_species,  -- Nuevo (Array)
        service_days       -- Nuevo (Array)
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [
      providerId,
      categoryId,
      name,
      description,
      price,
      duration || 60,
      coverageArea || null,
      priceUnit || 'session', // Default de la DB
      acceptedSpecies || [],  // Postgres acepta arrays vacíos
      serviceDays || []
    ];

    const result = await db.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Servicio creado exitosamente",
      service: result.rows[0]
    });

  } catch (err) {
    console.error("Error al crear servicio:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// --- ACTUALIZAR SERVICIO ---
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const providerId = req.user.id; // Seguridad: Verificar dueño
    
    const { 
        name, description, price, duration, category,
        coverageArea, priceUnit, acceptedSpecies, serviceDays 
    } = req.body;

    // Verificar propiedad antes de editar
    const checkOwner = await db.query('SELECT provider_id FROM Services WHERE service_id = $1', [id]);
    if (checkOwner.rows.length === 0) return res.status(404).json({ message: "Servicio no encontrado" });
    if (checkOwner.rows[0].provider_id !== providerId) return res.status(403).json({ message: "No autorizado" });

    // Lógica para categoría opcional
    let categoryId = null;
    if (category) {
       const catResult = await db.query("SELECT category_id FROM Service_Categories WHERE name ILIKE $1", [category]);
       if (catResult.rows.length > 0) categoryId = catResult.rows[0].category_id;
    }

    const query = `
      UPDATE Services 
      SET name = COALESCE($1, name),
          description = COALESCE($2, description),
          price = COALESCE($3, price),
          duration_minutes = COALESCE($4, duration_minutes),
          category_id = COALESCE($5, category_id),
          coverage_area = COALESCE($6, coverage_area),
          price_unit = COALESCE($7, price_unit),
          accepted_species = COALESCE($8, accepted_species),
          service_days = COALESCE($9, service_days),
          updated_at = NOW()
      WHERE service_id = $10
      RETURNING *;
    `;
    
    const values = [
        name, description, price, duration, categoryId, 
        coverageArea, priceUnit, acceptedSpecies, serviceDays, 
        id
    ];

    const result = await db.query(query, values);
    res.json({ success: true, service: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar servicio" });
  }
};

// --- OBTENER TODOS (PÚBLICO) ---
const getAllServices = async (req, res) => {
  try {
    const query = `
      SELECT 
        s.service_id,
        s.name as service_title,
        s.description,
        s.price,
        s.price_unit,    
        s.duration_minutes,
        s.coverage_area,
        s.accepted_species,
        s.provider_id,
        c.name as category_name,
        u.user_id,         -- ID para validación
        u.first_name,
        u.last_name,
        u.address as location,
        u.is_verified,
        u.profile_picture_url
      FROM Services s
      JOIN Users u ON s.provider_id = u.user_id
      JOIN Service_Categories c ON s.category_id = c.category_id
      WHERE s.is_active = true
    `;
    
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error getting all services:", err);
    res.status(500).json({ message: "Error al obtener servicios" });
  }
};

// --- OTROS (Sin cambios mayores, solo exportar) ---
const getProviderServices = async (req, res) => {
    // ... (Tu código actual está bien, solo asegúrate de SELECT *)
    try {
        const { providerId } = req.params;
        const query = `
            SELECT s.*, c.name as category_name 
            FROM Services s
            JOIN Service_Categories c ON s.category_id = c.category_id
            WHERE s.provider_id = $1
        `;
        const result = await db.query(query, [providerId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error" });
    }
};

const toggleServiceStatus = async (req, res) => {
    // ... (Tu código actual está bien)
    try {
        const { id } = req.params;
        const result = await db.query("UPDATE Services SET is_active = NOT is_active WHERE service_id = $1 RETURNING is_active", [id]);
        if(result.rows.length === 0) return res.status(404).json({message: "No encontrado"});
        res.json({ success: true, is_active: result.rows[0].is_active });
    } catch(err) { res.status(500).json({message: "Error"}); }
};

const deleteService = async (req, res) => {
    // ... (Tu código actual está bien)
    try {
        const { id } = req.params;
        // OJO: Deberías usar Soft Delete aquí también (is_active = false) en lugar de DELETE
        // pero por ahora lo dejamos así para no cambiar todo de golpe.
        const result = await db.query("DELETE FROM Services WHERE service_id = $1 RETURNING *", [id]);
        if(result.rows.length === 0) return res.status(404).json({message: "No encontrado"});
        res.json({ success: true });
    } catch(err) { res.status(500).json({message: "Error"}); }
};

module.exports = { 
    createService, 
    updateService, 
    getAllServices,
    getProviderServices, 
    toggleServiceStatus, 
    deleteService 
};