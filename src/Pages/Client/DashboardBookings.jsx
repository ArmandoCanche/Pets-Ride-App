import { Box, Button, Tab, Tabs } from "@mui/material";
import BookingCard from "../../Components/BookingCard";
import { CalendarToday } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function DashboardBookings(){

    const upcomingBookings = [
        {
            id: "1",
            serviceType: "Dog Walking",
            providerName: "Sarah Johnson",
            providerImage: "/diverse-woman-portrait.png",
            providerRating: 4.9,
            providerPhone: "+1 (555) 123-4567",
            providerEmail: "sarah.j@example.com",
            petName: "Max",
            date: "March 15, 2025",
            time: "10:00 AM - 11:00 AM",
            location: "Central Park Area",
            price: 25,
            status: "confirmado",
            bookingId: "BK-2025-001",
            notes: "Please use the north entrance of the park.",
        },
        {
            id: "2",
            serviceType: "Veterinary Checkup",
            providerName: "Dr. Michael Chen",
            providerImage: "/man.jpg",
            providerRating: 5.0,
            providerPhone: "+1 (555) 987-6543",
            providerEmail: "m.chen@petcare.com",
            petName: "Luna",
            date: "March 18, 2025",
            time: "2:00 PM - 3:00 PM",
            location: "Pet Care Clinic",
            price: 75,
            status: "confirmado",
            bookingId: "BK-2025-002",
        },
        {
            id: "3",
            serviceType: "Pet Grooming",
            providerName: "Emma Wilson",
            providerImage: "/woman-2.jpg",
            providerRating: 4.8,
            providerPhone: "+1 (555) 456-7890",
            providerEmail: "emma@pawsclaws.com",
            petName: "Charlie",
            date: "March 20, 2025",
            time: "11:00 AM - 12:30 PM",
            location: "Paws & Claws Salon",
            price: 50,
            status: "pendiente",
            bookingId: "BK-2025-003",
        },
    ]

    const pastBookings = [
        {
            id: "4",
            serviceType: "Dog Walking",
            providerName: "Sarah Johnson",
            providerImage: "/diverse-woman-portrait.png",
            providerRating: 4.9,
            petName: "Max",
            date: "March 8, 2025",
            time: "10:00 AM - 11:00 AM",
            location: "Central Park Area",
            price: 25,
            status: "completado",
            bookingId: "BK-2025-004",
        },
        {
            id: "5",
            serviceType: "Pet Hotel",
            providerName: "Happy Paws Resort",
            providerImage: "/placeholder.svg?height=100&width=100",
            providerRating: 4.7,
            petName: "Luna",
            date: "February 20-25, 2025",
            time: "5 days",
            location: "Downtown Pet Resort",
            price: 250,
            status: "completado",
            bookingId: "BK-2025-005",
        },
    ]

    const cancelledBookings = [
        {
            id: "6",
            serviceType: "Pet Transport",
            providerName: "Quick Ride Pets",
            providerImage: "/placeholder.svg?height=100&width=100",
            providerRating: 4.5,
            petName: "Max",
            date: "March 5, 2025",
            time: "3:00 PM - 4:00 PM",
            location: "Airport Transfer",
            price: 40,
            status: "cancelado",
            bookingId: "BK-2025-006",
        },
    ]

    const [detailModalOpen, setDetailModalOpen] = useState(false)
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false)
    const [messageModalOpen, setMessageModalOpen] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [currentTab, setCurrentTab] = useState('upcoming');


    const handleViewDetails = (booking) => {
        setSelectedBooking(booking)
        setDetailModalOpen(true)
    }

    const handleReschedule = (booking) => {
        setSelectedBooking(booking)
        setRescheduleModalOpen(true)
    }

    const handleMessage = () => {
        setMessageModalOpen(true)
    }

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
    <>
        <main className='flex  py-10 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
            <div className='w-full h-auto  flex flex-col gap-6'>
              <div className='flex flex-col h-full gap-4 p-0  align-items-center justify-center col-span-12 '>
                  <h1 className='text-4xl font-bold'>Mis reservas</h1>
                  <p className="text-gray-400">Observa y administra todas tus reservas</p>
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
                                // 2. Quita el indicador (la línea azul/primaria de abajo)
                                slotProps={{ 
                                    indicator: { style: { display: "none"} } 
                                }}
                                sx={{
                                    minHeight:'auto'
                                }}
                            >
                                <Tab 
                                    label={`Upcoming (${upcomingBookings.length})`}
                                    value={"upcoming"}
                                    sx={{ 
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: 500,
                                        width: '10rem',
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
                                    label={`Past (${pastBookings.length})`} 
                                    value={"past"} 
                                    sx={{ 
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: 500,
                                        width: '10rem',
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
                                    label={`Cancelled (${cancelledBookings.length})`} 
                                    value={"cancelled"} 
                                    sx={{ 
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: 500,
                                        width: '10rem',
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
                    {currentTab === 'upcoming' && (
                        <Box sx={{ width: '100%', pt: 0}}>
                            {upcomingBookings.length > 0 ? (
                                <div className="grid lg:grid-cols-2 gap-6">
                                    {upcomingBookings.map((booking) =>(
                                        <BookingCard
                                        key={booking.id}
                                        {...booking}
                                        onViewDetails={() => handleViewDetails(booking)}
                                        onReschedule={() => handleReschedule(booking)}
                                        onCancel={() => console.log("Cancel booking:", booking.id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                // (Ajuste de estilo en Empty State)
                                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                                    <CalendarToday
                                    sx={{fontSize: 40, marginX:'auto', marginBottom:2, color:'text.disabled'}}
                                    />
                                    <p className="text-gray-500 mb-4">Sin reservas próximas</p>
                                    <Link to="/client/search">
                                        <Button variant="contained" sx={{textTransform: 'none'}}>
                                            Buscar servicios
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </Box>
                    )}

                    {currentTab === 'past' && (
                        <Box sx={{ width: '100%', pt: 0 }}>
                            {pastBookings.length > 0 ? (
                                <div className="grid lg:grid-cols-2 gap-6">
                                    {pastBookings.map((booking) =>(
                                        <BookingCard
                                        key={booking.id}
                                        {...booking}
                                        onViewDetails={() => handleViewDetails(booking)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                                    <CalendarToday 
                                    sx={{fontSize: 40, marginX:'auto', marginBottom:2, color:'text.disabled'}}
                                    />
                                    <p className="text-gray-500 mb-4">Sin reservas anteriores</p>
                                </div>
                            )}
                        </Box>
                    )}

                    {currentTab === 'cancelled' && (
                        <Box sx={{ width: '100%', pt: 0 }}>
                            {cancelledBookings.length > 0 ? (
                                <div className="grid lg:grid-cols-2 gap-6">
                                    {cancelledBookings.map((booking) => (
                                        <BookingCard
                                        key={booking.id}
                                        {...booking}
                                        onViewDetails={() => handleViewDetails(booking)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                                    <CalendarToday sx={{fontSize: 40, marginX:'auto', marginBottom:2, color:'text.disabled'}}/>
                                    <p className="text-gray-500 mb-4">Sin reservas canceladas</p>
                                </div>
                            )}
                        </Box>
                    )}
              </div>
            </div>
            {selectedBooking && (
                <>
                <ClientBookingDetailModal
                    open={detailModalOpen}
                    onOpenChange={setDetailModalOpen}
                    booking={selectedBooking}
                    onMessage={handleMessage}
                />
                <ClientRescheduleModal
                    open={rescheduleModalOpen}
                    onOpenChange={setRescheduleModalOpen}
                    booking={selectedBooking}
                />
                <ClientMessageModal
                    open={messageModalOpen}
                    onOpenChange={setMessageModalOpen}
                    provider={{
                    name: selectedBooking.providerName,
                    image: selectedBooking.providerImage,
                    }}
                    booking={{
                    serviceType: selectedBooking.serviceType,
                    petName: selectedBooking.petName,
                    }}
                />
                </>
            )}
        </main>
    </>
    )
}