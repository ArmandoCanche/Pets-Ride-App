import api from '../api/axiosConfig';

export const userService = {
  // Obtener datos del usuario logueado
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Actualizar perfil (Maneja FormData para la foto)
  updateProfile: async (userData) => {
    const formData = new FormData();
    
    // Agregamos campos de texto
    Object.keys(userData).forEach(key => {
      if (key !== 'image' && userData[key] !== null && userData[key] !== undefined) {
        formData.append(key, userData[key]);
      }
    });

    // Agregamos la imagen si existe
    if (userData.image) {
      formData.append('image', userData.image);
    }

    const response = await api.patch('/users/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data;
  }
};