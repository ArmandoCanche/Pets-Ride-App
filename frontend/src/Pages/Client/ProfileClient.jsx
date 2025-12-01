import React, { useState, useEffect } from "react";
import { 
    CameraAlt, Email, Emergency, LocationOn, Person, Phone, Star, Pets 
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

export default function ProfileClient() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // Estado para la imagen
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        location: '', // address en DB
        about: '',    // bio en DB
        phone: '',    // phone_number en DB
        email: '',
        rating: 5.0,  // Mock (o traer de DB si existe)
        services: 0   // Mock
    });

    // 1. CARGAR PERFIL AL INICIO
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
                    rating: 5.0, // Dato futuro
                    services: 0  // Dato futuro
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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // Manejo de Archivo de Imagen
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
                image: selectedFile // Enviamos el archivo si existe
            };

            const updatedUser = await userService.updateProfile(payload);
            
            // Actualizar localStorage para que el navbar tenga la foto nueva
            const currentUser = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', JSON.stringify({ ...currentUser, ...updatedUser.user }));

            alert("Perfil actualizado con éxito");
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
                
                {/* --- HEADER --- */}
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
                            <span className="text-gray-600">Administra tu información personal</span>
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

                    {/* --- GRID PRINCIPAL --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                        {/* --- COLUMNA IZQUIERDA: TARJETA DE PRESENTACIÓN --- */}
                        <div className="flex flex-col border border-gray-200 bg-white rounded-xl p-6 gap-6 h-fit shadow-sm">
                            <div className="flex flex-col gap-1 text-center">
                                <h2 className="text-lg font-semibold">Foto de perfil</h2>
                                <span className="text-gray-500 text-sm">Visible para los prestadores</span>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <div className="relative">
                                    <Avatar
                                        alt="Profile Picture"
                                        src={previewImage || "/static/images/avatar/1.jpg"}
                                        sx={{ width: 100, height: 100, fontSize: '2.5rem' }}
                                    >
                                        {formData.firstName?.charAt(0)}
                                    </Avatar>
                                    
                                    {/* Botón de cámara (Input oculto) */}
                                    {isEditing && (
                                        <>
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="profile-image-upload"
                                                type="file"
                                                onChange={handleFileChange}
                                            />
                                            <label htmlFor="profile-image-upload">
                                                <IconButton
                                                    component="span"
                                                    color="primary"
                                                    sx={{
                                                        position: 'absolute', bottom: 0, right: -10,
                                                        backgroundColor: '#005c71', color: 'white',
                                                        '&:hover': { backgroundColor: '#004d61' },
                                                        padding: 1, borderRadius: '50%',
                                                        border: '2px solid white'
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
                                    <p className="text-gray-500 text-sm">{formData.location || "Sin ubicación"}</p>
                                </div>
                            </div>

                            <Divider />

                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tus Verificaciones</span>
                                <div className="flex flex-wrap gap-2">
                                    <Chip label="Email verificado" size="small" color="success" variant="outlined" />
                                </div>
                            </div>
                        </div>

                        {/* --- COLUMNA DERECHA: FORMULARIOS --- */}
                        <div className="lg:col-span-2 flex flex-col gap-6">

                            {/* TARJETA 1: INFORMACIÓN PÚBLICA */}
                            <div className="flex flex-col border border-gray-200 bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-2">
                                        <Person fontSize="small" className="text-gray-400" />
                                        <h2 className="text-lg font-semibold">Información pública</h2>
                                    </div>
                                    <span className="text-sm text-gray-500 pl-7">Esta información ayuda a los prestadores a conocerte</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Nombre</label>
                                        <TextField
                                            size="small" fullWidth name="firstName"
                                            value={formData.firstName} onChange={handleChange} disabled={!isEditing}
                                            placeholder="Ej. Juan"
                                            slotProps={{ input: { style: { borderRadius: "12px" } } }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Apellido</label>
                                        <TextField
                                            size="small" fullWidth name="lastName"
                                            value={formData.lastName} onChange={handleChange} disabled={!isEditing}
                                            placeholder="Ej. Pérez"
                                            slotProps={{ input: { style: { borderRadius: "12px" } } }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Ubicación</label>
                                        <TextField
                                            size="small" fullWidth name="location"
                                            value={formData.location} onChange={handleChange} disabled={!isEditing}
                                            placeholder="Ej. Ciudad de México"
                                            slotProps={{ 
                                                input: { 
                                                    startAdornment: (<InputAdornment position="start"><LocationOn sx={{ color: isEditing ? 'primary.main' : 'text.disabled' }} /></InputAdornment>), 
                                                    style: { borderRadius: "12px" } 
                                                } 
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Sobre mí</label>
                                        <TextField
                                            multiline rows={4} fullWidth name="about"
                                            value={formData.about} onChange={handleChange} disabled={!isEditing}
                                            placeholder="Cuéntanos un poco sobre ti..."
                                            slotProps={{ input: { style: { borderRadius: "12px" } } }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* TARJETA 2: CONTACTO */}
                            <div className="flex flex-col border border-gray-200 bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-2">
                                        <Phone fontSize="small" className="text-gray-400" />
                                        <h2 className="text-lg font-semibold">Datos de contacto</h2>
                                    </div>
                                    <span className="text-sm text-gray-500 pl-7">Privado. Solo se comparte al confirmar un servicio.</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Teléfono Móvil</label>
                                        <TextField
                                            size="small" fullWidth name="phone"
                                            value={formData.phone} onChange={handleChange} disabled={!isEditing}
                                            placeholder="+52 ..."
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
                                            value={formData.email} 
                                            disabled // El email no se debe editar por seguridad
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