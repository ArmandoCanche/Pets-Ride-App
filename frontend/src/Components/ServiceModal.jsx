import { Button, createTheme, Dialog, DialogContent, FormControl, InputLabel, Menu, MenuItem, Select, TextField, ThemeProvider, Chip, Box, OutlinedInput, IconButton, InputAdornment, Divider} from "@mui/material"
import { useEffect, useState } from "react"

import CloseIcon from '@mui/icons-material/Close';  
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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

const PET_TYPES_LIST = [
    "Perros",
    "Gatos",
    "Aves",
    "Roedores",
    "Reptiles",
    "Exóticos"
];

const DAYS_LIST = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
];



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
        }
        else{
            setFormData(INITIAL_STATE);
        }
    },[service, open])

    const theme = createTheme({
        typography:{
            fontFamily: 'Poppins, sans-serif',
        },
        components: {
            // 1. Configuración del Menú (Ya la tenías)
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            backgroundColor: '#005c71',
                            color: '#ffffffff',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#005c71' },
                        },
                        '&:hover': { backgroundColor: '#d7f2faff' },
                    },
                },
            },
            // 2. NUEVO: Configuración global para los Chips
            MuiChip: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#005c71', // Fondo Teal
                        color: '#ffffff',           // Letra blanca
                        fontWeight: 500,
                        // Opcional: estilo para el botón de borrar si lo usaras
                        '& .MuiChip-deleteIcon': {
                            color: '#ffffff',
                        }
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: { borderRadius: '12px' }
                }
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
        setFormData({
            ...formData,
            [prop]: typeof value === 'string' ? value.split(',') : value,
        });
    };



    return (
        <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            onClose={() => onOpenChange(false)}
            slotProps={{
                paper:{
                    sx:{
                        borderRadius:"1rem",
                        maxWidth:"100%",
                        width:"800px",
                        padding:3
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
                    <div className="flex flex-row justify-between">
                        <h3 className="text-3xl font-semibold">{isEditing ? "Editar servicio" : "Crear servicio"}</h3>
                        <IconButton onClick={() => onOpenChange(false)} sx={{color:"#000000", background:"none", ":hover":{background:"#grey"}}} >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <TextField
                                label="Nombre"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                fullWidth
                            />
                            <FormControl fullWidth required>
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                labelId="category-label"
                                name="category"
                                value={formData.category}
                                label="Categoría"
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                            <TextField
                                label="Descripción"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                fullWidth
                                multiline
                                rows={4}
                            />

                            <Divider />
                            <div className="flex flex-col gap-5 grid grid-cols-2">
                                <TextField
                                    label="Precio"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                                    fullWidth
                                    slotProps={{ input: {startAdornment: <InputAdornment position="start"><AttachMoneyIcon fontSize="small"/></InputAdornment>} }}
                                />
                                <FormControl fullWidth required>
                                    <InputLabel>Unidad de precio</InputLabel>
                                    <Select
                                    labelId="price-unit-label"
                                    name="priceUnit"
                                    value={formData.priceUnit}
                                    label="Unidad de precio"
                                    onChange={(e) => setFormData({...formData, priceUnit: e.target.value})}
                                    >
                                        <MenuItem value="hora">Por hora</MenuItem>
                                        <MenuItem value="sesion">Por sesion</MenuItem>
                                        <MenuItem value="dia">Por día</MenuItem>
                                        <MenuItem value="semana">Por semana</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="flex flex-col gap-5 grid grid-cols-2">
                                <TextField
                                    label="Duración"
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({...formData, duration: parseFloat(e.target.value)})}
                                    fullWidth
                                    slotProps={{ input: {startAdornment: <InputAdornment position="start"><AccessTimeIcon fontSize="small"/></InputAdornment>} }}
                                />
                                <FormControl fullWidth required>
                                    <InputLabel>Unidad de tiempo</InputLabel>
                                    <Select
                                        value={formData.durationUnit}
                                        label="Unidad de tiempo"
                                        onChange={handleChange('durationUnit')}
                                    >
                                        <MenuItem value="minutos">Minutos</MenuItem>
                                        <MenuItem value="horas">Horas</MenuItem>
                                        <MenuItem value="dias">Días</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <Divider />

                            <FormControl fullWidth required>
                                <InputLabel id="pet-type-label">Tipo de mascotas</InputLabel>
                                <Select
                                multiple
                                labelId="pet-type-label"
                                value={formData.petType}
                                input={<OutlinedInput label="Tipos de mascotas" startAdornment={<InputAdornment position="start"><PetsIcon fontSize="small"/></InputAdornment>} />}
                                onChange={handleMultiSelectChange('petType')}
                                renderValue={(selected) =>(
                                    <Box sx={{display:'flex', flexWrap:'wrap', gap:0.5}}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} size="small" sx={{color:"#ffff", background:"#005c71"}}/>
                                        ))}
                                    </Box>
                                )}
                                >
                                    {PET_TYPES_LIST.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                            label="Area de servicio (ciudad o región)"
                            value={formData.serviceArea}
                            onChange={(e) => setFormData({...formData, serviceArea: e.target.value})}
                            fullWidth
                            InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon fontSize="small"/></InputAdornment> }}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="availability-label">Disponibilidad (Días)</InputLabel>
                                <Select
                                    labelId="availability-label"
                                    multiple
                                    value={formData.availability}
                                    onChange={handleMultiSelectChange('availability')}
                                    input={<OutlinedInput label="Disponibilidad (Días)" startAdornment={<InputAdornment position="start"><CalendarTodayIcon fontSize="small"/></InputAdornment>} />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} size="small"/>
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {DAYS_LIST.map((day) => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Divider />
                            <div className="flex gap-2">
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
                                        backgroundColor: '#eb9902ff',
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
                        </div>
                    </form>

                </DialogContent>


            </Dialog>
        </ThemeProvider>
    )
}