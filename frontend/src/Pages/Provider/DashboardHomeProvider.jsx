import React, { useState, useEffect } from 'react';

// MUI Components
import { Snackbar, Alert, CircularProgress } from '@mui/material';

// Icons MUI
import { Calendar } from 'lucide-react';

// Routers
import { NavLink, useNavigate } from 'react-router-dom';

// Servicios
import { bookingService } from '../../services/bookingService';
import { reviewsService } from '../../services/reviewsService';

// Utilidades
import { format, isFuture, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

// Componentes
import BookingCardProvider from '../../Components/BookingCardProvider.jsx';
import ReviewCard from '../../Components/ReviewCard.jsx';

// Modales
import ProviderBookingDetailModal from '../../Components/ProviderBookingDetailModal.jsx';
import ProviderRescheduleModal from '../../Components/ProviderRescheduleModal.jsx';

export default function DashboardHomeProvider() {
  const navigate = useNavigate();
  
  // --- Estados de UI ---
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);

  // Estados para Modales
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // --- Estados de Datos ---
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);

  // --- Helpers de Mapeo ---
  const mapStatusToSpanish = (status) => {
    const map = {
        'pending': 'pendiente',
        'confirmed': 'confirmado',
        'completed': 'completado',
        'cancelled': 'cancelado',
        'rejected': 'rechazado'
    };
    return map[status] || status;
  };

  // --- CARGA DE DATOS ---
  const fetchData = async () => {
    try {
      setLoading(true);
      
      const userStr = localStorage.getItem('user');
      if (!userStr) { navigate('/login/prestador'); return; }
      const user = JSON.parse(userStr);

      const [bookingsData, reviewsData] = await Promise.all([
        bookingService.getAll(),
        reviewsService.getByProviderId(user.id)
      ]);

      // 1. Procesar Reservas (Próximas)
      const futureBookings = bookingsData
        .filter(b => {
            const isActive = b.status === 'confirmed' || b.status === 'pending';
            const isFutureDate = isFuture(new Date(b.booking_datetime));
            return isActive && isFutureDate;
        })
        .sort((a, b) => new Date(a.booking_datetime) - new Date(b.booking_datetime))
        .slice(0, 4);

      const mappedBookings = futureBookings.map(b => ({
        id: b.booking_id,
        service: b.service_name_snapshot,
        serviceType: b.service_name_snapshot,
        
        clientName: b.other_party_name || "Cliente",
        clientImage: b.other_party_photo,
        
        petImage: b.pet_image,
        pet: b.pet_name,
        petName: b.pet_name,
        petType: b.pet_species,
        petAge: b.pet_age ? `${b.pet_age} años` : "N/A",
        petWeight: b.pet_weight ? `${b.pet_weight} kg` : "",
        
        date: format(new Date(b.booking_datetime), "MMMM d, yyyy", { locale: es }),
        time: format(new Date(b.booking_datetime), "h:mm a"),
        duration: b.service_duration ? `${b.service_duration} min` : "N/A",
        location: b.service_location || b.address || "Ubicación del cliente",
        
        phone: b.phone_number,
        email: b.email,
        price: Number(b.price_at_booking),
        status: mapStatusToSpanish(b.status),
        rawStatus: b.status, 
        
        notes: b.notes,
        bookingId: `BK-${b.booking_id.toString().padStart(4, '0')}`
      }));

      setUpcomingBookings(mappedBookings);

      // 2. Procesar Reseñas
      const mappedReviews = (reviewsData.items || []).slice(0, 3).map(r => ({
        id: r.review_id,
        client: `${r.first_name} ${r.last_name}`,
        rating: r.rating,
        comment: r.comment,
        date: formatDistanceToNow(new Date(r.created_at), { addSuffix: true, locale: es })
      }));
      setRecentReviews(mappedReviews);

    } catch (error) {
      console.error("Error cargando dashboard provider:", error);
      setSnackbar({ open: true, message: 'Error al cargar información', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLERS ---

  const handleStatusChange = async (bookingId, newStatus, successMsg) => {
    try {
        await bookingService.updateStatus(bookingId, newStatus);
        setSnackbar({ open: true, message: successMsg, severity: 'success' });
        fetchData();
    } catch {
        setSnackbar({ open: true, message: 'Error al actualizar reserva', severity: 'error' });
    }
  };

  const handleAccept = (booking) => {
    handleStatusChange(booking.id, 'confirmed', `Reserva aceptada correctamente.`);
  };

  const handleCancel = (booking) => {
    const action = booking.rawStatus === 'pending' ? 'rejected' : 'cancelled';
    const text = booking.rawStatus === 'pending' ? 'rechazar' : 'cancelar';
    
    if(window.confirm(`¿Seguro que deseas ${text} esta reserva?`)){
        handleStatusChange(booking.id, action, `Reserva ${action === 'rejected' ? 'rechazada' : 'cancelada'}.`);
    }
  };

  // --- HANDLERS DE MODALES ---

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setDetailModalOpen(true);
  };

  const handleReschedule = (booking) => {
    setSelectedBooking(booking);
    setRescheduleModalOpen(true);
  };

  const handleMessageSent = () => {
    setDetailModalOpen(false);
    setSnackbar({ open: true, message: 'Chat próximamente disponible.', severity: 'info' });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
          <CircularProgress sx={{ color: '#005c71' }} />
      </div>
    );
  }

  return (
    <main className='flex py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
      
      {/* SE HAN ELIMINADO LAS TARJETAS DE ESTADÍSTICAS */}

      <div className='w-full h-auto grid grid-cols-12 gap-4'>

        {/* Sección PRÓXIMAS RESERVAS */}
        <div className='flex flex-col h-full border-2 gap-6 border-gray-200 rounded-lg p-10 bg-white justify-between col-span-12 xl:col-span-8'>
          <div className='flex flex-row justify-between items-center w-full'>
            <h1 className='text-2xl font-semibold'>PRÓXIMAS RESERVAS</h1>
            <NavLink to='/provider/bookings' className='text-[#005c71] font-medium hover:underline text-mxs'>Ver todas</NavLink>
          </div>
          
          {/* CARDS DINÁMICAS */}
          {upcomingBookings.length > 0 ? (
            <div className="flex flex-col gap-4">
              {upcomingBookings.map((booking) => (
                <BookingCardProvider
                  key={booking.id}
                  {...booking}
                  client={booking.clientName}
                  // Conectamos los handlers restaurados
                  onViewDetails={() => handleViewDetails(booking)}
                  onReschedule={() => handleReschedule(booking)}
                  onCancel={() => handleCancel(booking)}
                  onAccept={() => handleAccept(booking)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No tienes reservas próximas</p>
            </div>
          )}
        </div>

        {/* Sección RESEÑAS */}
        <div className='flex flex-col h-full border-2 gap-6 border-gray-200 p-10 rounded-lg bg-white col-span-12 xl:col-span-4'>
          <div className='flex flex-row justify-between items-center w-full'>
            <h1 className='text-2xl font-semibold'>RESEÑAS RECIENTES</h1>
          </div>
          <div className='space-y-4'>
            {recentReviews.length > 0 ? (
                recentReviews.map((review) => (
                <div key={review.id} className='border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden'>
                    <ReviewCard {...review} />
                </div>
                ))
            ) : (
                <p className="text-center text-gray-400 py-10">Aún no tienes reseñas.</p>
            )}
          </div>
        </div>
      </div>

      {/* Renderizado de Modales */}
      {selectedBooking && (
        <>
          <ProviderBookingDetailModal
            open={detailModalOpen}
            onOpenChange={setDetailModalOpen}
            booking={selectedBooking}
            onMessage={handleMessageSent}
          />
          <ProviderRescheduleModal
            open={rescheduleModalOpen}
            onOpenChange={setRescheduleModalOpen}
            booking={selectedBooking}
          />
        </>
      )}

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