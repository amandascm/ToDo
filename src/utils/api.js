import axios from 'axios';

const { REACT_APP_API_BASE_URL: apiBaseUrl } = process.env;

const axiosInst = axios.create({
  baseURL: apiBaseUrl,
});

export default axiosInst;
