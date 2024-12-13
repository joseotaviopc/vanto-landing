import api from "./axiosInstance"
import { Automovel, AutomovelModalidade, Loginresponse, PaginatedResponse, Titulo, Usuario } from "./types"

export class DatabaseService {
    static async getAllTitulos(page: number, limit: number): Promise<PaginatedResponse<Titulo>> {
        const response = await api.get<PaginatedResponse<Titulo>>(`/all-titulos?page=${page}&limit=${limit}`)
        return response.data
    }

    static async getTitulos(userId: number, page: number, limit: number): Promise<PaginatedResponse<Titulo>> {
        console.log('Service',userId)
        const response = await api.get<PaginatedResponse<Titulo>>(`/titulos/${userId}?page=${page}&limit=${limit}`)
        return response.data
    }

    static async getUsuarios(page: number, limit: number): Promise<PaginatedResponse<Usuario>> {
        const response = await api.get<PaginatedResponse<Usuario>>(`/usuarios?page=${page}&limit=${limit}`)
        return response.data
    }

    static async getUsuarioByCpf(cpf: string): Promise<Usuario> {
        const response = await api.get<Usuario>(`/usuario?cpf_cnpj=${cpf}`)
        return response.data
    }

    static async getAutomoveis(page: number, limit: number): Promise<PaginatedResponse<Automovel>> {
        const response = await api.get<PaginatedResponse<Automovel>>(`/automoveis?page=${page}&limit=${limit}`)
        return response.data
    }

    static async getAutomoveisModalidade(page: number, limit: number): Promise<PaginatedResponse<AutomovelModalidade>> {
        const response = await api.get<PaginatedResponse<AutomovelModalidade>>(`/automoveis-modalidade?page=${page}&limit=${limit}`)
        return response.data
    }
    
    static async login(cpfCnpj: string, date: string): Promise<Loginresponse> {
        const response = await api.post<Loginresponse>(`/login`, { cpf_cnpj: cpfCnpj, data_nascimento: date } )

        // Store the access token in local storage
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data
    }
}
