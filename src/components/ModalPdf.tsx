import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';


interface Props {
    handleClosePdf: () => void;
}

export function ModalPdf({ handleClosePdf }: Props) {

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
                <Viewer  initialPage={1}  fileUrl="/pdf.pdf" />;
            </div>
        </div>
    );
}
