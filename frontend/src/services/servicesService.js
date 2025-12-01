import api from '../api/axiosConfig';

export const servicesService = {
  
  getAll: async () => {
    const response = await api.get('/services');
    return response.data;
  },

  getByProvider: async (providerId) => {
    const response = await api.get(`/services/provider/${providerId}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/services', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/services/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },

  toggleStatus: async (id) => {
    const response = await api.patch(`/services/${id}/toggle`);
    return response.data;
  }
};