import api from '../api/axiosConfig';

export const authService = {
  // Login de usuario (Cliente o Proveedor)
  login: async (credentials) => {
    // credentials = { email, password }
    const response = await api.post('/login', credentials);
    return response.data; 
  },

  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  }
};