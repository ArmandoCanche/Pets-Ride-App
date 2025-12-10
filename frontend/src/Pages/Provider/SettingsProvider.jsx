import {
    Notifications,
    Security,
    AccountBalance, // Icono para Cuenta Bancaria
    Delete,
    Add,
    Visibility,
    VisibilityOff,
    Tune // Icono para preferencias
} from "@mui/icons-material";
import {
    Button,
    createTheme,
    FormControlLabel,
    Switch,
    TextField,
    ThemeProvider,
    InputAdornment,
    IconButton,
    Chip
} from "@mui/material";
import { useState } from "react";
import BaseModalCredit from "../../Components/BaseModalCredit";
import AddCardForm from "../../Components/AddCardForm";
import AddBankAccountForm from "../../Components/AddBankAccountForm";
import { useNavigate } from "react-router-dom"; 
import { userService } from "../../services/userService";

const theme = createTheme({
    typography: { fontFamily: 'Poppins, sans-serif' },
    palette: {
        primary: { main: '#005c71' },
        error: { main: '#ef4444' }
    }
});

export default function SettingsProvider() {
    const navigate = useNavigate();

    const [creditCardModalOpen, setCreditCardModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [settings, setSettings] = useState({
        newBookings: true,
        smsAlerts: true,
        marketing: false,
        autoAccept: false,
        vacationMode: false
    });

    const handleSettingChange = (event) => {
        setSettings({
            ...settings,
            [event.target.name]: event.target.checked,
        });
    };

    const handleNewCreditCard = () =>{
        setCreditCardModalOpen(true);
    }

    const handleSaveCard = () =>{
        setCreditCardModalOpen(false);
    }

    // --- NUEVA FUNCIÓN PARA ELIMINAR ---
    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar tu cuenta profesional? Perderás tu historial de trabajos y pagos pendientes."
        );

        if (confirmDelete) {
            try {
                await userService.deleteUser();
                localStorage.removeItem('token');
                // Redirigir al login de proveedores o al home general
                navigate('/'); 
            } catch (error) {
                console.error("Error al eliminar cuenta:", error);
                alert("Hubo un error al intentar eliminar tu cuenta.");
            }
        }
    };

        // Estados para el formulario de contraseña
    const [passwords, setPasswords] = useState({
        current: '',
        new: ''
    });

    // Manejar cambios en los inputs
    const handlePasswordChange = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    };

    // Enviar el cambio
    const handleSubmitPassword = async () => {
        if (!passwords.current || !passwords.new) {
            alert("Por favor completa ambos campos");
            return;
        }

        try {
            await userService.changePassword(passwords.current, passwords.new);
            alert("¡Contraseña actualizada con éxito!");
            setPasswords({ current: '', new: '' }); // Limpiar campos
        } catch (error) {
            console.error(error);
            // Mostrar mensaje de error del backend si existe
            alert(error.response?.data?.error || "Error al actualizar la contraseña");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <main className='flex py-6 px-10 md:px-5 lg:px-10 xl:px-25 bg-gray-100 min-h-screen flex-col gap-6'>

                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-gray-800">Configuración Profesional</h1>
                    <span className="text-gray-600">Administra tus cobros, alertas y seguridad de tu cuenta.</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                    {/* --- COLUMNA IZQUIERDA --- */}
                    <div className="flex flex-col gap-6">
                        {/* 1. PREFERENCIAS DE SERVICIO (NUEVO PARA PRESTADOR) */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                                <Tune color="primary" />
                                <h2 className="text-lg font-semibold">Preferencias de Servicio</h2>
                            </div>
                            <div className="flex flex-col gap-2">
                                <FormControlLabel
                                    control={<Switch checked={settings.vacationMode} onChange={handleSettingChange} name="vacationMode" color="warning" />}
                                    label={<span className="font-medium text-gray-700">Modo Vacaciones</span>}
                                    sx={{ justifyContent: 'space-between', marginLeft: 0, width: '100%', flexDirection: 'row-reverse' }}
                                />
                                <p className="text-xs text-gray-500 -mt-2 mb-4">Tu perfil no aparecerá en las búsquedas mientras esté activo.</p>

                                <FormControlLabel
                                    control={<Switch checked={settings.autoAccept} onChange={handleSettingChange} name="autoAccept" />}
                                    label={<span className="font-medium text-gray-700">Aceptación Automática</span>}
                                    sx={{ justifyContent: 'space-between', marginLeft: 0, width: '100%', flexDirection: 'row-reverse' }}
                                />
                                <p className="text-xs text-gray-500 -mt-2">Acepta reservas instantáneamente si tienes disponibilidad en calendario.</p>
                            </div>
                        </div>

                        {/* 2. CUENTAS BANCARIAS (COBROS) - CAMBIO PRINCIPAL */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <AccountBalance color="primary" />
                                    <h2 className="text-lg font-semibold">Métodos de Cobro</h2>
                                </div>
                                <Button onClick={handleNewCreditCard} startIcon={<Add />} size="small" variant="outlined" sx={{textTransform:'none', borderRadius:5}}>Cuenta</Button>
                            </div>

                            <div className="flex flex-col gap-3">
                                {/* Cuenta Principal */}
                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                            <AccountBalance fontSize="small"/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-700">BBVA Bancomer</span>
                                            <span className="text-xs text-gray-500">CLABE •••• 4242</span>
                                        </div>
                                    </div>
                                    <Chip label="Verificada" size="small" color="success" variant="filled" sx={{height: 24, fontSize: '0.7rem'}} />
                                </div>

                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    <p className="text-xs text-blue-800">
                                        <strong>Nota:</strong> Los pagos se depositan automáticamente cada miércoles a tu cuenta predeterminada.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 3. NOTIFICACIONES (ADAPTADAS) */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                                <Notifications color="primary" />
                                <h2 className="text-lg font-semibold">Alertas</h2>
                            </div>

                            <div className="flex flex-col gap-2">
                                <FormControlLabel
                                    control={<Switch checked={settings.newBookings} onChange={handleSettingChange} name="newBookings" />}
                                    label={<span className="font-medium text-gray-700">Nuevas solicitudes</span>}
                                    sx={{ justifyContent: 'space-between', marginLeft: 0, width: '100%', flexDirection: 'row-reverse' }}
                                />
                                <FormControlLabel
                                    control={<Switch checked={settings.smsAlerts} onChange={handleSettingChange} name="smsAlerts" />}
                                    label={<span className="font-medium text-gray-700">Alertas por SMS</span>}
                                    sx={{ justifyContent: 'space-between', marginLeft: 0, width: '100%', flexDirection: 'row-reverse' }}
                                />
                                <p className="text-xs text-gray-500 -mt-2">Recibe SMS urgentes si no respondes en la app en 5 min.</p>
                            </div>
                        </div>

                    </div>

                    {/* --- COLUMNA DERECHA --- */}
                    <div className="flex flex-col gap-6">

                        {/* 4. SEGURIDAD (IGUAL AL CLIENTE) */}
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
                                    name="current" // IMPORTANTE: name coincide con el estado
                                    value={passwords.current}
                                    onChange={handlePasswordChange}
                                    fullWidth
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius:"12px" } }}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">Nueva contraseña</label>
                                <TextField
                                    size="small"
                                    type={showPassword ? "text" : "password"}
                                    name="new" // IMPORTANTE: name coincide con el estado
                                    value={passwords.new}
                                    onChange={handlePasswordChange}
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
                                <Button 
                                onClick={handleSubmitPassword} // Conectar la función aquí
                                variant="contained" 
                                color="primary" 
                                sx={{borderRadius: 3, textTransform:'none', mt: 1}}
                                >
                                Actualizar contraseña
                            </Button>
                            </form>
                        </div>

                        {/* 5. ZONA DE PELIGRO */}
                        <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Delete color="error" fontSize="small" />
                                <h2 className="text-base font-bold text-red-700">Cerrar cuenta de prestador</h2>
                            </div>
                            <p className="text-sm text-red-600 mb-4">
                                Al eliminar tu cuenta, perderás tu historial de trabajos, calificaciones y pagos pendientes.
                            </p>
                            <Button 
                                onClick={handleDeleteAccount} // VINCULAR EL EVENTO AQUÍ
                                variant="outlined" 
                                color="error" 
                                size="small" 
                                sx={{borderRadius: 3, textTransform:'none', borderColor: '#ef4444', backgroundColor:'white'}}
                            >
                                Eliminar mi cuenta
                            </Button>
                        </div>

                    </div>
                </div>
            </main>
            <BaseModalCredit open={creditCardModalOpen} onClose={() => setCreditCardModalOpen(false)}>
                <AddBankAccountForm onCancel={() => setCreditCardModalOpen(false)} onSave={handleSaveCard} />
            </BaseModalCredit>
        </ThemeProvider>
    )
}