import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
});

// Este interceptor anexa o Token automaticamente em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Fitzy:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Essa é a linha que o Vite estava sentindo falta:
export default api;