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
import StatsCard from '../../Components/StatsCard.jsx';
import BookingCard  from '../../Components/BookingCard.jsx';
import ClientBookingDetailModal from '../../Components/ClientBookingDetailModal.jsx';
import ClientRescheduleModal from '../../Components/ClientRescheduleModal.jsx';
import ReviewCard from '../../Components/ReviewCard.jsx';
// import BarChartComponent from '../../Components/BarChart.jsx';




export default function DashboardHomeProvider() {
const [detailModalOpen, setDetailModalOpen] = useState(false)
const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false)
const [selectedBooking, setSelectedBooking] = useState(null)


  const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success', // 'success', 'error', 'warning', 'info'
  });




  const upcomingBookings = [
    {
      id: "1",
      serviceType: "Paseo de perros",
      providerName: "Tú",
      petName: "Max (Golden Retriever)",
      date: "Marzo 15, 2025",
      time: "10:00 AM - 11:00 AM",
      location: "Área de Central Park",
      price: 25,
      status: "confirmado",
    },
    {
      id: "2",
      serviceType: "Paseo de perros",
      providerName: "Tú",
      petName: "Buddy (Labrador)",
      date: "Marzo 15, 2025",
      time: "2:00 PM - 3:00 PM",
      location: "Riverside Park",
      price: 25,
      status: "confirmado" ,
    },
    {
      id: "3",
      serviceType: "Paseo de perros",
      providerName: "Tú",
      petName: "Charlie (Beagle)",
      date: "Marzo 16, 2025",
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
]

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
    setDetailModalOpen(false);
    setSnackbar({
      open: true,
      message: 'Message sent successfully. They will respond shortly.',
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
        <main className='flex  py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>




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
