import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { ParcelaModal } from './ParcelaModal';

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
                <ParcelaModal details={details} handleCloseModal={handleCloseModal} />
            )}
        </>
    );
}