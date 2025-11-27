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
import ServiceCard from '../../Components/ServiceCard';
import ServiceModal from '../../Components/ServiceModal';

// Función auxiliar para obtener ID
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
  const [services, setServices] = useState([]);

  // 1. CARGAR DATOS (READ)
  useEffect(() => {
    const fetchServices = async () => {
      const providerId = getUserIdFromToken();
      if (!providerId) return;

      try {
        const response = await fetch(`http://localhost:3001/api/services/provider/${providerId}`);
        if (response.ok) {
          const dbServices = await response.json();
          // Mapeo de base de datos a frontend
          const formattedServices = dbServices.map(s => ({
            id: s.service_id,
            name: s.name,
            description: s.description,
            price: parseFloat(s.price),
            priceUnit: "sesión",
            duration: s.duration_minutes + " min",
            active: s.is_active,
            bookings: 0,
            revenue: 0,
            nextBooking: "Pendiente",
            // Guardamos datos crudos para el modal de edición
            category: s.category_name || "", 
            rawDuration: s.duration_minutes
          }));
          setServices(formattedServices);
        }
      } catch (error) {
        console.error("Error cargando servicios:", error);
      }
    };
    fetchServices();
  }, []);

  // 2. CAMBIAR ESTADO (ACTIVAR/DESACTIVAR)
  const toggleServiceStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/services/${id}/status`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        const data = await response.json();
        // Actualizar estado localmente
        setServices(services.map((service) => 
          (service.id === id ? { ...service, active: data.is_active } : service)
        ));
      } else {
        alert("No se pudo cambiar el estado del servicio");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  }

  // 3. ELIMINAR SERVICIO (DELETE)
  const handleDeleteService = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este servicio permanentemente?")) return;

    try {
      const response = await fetch(`http://localhost:3001/api/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        // Eliminar del estado local
        setServices(services.filter((service) => service.id !== id));
        alert("Servicio eliminado correctamente");
      } else {
        alert("Error al eliminar el servicio");
      }
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  }

  // Abrir modal para Crear
  const handleCreateNew = () => {
    setSelectedService(null);
    setEditModalOpen(true);
  }

  // Abrir modal para Editar
  const handleEdit = (service) => {
    // Preparamos el objeto para el modal (ServiceModal espera ciertos campos)
    const serviceToEdit = {
        ...service,
        duration: service.rawDuration || parseInt(service.duration), // Asegurar formato número
        // Asegúrate de pasar la categoría correcta si la tienes en el objeto service
    };
    setSelectedService(serviceToEdit);
    setEditModalOpen(true);
  }

  // 4. GUARDAR (CREAR O EDITAR)
  const handleSaveService = async (dataFromModal) => {
    const providerId = getUserIdFromToken();
    if (!providerId) {
      alert("Error de sesión.");
      return;
    }

    const payload = {
      provider_id: providerId,
      name: dataFromModal.name,
      description: dataFromModal.description,
      price: dataFromModal.price,
      duration: dataFromModal.duration,
      category: dataFromModal.category
    };

    try {
      let url = 'http://localhost:3001/api/services';
      let method = 'POST';

      // Si existe selectedService, es una EDICIÓN (PUT)
      if (selectedService) {
        url = `http://localhost:3001/api/services/${selectedService.id}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        const savedService = data.service; // Objeto devuelto por la BD

        // Formatear para la vista
        const formattedService = {
            id: savedService.service_id,
            name: savedService.name,
            description: savedService.description,
            price: parseFloat(savedService.price),
            priceUnit: "sesión",
            duration: savedService.duration_minutes + " min",
            active: savedService.is_active,
            bookings: selectedService ? selectedService.bookings : 0, // Mantener datos antiguos si es edit
            revenue: selectedService ? selectedService.revenue : 0,
            nextBooking: selectedService ? selectedService.nextBooking : "Sin reservas",
            rawDuration: savedService.duration_minutes,
            category: dataFromModal.category // Guardamos la categoría seleccionada
        };

        if (selectedService) {
            // Actualizar lista existente
            setServices(services.map(s => s.id === selectedService.id ? formattedService : s));
            alert("Servicio actualizado correctamente");
        } else {
            // Agregar nuevo a la lista
            setServices([...services, formattedService]);
            alert("Servicio creado correctamente");
        }
        
        setEditModalOpen(false);
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
    <main className='flex py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>

      {/* Estadísticas */}
      <div className='w-full h-auto grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-9 gap-6'>
        <StatsCard title="Servicios activos" value={activeServices} icon={MovingIcon} />
        <StatsCard title="Reservas totales" value={totalBookings} icon={CalendarTodayOutlinedIcon} />
        <StatsCard title="Ingresos totales" value={`$ ${totalRevenue}`} icon={AttachMoneyOutlinedIcon} />
      </div>

      {/* Botón Agregar */}
      <div>
        <Button
          onClick={handleCreateNew}
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none', fontFamily: 'Poppins, sans-serif',
            color: '#ffffffff', background: '#175a69ff', borderColor: 'none',
            fontWeight: 500, borderRadius: 3, paddingX: 3, paddingY: 1.5,
            '&:hover': { backgroundColor: '#186c7e' },
          }}
        >
          Agregar nuevo servicio
        </Button>
      </div>

      {/* Lista de Servicios */}
      {services.length > 0 ? (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6'>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              // Pasamos las funciones conectadas al backend
              handleEdit={() => handleEdit(service)}
              toggleServiceStatus={() => toggleServiceStatus(service.id)}
              handleDelete={() => handleDeleteService(service.id)} // <--- IMPORTANTE: Pasar handleDelete
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col gap-6 text-center py-18 rounded-2xl border-1 border-gray-300 shadow-sm '>
          <div><HelpOutlineIcon sx={{ height: 64, width: 64, color: '#b6b6b6ff' }} /></div>
          <p className='text-lg font-medium text-gray-400'>Aún no has agregado servicios</p>
          <Button
            onClick={handleCreateNew}
            sx={{
              textTransform: 'none', fontFamily: 'Poppins, sans-serif',
              color: '#ffffffff', background: '#bebebeff', borderColor: 'none',
              fontWeight: 500, borderRadius: 3, height: 60, width: 40,
              '&:hover': { backgroundColor: '#186c7e' },
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