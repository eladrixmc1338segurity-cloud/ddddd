import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Maps
export const getAllMaps = (category, search) => {
  let url = `${API_URL}/maps`;
  const params = new URLSearchParams();
  
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  
  if (params.toString()) url += `?${params}`;
  
  return axios.get(url);
};

export const getMapById = (id) => {
  return axios.get(`${API_URL}/maps/${id}`);
};

export const createMap = (mapData) => {
  return axios.post(`${API_URL}/maps`, mapData);
};

export const updateMap = (id, mapData) => {
  return axios.put(`${API_URL}/maps/${id}`, mapData);
};

export const deleteMap = (id) => {
  return axios.delete(`${API_URL}/maps/${id}`);
};

// Users
export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export const getUserById = (id) => {
  return axios.get(`${API_URL}/users/${id}`);
};

export const getUserPermissions = (id) => {
  return axios.get(`${API_URL}/users/${id}/permissions`);
};

export const updateUserPermissions = (id, permissions) => {
  return axios.put(`${API_URL}/users/${id}/permissions`, { permissions });
};

export const updateUserRole = (id, role) => {
  return axios.put(`${API_URL}/users/${id}/role`, { role });
};

export const deactivateUser = (id) => {
  return axios.put(`${API_URL}/users/${id}/deactivate`);
};

export const activateUser = (id) => {
  return axios.put(`${API_URL}/users/${id}/activate`);
};

// Estadísticas públicas
export const getStats = () => {
  return axios.get(`${API_URL}/stats`);
};

// Monetización
export const getMonetization = () => {
  return axios.get(`${API_URL}/monetization`);
};

export const updateMonetization = (data) => {
  return axios.put(`${API_URL}/monetization`, data);
};

// Perfil
export const updateProfile = (data) => {
  return axios.put(`${API_URL}/auth/profile`, data);
};

// Claves de admin
export const verifyAdminKey = (key) => {
  return axios.post(`${API_URL}/admin-keys/verify`, { key });
};

export const getAdminKeys = () => {
  return axios.get(`${API_URL}/admin-keys`);
};

export const getAccessLog = () => {
  return axios.get(`${API_URL}/admin-keys/log`);
};

export const assignAdminKey = (userId) => {
  return axios.post(`${API_URL}/admin-keys/assign`, { userId });
};

export const regenerateAdminKey = (userId) => {
  return axios.put(`${API_URL}/admin-keys/regenerate/${userId}`);
};

export const revokeAdminKey = (userId) => {
  return axios.delete(`${API_URL}/admin-keys/revoke/${userId}`);
};
