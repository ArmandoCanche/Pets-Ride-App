import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, TextField, Button,
  FormControl, InputLabel, Select, MenuItem,
  Box, Chip, OutlinedInput, IconButton, ThemeProvider, createTheme,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { servicesService } from '../services/servicesService';

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
});

// Constantes para las listas desplegables
const PET_TYPES_LIST = ["Perros", "Gatos", "Aves", "Roedores", "Reptiles", "Exóticos"];
const DAYS_LIST = [
    { value: 'monday', label: 'Lunes' },
    { value: 'tuesday', label: 'Martes' },
    { value: 'wednesday', label: 'Miércoles' },
    { value: 'thursday', label: 'Jueves' },
    { value: 'friday', label: 'Viernes' },
    { value: 'saturday', label: 'Sábado' },
    { value: 'sunday', label: 'Domingo' },
];
const UNIT_OPTIONS = [
    { value: 'session', label: 'Sesión' },
    { value: 'hour', label: 'Hora' },
    { value: 'day', label: 'Día' },
    { value: 'night', label: 'Noche' },
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mes' },
];

const INITIAL_STATE = {
    name: "",
    description: "",
    price: "",
    priceUnit: "session", 
    duration: "", 
    durationUnit: "minutos", 
    category: "",
    acceptedSpecies: [],
    serviceArea: "",
    serviceDays: [],
};

export default function EditServiceModal({ open, onOpenChange, service, onSuccess }) {

    const isEditing = !!service;
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            if (service) {
                // Mapear datos recibidos del servicio para editar
                setFormData({
                    name: service.name || service.service_title || "",
                    description: service.description || "",
                    price: service.price || "",
                    priceUnit: service.priceUnit || "session",
                    duration: service.duration || service.duration_minutes || "",
                    durationUnit: "minutos",
                    category: service.category || service.category_name || "",
                    acceptedSpecies: service.acceptedSpecies || [], 
                    serviceArea: service.location || service.coverageArea || "",
                    serviceDays: service.serviceDays || [], 
                });
            } else {
                setFormData(INITIAL_STATE);
            }
        }
    }, [service, open]);

    const handleChange = (prop) => (event) => {
        setFormData({ ...formData, [prop]: event.target.value });
    };

    // Maneja selección múltiple (para mascotas y días)
    const handleMultiSelectChange = (prop) => (event) => {
        const { target: { value } } = event;
        setFormData({
            ...formData,
            // On autofill we get a stringified value.
            [prop]: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Preparar el objeto para enviar al backend
            // Aseguramos que los nombres coincidan con lo que espera tu controlador
            const payload = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                duration: Number(formData.duration), // Asumiendo que siempre son minutos
                category: formData.category,
                priceUnit: formData.priceUnit,
                coverageArea: formData.serviceArea,
                acceptedSpecies: formData.acceptedSpecies,
                serviceDays: formData.serviceDays
            };

            if (isEditing) {
                await servicesService.update(service.id || service.service_id, payload);
            } else {
                await servicesService.create(payload);
            }

            if (onSuccess) onSuccess(); // Notificar al padre para recargar la lista
            onOpenChange(false); // Cerrar modal

        } catch (error) {
            console.error("Error al guardar servicio:", error);
            alert("Hubo un error al guardar. Por favor revisa los datos.");
        } finally {
            setLoading(false);
        }
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
                {/* HEADER */}
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
                        
                        {/* 1. INFORMACIÓN BÁSICA */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <TextField
                                label="Nombre del servicio"
                                value={formData.name}
                                onChange={handleChange('name')}
                                fullWidth
                                placeholder="Ej. Paseo premium en parque"
                                required
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
                            placeholder="Describe qué incluye tu servicio..."
                            required
                        />

                        {/* 2. TARIFAS Y TIEMPO */}
                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block">Tarifas y Tiempo</span>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <TextField
                                    label="Precio"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange('price')}
                                    fullWidth
                                    required
                                    InputProps={{ startAdornment: <InputAdornment position="start"><AttachMoneyIcon fontSize="small" color="action" /></InputAdornment> }}
                                />
                                
                                <FormControl fullWidth>
                                    <InputLabel>Cobro por...</InputLabel>
                                    <Select
                                        value={formData.priceUnit}
                                        label="Cobro por..."
                                        onChange={handleChange('priceUnit')}
                                    >
                                        {UNIT_OPTIONS.map(opt => (
                                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Duración solo visible si es por sesión, para otros casos es redundante */}
                                {formData.priceUnit === 'session' && (
                                    <div className="flex gap-2">
                                        <TextField
                                            label="Duración"
                                            type="number"
                                            value={formData.duration}
                                            onChange={handleChange('duration')}
                                            fullWidth
                                            InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon fontSize="small" color="action" /></InputAdornment> }}
                                        />
                                        <FormControl fullWidth>
                                            <InputLabel>Unidad</InputLabel>
                                            <Select
                                                value={formData.durationUnit}
                                                label="Unidad"
                                                onChange={handleChange('durationUnit')}
                                                disabled // Lo dejamos fijo en minutos por simplicidad del backend
                                            >
                                                <MenuItem value="minutos">Minutos</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 3. ALCANCE Y DISPONIBILIDAD */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormControl fullWidth>
                                <InputLabel id="species-label">Mascotas aceptadas</InputLabel>
                                <Select
                                    labelId="species-label"
                                    multiple
                                    value={formData.acceptedSpecies}
                                    onChange={handleMultiSelectChange('acceptedSpecies')}
                                    input={<OutlinedInput label="Mascotas aceptadas" startAdornment={<InputAdornment position="start"><PetsIcon fontSize="small" color="action" /></InputAdornment>} />}
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
                                placeholder="Ej: Tizimín Centro"
                                InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon fontSize="small" color="action" /></InputAdornment> }}
                            />
                        </div>

                        <FormControl fullWidth>
                            <InputLabel id="days-label">Días disponibles</InputLabel>
                            <Select
                                labelId="days-label"
                                multiple
                                value={formData.serviceDays}
                                onChange={handleMultiSelectChange('serviceDays')}
                                input={<OutlinedInput label="Días disponibles" startAdornment={<InputAdornment position="start"><CalendarTodayIcon fontSize="small" color="action" /></InputAdornment>} />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((val) => {
                                            const dayLabel = DAYS_LIST.find(d => d.value === val)?.label || val;
                                            return <Chip key={val} label={dayLabel} size="small" />;
                                        })}
                                    </Box>
                                )}
                            >
                                {DAYS_LIST.map((day) => (
                                    <MenuItem key={day.value} value={day.value}>{day.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* BOTONES */}
                        <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2 justify-end">
                            <Button
                                variant="outlined"
                                onClick={() => onOpenChange(false)}
                                sx={{
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#000', background: '#fff', borderColor: '#ccc', fontWeight: 500, borderRadius: 3, textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                        borderColor: '#999',
                                    }
                                }}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#ffffffff', background: '#045f73',
                                    fontWeight: 500, borderRadius: 3, textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#238ea7ff',
                                    }
                                }}
                            >
                                {loading ? "Guardando..." : (isEditing ? "Guardar cambios" : "Crear servicio")}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    );
}