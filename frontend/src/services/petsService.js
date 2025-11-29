import api from '../api/axiosConfig';

export const petsService = {
  // Obtener todas mis mascotas
  getAll: async () => {
    const response = await api.get('/pets');
    return response.data;
  },
  
  // Crear mascota (por si lo necesitas luego)
  create: async (data) => {
    const response = await api.post('/pets', data);
    return response.data;
  }
};