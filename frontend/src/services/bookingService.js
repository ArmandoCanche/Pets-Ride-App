import api from '../api/axiosConfig';

export const bookingService = {
  // Obtener todas mis reservas (El backend filtra por rol automáticamente)
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  // Crear una nueva reserva
  create: async (data) => {
    // data espera: { providerId, serviceId, petId, startDateTime, notes }
    const response = await api.post('/bookings', data);
    return response.data;
  },

  // Actualizar estado (Aceptar/Cancelar/Rechazar)
  updateStatus: async (id, status) => {
    // status: 'confirmed', 'rejected', 'cancelled'
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  }
};

export const getProviderStats = async () => {
  const response = await api.get('/bookings/stats');
  return response.data;
};