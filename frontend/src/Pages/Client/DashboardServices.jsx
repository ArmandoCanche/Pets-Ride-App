import React, { useState, useEffect } from 'react'; // Added React import
import { Transition } from '@headlessui/react';
import { useSearchParams } from 'react-router-dom';

// MUI Imports
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  InputAdornment,
  Typography,
  Box
} from '@mui/material';

// Icon Imports (Keeping lucide-react as used)
import { Search, SlidersHorizontal, MapPin, Sparkles } from "lucide-react";
import SearchCard from '../../Components/SearchCard';
import ServiceDetailModal from '../../Components/ServiceDetailModal';


export default function SearchServicesPage() {

  const [searchParams] = useSearchParams();
  const initialServiceType = searchParams.get('type') || 'all';
  const hasInitialFilter = initialServiceType !== 'all';

  const [searchQuery, setSearchQuery] = useState("");
  const [serviceType, setServiceType] = useState(initialServiceType);
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(hasInitialFilter);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

// 1. ESTADO PARA LOS SERVICIOS
  const [services, setServices] = useState([]); 

  // 2. CARGAR SERVICIOS DESDE EL BACKEND
  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/services');
        if (response.ok) {
          const data = await response.json();
          
          // Mapeamos los datos de la BD al formato que espera tu SearchCard y Modal
          const formattedServices = data.map(item => ({
            id: item.service_id,
            providerName: item.service_title,
            // Usamos una imagen placeholder o aleatoria ya que la BD no tiene fotos aún
            providerImage: item.profile_picture_url || "/placeholder.svg", 
            realProviderName: `${item.first_name} ${item.last_name}`,
            serviceType: item.category_name, // Ej: "Paseo de perros"
            // Datos reales de la BD
            description: item.description,
            price: parseFloat(item.price),
            priceUnit: "sesión", // Puedes ajustarlo si agregas unidad a la BD
            location: item.location || "Ubicación no especificada",
            verified: item.is_verified,
            availability: "Disponible", // Dato mockeado por ahora
            
            // Datos Mockeados (necesarios para que no rompa la UI actual)
            rating: 5.0, // Por defecto 5 hasta implementar sistema de reviews
            reviewCount: 0,
            servicesOffered: [item.service_title], // Usamos el nombre del servicio
            reviews: [] 
          }));

          setServices(formattedServices);
        }
      } catch (error) {
        console.error("Error cargando servicios:", error);
      }
    };

    fetchAllServices();
  }, []);

  // 3. FILTRADO (La lógica se mantiene igual, pero opera sobre el estado 'services')
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Ajuste: comparar category_name (serviceType)
    const matchesType = serviceType === "all" || 
      service.serviceType.toLowerCase().includes(serviceType.toLowerCase()) ||
      // Soporte para los valores del select (ej: 'paseo' vs 'Paseo de perros')
      (serviceType === 'paseo' && service.serviceType.toLowerCase().includes('paseo')) ||
      (serviceType === 'veterinaria' && service.serviceType.toLowerCase().includes('veterinaria'));

    const matchesLocation = !location || service.location.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
    return 0;
  });

  const handleViewDetails = (service) => { 
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
      <main className="flex  py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6">


        <Card sx={{ border:1, borderColor:'#e1e1e1ff', borderRadius: 3 }}>
          <CardContent sx={{ p: 3, spaceY: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
              <TextField
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                size="small"
                slotProps={{
                  input: {
                      startAdornment: (
                      <InputAdornment position="start">
                        <Search size="1rem" className="text-gray-500" />
                      </InputAdornment>
                  ),
                  }

                }}
                sx={{ flex: 1, '& .MuiOutlinedInput-root': { pl: 2, borderRadius: 3, gap:2 } }} 
              />

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => setShowFilters(!showFilters)}
                  startIcon={<SlidersHorizontal size="1rem" />}
                  sx={{ textTransform: 'none' , height: 40, fontFamily:'Poppins, sans-serif', borderRadius: 3, bgcolor:'#fff',color: '#000000ff', borderColor:'#ccc','&:hover': { bgcolor: '#f37556',
                    color: '#fff',
                    borderColor: '#f37556',
                   } }}
                >
                  Filtros
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<Search size="1rem" />}
                  sx={{textTransform: 'none' , height: 40 , fontFamily:'Poppins, sans-serif',borderRadius:3, color:'#fff', bgcolor:'#f37556', '&:hover': { bgcolor: '#f37556' } }}
                >
                  Buscar
                </Button>
              </Box>
            </Box>
            <Transition
            show={showFilters}
            as="div"

            enter="transition ease-out duration-300"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            >
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                gap: 2,
                pt: 2,
                mt: 2,
                borderTop: 1,
                borderColor: 'divider',
              }}>
                <FormControl size="small">
                  <InputLabel id="service-type-label">Tipo de Servicio</InputLabel>
                  <Select
                    labelId="service-type-label"
                    id="serviceType"
                    value={serviceType}
                    label="Tipo de Servicio"
                    onChange={(e) => setServiceType(e.target.value)}
                    sx={{borderRadius:3}}
                  >
                    <MenuItem value="all">Todos los Servicios</MenuItem>
                    <MenuItem value="paseo">Paseo de Perros</MenuItem>
                    <MenuItem value="veterinaria">Atención veterinaria</MenuItem>
                    <MenuItem value="transporte">Transporte</MenuItem>
                    <MenuItem value="hotel">Hoteles</MenuItem>
                    <MenuItem value="peluqueria">Peluqueria</MenuItem>
                    <MenuItem value="entrenamiento">Entrenamiento</MenuItem>
                    <MenuItem value="cuidado en casa">Cuidado en casa</MenuItem>
                    <MenuItem value="emergencias">Emergencias</MenuItem>
                  </Select>
                </FormControl>
                 <TextField
                    id="location"
                    label="Ubicación"
                    placeholder="Ingresa ubicación..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    variant="outlined"
                    size="small"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <MapPin size="1rem" className="text-gray-500" />
                        </InputAdornment>
                    ),
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { pl: 1, borderRadius: 3 } }}
                />
                <FormControl size="small">
                  <InputLabel id="sort-by-label">Ordenar Por</InputLabel>
                  <Select
                    labelId="sort-by-label"
                    id="sortBy"
                    value={sortBy}
                    label="Ordenar Por"
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{borderRadius: 3}}
                  >
                    <MenuItem value="rating">Mejor Calificados</MenuItem>
                    <MenuItem value="reviews">Más Reseñas</MenuItem>
                    <MenuItem value="price-low">Precio: Menor a Mayor</MenuItem>
                    <MenuItem value="price-high">Precio: Mayor a Menor</MenuItem>
                  </Select>
                </FormControl>
                     <Button variant="outlined" size="small" sx={{textTransform: 'none' , height: 40, borderRadius: 3, bgcolor:'#fff',color: '#000000ff', borderColor:'#ccc','&:hover': { bgcolor: '#f37556',
                    color: '#fff',
                    borderColor: '#f37556',}}}>
                        Solo verificados
                    </Button>
              </Box>
            </Transition>
          </CardContent>
        </Card>

        <div className="my-4 flex items-center justify-between">
          <p className="text-sm text-gray-600 font-medium">
            Se encontraron {sortedServices.length} {sortedServices.length === 1 ? "servicio" : "servicios"}
          </p>
        </div>

        {sortedServices.length > 0 ? (
          <div className="grid grid-cols-12 gap-6">
            {sortedServices.map((service, index) => (
              <SearchCard key={index} {...service} onViewDetails={() => handleViewDetails(service)}/>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-100/50 rounded-2xl border-2 border-dashed border-gray-300">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-500 mb-2">No se encontraron servicios</p>
            <p className="text-sm text-gray-500">Intenta ajustar tu búsqueda o filtros</p>
          </div>
        )}
      {selectedService && (
        <ServiceDetailModal open={isModalOpen} onOpenChange={setIsModalOpen} service={selectedService} />
      )}
      </main>
  );
}