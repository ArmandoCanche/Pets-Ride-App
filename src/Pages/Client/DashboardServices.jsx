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
    // These background divs use Tailwind, which is fine
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/paw-prints-pattern.jpg')] opacity-[0.02]" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl" />

      {/* <NavigationHeader userType="client" /> Assuming this is a custom component */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* This div uses Tailwind for gradient/padding/border, OK */}


        {/* --- CONVERTED Card --- */}
        <Card sx={{ mb: 4, border: 2, borderColor: 'divider', boxShadow: 6, bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)' }}>
          <CardContent sx={{ p: 3, spaceY: 2 }}> {/* Using spaceY via sx doesn't work directly, use gap on parent or margins */}
            {/* Main Search - using Box for flex layout with sx */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
              
              {/* --- CONVERTED Input to TextField --- */}
              <TextField
                placeholder="Buscar por servicio o nombre de proveedor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                size="small" // Makes height closer to buttons
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size="1rem" className="text-gray-500" />
                    </InputAdornment>
                  ),
                }}
                sx={{ flex: 1, '& .MuiOutlinedInput-root': { pl: 1 } }} // Adjust padding for icon
              />
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                {/* --- CONVERTED Button --- */}
                <Button
                  variant="outlined"
                  size="medium" // Default, matches TextField small height better
                  onClick={() => setShowFilters(!showFilters)}
                  startIcon={<SlidersHorizontal size="1rem" />}
                  sx={{ height: 40 }} // Match TextField height
                >
                  Filtros
                </Button>
                {/* --- CONVERTED Button --- */}
                <Button
                  variant="contained" // Assuming primary action
                  color="primary" // Or your accent color theme
                  size="medium"
                  startIcon={<Search size="1rem" />}
                  sx={{ height: 40 }} // Match TextField height
                >
                  Buscar
                </Button>
              </Box>
            </Box>

            {/* Advanced Filters */}
            {showFilters && (
              // Using Box for grid layout with sx
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                gap: 2,
                pt: 2,
                mt: 2,
                borderTop: 1,
                borderColor: 'divider'
              }}>
                {/* --- CONVERTED Select --- */}
                <FormControl size="small">
                  <InputLabel id="service-type-label">Tipo de Servicio</InputLabel>
                  <Select
                    labelId="service-type-label"
                    id="serviceType"
                    value={serviceType}
                    label="Tipo de Servicio"
                    onChange={(e) => setServiceType(e.target.value)}
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

                {/* --- CONVERTED Location Input --- */}
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
                    sx={{ '& .MuiOutlinedInput-root': { pl: 1 } }}
                />

                {/* --- CONVERTED SortBy Select --- */}
                <FormControl size="small">
                  <InputLabel id="sort-by-label">Ordenar Por</InputLabel>
                  <Select
                    labelId="sort-by-label"
                    id="sortBy"
                    value={sortBy}
                    label="Ordenar Por"
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <MenuItem value="rating">Mejor Calificados</MenuItem>
                    <MenuItem value="reviews">Más Reseñas</MenuItem>
                    <MenuItem value="price-low">Precio: Menor a Mayor</MenuItem>
                    <MenuItem value="price-high">Precio: Mayor a Menor</MenuItem>
                  </Select>
                </FormControl>

                {/* --- CONVERTED Quick Filters Button --- */}
                <Box sx={{display: 'flex', flexDirection:'column', gap: 1}}>
                     <InputLabel sx={{fontSize: '0.875rem', mb: 0.5}}>Filtros Rápidos</InputLabel> {/* Approximate Label */}
                     <Button variant="outlined" size="small" sx={{height: 40}}>
                        Solo Verificados
                    </Button>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Results Info - using Tailwind, OK */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600 font-medium">
            Se encontraron {sortedServices.length} {sortedServices.length === 1 ? "servicio" : "servicios"}
          </p>
        </div>

        {sortedServices.length > 0 ? (
          // Grid layout using Tailwind, OK
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Assuming ServiceCard is a custom component */}
            {sortedServices.map((service, index) => (
              <Box key={index} onClick={() => handleViewDetails(service)}> {/* Added Box wrapper for onClick */}
                 {/* <ServiceCard {...service} /> */}
                 {/* Placeholder for ServiceCard content if it needs conversion */}
                 <Card sx={{cursor: 'pointer'}}>
                     <CardContent>
                         <Typography variant="h6">{service.providerName}</Typography>
                         <Typography variant="body2">{service.serviceType}</Typography>
                         {/* ... add more details ... */}
                     </CardContent>
                 </Card>
              </Box>
            ))}
          </div>
        ) : (
          // No results message - using Tailwind, OK
          <div className="text-center py-16 bg-gray-100/50 rounded-2xl border-2 border-dashed border-gray-300">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-500 mb-2">No se encontraron servicios</p>
            <p className="text-sm text-gray-500">Intenta ajustar tu búsqueda o filtros</p>
          </div>
        )}
      </main>
      {selectedService && (
        <ServiceDetailModal open={isModalOpen} onOpenChange={setIsModalOpen} service={selectedService} />
      )}
    </div>
  );
}