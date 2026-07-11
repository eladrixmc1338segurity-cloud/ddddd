import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Maps
export const getAllMaps = (category, search) => {
  let url = '/maps';
  const params = new URLSearchParams();
  
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  
  if (params.toString()) url += `?${params}`;
  
  return api.get(url);
};

export const getMapById = (id) => {
  return api.get(`/maps/${id}`);
};

export const getReviews = (mapId) => {
  return api.get(`/reviews/map/${mapId}`);
};

export const createReview = (mapId, review) => {
  return api.post(`/reviews/map/${mapId}`, review);
};

export const getReviewsForOwner = () => {
  return api.get('/reviews');
};

export const updateReviewStatus = (reviewId, isActive) => {
  return api.put(`/reviews/${reviewId}`, { isActive });
};

export const deleteReview = (reviewId) => {
  return api.delete(`/reviews/${reviewId}`);
};

export const createMap = (mapData) => {
  return api.post('/maps', mapData);
};

export const updateMap = (id, mapData) => {
  return api.put(`/maps/${id}`, mapData);
};

export const deleteMap = (id) => {
  return api.delete(`/maps/${id}`);
};

// Users
export const getAllUsers = () => {
  return api.get('/users');
};

export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

export const getUserPermissions = (id) => {
  return api.get(`/users/${id}/permissions`);
};

export const updateUserPermissions = (id, permissions) => {
  return api.put(`/users/${id}/permissions`, { permissions });
};

export const updateUserRole = (id, role) => {
  return api.put(`/users/${id}/role`, { role });
};

export const deactivateUser = (id) => {
  return api.put(`/users/${id}/deactivate`);
};

export const activateUser = (id) => {
  return api.put(`/users/${id}/activate`);
};

// Estadísticas públicas
export const getStats = () => {
  return api.get('/stats');
};

// Monetización
export const getMonetization = () => {
  return api.get('/monetization');
};

export const updateMonetization = (data) => {
  return api.put('/monetization', data);
};

// Perfil
export const updateProfile = (data) => {
  return api.put('/auth/profile', data);
};

// Claves de admin
export const verifyAdminKey = (key) => {
  return api.post('/admin-keys/verify', { key });
};

export const setAdminAccessToken = (token) => {
  if (token) {
    api.defaults.headers.common['X-Admin-Access-Token'] = token;
  } else {
    delete api.defaults.headers.common['X-Admin-Access-Token'];
  }
};

export const getAdminKeys = () => {
  return api.get('/admin-keys');
};

export const getAccessLog = () => {
  return api.get('/admin-keys/log');
};

export const assignAdminKey = (userId) => {
  return api.post('/admin-keys/assign', { userId });
};

export const regenerateAdminKey = (userId) => {
  return api.put(`/admin-keys/regenerate/${userId}`);
};

export const revokeAdminKey = (userId) => {
  return api.delete(`/admin-keys/revoke/${userId}`);
};
