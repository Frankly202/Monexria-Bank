import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Shared axios instance used by all pages. Centralizes the API base URL and
// attaches the auth token from localStorage to every request, so individual
// components no longer repeat the token lookup and Authorization header.
const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
