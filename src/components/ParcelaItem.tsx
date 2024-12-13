import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Titulo } from '../services/types';
import { compareDate, formatDate } from '../utils';

interface Props {
    titulo: Titulo,
    handleOpenModal: () => void,
}

export function ParcelaItem({ titulo, handleOpenModal }: Props) {
    // const { status, color, text, date, value } = details;
    const status = compareDate(titulo.vencimento) ? 'Vencido' : 'Aberto';
    const statusText = titulo.pagamento ? 'Pago' : status;

    const colors = {
        'Aberto': {
            color: 'bg-blue-200',
            text: 'text-[rgb(46_81_130)]',
        },
        'Vencido': {
            color: 'bg-red-500',
            text: 'text-white',
        },
        'Pago': {
            color: 'bg-red-100',
            text: 'text-gray-500',
        },
    };
    return (
        <>
            <div className="flex w-full justify-between p-2 gap-4 bg-[rgb(46_81_130)] rounded-md">
                <span className="flex items-center">
                    <FontAwesomeIcon icon={faFileLines} className='text-white text-2xl p-3 px-4 rounded-2xl bg-[rgb(92_120_156)] ' />
                </span>
                <div className="flex flex-col flex-auto justify-start gap-2">
                    <p className={`uppercase text-left font-medium rounded-xs w-fit ${colors[statusText].text} ${colors[statusText].color} p-0.5 text-[0.5rem]`}>{statusText}</p>
                    <p className='font-bold'>{titulo.valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    <p className='text-xs'>{formatDate(titulo.vencimento)}</p>
                </div>
                <button className="p-4 flex items-center" type='button' onClick={handleOpenModal}>
                    <FontAwesomeIcon icon={faArrowRight} className='text-white text-2xl p-3 rounded-2xl border-2' />
                </button>
            </div>
        </>
    );
}