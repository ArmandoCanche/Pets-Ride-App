import { Button, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";


import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography:{
        fontFamily: 'Poppins, sans-serif',
    }
})

const INITIAL_STATE = {
    name: "",
    species: "",
    breed: "",
    age: "",
    weight: "",
    specialNeeds: "",
    medicalHistory: "",
    gender: "",
}


export default function EditPetModal({open, onOpenChange, pet}) {

    const isEditing = !!pet;

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const {name,value} = e.target
        setFormData(prev =>({
            ...prev,
            [name]: value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/pets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    owner_id: 1,  // 👈 O el ID real del usuario logueado
                    name: formData.name,
                    species: formData.species,
                    breed: formData.breed,
                    age: formData.age,
                    weight: formData.weight,
                    special_needs: formData.specialNeeds,
                    medical_history: formData.medicalHistory,
                    gender: formData.gender,
                    birth_date: "2025-01-01", // o el campo real que tengas
                    medical_notes: "" // si no lo usas
                }),
            });

            const data = await response.json();
            console.log("Mascota creada:", data);

            if (data.success) {
                alert("Mascota registrada con éxito");
            }

            onOpenChange(false);

        } catch (error) {
            console.error("Error al enviar datos:", error);
        }
    };

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
            }
        } else{
            setFormData(INITIAL_STATE);
        }
    }, [open, pet]);


    return(
        <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            onClose={() => onOpenChange(false)}
            slotProps={{
                paper:{
                    sx:{
                        borderRadius:"1rem",
                        maxWidth: "600px",
                        width:"500px",
                        padding:3
                    }
                }
            }}
            >
                <DialogContent
                sx={{
                    display:"flex",
                    flexDirection:"column",
                    gap: "1.5rem"
                }}
                >
                    <h3 className="text-2xl font-semibold">{isEditing ? "Editar información de Mascota" : "Agregar nueva Mascota"}</h3>
                    <span className="text-sm font-medium text-gray-500">{isEditing ? "Actualiza la información de tu mascota" : "Agrega una nueva mascota a tu perfil"}</span>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <div className="space-y-2 flex flex-col gap-1">
                            <span>Foto de mascota</span>
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-20 rounded-lg bg-gray-200 flex items-center justify-center text-3xl">
                                    {formData.species === "perro" ? "🐶" : formData.species === "gato" ? "🐱" : "🐾"}

                                </div>
                                <Button variant="outlined" 
                                            sx={{ 
                                                fontFamily:'Poppins, sans-serif',
                                                alignSelf: { xs: 'stretch', sm: 'center' },
                                                padding:"4px 18px",
                                                color: '#000', background:'#fff', borderColor:'#ccc', fontWeight:500, borderRadius:3,
                                                '&:hover':{
                                                    backgroundColor: '#eb9902ff',
                                                    color: '#fff',
                                                    borderColor: '#f7ae26ff',
                                                }
                                            }}
                                >
                                    <Upload  className="h-4 w-4 mr-2"/>
                                    Subir foto
                                </Button>
                            </div>
                        </div>

                        {/* nombre */}
                        <TextField
                        label="Nombre de la mascota"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        fullWidth
                        />

                        {/* especies y razas */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <FormControl fullWidth required>
                                <InputLabel id="species-select-label">Especie</InputLabel>
                                <Select 
                                labelId="species-select-label"
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

                        {/* Año, peso y género */}
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <TextField
                                label="Año"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                fullWidth
                                required
                                />
                            </div>

                            <div>
                                <TextField
                                label="Peso"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                fullWidth
                                required
                                />
                            </div>
                            <div>
                                <FormControl
                                fullWidth required
                                >
                                    <InputLabel>Género
                                    </InputLabel>
                                    <Select
                                    labelId="gender-select-label"
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
                        </div>
                        {/* Necesidades especiales */}
                        <div className="space-y-2">
                            <TextField 
                            label="Necesidades especiales"
                            multiline
                            rows={4}
                            name="specialNeeds"
                            value={formData.specialNeeds}
                            onChange={handleChange}
                            fullWidth
                            placeholder="ej., Alergias, restricciones dietéticas, notas de comportamiento..."
                            />
                        </div>

                        {/* Historial médico */}
                        <div>
                            <TextField 
                            label="Historial médico"
                            multiline
                            rows={4}
                            name="medicalHistory"
                            value={formData.medicalHistory}
                            onChange={handleChange}
                            fullWidth
                            placeholder="ej., Vacunas, enfermedades previas, tratamientos actuales..."
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 pt-2 w-full">
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