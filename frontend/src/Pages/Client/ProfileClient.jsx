import { CameraAlt, Email, Emergency, LocationCity, LocationOn, Person, PersonPinCircleOutlined, Phone, Star } from "@mui/icons-material";
import { Avatar, Button, Chip, createTheme, Divider, IconButton, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { User } from "lucide-react";
import { useState } from "react";

const theme = createTheme({
    typography: { fontFamily: 'Poppins, sans-serif' },
});

export default function ProfileClient(){

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        displayName: 'Sarah Johnson',
        location: 'Nueva York, NY',
        about: 'Amante de las mascotas y dueña de dos perros adorables.',
        phone: '+1 234 567 890',
        email: 'sarah.johnson@example.com',
        emergencyContact:'+1 (284) 785-6718',
        rating: 4.9,
        services: 12 
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <main className='flex  py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-3xl font-bold ">Mi perfil</h1>
                        <span className="text-gray-600">Información del perfil pública</span>
                    </div>
                    {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                        Editar perfil
                    </Button>
                    ) : (
                        <>
                        <div>
                            <Button onClick={() => setIsEditing(false)}>
                                Cancelar
                            </Button>
                            <Button>
                                Guardar cambios
                            </Button>
                        </div>
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Seccion de Foto de perfil */}
                    <div className="flex flex-col border-1 border-gray-400 bg-white rounded-xl p-6 gap-5">
                        <div className="flex flex-col items-center text-center gap-4">
                            <h2 className="text-xl font-semibold">Foto de perfil</h2>
                            <span className="text-gray-500">Esta foto será visible para los prestadores</span>
                            <div className="flex flex-col relative items-center gap-10">
                                <Avatar
                                    alt="Profile Picture"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 100, height: 100, mt: 2 }}
                                />
                                {isEditing && (
                                    <Button
                                    startIcon={<CameraAlt />}
                                    >
                                        Cambiar foto
                                    </Button>
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{formData.displayName}</h2>
                                <span className="text-gray-500 text-sm">{formData.location}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border-orange-300 border-1">
                                <Star sx={{color:'#f59e0b', fontSize:20}}/>
                                <span className="font-bold text-gray-700">{formData.rating}</span>
                                <span className="text-xs text-gray-400">({formData.services} servicios)</span>
                            </div>
                        </div>
                        <Divider />
                        <div className="flex flex-col gap-2 ">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Verificaciones</span>
                            <div className="flex flex-wrap gap-2">
                                <Chip label="Email verificado" size="small" color="success" variant="outlined"/>
                                <Chip label="Teléfono verificado" size="small" color="success" variant="outlined"/>
                            </div>
                        </div>

                    </div>

                    {/* Seccion de Información pública */}
                    <div className="flex flex-col border-1 border-gray-400 rounded-xl p-6 bg-white">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <Person fontSize="small" className="text-gray-400 " /> 
                                    <h2 className="text-lg font-semibold flex items-center gap-2">Información pública</h2>
                                </div>
                                <span className="text-sm  text-gray-500 pl-7">Visible para los prestadores de servicio</span>
                            </div>

                            <Divider/>
                            <form action="submit" className="grid grid-cols-1 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Nombre visible</label>
                                    <TextField
                                    size="small"
                                    fullWidth
                                    name="displayName"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    value={formData.displayName}
                                    placeholder="Ej. Juan Pérez"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <User size={20}  style={{ color: isEditing ? '#005c71' : '#bdbdbd' }} />
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius:"12px"
                                        }
                                    }}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Ubicación</label>
                                    <TextField
                                    size="small"
                                    fullWidth
                                    name="location"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    value={formData.location}
                                    placeholder="Ej. Ciudad de México, CDMX"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationOn sx={{ color: isEditing ? '#005c71' : '#bdbdbd' }}/>
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius:"12px"
                                        }
                                    }}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Sobre mí</label>
                                    <TextField
                                    multiline
                                    rows={4}
                                    fullWidth
                                    name="about"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    value={formData.about}
                                    placeholder="Cuéntanos un poco sobre ti y tus mascotas..."
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius:"12px"
                                        }
                                    }}
                                    />
                                    <span className="text-xs text-gray-400 text-right">{formData.about.length} caracteres</span>
                                </div>
                            </form>
                        </div>


                    </div>

                    <div className="flex flex-col border-1 border-gray-400 bg-white rounded-xl p-6">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1 ">
                                <div className="flex items-center gap-2">
                                    <Phone fontSize="small" className="text-gray-400" />
                                    <h2 className="text-lg font-semibold">Datos de contacto</h2>
                                </div>
                                <span className="text-gray-500 text-sm pl-7">Privado. Solo se comparte al confirmar.</span>
                            </div>

                            <Divider/>

                            <form className="grid grid-cols-1 gap-6">
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="text-sm font-medium text-gray-700"> Teléfono Móvil</label>
                                    <TextField
                                    size="small"
                                    fullWidth
                                    name="phone"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    value={formData.phone}
                                    placeholder="+52 ..."
                                    slotProps={{
                                        input:{
                                            startAdornment: (<InputAdornment position="start"><Phone sx={{ color: isEditing ? '#005c71' : '#bdbdbd' }} /></InputAdornment>)
                                        }
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius:"12px"
                                        }
                                    }}
                                    ></TextField>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium texr-gray-700"> Correo electrónico</label>
                                    <TextField
                                    size="small"
                                    fullWidth
                                    name="email"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    value={formData.email}
                                    placeholder="correo@ejemplo.com"
                                    slotProps={{
                                        input:{
                                            startAdornment: (<InputAdornment position="start"><Email sx={{ color: isEditing ? '#005c71' : '#bdbdbd' }} /></InputAdornment>)
                                        }
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius:"12px"
                                        }
                                    }}
                                    ></TextField>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700 items-center"> Contacto de emergencia <span className="text-xs text-orange-600 font-normal">
                                        *Recomendado para mascotas</span></label>
                                    <TextField
                                    size="small"
                                    fullWidth
                                    name="emergencyContact"
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    value={formData.emergencyContact}
                                    placeholder="+52 ..."
                                    slotProps={{
                                        input:{
                                            startAdornment: (<InputAdornment position="start"><Emergency sx={{ color: isEditing ? '#005c71' : '#bdbdbd' }} /></InputAdornment>)
                                        }
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius:"12px"
                                        }
                                    }}
                                    ></TextField>
                                </div>

                            </form>

                        </div>

                    </div>



                </div>
            </main>
        </ThemeProvider>
    )
}