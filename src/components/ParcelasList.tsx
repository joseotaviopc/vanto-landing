import { useState } from "react";
import { ParcelaItem } from "./ParcelaItem";
import { ParcelasFilter } from "./ParcelasFilter";
import { Titulo } from "../services/types";
import { ParcelaModal } from "./ParcelaModal";
import { compareDate } from "../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

interface Props { 
    handleShowPdf: () => void
    titulos: Titulo[]
    loading: boolean
}

export function ParcelasList({ handleShowPdf, titulos, loading }: Props) {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusParcela, setStatusParcela] = useState({
        all: true,
        abertas: false,
        atrasadas: false,
        pagas: false
    });
    const [selectedTituloId, setSelectedTituloId] = useState<string | null>(null);

    const statusCounts = {
        all: titulos.length,
        abertas: titulos.filter(titulo => !titulo.pagamento && !compareDate(titulo.vencimento)).length,
        atrasadas: titulos.filter(titulo => !titulo.pagamento && compareDate(titulo.vencimento)).length,
        pagas: titulos.filter(titulo => titulo.pagamento).length
    };

    function handleOpenModal(tituloId: string) {
        setSelectedTituloId(tituloId);
    }

    function handleCloseModal() {
        setSelectedTituloId(null);
    }

    const filteredTitulos = titulos.filter(titulo => {
        if (statusParcela.all) return true;
        if (statusParcela.pagas && titulo.pagamento) return true;
        if (statusParcela.atrasadas && !titulo.pagamento && compareDate(titulo.vencimento)) return true;
        if (statusParcela.abertas && !titulo.pagamento && !compareDate(titulo.vencimento)) return true;
        return false;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FontAwesomeIcon icon={faSpinner} className="text-[rgb(46_81_130)] text-4xl animate-spin" />
            </div>
        );
    }

    return (
        <>
            <ParcelasFilter statusParcela={statusParcela} setStatusParcela={setStatusParcela} statusCounts={statusCounts} />
            <div className="p-6 h-[1000px] flex flex-col gap-2 z-0">
            {filteredTitulos?.map((titulo, index) => 
                <div key={index} className={index === filteredTitulos.length -1 ? 'pb-36' : ''}>
                    <ParcelaItem titulo={titulo} handleOpenModal={() => handleOpenModal(String(titulo.id_titulo))} />
                    {/* Bottom Modal */}
                    {selectedTituloId === String(titulo.id_titulo) && (
                        <ParcelaModal titulo={titulo} handleCloseModal={handleCloseModal} handleShowPdf={handleShowPdf} />
                    )}
                </div>
            )}
            </div>
        </>
    )
}