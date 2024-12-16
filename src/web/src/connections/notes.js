import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api-principal-8mrs.onrender.com/v2/api/'
  });
