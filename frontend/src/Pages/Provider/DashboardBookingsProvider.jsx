import React, { useState } from 'react';

import { Box, Tabs, Tab } from '@mui/material';
import BookingCardProvider from '../../Components/BookingCardProvider';
export default function DashboardBookingsProvider() {

  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [currentTab, setCurrentTab] = useState('proximas');

  const upcomingBookings = [
  {
    id: 1,
    service: "Paseo de Perros",
    client: "Sarah Johnson",
    clientImage: "/diverse-woman-portrait.png",
    pet: "Max",
    petType: "Golden Retriever",
    petAge: "3 años",
    petWeight: "65 lbs", // O puedes poner "30 kg" si prefieres conversión
    date: "2025-01-25",
    time: "10:00 AM",
    duration: "1 hora",
    location: "Central Park, NY",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@example.com",
    price: "$25",
    status: "confirmado",
    notes: "A Max le encanta jugar a buscar la pelota y es muy amigable con otros perros.",
    specialRequirements: "Por favor, evita la entrada norte, hay obras en progreso.",
  },
  {
    id: 2,
    service: "Estética Canina/Felina", // O "Aseo de Mascotas"
    client: "Michael Chen",
    clientImage: "/man.jpg",
    pet: "Luna",
    petType: "Gato Persa",
    petAge: "2 años",
    petWeight: "10 lbs", // O puedes poner "4.5 kg"
    date: "2025-01-26",
    time: "2:00 PM",
    duration: "2 horas",
    location: "123 Main St, NY",
    phone: "+1 (555) 987-6543",
    email: "m.chen@example.com",
    price: "$60",
    status: "confirmado",
    notes: "Luna es un poco tímida, por favor, sé cuidadoso/a durante el aseo.",
  },
]

  const pendingBookings = [
  {
    id: 3,
    service: "Cuidado de Mascotas",
    client: "Emma Wilson",
    clientImage: "/woman-2.jpg",
    pet: "Charlie",
    petType: "Beagle",
    petAge: "5 años",
    petWeight: "25 lbs",
    date: "2025-01-27",
    time: "9:00 AM",
    duration: "4 horas",
    location: "456 Oak Ave, NY",
    phone: "+1 (555) 456-7890",
    email: "emma.w@example.com",
    price: "$80",
    status: "pendiente",
    specialRequirements: "Charlie necesita su medicación a las 11 AM.",
  },
]

  const completedBookings = [
  {
    id: 4,
    service: "Paseo de Perros",
    client: "David Brown",
    clientImage: "/man-2.jpg",
    pet: "Buddy",
    petType: "Labrador",
    petAge: "4 años",
    petWeight: "70 lbs",
    date: "2025-01-20",
    time: "3:00 PM",
    duration: "1 hora",
    location: "Riverside Park, NY",
    price: "$25",
    status: "completado",
    rating: 5,
  },
  {
    id: 5,
    service: "Atención Veterinaria",
    client: "Lisa Anderson",
    clientImage: "/woman-3.jpg",
    pet: "Milo",
    petType: "Gato Atigrado", 
    petAge: "6 años",
    petWeight: "12 lbs",
    date: "2025-01-18",
    time: "11:00 AM",
    duration: "30 minutos",
    location: "Clínica de Mascotas, NY",
    price: "$50",
    status: "completado",
    rating: 5,
  },
]

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking)
    setDetailModalOpen(true)
  }

  const handleMessageClient = (booking) => {
    setSelectedBooking(booking)
    setMessageModalOpen(true)
  }

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  return (
        <main className='flex  py-10 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
            <div className='w-full h-auto  flex flex-col gap-6'>
              <div className='flex flex-col h-full gap-4 p-0  align-items-center justify-center col-span-12 '>
                  <h1 className='text-4xl font-bold'>Reservas</h1>
                  <p className="text-gray-400">Administra tus reservas de servicios y citas</p>
              </div>

              <div className='flex flex-col  gap-6 h-full  rounded-lg p-0  align-items-center justify-center col-span-12'>

                <Box sx={{ 
                            width: 'fit-content',
                            bgcolor: '#ebebebff',
                            borderRadius: 3, 
                            padding: 0.5,
                        }}>
                            <Tabs 
                                value={currentTab} 
                                onChange={handleTabChange} 
                                aria-label="Booking Tabs" 
                                slotProps={{ 
                                    indicator: { style: { display: "none"} } 
                                }}
                                sx={{
                                    minHeight:'auto'
                                }}
                            >
                                <Tab 
                                    label={`Próximas (${upcomingBookings.length})`}
                                    value={"proximas"}
                                    sx={{ 
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: 500,
                                        width: '11rem',
                                        textTransform: 'none', 
                                        borderRadius: 3, 
                                        minHeight:'auto',
                                        paddingY:1,
                                        '&.Mui-selected': { 
                                            bgcolor: '#fff', 
                                            color: 'text.primary'
                                        },
                                        '&:not(.Mui-selected)': {
                                            color: 'text.secondary'
                                        }
                                    }} 
                                />
                                <Tab 
                                    label={`Pendientes (${pendingBookings.length})`} 
                                    value={"pendiente"} 
                                    sx={{ 
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
                                            fontWeight: 500
                                        },
                                        '&:not(.Mui-selected)': {
                                            color: 'text.secondary'
                                        }
                                    }} 
                                />
                                <Tab 
                                    label={`Completadas (${completedBookings.length})`} 
                                    value={"completado"} 
                                    sx={{ 
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
                                            fontWeight: 500
                                        },
                                        '&:not(.Mui-selected)': {
                                            color: 'text.secondary'
                                        }
                                    }} 
                                />
                            </Tabs>
                        </Box>

                        {currentTab === 'proximas' && (
                          <Box sx={{width:'100%', pt:0}}>
                            {upcomingBookings.length > 0 ? (
                              <div className='grid lg:grid-cols-1 gap-6'>
                                {upcomingBookings.map((booking) => (
                                  <BookingCardProvider
                                  key={booking.id}
                                  {...booking}
                                  onViewDetails={() => handleViewDetails(booking)}
                                  onMessageClient={() => handleMessageClient(booking)}
                                  />
                                ))}
                              </div>
                            ) : (
                            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                                <CalendarToday
                                sx={{fontSize: 40, marginX:'auto', marginBottom:2, color:'text.disabled'}}
                                />
                                <p className="text-gray-500 mb-4">Sin reservas próximas</p>
                            </div>
                            )}
                          </Box>
                        )}

                        {currentTab === 'pendiente' && (
                          <Box sx={{width:'100%', pt:0}}>
                            {pendingBookings.length > 0 ? (
                              <div className='grid lg:grid-cols-1 gap-6'>
                                {pendingBookings.map((booking) => (
                                    <BookingCardProvider
                                  key={booking.id}
                                  {...booking}
                                  onViewDetails={() => handleViewDetails(booking)}
                                  onMessageClient={() => handleMessageClient(booking)}
                                  />
                                ))}
                              </div>
                            ) : (
                            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                                <CalendarToday
                                sx={{fontSize: 40, marginX:'auto', marginBottom:2, color:'text.disabled'}}
                                />
                                <p className="text-gray-500 mb-4">Sin reservas pendientes</p>
                            </div>
                            )}
                          </Box>
                        )}
                        {currentTab === 'completado' && (
                          <Box sx={{width:'100%', pt:0}}>
                            {completedBookings.length > 0 ? (
                              <div className='grid lg:grid-cols-1 gap-6'>
                                {completedBookings.map((booking) => (
                                  <BookingCardProvider
                                  key={booking.id}
                                  {...booking}
                                  onViewDetails={() => handleViewDetails(booking)}
                                  onMessageClient={() => handleMessageClient(booking)}
                                  />
                                ))}
                              </div>
                            ) : (
                            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                                <CalendarToday
                                sx={{fontSize: 40, marginX:'auto', marginBottom:2, color:'text.disabled'}}
                                />
                                <p className="text-gray-500 mb-4">Sin reservas completadas</p>
                            </div>
                            )}
                          </Box>
                        )}
              </div>
            </div>
            {selectedBooking && (
              <>
              {/* Aquí van los Modal */}
              </>
            )}
        </main>
  );
}
