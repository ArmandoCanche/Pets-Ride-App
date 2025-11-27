import { Avatar, Button, Divider, IconButton, Tooltip } from "@mui/material";

// Iconos MUI
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import StarRateIcon from '@mui/icons-material/StarRate';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

export default function BookingCardProvider({
    clientImage,
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
    onReschedule,
    onCancel,
    onAccept
}) {

    const statusColors = {
        pendiente:  "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
        confirmado: "bg-blue-500/10 text-blue-800 border border-blue-500/20",
        completado: "bg-green-500/10 text-green-800 border border-green-500/20",
        cancelado:  "bg-red-500/10 text-red-800 border border-red-500/20",
    };

    return (
        <div className="flex flex-col h-full border border-gray-200 rounded-2xl p-6 gap-5 bg-white  justify-between">
            {/* HEADER */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <Avatar 
                        src={clientImage || "/placeholder.svg"} 
                        alt={`${client}`}
                        sx={{ width: 50, height: 50 }}
                    >
                        {client?.charAt(0)}
                    </Avatar>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">{service}</h2>
                        <p className="text-sm text-gray-500 font-medium">
                            {client} • <span className="text-gray-700">{pet} ({petType})</span>
                        </p>
                    </div>
                </div>
                <div className={`flex px-3 py-1 rounded-full ${statusColors[status] || statusColors.pendiente}`}>
                    <p className="text-xs font-bold uppercase tracking-wide">
                        {status ? status : 'Estado'}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-3 text-sm text-gray-600">
                <div className="grid md:grid-cols-2 gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2">
                        <CalendarTodayOutlinedIcon sx={{ fontSize: '1.2rem', color: '#9ca3af' }} />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <AccessTimeOutlinedIcon sx={{ fontSize: '1.2rem', color: '#9ca3af' }} />
                        <span>{time} • {duration}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                        <LocationOnOutlinedIcon sx={{ fontSize: '1.2rem', color: '#9ca3af' }} />
                        <span className="truncate">{location}</span>
                    </div>
                </div>
                <Divider sx={{ my: 0.5 }} />

                <div className="flex items-center justify-between">
                    <div className="flex items-center text-green-700 font-bold text-lg">
                        <span>${price}</span>
                    </div>
                    {status === 'completado' ? (
                        <div className="flex items-center gap-0.5">
                            {[...Array(rating || 0)].map((_, i) => (
                                <StarRateIcon key={i} sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                                <LocalPhoneOutlinedIcon sx={{ fontSize: '1rem' }} />
                                <span>{phone}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
                {status === 'pendiente' && (
                    <div className="flex w-full gap-2">
                        <Button
                            onClick={onAccept}
                            variant="contained"
                            startIcon={<DoneIcon />}
                            sx={{
                                flex: 1,
                                bgcolor: '#209129',
                                borderRadius: 3,
                                boxShadow: 'none',
                                fontWeight: 500,
                                '&:hover': { bgcolor: '#1a7a22',scale: '1.02',
                                    transition: 'all 0.3s ease-in-out', }
                            }}
                        >
                            Aceptar
                        </Button>
                        <Button
                            onClick={onCancel}
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            sx={{
                                flex: 1,
                                color: '#d32f2f',
                                borderColor: '#d32f2f',
                                borderRadius: 3,
                                fontWeight: 500,
                                '&:hover': { bgcolor: '#ffebee', borderColor: '#c62828',scale: '1.02',
                                    transition: 'all 0.3s ease-in-out', }
                            }}
                        >
                            Rechazar
                        </Button>
                    </div>
                )}

                {/* CASO: CONFIRMADO */}
                {status === 'confirmado' && (
                    <div className="flex gap-2 w-full">
                        <Button
                            variant="outlined"
                            onClick={onViewDetails}
                            startIcon={<VisibilityIcon />}
                            sx={{
                                flex: 1,
                                fontFamily: 'Poppins, sans-serif',
                                color: '#000',
                                background: '#ffffffff',
                                border:2,
                                borderColor: '#cececeff',
                                fontWeight: 500,
                                borderRadius: 3,
                                '&:hover': {
                                    borderColor: '#005c71',
                                    scale: '1.02',
                                    transition: 'all 0.3s ease-in-out',
                                },
                            }}
                        >
                            Detalles
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={onReschedule}
                            startIcon={<EditCalendarIcon fontSize="small" />}
                            sx={{
                                flex: 1,
                                fontFamily: 'Poppins, sans-serif',
                                color: '#ffffffff',
                                background: '#005c71',
                                border:2,
                                borderColor: '#005c71',
                                fontWeight: 500,
                                borderRadius: 3,
                                '&:hover': {
                                    borderColor: '#005c71',
                                    scale: '1.02',
                                    transition: 'all 0.3s ease-in-out',
                                },
                            }}
                        >
                            Reprogramar
                        </Button>

                        <Button
                            variant="contained"
                            onClick={onCancel}
                            startIcon={<CancelIcon />}
                            sx={{
                                flex: 1,
                                fontFamily: 'Poppins, sans-serif',
                                color: '#fff',
                                background: '#cf0c0c',
                                fontWeight: 500,
                                borderRadius: 3,
                                '&:hover': {
                                    backgroundColor: '#af3200',
                                    borderColor: '#005c71',
                                    scale: '1.02',
                                    transition: 'all 0.3s ease-in-out',
                                },
                            }}
                        >
                            Cancelar
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}