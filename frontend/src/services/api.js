import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

export const getEmployees = () => api.get('/employees');
export const createEmployee = (payload) => api.post('/employees', payload);
export const updateEmployee = (id, payload) => api.put(`/employees/${id}`, payload);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export default api;
