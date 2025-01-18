import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useCallback, useState } from 'react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

interface Props {
    handleClosePdf: () => void;
    pdfUrl: string
}

const resizeObserverOptions = {};

const maxWidth = 960;

export function ModalPdf({ handleClosePdf, pdfUrl }: Props) {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber,] = useState<number>(1);

    const changedUrl = pdfUrl.replace('https://s3.us-east-2.amazonaws.com/arriel-store-boletos', 'http://localhost:3333/pdf')

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>();

    const onResize = useCallback<ResizeObserverCallback>((entries) => {
        const [entry] = entries;

        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);

    useResizeObserver(containerRef, resizeObserverOptions, onResize);

    return (
        <div className='h-auto'>
            <div className="flex items-center mb-4 p-6">
                <button
                    onClick={handleClosePdf}
                    className="p-2 hover:bg-gray-100 rounded-full absolute left-4"
                >
                    <FontAwesomeIcon icon={faClose} className="text-black text-xl" />
                </button>
            </div>
            <div className="w-full " ref={setContainerRef} style={{ maxWidth: 'calc(100% - 2em)' }}>
                <Document file={changedUrl} onLoadSuccess={onDocumentLoadSuccess} options={options} className="flex flex-col items-center">
                    <Page pageNumber={pageNumber} className="drop-shadow-md" width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth} />
                </Document>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
                Page {pageNumber} of {numPages}
            </p>
        </div>
    );
}
