import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

export const api = axios.create({
  baseURL:process.env.NODE_ENV === "development"
  ? "http://localhost:8080/"
  : "https://happread.herokuapp.com/",
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const { token } = sessionStorage.getItem('atk') || {};
 
  if(token) config.headers['Authorization'] = token;
  return config;
});

api.interceptors.response.use((response) => {
  const {token} = response.data
  if(token) sessionStorage.setItem('atk',token);
  return response;
});
