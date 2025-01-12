// create a context file to handle isLoggedIn state
import { createContext, useState, ReactNode, useEffect } from 'react';
import { DatabaseService } from '../services/database.service';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AutomovelModalidade, GetTitulosInput, GroupedTitulos, Titulo, Usuario } from '../services/types';
import { AxiosError } from 'axios';

interface AuthContextType {
    isLogged: boolean;
    user: Partial<Usuario> | null
    contratos: AutomovelModalidade[]
    login: (cpf: string, date: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    titulos: GroupedTitulos;
    pagination: {
        total: number;
        page: number;
        totalPages: number;
    };
    currentContract: number | null
    setCurrentContract: React.Dispatch<React.SetStateAction<number | null>>
    getTitulos: ({ page, limit }: GetTitulosInput) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<Partial<Usuario> | null>(null)
    const [contratos, setContratos] = useState<AutomovelModalidade[]>([])
    const [titulos, setTitulos] = useState<GroupedTitulos>({})
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        totalPages: 1,
    })
    const [currentContract, setCurrentContract] = useState<number | null>(null)

    const login = async (cpf: string, date: string) => {
        try {
            const { user } = await DatabaseService.login(cpf, date);
            setUser(user)
            setIsLogged(true);
            if (user && user.id) getAutomoveis(user.id)
            toast.success("Login efetuado com sucesso!")
        } catch (error) {
            setIsLogged(false);
            toast.error("Login falhou!")
            console.error('Error during login:', error);
        }
    };

    const logout = () => {
        setIsLogged(false);
        setUser(null)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user')
    };

    async function getTitulos({ page = 1, limit = 20 }: GetTitulosInput) {
        try {
            setIsLoading(true)
            if (user?.id) {
                const titulosFromDb = await DatabaseService.getTitulos(user.id, page, limit)
                const orderTitulos = titulosFromDb.data.sort((tituloA, tituloB) => {
                    const dateA = new Date(tituloA.vencimento);
                    const dateB = new Date(tituloB.vencimento);
                    return dateA.getTime() - dateB.getTime();
                })

                const groupedTitulos = orderTitulos.reduce((acc, titulo) => {
                    const contract = titulo.id_contrato;
                    if (!acc[contract]) {
                        acc[contract] = [];
                    }
                    acc[contract].push(titulo);
                    return acc;
                }, {} as { [key: number]: Titulo[] });

                setPagination({
                    page: titulosFromDb.pagination.page,
                    total: titulosFromDb.pagination.total,
                    totalPages: titulosFromDb.pagination.totalPages
                })
                setTitulos(groupedTitulos)
                setCurrentContract(Number(Object.keys(groupedTitulos)[0]))
            }
        } catch (error) {
            const err = error as AxiosError
            if (err.status === 403) {
                logout()
            }
            console.warn(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function getAutomoveis(userId: number) {
        const response = await DatabaseService.getAutomoveisModalidadeById(userId, 1, 100)
        setContratos(response.data)
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const userFromStorage = localStorage.getItem('user');
        if (token && userFromStorage && userFromStorage !== 'undefined') {
            setIsLogged(true);
            setUser(JSON.parse(userFromStorage) as Partial<Usuario>)
        }
    }, []);

    useEffect(() => {
        if (user && user.id) {
            getTitulos({ page: 1, limit: 500 })
            getAutomoveis(user.id)
        }
    }, [user])

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                contratos,
                login,
                logout,
                user,
                isLoading,
                pagination,
                titulos,
                currentContract,
                setCurrentContract,
                getTitulos
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider }