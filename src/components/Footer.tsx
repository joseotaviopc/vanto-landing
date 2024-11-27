import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faThumbsUp, faFileLines } from '@fortawesome/free-solid-svg-icons'

export function Footer() {
    const [selected, setSelected] = React.useState(0);
    return (
        <footer className="bg-white fixed w-full bottom-0 ">
            <div className='bg-[rgb(92_120_156)] px-6 pt-2 mt-2 pb-4 mb-0.5 flex justify-around items-center z-10 mx-4 rounded-full'>
                <span className={`border-t-4 pt-2 px-2 ${selected === 0 ? 'text-[rgb(25_53_86)]' : 'text-[rgb(92_120_156)]'}`}>
                    <span className="bg-white w-6 h-6 rounded-full items-center justify-center flex">
                    <FontAwesomeIcon icon={faDollarSign} className='text-[rgb(46_81_130)]' onClick={() => setSelected(0)}/>
                    </span>
                </span>
                <span className={`border-t-4 pt-2 px-2 ${selected === 1 ? 'text-[rgb(25_53_86)]' : 'text-[rgb(92_120_156)]'}`}>
                    <FontAwesomeIcon icon={faFileLines} className='text-white text-2xl' onClick={() => setSelected(1)}/>
                </span>
                <span className={`border-t-4 pt-2 px-2 ${selected === 2 ? 'text-[rgb(25_53_86)]' : 'text-[rgb(92_120_156)]'}`}>
                    <FontAwesomeIcon icon={faThumbsUp} className='text-white text-2xl' onClick={() => setSelected(2)}/>
                </span>
            </div>
        </footer>
    )
}