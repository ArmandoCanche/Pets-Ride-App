const db = require('../db');
const { 
    addMinutes, 
    addHours, 
    addDays, 
    addWeeks, 
    addMonths, 
    parseISO, 
    isValid, 
    isBefore, 
    format 
} = require('date-fns');

const createBooking = async (req, res) => {
  // 1. Obtener cliente del token
  const clientId = req.user.id; 

  // 2. Input: Ahora recibimos 'quantity' (ej: 2 horas, 3 noches)
  // Default quantity = 1 para evitar errores matemáticos
  const { providerId, serviceId, petId, startDateTime, notes, quantity = 1 } = req.body;

  // Validación de entrada
  if (!providerId || !serviceId || !petId || !startDateTime) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  // Parsear fecha
  const bookingStart = parseISO(startDateTime);
  if (!isValid(bookingStart)) {
    return res.status(400).json({ error: 'Formato de fecha inválido. Use ISO 8601' });
  }

  if (isBefore(bookingStart, new Date())) {
    return res.status(400).json({ error: 'No se pueden crear reservas en el pasado' });
  }

  const client = await db.pool.connect(); 

  try {
    await client.query('BEGIN'); 

    // ---------------------------------------------------------
    // PASO A: Obtener metadatos del servicio + UNIDAD DE COBRO
    // ---------------------------------------------------------
    const serviceRes = await client.query(
      'SELECT price, duration_minutes, name, provider_id, price_unit FROM Services WHERE service_id = $1', 
      [serviceId]
    );

    if (serviceRes.rows.length === 0) throw new Error('Servicio no encontrado');
    const service = serviceRes.rows[0];

    // Validación de seguridad
    if (String(service.provider_id) !== String(providerId)) {
        throw new Error('El servicio no corresponde al proveedor seleccionado');
    }

    // ---------------------------------------------------------
    // PASO B: Cálculo Polimórfico de Tiempo (End Date)
    // ---------------------------------------------------------
    let bookingEnd;
    const qty = Math.max(1, Number(quantity)); // Asegurar mínimo 1 y tipo número

    switch (service.price_unit) {
        case 'hour':
            bookingEnd = addHours(bookingStart, qty);
            break;
        case 'day':   
        case 'night': // Hoteles suelen cobrar por noche (24h blocks o check-in/out logic)
            bookingEnd = addDays(bookingStart, qty);
            break;
        case 'week':
            bookingEnd = addWeeks(bookingStart, qty);
            break;
        case 'month':
            bookingEnd = addMonths(bookingStart, qty);
            break;
        case 'session':
        default:
            // Si es por sesión fija, ignoramos la cantidad para el tiempo y usamos la duración base
            bookingEnd = addMinutes(bookingStart, service.duration_minutes || 60);
            break;
    }
    
    const startISO = bookingStart.toISOString();
    const endISO = bookingEnd.toISOString();

    // ---------------------------------------------------------
    // PASO C: Cálculo Financiero (Snapshot del Precio Total)
    // ---------------------------------------------------------
    const unitPrice = Number(service.price);
    const totalPrice = unitPrice * qty;

    // ---------------------------------------------------------
    // PASO D: Validar Disponibilidad (Provider Availability + Overlaps)
    // ---------------------------------------------------------
    
    // 1. Validar si el proveedor trabaja ese día (Lógica básica)
    const dayOfWeekQuery = `SELECT trim(to_char($1::timestamp, 'day')) as day_name`; 
    const dayRes = await client.query(dayOfWeekQuery, [startISO]);
    const dayName = dayRes.rows[0].day_name; 

    // Verificamos si existe un registro activo para ese día
    const scheduleQuery = `
        SELECT * FROM Provider_Availability 
        WHERE provider_id = $1 AND day = $2::day_of_week AND is_active = true
    `;
    const scheduleRes = await client.query(scheduleQuery, [providerId, dayName]);

    if (scheduleRes.rows.length === 0) {
        throw new Error(`El proveedor no trabaja los días ${dayName}`);
    }
    // Nota: Aquí podrías expandir la lógica para verificar si startISO y endISO caen dentro de start_time y end_time del horario.

    // 2. Verificar Colisiones (Double Booking)
    const overlapQuery = `
      SELECT booking_id FROM Bookings 
      WHERE provider_id = $1 
      AND status IN ('confirmed', 'pending') 
      AND (
        (booking_datetime < $3 AND end_datetime > $2)
      )
    `;
    const overlapRes = await client.query(overlapQuery, [providerId, startISO, endISO]);

    if (overlapRes.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ 
        error: 'El horario seleccionado no está disponible (Choque con otra cita)' 
      });
    }

    // ---------------------------------------------------------
    // PASO E: Insertar la Reserva
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
      totalPrice, // <--- Guardamos el total calculado (precio * cantidad)
      service.name,
      notes || null
    ]);

    // ---------------------------------------------------------
    // PASO F: Notificación
    // ---------------------------------------------------------
    const notifQuery = `
        INSERT INTO Notifications (user_id, type, title, message)
        VALUES ($1, 'booking_update', 'Nueva Solicitud', 'Tienes una reserva pendiente de aprobar.')
    `;
    await client.query(notifQuery, [providerId]);

    await client.query('COMMIT');
    
    res.status(201).json({
      message: 'Reserva creada exitosamente',
      booking: newBooking.rows[0]
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error en createBooking:', error);
    
    if (error.message.includes('Servicio') || error.message.includes('proveedor')) {
        return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: error.message || 'Error interno del servidor' });
  } finally {
    client.release();
  }
};

/**
 * OBTENER MIS RESERVAS
 */
const getMyBookings = async (req, res) => {
    // Aseguramos consistencia: Usamos req.user.id como en el resto de la app
    const userId = req.user.id || req.user.user_id; 
    const role = req.user.role; 
    const { status } = req.query;

    let query = `
        SELECT 
            b.*, 
            s.name as service_name,
            s.price_unit, -- Útil para mostrar en el frontend (ej: "5 noches")
            p.name as pet_name,
            p.species as pet_species, -- Agregado para mejor UI
            u.first_name || ' ' || u.last_name as other_party_name,
            u.profile_picture_url as other_party_photo,
            u.phone_number,
            u.email
        FROM Bookings b
        JOIN Services s ON b.service_id = s.service_id
        JOIN Pets p ON b.pet_id = p.pet_id
    `;

    if (role === 'client') {
        query += ` JOIN Users u ON b.provider_id = u.user_id WHERE b.client_id = $1`;
    } else {
        query += ` JOIN Users u ON b.client_id = u.user_id WHERE b.provider_id = $1`;
    }

    const queryParams = [userId];

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
 * ACTUALIZAR ESTADO
 */
const updateBookingStatus = async (req, res) => {
    const userId = req.user.id || req.user.user_id;
    const role = req.user.role;
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['confirmed', 'rejected', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Estado no válido' });
    }

    try {
        const bookingRes = await db.query('SELECT * FROM Bookings WHERE booking_id = $1', [id]);
        if (bookingRes.rows.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
        
        const booking = bookingRes.rows[0];

        // Validaciones de permisos
        if (role === 'provider' && String(booking.provider_id) !== String(userId)) {
            return res.status(403).json({ error: 'No autorizado' });
        }
        if (role === 'client' && String(booking.client_id) !== String(userId)) {
            return res.status(403).json({ error: 'No autorizado' });
        }

        const updateQuery = `
            UPDATE Bookings 
            SET status = $1, updated_at = NOW() 
            WHERE booking_id = $2 
            RETURNING *
        `;
        const updatedBooking = await db.query(updateQuery, [status, id]);
        
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