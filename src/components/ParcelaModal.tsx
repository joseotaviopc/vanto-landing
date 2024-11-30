import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ParcelaOptions } from './ParcelaOptions';

interface Props {
    details: {
        status: string;
        color: string;
        text: string;
        date: string;
        value: number;
    };
    handleCloseModal: () => void;
}
export function ParcelaModal({ details, handleCloseModal }: Props) {
    return (
        <div className="fixed inset-0 bg-[rgb(0_0_0/0.1)] z-50 flex items-end justify-center">
                    <div className="bg-white w-full max-w-lg rounded-t-2xl p-2 transform transition-transform duration-300 ease-out">
                        <div className="flex items-center mb-4 p-6">
                            <button 
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-gray-100 rounded-full absolute left-4"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="text-black text-xl" />
                            </button>
                            <h3 className="text-lg flex-auto text-center text-black font-semibold">Detalhes da Parcela</h3>
                        </div>

                        <div className="space-y-4 bg-[rgb(200_222_249)] rounded-sm p-4">
                            <div className='flex flex-col items-center gap-1 mb-8'>
                                <span className={`${details.color} ${details.text} px-2 py-1 rounded-md`}>{details.status}</span>
                                <span className="font-semibold text-black text-3xl">R$ {details.value}</span>
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <span className="text-gray-600 text-sm">Beneficiário</span>
                                <span className="font-semibold text-black">Nacional G3 Consultoria e Assessoria Ltda</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-gray-600 text-sm">Pagador</span>
                                <span className="font-semibold uppercase text-black">Dayane Ribeiro dos Santos</span>
                            </div>
                            
                            <div className="flex justify-between text-center mt-8">
                                <div className='flex flex-col gap-1'>
                                    <span className="text-gray-600 text-sm">Data de Vencimento</span>
                                    <span className='font-semibold text-black'>{details.date}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-600 text-sm">Número da Parcela</span>
                                    <span className="font-semibold text-black">17/36</span>
                                </div>
                            </div>
                            
                        </div>

                        <div className='flex flex-col items-center gap-2 p-8'>
                            <span className='font-semibold text-black'>Código do boleto</span>
                            <span className='text-gray-600 text-xl break-all text-center'>848700000017521203790035741577704020174614086698</span>
                        </div>

                        <ParcelaOptions />
                    </div>
                </div>
    );
}