import { 
    Button, createTheme, Dialog, DialogContent, FormControl, InputLabel, 
    Menu, MenuItem, Select, TextField, ThemeProvider, Chip, Box, 
    OutlinedInput, IconButton, InputAdornment, Divider, Typography 
} from "@mui/material"
import { useEffect, useState } from "react"

import CloseIcon from '@mui/icons-material/Close'; 
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// ... (TUS CONSTANTES INITIAL_STATE, PET_TYPES_LIST, DAYS_LIST SIGUEN IGUAL) ...
const INITIAL_STATE = {
    name: "",
    description: "",
    price: 0,
    priceUnit: "hora",
    duration: 0,
    durationUnit: "minutos",
    category: "",
    petType: [],
    serviceArea: "",
    availability: [],
}

const PET_TYPES_LIST = ["Perros", "Gatos", "Aves", "Roedores", "Reptiles", "Exóticos"];
const DAYS_LIST = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function ServiceModal({open, onOpenChange, service, onSave}) {

    const isEditing = !!service;
    const [formData, setFormData] = useState(INITIAL_STATE);

    useEffect(() => {
        if (service) {
            setFormData({
                name: service.name || "",
                description: service.description || "",
                price: service.price || 0,
                priceUnit: service.priceUnit || "",
                duration: service.duration || 0,
                category: service.category || "",
                petType: service.petType || [],
                serviceArea: service.serviceArea || "",
                availability: service.availability || [],
                durationUnit: service.durationUnit || "minutos",
            })
        } else {
            setFormData(INITIAL_STATE);
        }
    }, [service, open])

    const theme = createTheme({
        typography: { fontFamily: 'Poppins, sans-serif' },
        components: {
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': { backgroundColor: '#005c71', color: '#fff', fontWeight: 600, '&:hover': { backgroundColor: '#005c71' } },
                        '&:hover': { backgroundColor: '#d7f2faff' },
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: { backgroundColor: '#005c71', color: '#ffffff', fontWeight: 500, '& .MuiChip-deleteIcon': { color: '#ffffff' } }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: { root: { borderRadius: '12px' } }
            }
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData);
        onOpenChange(false);
    }

    const handleChange = (prop) => (event) => {
        setFormData({ ...formData, [prop]: event.target.value });
    };

    const handleMultiSelectChange = (prop) => (event) => {
        const { target: { value } } = event;
        setFormData({ ...formData, [prop]: typeof value === 'string' ? value.split(',') : value });
    };

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={open}
                onClose={() => onOpenChange(false)}
                maxWidth="md"
                fullWidth
                slotProps={{
                    paper: { sx: { borderRadius: "1.5rem", padding: 3 } }
                }}
            >
                {/* HEADER MÁS LIMPIO */}
                <div className="flex flex-row justify-between items-center px-6 pt-4 pb-2">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {isEditing ? "Editar servicio" : "Nuevo servicio"}
                    </h3>
                    <IconButton onClick={() => onOpenChange(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* 1. INFORMACIÓN BÁSICA (Lado a Lado) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <TextField
                                label="Nombre del servicio"
                                value={formData.name}
                                onChange={handleChange('name')}
                                fullWidth
                                placeholder="Ej. Paseo premium en parque"
                            />
                            <FormControl fullWidth required>
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                    value={formData.category}
                                    label="Categoría"
                                    onChange={handleChange('category')}
                                >
                                    <MenuItem value="paseo">Paseo de perros</MenuItem>
                                    <MenuItem value="veterinaria">Veterinaria</MenuItem>
                                    <MenuItem value="transporte">Transporte</MenuItem>
                                    <MenuItem value="hoteles">Hoteles</MenuItem>
                                    <MenuItem value="peluqueria">Peluquería</MenuItem>
                                    <MenuItem value="entrenamiento">Entrenamiento</MenuItem>
                                    <MenuItem value="cuidado">Cuidado en casa</MenuItem>
                                    <MenuItem value="emergencias">Emergencias</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <TextField
                            label="Descripción detallada"
                            value={formData.description}
                            onChange={handleChange('description')}
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Describe qué incluye tu servicio para atraer más clientes..."
                        />

                        {/* 2. BLOQUE LOGÍSTICO */}
                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block">Tarifas y Tiempo</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* PRECIO */}
                                <div className="flex gap-2">
                                    <TextField
                                        label="Precio"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                                        fullWidth
                                        InputProps={{ startAdornment: <InputAdornment position="start"><AttachMoneyIcon fontSize="small" color="action"/></InputAdornment> }}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel>Cobro</InputLabel>
                                        <Select
                                            value={formData.priceUnit}
                                            label="Cobro"
                                            onChange={handleChange('priceUnit')}
                                        >
                                            <MenuItem value="hora">Por Hora</MenuItem>
                                            <MenuItem value="sesion">Por Sesión</MenuItem>
                                            <MenuItem value="dia">Por Día</MenuItem>
                                            <MenuItem value="semana">Por Semana</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                {/* DURACIÓN */}
                                <div className="flex gap-2">
                                    <TextField
                                        label="Duración"
                                        type="number"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({...formData, duration: parseFloat(e.target.value)})}
                                        fullWidth
                                        InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon fontSize="small" color="action"/></InputAdornment> }}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel>Unidad</InputLabel>
                                        <Select
                                            value={formData.durationUnit}
                                            label="Unidad"
                                            onChange={handleChange('durationUnit')}
                                        >
                                            <MenuItem value="minutos">Minutos</MenuItem>
                                            <MenuItem value="horas">Horas</MenuItem>
                                            <MenuItem value="dias">Días</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>

                        {/* 3. ALCANCE Y DISPONIBILIDAD */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormControl fullWidth required>
                                <InputLabel id="pet-type-label">Mascotas aceptadas</InputLabel>
                                <Select
                                    labelId="pet-type-label"
                                    multiple
                                    value={formData.petType}
                                    onChange={handleMultiSelectChange('petType')}
                                    input={<OutlinedInput label="Mascotas aceptadas" startAdornment={<InputAdornment position="start"><PetsIcon fontSize="small" color="action"/></InputAdornment>} />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => <Chip key={value} label={value} size="small" />)}
                                        </Box>
                                    )}
                                >
                                    {PET_TYPES_LIST.map((type) => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Zona de cobertura"
                                value={formData.serviceArea}
                                onChange={handleChange('serviceArea')}
                                fullWidth
                                InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon fontSize="small" color="action"/></InputAdornment> }}
                            />
                        </div>

                        <FormControl fullWidth>
                            <InputLabel id="availability-label">Días disponibles</InputLabel>
                            <Select
                                labelId="availability-label"
                                multiple
                                value={formData.availability}
                                onChange={handleMultiSelectChange('availability')}
                                input={<OutlinedInput label="Días disponibles" startAdornment={<InputAdornment position="start"><CalendarTodayIcon fontSize="small" color="action"/></InputAdornment>} />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => <Chip key={value} label={value} size="small" />)}
                                    </Box>
                                )}
                            >
                                {DAYS_LIST.map((day) => (
                                    <MenuItem key={day} value={day}>{day}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* BOTONES */}
                        <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
                                <Button
                                variant="outlined"
                                onClick={() => onOpenChange(false)}
                                sx={{
                                    fontFamily:'Poppins, sans-serif',
                                    flex : {xs: 'auto', sm:'1'},
                                    width: {xs : '100%', sm: 'auto'},
                                    alignSelf: { xs: 'stretch', sm: 'center' },
                                    color: '#000', background:'#fff', borderColor:'#ccc', fontWeight:500, borderRadius:3,
                                    '&:hover':{
                                        backgroundColor: '#eb0202ff',
                                        color: '#fff',
                                        borderColor: '#f7ae26ff',
                                    }
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                onClick={handleSubmit}
                                sx={{ 
                                    fontFamily:'Poppins, sans-serif',
                                    flex : {xs: 'auto', sm:'1'},
                                    width: {xs : '100%', sm: 'auto'},
                                    alignSelf : { xs: 'stretch', sm: 'center' },
                                    color: '#ffffffff', background:'#045f73',
                                    fontWeight:500, borderRadius:3,
                                    '&:hover':{
                                        backgroundColor: '#238ea7ff',
                                        color: '#fff'
                                    }
                                }}
                                >
                                    {isEditing ? "Guardar cambios" : "Crear servicio"}
                                </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )
}