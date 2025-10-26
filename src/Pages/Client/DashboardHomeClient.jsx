import React, { useState } from 'react';


// MUI Components
import { Button } from '@mui/material';

// Icons MUI
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
// Routers...
import { NavLink } from 'react-router-dom';

// Componentes
import StatsCard from '../../Components/StatsCard';
import BookingCard  from '../../Components/BookingCard';
import PetCard from '../../Components/PetCard';

export default function DashboardHomeClient() {

const [detailModalOpen, setDetailModalOpen] = useState(false)
const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false)
const [petDetailModalOpen, setPetDetailModalOpen] = useState(false)
const [selectedBooking, setSelectedBooking] = useState(null)
const [selectedPet, setSelectedPet] = useState(null)

  const stats = {
    totalBookings: 12,
    upcomingBookings: 3,
    activePets: 2,
    favoriteProviders: 5,
  }

  const upcomingBookings = [
    {
      id: "1",
      serviceType: "Dog Walking",
      providerName: "Sarah Johnson",
      petName: "Max",
      date: "March 15, 2025",
      time: "10:00 AM - 11:00 AM",
      location: "Central Park Area",
      price: 25,
      status: "confirmed",
    },
    {
      id: "2",
      serviceType: "Veterinary Checkup",
      providerName: "Dr. Michael Chen",
      petName: "Luna",
      date: "March 18, 2025",
      time: "2:00 PM - 3:00 PM",
      location: "Pet Care Clinic",
      price: 75,
      status: "confirmed",
    },
  ]

  const myPets = [
    {
      name: "Max",
      species: "dog",
      breed: "Golden Retriever",
      age: 3,
      weight: 30,
      specialNeeds: ["Allergies", "Medication"],
    },
    {
      name: "Luna",
      species: "cat",
      breed: "Persian",
      age: 2,
      weight: 4,
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

  const handlePetClick = (pet) => {
    setSelectedPet(pet)
    setPetDetailModalOpen(true)
  }

  return (
    <>
        <main className='flex  py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
            <div className='w-full h-auto grid grid-cols-12 gap-6'>
              <StatsCard title="Reservas totales" value={5} icon={CalendarTodayIcon} />
              <StatsCard title="Próximas" value={3} icon={AccessTimeIcon} />
              <StatsCard title="Mis mascotas" value={2} icon={PetsIcon} />
              <StatsCard title="Favoritos" value={8} icon={FavoriteBorderIcon} />
            </div>
            {/* Segunda sección */}
            <div className='w-full h-auto grid grid-cols-12 gap-4'>

              {/* Sección PRÓXIMAS RESERVAS */}
              <div className='flex flex-col h-full border-2 gap-6 border-gray-200 rounded-lg p-10 bg-white  justify-between col-span-12  xl:col-span-8'>
                <h1 className='text-2xl font-semibold'>PRÓXIMAS RESERVAS</h1>

                {/* Card de la reserva primera */}

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
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Buscar Servicios</Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Sección MIS MASCOTAS */}
              <div className='flex flex-col h-full border-2 gap-6 border-gray-200 p-10 rounded-lg bg-white col-span-12  xl:col-span-4'>

                  <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-2xl font-semibold'>MIS MASCOTAS</h1>
                    <NavLink to='/mis-mascotas' className='text-[#005c71] font-medium hover:underline text-mxs'>Ver todas</NavLink>
                  </div>
                  <div className='space-y-4'>
                    {myPets.map((pet) => (
                      <div key={pet.name} onClick={() => handlePetClick(pet)} className='w-full bg-transparent hover:bg-accent/10'>
                        <PetCard {...pet} />
                      </div>
                    ))}
                    <NavLink to={"/pets/new"}><Button
                    sx={{
                      background: '',
                      borderColor: '#ccc',
                      fontWeight:500,
                      color: '#000',
                      borderRadius:3,
                      '&:hover':{
                        backgroundColor: '#eb9902ff',
                        color: '#fff',
                        borderColor: '#f7ae26ff',
                      }
                    }} variant='outlined' className='w-full bg-transparent'>
                      Agregar nueva mascota</Button></NavLink>
                  </div>
              </div>
            </div>
        </main>
    </>
  );
}
