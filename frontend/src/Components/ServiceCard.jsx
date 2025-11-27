import { Button, Chip, Divider } from "@mui/material";

//MUI IMPORTS

import EditIcon from '@mui/icons-material/Edit';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function ServiceCard({ active, name, description, price, priceUnit, duration, bookings, revenue, nextBooking, handleEdit,handleDelete, toggleServiceStatus }) {
    return (
        <div className={`flex flex-col p-6 gap-6 border-2 rounded-xl shadow-lg border-gray-300 bg-white hover:shadow-xl ${active ? "opacity-100" : "opacity-50"}`}>
            <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className="text-xs text-gray-400">{description}</p>
                </div>
                <Chip  label={`${active ? "Activo" : "Inactivo"}`} sx={{background: active ? '#005c71' : '#dbdbdbff', color: active ? '#ffffff' : '#000000'}}  />
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">${price}</span>
                    <span className="text-sm text-gray-400">/ {priceUnit}</span>
                </div>
                <div className="flex flex-col gap-4 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">Duración:</span>
                        <span className="font-medium">{duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">Reservas totales:</span>
                        <span className="font-medium">{bookings}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">Ingresos:</span>
                        <span className="font-medium text-green-800">${revenue}</span>
                    </div>
                    <Divider />
                    <div className="flex flex-col items-start justify-between">
                        <span className="text-gray-400">Próxima reserva:</span>
                        <span className="font-medium">{nextBooking}</span>
                    </div>
                </div>
            </div>
                    <div className="flex gap-2">
                    <Button
                    variant="outlined"
                    size="sm"
                    onClick={handleEdit}
                    startIcon={<EditIcon />}
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
                    gridColumn: { xs: 'span 12', lg: 'span 4' }
                }}
                    >
                        Editar
                    </Button>
                    <Button
                    variant="outlined"
                    size="sm"
                    onClick={toggleServiceStatus}
                    startIcon={active ? <ToggleOnIcon /> : <ToggleOffIcon />}
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
                    gridColumn: { xs: 'span 12', lg: 'span 4' }
                }} 
                    >
                         {active ? "Desactivar" : "Activar"}
                    </Button>
                    <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                    sx={{
                    textTransform: 'none' ,fontFamily:'Poppins, sans-serif',
                    color: '#ffffffff',
                    background:'#f50000ff',
                    borderColor:'#ccc',
                    fontWeight:500,
                    borderRadius:3,
                    '&:hover':{
                        backgroundColor: 'rgba(248, 115, 53, 1)',
                        color: '#fff'
                    },
                    gridColumn: { xs: 'span 12', lg: 'span 4' }
                }}
                    >
                        <DeleteOutlineIcon />
                    </Button>
                </div>
        </div>
    )
}