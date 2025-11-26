
import React, { useState } from 'react';

// MUI Icons
import MovingIcon from '@mui/icons-material/Moving';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AddIcon from '@mui/icons-material/Add';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Componentes
import StatsCard from '../../Components/StatsCard';
import { Button } from '@mui/material';
import ServiceCard from '../../Components/serviceCard';
import ServiceModal from '../../Components/ServiceModal';

export default function DashboardMyServices() {


  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([
  {
    id: "1",
    name: "Paseo de Perros",
    description: "Servicio profesional de paseo de perros en el área de Central Park. Con experiencia en todas las razas y tamaños.",
    price: 25,
    priceUnit: "hora",
    duration: "30-60 minutos",
    active: true,
    bookings: 127,
    revenue: 3175,
    nextBooking: "Hoy a las 10:00 AM",
  },
  {
    id: "2",
    name: "Paseo de Perros Extendido",
    description: "Paseos más largos para perros con mucha energía. Incluye tiempo de juego y ejercicios de entrenamiento.",
    price: 40,
    priceUnit: "sesión",
    duration: "90 minutos",
    active: true,
    bookings: 45,
    revenue: 1800,
    nextBooking: "Mañana a las 2:00 PM",
  },
  {
    id: "3",
    name: "Cuidado de Mascotas",
    description: "Servicio de cuidado de mascotas a domicilio. Perfecto para cuando estás fuera todo el día.",
    price: 50,
    priceUnit: "día",
    duration: "Día completo",
    active: false,
    bookings: 23,
    revenue: 1150,
    nextBooking: "Ninguna reserva próxima",
  },
])



  const toggleServiceStatus = (id) => {
    setServices(services.map((service) => (service.id === id ? { ...service, active: !service.active } : service)))
  }

  const handleCreateNew = () => {
    setSelectedService(null);
    setEditModalOpen(true);
  }

  const handleEdit = (service) => {
    setSelectedService(service)
    setEditModalOpen(true)
  }

  const handleSaveService = (dataFromModal) => {
    if (selectedService) {
      const updatedServices = services.map((service) =>
        service.id === selectedService.id ? { ...service, ...dataFromModal } : service
      );
      setServices(updatedServices);
    } else {
      const newService = {
        id: Date.now().toString(),
        active: true,
        bookings: 0,
        revenue: 0,
        nextBooking: "Sin reservas",
        ...dataFromModal
      };
      setServices([...services, newService]);
    }
  }
  const totalRevenue = services.reduce((sum, service) => sum + service.revenue, 0)
  const totalBookings = services.reduce((sum, service) => sum + service.bookings, 0)
  const activeServices = services.filter((s) => s.active).length


  return (
        <main className='flex  py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>

          {/* Sección de Estadísticas */}
          <div className='w-full h-auto grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-9 gap-6'>
            <StatsCard title="Servicios activos" value={activeServices} icon={MovingIcon} />
            <StatsCard title="Reservas totales" value={totalBookings} icon={CalendarTodayOutlinedIcon} />
            <StatsCard title="Ingresos totales" value={`$ ${totalRevenue}`} icon={AttachMoneyOutlinedIcon} />
          </div>
          {/* Sección del botón para agregar un nuevo servicio */}
          <div >
            <Button
            onClick={handleCreateNew}
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none' ,fontFamily:'Poppins, sans-serif',
              color: '#ffffffff',
              background:'#175a69ff',
              borderColor:'none',
              fontWeight:500,
              borderRadius:3,
              '&:hover':{
                  backgroundColor: '#186c7e',
              },
              paddingX:3,
              paddingY:1.5
            }}
            >
              Agregar nuevo servicio
            </Button>
          </div>

          {/* Sección de las cartas */}
          {services.length > 0 ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6'>
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  handleEdit={() => handleEdit(service)}
                  toggleServiceStatus={() => toggleServiceStatus(service.id)}
                />
              ))}
            </div>
          ) : (
            <div className='flex flex-col gap-6 text-center py-18 rounded-2xl border-1 border-gray-300 shadow-sm '>
              <div ><HelpOutlineIcon sx={{height:64, width:64, color:'#b6b6b6ff'}}/></div>
              <p className='text-lg font-medium text-gray-400'>Aún no has agregado servicios</p>
                <Button
                  onClick={handleCreateNew}
                  sx={{
                    textTransform: 'none' ,fontFamily:'Poppins, sans-serif',
                    color: '#ffffffff',
                    background:'#bebebeff',
                    borderColor:'none',
                    fontWeight:500,
                    borderRadius:3,
                    '&:hover':{
                        backgroundColor: '#186c7e',
                    },
                    height:60,
                    width:40
                  }}
                >
                  <AddIcon />
                </Button>
            </div>
          )}
            <ServiceModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            service={selectedService}
            onSave={handleSaveService}
            />
        </main>
  );
}
