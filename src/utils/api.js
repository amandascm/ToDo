import axios from 'axios';

const axiosInst = axios.create({
  baseURL: 'https://localhost:3333',
});

export default axiosInst;
