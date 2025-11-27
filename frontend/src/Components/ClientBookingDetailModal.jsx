import {
  Dialog,
  DialogContent,
  Button,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Star,
  MessageSquare,
  Phone,
  Mail,
  X // Agregamos icono de cerrar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

export default function ClientBookingDetailModal({
  open,
  onOpenChange,
  booking,
  onMessage,
}) {
  const navigate = useNavigate();

  const handleMessage = () => {
    if (onMessage) {
      onMessage();
    } else {
      onOpenChange(false);
      navigate("/client/messages");
    }
  };

  const getStatusChipProps = (status) => {
    const safeStatus = status || "pendiente";
    const label = safeStatus.toUpperCase();
    
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
            bgcolor: 'rgba(59, 130, 246, 0.1)',
            color: '#1e40af',
            borderColor: 'rgba(59, 130, 246, 0.2)'
        };
        break;
      case "pendiente":
        sx = { 
            ...sx,
            bgcolor: 'rgba(234, 179, 8, 0.1)',
            color: '#ca8a04',
            borderColor: 'rgba(234, 179, 8, 0.2)'
        };
        break;
      case "completado":
        sx = { 
            ...sx,
            bgcolor: 'rgba(34, 197, 94, 0.1)',
            color: '#166534',
            borderColor: 'rgba(34, 197, 94, 0.2)'
        };
        break;
      case "cancelado":
        sx = { 
            ...sx,
            bgcolor: 'rgba(239, 68, 68, 0.1)',
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
      slotProps={{
        paper: {
          sx: {
            borderRadius: "1rem",
            padding: 3,
          },
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: 0
        }}
      >
        {/* HEADER CON BOTÓN CERRAR */}
        <div className="flex justify-between items-start">
             <div>
                <h2 className="text-xl font-bold text-gray-800">Detalle de la reserva</h2>
                <p className="text-sm text-gray-500">ID: <span className="font-mono">{booking.bookingId || `#${booking.id}`}</span></p>
             </div>
             <IconButton onClick={() => onOpenChange(false)} size="small">
                <X size={20}/>
             </IconButton>
        </div>

        {/* 1. INFORMACIÓN DEL PROVEEDOR (Tarjeta destacada) */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <Avatar
                sx={{ width: 56, height: 56, border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                src={booking.providerImage || "/placeholder.svg"}
                alt={booking.providerName}
              >
                {booking.providerName ? booking.providerName.charAt(0) : "P"}
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                      <h3 className="text-lg font-bold text-gray-800 leading-tight">{booking.providerName}</h3>
                      {booking.providerRating && (
                        <div className="flex items-center gap-1 mt-0.5">
                            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{booking.providerRating}</span>
                            <span className="text-xs text-gray-400">(128 reseñas)</span>
                        </div>
                      )}
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
                  {booking.providerPhone && (
                    <div className="flex items-center gap-1.5">
                      <Phone size={14} className="text-gray-400"/>
                      <span>{booking.providerPhone}</span>
                    </div>
                  )}
                  {booking.providerEmail && (
                    <div className="flex items-center gap-1.5">
                      <Mail size={14} className="text-gray-400"/>
                      <span className="truncate max-w-[150px]">{booking.providerEmail}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
        </div>

        <Divider />

        {/* 2. DETALLES TÉCNICOS (Grid de 2 columnas) */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div className="col-span-2 flex justify-between items-center">
                 <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-0.5">Servicio</p>
                    <p className="font-semibold text-gray-800">{booking.serviceType}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-0.5">Total</p>
                    <div className="flex items-center justify-end gap-0.5 text-green-700 font-bold text-xl">
                        <DollarSign size={18} />
                        {booking.price}
                    </div>
                 </div>
            </div>

            <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Mascota</p>
                 <p className="font-medium text-gray-800">{booking.petName}</p>
            </div>

            <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Fecha</p>
                 <div className="flex items-center gap-2 text-gray-700 font-medium">
                     <Calendar size={16} className="text-[#005c71]"/>
                     {booking.date}
                 </div>
            </div>

            <div className="col-span-2">
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Horario</p>
                 <div className="flex items-center gap-2 text-gray-700 font-medium">
                     <Clock size={16} className="text-[#005c71]"/>
                     {booking.time}
                 </div>
            </div>

            <div className="col-span-2">
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Ubicación</p>
                 <div className="flex items-start gap-2 text-gray-700 font-medium bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                     <MapPin size={16} className="text-[#005c71] mt-0.5 flex-shrink-0"/>
                     {booking.location}
                 </div>
            </div>
        </div>

        {/* 3. NOTAS */}
        {booking.notes && (
            <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-xl">
                 <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs font-bold text-yellow-700 uppercase tracking-wide">Tus Notas</h4>
                 </div>
                 <p className="text-sm text-gray-700 leading-relaxed">
                    {booking.notes}
                 </p>
            </div>
        )}

        {/* 4. ACCIONES */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full">
            <Button
              variant="outlined"
              fullWidth
              sx={{
                fontFamily:'Poppins, sans-serif',
                color: '#000',
                borderColor:'#ccc',
                fontWeight:500,
                borderRadius:3,
                textTransform: 'none',
                '&:hover':{
                    backgroundColor: '#f5f5f5',
                    borderColor: '#999',
                }
               }}
              onClick={() => onOpenChange(false)}
            >
              Cerrar
            </Button>

            <Button
              variant="contained"
              fullWidth
              sx={{
                fontFamily:'Poppins, sans-serif',
                color: '#ffffffff',
                background:'#0b80d9ff',
                fontWeight:500, 
                borderRadius:3,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover':{
                    backgroundColor: '#045a9cff',
                    boxShadow: '0 2px 8px rgba(11, 128, 217, 0.25)'
                }
               }}
              onClick={handleMessage}
              startIcon={<MessageSquare size="1.1rem" />}
            >
              Mensaje al proveedor
            </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}