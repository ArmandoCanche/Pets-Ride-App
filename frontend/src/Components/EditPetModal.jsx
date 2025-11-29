import React, { useEffect, useState } from "react";
import {
    Button, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select,
    TextField, InputAdornment, IconButton, Typography, Divider
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { subYears, format } from 'date-fns'; 

// Servicios
import { petsService } from "../services/petsService";

// Iconos
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PetsIcon from '@mui/icons-material/Pets';

const theme = createTheme({
    typography: { fontFamily: 'Poppins, sans-serif' },
    palette: { primary: { main: '#005c71' } }
});

const INITIAL_STATE = {
    name: "", species: "", breed: "", age: "", weight: "",
    specialNeeds: "", medicalHistory: "", gender: "",
}

export default function EditPetModal({ open, onOpenChange, pet, onSuccess }) {

    const isEditing = !!pet;
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [previewImage, setPreviewImage] = useState(null); // Para mostrar la foto
    const [selectedFile, setSelectedFile] = useState(null); // El archivo real a subir
    const [loading, setLoading] = useState(false);

    // Cargar datos al abrir el modal
    useEffect(() => {
        if (open) {
            if (pet) {
                setFormData({
                    name: pet.name || "",
                    species: pet.species || "",
                    breed: pet.breed || "",
                    age: pet.age?.toString() || "",
                    weight: pet.weight?.toString() || "",
                    specialNeeds: Array.isArray(pet.specialNeeds) ? pet.specialNeeds.join(", ") : pet.specialNeeds || "",
                    medicalHistory: pet.medicalHistory || "",
                    gender: pet.gender || "",
                });
                setPreviewImage(pet.imageUrl); // Mostrar foto existente
            } else {
                setFormData(INITIAL_STATE);
                setPreviewImage(null);
            }
            setSelectedFile(null); // Resetear archivo nuevo
        }
    }, [open, pet]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Manejar selección de nueva foto
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file)); // Preview local inmediata
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Calcular Fecha de Nacimiento desde la Edad
            let calculatedBirthDate = null;
            if (formData.age) {
                const date = subYears(new Date(), Number(formData.age));
                calculatedBirthDate = format(date, 'yyyy-MM-dd');
            }

            // 2. Preparar objeto de datos
            // El servicio se encargará de convertirlo a FormData si hay imagen
            const payload = {
                name: formData.name,
                species: formData.species,
                breed: formData.breed,
                weight: Number(formData.weight),
                birthDate: calculatedBirthDate, 
                medicalNotes: formData.medicalHistory,
                // gender: formData.gender, // (Opcional: Si agregas columna 'gender' a la DB después)
                image: selectedFile // Enviamos el archivo
            };

            // 3. Enviar al Backend
            if (isEditing) {
                await petsService.update(pet.id, payload);
            } else {
                await petsService.create(payload);
            }

            // 4. Éxito
            if (onSuccess) onSuccess(); // Refrescar dashboard
            onOpenChange(false);

        } catch (error) {
            console.error("Error al guardar mascota:", error);
            alert("Hubo un error al guardar los datos.");
        } finally {
            setLoading(false);
        }
    };

    const getPetEmoji = () => {
        const species = (formData.species || "").toLowerCase();
        if (species.includes("perro")) return "🐶";
        if (species.includes("gato")) return "🐱";
        return "🐾";
    }

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={open}
                onClose={() => onOpenChange(false)}
                maxWidth="sm"
                fullWidth
                slotProps={{
                    paper: { sx: { borderRadius: "1.5rem", padding: 1 } }
                }}
            >
                {/* HEADER */}
                <div className="flex flex-row justify-between items-center px-6 pt-4 pb-2">
                    <div className="flex flex-col">
                        <Typography variant="h5" fontWeight="bold" color="text.primary">
                            {isEditing ? "Editar mascota" : "Nueva mascota"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {isEditing ? "Actualiza los datos de tu compañero" : "Agrega un nuevo integrante a la familia"}
                        </Typography>
                    </div>
                    <IconButton onClick={() => onOpenChange(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider sx={{ mb: 2 }} />

                <DialogContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        
                        {/* SECCIÓN FOTO (Con botón de subida) */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="h-28 w-28 rounded-full bg-gray-100 flex items-center justify-center text-5xl border-4 border-white shadow-sm overflow-hidden">
                                    {previewImage ? (
                                        <img 
                                            src={previewImage} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover" 
                                        />
                                    ) : (
                                        getPetEmoji()
                                    )}
                                </div>
                                
                                {/* Input de archivo oculto */}
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="pet-image-upload"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                
                                {/* Botón disparador */}
                                <label htmlFor="pet-image-upload">
                                    <IconButton
                                        component="span"
                                        sx={{
                                            position: 'absolute', bottom: 0, right: 0,
                                            backgroundColor: '#005c71', color: 'white',
                                            '&:hover': { backgroundColor: '#004d61' },
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                        }}
                                        size="small"
                                    >
                                        <CameraAltIcon fontSize="small" />
                                    </IconButton>
                                </label>
                            </div>
                        </div>

                        {/* DATOS PRINCIPALES */}
                        <TextField
                            label="Nombre de la mascota"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            placeholder="Ej. Firulais"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PetsIcon color="action" fontSize="small" /></InputAdornment>,
                            }}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormControl fullWidth required>
                                <InputLabel>Especie</InputLabel>
                                <Select
                                    label="Especie"
                                    name="species"
                                    value={formData.species}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Perro">Perro</MenuItem>
                                    <MenuItem value="Gato">Gato</MenuItem>
                                    <MenuItem value="Otro">Otro</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Raza"
                                name="breed"
                                value={formData.breed}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </div>

                        {/* DATOS (3 columnas) */}
                        <div className="grid grid-cols-3 gap-4">
                            <TextField
                                label="Edad"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                                type="number"
                                slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position="end"><span className="text-xs text-gray-500">años</span></InputAdornment>,
                                    }
                                }}
                            />
                            <TextField
                                label="Peso"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                required
                                type="number"
                                slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position="end"><span className="text-xs text-gray-500">kg</span></InputAdornment>,
                                    }
                                }}
                            />
                            <FormControl fullWidth>
                                <InputLabel>Género</InputLabel>
                                <Select
                                    label="Género"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="macho">Macho</MenuItem>
                                    <MenuItem value="hembra">Hembra</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {/* DETALLES MÉDICOS */}
                        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                                Salud y Cuidados
                            </Typography>
                            <TextField
                                label="Necesidades especiales"
                                multiline rows={2}
                                name="specialNeeds"
                                value={formData.specialNeeds}
                                onChange={handleChange}
                                fullWidth
                                placeholder="Alergias, miedos, dieta..."
                            />
                            <TextField
                                label="Historial médico"
                                multiline rows={2}
                                name="medicalHistory"
                                value={formData.medicalHistory}
                                onChange={handleChange}
                                fullWidth
                                placeholder="Vacunas al día, cirugías..."
                            />
                        </div>

                        {/* BOTONES */}
                        <div className="flex gap-3 pt-2">
                            <Button
                                variant="outlined"
                                sx={{
                                    fontFamily: 'Poppins, sans-serif',
                                    flex: { xs: 'auto', sm: '1' },
                                    color: '#000', background: '#fff', borderColor: '#ccc', fontWeight: 500, borderRadius: 3,
                                    '&:hover': {
                                        backgroundColor: '#eb9902ff',
                                        color: '#fff',
                                        borderColor: '#f7ae26ff',
                                    }
                                }}
                                onClick={() => onOpenChange(false)}
                                disabled={loading}
                            >Cancelar</Button>
                            
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    fontFamily: 'Poppins, sans-serif',
                                    flex: { xs: 'auto', sm: '1' },
                                    color: '#ffffffff', background: '#0b80d9ff',
                                    fontWeight: 500, borderRadius: 3,
                                    '&:hover': {
                                        backgroundColor: '#045a9cff',
                                        color: '#fff'
                                    }
                                }}
                            >
                                {loading ? "Guardando..." : (isEditing ? "Guardar cambios" : "Agregar mascota")}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )
}