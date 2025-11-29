import { useState } from "react";
import { 
  Button, 
  IconButton, 
  Avatar, 
  Chip, 
  createTheme, 
  Dialog, 
  DialogContent, 
  Divider, 
  ThemeProvider 
} from "@mui/material";
import { ShieldOutlined } from "@mui/icons-material";
import { Clock, Heart, MapPin, Star } from "lucide-react";

// Tema personalizado
const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    }
});

export default function ServiceDetailModal({ open, onOpenChange, service, onBook }) {
    const [isFavorite, setIsFavorite] = useState(false);

    // Evitar renderizar si no hay servicio seleccionado
    if (!service) return null;

    // Valores seguros por si faltan datos
    const reviews = service.reviews || [];
    const servicesOffered = service.servicesOffered || [];

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={open}
                onClose={() => onOpenChange(false)}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: "1rem",
                            maxWidth: "600px",
                            width: "100%", // Mejor que width fijo
                            padding: 2
                        }
                    }
                }}
            >
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem"
                    }}
                >
                    {/* HEADER */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar
                                src={service.providerImage || "/placeholder.svg"}
                                alt={service.providerName}
                                sx={{ height: 64, width: 64 }}
                            >
                                {service.providerName?.charAt(0)}
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-2xl font-medium">{service.providerName}</h3>
                                <div className="flex gap-3">
                                    <Chip label={service.serviceType} />
                                    <Chip
                                        icon={<ShieldOutlined style={{ color: "#0d6578", width: 16, height: 24, marginLeft: 12 }} />}
                                        label={service.verified ? "Verificado" : "No verificado"}
                                        sx={{ color: "#0d6578", bgcolor: "#e0edee" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <IconButton
                            disableRipple
                            onClick={() => setIsFavorite(!isFavorite)}
                            color={isFavorite ? "error" : "inherit"}
                        >
                            <Heart className={`h-5 w-5 transform transition-transform duration-200 ${isFavorite ? "fill-current scale-125" : "scale-100"}`} />
                        </IconButton>
                    </div>

                    <div className="flex flex-col gap-5">
                        {/* Rating */}
                        <div className="flex items-center gap-6">
                            <Star style={{ width: 24, height: 24, color: "#fbbf24" }} fill="currentColor" />
                            <span className="text-2xl font-bold">{service.rating}</span>
                            <span className="text-gray-500">({service.reviewCount} reviews)</span>
                        </div>

                        <Divider />

                        {/* Detalles Ubicación/Horario */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 mr-1 text-gray-400" />
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">Ubicación</p>
                                    <p className="text-sm text-gray-500">{service.location}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 mr-1 text-gray-400" />
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">Horario</p>
                                    <p className="text-sm text-gray-500">{service.availability || "Consultar disponibilidad"}</p>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        {/* Descripción */}
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-lg">Acerca del servicio</h3>
                            <p className="text-sm">{service.description}</p>
                        </div>

                        {/* Servicios Ofrecidos */}
                        {servicesOffered.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-lg">Servicios ofrecidos</h3>
                                <div className="grid sm:grid-cols-2 gap-2">
                                    {servicesOffered.map((servicio, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-black" />
                                            <p className="text-sm">{servicio}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Precio */}
                        <div className="p-4 rounded-lg bg-gray-100 flex flex-col gap-3">
                            <div className="flex items-baseline justify-between">
                                <span>Empieza desde</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold">${service.price}</span>
                                    {service.priceUnit && <span>/ {service.priceUnit}</span>}
                                </div>
                            </div>
                            <p className="text-xs text-gray-400">El precio puede variar según los requisitos específicos</p>
                        </div>

                        {/* Reseñas (Opcional: mostrar solo si hay) */}
                        {reviews.length > 0 && (
                            <div className="flex flex-col gap-3">
                                <h3 className="font-semibold text-lg">Reseñas recientes</h3>
                                <div className="flex flex-col gap-3">
                                    {reviews.map((review, index) => (
                                        <div key={index} className="border border-gray-300 rounded-lg p-4 gap-2 flex flex-col">
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-3">
                                                    <Avatar>{review.initials}</Avatar>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="font-medium text-sm">{review.reviewerName}</p>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                    fill="currentColor"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-500">{review.date}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{review.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* BOTONES DE ACCIÓN */}
                        <div className="flex gap-3">
                            <Button
                                variant="outlined"
                                // CONEXIÓN CLAVE AQUÍ: Llama a onBook cuando se hace click
                                onClick={onBook} 
                                sx={{
                                    fontFamily: 'Poppins, sans-serif',
                                    flex: { xs: 'auto', sm: '1' },
                                    width: { xs: '100%', sm: 'auto' },
                                    color: '#000', background: '#fff', borderColor: '#ccc', fontWeight: 500, borderRadius: 3,
                                    '&:hover': {
                                        backgroundColor: '#eb9902ff',
                                        color: '#fff',
                                        borderColor: '#f7ae26ff',
                                    }
                                }}
                            >
                                Reservar ahora
                            </Button>
                            
                            <Button
                                variant="contained"
                                onClick={() => alert("Chat próximamente")}
                                sx={{
                                    fontFamily: 'Poppins, sans-serif',
                                    flex: { xs: 'auto', sm: '1' },
                                    width: { xs: '100%', sm: 'auto' },
                                    color: '#ffffffff', background: '#0b80d9ff',
                                    fontWeight: 500, borderRadius: 3,
                                    '&:hover': {
                                        backgroundColor: '#045a9cff',
                                        color: '#fff'
                                    }
                                }}
                            >
                                Mensaje
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    );
}