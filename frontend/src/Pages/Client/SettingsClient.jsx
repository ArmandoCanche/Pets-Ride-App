import {
    Notifications,
    Security,
    CreditCard,
    Language,
    Delete,
    Add,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
import {
    Button,
    createTheme,
    Divider,
    FormControlLabel,
    Switch,
    TextField,
    ThemeProvider,
    InputAdornment,
    IconButton,
    Chip
} from "@mui/material";
import { useState } from "react";

const theme = createTheme({
    typography: { fontFamily: 'Poppins, sans-serif' },
    palette: {
        primary: { main: '#005c71' },
        error: { main: '#ef4444' }
    }
});

export default function SettingsClient() {
    const [showPassword, setShowPassword] = useState(false);
    const [notifications, setNotifications] = useState({
        tripUpdates: true,
        chatMessages: true,
        promotions: false,
        emailSummaries: true
    });

    const handleNotifChange = (event) => {
        setNotifications({
            ...notifications,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <main className='flex py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-gray-800">Configuración</h1>
                    <span className="text-gray-600">Gestiona tus preferencias de la aplicación, seguridad y pagos.</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                    {/* --- COLUMNA IZQUIERDA --- */}
                    <div className="flex flex-col gap-6">
                        
                        {/* 1. NOTIFICACIONES */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                                <Notifications color="primary" />
                                <h2 className="text-lg font-semibold">Notificaciones</h2>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <FormControlLabel
                                    control={<Switch checked={notifications.tripUpdates} onChange={handleNotifChange} name="tripUpdates" />}
                                    label={<span className="font-medium text-gray-700">Actualizaciones de viaje</span>}
                                    sx={{ justifyContent: 'space-between', marginLeft: 0, width: '100%', flexDirection: 'row-reverse' }}
                                />
                                <p className="text-xs text-gray-500 -mt-2 mb-2">Recibe alertas cuando el conductor llegue, inicie o finalice el viaje.</p>

                                <FormControlLabel
                                    control={<Switch checked={notifications.chatMessages} onChange={handleNotifChange} name="chatMessages" />}
                                    label={<span className="font-medium text-gray-700">Mensajes de chat</span>}
                                    sx={{ justifyContent: 'space-between', marginLeft: 0, width: '100%', flexDirection: 'row-reverse' }}
                                />

                                <FormControlLabel
                                    control={<Switch checked={notifications.promotions} onChange={handleNotifChange} name="promotions" />}
                                    label={<span className="font-medium text-gray-700">Promociones y ofertas</span>}
                                    sx={{ justifyContent: 'space-between', marginLeft: 0, width: '100%', flexDirection: 'row-reverse' }}
                                />
                            </div>
                        </div>

                        {/* 2. MÉTODOS DE PAGO */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <CreditCard color="primary" />
                                    <h2 className="text-lg font-semibold">Métodos de Pago</h2>
                                </div>
                                <Button startIcon={<Add />} size="small" variant="outlined" sx={{textTransform:'none', borderRadius:5}}>Agregar</Button>
                            </div>

                            <div className="flex flex-col gap-3">
                                {/* Tarjeta 1 */}
                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-12 bg-blue-900 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-700">•••• 4242</span>
                                            <span className="text-xs text-gray-500">Expira 12/28</span>
                                        </div>
                                    </div>
                                    <Chip label="Predeterminada" size="small" color="primary" variant="outlined" />
                                </div>

                                {/* Tarjeta 2 */}
                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-12 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-700">•••• 8899</span>
                                            <span className="text-xs text-gray-500">Expira 09/25</span>
                                        </div>
                                    </div>
                                    <Button size="small" color="error">Eliminar</Button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* --- COLUMNA DERECHA --- */}
                    <div className="flex flex-col gap-6">

                        {/* 3. SEGURIDAD */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                                <Security color="primary" />
                                <h2 className="text-lg font-semibold">Seguridad</h2>
                            </div>

                            <form className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Contraseña actual</label>
                                    <TextField 
                                        size="small" 
                                        type="password" 
                                        fullWidth 
                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius:"12px" } }}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Nueva contraseña</label>
                                    <TextField 
                                        size="small" 
                                        type={showPassword ? "text" : "password"}
                                        fullWidth 
                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius:"12px" } }}
                                        slotProps={{
                                            input:{
                                                endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                                )
                                            }
                                        }}
                                    />
                                </div>
                                <Button variant="contained" color="primary" sx={{borderRadius: 3, textTransform:'none', mt: 1}}>
                                    Actualizar contraseña
                                </Button>
                            </form>
                        </div>

                        {/* 4. PREFERENCIAS REGIONALES */}
                        {/* <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                                <Language color="primary" />
                                <h2 className="text-lg font-semibold">Idioma y Región</h2>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <TextField
                                    select
                                    label="Idioma"
                                    defaultValue="es"
                                    size="small"
                                    SelectProps={{ native: true }}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius:"12px" } }}
                                >
                                    <option value="es">Español</option>
                                    <option value="en">English</option>
                                </TextField>
                                <TextField
                                    select
                                    label="Moneda"
                                    defaultValue="mxn"
                                    size="small"
                                    SelectProps={{ native: true }}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius:"12px" } }}
                                >
                                    <option value="mxn">MXN ($)</option>
                                    <option value="usd">USD ($)</option>
                                </TextField>
                            </div>
                        </div> */}

                        <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Delete color="error" fontSize="small" />
                                <h2 className="text-base font-bold text-red-700">Eliminar cuenta</h2>
                            </div>
                            <p className="text-sm text-red-600 mb-4">
                                Esta acción es permanente. Se borrarán tus reservas, historial y datos de mascotas.
                            </p>
                            <Button variant="outlined" color="error" size="small" sx={{borderRadius: 3, textTransform:'none', borderColor: '#ef4444', backgroundColor:'white'}}>
                                Eliminar mi cuenta
                            </Button>
                        </div>

                    </div>
                </div>
            </main>
        </ThemeProvider>
    )
}