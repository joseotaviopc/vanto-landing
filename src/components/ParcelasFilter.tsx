import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faInbox, faFileArrowUp, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export function ParcelasFilter({
    statusParcela,
    setStatusParcela,
    statusCounts
}: {
    statusParcela: {
        all: boolean;
        abertas: boolean;
        atrasadas: boolean;
        pagas: boolean;
    },
    setStatusParcela: React.Dispatch<React.SetStateAction<{
        all: boolean;
        abertas: boolean;
        atrasadas: boolean;
        pagas: boolean;
    }>>,
    statusCounts: {
        all: number;
        abertas: number;
        atrasadas: number;
        pagas: number;
    }
}) {
    
    return (
       <div className="flex gap-4 px-6 mt-36 mb-6 overflow-x-auto whitespace-nowrap no-scrollbar text-xs">
        <div
            className={`${statusParcela.all ? 'bg-[rgb(25_53_86)]' : 'bg-[rgb(92_120_156)]'} rounded-lg min-w-[calc(0.25rem*22)] h-24 py-2 flex flex-col items-center justify-evenly`}
            onClick={() => setStatusParcela({
                all: !statusParcela.all,
                abertas: false,
                atrasadas: false,
                pagas: false,
            })}
        >
            <FontAwesomeIcon icon={faInbox} className='text-white text-lg' />
            <p>{statusCounts.all}</p>
            <p>Todas</p>
        </div>
        <div
            className={`${statusParcela.abertas ? 'bg-[rgb(25_53_86)]' : 'bg-[rgb(92_120_156)]'} rounded-lg min-w-[calc(0.25rem*22)] h-24 py-2 flex flex-col items-center justify-evenly`}
            onClick={() => setStatusParcela({
                abertas: !statusParcela.abertas,
                all: false,
                atrasadas: false,
                pagas: false,
            })}
        >
            <FontAwesomeIcon icon={faFileArrowUp} className="text-white text-lg" />
            <p>{statusCounts.abertas}</p>
            <p>Em aberto</p>
        </div>
        <div
            className={`${statusParcela.atrasadas ? 'bg-[rgb(25_53_86)]' : 'bg-[rgb(92_120_156)]'} rounded-lg min-w-[calc(0.25rem*22)] h-24 py-2 flex flex-col items-center justify-evenly`}
            onClick={() => setStatusParcela({
                atrasadas: !statusParcela.atrasadas,
                all: false,
                abertas: false,
                pagas: false,
             })}
        >
            <FontAwesomeIcon icon={faExclamationCircle} className='text-white text-lg' />
            <p>{statusCounts.atrasadas}</p>
            <p>Atrasadas</p>
        </div>
        <div
            className={`${statusParcela.pagas ? 'bg-[rgb(25_53_86)]' : 'bg-[rgb(92_120_156)]'} rounded-lg min-w-[calc(0.25rem*22)] h-24 py-2 flex flex-col items-center justify-evenly`}
            onClick={() => setStatusParcela({
                pagas: !statusParcela.pagas,
                all: false,
                abertas: false,
                atrasadas: false,
            })}
        >
            <FontAwesomeIcon icon={faCheck} className='text-white text-lg' />
            <p>{statusCounts.pagas}</p>
            <p>Pagas</p>
        </div>
       </div> 
    )
}