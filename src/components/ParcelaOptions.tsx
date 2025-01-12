import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faEye, faEnvelope, faArrowUpFromBracket, faHashtag, faCopy } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { Titulo } from '../services/types';

type Props = {
    titulo: Titulo
    handleShowPdf?: () => void
}

export function ParcelaOptions({ handleShowPdf, titulo }: Props) {
    const [showCopyAlert, setShowCopyAlert] = React.useState(false);
    const [showCopyPix, setShowCopyPix] = React.useState(false);

    async function copyTextToClipboard(text: string) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyCodigo = (codigo: string) => {
        copyTextToClipboard(codigo)
            .then(() => {
                setShowCopyAlert(true);
                setTimeout(() => {
                    setShowCopyAlert(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleCopyPix = (pix: string) => {
        copyTextToClipboard(pix)
            .then(() => {
                setShowCopyPix(true);
                setTimeout(() => {
                    setShowCopyPix(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleEmail = () => {
        window.location.href = `mailto:?subject=Parcela ${titulo.parcela}`
    }

    const options = [
        {
            icon: faEye,
            text: 'Visualizar',
            onClick: handleShowPdf,
            disabled: titulo.link_boleto === "",
        },
        {
            icon: faHashtag,
            text: 'Código',
            onClick: () => handleCopyCodigo(titulo.codigo_boleto),
            disabled: titulo.codigo_boleto === ""
        },
        {
            icon: faQrcode,
            text: 'Pix',
            onClick: () => handleCopyPix(titulo.codigo_pix),
            disabled: titulo.codigo_pix === "" || titulo.codigo_pix === 'Código PIX não disponível'
        },
        {
            icon: faEnvelope,
            text: 'Compartilhar',
            onClick: () => { },
            disabled: false
        },
        {
            icon: faArrowUpFromBracket,
            text: 'Email',
            onClick: handleEmail,
            disabled: false
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
                        className={`bg-[rgb(90_132_190)] ${option.disabled ? 'opacity-50' : ''} cursor-pointer rounded-lg min-w-[calc(0.25rem*22)] h-24 py-2 flex flex-col items-center justify-evenly`}
                        onClick={option.onClick}
                        disabled={option.disabled}
                    >
                        <FontAwesomeIcon icon={option.icon} className='text-white text-3xl' />
                    </button>
                    <p className="text-black font-medium text-lg" >{option.text}</p>
                </div>
            ))}
        </div>
    )
}