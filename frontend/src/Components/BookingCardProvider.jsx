import { Avatar, Button, Divider } from "@mui/material";

// Iconos MUI
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import { Chat } from "@mui/icons-material";
import StarRateIcon from '@mui/icons-material/StarRate';

export default function BookingCardProvider({
    clientImagen,
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
    onMessageClient,
    onViewDetails,
}
    ){
    const statusColors = {
    pendiente:  "bg-yellow-500/10 text-yellow-600 dark:text-yellow-600 border border-yellow-500/20",
    confirmado: "bg-blue-500/10   text-blue-800   dark:text-blue-600   border border-blue-500/20",
    completado: "bg-green-500/10  text-green-800  dark:text-green-600  border border-green-500/20",
    cancelado:  "bg-red-500/10    text-red-800    dark:text-red-600    border border-red-500/20",
    };

    return (
        <div>
            <div className="flex flex-col gap-6 hover:shadow-lg border p-6 rounded-2xl shadow-sm border-3 border-gray-300 bg-white">
                {/* primera seccion */}
                <div>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar src={clientImagen || "/placeholder.svg"} alt={`${client}`} >U</Avatar>
                            <div className="">
                                <h2 className="text-lg">{service}</h2>
                                <p>{client} • {pet} ({petType})</p>
                            </div>
                        </div>
                        <div className={`flex px-2 py-1 rounded-2xl ${statusColors[status]}`}>
                            <p className="text-xs">
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* segunda seccion */}
                <div className="flex flex-col gap-2">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <CalendarTodayOutlinedIcon sx={{color:'#969696ff', fontSize:'1.2rem'}} />
                            <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <AccessTimeOutlinedIcon sx={{color:'#969696ff', fontSize:'1.2rem'}} />
                            <span>{time} • {duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <LocationOnOutlinedIcon sx={{color:'#969696ff', fontSize:'1.2rem'}} />
                            <span className="text-sm">{location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            <span className="text-base text-[#175a69ff]">{price}</span>
                        </div>
                    </div>
                    <Divider />
                    {status === 'completado' ? (
                        <div className="flex items-center gap-1 ">
                            <span className="text-sm">Calificación:</span>
                            {[...Array(rating)].map((_, i) => (
                                <span key={i}> <StarRateIcon sx={{color:'#FFD700'}} /></span>
                            ))}
                        </div>
                    ):(
                    <div className="flex flex-col items-start gap-3 ">
                        <div className="flex items-center gap-3">
                            <LocalPhoneOutlinedIcon sx={{color:'#969696ff', fontSize:'1.2rem'}} />
                            <span className="text-sm text-black">{phone}</span>
                            <span>•</span>
                            <EmailOutlinedIcon sx={{color:'#969696ff', fontSize:'1.2rem'}} />
                            <span className="text-sm">{email}</span>
                        </div>
                        {status === 'pendiente' ? (
                            <div className="flex w-full gap-2 mt-3">
                                <Button
                                variant="outlined"
                                startIcon={<DoneIcon sx={{marginRight:'0.5rem'}}/>}
                                sx={{
                                    flex:1,
                                    textTransform: 'none' ,fontFamily:'Poppins, sans-serif',
                                    color: '#ffffffff',
                                    background:'#209129ff',
                                    borderColor:'none',
                                    fontWeight:500,
                                    borderRadius:3,
                                    '&:hover':{
                                        backgroundColor: 'rgba(46, 202, 59, 1)',
                                    }
                                }}
                                >
                                    aceptar
                                </Button>
                                <Button
                                variant="outlined"
                                startIcon={<CancelIcon sx={{marginRight:'0.5rem'}}/>}
                                sx={{
                                    flex:1,
                                    textTransform: 'none' ,fontFamily:'Poppins, sans-serif',
                                    color: '#ff2e2eff', 
                                    background:'#fff', 
                                    borderColor:'#ccc', 
                                    fontWeight:500, 
                                    borderRadius:3,
                                    '&:hover':{
                                        backgroundColor: '#df1111ff',
                                        color: '#fff',
                                    },
                                    gridColumn: { xs: 'span 12', lg: 'span 4' }
                                }} 
                                >
                                    Rechazar
                                </Button>
                            </div>   
                        ) : (
                            <div className="flex gap-2 mt-3 w-full">
                                <Button
                                startIcon={<ChatBubbleOutlineIcon sx={{marginRight:'0.5rem'}}/>}
                                variant="outlined"
                                onClick={onMessageClient}
                                sx={{
                                        flex: 1,
                                        textTransform: 'none',
                                        fontFamily: 'Poppins, sans-serif',
                                        color: '#000', // <-- Color de TEXTO por defecto (Negro)
                                        background: '#fff',
                                        borderColor: '#ccc',
                                        fontWeight: 500,
                                        borderRadius: 3,
                                        gridColumn: { xs: 'span 12', lg: 'span 4' },
                                        '& .MuiButton-startIcon > svg': {
                                            color: '#b8b8b8ff',
                                        },
                                        '&:hover': {
                                            backgroundColor: '#eb9902ff',
                                            color: '#fff',
                                            borderColor: '#f7ae26ff',
                                            '& .MuiButton-startIcon > svg': {
                                                color: '#fff',
                                            }
                                        },
                                    }}
                                >
                                    Mensaje
                                </Button>
                                <Button
                                variant="outlined"
                                sx={{
                                    flex:1,
                                    textTransform: 'none' ,fontFamily:'Poppins, sans-serif',
                                    color: '#ffffffff',
                                    background:'#175a69ff',
                                    borderColor:'none',
                                    fontWeight:500,
                                    borderRadius:3,
                                    '&:hover':{
                                        backgroundColor: '#186c7e',
                                    }
                                }}
                                onClick={onViewDetails}
                                >
                                    Ver detalles
                                </Button>
                            </div>   
                        )}
                    </div>
                    )}

                        
                </div>
            </div>
        </div>
    );
}