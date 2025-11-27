import { useState } from 'react';

// MUI Components
import { Button, Snackbar, Alert } from '@mui/material';

// Icons MUI
import { Calendar } from 'lucide-react'; 

// Routers
import { Link, NavLink } from 'react-router-dom';

// Componentes
import BookingCardProvider from '../../Components/BookingCardProvider.jsx';
import ReviewCard from '../../Components/ReviewCard.jsx';

// IMPORTANTE: Usamos los modales del Lado del Prestador
import ProviderBookingDetailModal from '../../Components/ProviderBookingDetailModal.jsx';
import ProviderRescheduleModal from '../../Components/ProviderRescheduleModal.jsx';

export default function DashboardHomeProvider() {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const upcomingBookings = [
    {
      id: "1",
      service: "Paseo de Perros",
      clientName: "Ana Martínez",
      clientImage: "/diverse-woman-portrait.png",
      pet: "Max",
      petType: "Golden Retriever",
      petAge: "3 años",
      petWeight: "30 kg",
      date: "Marzo 15, 2025",
      time: "10:00 AM - 11:00 AM",
      duration: "1 hora",
      location: "Parque Central",
      phone: "+1 (555) 123-4567",
      email: "ana.m@example.com",
      price: 25,
      status: "confirmado",
      rating: 0,
      notes: "A Max le encanta jugar a buscar la pelota.",
      specialRequirements: "Evitar la zona norte del parque (obras).",
    },
    {
      id: "2",
      service: "Estética Canina",
      clientName: "Roberto Gómez",
      clientImage: "/man.jpg",
      pet: "Rocky",
      petType: "Bulldog Francés",
      petAge: "4 años",
      petWeight: "12 kg",
      date: "Marzo 16, 2025",
      time: "4:00 PM - 5:30 PM",
      duration: "1.5 horas",
      location: "Domicilio Cliente",
      phone: "+1 (555) 987-6543",
      email: "r.gomez@example.com",
      price: 50,
      status: "confirmado",
      rating: 0,
      notes: "Piel sensible, usar champú hipoalergénico.",
    },
  ];

  const recentReviews = [
    {
      id: 1,
      client: "Ana Martínez",
      rating: 5,
      comment: "¡Carlos fue increíble con Max! Muy profesional.",
      date: "Hace 2 días",
    },
    {
      id: 2,
      client: "Lucía Fernandez",
      rating: 5,
      comment: "¡Gran servicio, muy puntual!",
      date: "Hace 5 días",
    },
    {
      id: 3,
      client: "Roberto Gómez",
      rating: 4,
      comment: "Buena experiencia en general.",
      date: "Hace 1 semana",
    },
  ];


  const handleViewDetails = (booking) => {
    const detailedBooking = {
      ...booking,
      serviceType: booking.service, 
      petName: booking.pet,
      bookingId: `BK-${booking.id.toString().padStart(6, "0")}`,
    };
    setSelectedBooking(detailedBooking);
    setDetailModalOpen(true);
  };

  const handleReschedule = (booking) => {
    const rescheduleBooking = {
       ...booking,
       serviceType: booking.service,
       petName: booking.pet
    }
    setSelectedBooking(rescheduleBooking);
    setRescheduleModalOpen(true);
  };

  const handleCancel = (booking) => {
    setSnackbar({
      open: true,
      message: `Has solicitado cancelar la cita con ${booking.clientName}.`,
      severity: 'warning',
    });
  };

  const handleAccept = (booking) => {
    setSnackbar({
      open: true,
      message: `Cita con ${booking.clientName} aceptada exitosamente.`,
      severity: 'success',
    });
  };

  const handleMessageSent = () => {
    setDetailModalOpen(false);
    setSnackbar({
      open: true,
      message: 'Mensaje enviado exitosamente.',
      severity: 'success',
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <main className='flex py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
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
                  client={booking.clientName}
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

        {/* Sección RESEÑAS */}
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