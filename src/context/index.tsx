// create a context file to handle isLoggedIn state
import { createContext, useState, ReactNode, useEffect } from 'react';
import { DatabaseService } from '../services/database.service';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Usuario } from '../services/types';

interface AuthContextType {
    isLogged: boolean;
    user: Partial<Usuario> | null
    login: (cpf: string, date: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<Partial<Usuario> | null>(null)

    const login = async (cpf: string, date: string) => {
        try {
            const { user } = await DatabaseService.login(cpf, date);
            // console.log('Context',user)
            setUser(user)
            setIsLogged(true);
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
        localStorage.removeItem('accessToken'); // Optionally clear the token on logout
        localStorage.removeItem('user')
    };

    useEffect(() => {
        // Check for accessToken in local storage
        const token = localStorage.getItem('accessToken');
        const user = localStorage.getItem('user');
        // console.log(token)
        // console.log(isLogged)
        if (token && user) {
            setIsLogged(true);
            setUser(JSON.parse(user) as Partial<Usuario>)
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLogged, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider}