
import {
    Dialog, DialogContent, DialogTitle, IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function BaseModalCredit({ open, onClose, title, children }) {
    return (
        <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        slotProps={{
            paper: {
                sx:{borderRadius:'1.5rem', padding:2}
            }

        }}
        >
            <DialogTitle sx={{
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
                fontWeight:'bold'
                }}
                >
                {title}
                <IconButton
                onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
}