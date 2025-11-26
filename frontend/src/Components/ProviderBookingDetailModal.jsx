import {
  Dialog, DialogContent, Button, Avatar, Divider, Chip, Box, IconButton, Typography
} from "@mui/material";
import {
  Calendar, Clock, MapPin, DollarSign, MessageSquare, Phone, Mail, X, User, PawPrint
} from "lucide-react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: { fontFamily: 'Poppins, sans-serif' },
    palette: { primary: { main: '#005c71' } }
});

export default function ProviderBookingDetailModal({ open, onOpenChange, booking, onMessage }) {
  
  if (!booking) return null;

  return (
    <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          onClose={() => onOpenChange(false)}
          maxWidth="sm"
          fullWidth
          slotProps={{ paper: { sx: { borderRadius: "1.5rem", padding: 4} } }}
        >

          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Detalle del trabajo</h2>
                <IconButton onClick={() => onOpenChange(false)}><X size={20}/></IconButton>
            </div>
            {/* 1. RESUMEN DE ESTADO Y PRECIO */}
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Estado</span>
                    <Chip 
                        label={booking.status.toUpperCase()} 
                        color={booking.status === 'confirmado' ? 'success' : booking.status === 'pendiente' ? 'warning' : 'default'} 
                        size="small" 
                        sx={{fontWeight: 'bold', mt: 0.5}}
                    />
                </div>
                <div className="text-right">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Ganancia Est.</span>
                    <div className="flex items-center justify-end text-green-700 font-bold text-xl">{booking.price}
                    </div>
                </div>
            </div>

            {/* 2. CLIENTE Y MASCOTA (LO MÁS IMPORTANTE) */}
            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                    <Avatar src={booking.clientImage} sx={{ width: 56, height: 56, border: '2px solid #e0e0e0' }} />
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">{booking.client}</h3>
                        <div className="flex flex-col gap-1 mt-1">
                             <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone size={14}/> {booking.phone}
                             </div>
                             {/* Botones de acción rápida */}
                             <div className="flex gap-2 mt-2">
                                <Button variant="outlined" size="small" startIcon={<MessageSquare size={14}/>} onClick={onMessage} sx={{borderRadius: 2, textTransform:'none'}}>Chat</Button>
                                <Button variant="outlined" size="small" startIcon={<Phone size={14}/>} sx={{borderRadius: 2, textTransform:'none'}}>Llamar</Button>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                        <PawPrint size={20} className="text-[#005c71]"/>
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">{booking.pet} <span className="font-normal text-gray-500">({booking.petType})</span></p>
                        <p className="text-xs text-gray-600">{booking.petAge} • {booking.petWeight}</p>
                    </div>
                </div>
            </div>

            <Divider />

            {/* 3. LOGÍSTICA (CUÁNDO Y DÓNDE) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400 font-bold uppercase">Fecha y Hora</span>
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <Calendar size={16} className="text-[#005c71]"/> {booking.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <Clock size={16} className="text-[#005c71]"/> {booking.time} ({booking.duration})
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400 font-bold uppercase">Ubicación</span>
                    <div className="flex items-start gap-2 text-gray-700 font-medium">
                        <MapPin size={16} className="text-[#005c71] mt-1 flex-shrink-0"/> 
                        <span className="text-sm">{booking.location}</span>
                    </div>
                </div>
            </div>

            {/* 4. NOTAS ESPECIALES (Riesgo/Atención) */}
            {(booking.notes || booking.specialRequirements) && (
                <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-orange-800 mb-1">Notas del Cliente</h4>
                    <p className="text-sm text-gray-700 italic">"{booking.notes || booking.specialRequirements}"</p>
                </div>
            )}

            {/* 5. BOTÓN PRINCIPAL */}
            {booking.status === 'pendiente' ? (
                <div className="flex gap-3 mt-2">
                    <Button variant="outlined" color="error" fullWidth sx={{borderRadius: 3}}>Rechazar</Button>
                    <Button variant="contained" color="primary" fullWidth sx={{borderRadius: 3}}>Aceptar Trabajo</Button>
                </div>
            ) : (
                <Button variant="contained" color="primary" fullWidth sx={{borderRadius: 3, py: 1.5}}>
                    Ver en Mapa / Iniciar
                </Button>
            )}

          </DialogContent>
        </Dialog>
    </ThemeProvider>
  );
}