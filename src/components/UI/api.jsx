import axios from 'axios';
const API_KEY = '35805429-18a150f429e0469a7a93e7211';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImage = async (searchQuery, page) => {
  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  };

  const response = await axios.get('/', { params });
  if (response.status === 200 && response.data) {
    return response.data;
  } else {
    throw new Error('Response error: undefined or wrong status code');
  }
};
