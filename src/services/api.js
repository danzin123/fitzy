import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajuste a porta se necessário
});

// Este interceptor anexa o Token automaticamente em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Fitzy:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;