import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faEye, faEnvelope, faArrowUpFromBracket, faHashtag, faCopy } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

export function ParcelaOptions({handleShowPdf}: {handleShowPdf: () => void}) {
    const [showCopyAlert, ] = React.useState(false);
    const [showCopyPix, setShowCopyPix] = React.useState(false);

    // This is the function we wrote earlier
    async function copyTextToClipboard(text: string) {
        if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
        } else {
        return document.execCommand('copy', true, text);
        }
    }

    const text = '848700000017521203790035741577704020174614086698';

    // onClick handler function for the copy button
    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(text)
        .then(() => {
            // If successful, update the isCopied state value
            setShowCopyPix(true);
            setTimeout(() => {
            setShowCopyPix(false);
            }, 1500);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const options = [
        {
            icon: faEye,
            text: 'Visualizar',
            onClick: handleShowPdf
        },
        {
            icon: faHashtag,
            text: 'Código',
            onClick: handleCopyClick
        },
        {
            icon: faQrcode,
            text: 'Pix',
            onClick: handleCopyClick
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
                <button
                    className={`bg-[rgb(90_132_190)]  cursor-pointer rounded-lg min-w-[calc(0.25rem*22)] h-24 py-2 flex flex-col items-center justify-evenly`}
                    onClick={option.onClick}
                >
                    <FontAwesomeIcon icon={option.icon} className='text-white text-3xl' />
                </button>
                <p className="text-black font-medium text-lg" >{option.text}</p>
            </div>
        ))}
       </div> 
    )
}