import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faEye, faEnvelope, faArrowUpFromBracket, faHashtag, faCopy } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

export function ParcelaOptions() {
    const [showCopyAlert, setShowCopyAlert] = React.useState(false);
    const [showCopyPix, setShowCopyPix] = React.useState(false);

    const options = [
        {
            icon: faEye,
            text: 'Visualizar',
            onClick: () => {}
        },
        {
            icon: faHashtag,
            text: 'Código',
            onClick: () => {
                navigator.clipboard.writeText('848700000017521203790035741577704020174614086698')
                    .then(() => {
                        setShowCopyAlert(true);
                        setTimeout(() => {
                            setShowCopyAlert(false);
                        }, 3000);
                    })
                    .catch((err) => {
                        console.error('Failed to copy text:', err);
                    });
            }
        },
        {
            icon: faQrcode,
            text: 'Pix',
            onClick: () => {
                navigator.clipboard.writeText('848700000017521203790035741577704020174614086698')
                    .then(() => {
                        setShowCopyPix(true);
                        setTimeout(() => {
                            setShowCopyPix(false);
                        }, 3000);
                    })
                    .catch((err) => {
                        console.error('Failed to copy text:', err);
                    });
            }
        },
        {
            icon: faEnvelope,
            text: 'Compartilhar',
            onClick: () => {}
        },
        {
            icon: faArrowUpFromBracket,
            text: 'Email',
            onClick: () => {}
        },
    ]

    return (
       <div className="flex gap-4 px-6 mb-2 overflow-x-auto whitespace-nowrap no-scrollbar text-xs">
        {showCopyAlert && (
            <div className="px-12 absolute w-full bottom-2 left-0">
                <div className='bg-[rgb(46_81_130/0.85)] text-white font-medium text-xl rounded-md h-20 p-2 flex items-center justify-center gap-2 w-full'>
                <FontAwesomeIcon icon={faCopy} className=' text-3xl' />Código do boleto copiado!
                </div>
            </div>
        )}
        {showCopyPix && (
            <div className="px-12 absolute w-full bottom-2 left-0">
                <div className='bg-[rgb(46_81_130/0.85)] text-white font-medium text-xl rounded-md h-20 p-2 flex items-center justify-center gap-2 w-full'>
                <FontAwesomeIcon icon={faQrcode} className=' text-3xl' />Código Pix copiado!
                </div>
            </div>
        )}
        {options.map((option, index) => (
            <div className='flex flex-col gap-2 items-center' key={index}>
                <div
                    className={`bg-[rgb(90_132_190)] rounded-lg min-w-[calc(0.25rem*22)] h-24 py-2 flex flex-col items-center justify-evenly`}
                    onClick={option.onClick}
                >
                    <FontAwesomeIcon icon={option.icon} className='text-white text-3xl' />
                </div>
                <p className="text-black font-medium text-lg" >{option.text}</p>
            </div>
        ))}
       </div> 
    )
}