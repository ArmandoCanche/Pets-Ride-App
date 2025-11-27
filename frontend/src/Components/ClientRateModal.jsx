import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Avatar,
  Typography,
  Rating,
  TextField,
  Box
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function ClientRateModal({ open, onOpenChange, booking, onSubmit }) {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (open) {
      setValue(0);
      setComment("");
    }
  }, [open, booking]);

  const handleSubmit = () => {
    onSubmit({ bookingId: booking.id, rating: value, comment });
    onOpenChange(false);
  };

  if (!booking) return null;

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: "1.5rem", padding: 2 },
        },
      }}
    >
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: 'center', textAlign: 'center' }}>
        {/* Encabezado */}
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          Calificar Servicio
        </Typography>
        {/* Información del Proveedor */}
        <div className="flex flex-col items-center gap-2 mb-2">
            <Avatar
                src={booking.providerImage}
                alt={booking.providerName}
                sx={{ width: 64, height: 64, border: '3px solid #f3f4f6' }} 
            />
            <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-800">{booking.providerName}</span>
                <span className="text-sm text-gray-500">{booking.serviceType}</span>
            </div>
        </div>

        {/* Estrellas */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Typography component="legend" variant="caption" color="text.secondary">
                ¿Qué tal estuvo el servicio?
            </Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                size="large"
                icon={<StarIcon fontSize="inherit" />}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                sx={{
                    color: '#faaf00',
                    fontSize: '2.5rem',
                    '& .MuiRating-iconEmpty': {
                        color: '#dadada',
                    }
                }}
            />
        </Box>

        {/* Campo de Comentario */}
        <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Escribe tu opinión aquí (opcional)..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '1rem',
                    backgroundColor: '#f9fafb'
                }
            }}
        />

        {/* Botones */}
        <div className="flex gap-3 w-full mt-2">
            <Button
                variant="outlined"
                fullWidth
                onClick={() => onOpenChange(false)}
                sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    color: '#000',
                    background: '#ffffffff',
                    border:2,
                    borderColor: '#cececeff',
                    fontWeight: 500,
                    flex: 1,
                    '&:hover': {
                        borderColor: '#005c71',
                        scale: '1.02',
                        transition: 'all 0.3s ease-in-out'
                    } 
                }}
            >
                Cancelar
            </Button>
            <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={value === 0}
                sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    bgcolor: '#005c71',
                    flex: 1,
                    '&:hover': {
                        bgcolor: '#004a5b',
                        scale: '1.02',
                        transition: 'all 0.3s ease-in-out'
                    }
                }}
            >
                Enviar
            </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}