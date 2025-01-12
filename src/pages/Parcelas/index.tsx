import { useState } from "react";
import { Worker } from '@react-pdf-viewer/core';
import { Header } from "../../components/Header"
import { ParcelasList } from "../../components/ParcelasList";
import { ModalPdf } from "../../components/ModalPdf";
import { useAuth } from "../../context/useAuth";

export function Parcelas() {
    const [showPdf, setShowPdf] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('')
    const { isLoading, currentContract, setCurrentContract, titulos, pagination } = useAuth()

    function handleClosePdf() { setShowPdf(false) }
    function handleShowPdf() { setShowPdf(true) }

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <main className=" text-white w-screen flex flex-col">
                {showPdf ? <ModalPdf handleClosePdf={handleClosePdf} pdfUrl={pdfUrl} />
                    : (
                        <>
                            <Header currentContract={currentContract} setCurrentContract={setCurrentContract} />
                            <ParcelasList
                                currentContract={currentContract}
                                loading={isLoading}
                                handleShowPdf={handleShowPdf}
                                titulos={titulos}
                                pagination={pagination}
                                setPdfUrl={setPdfUrl}
                            />
                        </>
                    )}
            </main>
        </Worker>
    )
}