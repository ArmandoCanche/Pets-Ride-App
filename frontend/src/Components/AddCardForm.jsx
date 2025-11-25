import {
    TextField,
    Button,
    InputAdornment
} from '@mui/material';

import {
    CreditCard,
    CalendarToday,
    Lock
} from '@mui/icons-material';


export default function AddCardForm({onCancel, onSave}){
    return(
        <form className='flex flex-col gap-5 mt-3'>
            <TextField 
            label="Número de tarjeta"
            placeholder='0000 0000 0000 0000'
            fullWidth
            slotProps={{
                input:{
                    startAdornment: <InputAdornment position='start' ><CreditCard /></InputAdornment>
                }
            }}
            />
            <div className="grid grid-cols-2 gap-4">
                <TextField
                label="Expira (MM/AA)"
                placeholder="12/25"
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><CalendarToday /></InputAdornment> } }}
                />
                <TextField
                label="CVC"
                placeholder="123"
                type="password"
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><Lock /></InputAdornment> } }}
                />
            </div>
            <div className="flex gap-3 mt-4">
                <Button variant="outlined" fullWidth onClick={onCancel}>Cancelar</Button>
                <Button variant="contained" fullWidth onClick={onSave}>Guardar Tarjeta</Button>
            </div>
        </form>
    )
}