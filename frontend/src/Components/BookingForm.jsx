import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  CircularProgress,
  Alert 
} from '@mui/material';
import { bookingService } from '../services/bookingService';
import { petsService } from '../services/petsService';

export default function BookingForm({ providerId, serviceId, serviceName, price, onClose }) {
  // Estados del Formulario
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    petId: '',
    notes: ''
  });
  
  // Estados de UI
  const [loadingPets, setLoadingPets] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // 1. Cargar mascotas al abrir
  useEffect(() => {
    const loadPets = async () => {
      try {
        const data = await petsService.getAll();
        setPets(data);
      } catch (err) {
        console.error("Error cargando mascotas", err);
        setError("No pudimos cargar tus mascotas. Asegúrate de tener una registrada.");
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
    console.log("🔍 DATOS A ENVIAR:", {
      providerId_prop: providerId,  // ¿Qué recibí del padre?
      serviceId_prop: serviceId,    // ¿Qué recibí del padre?
      petId_state: formData.petId,
      date_state: formData.date,
      time_state: formData.time
  });

    try {
      if (!formData.date || !formData.time || !formData.petId) {
        throw new Error("Por favor completa fecha, hora y mascota.");
      }

      // INGENIERÍA: Combinar fecha y hora local -> ISO UTC
      const localDateTime = new Date(`${formData.date}T${formData.time}`);
      const isoDateTime = localDateTime.toISOString(); 

      const payload = {
        providerId: Number(providerId),
        serviceId: Number(serviceId),
        petId: Number(formData.petId),
        startDateTime: isoDateTime,
        notes: formData.notes
      };

      await bookingService.create(payload);
      setSuccess(true);
      
      // Cerrar después de 2 segundos para mostrar éxito
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.error || err.message || "Error al crear la reserva");
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Reservar: {serviceName}</h2>
        <p className="text-sm text-gray-500">Precio estimado: ${price}</p>
      </div>

      {success ? (
        <Alert severity="success">¡Reserva solicitada con éxito!</Alert>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {error && <Alert severity="error">{error}</Alert>}

          {/* Selección de Mascota */}
          <FormControl fullWidth size="small">
            <InputLabel id="pet-select-label">Elige tu mascota</InputLabel>
            <Select
              labelId="pet-select-label"
              value={formData.petId}
              label="Elige tu mascota"
              onChange={(e) => setFormData({...formData, petId: e.target.value})}
              disabled={loadingPets}
            >
              {loadingPets ? (
                <MenuItem disabled><CircularProgress size={20} /></MenuItem>
              ) : pets.length > 0 ? (
                pets.map((pet) => (
                  <MenuItem key={pet.pet_id} value={pet.pet_id}>
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
              label="Fecha"
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              inputProps={{ min: new Date().toISOString().split('T')[0] }} // No pasado
            />
            <TextField
              type="time"
              label="Hora"
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
            />
          </div>

          {/* Notas */}
          <TextField
            label="Notas para el proveedor"
            multiline
            rows={3}
            placeholder="Ej: Mi perro es tímido..."
            fullWidth
            size="small"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />

          <div className="flex gap-2 justify-end mt-2">
            <Button onClick={onClose} color="inherit" disabled={submitting}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ bgcolor: '#f26644', '&:hover': { bgcolor: '#d95336' } }}
              disabled={submitting}
            >
              {submitting ? "Procesando..." : "Confirmar Reserva"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}