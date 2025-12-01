import React, { useState, useEffect } from "react";
import { 
    CameraAlt, Email, Emergency, LocationOn, Person, Phone, Star, 
    VerifiedUser, WorkHistory, Badge 
} from "@mui/icons-material";
import { 
    Avatar, Button, Chip, createTheme, Divider, InputAdornment, 
    TextField, ThemeProvider, CircularProgress, IconButton 
} from "@mui/material";

// Servicio
import { userService } from "../../services/userService";

const theme = createTheme({
    typography: { fontFamily: 'Poppins, sans-serif' },
    palette: {
        primary: { main: '#005c71' }
    }
});

export default function ProfileProvider() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // Estado para la imagen
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        location: '', 
        about: '',   
        phone: '',    
        email: '',
        emergencyContact: '',
        rating: 5.0, 
        jobsCompleted: 0, // Mock (traer de API futura)
        yearsExperience: 2 // Mock
    });

    // 1. CARGAR PERFIL
    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);
                const user = await userService.getProfile();
                
                setFormData({
                    firstName: user.first_name || '',
                    lastName: user.last_name || '',
                    location: user.address || '',
                    about: user.bio || '',
                    phone: user.phone_number || '',
                    email: user.email || '',
                    emergencyContact: '', // Dato no existente en DB Users actualmente
                    rating: 4.9, 
                    jobsCompleted: 15,
                    yearsExperience: 3
                });
                setPreviewImage(user.profile_picture_url);
            } catch (error) {
                console.error("Error cargando perfil:", error);
                alert("No se pudo cargar tu perfil.");
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // 2. GUARDAR CAMBIOS
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                address: formData.location,
                bio: formData.about,
                phone: formData.phone,
                image: selectedFile 
            };

            const updatedUser = await userService.updateProfile(payload);
            
            // Actualizar localStorage
            const currentUser = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', JSON.stringify({ ...currentUser, ...updatedUser.user }));

            alert("Perfil profesional actualizado con éxito");
            setIsEditing(false);
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error al actualizar perfil.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center h-screen items-center"><CircularProgress /></div>;

    return (
        <ThemeProvider theme={theme}>
            <main className='flex py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
                <form onSubmit={handleSubmit}>
                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-bold text-gray-800">Perfil Profesional</h1>
                            <span className="text-gray-600">Así es como te ven los clientes</span>
                        </div>
                        {!isEditing ? (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ fontWeight: 500, borderRadius: 3 }}
                                onClick={() => setIsEditing(true)}
                            >
                                Editar perfil
                            </Button>
                        ) : (
                            <div className="flex gap-3">
                                <Button
                                    variant="outlined"
                                    onClick={() => setIsEditing(false)}
                                    disabled={saving}
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
                                    disabled={saving}
                                    sx={{ fontWeight: 500, borderRadius: 3 }}
                                >
                                    {saving ? 'Guardando...' : 'Guardar cambios'}
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                        {/* IZQUIERDA: TARJETA DE PRESENTACIÓN */}
                        <div className="flex flex-col border border-gray-200 bg-white rounded-xl p-6 gap-6 h-fit shadow-sm">
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative">
                                    <Avatar
                                        alt="Provider Picture"
                                        src={previewImage || "/static/images/avatar/2.jpg"}
                                        sx={{ width: 120, height: 120 }}
                                    />
                                    {isEditing && (
                                        <>
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="provider-image-upload"
                                                type="file"
                                                onChange={handleFileChange}
                                            />
                                            <label htmlFor="provider-image-upload">
                                                <IconButton
                                                    component="span"
                                                    color="primary"
                                                    sx={{
                                                        position: 'absolute', bottom: 0, right: -5,
                                                        backgroundColor: '#005c71', color: 'white',
                                                        '&:hover': { backgroundColor: '#004d61' },
                                                        padding: 1, borderRadius: '50%', border: '3px solid white'
                                                    }}
                                                >
                                                    <CameraAlt fontSize="small" />
                                                </IconButton>
                                            </label>
                                        </>
                                    )}
                                </div>
                                
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-gray-800">{`${formData.firstName} ${formData.lastName}`}</h2>
                                    <p className="text-gray-500 text-sm">{formData.location}</p>
                                </div>

                                <div className="flex justify-center gap-2 w-full">
                                    <div className="flex flex-col items-center bg-orange-50 px-3 py-2 rounded-lg border border-orange-100 flex-1">
                                        <div className="flex items-center gap-1">
                                            <Star sx={{ color: '#f59e0b', fontSize: 18 }} />
                                            <span className="font-bold text-gray-800">{formData.rating}</span>
                                        </div>
                                        <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Rating</span>
                                    </div>
                                    <div className="flex flex-col items-center bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 flex-1">
                                        <span className="font-bold text-gray-800">{formData.jobsCompleted}</span>
                                        <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Trabajos</span>
                                    </div>
                                    <div className="flex flex-col items-center bg-green-50 px-3 py-2 rounded-lg border border-green-100 flex-1">
                                        <span className="font-bold text-gray-800">{formData.yearsExperience}+</span>
                                        <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Años Exp.</span>
                                    </div>
                                </div>
                            </div>

                            <Divider />

                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Insignias</span>
                                <div className="flex flex-wrap gap-2">
                                    <Chip icon={<VerifiedUser style={{width:16}}/>} label="Identidad Verificada" size="small" color="success" variant="outlined" />
                                    <Chip icon={<Phone style={{width:16}}/>} label="Teléfono Verificado" size="small" color="success" variant="outlined" />
                                </div>
                            </div>
                        </div>

                        {/* DERECHA: FORMULARIOS */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {/* INFO PÚBLICA */}
                            <div className="flex flex-col border border-gray-200 bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-2">
                                        <Person fontSize="small" className="text-gray-400" /> 
                                        <h2 className="text-lg font-semibold">Información Pública</h2>
                                    </div>
                                    <span className="text-sm text-gray-500 pl-7">Lo que verán los clientes en tu perfil</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Nombre</label>
                                        <TextField
                                            size="small" fullWidth name="firstName"
                                            value={formData.firstName} onChange={handleChange} disabled={!isEditing}
                                            slotProps={{ input: { style: { borderRadius: "12px" } } }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Apellido</label>
                                        <TextField
                                            size="small" fullWidth name="lastName"
                                            value={formData.lastName} onChange={handleChange} disabled={!isEditing}
                                            slotProps={{ input: { style: { borderRadius: "12px" } } }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Ubicación Base</label>
                                        <TextField
                                            size="small" fullWidth name="location"
                                            value={formData.location} onChange={handleChange} disabled={!isEditing}
                                            placeholder="Ej. Centro de Mérida"
                                            slotProps={{ 
                                                input: { 
                                                    startAdornment: (<InputAdornment position="start"><LocationOn sx={{ color: isEditing ? 'primary.main' : 'text.disabled' }} /></InputAdornment>), 
                                                    style: { borderRadius: "12px" } 
                                                } 
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Sobre mí (Biografía)</label>
                                        <TextField
                                            multiline rows={4} fullWidth name="about"
                                            value={formData.about} onChange={handleChange} disabled={!isEditing}
                                            placeholder="Describe tu experiencia, certificaciones y por qué amas a las mascotas..."
                                            slotProps={{ input: { style: { borderRadius: "12px" } } }}
                                        />
                                        <span className="text-xs text-gray-400 text-right">Una buena descripción aumenta tus reservas.</span>
                                    </div>
                                </div>
                            </div>

                            {/* CONTACTO */}
                            <div className="flex flex-col border border-gray-200 bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-2">
                                        <Phone fontSize="small" className="text-gray-400" />
                                        <h2 className="text-lg font-semibold">Contacto Privado</h2>
                                    </div>
                                    <span className="text-sm text-gray-500 pl-7">Para notificaciones y soporte.</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Teléfono Móvil</label>
                                        <TextField
                                            size="small" fullWidth name="phone"
                                            value={formData.phone} onChange={handleChange} disabled={!isEditing}
                                            slotProps={{ 
                                                input: { 
                                                    startAdornment: (<InputAdornment position="start"><Phone sx={{ color: isEditing ? 'primary.main' : 'text.disabled' }} /></InputAdornment>), 
                                                    style: { borderRadius: "12px" } 
                                                } 
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Correo electrónico</label>
                                        <TextField
                                            size="small" fullWidth name="email"
                                            value={formData.email} disabled
                                            slotProps={{ 
                                                input: { 
                                                    startAdornment: (<InputAdornment position="start"><Email sx={{ color: 'text.disabled' }} /></InputAdornment>), 
                                                    style: { borderRadius: "12px" } 
                                                } 
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </ThemeProvider>
    )
}