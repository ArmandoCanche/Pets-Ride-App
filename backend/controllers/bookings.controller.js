// backend/controllers/bookings.controller.js
const db = require('../db'); // Tu pool de conexión
const { addMinutes, parseISO, isValid, isBefore, format } = require('date-fns');

const createBooking = async (req, res) => {
  // 1. Obtener cliente del token (Seguridad)
  const clientId = req.user.id; 

  // 2. Input: Esperamos 'startDateTime' en formato ISO UTC (ej: "2023-11-25T14:00:00Z")
  // Esto delega la conversión de zona horaria al Frontend (Best Practice)
  const { providerId, serviceId, petId, startDateTime, notes } = req.body;

  // Validación de entrada
  if (!providerId || !serviceId || !petId || !startDateTime) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: providerId, serviceId, petId, startDateTime' });
  }

  // Parsear fecha
  const bookingStart = parseISO(startDateTime);
  if (!isValid(bookingStart)) {
    return res.status(400).json({ error: 'Formato de fecha inválido. Use ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)' });
  }

  // No permitir reservas en el pasado
  if (isBefore(bookingStart, new Date())) {
    return res.status(400).json({ error: 'No se pueden crear reservas en el pasado' });
  }

  const client = await db.pool.connect(); // Obtener cliente dedicado para la transacción

  try {
    await client.query('BEGIN'); // INICIO DE TRANSACCIÓN

    // ---------------------------------------------------------
    // PASO A: Obtener metadatos del servicio
    // ---------------------------------------------------------
    const serviceRes = await client.query(
      'SELECT price, duration_minutes, name, provider_id FROM Services WHERE service_id = $1', 
      [serviceId]
    );

    if (serviceRes.rows.length === 0) throw new Error('Servicio no encontrado');
    const service = serviceRes.rows[0];

    // Validación de seguridad: Verificar que el servicio pertenezca al proveedor solicitado
    if (String(service.provider_id) !== String(providerId)) {
        throw new Error('El servicio no corresponde al proveedor seleccionado');
    }

    // ---------------------------------------------------------
    // PASO B: Calcular Hora de Finalización
    // ---------------------------------------------------------
    const bookingEnd = addMinutes(bookingStart, service.duration_minutes);
    
    // Convertir a Strings ISO para PostgreSQL
    const startISO = bookingStart.toISOString();
    const endISO = bookingEnd.toISOString();

    // ---------------------------------------------------------
    // PASO C: Validar Disponibilidad (Horario Laboral + Conflictos)
    // ---------------------------------------------------------
    
    // 1. ¿Trabaja el proveedor ese día y a esa hora?
    // Extraemos el día de la semana en inglés minúsculas ('monday', 'tuesday'...) para coincidir con el ENUM
    const dayOfWeekQuery = `SELECT trim(to_char($1::timestamp, 'day')) as day_name`; 
    const dayRes = await client.query(dayOfWeekQuery, [startISO]);
    const dayName = dayRes.rows[0].day_name; // ej: 'monday'

    const scheduleQuery = `
        SELECT * FROM Provider_Availability 
        WHERE provider_id = $1 AND day = $2::day_of_week AND is_active = true
    `;
    const scheduleRes = await client.query(scheduleQuery, [providerId, dayName]);

    if (scheduleRes.rows.length === 0) {
        throw new Error(`El proveedor no trabaja los días ${dayName}`);
    }

    const schedule = scheduleRes.rows[0];
    // Nota: Aquí podrías agregar lógica compleja para ver si la hora está dentro de start_time y end_time
    // Por ahora validamos que exista el día laboral.

    // 2. ¿Hay choque con otra reserva? (Overlap Check)
    const overlapQuery = `
      SELECT booking_id FROM Bookings 
      WHERE provider_id = $1 
      AND status IN ('confirmed', 'pending') -- Bloqueamos incluso si está pendiente
      AND (
        (booking_datetime < $3 AND end_datetime > $2) -- Fórmula matemática de intersección de intervalos
      )
    `;
    const overlapRes = await client.query(overlapQuery, [providerId, startISO, endISO]);

    if (overlapRes.rows.length > 0) {
      // 409 Conflict: El recurso ya existe/está ocupado
      await client.query('ROLLBACK');
      return res.status(409).json({ 
        error: 'El horario seleccionado no está disponible (Choque con otra cita)' 
      });
    }

    // ---------------------------------------------------------
    // PASO D: Insertar la Reserva (Persistencia)
    // ---------------------------------------------------------
    const insertQuery = `
      INSERT INTO Bookings (
        client_id, provider_id, service_id, pet_id,
        booking_datetime, end_datetime,
        price_at_booking, service_name_snapshot,
        status, payment_status, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending', 'unpaid', $9)
      RETURNING *
    `;
    
    const newBooking = await client.query(insertQuery, [
      clientId, providerId, serviceId, petId,
      startISO, endISO,
      service.price, service.name,
      notes || null
    ]);

    // ---------------------------------------------------------
    // PASO E: (Opcional) Crear Notificación para el Proveedor
    // ---------------------------------------------------------
    const notifQuery = `
        INSERT INTO Notifications (user_id, type, title, message)
        VALUES ($1, 'booking_update', 'Nueva Solicitud de Reserva', 'Tienes una nueva solicitud pendiente.')
    `;
    await client.query(notifQuery, [providerId]);


    await client.query('COMMIT'); // Confirmar todo
    
    res.status(201).json({
      message: 'Reserva creada exitosamente',
      booking: newBooking.rows[0]
    });

  } catch (error) {
    await client.query('ROLLBACK'); // Revertir cambios si algo falla
    console.error('Error en createBooking:', error);
    
    // Diferenciar errores de negocio vs errores de sistema
    if (error.message.includes('Servicio') || error.message.includes('proveedor')) {
        return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Error interno del servidor al procesar la reserva' });
  } finally {
    client.release(); // IMPORTANTE: Devolver conexión al pool
  }
};

