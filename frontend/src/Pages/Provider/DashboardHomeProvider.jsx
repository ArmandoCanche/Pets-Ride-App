import { useState } from 'react';

// MUI Components
import { Button, Snackbar, Alert } from '@mui/material';

// Icons MUI
import { Calendar } from 'lucide-react'; // Asegúrate de tener esto instalado o usa CalendarTodayIcon

// Routers
import { Link, NavLink } from 'react-router-dom';

// Componentes
import BookingCardProvider from '../../Components/BookingCardProvider.jsx';
import ClientBookingDetailModal from '../../Components/ClientBookingDetailModal.jsx';
import ClientRescheduleModal from '../../Components/ClientRescheduleModal.jsx';
import ReviewCard from '../../Components/ReviewCard.jsx';
import ProviderBookingDetailModal from '../../Components/ProviderBookingDetailModal.jsx';
import ProviderRescheduleModal from '../../Components/ProviderRescheduleModal.jsx';

export default function DashboardHomeProvider() {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success', 'error', 'warning', 'info'
  });

  const upcomingBookings = [
    {
      id: 1,
      service: "Paseo de Perros",
      client: "Sarah Johnson",
      clientImage: "/diverse-woman-portrait.png",
      pet: "Max",
      petType: "Golden Retriever",
      petAge: "3 años",
      petWeight: "65 lbs",
      date: "2025-01-25",
      time: "10:00 AM",
      duration: "1 hora",
      location: "Central Park, NY",
      phone: "+1 (555) 123-4567",
      email: "sarah.j@example.com",
      price: 25, // Cambiado a número para que tu lógica de `$${price}` funcione mejor
      status: "confirmado",
      rating: 0,
      notes: "A Max le encanta jugar a buscar la pelota y es muy amigable con otros perros.",
      specialRequirements: "Por favor, evita la entrada norte, hay obras en progreso.",
    },
    {
      id: 2,
      service: "Estética Canina",
      client: "Michael Chen",
      clientImage: "/man.jpg",
      pet: "Luna",
      petType: "Gato Persa",
      petAge: "2 años",
      petWeight: "10 lbs",
      date: "2025-01-26",
      time: "2:00 PM",
      duration: "2 horas",
      location: "123 Main St, NY",
      phone: "+1 (555) 987-6543",
      email: "m.chen@example.com",
      price: 60,
      status: "confirmado",
      rating: 0,
      notes: "Luna es un poco tímida, por favor, sé cuidadoso/a durante el aseo.",
    },
  ];

  const recentReviews = [
    {
      id: 1,
      client: "John Smith",
      rating: 5,
      comment: "¡Sarah fue increíble con Max! Muy profesional y a mi perro le encantó el paseo.",
      date: "Hace 2 días",
    },
    {
      id: 2,
      client: "Emily Davis",
      rating: 5,
      comment: "¡Gran servicio, muy puntuales y atentos. ¡Los recomiendo ampliamente!",
      date: "Hace 5 días",
    },
    {
      id: 3,
      client: "Michael Brown",
      rating: 4,
      comment: "Buena experiencia en general. Volvería a reservar.",
      date: "Hace 1 semana",
    },
  ];

  // --- HANDLERS (Lógica de los botones) ---

  const handleViewDetails = (booking) => {
    // Simulamos datos extra que podrían venir de una API
    const detailedBooking = {
      ...booking,
      providerImage: "/placeholder.svg",
      providerRating: 4.9,
      providerPhone: "+1 (555) 987-6543",
      providerEmail: "sarah.j@petcare.com",
      bookingId: `BK-${booking.id.toString().padStart(6, "0")}`,
    };
    setSelectedBooking(detailedBooking);
    setDetailModalOpen(true);
  };

  const handleReschedule = (booking) => {
    console.log("Reprogramando:", booking);
    setSelectedBooking(booking);
    setRescheduleModalOpen(true);
  };

  const handleCancel = (booking) => {
    setSnackbar({
      open: true,
      message: `Has solicitado cancelar la cita con ${booking.client}.`,
      severity: 'warning',
    });
  };

  const handleAccept = (booking) => {
    // Lógica para aceptar citas pendientes
    setSnackbar({
      open: true,
      message: `Cita con ${booking.client} aceptada exitosamente.`,
      severity: 'success',
    });
  };

  const handleMessageSent = () => {
    setDetailModalOpen(false);
    // Si tienes un modal de mensajes, ciérralo también aquí
    setSnackbar({
      open: true,
      message: 'Mensaje enviado exitosamente.',
      severity: 'success',
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <main className='flex py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
      
      {/* Sección Principal */}
      <div className='w-full h-auto grid grid-cols-12 gap-4'>

        {/* Sección PRÓXIMAS RESERVAS */}
        <div className='flex flex-col h-full border-2 gap-6 border-gray-200 rounded-lg p-10 bg-white justify-between col-span-12 xl:col-span-8'>
          <div className='flex flex-row justify-between items-center w-full'>
            <h1 className='text-2xl font-semibold'>PRÓXIMAS RESERVAS</h1>
            <NavLink to='/provider/bookings' className='text-[#005c71] font-medium hover:underline text-mxs'>Ver todas</NavLink>
          </div>
          
          {/* CARDS */}
          {upcomingBookings.length > 0 ? (
            <div className="flex flex-col gap-4">
              {upcomingBookings.map((booking) => (
                <BookingCardProvider
                  key={booking.id}
                  {...booking}
                  onViewDetails={() => handleViewDetails(booking)}
                  onReschedule={() => handleReschedule(booking)}
                  onCancel={() => handleCancel(booking)}
                  onAccept={() => handleAccept(booking)}
                  onMessageClient={() => {
                     setSnackbar({ open: true, message: 'Abriendo chat...', severity: 'info' })
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-xl border-2 border-dashed">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">No hay reservas próximas</p>
              <Link to="/client/search"> 
                <Button variant="outlined" size="small" sx={{ textTransform: 'none', height: 40, fontFamily: 'Poppins, sans-serif', borderRadius: 3, bgcolor: '#fff', color: '#000000ff', borderColor: '#ccc', '&:hover': { bgcolor: '#f37556' } }}>Buscar Servicios</Button>
              </Link>
            </div>
          )}
        </div>

        <div className='flex flex-col h-full border-2 gap-6 border-gray-200 p-10 rounded-lg bg-white col-span-12 xl:col-span-4'>
          <div className='flex flex-row justify-between items-center w-full'>
            <h1 className='text-2xl font-semibold'> RESEÑAS RECIENTES</h1>
          </div>
          <div className='space-y-4'>
            {recentReviews.map((review) => (
              <div key={review.id} className='border-1 border-gray-200 rounded-3xl shadow-sm'>
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        </div>
      </div>

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
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </main>
  );
}