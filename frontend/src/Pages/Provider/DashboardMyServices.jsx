import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Servicios
import { servicesService } from '../../services/servicesService';

// Iconos MUI
import MovingIcon from '@mui/icons-material/Moving';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AddIcon from '@mui/icons-material/Add';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Componentes
import StatsCard from '../../Components/StatsCard';
import ServiceCard from '../../Components/ServiceCard';
import EditServiceModal from '../../Components/ServiceModal'; 

export default function DashboardMyServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // 1. CARGAR DATOS
  const fetchMyServices = async () => {
    try {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token'); 

    if (!userStr || !token) {
        console.error("No hay sesión activa (User o Token faltante)");
        navigate('/login/prestador');
        return;
    }

    const user = JSON.parse(userStr);
    setLoading(true);

    console.log("Pidiendo servicios para:", user.id); // DEBUG

    const data = await servicesService.getByProvider(user.id);
      // Mapeo de DB a Frontend
      const formattedServices = data.map(s => ({
        id: s.service_id,
        name: s.name,
        description: s.description,
        price: parseFloat(s.price),
        
        // --- DATOS NUEVOS DE TU DB ---
        priceUnit: s.price_unit, 
        coverageArea: s.coverage_area,
        acceptedSpecies: s.accepted_species,
        serviceDays: s.service_days,
        
        duration: (s.duration_minutes || 60) + " min",
        active: s.is_active,
        bookings: 0, // Pendiente de implementar endpoint de stats
        revenue: 0, 
        nextBooking: "Pendiente",
        
        category: s.category_name, 
        rawDuration: s.duration_minutes
      }));

      setServices(formattedServices);
    } catch (error) {
      console.error("Error cargando servicios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyServices();
  }, []);

  // 2. HANDLERS (Usando el servicio)

  const handleToggleStatus = async (id) => {
    try {
      const data = await servicesService.toggleStatus(id);
      // Actualización optimista local
      setServices(services.map(s => 
        s.id === id ? { ...s, active: data.is_active } : s
      ));
    } catch (error) {
      alert("Error al cambiar estado");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar servicio permanentemente?")) return;
    try {
      await servicesService.delete(id);
      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  // Abrir modal para Crear
  const handleCreateNew = () => {
    setSelectedService(null);
    setEditModalOpen(true);
  };

  // Abrir modal para Editar
  const handleEdit = (service) => {
    setSelectedService(service);
    setEditModalOpen(true);
  };

  // Callback de éxito del modal
  const handleSuccess = () => {
    fetchMyServices(); // Recargar lista completa
    // O podrías actualizar el estado localmente si quieres más velocidad
  };

  // Cálculos rápidos
  const totalRevenue = services.reduce((sum, s) => sum + (s.revenue || 0), 0);
  const activeServices = services.filter(s => s.active).length;

  if (loading) return <div className="p-20 text-center"><CircularProgress /></div>;

  return (
    <main className='flex py-6 px-4 md:px-10 bg-gray-50 min-h-screen flex-col gap-6'>

      {/* Estadísticas */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <StatsCard title="Servicios activos" value={activeServices} icon={MovingIcon} />
        <StatsCard title="Reservas totales" value={0} icon={CalendarTodayOutlinedIcon} />
        <StatsCard title="Ingresos totales" value={`$ ${totalRevenue}`} icon={AttachMoneyOutlinedIcon} />
      </div>

      {/* Botón Agregar */}
      <div className="flex justify-end">
        <Button
          onClick={handleCreateNew}
          startIcon={<AddIcon />}
          variant="contained"
          sx={{
            textTransform: 'none', 
            bgcolor: '#005c71', 
            borderRadius: 3, 
            px: 3, py: 1.5,
            '&:hover': { bgcolor: '#004d61' },
          }}
        >
          Agregar nuevo servicio
        </Button>
      </div>

      {/* Lista de Servicios */}
      {services.length > 0 ? (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              handleEdit={() => handleEdit(service)}
              toggleServiceStatus={() => handleToggleStatus(service.id)}
              handleDelete={() => handleDelete(service.id)}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center py-20 rounded-2xl border-2 border-dashed border-gray-300'>
          <HelpOutlineIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
          <p className='text-lg font-medium text-gray-500 mb-4'>Aún no has agregado servicios</p>
          <Button
            onClick={handleCreateNew}
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Crear mi primer servicio
          </Button>
        </div>
      )}

      {/* MODAL DE EDICIÓN AVANZADO */}
      <EditServiceModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        service={selectedService}
        onSuccess={handleSuccess}
      />
    </main>
  );
}