import { Button, createTheme, Dialog, DialogContent, FormControl, InputLabel, Menu, MenuItem, Select, TextField, ThemeProvider } from "@mui/material"
import { useState } from "react"


export default function EditServiceModal({open, onOpenChange, service}) {

    const [formData, setFormData] = useState({
        name: service.name || "",
        description: service.description || "",
        price: service.price || 0,
        priceUnit: service.priceUnit || "",
        duration: service.duration || "",
    })

    const theme = createTheme({
        typography:{
            fontFamily: 'Poppins, sans-serif',
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("[v0] Updating pet data:", formData)
    }



    return (
        <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            onClose={() => onOpenChange(false)}
            slotProps={{
                paper:{
                    sx:{
                        borderRadius:"1rem",
                        maxWidth:"600px",
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
                    gap:"1.5rem"
                }}
                >
                    <h3 className="text-2xl font-semibold">Editar servicio</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-10">
                            <TextField
                                label="Nombre"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                fullWidth
                            />
                            <TextField
                                label="Descripción"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                fullWidth
                                multiline
                                rows={4}
                            />
                            <div className="flex flex-col gap-5 grid grid-cols-2">
                                <TextField
                                    label="Precio"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                                    fullWidth
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
                            <TextField
                                label="Duración"
                                value={formData.duration}
                                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                fullWidth
                            />

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
                                    Guardar cambios
                                </Button>

                            </div>
                        </div>
                    </form>

                </DialogContent>


            </Dialog>
        </ThemeProvider>
    )
}