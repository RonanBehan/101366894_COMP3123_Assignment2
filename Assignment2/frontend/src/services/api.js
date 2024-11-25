import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const signup = (data) => axios.post(`${API_URL}/user/signup`, data);
export const login = (data) => axios.post(`${API_URL}/user/login`, data);
export const getEmployees = () => axios.get(`${API_URL}/emp/employees`);
export const addEmployee = (data) => axios.post(`${API_URL}/emp/employees`, data);
export const updateEmployee = (id, data) => axios.put(`${API_URL}/emp/employees/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/emp/employees`, { params: { id } });
export const getEmployeeById = (id) => axios.get(`${API_URL}/emp/employees/${id}`);