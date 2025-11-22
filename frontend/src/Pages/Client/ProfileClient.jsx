import { CameraAlt, LocationCity, LocationOn, PersonPinCircleOutlined } from "@mui/icons-material";
import { Avatar, Button, createTheme, IconButton, InputAdornment, TextField, ThemeProvider } from "@mui/material";
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

                <div className="flex flex-col border-1 border-gray-400 rounded-xl p-6">
                    <h2 className="text-lg font-semibold">Profile Picture</h2>
                    <span className="text-gray-500">Esta foto será visible para los prestadores</span>
                    <div className="flex relative items-center gap-20">
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
                </div>

                <div className="flex flex-col border-1 border-gray-400 rounded-xl p-6">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold">Información pública</h2>
                            <span className="text-gray-500">Información visible a los prestadores</span>
                        </div>
                        <form action="submit" className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-base font-medium text-gray-700">Nombre visible</label>
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
                                                <User size={20} className="text-gray-400" />
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
                                <label className="text-base font-medium text-gray-700">Ubicación</label>
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
                                                <LocationOn/>
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
                                <label className="text-base font-medium text-gray-700">Sobre mí</label>
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
            </main>
        </ThemeProvider>
    )
}