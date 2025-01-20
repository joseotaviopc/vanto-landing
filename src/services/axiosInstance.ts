import axios, { AxiosError } from 'axios';

// const API_DEV = 'http://localhost:3333'
const API = `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`

const api = axios.create({
    baseURL: API,
});

export const refreshToken = async () => {
    const resp = await api.post('/refresh-token')
    return resp
}

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
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
            refreshToken()
            // .catch(() => {
            //     console.log('Erro ao atualizar token')
            //     // window.location.href = '/parcelas'
            // }).then((response) => {
            //     console.log('Token atualizado', response)
            //     window.location.href = '/parcelas'
            // })
        }
        // console.log('ERRO ', { error })
        throw error;
    }
);

export default api;