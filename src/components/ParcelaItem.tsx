import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export function ParcelaItem() {
    return (
        <div className="flex w-full justify-between p-2 gap-4 bg-[rgb(46_81_130)] rounded-md">
            <span className="flex items-center">
                <FontAwesomeIcon icon={faFileLines} className='text-white text-2xl p-3 px-4 rounded-2xl bg-[rgb(92_120_156)] ' />
            </span>
            <div className="flex flex-col flex-auto justify-start gap-2">
                <p className='uppercase text-left w-fit bg-red-500 p-0.5 text-white text-[0.5rem]'>Vencido</p>
                <p className='font-bold'>R$ 290,00</p>
                <p className='text-xs'>{new Date().toLocaleDateString("pt-br", { dateStyle: "medium"} )}</p>
            </div>
            <span className="p-4 flex items-center">
                <FontAwesomeIcon icon={faArrowRight} className='text-white text-2xl p-3 rounded-2xl border-2' />
            </span>
        </div>
    )
}