/**
 * OBTENER MIS RESERVAS
 * Soporta filtros por estado y paginación básica
 */
const getMyBookings = async (req, res) => {
    const userId = req.user.user_id;
    const role = req.user.role; 
    const { status } = req.query; // ?status=pending

    let query = `
        SELECT 
            b.*, 
            s.name as service_name, 
            p.name as pet_name,
            u.first_name as other_party_name,
            u.profile_picture_url as other_party_photo
        FROM Bookings b
        JOIN Services s ON b.service_id = s.service_id
        JOIN Pets p ON b.pet_id = p.pet_id
    `;

    // JOIN dinámico: Si soy cliente, quiero ver los datos del PROVEEDOR (u). 
    // Si soy proveedor, quiero ver los datos del CLIENTE (u).
    if (role === 'client') {
        query += ` JOIN Users u ON b.provider_id = u.user_id WHERE b.client_id = $1`;
    } else {
        query += ` JOIN Users u ON b.client_id = u.user_id WHERE b.provider_id = $1`;
    }

    const queryParams = [userId];

    // Filtro opcional por estado
    if (status) {
        query += ` AND b.status = $2`;
        queryParams.push(status);
    }

    query += ` ORDER BY b.booking_datetime DESC`;

    try {
        const result = await db.query(query, queryParams);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el historial' });
    }
};

/**
 * ACTUALIZAR ESTADO (Aceptar/Rechazar/Cancelar)
 */
const updateBookingStatus = async (req, res) => {
    const userId = req.user.user_id;
    const role = req.user.role;
    const { id } = req.params; // booking_id
    const { status } = req.body; // 'confirmed', 'rejected', 'cancelled'

    // Validar transiciones permitidas (Máquina de estados simple)
    const validStatuses = ['confirmed', 'rejected', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Estado no válido' });
    }

    try {
        // Verificar que la reserva pertenezca al usuario que intenta modificarla
        // Lógica: 
        // - El Proveedor puede pasar de 'pending' a 'confirmed' o 'rejected'.
        // - El Cliente puede pasar de 'pending' a 'cancelled'.
        
        const bookingRes = await db.query('SELECT * FROM Bookings WHERE booking_id = $1', [id]);
        if (bookingRes.rows.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
        
        const booking = bookingRes.rows[0];

        // Validaciones de permisos (Authorization Logic)
        if (role === 'provider' && booking.provider_id !== userId) {
            return res.status(403).json({ error: 'No tienes permiso para modificar esta reserva' });
        }
        if (role === 'client' && booking.client_id !== userId) {
            return res.status(403).json({ error: 'No tienes permiso para modificar esta reserva' });
        }

        // Ejecutar Update
        const updateQuery = `
            UPDATE Bookings 
            SET status = $1, updated_at = NOW() 
            WHERE booking_id = $2 
            RETURNING *
        `;
        const updatedBooking = await db.query(updateQuery, [status, id]);

        // (Opcional) Aquí dispararías otra notificación al usuario afectado
        
        res.json(updatedBooking.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
};

module.exports = {
  createBooking,
  getMyBookings,
  updateBookingStatus
};