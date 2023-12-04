import axios from 'axios';

const todoListClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

export default todoListClient;
