import { useCallback, useEffect, useState } from 'react';
import { DatabaseService } from '../../services/database.service';
import { Usuario as UsuarioType } from '../../services/types';
import { formatCPF } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../../components/Header';
import { useAuth } from '../../context/useAuth';

export function Usuario() {
    const [users, setUsers] = useState<UsuarioType[] | Partial<UsuarioType>[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth()
    const limit = 20;

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const response = await DatabaseService.getUsuarios(currentPage, limit);
            setUsers(response.data);
            setTotalPages(Math.ceil(response.pagination.total / limit));
        } catch (err) {
            setError('Erro ao carregar usuários');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        // fetchUsers();
        if (user) {
            setUsers([user])
            setLoading(false)
        }
    }, [currentPage, fetchUsers]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <FontAwesomeIcon icon={faSpinner} className="text-[rgb(46_81_130)] text-4xl animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <main className=" text-white w-screen flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-8 mt-36">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Usuário</h1>
                
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nome
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    CPF/CNPJ
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data de Nascimento
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.cpf_cnpj ? formatCPF(user.cpf_cnpj) : 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {user.data_nascimento ? new Date(user.data_nascimento).toLocaleDateString('pt-BR') : 'N/A'}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center mt-4 space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded ${
                                currentPage === 1
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-[rgb(46_81_130)] text-white hover:bg-[rgb(36_71_120)]'
                            }`}
                        >
                            Anterior
                        </button>
                        <span className="px-4 py-2 text-gray-700">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded ${
                                currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-[rgb(46_81_130)] text-white hover:bg-[rgb(36_71_120)]'
                            }`}
                        >
                            Próxima
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}