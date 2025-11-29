import api from '../api/axiosConfig';

export const petsService = {
  getAll: async () => {
    const response = await api.get('/pets');
    return response.data;
  },
  
  create: async (petData) => {
    const formData = new FormData();
    Object.keys(petData).forEach(key => {
        if (petData[key] !== null) formData.append(key, petData[key]);
    });

    const response = await api.post('/pets', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  update: async (id, petData) => {
    const formData = new FormData();
    Object.keys(petData).forEach(key => {
        if (petData[key] !== null) formData.append(key, petData[key]);
    });

    const response = await api.patch(`/pets/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};