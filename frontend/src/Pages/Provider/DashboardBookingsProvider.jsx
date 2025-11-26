import React, { useState } from 'react';

// MUI Components
import { Box, Tabs, Tab, Snackbar, Alert, Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Componentes
import BookingCardProvider from '../../Components/BookingCardProvider';
import ProviderBookingDetailModal from '../../Components/ProviderBookingDetailModal';
import ProviderRescheduleModal from '../../Components/ProviderRescheduleModal';

// Router
import { Link } from 'react-router-dom';

export default function DashboardBookingsProvider() {

  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [currentTab, setCurrentTab] = useState('proximas');
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // --- DATOS (Prestador viendo a Clientes) ---
  const upcomingBookings = [
    {
      id: "1",
      service: "Paseo de Perros",
      clientName: "Ana Martínez", // Cliente
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
      notes: "Piel sensible, usar champú hipoalergénico.",
    },
  ];

  const pendingBookings = [
    {
      id: "3",
      service: "Cuidado de Mascotas",
      clientName: "Emma Wilson",
      clientImage: "/woman-2.jpg",
      pet: "Charlie",
      petType: "Beagle",
      petAge: "5 años",
      petWeight: "11 kg",
      date: "Marzo 20, 2025",
      time: "9:00 AM - 1:00 PM",
      duration: "4 horas",
      location: "456 Oak Ave, NY",
      phone: "+1 (555) 456-7890",
      email: "emma.w@example.com",
      price: 80,
      status: "pendiente",
      specialRequirements: "Charlie necesita su medicación a las 11 AM.",
    },
  ];

  const completedBookings = [
    {
      id: "4",
      service: "Paseo de Perros",
      clientName: "Ana Martínez",
      clientImage: "/diverse-woman-portrait.png",
      pet: "Max",
      petType: "Golden Retriever",
      petAge: "3 años",
      petWeight: "30 kg",
      date: "Marzo 8, 2025",
      time: "10:00 AM - 11:00 AM",
      duration: "1 hora",
      location: "Parque Central",
      price: 25,
      status: "completado",
      rating: 5,
    },
    {
      id: "5",
      service: "Atención Veterinaria",
      clientName: "Lisa Anderson",
      clientImage: "/woman-3.jpg",
      pet: "Milo",
      petType: "Gato Atigrado", 
      petAge: "6 años",
      petWeight: "5 kg",
      date: "Febrero 20, 2025",
      time: "11:00 AM - 11:30 AM",
      duration: "30 min",
      location: "Clínica de Mascotas",
      price: 50,
      status: "completado",
      rating: 5,
    },
  ];

  // --- HANDLERS ---

  const handleViewDetails = (booking) => {
    setSelectedBooking({
        ...booking,
        // Unificamos nombres de props para el modal
        serviceType: booking.service, 
        petName: booking.pet
    });
    setDetailModalOpen(true);
  }

  const handleMessageClient = () => {
    setDetailModalOpen(false);
    setSnackbar({ open: true, message: 'Mensaje enviado al cliente.', severity: 'success' });
  }

  const handleReschedule = (booking) => {
    setSelectedBooking({
        ...booking,
        serviceType: booking.service, 
        petName: booking.pet
    });
    setRescheduleModalOpen(true);
  };

  const handleCancel = (booking) => {
    setSnackbar({ open: true, message: `Has rechazado/cancelado la cita con ${booking.clientName}.`, severity: 'warning' });
  };

  const handleAccept = (booking) => {
    setSnackbar({ open: true, message: `Has aceptado la cita con ${booking.clientName}.`, severity: 'success' });
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Función auxiliar para renderizar grid consistente (2 columnas)
  const renderBookingList = (bookings) => (
    <div className='grid lg:grid-cols-2 gap-6'>
        {bookings.map((booking) => (
            <BookingCardProvider
                key={booking.id}
                {...booking}
                // Mapeo importante: Card espera 'client', datos tienen 'clientName'
                client={booking.clientName}
                
                // Funciones
                onViewDetails={() => handleViewDetails(booking)}
                onReschedule={() => handleReschedule(booking)}
                onCancel={() => handleCancel(booking)}
                onAccept={() => handleAccept(booking)}
                onMessageClient={() => handleMessageClient(booking)}
            />
        ))}
    </div>
  );

  const renderEmptyState = (message) => (
    <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
        <CalendarTodayIcon sx={{fontSize: 40, marginX:'auto', marginBottom:2, color:'text.disabled'}} />
        <p className="text-gray-500 mb-4">{message}</p>
    </div>
  );

  return (
    <main className='flex py-10 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
      <div className='w-full h-auto flex flex-col gap-6'>
        
        {/* Header */}
        <div className='flex flex-col h-full gap-4 p-0 align-items-center justify-center col-span-12'>
          <h1 className='text-4xl font-bold'>Reservas</h1>
          <p className="text-gray-400">Administra tus reservas de servicios y citas</p>
        </div>

        {/* Tabs y Contenido */}
        <div className='flex flex-col gap-6 h-full rounded-lg p-0 align-items-center justify-center col-span-12'>
          
          <Box sx={{ 
            width: 'fit-content',
            bgcolor: '#ebebeb',
            borderRadius: 3, 
            padding: 0.5,
          }}>
            <Tabs 
                value={currentTab} 
                onChange={handleTabChange} 
                aria-label="Booking Tabs" 
                slotProps={{ indicator: { style: { display: "none"} } }}
                sx={{ minHeight:'auto' }}
            >
                <Tab label={`Próximas (${upcomingBookings.length})`} value="proximas" sx={tabStyle} />
                <Tab label={`Pendientes (${pendingBookings.length})`} value="pendiente" sx={tabStyle} />
                <Tab label={`Completadas (${completedBookings.length})`} value="completado" sx={tabStyle} />
            </Tabs>
          </Box>

          {/* Contenido de Tabs */}
          <Box sx={{width:'100%', pt:0}}>
            {currentTab === 'proximas' && (
                upcomingBookings.length > 0 ? renderBookingList(upcomingBookings) : renderEmptyState("Sin reservas próximas")
            )}
            {currentTab === 'pendiente' && (
                pendingBookings.length > 0 ? renderBookingList(pendingBookings) : renderEmptyState("Sin reservas pendientes")
            )}
            {currentTab === 'completado' && (
                completedBookings.length > 0 ? renderBookingList(completedBookings) : renderEmptyState("Sin reservas completadas")
            )}
          </Box>

        </div>
      </div>

      {/* Modals */}
      {selectedBooking && (
        <>
            <ProviderBookingDetailModal 
                open={detailModalOpen}
                onOpenChange={setDetailModalOpen}
                booking={selectedBooking}
                onMessage={handleMessageClient}
            />
            <ProviderRescheduleModal
                open={rescheduleModalOpen}
                onOpenChange={setRescheduleModalOpen}
                booking={selectedBooking}
            />
        </>
      )}

      {/* Snackbar */}
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

// Estilo reutilizable para Tabs
const tabStyle = {
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
        fontWeight: 600
    },
    '&:not(.Mui-selected)': {
        color: 'text.secondary'
    }
};