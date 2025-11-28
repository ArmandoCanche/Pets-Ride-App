import api from '../api/axiosConfig'; 

export const bookingService = {
  // Obtener mis reservas (El backend ya filtra si soy cliente o proveedor)
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  // Crear una nueva
  create: async (data) => {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  // Actualizar estado (Aceptar/Rechazar/Cancelar)
  updateStatus: async (id, status) => {
    // status debe ser: 'confirmed', 'rejected', 'cancelled'
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  }
};