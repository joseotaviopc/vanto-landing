import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export function ParcelaItem({ details, isModalOpen, setIsModalOpen }: {
    details: {
        status: string;
        color: string;
        text: string;
        date: string;
        value: number;
    },
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    // const { status, color, text, date, value } = details;
    

    function handleOpenModal() {
        setIsModalOpen(true);
        console.log({details});
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    return (
        <>
            <div className="flex w-full justify-between p-2 gap-4 bg-[rgb(46_81_130)] rounded-md">
                <span className="flex items-center">
                    <FontAwesomeIcon icon={faFileLines} className='text-white text-2xl p-3 px-4 rounded-2xl bg-[rgb(92_120_156)] ' />
                </span>
                <div className="flex flex-col flex-auto justify-start gap-2">
                    <p className={`uppercase text-left font-medium rounded-xs w-fit text-gr p-0.5 ${details.color} ${details.text} text-[0.5rem]`}>{details.status}</p>
                    <p className='font-bold'>R$ {details.value}</p>
                    <p className='text-xs'>{details.date}</p>
                </div>
                <button className="p-4 flex items-center" type='button' onClick={handleOpenModal}>
                    <FontAwesomeIcon icon={faArrowRight} className='text-white text-2xl p-3 rounded-2xl border-2' />
                </button>
            </div>

            {/* Bottom Modal */}
            {isModalOpen && (
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
                    </div>
                </div>
            )}
        </>
    );
}