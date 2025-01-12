import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faFileLines, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Titulo } from '../services/types';
import { compareDate, formatDate } from '../utils';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { ParcelaModal } from './ParcelaModal';

interface Props {
    titulo: Titulo,
    handleOpenModal: () => void,
    handleShowPdf: () => void
}

export function ParcelaItem({ titulo, handleOpenModal, handleShowPdf }: Props) {
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
        <Dialog>
            <div className="flex w-full justify-between p-2 gap-4 bg-[rgb(46_81_130)] rounded-md">
                <span className="flex items-center">
                    <FontAwesomeIcon icon={faFileLines} className='text-white text-2xl p-3 px-4 rounded-2xl bg-[rgb(92_120_156)] ' />
                </span>
                <div className="flex flex-col flex-auto justify-start gap-2">
                    <p className={`uppercase text-left font-medium rounded-xs w-fit ${colors[statusText].text} ${colors[statusText].color} p-0.5 text-[0.5rem]`}>{statusText}</p>
                    <p className='font-bold'>{titulo.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                    <p className='text-xs'>{formatDate(titulo.vencimento)}</p>
                </div>
                <DialogTrigger asChild>
                    {/* <Button variant="outline">Share</Button> */}
                    <button className="p-4 flex items-center" type='button' onClick={handleOpenModal}>
                        <FontAwesomeIcon icon={faArrowRight} className='text-white text-2xl p-3 rounded-2xl border-2' />
                    </button>
                </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-2xl flex flex-col items-center p-2">
                <DialogHeader className='w-full px-4'>
                    <div className='flex items-center justify-between w-full mb-4 p-6'>
                        <DialogClose asChild className='absolute left-4'>
                            <Button type="button" variant="secondary">
                                <FontAwesomeIcon icon={faArrowLeft} className="text-black text-xl" />
                            </Button>
                        </DialogClose>
                        <DialogTitle className='flex-1 text-center'>Detalhes da parcela</DialogTitle>
                    </div>
                </DialogHeader>
                <ParcelaModal titulo={titulo} handleShowPdf={handleShowPdf} />
            </DialogContent>
        </Dialog>
    );
}