// Importación de iconos
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

// Importación de componentes MUI
import { Button } from '@mui/material';

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
}) {

    const statusColors= {
        pendiente: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
        confirmado: "",
        completado: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
        cancelado: "bg-destructive/10 text-destructive border-destructive/20",
    };

  return (
    <div className='flex flex-col h-full border-2 border-gray-200 rounded-lg px-10 py-7 gap-5 bg-white  justify-between col-span-12  xl:col-span-8 '>
        <div className='flex flex-row justify-between items-start'>
        <div>
            <h1 className='text-lg font-semibold'>{serviceType}</h1>
            <p className='text-md text-gray-400 font-medium'>{providerName}</p>
        </div>
        <div className='flex px-2 py-1 border-1 border-[#005c71] rounded-2xl bg-[#e6eff1]'>
            <p className={`${statusColors[status]} text-xs`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
            </p>
        </div>
        </div>
        <div className='flex flex-col gap-3'>
        <div className='flex items-center'>
            <PetsIcon sx={{color:'#000000ff', fontSize:'1.5rem', marginRight:'0.5rem'}} />
            <span className='text-md font-medium text-gray-400'>Pet: <span className='text-black'>{petName}</span></span>
        </div>
        <div className='flex items-center'>
            <CalendarTodayIcon sx={{color:'#000000ff', fontSize:'1.5rem', marginRight:'0.5rem'}} />
            <span className='text-md font-medium text-gray-400'>{date}</span>
        </div>
        <div className='flex items-center'>
            <AccessTimeIcon sx={{color:'#000000ff', fontSize:'1.5rem', marginRight:'0.5rem'}} />
            <span className='text-md font-medium text-gray-400'>{time}</span>
        </div>
        <div className='flex items-center'>
            <LocationOnOutlinedIcon sx={{color:'#000000ff', fontSize:'1.5rem', marginRight:'0.5rem'}} />
            <span className='text-md font-medium text-gray-400'>{location}</span>
        </div>
        <div className='flex items-center'>
            <AttachMoneyOutlinedIcon sx={{color:'#000000ff', fontSize:'2rem', marginRight:'0.5rem'}} />
            <span className='text-xl font-medium '>{price}</span>
        </div>
        </div>
        <div className='w-full h-auto grid grid-cols-12 gap-4'>
            <Button variant="outlined" sx={{color: '#000', background:'#fff', borderColor:'#ccc', fontWeight:500, borderRadius:3,
                '&:hover':{
                    backgroundColor: '#eb9902ff',
                    color: '#fff',
                    borderColor: '#f7ae26ff',
                }
            }} className="flex xl:col-span-4 col-span-12" onClick={onViewDetails}>
            Details
            </Button>
            {status === "pendiente" || status === "confirmado" ? (
            <>
                <Button variant="outlined"  sx={{color: '#000', background:'#fff', borderColor:'#ccc', fontWeight:500, borderRadius:3,
                '&:hover':{
                    backgroundColor: '#eb9902ff',
                    color: '#fff',
                    borderColor: '#f7ae26ff',
                }
            }} className="flex-1 bg-transparent lg:col-span-4 xl:col-span-4 col-span-12" onClick={onReschedule}>
                Reschedule
                </Button>
                <Button variant="destructive" sx={{color: '#ffffffff', background:'#cf0c0cff',
                fontWeight:500, borderRadius:3,
                '&:hover':{
                    backgroundColor: '#af3200ff',
                    color: '#fff'
                }
            }} className="flex-1 lg:col-span-4 xl:col-span-4 col-span-12" onClick={onCancel}>
                Cancel
                </Button>
            </>
            ) : null}
        </div>
    </div>
  )
}