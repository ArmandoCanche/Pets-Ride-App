import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

// MUI Components
import { Button, Snackbar, Alert } from '@mui/material';

// Icons MUI
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Calendar } from 'lucide-react';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import EmergencyIcon from '@mui/icons-material/Emergency';


// Routers...
import { Link, NavLink } from 'react-router-dom';

// Componentes
import StatsCard from '../../Components/StatsCard.jsx';
import BookingCard  from '../../Components/BookingCard.jsx';
import PetCard from '../../Components/PetCard.jsx';
import ClientBookingDetailModal from '../../Components/ClientBookingDetailModal.jsx';
import ClientRescheduleModal from '../../Components/ClientRescheduleModal.jsx';
import PetDetailModal from '../../Components/PetDetailModal.jsx';
import CategoryCard from '../../Components/CategoryCard.jsx';
import EditPetModal from '../../Components/EditPetModal.jsx';


export default function DashboardHomeClient() {

const [detailModalOpen, setDetailModalOpen] = useState(false)
const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false)
const [petDetailModalOpen, setPetDetailModalOpen] = useState(false)
const [selectedBooking, setSelectedBooking] = useState(null)
const [selectedPet, setSelectedPet] = useState(null)
const [showServices, setShowServices] = useState(false)
const [createPetModalOpen, setCreatePetModalOpen] = useState(false)


  const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success',
  });


  const stats = {
    totalBookings: 12,
    upcomingBookings: 3,
    activePets: 2,
    favoriteProviders: 5,
  }

      const upcomingBookings = [
        {
            id: "1",
            serviceType: "Paseo de perros",
            providerName: "Carlos López", // Coherencia: Este es el usuario del otro dashboard
            providerImage: "/man-2.jpg", // Imagen de Carlos
            providerRating: 4.9,
            providerPhone: "+1 (555) 123-4567",
            providerEmail: "carlos.paseos@petcare.com",
            petName: "Max",
            date: "Marzo 15, 2025",
            time: "10:00 AM - 11:00 AM",
            location: "Parque Central",
            price: 25,
            status: "confirmado",
            bookingId: "BK-2025-001",
            notes: "Por favor, usa la entrada norte, hay menos gente.",
        },
        {
            id: "2",
            serviceType: "Chequeo veterinario",
            providerName: "Dr. Michael Chen",
            providerImage: "/man.jpg",
            providerRating: 5.0,
            providerPhone: "+1 (555) 987-6543",
            providerEmail: "m.chen@petcare.com",
            petName: "Luna",
            date: "Marzo 18, 2025",
            time: "2:00 PM - 3:00 PM",
            location: "Pet Care Clinic",
            price: 75,
            status: "confirmado",
            bookingId: "BK-2025-002",
        },
        {
            id: "3",
            serviceType: "Peluquería de mascotas",
            providerName: "Emma Wilson",
            providerImage: "/woman-2.jpg",
            providerRating: 4.8,
            providerPhone: "+1 (555) 456-7890",
            providerEmail: "emma@pawsclaws.com",
            petName: "Charlie",
            date: "Marzo 20, 2025",
            time: "11:00 AM - 12:30 PM",
            location: "Paws & Claws Salon",
            price: 50,
            status: "pendiente",
            bookingId: "BK-2025-003",
        },
    ]

  const myPets = [
      {
        name: "Max",
        species: "perro",
        gender: "macho",
        breed: "Golden Retriever",
        age: 3,
        weight: 30,
        specialNeeds: ["Alergias", "Medicación"],
      },
      {
        name: "Luna",
        species: "gato",
        breed: "Persa",
        age: 2,
        weight: 4,
      },
  ]

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

  const handlePetClick = (pet) => {
    setSelectedPet(pet)
    setPetDetailModalOpen(true)
  }

  const handleCreateNewPet = () => {
    setSelectedPet(null)
    setCreatePetModalOpen(true)
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
              <div className='flex flex-col h-full border-2 gap-6 border-gray-200 rounded-lg p-10 bg-white  justify-between col-span-12  xl:col-span-8'>
                <div className='flex flex-row justify-between items-center w-full'>
                  <h1 className='text-2xl font-semibold'>PRÓXIMAS RESERVAS</h1>
                  <NavLink to='/client/bookings' className='text-[#005c71] font-medium hover:underline text-mxs'>Ver todas</NavLink>
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
                    <h1 className='text-2xl font-semibold'>MIS MASCOTAS</h1>
                    <Link to='/client/pets' className='text-[#005c71] font-medium hover:underline text-mxs'>Ver todas</Link>
                  </div>
                  <div className='space-y-4'>
                    {myPets.map((pet) => (
                      <div>
                        <PetCard {...pet} key={pet.name} onClick={() => handlePetClick(pet)} />
                      </div>
                    ))}
                    <Button
                    onClick={handleCreateNewPet}
                    sx={{
                      textTransform: 'none' ,
                      borderColor: '#ccc',
                      fontWeight:500,
                      color: '#000',
                      borderRadius:3,fontFamily:'Poppins, sans-serif',
                      '&:hover':{
                        backgroundColor: '#eb9902ff',
                        color: '#fff',
                        borderColor: '#f7ae26ff',
                      }
                    }} variant='outlined' className='w-full bg-transparent'>
                      Agregar nueva mascota</Button>
                  </div>
              </div>
            </div>
            <div className='w-full h-auto grid grid-cols-12 gap-6'>
              <StatsCard title="Reservas totales" value={stats.totalBookings} icon={CalendarTodayIcon} />
              <StatsCard title="Próximas" value={stats.upcomingBookings} icon={AccessTimeIcon} />
              <StatsCard title="Mis mascotas" value={stats.activePets} icon={PetsIcon} />
              <StatsCard title="Favoritos" value={stats.favoriteProviders} icon={FavoriteBorderIcon} />
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
            {selectedPet && (
              <PetDetailModal open={petDetailModalOpen} onOpenChange={setPetDetailModalOpen} pet={selectedPet} />
            )}
            <EditPetModal
            open={createPetModalOpen}
            onOpenChange={setCreatePetModalOpen}
            pet={null}
            />
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
    </>
  );
}
