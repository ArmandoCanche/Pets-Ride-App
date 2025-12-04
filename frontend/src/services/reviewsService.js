import api from '../api/axiosConfig';

export const reviewsService = {
  // Obtener conteo
  getMyReviewCount: async () => {
    const response = await api.get('/reviews/count');
    return response.data.count;
  },

  // Obtener reseñas de un proveedor (Público o Privado)
  getByProviderId: async (providerId) => {
    const response = await api.get(`/reviews/providers/${providerId}`);
    return response.data; // Devuelve { items: [...], page: ... }
  },

  // Crear reseña
  create: async (data) => {
    const response = await api.post('/reviews', data);
    return response.data;
  }
};