import { Button } from "@mui/material";
import {IconButton} from "@mui/material";
import { ShieldOutlined } from "@mui/icons-material";
import { Avatar, Chip, createTheme, Dialog, DialogContent, Divider, ThemeProvider } from "@mui/material";
import { Clock, Heart, Link, MapPin, Star, TrashIcon } from "lucide-react";
import { useState } from "react";

const theme = createTheme({
    typography:{
        fontFamily: 'Poppins, sans-serif',
    }
})

export default function ServiceDetailModal({open, onOpenChange, service}) {
    const [isFavorite, setIsFavorite] = useState(false);
    return (
        <>
        <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            onClose ={() => onOpenChange(false)}
            slotProps={{
                paper:{
                    sx:{
                        borderRadius:"1rem",
                        maxWidth:"600px",
                        width:"600px",
                        padding:2
                    }
                }
            }}
            >
                <DialogContent
                sx={{
                    display:"flex",
                    flexDirection:"column",
                    gap:"1.5rem"
                }}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar
                            src="/placeholder.svg"
                            alt={service.providerName}
                            sx={{height:64, width:64}}
                            >
                                {service.serviceType === "Paseo de perros" ? "🐕‍🦺" : ""}
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-2xl font-medium">{service.providerName}</h3>
                                <div className="flex gap-3">
                                    <Chip label={service.serviceType} />
                                    <Chip 
                                    icon={<ShieldOutlined style={{color:"#0d6578", width:16, height:24, marginLeft:12}}/>}
                                    label={service.verified ? "Verificado" : "No verificado"} 
                                    sx={{color:"#0d6578", bgcolor:"#e0edee", }}
                                    />
                                </div>
                            </div>
                        </div>
                        <IconButton
                        disableRipple
                        onClick={() => setIsFavorite(!isFavorite)}
                        color={isFavorite ? "error" : "inherit"}
                        >
                            <Heart className={`h-5 w-5 transform transition-transform duration-200 ${isFavorite ? "fill-current scale-125" : "scale-100"}`} />
                        </IconButton>
                    </div>

                    <div className="flex flex-col gap-5">
                        {/* Reseñas y demás */}
                        <div className="flex items-center gap-6">
                                <Star style={{width:24, height:24, color:"#fbbf24"}} fill="currentColor"/>
                                <span className="text-2xl font-bold">{service.rating}</span>
                                <span className="text-gray-500">({service.reviewCount} reviews)</span>
                        </div>

                        <Divider />

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 mr-1 text-gray-400"/>
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">Ubicación</p>
                                    <p className="text-sm text-gray-500">{service.location}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 mr-1 text-gray-400"/>
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">Horario</p>
                                    <p className="text-sm text-gray-500">{service.availability}</p>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        {/* Acerca */}
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-lg">Acerca del servicio</h3>
                            <p className="text-sm">{service.description}</p>
                        </div>

                        {/* Servicios que se ofrecen */}
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-lg">Servicios ofrecidos</h3>
                            <div className="grid sm:grid-cols-2 gap-2">
                                    {service.servicesOffered.map((servicio,index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-black"/>
                                            <p className="text-sm">{servicio}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Price */}

                        <div className="p-4 rounded-lg bg-gray-100 flex flex-col gap-3">
                            <div className="flex items-baseline justify-between">
                                <span>Empieza desde</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold">${service.price}</span>
                                    <span>/ {service.priceUnit}</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400">Final price may vary based on specific requirements</p>
                        </div>

                        {/* Reviews */}

                        <div className="flex flex-col gap-3">
                            <h3 className="font-semibold text-lg">Reseñas recientes</h3>
                            <div className="flex flex-col gap-3">
                                {service.reviews.map((review, index) => (
                                    <div key={index} className="border-1 border-gray-300 rounded-lg p-4 gap-2 flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-3">
                                                <Avatar>
                                                    {review.initials}
                                                </Avatar>
                                                <div className="flex flex-col gap-1">
                                                    <p className="font-medium text-sm">{review.reviewerName}</p>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                            key={i}
                                                            className={`
                                                                h-4 w-4
                                                                ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                                            `}
                                                            fill="currentColor"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500">{review.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 ">
                                            {review.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botones */}

                        <div className="flex gap-3">
                            <Button
                            variant="outlined"
                            sx={{ 
                                fontFamily:'Poppins, sans-serif',
                                flex : {xs: 'auto', sm:'1'},
                                width: {xs : '100%', sm: 'auto'},
                                alignSelf: { xs: 'stretch', sm: 'center' },
                                color: '#000', background:'#fff', borderColor:'#ccc', fontWeight:500, borderRadius:3,
                                '&:hover':{
                                    backgroundColor: '#eb9902ff',
                                    color: '#fff',
                                    borderColor: '#f7ae26ff',
                                }
                            }}
                            >Reservar ahora
                            </Button>
                            <Button
                            variant="contained"
                            sx={{ 
                                fontFamily:'Poppins, sans-serif',
                                flex : {xs: 'auto', sm:'1'},
                                width: {xs : '100%', sm: 'auto'},
                                alignSelf : { xs: 'stretch', sm: 'center' },
                                color: '#ffffffff', background:'#0b80d9ff',
                                fontWeight:500, borderRadius:3,
                                '&:hover':{
                                    backgroundColor: '#045a9cff',
                                    color: '#fff'
                                }
                            }}
                            >Mensaje</Button>

                        </div>
                    </div>

                </DialogContent>

            </Dialog>
        </ThemeProvider>
        </>
    );
}