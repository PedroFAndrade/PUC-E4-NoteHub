import axios from 'axios'

 const api = axios.create({
    baseURL: 'https://api-principal-8mrs.onrender.com/v2/api/'
  });
  export default api;