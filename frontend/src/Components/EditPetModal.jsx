import {
    Button, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select,
    TextField, InputAdornment, IconButton, Typography, Divider
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Iconos
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PetsIcon from '@mui/icons-material/Pets';

const theme = createTheme({
    typography:{ fontFamily: 'Poppins, sans-serif' },
    palette: { primary: { main: '#005c71' } }
});

const INITIAL_STATE = {
    name: "", species: "", breed: "", age: "", weight: "",
    specialNeeds: "", medicalHistory: "", gender: "",
}

export default function EditPetModal({open, onOpenChange, pet}) {

    const isEditing = !!pet;
    const [formData, setFormData] = useState(INITIAL_STATE);

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
            } else {
                setFormData(INITIAL_STATE);
            }
        }
    }, [open, pet]);

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onOpenChange(false);
    }

    const getPetEmoji = () => {
        if (formData.species === "perro") return "🐶";
        if (formData.species === "gato") return "🐱";
        return "🐾";
    }

    return(
        <ThemeProvider theme={theme}>
            <Dialog
                open={open}
                onClose={() => onOpenChange(false)}
                maxWidth="sm"
                fullWidth
                slotProps={{
                    paper:{ sx:{ borderRadius:"1.5rem", padding: 1 } }
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
                        {/* SECCIÓN FOTO*/}
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center text-5xl border-4 border-white shadow-sm">
                                    {getPetEmoji()}
                                </div>
                                <IconButton
                                    sx={{
                                        position: 'absolute', bottom: 0, right: 0,
                                        backgroundColor: '#005c71', color: 'white',
                                        '&:hover': { backgroundColor: '#004d61' },
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                    }}
                                    size="small"
                                >
                                    <CameraAltIcon fontSize="small"/>
                                </IconButton>
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
                                startAdornment: <InputAdornment position="start"><PetsIcon color="action" fontSize="small"/></InputAdornment>,
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
                                    <MenuItem value="perro">Perro</MenuItem>
                                    <MenuItem value="gato">Gato</MenuItem>
                                    <MenuItem value="otro">Otro</MenuItem>
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
                            <FormControl fullWidth required>
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
                            onClick={() => onOpenChange(false)}
                            >Cancelar</Button>
                            <Button
                            type="submit"
                            variant="contained"
                            sx={{ 
                                fontFamily:'Poppins, sans-serif',
                                flex : {xs: 'auto', sm:'1'},
                                width: {xs : '100%', sm: 'auto'},
                                alignSelf : { xs: 'stretch', sm: 'center' },
                                color: '#ffffffff', background:'#0b704eff',
                                fontWeight:500, borderRadius:3,
                                '&:hover':{
                                    backgroundColor: '#11a876ff',
                                    color: '#fff'
                                }
                            }}
                            >{isEditing ? "Guardar cambios" : "Agregar mascota"}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )
}