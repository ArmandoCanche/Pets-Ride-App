import {
    TextField,
    Button,
    InputAdornment,
} from '@mui/material';

import {
    AccountBalance,
    Person,
    Numbers
} from '@mui/icons-material';

export default function AddBankAccountForm({onCancel, onSave}){
    return(
        <form className="flex flex-col gap-5 pt-2">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                Asegúrate de que la cuenta esté a tu nombre para evitar rechazos en los depósitos.
            </div>
            <TextField
                label="Nombre del Titular"
                placeholder="Como aparece en el estado de cuenta"
                fullWidth
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><Person /></InputAdornment> } }}
            />
            <TextField
                label="CLABE Interbancaria (18 dígitos)" 
                placeholder="012 180 015..."
                fullWidth
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><Numbers /></InputAdornment> } }}
            />

            <TextField
                label="Nombre del Banco"
                placeholder="Ej. BBVA, Santander"
                fullWidth
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><AccountBalance /></InputAdornment> } }}
            />

            <div className="flex gap-3 mt-4">
                <Button variant="outlined" fullWidth onClick={onCancel}>Cancelar</Button>
                <Button variant="contained" fullWidth onClick={onSave}>Agregar Cuenta</Button>
            </div>
        </form>
    )
}