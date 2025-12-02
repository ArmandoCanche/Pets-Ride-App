import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

// MUI Components
import { Button, Snackbar, Alert, CircularProgress } from '@mui/material';

// Icons MUI
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Calendar } from 'lucide-react';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import EmergencyIcon from '@mui/icons-material/Emergency';

// Routers
import { Link, NavLink } from 'react-router-dom';

// Servicios
import { bookingService } from '../../services/bookingService';
import { petsService } from '../../services/petsService';
import { reviewsService } from '../../services/reviewsService';

// Utilidades de fecha
import { format, isFuture, differenceInYears } from 'date-fns';
import { es } from 'date-fns/locale';

// Componentes
import StatsCard from '../../Components/StatsCard.jsx';
import BookingCard from '../../Components/BookingCard.jsx';
import PetCard from '../../Components/PetCard.jsx';
import ClientBookingDetailModal from '../../Components/ClientBookingDetailModal.jsx';
import ClientRescheduleModal from '../../Components/ClientRescheduleModal.jsx';
import PetDetailModal from '../../Components/PetDetailModal.jsx';
import CategoryCard from '../../Components/CategoryCard.jsx';
import EditPetModal from '../../Components/EditPetModal.jsx';

export default function DashboardHomeClient() {

  // --- Estados de UI ---
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [petDetailModalOpen, setPetDetailModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showServices, setShowServices] = useState(false);
  const [createPetModalOpen, setCreatePetModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // --- Estados de Datos ---
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingCount: 0,
    activePets: 0,
    reviewsCount: 0,
  });

  // Helper para traducir status (Backend ENG -> Frontend ESP)
  // Esto asegura que BookingCard muestre los botones correctos (Detalles, Reprogramar, Cancelar)
  const mapStatusToSpanish = (status) => {
    const map = {
        'pending': 'pendiente',
        'confirmed': 'confirmado', // Esto activará los 3 botones en BookingCard
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
      
      // Llamadas paralelas a la API
      const [bookingsData, petsData, reviewsCountData] = await Promise.all([
        bookingService.getAll(),
        petsService.getAll(),
        reviewsService.getMyReviewCount()
      ]);

      // 1. Procesar Reservas (Filtrar futuras y mapear)
      const futureBookings = bookingsData
        .filter(b => {
            const isActive = b.status === 'confirmed' || b.status === 'pending';
            const isFutureDate = isFuture(new Date(b.booking_datetime));
            return isActive && isFutureDate;
        })
        .sort((a, b) => new Date(a.booking_datetime) - new Date(b.booking_datetime));

      // Mapeo para BookingCard
      const mappedBookings = futureBookings.slice(0, 3).map(b => ({
        id: b.booking_id,
        // Datos para la tarjeta
        serviceType: b.service_name_snapshot,
        providerName: b.other_party_name || "Proveedor",
        // providerImage: b.other_party_photo, // Si tienes foto
        petName: b.pet_name,
        
        // Formato de fecha y hora visual
        date: format(new Date(b.booking_datetime), "MMMM d, yyyy", { locale: es }),
        time: format(new Date(b.booking_datetime), "h:mm a"),
        
        location: b.service_location || "Ubicación del cliente",
        price: Number(b.price_at_booking),
        
        // MAPEO CLAVE: Convertimos el status para que BookingCard muestre los botones
        status: mapStatusToSpanish(b.status),
        
        // Datos extra para modales
        bookingId: `BK-${b.booking_id.toString().padStart(4, '0')}`,
        notes: b.notes,
        providerPhone: b.phone_number,
        providerEmail: b.email,
        rawDate: b.booking_datetime
      }));

      setUpcomingBookings(mappedBookings);

      // 2. Procesar Mascotas
      const mappedPets = petsData.map(p => ({
        id: p.pet_id || p.id,
        name: p.name,
        species: p.species,
        breed: p.breed || "No especificada",
        age: p.birth_date ? differenceInYears(new Date(), new Date(p.birth_date)) : "N/A",
        weight: p.weight_kg,
        specialNeeds: p.medical_notes ? p.medical_notes.split(',') : [],
        medicalHistory: p.medical_notes,
        imageUrl: p.photo_url,
        gender: "N/A" // Placeholder si no está en DB
      }));

      setMyPets(mappedPets);

      // 3. Actualizar Estadísticas
      setStats({
        totalBookings: bookingsData.length,
        upcomingCount: futureBookings.length,
        activePets: petsData.length,
        reviewsCount: reviewsCountData 
      });

    } catch (error) {
      console.error("Error cargando dashboard:", error);
      setSnackbar({ open: true, message: 'Error al cargar información', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLERS ---

  const categoryToQueryParam = {
    "Paseo de perro": "paseo",
    "Veterinaria": "veterinaria",
    "Transporte": "transporte",
    "Hoteles": "hotel",
    "Peluqueria": "peluqueria",
    "Entrenamiento": "entrenamiento",
    "Cuidado en casa": "cuidado en casa",
    "Emergencias": "emergencias",
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setDetailModalOpen(true);
  };

  const handleReschedule = (booking) => {
    setSelectedBooking(booking);
    setRescheduleModalOpen(true);
  };

  const handleCancelBooking = async (booking) => {
    // Aquí implementaremos la lógica de cancelación real más adelante
    if(window.confirm(`¿Deseas cancelar la reserva de ${booking.serviceType}?`)) {
        try {
            await bookingService.updateStatus(booking.id, 'cancelled');
            setSnackbar({ open: true, message: 'Reserva cancelada correctamente', severity: 'success' });
            fetchData(); // Recargar datos
        } catch {
            setSnackbar({ open: true, message: 'Error al cancelar', severity: 'error' });
        }
    }
  };

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setPetDetailModalOpen(true);
  };

  const handleCreateNewPet = () => {
    setSelectedPet(null);
    setCreatePetModalOpen(true);
  };

  const handlePetSaved = () => {
    fetchData(); // Recargar la lista tras guardar
    setCreatePetModalOpen(false);
    setPetDetailModalOpen(false);
    setSnackbar({ open: true, message: 'Mascota guardada correctamente', severity: 'success' });
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

  // --- RENDER ---

  if (loading) {
      return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <CircularProgress sx={{ color: '#005c71' }} />
        </div>
      );
  }

  return (
    <>
        <main className='flex  py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-row items-center justify-between'>
              <h1 className='text-2xl font-semibold'>SUGERENCIAS</h1>
              <Button
              sx={{textTransform: 'none' , fontFamily:'Poppins, sans-serif',color: '#000000ff', borderColor:'#ccc','&:hover': { bgcolor: 'transparent',
                textDecoration:'underline',
                color: '#005c71',
                borderColor: '#f37556',
                   } }}
                disableRipple
                onClick={() => setShowServices(!showServices)}
              >
                {showServices ? 'Ver menos' : 'Ver más'}
              </Button>
            </div>

            <div className='w-full h-auto grid grid-cols-12 gap-6'>
              <Link to={`/client/search?type=${categoryToQueryParam["Paseo de perro"]}`} className="col-span-3 lg:col-span-3 xl:col-span-3">
              <CategoryCard category="Paseo de perro" icon={PetsIcon} colorText="#005c71" colorBg="#e3f6f8" />
              </Link>
              <Link to={`/client/search?type=${categoryToQueryParam["Veterinaria"]}`} className="col-span-3 lg:col-span-3 xl:col-span-3">
                <CategoryCard category="Veterinaria" icon={VaccinesIcon} colorText="#f97316" colorBg="#ffedd5" />
              </Link>
              <Link to={`/client/search?type=${categoryToQueryParam["Transporte"]}`} className="col-span-3 lg:col-span-3 xl:col-span-3">
                <CategoryCard category="Transporte" icon={ElectricMopedIcon} colorText="#005c71" colorBg="#e3f6f8" />
              </Link>
              <Link to={`/client/search?type=${categoryToQueryParam["Hoteles"]}`} className="col-span-3 lg:col-span-3 xl:col-span-3">
                <CategoryCard category="Hoteles" icon={ApartmentIcon} colorText="#f97316" colorBg="#ffedd5" />
              </Link>

              <Transition
                show={showServices}
                as={Link}
                to={`/client/search?type=${categoryToQueryParam["Peluqueria"]}`}
                className="col-span-3 lg:col-span-3 xl:col-span-3"
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
              <CategoryCard category="Peluqueria" icon={ContentCutIcon} colorText="#005c71" colorBg="#e3f6f8" />
              </Transition>

              <Transition
                show={showServices}
                as={Link}
                to={`/client/search?type=${categoryToQueryParam["Entrenamiento"]}`}
                className="col-span-3 lg:col-span-3 xl:col-span-3"

                enter="transition ease-out duration-300"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <CategoryCard category="Entrenamiento" icon={SchoolIcon} colorText="#f97316" colorBg="#ffedd5" />
              </Transition>

              <Transition
                show={showServices}
                as={Link}
                to={`/client/search?type=${categoryToQueryParam["Cuidado en casa"]}`}
                className="col-span-3 lg:col-span-3 xl:col-span-3"

                enter="transition ease-out duration-300"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <CategoryCard category="Cuidado en casa" icon={HomeIcon} colorText="#005c71" colorBg="#e3f6f8" />
              </Transition>

              <Transition
                show={showServices}
                as={Link}
                to={`/client/search?type=${categoryToQueryParam["Emergencias"]}`}
                className="col-span-3 lg:col-span-3 xl:col-span-3"

                enter="transition ease-out duration-300"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <CategoryCard category="Emergencias" icon={EmergencyIcon} colorText="#f97316" colorBg="#ffedd5" />
              </Transition>

            </div>
          </div>


            {/* Segunda sección */}
            <div className='w-full h-auto grid grid-cols-12 gap-4'>

              {/* Sección PRÓXIMAS RESERVAS */}
              <div className='flex flex-col h-full border-2 gap-6 border-gray-200 rounded-lg p-10 bg-white justify-between col-span-12 xl:col-span-8'>
            <div className='flex flex-row justify-between items-center w-full'>
              <h1 className='text-2xl font-semibold'>PRÓXIMAS RESERVAS</h1>
              <NavLink to='/client/bookings' className='text-[#005c71] font-medium hover:underline text-mxs'>Ver todas</NavLink>
            </div>
            
            {/* CARDS DINÁMICAS */}
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  {...booking} // Pasa todas las props (status incluido para mostrar botones)
                  onViewDetails={() => handleViewDetails(booking)}
                  onReschedule={() => handleReschedule(booking)}
                  onCancel={() => handleCancelBooking(booking)}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-xl border-2 border-dashed">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">No tienes reservas próximas</p>
                <Link to="/client/search">
                  <Button variant="outlined" size="small" sx={{ textTransform: 'none', height: 40, fontFamily: 'Poppins, sans-serif', borderRadius: 3, bgcolor: '#fff', color: '#000000ff', borderColor: '#ccc', '&:hover': { bgcolor: '#f37556' } }}>
                    Buscar Servicios
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sección MIS MASCOTAS */}
          <div className='flex flex-col h-full border-2 gap-6 border-gray-200 p-10 rounded-lg bg-white col-span-12 xl:col-span-4'>
            <div className='flex flex-row justify-between items-center w-full'>
              <h1 className='text-2xl font-semibold'>MIS MASCOTAS</h1>
              <Link to='/client/pets' className='text-[#005c71] font-medium hover:underline text-mxs'>Ver todas</Link>
            </div>
            
            <div className='space-y-4'>
              {myPets.map((pet) => (
                <div key={pet.id}>
                  <PetCard {...pet} onClick={() => handlePetClick(pet)} />
                </div>
              ))}
              
              <Button
                onClick={handleCreateNewPet}
                variant='outlined'
                className='w-full bg-transparent'
                sx={{
                  textTransform: 'none',
                  borderColor: '#ccc',
                  fontWeight: 500,
                  color: '#000',
                  borderRadius: 3, fontFamily: 'Poppins, sans-serif',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: '#eb9902ff',
                    color: '#fff',
                    borderColor: '#f7ae26ff',
                  }
                }}
              >
                Agregar nueva mascota
              </Button>
            </div>
          </div>
        </div>

        {/* ESTADÍSTICAS */}
        <div className='w-full h-auto grid grid-cols-12 gap-6'>
          <StatsCard title="Reservas totales" value={stats.totalBookings} icon={CalendarTodayIcon} />
          <StatsCard title="Próximas" value={stats.upcomingCount} icon={AccessTimeIcon} />
          <StatsCard title="Mis mascotas" value={stats.activePets} icon={PetsIcon} />
          <StatsCard title="Reseñas hechas" value={stats.reviewsCount} icon={RateReviewIcon} />
        </div>

        {/* MODALES */}
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
        
        {selectedPet && (
          <PetDetailModal 
            open={petDetailModalOpen} 
            onOpenChange={setPetDetailModalOpen} 
            pet={selectedPet} 
          />
        )}
        
        <EditPetModal
          open={createPetModalOpen}
          onOpenChange={setCreatePetModalOpen}
          pet={null}
          onSuccess={handlePetSaved}
        />

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
    </>
  );
}