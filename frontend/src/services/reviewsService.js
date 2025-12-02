import api from '../api/axiosConfig';

export const reviewsService = {
  // Obtener conteo
  getMyReviewCount: async () => {
    const response = await api.get('/reviews/count');
    return response.data.count;
  },

  // Función para crear reseña
  create: async (data) => {
    // data espera: { bookingId, rating, comment }
    const response = await api.post('/reviews', data);
    return response.data;
  }
};