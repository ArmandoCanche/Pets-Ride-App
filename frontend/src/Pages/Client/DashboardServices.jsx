import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Transition } from '@headlessui/react';

// Services
import { servicesService } from '../../services/servicesService';

// MUI Imports
import {
  Button, TextField, Select, MenuItem, FormControl, InputLabel, Card, CardContent, InputAdornment, Box, CircularProgress, Dialog
} from '@mui/material';

// Icons
import { Search, SlidersHorizontal, MapPin } from "lucide-react";

// Componentes
import SearchCard from '../../Components/SearchCard';
import ServiceDetailModal from '../../Components/ServiceDetailModal';
import BookingForm from '../../Components/BookingForm';

export default function DashboardServices() {
  const [searchParams] = useSearchParams();
  const initialServiceType = searchParams.get('type') || 'all';

  // Estados de Filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceType, setServiceType] = useState(initialServiceType);
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(initialServiceType !== 'all');

  // Estados de Datos
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados de Modales
  const [selectedService, setSelectedService] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // --- 1. CARGA Y MAPEO CORRECTO ---
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await servicesService.getAll();
        
        // PROTECCIÓN: Verificar que data sea un array
        if (!Array.isArray(data)) {
            console.error("La API no devolvió un array:", data);
            setServices([]);
            return;
        }

        // Mapeo: Aquí corregimos el nombre de la propiedad
        const mappedServices = data.map(item => ({
          id: item.service_id,
          providerId: item.provider_id,

          providerName: item.service_title || "Servicio sin nombre", 
          
          // Subtítulo = Nombre del Proveedor
          serviceType: `por ${item.first_name || ""} ${item.last_name || ""} • ${item.category_name || "General"}`,
          
          // Imagen y otros datos
          providerImage: item.profile_picture_url || "/placeholder.svg",
          description: item.description || "Sin descripción",
          price: parseFloat(item.price || 0),
          priceUnit: item.price_unit || "sesión",
          pricingUnit: item.price_unit || "sesión", // Por compatibilidad
          location: item.address || "Ubicación remota",
          availability: "Disponible",
          verified: item.is_verified,
          
          // Datos para el Modal
          realProviderName: `${item.first_name} ${item.last_name}`,
          categoryName: item.category_name,
          
          // Mocks temporales
          rating: 5.0,
          reviewCount: 0,
          servicesOffered: item.category_name ? [item.category_name] : [],
          reviews: []
        }));

        setServices(mappedServices);
      } catch (error) {
        console.error("Error cargando servicios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // --- 2. FILTRADO SEGURO (BLINDADO) ---
  const sortedServices = useMemo(() => {
    return services
      .filter((service) => {
        const query = searchQuery.toLowerCase();
        
        // --- BLINDAJE CONTRA CRASHES ---
        // Usamos (valor || "") para asegurar que siempre sea texto antes de toLowerCase()
        const matchesSearch = 
          (service.providerName || "").toLowerCase().includes(query) || 
          (service.serviceType || "").toLowerCase().includes(query);
        
        const matchesType = serviceType === "all" || 
          (service.serviceType || "").toLowerCase().includes(serviceType.toLowerCase());

        const matchesLocation = !location || 
          (service.location || "").toLowerCase().includes(location.toLowerCase());

        return matchesSearch && matchesType && matchesLocation;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return 0;
      });
  }, [services, searchQuery, serviceType, location, sortBy]);

  // --- HANDLERS ---
  const handleViewDetails = (service) => {
    const serviceForModal = {
        ...service,
        providerName: service.realProviderName, 
        serviceType: service.categoryName       
    };
    setSelectedService(serviceForModal);
    setIsDetailOpen(true);
  };

  const handleOpenBooking = () => {
    setIsDetailOpen(false);
    setIsBookingOpen(true);
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><CircularProgress sx={{ color: '#f26644' }} /></div>;

  return (
    <main className="flex py-6 px-4 md:px-10 bg-gray-100 min-h-screen flex-col gap-6">
      
      {/* BARRA DE FILTROS */}
      <Card sx={{ border:1, borderColor:'#e1e1e1ff', borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
            <TextField
              placeholder="Buscar servicio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search size="1rem" /></InputAdornment>
              }}
              sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: 3 } }} 
            />
            <Button
                variant="outlined"
                onClick={() => setShowFilters(!showFilters)}
                startIcon={<SlidersHorizontal size="1rem" />}
                sx={{ textTransform: 'none', borderRadius: 3, borderColor: '#ccc', color: '#333' }}
            >
                Filtros
            </Button>
            <Button
                variant="contained"
                sx={{ textTransform: 'none', borderRadius: 3, bgcolor: '#f26644', '&:hover': { bgcolor: '#d95336' } }}
            >
                Buscar
            </Button>
          </Box>

          <Transition show={showFilters}>
             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, pt: 2, mt: 2, borderTop: '1px solid #eee' }}>
                <FormControl size="small">
                  <InputLabel>Categoría</InputLabel>
                  <Select value={serviceType} label="Categoría" onChange={(e) => setServiceType(e.target.value)} sx={{ borderRadius: 2 }}>
                    <MenuItem value="all">Todas</MenuItem>
                    <MenuItem value="paseo">Paseo</MenuItem>
                    <MenuItem value="veterinaria">Veterinaria</MenuItem>
                    <MenuItem value="hotel">Hospedaje</MenuItem>
                    <MenuItem value="entrenamiento">Entrenamiento</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField 
                    label="Ubicación" 
                    size="small" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><MapPin size={14}/></InputAdornment> }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <FormControl size="small">
                  <InputLabel>Ordenar</InputLabel>
                  <Select value={sortBy} label="Ordenar" onChange={(e) => setSortBy(e.target.value)} sx={{ borderRadius: 2 }}>
                    <MenuItem value="rating">Mejor Calificados</MenuItem>
                    <MenuItem value="price-low">Precio: Menor a Mayor</MenuItem>
                    <MenuItem value="price-high">Precio: Mayor a Menor</MenuItem>
                  </Select>
                </FormControl>
             </Box>
          </Transition>
        </CardContent>
      </Card>

      {/* RESULTADOS */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 font-medium">
          {sortedServices.length} servicios disponibles
        </p>
      </div>

      {sortedServices.length > 0 ? (
        <div className="grid grid-cols-12 gap-6 w-full">
          {sortedServices.map((service) => (
            <SearchCard 
                key={service.id} 
                {...service} 
                onViewDetails={() => handleViewDetails(service)}
                onBook={() => {
                    setSelectedService(service);
                    setIsBookingOpen(true);
                }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
           <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
           <p className="text-gray-500">No se encontraron servicios con esos filtros.</p>
        </div>
      )}

      {/* MODALES */}
      {selectedService && (
        <>
            <ServiceDetailModal 
                open={isDetailOpen} 
                onOpenChange={setIsDetailOpen} 
                service={selectedService}
                onBook={handleOpenBooking} 
            />
            
            {isBookingOpen && (
                <Dialog open={isBookingOpen} onClose={() => setIsBookingOpen(false)} maxWidth="sm" fullWidth>
                    <BookingForm 
                        providerId={selectedService.providerId}
                        serviceId={selectedService.id}
                        serviceName={selectedService.providerName} 
                        price={selectedService.price}
                        onClose={() => setIsBookingOpen(false)}
                    />
                </Dialog>
            )}
        </>
      )}

    </main>
  );
}