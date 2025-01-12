import { ParcelaOptions } from './ParcelaOptions';
import { Titulo } from '../services/types';
import { formatDate } from '../utils';
import { useAuth } from '../context/useAuth';

interface Props {
    titulo: Titulo;
    handleCloseModal?: () => void;
    handleShowPdf: () => void;
}
export function ParcelaModal({ titulo, handleShowPdf }: Props) {
    const { user } = useAuth()

    return (
        <div className="bg-white w-full rounded-t-2xl p-2 transform transition-transform duration-300 ease-out">
            <div className="space-y-4 bg-[rgb(200_222_249)] rounded-sm p-4">
                <div className='flex flex-col items-center gap-1 mb-8'>
                    <span className={` px-2 py-1 rounded-md`}>{titulo.pagamento}</span>
                    <span className="font-semibold text-black text-3xl">{titulo.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <span className="text-gray-600 text-sm">Beneficiário</span>
                    <span className="font-semibold text-black">Nacional G3 Consultoria e Assessoria Ltda</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-gray-600 text-sm">Pagador</span>
                    <span className="font-semibold uppercase text-black">{user?.name}</span>
                </div>

                <div className="flex justify-between text-center mt-8">
                    <div className='flex flex-col gap-1'>
                        <span className="text-gray-600 text-sm">Data de Vencimento</span>
                        <span className='font-semibold text-black'>{formatDate(titulo.vencimento)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-600 text-sm">Número da Parcela</span>
                        <span className="font-semibold text-black">{titulo.parcela}</span>
                    </div>
                </div>

            </div>

            <div className='flex flex-col items-center gap-2 p-8'>
                <span className='font-semibold text-black'>Código do boleto</span>
                <span className='text-gray-600 text-xl break-all text-center'>{titulo.codigo_boleto || 'Código do boleto não disponível'}</span>
            </div>
            <ParcelaOptions handleShowPdf={handleShowPdf} titulo={titulo} />
        </div>
    );
}