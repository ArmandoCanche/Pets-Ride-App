import React, { useState } from 'react'; // Added React import
// import { NavigationHeader } from "@/components/navigation-header"; // Keep custom component
// import { ServiceCard } from "@/components/service-card"; // Keep custom component
// import { ServiceDetailModal } from "@/components/service-detail-modal"; // Keep custom component

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
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceType, setServiceType] = useState("all");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedService, setSelectedService] = useState(null); // Removed <any>
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - in real app, this would come from API/database
  const services = [
    {
      providerName: "Sarah Johnson",
      serviceType: "Dog Walking",
      rating: 4.9,
      reviewCount: 127,
      price: 25,
      priceUnit: "hour",
      location: "Central Park Area",
      availability: "Available Today",
      verified: true,
    },
    {
      providerName: "Dr. Michael Chen",
      serviceType: "Veterinary Care",
      rating: 4.8,
      reviewCount: 89,
      price: 75,
      priceUnit: "visit",
      location: "Downtown",
      availability: "Next available: Tomorrow",
      verified: true,
    },
    {
      providerName: "Happy Paws Resort",
      serviceType: "Pet Hotel",
      rating: 4.7,
      reviewCount: 156,
      price: 50,
      priceUnit: "night",
      location: "Suburban Area",
      availability: "Available This Week",
      verified: true,
    },
    {
      providerName: "Emma Wilson",
      serviceType: "Pet Grooming",
      rating: 4.9,
      reviewCount: 203,
      price: 45,
      priceUnit: "session",
      location: "West Side",
      availability: "Available Today",
      verified: true,
    },
    {
      providerName: "Quick Ride Pets",
      serviceType: "Pet Transport",
      rating: 4.6,
      reviewCount: 78,
      price: 30,
      priceUnit: "trip",
      location: "City Wide",
      availability: "24/7 Available",
      verified: false,
    },
    {
      providerName: "Pawsitive Training",
      serviceType: "Pet Training",
      rating: 4.8,
      reviewCount: 92,
      price: 60,
      priceUnit: "session",
      location: "North District",
      availability: "Weekends Available",
      verified: false,
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
                  sx={{ height: 40, borderRadius: 3, bgcolor:'#fff',color: '#000000ff', borderColor:'#ccc','&:hover': { bgcolor: '#f37556',
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
                  sx={{ height: 40 , borderRadius:3, color:'#fff', bgcolor:'#f37556', '&:hover': { bgcolor: '#f37556' } }}
                >
                  Buscar
                </Button>
              </Box>
            </Box>
            {showFilters && (
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
                    <MenuItem value="walking">Paseo de Perros</MenuItem>
                    <MenuItem value="veterinary">Cuidado Veterinario</MenuItem>
                    <MenuItem value="hotel">Hotel para Mascotas</MenuItem>
                    <MenuItem value="grooming">Peluquería</MenuItem>
                    <MenuItem value="transport">Transporte</MenuItem>
                    <MenuItem value="training">Entrenamiento</MenuItem>
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
                     <Button variant="outlined" size="small" sx={{ height: 40, borderRadius: 3, bgcolor:'#fff',color: '#000000ff', borderColor:'#ccc','&:hover': { bgcolor: '#f37556',
                    color: '#fff',
                    borderColor: '#f37556',}}}>
                        Solo Verificados
                    </Button>
              </Box>
            )}
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