import React, { useState } from 'react'; // Added React import
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
    description: "Amante de los perros con experiencia...",
    servicesOffered: ['Paseos en grupo', 'Paseos individuales', 'Alimentación post-paseo', 'Reportes con foto'],
    reviews: [
      { reviewerName: "Ana López", initials: "AL", rating: 5, date: "Hace 1 día", content: "Sarah es increíble con mi perro, Max. Vuelve súper feliz y cansado de sus paseos por Central Park. ¡Totalmente recomendada!" },
      { reviewerName: "Carlos Gómez", initials: "CG", rating: 5, date: "Hace 3 días", content: "El mejor servicio de paseo. Sarah manda fotos y un reporte después de cada paseo. Muy profesional." }
    ]
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
    description: "Servicio de paseo de perros confiable en el centro...",
    servicesOffered: ['Paseos matutinos', 'Paseos de mediodía', 'Juegos en el parque'],
    reviews: [
      { reviewerName: "María Fernández", initials: "MF", rating: 4, date: "Hace 1 semana", content: "Buen servicio, mi perro parece contento. Me gusta que sean grupos pequeños. A veces son un poco impuntuales, pero nada grave." },
      { reviewerName: "David Ruiz", initials: "DR", rating: 5, date: "Hace 2 semanas", content: "¡Walky Paws salvó mis mañanas! Son confiables y mi cachorro los adora. El seguimiento por GPS es un plus." }
    ]
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
    description: "Veterinario compasivo con 10 años de experiencia...",
    servicesOffered: ['Consultas generales', 'Vacunación', 'Desparasitación', 'Chequeos de salud'],
    reviews: [
      { reviewerName: "Laura Torres", initials: "LT", rating: 5, date: "Hace 5 días", content: "El Dr. Chen es el mejor. Trató a mi gato con tanta paciencia y amabilidad. Explicó todo claramente. No iría a ningún otro lado." },
      { reviewerName: "Javier Ortiz", initials: "JO", rating: 5, date: "Hace 1 semana", content: "Excelente atención para la vacunación anual de mi perro. Rápido, profesional y se nota que le importan los animales." }
    ]
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
    description: "Clínica veterinaria de servicio completo...",
    servicesOffered: ['Consultas', 'Vacunación', 'Cirugías menores', 'Análisis de laboratorio', 'Rayos X'],
    reviews: [
      { reviewerName: "Sofía Vargas", initials: "SV", rating: 5, date: "Hace 2 días", content: "Llevé a mi conejo por una emergencia menor y el personal de PetCare fue fantástico. Instalaciones muy limpias y modernas." },
      { reviewerName: "Miguel Ángel", initials: "MA", rating: 4, date: "Hace 1 semana", content: "Muy buena clínica. Tienen todo allí mismo (Rayos X, laboratorio). Los precios son un poco altos, pero la calidad lo vale." }
    ]
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
    description: "Un lujoso hotel para mascotas en las afueras...",
    servicesOffered: ['Alojamiento nocturno', 'Guardería de día', 'Tiempo de juego supervisado', 'Alimentación premium'],
    reviews: [
      { reviewerName: "Elena Silva", initials: "ES", rating: 5, date: "Hace 4 días", content: "¡Un verdadero resort de 5 estrellas! Dejé a mi perra por un fin de semana y recibí videos de ella jugando. Volvió feliz. Las suites son geniales." },
      { reviewerName: "Roberto Paredes", initials: "RP", rating: 5, date: "Hace 10 días", content: "Impresionado con la supervisión 24/7. El personal es muy atento. Vale cada centavo por la tranquilidad que te da." }
    ]
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
    description: "El lugar perfecto para que tu mascota se quede...",
    servicesOffered: ['Alojamiento nocturno', 'Cuidado de día', 'Paseos diarios incluidos', 'Administración de medicamentos'],
    reviews: [
      { reviewerName: "Patricia Mendoza", initials: "PM", rating: 5, date: "Hace 1 semana", content: "Ambiente muy hogareño. A mi gata, que es muy tímida, le fue de maravilla. El personal le dio mucho cariño. Se nota que no la dejaron sola." },
      { reviewerName: "Luis Cordero", initials: "LC", rating: 4, date: "Hace 3 semanas", content: "Buena opción en el Lado Oeste. Es más sencillo que otros 'hoteles', pero limpio y seguro. Mi perro estuvo bien." }
    ]
  },
  {
    providerName: "Emma Wilson",
    serviceType: "Peluqueria de mascotas",
    rating: 4.9,
    reviewCount: 203,
    price: 45,
    priceUnit: "sesión",
    location: "Lado oeste",
    availability: "Disponible hoy",
    verified: true,
    description: "Estilista canina profesional con un toque suave...",
    servicesOffered: ['Baño y secado', 'Corte de pelo completo', 'Corte de uñas', 'Limpieza de oídos'],
    reviews: [
      { reviewerName: "Gabriela Ríos", initials: "GR", rating: 5, date: "Hace 2 días", content: "Emma es una artista. Dejó a mi Poodle espectacular, el corte de raza fue perfecto. Además, fue muy dulce con él." },
      { reviewerName: "Diego Núñez", initials: "DN", rating: 5, date: "Hace 1 semana", content: "¡El mejor baño y corte de uñas! Mi perro suele odiar la peluquería, pero con Emma estuvo tranquilo. Súper recomendada." }
    ]
  },
  {
    providerName: "Grooming by Alice",
    serviceType: "Peluqueria de mascotas",
    rating: 4.8,
    reviewCount: 180,
    price: 50,
    priceUnit: "sesión",
    location: "Centro",
    availability: "Disponible la próxima semana",
    verified: true,
    description: "Salón de peluquería en el centro que utiliza solo productos orgánicos...",
    servicesOffered: ['Baño hipoalergénico', 'Corte de raza', 'Corte de uñas y limado', 'Tratamiento anti-pulgas'],
    reviews: [
      { reviewerName: "Valentina Mora", initials: "VM", rating: 5, date: "Hace 6 días", content: "Me encanta que usen productos orgánicos. Mi perra tiene la piel sensible y salió perfecta, sin irritación. Alice es muy profesional." },
      { reviewerName: "Santiago Gil", initials: "SG", rating: 4, date: "Hace 2 semanas", content: "Muy buen servicio. El lugar es relajante. La única pega es que es difícil conseguir cita, hay que reservar con mucha antelación." }
    ]
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
    description: "Servicio de transporte de mascotas rápido y seguro...",
    servicesOffered: ['Transporte a citas veterinarias', 'Traslados al aeropuerto', 'Transporte de emergencia', 'Servicio puerta a puerta'],
    reviews: [
      { reviewerName: "Jimena Castro", initials: "JC", rating: 4, date: "Hace 1 semana", content: "Servicio muy útil. Los usé para llevar a mi gato al veterinario y todo bien. El conductor fue amable. No es verificado, pero fue confiable." },
      { reviewerName: "Andrés Rojas", initials: "AR", rating: 5, date: "Hace 2 semanas", content: "¡Disponibles 24/7! Me salvaron de una emergencia nocturna para ir al hospital veterinario. Respuesta rápida." }
    ]
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
    description: "Transporte express bajo demanda para tu mascota...",
    servicesOffered: ['Transporte bajo demanda', 'Viajes locales', 'Vehículos con aire acondicionado'],
    reviews: [
      { reviewerName: "Lucía Soto", initials: "LS", rating: 5, date: "Hace 3 días", content: "¡Excelente! El vehículo estaba impecable y climatizado. Mi perro, que es grande, cupo perfectamente. Muy profesional y verificado." },
      { reviewerName: "Mateo León", initials: "ML", rating: 5, date: "Hace 1 semana", content: "Puntuales y muy cuidadosos con la jaula de mi gata. El servicio bajo demanda funciona de maravilla. Lo volveré a usar." }
    ]
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
    description: "Entrenamiento basado en refuerzo positivo...",
    servicesOffered: ['Clases de obediencia básica', 'Entrenamiento para cachorros', 'Modificación de conducta', 'Clases privadas'],
    reviews: [
      { reviewerName: "Daniela Solís", initials: "DS", rating: 5, date: "Hace 1 semana", content: "Las clases de obediencia básica cambiaron a mi cachorro. El método de refuerzo positivo funciona. ¡Muy recomendado!" },
      { reviewerName: "Ricardo Ponce", initials: "RP", rating: 4, date: "Hace 3 semanas", content: "Buen entrenador. Vemos progreso. Sería genial si tuvieran más horarios entre semana, no solo los fines de semana." }
    ]
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
    description: "Academia de entrenamiento canino de primer nivel...",
    servicesOffered: ['Clases grupales', 'Entrenamiento de agilidad (Agility)', 'Socialización de cachorros'],
    reviews: [
      { reviewerName: "Camila Díaz", initials: "CD", rating: 5, date: "Hace 1 semana", content: "¡Las clases de agilidad son lo máximo! Mi Border Collie las disfruta muchísimo. El ambiente es genial y muy profesional." },
      { reviewerName: "Jorge Vega", initials: "JV", rating: 5, date: "Hace 2 semanas", content: "Llevamos a nuestro cachorro para socialización y fue la mejor decisión. Aprendió a jugar con otros perros de forma segura." }
    ]
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
    description: "Cuidamos a tu mascota en la comodidad de su propio hogar...",
    servicesOffered: ['Cuidado en casa por día', 'Visitas diarias', 'Alimentación y agua fresca', 'Paseos y juego'],
    reviews: [
      { reviewerName: "Fernanda Luna", initials: "FL", rating: 5, date: "Hace 1 semana", content: "Increíble servicio. Dejé a mis dos gatos por 4 días y me mandaban fotos y updates diarios. Volví y estaban súper relajados." },
      { reviewerName: "Esteban Mora", initials: "EM", rating: 5, date: "Hace 3 semanas", content: "Prefiero mil veces esto a un hotel. Mi perro es muy ansioso y en casa estuvo perfecto. El cuidador siguió todas mis instrucciones." }
    ]
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
    description: "Servicio de cuidado en casa personalizado...",
    servicesOffered: ['Cuidado en casa', 'Administración de medicamentos', 'Paseos cortos', 'Compañía'],
    reviews: [
      { reviewerName: "Isabela Reyes", initials: "IR", rating: 5, date: "Hace 1 día", content: "Jane es un amor. Cuidó a mi perro viejito y le dio sus medicinas sin problema. Es muy responsable y cariñosa." },
      { reviewerName: "Bruno Acosta", initials: "BA", rating: 4, date: "Hace 1 semana", content: "Buen servicio de cuidado en casa. Confiable y a buen precio. Perfecto para visitas de mediodía." }
    ]
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
    description: "Hospital de emergencia veterinaria totalmente equipado...",
    servicesOffered: ['Atención de urgencias 24/7', 'Cirugía de emergencia', 'Cuidados intensivos', 'Hospitalización'],
    reviews: [
      { reviewerName: "Mónica Salas", initials: "MS", rating: 5, date: "Hace 1 semana", content: "Llegamos a las 3 AM con mi perro y nos atendieron de inmediato. El equipo fue increíblemente profesional y nos salvaron la vida." },
      { reviewerName: "Raúl Jiménez", initials: "RJ", rating: 5, date: "Hace 2 semanas", content: "Nadie quiere ir a emergencias, pero si tienes que ir, este es el lugar. Tienen de todo y el personal es de primera. Muy agradecido." }
    ]
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
    description: "Clínica de emergencias en el Distrito Norte...",
    servicesOffered: ['Atención de emergencias', 'Diagnóstico rápido (Rayos X, Ultrasonido)', 'Cirugías urgentes', 'Transfusiones de sangre'],
    reviews: [
      { reviewerName: "Adriana Peña", initials: "AP", rating: 5, date: "Hace 1 semana", content: "Atención rápida y diagnósticos certeros. Tuvieron que hacerle una cirugía urgente a mi gata y todo salió perfecto. Los recomiendo." },
      { reviewerName: "Óscar Fuentes", initials: "OF", rating: 4, date: "Hace 3 semanas", content: "Muy buen servicio de emergencia en el Distrito Norte. Los costos son elevados, como en toda emergencia, pero el servicio es excelente." }
    ]
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