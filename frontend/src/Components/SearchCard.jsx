import { AccessTime, MapSharp, Star } from "@mui/icons-material";
import { Button, Chip, Divider } from "@mui/material";

export default function SearchCard({
    providerName,
    providerImage,
    serviceType,
    rating,
    reviewCount,
    price,
    priceUnit,
    location,
    availability,
    verified,
    onViewDetails, 
    onBook 
}) {
  return (
    <div className="flex flex-col h-full border-3 border-gray-200 rounded-3xl overflow-hidden bg-white justify-between col-span-12 lg:col-span-6 xl:col-span-4">
        
        {/* Sección de imagen del proveedor */}
        <div className="relative h-36 w-full bg-gray-500 ">
            { providerImage && providerImage !== "/placeholder.svg" ? (
                <img
                src={providerImage}
                alt={providerName}
                className="object-cover w-full h-full" 
                />
            ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200">
                    <div className="text-6xl">
                        {(serviceType || "").toLowerCase().includes("walk") || (serviceType || "").toLowerCase().includes("paseo")
                        ? "🐕‍🦺"
                        : (serviceType || "").toLowerCase().includes("vet") ?
                        "🩺"
                        : (serviceType || "").toLowerCase().includes("hotel") ?
                        "🏨"
                        : (serviceType || "").toLowerCase().includes("transport") ?
                        "🚗"
                        : "🐾"}
                    </div>
                </div>
            )}
            {verified && (
                <div className="absolute top-3 right-3">
                    <Chip variant="outlined" label={"Verificado"} sx={{color:'#ffff', borderColor:'#fffff', bgcolor: 'rgba(0,0,0,0.3)'}}></Chip>
                </div>
            )}
        </div>

        {/* Sección de información genérica del servicio */}
        <div className="p-6 space-y-3">

            <div>
                <h3 className="text-lg font-semibold"> {providerName}</h3>
                <p className="text-sm text-gray-500">{serviceType}</p>
            </div>

            <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                    <Star sx={{height:16, width:16, color:'gold'}} />
                    <span className="font-medium"> {(rating || 0).toFixed(1)}</span>
                    <span className="text-gray-500"> ({reviewCount || 0})</span>
                </div>
                <div className="flex items-center text-gray-400 ">
                    <MapSharp sx={{height:16, width:16}}/>
                    <span className="truncate max-w-[150px]">{location}</span>
                </div>
            </div>

            <div className="flex items-center gap-1 text-sm text-gray-400">
                <AccessTime sx={{height:16, width:16}}/>
                <span>{availability || "Disponible"}</span>
            </div>

            <Divider />

            <div className="flex gap-2 pt-2 items-baseline">
                <span className="text-2xl font-bold">$ {price}</span>
                <span className="text-sm text-gray-500 ">/ {priceUnit || "servicio"}</span>
            </div>
        </div>


        {/* Sección de botones */}
        <div className="p-6 pt-0 flex gap-2 justify-between">
            <Button 
                variant="outlined" 
                onClick={onViewDetails} 
                sx={{
                    textTransform: 'none', 
                    height: 40, 
                    borderRadius: 3, 
                    bgcolor:'#fff',
                    color: '#000000ff', 
                    fontFamily:'Poppins, sans-serif', 
                    borderColor:'#ccc',
                    '&:hover': { 
                        bgcolor: '#f37556',
                        color: '#fff', 
                        borderColor: '#f37556' 
                    } 
                }}
            >
                Ver detalles
            </Button>

            <Button 
                onClick={onBook || onViewDetails} 
                sx={{
                    textTransform: 'none', 
                    height: 40, 
                    borderRadius:3, 
                    fontFamily:'Poppins, sans-serif', 
                    color:'#fff', 
                    bgcolor:'#f37556', 
                    '&:hover': { bgcolor: '#d65a3b' } 
                }}
            >
                Reservar ahora
            </Button>
        </div>

    </div>
  )
}