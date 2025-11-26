import { Avatar, Button, Divider, IconButton, Tooltip } from "@mui/material";

// Iconos MUI
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import EditCalendarIcon from '@mui/icons-material/EditCalendar'; // Icono para reprogramar
import StarRateIcon from '@mui/icons-material/StarRate';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Icono para cancelar cita confirmada

export default function BookingCardProvider({
    clientImage, // 1. Corregido nombre (antes clientImagen)
    client,
    service,
    pet,
    petType,
    status,
    date,
    time,
    duration,
    location,
    price,
    phone,
    email,
    rating,
    onViewDetails,
    onReschedule, // 2. Nueva prop recibida
    onCancel,     // 3. Nueva prop recibida
    onAccept      // 4. Nueva prop para aceptar pendientes
}) {
    
    const statusColors = {
        pendiente:  "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
        confirmado: "bg-blue-500/10 text-blue-800 border border-blue-500/20",
        completado: "bg-green-500/10 text-green-800 border border-green-500/20",
        cancelado:  "bg-red-500/10 text-red-800 border border-red-500/20",
    };

    return (
        <div>
            <div className="flex flex-col gap-6 border p-6 rounded-2xl shadow-sm border-1 border-gray-300 bg-white">
                {/* --- Primera Sección: Header --- */}
                <div>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            {/* Usamos clientImage corregido */}
                            <Avatar src={clientImage || "/placeholder.svg"} alt={`${client}`}>{client?.charAt(0)}</Avatar>
                            <div className="">
                                <h2 className="text-lg font-semibold">{service}</h2>
                                <p className="text-sm text-gray-500">{client} • {pet} ({petType})</p>
                            </div>
                        </div>
                        <div className={`flex px-2 py-1 rounded-2xl ${statusColors[status] || statusColors.pendiente}`}>
                            <p className="text-xs font-medium">
                                {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Estado'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Segunda Sección: Detalles --- */}
                <div className="flex flex-col gap-2">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CalendarTodayOutlinedIcon sx={{ fontSize: '1.2rem', color: '#969696' }} />
                            <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <AccessTimeOutlinedIcon sx={{ fontSize: '1.2rem', color: '#969696' }} />
                            <span>{time} • {duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <LocationOnOutlinedIcon sx={{ fontSize: '1.2rem', color: '#969696' }} />
                            <span className="truncate">{location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            <span className="text-base text-[#175a69]">{typeof price === 'number' ? `$${price}` : price}</span>
                        </div>
                    </div>
                    
                    <Divider sx={{ my: 1 }} />

                    {/* --- Lógica de Botones según Estado --- */}
                    
                    {/* CASO 1: COMPLETADO */}
                    {status === 'completado' && (
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">Calificación:</span>
                            {[...Array(rating || 0)].map((_, i) => (
                                <StarRateIcon key={i} sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                            ))}
                        </div>
                    )}

                    {/* CASO 2 y 3: PENDIENTE O CONFIRMADO */}
                    {status !== 'completado' && (
                        <div className="flex flex-col gap-3">
                            {/* Datos de contacto (siempre visibles si no está completado) */}
                            <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <LocalPhoneOutlinedIcon sx={{ fontSize: '1.1rem' }} />
                                    <span>{phone}</span>
                                </div>
                                <span className="hidden md:inline">•</span>
                                <div className="flex items-center gap-1">
                                    <EmailOutlinedIcon sx={{ fontSize: '1.1rem' }} />
                                    <span className="truncate max-w-[150px]">{email}</span>
                                </div>
                            </div>

                            {/* Botones para PENDIENTE */}
                            {status === 'pendiente' && (
                                <div className="flex w-full gap-2 mt-2">
                                    <Button
                                        onClick={onAccept}
                                        variant="contained"
                                        startIcon={<DoneIcon />}
                                        sx={{
                                            flex: 1,
                                            textTransform: 'none',
                                            bgcolor: '#209129',
                                            borderRadius: 3,
                                            boxShadow: 'none',
                                            '&:hover': { bgcolor: '#1a7a22' }
                                        }}
                                    >
                                        Aceptar
                                    </Button>
                                    <Button
                                        onClick={onCancel} // Aquí usamos onCancel para rechazar
                                        variant="outlined"
                                        startIcon={<CancelIcon />}
                                        sx={{
                                            flex: 1,
                                            textTransform: 'none',
                                            color: '#d32f2f',
                                            borderColor: '#d32f2f',
                                            borderRadius: 3,
                                            '&:hover': { bgcolor: '#ffebee', borderColor: '#c62828' },
                                        }}
                                        
                                    >
                                        Rechazar
                                    </Button>
                                </div>
                            )}

                            {/* Botones para CONFIRMADO */}
                            {status === 'confirmado' && (
                                <div className="flex flex-col gap-2 mt-1">
                                    <div className="flex gap-2">
                                        <Button
                                        variant="outlined"
                                        sx={{
                                            textTransform: 'none' ,fontFamily:'Poppins, sans-serif',
                                            color: '#000',
                                            background:'#fff',
                                            borderColor:'#ccc',
                                            fontWeight:500,
                                            borderRadius:3,
                                            '&:hover':{
                                                backgroundColor: '#eb9902ff',
                                                color: '#fff',
                                                borderColor: '#f7ae26ff',
                                            },
                                            flex:1
                                        }}
                                        onClick={onViewDetails}
                                        >
                                        Detalles
                                        </Button>
                                        <Button 
                                        variant="outlined"
                                        sx={{
                                            textTransform: 'none' ,fontFamily:'Poppins, sans-serif',
                                            color: '#000',
                                            background:'#fff',
                                            borderColor:'#ccc',
                                            fontWeight:500,
                                            borderRadius:3,
                                            '&:hover':{
                                                backgroundColor: '#eb9902ff',
                                                color: '#fff',
                                                borderColor: '#f7ae26ff',
                                            },
                                            flex: 1,
                                        }}
                                        onClick={onReschedule}
                                    >
                                    Reprogramar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            textTransform: 'none' ,fontFamily:'Poppins, sans-serif',
                                            color: '#ffffffff',
                                            background:'#cf0c0cff',
                                            fontWeight:500,
                                            borderRadius:3,
                                            '&:hover':{
                                                backgroundColor: '#af3200ff',
                                                color: '#fff'
                                            },
                                            flex: 1,
                                        }}
                                        onClick={onCancel}
                                    >
                                    Cancelar
                                    </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}