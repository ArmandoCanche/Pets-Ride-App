
const db = require("../db");

const createService = async (req, res) => {
  try {
    const {
      provider_id, // Asegúrate de enviar esto desde el frontend (o sacarlo del token)
      name,
      description,
      price,
      duration, // En el frontend se llama 'duration', en DB 'duration_minutes'
      category, // El frontend envía un string ej: "paseo"
      serviceArea // Opcional, si decides agregarlo a la tabla después
    } = req.body;

    // Validación básica
    if (!provider_id || !name || !price || !category) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // PASO 1: Obtener el category_id basado en el nombre de la categoría
    // Esto asume que ya llenaste tu tabla Service_Categories con nombres como 'paseo', 'veterinaria', etc.
    const categoryResult = await db.query(
      "SELECT category_id FROM Service_Categories WHERE name ILIKE $1", 
      [category]
    );

    let category_id;
    
    if (categoryResult.rows.length > 0) {
      category_id = categoryResult.rows[0].category_id;
    } else {
      // Opcional: Si no existe la categoría, podrías crearla al vuelo o devolver error
      return res.status(400).json({ message: `La categoría '${category}' no es válida.` });
    }

    // PASO 2: Insertar el servicio
    const query = `
      INSERT INTO Services (
        provider_id, 
        category_id, 
        name, 
        description, 
        price, 
        duration_minutes
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      provider_id,
      category_id,
      name,
      description,
      price,
      duration
    ];

    const result = await db.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Servicio creado exitosamente",
      service: result.rows[0]
    });

  } catch (err) {
    console.error("Error al crear servicio:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Opcional: Obtener servicios de un proveedor
const getProviderServices = async (req, res) => {
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
        res.status(500).json({ message: "Error al obtener servicios" });
    }
};

// 1. EDITAR SERVICIO
const updateService = async (req, res) => {
  try {
    const { id } = req.params; // ID del servicio
    const { name, description, price, duration, category } = req.body;

    // Buscar category_id si viene el nombre (igual que en create)
    let category_id;
    if (category) {
       const catResult = await db.query("SELECT category_id FROM Service_Categories WHERE name ILIKE $1", [category]);
       if (catResult.rows.length > 0) category_id = catResult.rows[0].category_id;
    }

    const query = `
      UPDATE Services 
      SET name = $1, description = $2, price = $3, duration_minutes = $4, category_id = COALESCE($5, category_id)
      WHERE service_id = $6
      RETURNING *;
    `;
    
    const result = await db.query(query, [name, description, price, duration, category_id, id]);

    if (result.rows.length === 0) return res.status(404).json({ message: "Servicio no encontrado" });

    res.json({ success: true, service: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar servicio" });
  }
};

// 2. CAMBIAR ESTADO (ACTIVAR/DESACTIVAR)
const toggleServiceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      UPDATE Services 
      SET is_active = NOT is_active 
      WHERE service_id = $1 
      RETURNING is_active, service_id;
    `;
    const result = await db.query(query, [id]);
    
    if (result.rows.length === 0) return res.status(404).json({ message: "Servicio no encontrado" });

    res.json({ success: true, is_active: result.rows[0].is_active });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al cambiar estado" });
  }
};

// 3. ELIMINAR SERVICIO
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM Services WHERE service_id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) return res.status(404).json({ message: "Servicio no encontrado" });

    res.json({ success: true, message: "Servicio eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar servicio" });
  }
};

module.exports = { 
    createService, 
    getProviderServices, 
    updateService,     
    toggleServiceStatus, 
    deleteService      
};