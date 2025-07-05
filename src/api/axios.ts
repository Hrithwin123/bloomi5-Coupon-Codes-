import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // adjust as needed
});

export default api;
