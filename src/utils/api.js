import axios from 'axios';

const axiosInst = axios.create({
  baseURL: 'http://localhost:3004',
});

export default axiosInst;
