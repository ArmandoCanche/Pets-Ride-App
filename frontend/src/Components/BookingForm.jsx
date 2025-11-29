import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  CircularProgress,
  Alert,
  InputAdornment
} from '@mui/material';
import { bookingService } from '../services/bookingService';
import { petsService } from '../services/petsService';

export default function BookingForm({ 
  providerId, 
  serviceId, 
  serviceName, 
  price, 
  pricingUnit, 
  onClose 
}) {
  // Estados
  const [pets, setPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    petId: '',
    notes: '',
    quantity: 1 // <--- CANTIDAD POR DEFECTO
  });

  // 1. Cargar mascotas
  useEffect(() => {
    const loadPets = async () => {
      try {
        const data = await petsService.getAll();
        setPets(data);
      } catch (err) {
        console.error("Error cargando mascotas", err);
        setError("No pudimos cargar tus mascotas. Verifica tu conexión.");
      } finally {
        setLoadingPets(false);
      }
    };
    loadPets();
  }, []);

  // 2. Manejar Envío
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (!formData.date || !formData.time || !formData.petId) {
        throw new Error("Por favor completa fecha, hora y mascota.");
      }

      const localDateTime = new Date(`${formData.date}T${formData.time}`);
      const isoDateTime = localDateTime.toISOString(); 

      const payload = {
        providerId: Number(providerId),
        serviceId: Number(serviceId),
        petId: Number(formData.petId),
        startDateTime: isoDateTime,
        notes: formData.notes,
        quantity: Number(formData.quantity) // <--- ENVIAR CANTIDAD
      };

      await bookingService.create(payload);
      setSuccess(true);
      
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.error || err.message || "Error al crear la reserva");
      setSubmitting(false);
    }
  };

  // Helper para etiqueta dinámica
  const getQuantityLabel = () => {
      switch(pricingUnit) {
          case 'hour': return 'Duración (Horas)';
          case 'night': return 'Estadía (Noches)';
          case 'day': return 'Días';
          case 'week': return 'Semanas';
          case 'month': return 'Meses';
          default: return null;
      }
  };

  // Cálculo del total visual
  const totalEstimado = (price * formData.quantity).toFixed(2);

  return (
    <div className="p-6">
      <div className="mb-4 border-b pb-2">
        <h2 className="text-xl font-bold text-gray-800">Reservar: {serviceName}</h2>
        <p className="text-sm text-gray-500">
            Tarifa base: <span className="font-bold text-green-600">${price}</span> 
            {pricingUnit !== 'session' && ` por ${pricingUnit === 'hour' ? 'hora' : pricingUnit}`}
        </p>
      </div>

      {success ? (
        <Alert severity="success" sx={{mt: 2}}>¡Solicitud enviada con éxito!</Alert>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          
          {error && <Alert severity="error">{error}</Alert>}

          {/* Selección de Mascota */}
          <FormControl fullWidth size="small">
            <InputLabel id="pet-select-label">¿Quién recibe el servicio?</InputLabel>
            <Select
              labelId="pet-select-label"
              value={formData.petId}
              label="¿Quién recibe el servicio?"
              onChange={(e) => setFormData({...formData, petId: e.target.value})}
              disabled={loadingPets}
            >
              {loadingPets ? (
                <MenuItem disabled><CircularProgress size={20} /></MenuItem>
              ) : pets.length > 0 ? (
                pets.map((pet) => (
                  <MenuItem key={pet.id || pet.pet_id} value={pet.id || pet.pet_id}>
                    {pet.name} ({pet.breed || 'Mascota'})
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No tienes mascotas registradas</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Fecha y Hora */}
          <div className="flex gap-4">
            <TextField
              type="date"
              label="Fecha de inicio"
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              inputProps={{ min: new Date().toISOString().split('T')[0] }}
              required
            />
            <TextField
              type="time"
              label="Hora de inicio"
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              required
            />
          </div>

          {/* INPUT DINÁMICO DE CANTIDAD (Solo si no es sesión) */}
          {pricingUnit && pricingUnit !== 'session' && (
             <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                 <TextField
                    type="number"
                    label={getQuantityLabel()}
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: Math.max(1, parseInt(e.target.value) || 1)})}
                    fullWidth
                    size="small"
                    required
                    InputProps={{
                        inputProps: { min: 1 },
                        endAdornment: <InputAdornment position="end">{pricingUnit === 'hour' ? 'hrs' : ''}</InputAdornment>
                    }}
                 />
                 <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-gray-500">Costo total estimado:</span>
                    <span className="font-bold text-lg text-green-700">${totalEstimado}</span>
                 </div>
             </div>
          )}

          {/* Notas */}
          <TextField
            label="Notas o instrucciones especiales"
            multiline
            rows={3}
            placeholder="Ej: Es alérgico al pollo, cuidado con la puerta..."
            fullWidth
            size="small"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />

          <div className="flex gap-2 justify-end mt-4 pt-2 border-t border-gray-100">
            <Button onClick={onClose} color="inherit" disabled={submitting}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ bgcolor: '#f26644', '&:hover': { bgcolor: '#d95336' }, px: 4 }}
              disabled={submitting}
            >
              {submitting ? <CircularProgress size={24} color="inherit"/> : "Confirmar Reserva"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}