import React, { useState } from 'react'; // Added React import
// import { NavigationHeader } from "@/components/navigation-header"; // Keep custom component
// import { ServiceCard } from "@/components/service-card"; // Keep custom component
// import { ServiceDetailModal } from "@/components/service-detail-modal"; // Keep custom componentç
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
  InputAdornment, // For icons inside TextField
  Typography, // For text elements if needed
  Box // Generic container for sx prop usage
} from '@mui/material';

// Icon Imports (Keeping lucide-react as used)
import { Search, SlidersHorizontal, MapPin, Sparkles } from "lucide-react";
import SearchCard from '../../Components/SearchCard';
// Can also use MUI Icons if preferred:
// import SearchIcon from '@mui/icons-material/Search';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function SearchServicesPage() {

  const [searchParams] = useSearchParams();
  const initialServiceType = searchParams.get('type') || 'all';
  const hasInitialFilter = initialServiceType !== 'all';

  const [searchQuery, setSearchQuery] = useState("");
  const [serviceType, setServiceType] = useState(initialServiceType);
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(hasInitialFilter);
  const [selectedService, setSelectedService] = useState(null); // Removed <any>
  const [isModalOpen, setIsModalOpen] = useState(false);

const services = [
  {
    providerName: "Sarah Johnson",
    serviceType: "Paseo de perros",
    rating: 4.9,
    reviewCount: 127,
    price: 25,
    priceUnit: "hora",
    location: "Área de Central Park",
    availability: "Disponible hoy",
    verified: true,
  },
  {
    providerName: "Walky Paws",
    serviceType: "Paseo de perros",
    rating: 4.7,
    reviewCount: 98,
    price: 22,
    priceUnit: "hora",
    location: "Centro",
    availability: "Disponible mañana",
    verified: false,
  },
  {
    providerName: "Dr. Michael Chen",
    serviceType: "Atención veterinaria",
    rating: 4.8,
    reviewCount: 89,
    price: 75,
    priceUnit: "visita",
    location: "Centro",
    availability: "Próxima disponibilidad: Mañana",
    verified: true,
  },
  {
    providerName: "Clínica PetCare",
    serviceType: "Atención veterinaria",
    rating: 4.9,
    reviewCount: 150,
    price: 80,
    priceUnit: "visita",
    location: "Distrito norte",
    availability: "Disponible hoy",
    verified: true,
  },
  {
    providerName: "Happy Paws Resort",
    serviceType: "Hotel para mascotas",
    rating: 4.7,
    reviewCount: 156,
    price: 50,
    priceUnit: "noche",
    location: "Área suburbana",
    availability: "Disponible esta semana",
    verified: true,
  },
  {
    providerName: "The Pet Palace",
    serviceType: "Hotel para mascotas",
    rating: 4.6,
    reviewCount: 112,
    price: 45,
    priceUnit: "noche",
    location: "Lado oeste",
    availability: "Completo esta semana",
    verified: true,
  },
  {
    providerName: "Emma Wilson",
    serviceType: "Peluquería de mascotas",
    rating: 4.9,
    reviewCount: 203,
    price: 45,
    priceUnit: "sesión",
    location: "Lado oeste",
    availability: "Disponible hoy",
    verified: true,
  },
  {
    providerName: "Grooming by Alice",
    serviceType: "Peluquería de mascotas",
    rating: 4.8,
    reviewCount: 180,
    price: 50,
    priceUnit: "sesión",
    location: "Centro",
    availability: "Disponible la próxima semana",
    verified: true,
  },
  {
    providerName: "Quick Ride Pets",
    serviceType: "Transporte de mascotas",
    rating: 4.6,
    reviewCount: 78,
    price: 30,
    priceUnit: "viaje",
    location: "Toda la ciudad",
    availability: "Disponible 24/7",
    verified: false,
  },
  {
    providerName: "Pet-Taxi Express",
    serviceType: "Transporte de mascotas",
    rating: 4.7,
    reviewCount: 65,
    price: 35,
    priceUnit: "viaje",
    location: "Toda la ciudad",
    availability: "Bajo demanda",
    verified: true,
  },
  {
    providerName: "Pawsitive Training",
    serviceType: "Entrenamiento de mascotas",
    rating: 4.8,
    reviewCount: 92,
    price: 60,
    priceUnit: "sesión",
    location: "Distrito norte",
    availability: "Disponible los fines de semana",
    verified: false,
  },
  {
    providerName: "Good Boy Academy",
    serviceType: "Entrenamiento de mascotas",
    rating: 4.9,
    reviewCount: 110,
    price: 65,
    priceUnit: "sesión",
    location: "Área suburbana",
    availability: "Clases grupales disponibles",
    verified: true,
  },
  {
    providerName: "Home Pet Sitters",
    serviceType: "Cuidado en casa",
    rating: 4.9,
    reviewCount: 85,
    price: 40,
    priceUnit: "día",
    location: "Lado oeste",
    availability: "Disponible la próxima semana",
    verified: true,
  },
  {
    providerName: "Jane's Home Care",
    serviceType: "Cuidado en casa",
    rating: 4.7,
    reviewCount: 70,
    price: 35,
    priceUnit: "día",
    location: "Centro",
    availability: "Disponible hoy",
    verified: false,
  },
  {
    providerName: "24/7 Vet Emergency",
    serviceType: "Emergencias",
    rating: 4.9,
    reviewCount: 210,
    price: 150,
    priceUnit: "visita",
    location: "Toda la ciudad",
    availability: "Disponible 24/7",
    verified: true,
  },
  {
    providerName: "Pet-ER",
    serviceType: "Emergencias",
    rating: 4.8,
    reviewCount: 190,
    price: 140,
    priceUnit: "visita",
    location: "Distrito norte",
    availability: "Disponible 24/7",
    verified: true,
  },
];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = serviceType === "all" || service.serviceType.toLowerCase().includes(serviceType.toLowerCase());
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

  const handleViewDetails = (service) => { // Removed : any
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
                    <MenuItem value="peluqueria">Peluquería</MenuItem>
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
              <SearchCard key={index} {...service} onClick={() => handleViewDetails(service)}/>
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