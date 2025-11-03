import { useState } from 'react';

// MUI Components
import { Button, Snackbar, Alert } from '@mui/material';

// Icons MUI
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Calendar } from 'lucide-react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Routers...
import { Link, NavLink } from 'react-router-dom';

// Componentes
import StatsCard from '../../Components/StatsCard';
import BookingCard  from '../../Components/BookingCard';
import PetCard from '../../Components/PetCard';
import ClientBookingDetailModal from '../../Components/ClientBookingDetailModal.jsx';
import ClientRescheduleModal from '../../Components/ClientRescheduleModal.jsx';
import PetDetailModal from '../../Components/PetDetailModal.jsx';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MovingIcon from '@mui/icons-material/Moving';
import ReviewCard from '../../Components/ReviewCard.jsx';


export default function DashboardHomeProvider() {
const [detailModalOpen, setDetailModalOpen] = useState(false)
const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false)
const [selectedBooking, setSelectedBooking] = useState(null)


  const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success', // 'success', 'error', 'warning', 'info'
  });


  const stats = {
    totalEarnings: 2450,
    pendingBookings: 5,
    rating: 4.9,
    completedServices: 127,
  }

  const upcomingBookings = [
    {
      id: "1",
      serviceType: "Dog Walking",
      providerName: "You",
      petName: "Max (Golden Retriever)",
      date: "March 15, 2025",
      time: "10:00 AM - 11:00 AM",
      location: "Central Park Area",
      price: 25,
      status: "confirmado",
    },
    {
      id: "2",
      serviceType: "Dog Walking",
      providerName: "You",
      petName: "Buddy (Labrador)",
      date: "March 15, 2025",
      time: "2:00 PM - 3:00 PM",
      location: "Riverside Park",
      price: 25,
      status: "confirmado" ,
    },
    {
      id: "3",
      serviceType: "Dog Walking",
      providerName: "You",
      petName: "Charlie (Beagle)",
      date: "March 16, 2025",
      time: "9:00 AM - 10:00 AM",
      location: "Downtown Area",
      price: 25,
      status: "pendiente",
    },
  ]


const recentReviews = [
  {
    id: 1,
    client: "John Smith",
    rating: 5,
    comment: "Sarah was amazing with Max! Very professional and my dog loved the walk.",
    date: "2 days ago",
  },
  {
    id: 2,
    client: "Emily Davis",
    rating: 5,
    comment: "Great service, very punctual and caring. Highly recommend!",
    date: "5 days ago",
  },
  {
    id: 3,
    client: "Michael Brown",
    rating: 4,
    comment: "Good experience overall. Would book again.",
    date: "1 week ago",
  },
];

  const handleViewDetails = (booking) => {
    const detailedBooking = {
      ...booking,
      providerImage: "/placeholder.svg",
      providerRating: 4.9,
      providerPhone: "+1 (555) 987-6543",
      providerEmail: "sarah.j@petcare.com",
      bookingId: `BK-${booking.id.padStart(6, "0")}`,
      notes: "Please bring water and treats. Max loves to play fetch!",
    }
    setSelectedBooking(detailedBooking)
    setDetailModalOpen(true)
  }

  const handleReschedule = (booking) => {
    setSelectedBooking(booking)
    setRescheduleModalOpen(true)
  }



  const handleMessageSent = () => {
    setDetailModalOpen(false); // Cierra el modal
    setSnackbar({ // Y activa el Snackbar
      open: true,
      message: 'Message sent successfully. They will respond shortly.',
      severity: 'success',
    });
    // La navegación a /client/messages la manejará el modal hijo
  };

  // <-- CAMBIO 3: Añadir la función para cerrar el Snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };


  
  return (
        <main className='flex  py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
            <div className='w-full h-auto grid grid-cols-12 gap-6'>
              <StatsCard title="Ganancias totales" value={`$ ${stats.totalEarnings}`} icon={AttachMoneyIcon} />
              <StatsCard title="Reservas pendientes" value={stats.pendingBookings} icon={CalendarTodayIcon} />
              <StatsCard title="Calificación" value={stats.rating} icon={StarBorderIcon} />
              <StatsCard title="Completados" value={stats.completedServices} icon={MovingIcon} />
            </div>


            {/* Segunda sección */}
            <div className='w-full h-auto grid grid-cols-12 gap-4'>

              {/* Sección PRÓXIMAS RESERVAS */}
              <div className='flex flex-col h-full border-2 gap-6 border-gray-200 rounded-lg p-10 bg-white  justify-between col-span-12  xl:col-span-8'>
                <div className='flex flex-row justify-between items-center w-full'>
                  <h1 className='text-2xl font-semibold'>PRÓXIMAS RESERVAS</h1>
                  <NavLink to='' className='text-[#005c71] font-medium hover:underline text-mxs'>Ver todas</NavLink>
                </div>
                {/* CARDS */}
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  {...booking}
                  onViewDetails={() => handleViewDetails(booking)}
                  onReschedule={() => handleReschedule(booking)}
                />
                ))
               ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-xl border-2 border-dashed">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">No hay reservas próximas</p>
                    <Link href="/client/search">
                      <Button variant="outlined" size="small" sx={{textTransform: 'none' , height: 40, fontFamily:'Poppins, sans-serif',borderRadius: 3, bgcolor:'#fff',color: '#000000ff', borderColor:'#ccc','&:hover': { bgcolor: '#f37556' } }}>Buscar Servicios</Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Sección MIS MASCOTAS */}
              <div className='flex flex-col h-full border-2 gap-6 border-gray-200 p-10 rounded-lg bg-white col-span-12  xl:col-span-4'>

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
                <ClientBookingDetailModal
                open={detailModalOpen}
                onOpenChange={setDetailModalOpen}
                booking={selectedBooking}
                onMessage={handleMessageSent}
                />
                <ClientRescheduleModal
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
