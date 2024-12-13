import axios, { AxiosError } from 'axios';


const API_DEV = 'http://localhost:3333'
// const API_PROD = 'https://arriel-vanto-back.deno.dev'
const API = API_DEV

const api = axios.create({
    baseURL: API,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // or however you store the token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        // console.log('STATUS ', error?.response?.status)
        if (
            error?.response?.status === 401 ||
            error?.response?.status === 403) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        }
        // console.log('ERRO ', { error })
        throw error;
    }
);

export default api;