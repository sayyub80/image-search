import axios from 'axios';

// Create an axios instance
const api = axios.create();
api.defaults.withCredentials = true;



export const checkAuthStatus = async () => {
  try {
    const { data } = await api.get('/api/profile');
    return data;
  } catch (error) {
    console.log(error);
    
    return null;
  }
};
//logout user
export const logoutUser = () => api.get('/auth/logout');

//get top searches
export const getTopSearches = () => api.get('/api/top-searches');

//post search term and get images
export const postSearch = (term) => api.post('/api/search', { term });

//get search history
export const getSearchHistory = () => api.get('/api/history');