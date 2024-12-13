// create a context file to handle isLoggedIn state
import { createContext, useState, ReactNode, useEffect } from 'react';
import { DatabaseService } from '../services/database.service';

interface AuthContextType {
    isLogged: boolean;
    user: User | null
    login: (cpf: string, date: string) => Promise<void>;
    logout: () => void;
}

interface User {
    id: number;
    name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<User | null>(null)

    const login = async (cpf: string, date: string) => {
        try {
            const { user } = await DatabaseService.login(cpf, date);
            // console.log('Context',user)
            setUser(user)
            setIsLogged(true);
        } catch (error) {
            setIsLogged(false);
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
            setUser(JSON.parse(user) as User)
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLogged, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider}