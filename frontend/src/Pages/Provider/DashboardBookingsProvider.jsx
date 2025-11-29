import React, { useState, useEffect, useMemo } from 'react';
import { Box, Tabs, Tab, Snackbar, Alert, CircularProgress } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format, isPast } from 'date-fns';
import { es } from 'date-fns/locale';

// Servicios
import { bookingService } from '../../services/bookingService';

// Componentes
import BookingCardProvider from '../../Components/BookingCardProvider';
import ProviderBookingDetailModal from '../../Components/ProviderBookingDetailModal';
import ProviderRescheduleModal from '../../Components/ProviderRescheduleModal';

export default function DashboardBookingsProvider() {

  // --- 1. ESTADOS DE DATOS ---
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 2. ESTADOS DE UI ---
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentTab, setCurrentTab] = useState('proximas');
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // --- 3. CARGA DE DATOS (API) ---
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getAll();
      setAllBookings(data);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
      showSnackbar('Error al cargar las reservas', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // --- 4. MAPEO DE DATOS (Backend -> Component Props) ---
  const mapBookingToUI = (b) => {
    const dateObj = new Date(b.booking_datetime);
    
    return {
      id: b.booking_id,
      bookingId: `BK-${b.booking_id.toString().padStart(4, '0')}`,
      
      // Datos del Cliente (La "otra parte" para el proveedor)
      clientName: b.other_party_name || "Cliente Desconocido", 
      clientImage: b.other_party_photo, // Asegúrate que tu backend envíe esto
      phone: b.phone_number || "No disponible",
      email: b.email || "No disponible",
      
      // Datos del Servicio/Mascota
      service: b.service_name_snapshot,
      serviceType: b.service_name_snapshot, // Para modal
      pet: b.pet_name,
      petName: b.pet_name, // Para modal
      petType: b.pet_species || "Mascota",
      petAge: "N/A", // Dato pendiente en backend
      petWeight: b.pet_weight ? `${b.pet_weight} kg` : "N/A",
      
      // Fecha y Estado
      date: format(dateObj, "MMMM d, yyyy", { locale: es }),
      time: format(dateObj, "h:mm a"),
      rawDate: dateObj, // Objeto fecha real para lógica de filtrado
      duration: '1h', // Dato pendiente en backend
      location: b.service_location || b.address || "Ubicación del cliente",
      
      price: Number(b.price_at_booking),
      status: b.status, // 'pending', 'confirmed', 'completed', 'cancelled', 'rejected'
      notes: b.notes,
    };
  };

  // --- 5. FILTRADO INTELIGENTE (MEMOIZED) ---
  // Divide las reservas en las 3 pestañas automáticamente
  const { upcomingBookings, pendingBookings, completedBookings } = useMemo(() => {
    const mapped = allBookings.map(mapBookingToUI);

    const upcoming = [];
    const pending = [];
    const completed = [];

    mapped.forEach(booking => {
      // Lógica de Negocio para las pestañas
      if (booking.status === 'pending') {
        pending.push(booking);
      } 
      else if (booking.status === 'confirmed') {
        // Si está confirmada pero la fecha ya pasó, la movemos a completada (opcional)
        // O si el estado explícito es 'completed'
        if (isPast(booking.rawDate) && !booking.status === 'completed') { 
             completed.push(booking); 
        } else {
             upcoming.push(booking);
        }
      }
      else if (booking.status === 'completed' || booking.status === 'cancelled' || booking.status === 'rejected') {
        completed.push(booking);
      }
    });

    return { upcomingBookings: upcoming, pendingBookings: pending, completedBookings: completed };
  }, [allBookings]);


  // --- 6. HANDLERS (Acciones con API) ---

  const handleStatusChange = async (bookingId, newStatus, successMessage) => {
    try {
        await bookingService.updateStatus(bookingId, newStatus);
        fetchBookings(); // Recargar datos para mover la tarjeta de pestaña
        setDetailModalOpen(false); // Cerrar modal si estaba abierto
        showSnackbar(successMessage, 'success');
    } catch (error) {
        showSnackbar('No se pudo actualizar el estado de la reserva', 'error');
    }
  };

  const handleAccept = (booking) => {
    handleStatusChange(booking.id, 'confirmed', `¡Has aceptado la cita con ${booking.clientName}!`);
  };

  const handleCancel = (booking) => {
    // Si está pendiente es "Rechazar" (rejected), si está confirmada es "Cancelar" (cancelled)
    const status = booking.status === 'pending' ? 'rejected' : 'cancelled';
    const verb = booking.status === 'pending' ? 'rechazado' : 'cancelado';
    
    if(!window.confirm(`¿Estás seguro de que deseas ${status === 'rejected' ? 'rechazar' : 'cancelar'} esta cita?`)) return;

    handleStatusChange(booking.id, status, `Has ${verb} la cita con ${booking.clientName}.`);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setDetailModalOpen(true);
  }

  const handleMessageClient = () => {
    setDetailModalOpen(false);
    showSnackbar('Funcionalidad de chat próximamente.', 'info');
  }

  const handleReschedule = (booking) => {
    setSelectedBooking(booking);
    setRescheduleModalOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // --- RENDERERS ---

  const renderBookingList = (bookings) => (
    <div className='grid lg:grid-cols-2 gap-6'>
        {bookings.map((booking) => (
            <BookingCardProvider
                key={booking.id}
                {...booking}
                // Mapeo explícito para asegurar que el componente reciba lo que espera
                client={booking.clientName} 
                onViewDetails={() => handleViewDetails(booking)}
                onReschedule={() => handleReschedule(booking)}
                onCancel={() => handleCancel(booking)} // Sirve para Rechazar o Cancelar según estado
                onAccept={() => handleAccept(booking)}
                onMessageClient={() => handleMessageClient(booking)}
            />
        ))}
    </div>
  );

  const renderEmptyState = (message) => (
    <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
        <CalendarTodayIcon sx={{fontSize: 40, marginX:'auto', marginBottom:2, color:'text.disabled'}} />
        <p className="text-gray-500 mb-4">{message}</p>
    </div>
  );

  if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress sx={{ color: '#005c71' }} />
        </Box>
      );
  }

  return (
    <main className='flex py-10 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
      <div className='w-full h-auto flex flex-col gap-6'>
        
        {/* Header */}
        <div className='flex flex-col h-full gap-4 p-0 align-items-center justify-center col-span-12'>
          <h1 className='text-4xl font-bold'>Reservas</h1>
          <p className="text-gray-400">Administra tus reservas de servicios y citas</p>
        </div>

        {/* Tabs y Contenido */}
        <div className='flex flex-col gap-6 h-full rounded-lg p-0 align-items-center justify-center col-span-12'>
          
          <Box sx={{ width: 'fit-content', bgcolor: '#ebebeb', borderRadius: 3, padding: 0.5 }}>
            <Tabs 
                value={currentTab} 
                onChange={handleTabChange} 
                aria-label="Booking Tabs" 
                slotProps={{ indicator: { style: { display: "none"} } }}
                sx={{ minHeight:'auto' }}
            >
                <Tab label={`Próximas (${upcomingBookings.length})`} value="proximas" sx={tabStyle} />
                <Tab label={`Pendientes (${pendingBookings.length})`} value="pendiente" sx={tabStyle} />
                <Tab label={`Historial (${completedBookings.length})`} value="completado" sx={tabStyle} />
            </Tabs>
          </Box>

          {/* Contenido de Tabs */}
          <Box sx={{width:'100%', pt:0}}>
            {currentTab === 'proximas' && (
                upcomingBookings.length > 0 ? renderBookingList(upcomingBookings) : renderEmptyState("No tienes citas próximas confirmadas")
            )}
            {currentTab === 'pendiente' && (
                pendingBookings.length > 0 ? renderBookingList(pendingBookings) : renderEmptyState("No tienes solicitudes pendientes")
            )}
            {currentTab === 'completado' && (
                completedBookings.length > 0 ? renderBookingList(completedBookings) : renderEmptyState("No hay historial de citas")
            )}
          </Box>

        </div>
      </div>

      {/* Modals */}
      {selectedBooking && (
        <>
            <ProviderBookingDetailModal 
                open={detailModalOpen}
                onOpenChange={setDetailModalOpen}
                booking={selectedBooking}
                onMessage={handleMessageClient}
            />
            <ProviderRescheduleModal
                open={rescheduleModalOpen}
                onOpenChange={setRescheduleModalOpen}
                booking={selectedBooking}
            />
        </>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </main>
  );
}

const tabStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    width: '11rem',
    textTransform: 'none',
    borderRadius: 3,
    minHeight:'auto',
    paddingY:1,
    '&.Mui-selected': { 
        bgcolor: '#fff', 
        color: 'text.primary',
        fontWeight: 600
    },
    '&:not(.Mui-selected)': {
        color: 'text.secondary'
    }
};