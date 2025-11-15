import { Button } from "@headlessui/react";
import { ShieldOutlined } from "@mui/icons-material";
import { Avatar, Chip, createTheme, Dialog, DialogContent, Divider, ThemeProvider } from "@mui/material";
import { Clock, Heart, MapPin, Star, TrashIcon } from "lucide-react";
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
                        width:"500px"
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
                            >
                                {service.serviceType === "Paseo de perros" ? "🐕‍🦺" : ""}
                            </Avatar>
                            <div>
                                <h3 className="text-xl font-medium">{service.providerName}</h3>
                                <div className="flex gap-3">
                                    <Chip label={service.serviceType} />
                                    <Chip 
                                    icon={<ShieldOutlined/>}
                                    label={service.verified ? "Verificado" : "No verificado"} />
                                </div>
                            </div>
                        </div>
                        <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={isFavorite ? "text-accent" : ""}
                        >
                            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />

                        </Button>
                    </div>

                    <div>
                        {/* Reseñas y demás */}
                        <div className="flex items-center gap-6">
                                <Star className="h-5 w-5"/>
                                <span className="text-2xl font-bold">{service.rating}</span>
                                <span className="text-gray-500">({service.reviewCount} reviews)</span>
                        </div>

                        <Divider />

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5"/>
                                <div>
                                    <p className="font-medium">Ubicación</p>
                                    <p className="text-sm">{service.location}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5"/>
                                <div>
                                    <p className="font-medium">Horario</p>
                                    <p className="text-sm">{service.availability}</p>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        {/* Acerca */}
                        <div className="">
                            <h3 className="font-semibold text-lg">Acerca del servicio</h3>
                            <p></p>

                        </div>
                    </div>

                </DialogContent>

            </Dialog>
        </ThemeProvider>
        </>
    );
}