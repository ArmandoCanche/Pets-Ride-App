// Importación de iconos
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarRateIcon from '@mui/icons-material/StarRate';

// Importación de componentes MUI
import { Button, Divider } from '@mui/material';

export default function BookingCard({
    serviceType,
    providerName,
    petName,
    date,
    time,
    location,
    price,
    status,
    onCancel,
    onReschedule,
    onViewDetails,
    onRate,
}) {

    const statusColors = {
        pendiente:  "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
        confirmado: "bg-blue-500/10 text-blue-800 border border-blue-500/20",
        completado: "bg-green-500/10 text-green-800 border border-green-500/20",
        cancelado:  "bg-red-500/10 text-red-800 border border-red-500/20",
    };

    return (
        <div className='flex flex-col h-full border border-gray-200 rounded-2xl p-6 gap-5 bg-white transition-shadow justify-between'>

            <div className='flex flex-row justify-between items-start'>
                <div>
                    <h1 className='text-lg font-bold text-gray-800'>{serviceType}</h1>
                    <p className='text-sm text-gray-500 font-medium'>Con: <span className="text-[#005c71]">{providerName}</span></p>
                </div>
                <div className={`flex px-3 py-1 rounded-full ${statusColors[status] || statusColors.pendiente}`}>
                    <p className="text-xs font-bold uppercase tracking-wide">
                        {status}
                    </p>
                </div>
            </div>

            <div className='flex flex-col gap-3 text-sm text-gray-600'>
                <div className='flex items-center'>
                    <PetsIcon sx={{ fontSize: '1.2rem', marginRight: '0.5rem', color: '#9ca3af' }} />
                    <span>Mascota: <span className='font-semibold text-gray-800'>{petName}</span></span>
                </div>
                <div className='flex items-center'>
                    <CalendarTodayIcon sx={{ fontSize: '1.2rem', marginRight: '0.5rem', color: '#9ca3af' }} />
                    <span>{date}</span>
                </div>
                <div className='flex items-center'>
                    <AccessTimeIcon sx={{ fontSize: '1.2rem', marginRight: '0.5rem', color: '#9ca3af' }} />
                    <span>{time}</span>
                </div>
                <div className='flex items-center'>
                    <LocationOnOutlinedIcon sx={{ fontSize: '1.2rem', marginRight: '0.5rem', color: '#9ca3af' }} />
                    <span className="truncate">{location}</span>
                </div>
                <Divider sx={{my: 0.5}} />
                <div className='flex items-center justify-between'>
                    <span className="text-gray-400 font-medium">Total</span>
                    <div className='flex items-center text-green-700 font-bold text-lg'>
                        <AttachMoneyOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                        <span>{price}</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2 mt-auto'>
                {status === "confirmado" && (
                    <div className="flex gap-2">
                        <Button
                            onClick={onViewDetails}
                            variant="outlined"
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
                            onClick={onReschedule}
                            variant="contained"
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
                            onClick={onCancel}
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            sx={{
                                flex: 1,
                                fontFamily: 'Poppins, sans-serif',
                                color: '#fff',
                                background: '#cf0c0c',
                                fontWeight: 500,
                                borderRadius: 3,
                                border: 'none',
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

                {status === "pendiente" && (
                    <div className="flex gap-2">
                        <Button
                            onClick={onViewDetails}
                            variant="outlined"
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
                            Ver Detalles
                        </Button>
                        <Button
                            onClick={onCancel}
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            sx={{
                                flex: 1,
                                fontFamily: 'Poppins, sans-serif',
                                color: '#fff',
                                background: '#cf0c0c',
                                fontWeight: 500,
                                borderRadius: 3,
                                border: 'none',
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

                {(status === "completado" || status === "cancelado") && (
                    <div className="flex gap-2">
                        <Button
                            onClick={onViewDetails}
                            variant="outlined"
                            fullWidth
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
                            Ver Detalles
                        </Button>
                        {status === "completado" && (
                            <Button
                            onClick={onRate}
                            variant="contained"
                            startIcon={<StarRateIcon />}
                            sx={{
                                flex: 1,
                                borderRadius: 3,
                                textTransform: 'none',
                                bgcolor: '#faaf00',
                                color: '#fff',
                                fontWeight: 600,
                                '&:hover': { bgcolor: '#ffb004ff',
                                        scale: '1.02',
                                        transition: 'all 0.3s ease-in-out',
                                 }
                            }}
                            >
                                Calificar
                            </Button>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}