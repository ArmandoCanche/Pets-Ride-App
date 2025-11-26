import {
    CameraAlt,
    Email,
    Emergency,
    LocationOn,
    Person,
    Phone,
    Star,
    VerifiedUser, // Icono para verificación de identidad
    Badge,        // Icono para antecedentes/certificación
    WorkHistory   // Icono para experiencia
} from "@mui/icons-material";
import { Avatar, Button, Chip, createTheme, Divider, IconButton, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { useState } from "react";

const theme = createTheme({
    typography: { fontFamily: 'Poppins, sans-serif' },
    palette: {
        primary: { main: '#005c71' }
    }
});

export default function ProfileProvider() {

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        displayName: 'Michael Chen',
        location: 'Ciudad de México, Centro',
        about: 'Entrenador canino certificado con más de 5 años de experiencia. Especialista en perros grandes y comportamiento reactivo. Amante de los paseos largos.',
        phone: '+52 55 1234 5678',
        email: 'michael.chen@petride.com',
        emergencyContact: '+52 55 9876 5432',
        rating: 4.95,
        jobsCompleted: 142,
        yearsExperience: 5
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <main className='flex py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold text-gray-800">Perfil Profesional</h1>
                        <span className="text-gray-600">Así es como te ven los clientes</span>
                    </div>
                    {!isEditing ? (
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ fontWeight: 500, borderRadius: 3}}
                            onClick={() => setIsEditing(true)}
                        >
                            Editar perfil
                        </Button>
                    ) : (
                        <div className="flex gap-3">
                            <Button
                                variant="outlined"
                                onClick={() => setIsEditing(false)}
                                sx={{ 
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#000', background: '#fff', borderColor: '#ccc', fontWeight: 500, borderRadius: 3,
                                    '&:hover': { backgroundColor: '#f5f5f5' }
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ fontWeight: 500, borderRadius: 3 }}
                            >
                                Guardar cambios
                            </Button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                    {/* --- COLUMNA IZQUIERDA: TARJETA DE PRESENTACIÓN --- */}
                    <div className="flex flex-col border border-gray-200 bg-white rounded-xl p-6 gap-6 h-fit">
                        <div className="flex flex-col gap-1 text-center">
                            <h2 className="text-lg font-semibold">Foto de perfil</h2>
                            <span className="text-gray-500 text-sm">Debe ser clara y profesional</span>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <Avatar
                                    alt="Provider Picture"
                                    src="/static/images/avatar/2.jpg"
                                    sx={{ width: 100, height: 100}}
                                />
                                {isEditing && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            position: 'absolute', bottom: 0, right: -10,
                                            minWidth: 'auto', padding: 1, borderRadius: '50%',
                                            border: '2px solid white'
                                        }}
                                    >
                                        <CameraAlt fontSize="small" />
                                    </Button>
                                )}
                            </div>
                            
                            <div className="text-center">
                                <h2 className="text-xl font-bold text-gray-800">{formData.displayName}</h2>
                                <p className="text-gray-500 text-sm">{formData.location}</p>
                            </div>
                            <div className="flex justify-center gap-3 w-full">
                                <div className="flex flex-col items-center bg-orange-50 px-3 py-2 rounded-lg border border-orange-100 flex-1">
                                    <div className="flex items-center gap-1">
                                        <Star sx={{ color: '#f59e0b', fontSize: 18 }} />
                                        <span className="font-bold text-gray-800">{formData.rating}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">Calificación</span>
                                </div>
                                <div className="flex flex-col items-center bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 flex-1">
                                    <div className="flex items-center gap-1">
                                        <WorkHistory sx={{ color: '#005c71', fontSize: 18 }} />
                                        <span className="font-bold text-gray-800">{formData.jobsCompleted}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">Trabajos</span>
                                </div>
                            </div>
                        </div>


                        <Divider />

                        <div className="flex flex-col gap-3">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tus Verificaciones</span>
                            <div className="flex flex-wrap gap-2">
                                <Chip
                                    label="Identidad Verificada"
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                />
                                <Chip
                                    label="Telefono verificado"
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- COLUMNA DERECHA: FORMULARIOS --- */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        <div className="flex flex-col border border-gray-200 bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-2">
                                    <Person fontSize="small" className="text-gray-400" /> 
                                    <h2 className="text-lg font-semibold">Información pública</h2>
                                </div>
                                <span className="text-sm text-gray-500 pl-7">Esta información ayuda a los clientes a elegirte</span>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Nombre visible</label>
                                    <TextField
                                        size="small" fullWidth name="displayName"
                                        value={formData.displayName} onChange={handleChange} disabled={!isEditing}
                                        slotProps={{ input: { startAdornment: (<InputAdornment position="start"><Person sx={{ color: isEditing ? 'primary.main' : 'text.disabled' }} /></InputAdornment>), style: { borderRadius: "12px" } } }}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Zona de servicio</label>
                                    <TextField
                                        size="small" fullWidth name="location"
                                        value={formData.location} onChange={handleChange} disabled={!isEditing}
                                        slotProps={{ input: { startAdornment: (<InputAdornment position="start"><LocationOn sx={{ color: isEditing ? 'primary.main' : 'text.disabled' }} /></InputAdornment>), style: { borderRadius: "12px" } } }}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Experiencia y Habilidades</label>
                                    <TextField
                                        multiline rows={4} fullWidth name="about"
                                        value={formData.about} onChange={handleChange} disabled={!isEditing}
                                        placeholder="Describe tu experiencia cuidando mascotas, certificaciones, etc."
                                        slotProps={{ input: { style: { borderRadius: "12px" } } }}
                                    />
                                    <span className="text-xs text-gray-400 text-right">Sé detallado para ganar más confianza.</span>
                                </div>
                            </form>
                        </div>

                        {/* TARJETA 2: CONTACTO */}
                        <div className="flex flex-col border border-gray-200 bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-2">
                                    <Phone fontSize="small" className="text-gray-400" />
                                    <h2 className="text-lg font-semibold">Datos de contacto</h2>
                                </div>
                                <span className="text-sm text-gray-500 pl-7">Para notificaciones y emergencias.</span>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Teléfono Móvil</label>
                                    <TextField
                                        size="small" fullWidth name="phone"
                                        value={formData.phone} onChange={handleChange} disabled={!isEditing}
                                        slotProps={{ input: { startAdornment: (<InputAdornment position="start"><Phone sx={{ color: isEditing ? 'primary.main' : 'text.disabled' }} /></InputAdornment>), style: { borderRadius: "12px" } } }}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Correo electrónico</label>
                                    <TextField
                                        size="small" fullWidth name="email"
                                        value={formData.email} onChange={handleChange} disabled={!isEditing}
                                        slotProps={{ input: { startAdornment: (<InputAdornment position="start"><Email sx={{ color: isEditing ? 'primary.main' : 'text.disabled' }} /></InputAdornment>), style: { borderRadius: "12px" } } }}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700 items-center">
                                        Contacto de emergencia 
                                        <span className="text-xs text-orange-600 font-normal"> *Obligatorio para prestadores</span>
                                    </label>
                                    <TextField
                                        size="small" fullWidth name="emergencyContact"
                                        value={formData.emergencyContact} onChange={handleChange} disabled={!isEditing}
                                        slotProps={{ input: { startAdornment: (<InputAdornment position="start"><Emergency sx={{ color: isEditing ? '#ef4444' : 'text.disabled' }} /></InputAdornment>), style: { borderRadius: "12px", backgroundColor: isEditing ? '#fff5f5' : 'transparent' } } }}
                                    />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </ThemeProvider>
    )
}