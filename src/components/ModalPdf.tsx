import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Viewer } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';

interface Props {
    handleClosePdf: () => void;
    pdfUrl: string
}

export function ModalPdf({ handleClosePdf, pdfUrl }: Props) {
    return (
        <div className="fixed left-0 top-0 bg-white h-screen w-screen z-[9999] flex flex-col overflow-hidden">
            <div className="flex items-center mb-4 p-6">
                <button
                    onClick={handleClosePdf}
                    className="p-2 hover:bg-gray-100 rounded-full absolute left-4"
                >
                    <FontAwesomeIcon icon={faClose} className="text-black text-xl" />
                </button>
            </div>
            <div className='flex-auto overflow-auto'>
                {pdfUrl ? <Viewer initialPage={1} fileUrl={pdfUrl} /> : null};
            </div>
        </div>
    );
}
