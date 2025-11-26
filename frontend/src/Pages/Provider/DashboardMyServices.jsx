
import React, { useState, useEffect } from 'react';

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

// <--- FUNCIÓN AUXILIAR FUERA DEL COMPONENTE
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user.id; 
  } catch (e) {
    console.error("Error al obtener ID:", e);
    return null;
  }
};

export default function DashboardMyServices() {


  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  // <--- CAMBIO: Inicializar vacío, los datos vendrán del backend
  const [services, setServices] = useState([]); 

  // <---CARGAR DATOS AL INICIO
  useEffect(() => {
    const fetchServices = async () => {
      const providerId = getUserIdFromToken();
      if (!providerId) return;

      try {
        const response = await fetch(`http://localhost:3001/api/services/provider/${providerId}`);
        if (response.ok) {
          const dbServices = await response.json();
          // Transformar datos de BD (snake_case) al formato de tu Frontend (camelCase)
          const formattedServices = dbServices.map(s => ({
            id: s.service_id,
            name: s.name,
            description: s.description,
            price: parseFloat(s.price),
            priceUnit: "sesión", // O ajustarlo según tu lógica
            duration: s.duration_minutes + " min",
            active: s.is_active,
            bookings: 0,
            revenue: 0,
            nextBooking: "Pendiente"
          }));
          setServices(formattedServices);
        }
      } catch (error) {
        console.error("Error cargando servicios:", error);
      }
    };
    fetchServices();
  }, []);

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

  // <--- 3. REEMPLAZAR COMPLETAMENTE LA FUNCIÓN handleSaveService
  const handleSaveService = async (dataFromModal) => {
    const providerId = getUserIdFromToken();
    if (!providerId) {
      alert("Error de sesión. Vuelve a ingresar.");
      return;
    }

    // Preparamos el objeto para enviar al backend
    const newServicePayload = {
      provider_id: providerId,
      name: dataFromModal.name,
      description: dataFromModal.description,
      price: dataFromModal.price,
      duration: dataFromModal.duration, 
      category: dataFromModal.category
    };

    try {
      const response = await fetch('http://localhost:3001/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newServicePayload)
      });

      const data = await response.json();

      if (response.ok) {
        // Si se guardó en BD, actualizamos la lista visualmente
        const newServiceForList = {
          id: data.service.service_id, // ID real de la base de datos
          name: data.service.name,
          description: data.service.description,
          price: parseFloat(data.service.price),
          priceUnit: "sesión",
          duration: data.service.duration_minutes + " min",
          active: data.service.is_active,
          bookings: 0,
          revenue: 0,
          nextBooking: "Sin reservas",
        };

        setServices([...services, newServiceForList]);
        setEditModalOpen(false);
        alert("Servicio guardado correctamente");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor.");
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
