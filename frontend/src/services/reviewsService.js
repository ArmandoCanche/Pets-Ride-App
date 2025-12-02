import api from '../api/axiosConfig';

export const reviewsService = {
  getMyReviewCount: async () => {
    const response = await api.get('/reviews/count');
    return response.data.count;
  }
};