import { useCallback, useEffect, useState } from 'react';
import { DatabaseService } from '../../services/database.service';
import { Automovel as AutomovelType } from '../../services/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../../components/Header';

export function Automoveis() {
    const [automoveis, setAutomoveis] = useState<AutomovelType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const limit = 100;

    const fetchAutomoveis = useCallback(async () => {
        try {
            setLoading(true);
            const response = await DatabaseService.getAutomoveis(currentPage, limit);
            setAutomoveis(response.data);
            setTotalPages(Math.ceil(response.pagination.total / limit));
        } catch (err) {
            setError('Erro ao carregar automóveis');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        void fetchAutomoveis();
    }, [currentPage, fetchAutomoveis]);

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
        <main className="text-white w-screen flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-8 mt-36">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Automóveis</h1>
                
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Placa
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Placa Mercosul
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Marca
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Modelo
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {automoveis.map((automovel) => (
                                <tr key={automovel.id_automovel} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{automovel.placa || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{automovel.placa_mercosul || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{automovel.marca || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{automovel.modelo || '-'}</div>
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