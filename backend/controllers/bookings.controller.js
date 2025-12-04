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
  const clientId = req.user.id; 
  const { providerId, serviceId, petId, startDateTime, notes, quantity = 1 } = req.body;

  if (!providerId || !serviceId || !petId || !startDateTime) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const bookingStart = parseISO(startDateTime);
  if (!isValid(bookingStart)) {
    return res.status(400).json({ error: 'Formato de fecha inválido.' });
  }

  if (isBefore(bookingStart, new Date())) {
    return res.status(400).json({ error: 'No se pueden crear reservas en el pasado' });
  }

  const client = await db.pool.connect(); 

  try {
    await client.query('BEGIN'); 
    const serviceRes = await client.query(
      `SELECT 
          price, duration_minutes, name, provider_id, 
          price_unit, service_days 
       FROM Services WHERE service_id = $1`, 
      [serviceId]
    );

    if (serviceRes.rows.length === 0) throw new Error('Servicio no encontrado');
    const service = serviceRes.rows[0];

    if (String(service.provider_id) !== String(providerId)) {
        throw new Error('El servicio no corresponde al proveedor seleccionado');
    }

    const dayName = format(bookingStart, 'EEEE').toLowerCase(); 

    if (service.service_days && service.service_days.length > 0) {
        if (!service.service_days.includes(dayName)) {
            // Traducimos el día para el mensaje de error
            const diasEsp = { monday: 'Lunes', tuesday: 'Martes', wednesday: 'Miércoles', thursday: 'Jueves', friday: 'Viernes', saturday: 'Sábado', sunday: 'Domingo' };
            throw new Error(`Este servicio no está disponible los ${diasEsp[dayName] || dayName}.`);
        }
    }

    let bookingEnd;
    const qty = Math.max(1, Number(quantity));

    switch (service.price_unit) {
        case 'hour':
            bookingEnd = addHours(bookingStart, qty);
            break;
        case 'day':   
        case 'night': 
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
            bookingEnd = addMinutes(bookingStart, service.duration_minutes || 60);
            break;
    }
    
    const startISO = bookingStart.toISOString();
    const endISO = bookingEnd.toISOString();

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
        error: 'El horario seleccionado ya está ocupado por otra cita.' 
      });
    }

    const totalPrice = Number(service.price) * qty;

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
      totalPrice,
      service.name,
      notes || null
    ]);

    // Notificación
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
    
    // Devolvemos el mensaje de error limpio
    res.status(400).json({ error: error.message || 'Error interno del servidor' });
  } finally {
    client.release();
  }
};

const getMyBookings = async (req, res) => {
    // Usamos req.user.id consistentemente
    const userId = req.user.id || req.user.user_id; 
    const role = req.user.role; 
    const { status } = req.query;

    console.log(`📅 Buscando reservas para: ${role} ${userId}`);

    // Construimos la query con nombres explícitos para evitar errores
    let query = `
        SELECT 
            b.booking_id,
            b.booking_datetime,
            b.end_datetime,
            b.status,
            b.price_at_booking,
            b.service_name_snapshot,
            b.notes,
            b.service_location,
            
            -- Datos del Servicio
            s.service_id,
            s.name as service_name,
            s.price_unit,  -- <--- CORREGIDO: Nombre real en DB
            s.duration_minutes as service_duration,

            -- Datos de la Mascota
            p.pet_id,
            p.name as pet_name,
            p.species as pet_species,
            p.photo_url as pet_image,
            p.age as pet_age,
            p.weight_kg as pet_weight,

            -- Datos de la Otra Parte (Usuario)
            -- Concatenamos nombre y apellido
            u.first_name || ' ' || u.last_name as other_party_name,
            u.profile_picture_url as other_party_photo,
            u.phone_number,
            u.email

        FROM Bookings b
        -- Usamos LEFT JOIN para que si se borra el servicio/mascota, la reserva siga visible
        LEFT JOIN Services s ON b.service_id = s.service_id
        LEFT JOIN Pets p ON b.pet_id = p.pet_id
    `;

    // JOIN dinámico según el rol
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
        console.log(`✅ Encontradas ${result.rows.length} reservas.`);
        res.json(result.rows);
    } catch (error) {
        // Este log aparecerá en tu terminal del backend y te dirá la causa exacta
        console.error("🔥 SQL Error en getMyBookings:", error.message);
        res.status(500).json({ error: 'Error al obtener el historial de reservas' });
    }
};

const updateBookingStatus = async (req, res) => {
    const userId = req.user.id || req.user.user_id;
    const role = req.user.role;
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['confirmed', 'rejected', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Estado no válido' });

    try {
        const bookingRes = await db.query('SELECT * FROM Bookings WHERE booking_id = $1', [id]);
        if (bookingRes.rows.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
        const booking = bookingRes.rows[0];
        
        if (role === 'provider' && String(booking.provider_id) !== String(userId)) return res.status(403).json({ error: 'No autorizado' });
        if (role === 'client' && String(booking.client_id) !== String(userId)) return res.status(403).json({ error: 'No autorizado' });

        const updateQuery = `UPDATE Bookings SET status = $1, updated_at = NOW() WHERE booking_id = $2 RETURNING *`;
        const updatedBooking = await db.query(updateQuery, [status, id]);
        res.json(updatedBooking.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar' });
    }
};

module.exports = {
  createBooking,
  getMyBookings,
  updateBookingStatus
};