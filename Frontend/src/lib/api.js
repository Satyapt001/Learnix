import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api',
  withCredentials: false
});

// Attach access token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 to refresh (stub for now)
let isRefreshing = false;
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config || {};
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) return Promise.reject(error);
      original._retry = true;
      isRefreshing = true;
      try {
        const rt = localStorage.getItem('refreshToken');
        if (!rt) throw new Error('No refresh token');
        const r = await axios.post(
          `${import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'}/auth/refresh`,
          { refreshToken: rt }
        );
        const newAccess = r.data?.accessToken;
        if (newAccess) {
          localStorage.setItem('accessToken', newAccess);
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${newAccess}`;
          return api(original);
        }
      } catch (e) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;