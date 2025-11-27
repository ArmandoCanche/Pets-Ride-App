import {
  Dialog,
  DialogContent,
  Button,
  Avatar,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  MessageSquare,
  Phone,
  Mail,
  X,
  User,
  PawPrint,
  Info
} from "lucide-react";

export default function ProviderBookingDetailModal({ open, onOpenChange, booking, onMessage }) {
  
  if (!booking) return null;

  // Lógica de colores idéntica al Cliente (Estilo Pill)
  const getStatusChipProps = (status) => {
    const safeStatus = status || "pendiente";
    const label = safeStatus.toUpperCase(); // Texto en mayúsculas
    
    let sx = {
        fontWeight: 700,
        fontSize: '0.7rem',
        border: '1px solid',
        height: '24px',
        letterSpacing: '0.05em'
    };

    switch (safeStatus.toLowerCase()) {
      case "confirmado":
        sx = { 
            ...sx,
            bgcolor: 'rgba(59, 130, 246, 0.1)', // Azul
            color: '#1e40af', 
            borderColor: 'rgba(59, 130, 246, 0.2)' 
        };
        break;
      case "pendiente":
        sx = { 
            ...sx,
            bgcolor: 'rgba(234, 179, 8, 0.1)',  // Amarillo
            color: '#ca8a04', 
            borderColor: 'rgba(234, 179, 8, 0.2)'
        };
        break;
      case "completado":
        sx = { 
            ...sx,
            bgcolor: 'rgba(34, 197, 94, 0.1)',  // Verde
            color: '#166534', 
            borderColor: 'rgba(34, 197, 94, 0.2)'
        };
        break;
      case "cancelado":
        sx = { 
            ...sx,
            bgcolor: 'rgba(239, 68, 68, 0.1)',  // Rojo
            color: '#991b1b', 
            borderColor: 'rgba(239, 68, 68, 0.2)'
        };
        break;
      default:
        sx = { ...sx, color: 'grey.700', borderColor: 'grey.300' };
    }

    return { label, sx };
  };

  return (
      <Dialog
        open={open}
        onClose={() => onOpenChange(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: "1rem", padding: 3} } }}
      >
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 0 }}>
          
          {/* HEADER CON BOTÓN CERRAR */}
          <div className="flex justify-between items-start">
             <div>
                <h2 className="text-xl font-bold text-gray-800">Detalle del trabajo</h2>
                <p className="text-sm text-gray-500">ID: <span className="font-mono">{booking.bookingId || `#${booking.id}`}</span></p>
             </div>
             <IconButton onClick={() => onOpenChange(false)} size="small">
                <X size={20}/>
             </IconButton>
          </div>

          {/* 1. INFORMACIÓN DEL CLIENTE (Estilo Tarjeta Gris) */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-4">
             <div className="flex items-start gap-4">
                <Avatar 
                    src={booking.clientImage} 
                    alt={booking.clientName}
                    sx={{ width: 56, height: 56, border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} 
                >
                    {booking.clientName ? booking.clientName.charAt(0) : "C"}
                </Avatar>
                
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 leading-tight">
                                {booking.clientName || booking.client}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Cliente</p>
                        </div>
                        {/* CHIP DE ESTADO */}
                        <Chip
                            {...getStatusChipProps(booking.status)}
                            variant="filled"
                            size="small"
                        />
                    </div>

                    {/* Contacto Rápido */}
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        {booking.phone && (
                            <div className="flex items-center gap-1.5">
                                <Phone size={14} className="text-gray-400"/> 
                                <span>{booking.phone}</span>
                            </div>
                        )}
                        {booking.email && (
                            <div className="flex items-center gap-1.5">
                                <Mail size={14} className="text-gray-400"/> 
                                <span className="truncate max-w-[150px]">{booking.email}</span>
                            </div>
                        )}
                    </div>
                </div>
             </div>

             <div className="flex gap-2 w-full">
                 <Button 
                    variant="outlined" 
                    fullWidth 
                    size="small" 
                    startIcon={<MessageSquare size={16}/>} 
                    onClick={onMessage}
                    sx={{ borderRadius: 2, textTransform:'none', borderColor: '#ccc', color: '#555' }}
                 >
                    Chat
                 </Button>
                 <Button 
                    variant="outlined" 
                    fullWidth 
                    size="small" 
                    startIcon={<Phone size={16}/>} 
                    sx={{ borderRadius: 2, textTransform:'none', borderColor: '#ccc', color: '#555' }}
                 >
                    Llamar
                 </Button>
             </div>
          </div>

          {/* 2. LA MASCOTA (Destacado Azul) */}
          <div className="flex items-center gap-4 bg-blue-50/60 p-4 rounded-xl border border-blue-100">
             <div className="bg-white p-2.5 rounded-full shadow-sm text-[#005c71]">
                 <PawPrint size={24} />
             </div>
             <div>
                 <p className="text-sm text-blue-800 font-bold uppercase tracking-wide mb-0.5">Mascota</p>
                 <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">{booking.petName || booking.pet}</span>
                    <span className="text-sm text-gray-600 font-medium">({booking.petType})</span>
                 </div>
                 <p className="text-xs text-gray-500 mt-0.5">
                    {booking.petAge} • {booking.petWeight}
                 </p>
             </div>
          </div>

          <Divider />

          {/* 3. DETALLES DEL SERVICIO */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
             <div className="col-span-2 flex justify-between items-center">
                 <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Servicio</p>
                    <p className="font-semibold text-gray-800">{booking.serviceType || booking.service}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Ganancia</p>
                    <div className="flex items-center justify-end gap-1 text-green-700 font-bold text-xl">
                        <DollarSign size={18} />
                        {booking.price}
                    </div>
                 </div>
             </div>

             <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Fecha</p>
                 <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                     <Calendar size={16} className="text-[#005c71]"/> 
                     {booking.date}
                 </div>
             </div>

             <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Horario</p>
                 <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                     <Clock size={16} className="text-[#005c71]"/> 
                     {booking.time}
                 </div>
             </div>

             <div className="col-span-2">
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Ubicación</p>
                 <div className="flex items-start gap-2 text-gray-700 font-medium text-sm bg-gray-50 p-2 rounded-lg">
                     <MapPin size={16} className="text-[#005c71] mt-0.5 flex-shrink-0"/> 
                     {booking.location}
                 </div>
             </div>
          </div>

          {/* 4. NOTAS */}
          {(booking.notes || booking.specialRequirements) && (
             <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl mt-1">
                 <div className="flex items-center gap-2 mb-1">
                    <Info size={16} className="text-orange-600"/>
                    <h4 className="text-xs font-bold text-orange-800 uppercase">Notas del Cliente</h4>
                 </div>
                 <p className="text-sm text-gray-700 leading-relaxed pl-6">
                    {booking.notes || booking.specialRequirements}
                 </p>
             </div>
          )}

          {/* 5. ACCIONES PRINCIPALES */}
          <div className="mt-2">
            {booking.status === 'pendiente' ? (
                <div className="flex gap-3">
                    <Button 
                        variant="outlined" 
                        color="error" 
                        fullWidth 
                        sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 600 }}
                    >
                        Rechazar
                    </Button>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 600, bgcolor: '#2e7d32', '&:hover': {bgcolor: '#1b5e20'} }}
                    >
                        Aceptar Trabajo
                    </Button>
                </div>
            ) : (
                <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{ 
                        borderRadius: 3, 
                        py: 1.5, 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        bgcolor: '#005c71', 
                        '&:hover': { bgcolor: '#004a5b' } 
                    }}
                >
                    Ver en Mapa / Iniciar
                </Button>
            )}
          </div>

        </DialogContent>
      </Dialog>
  );
}