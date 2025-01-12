import { useState } from "react";
import { ParcelaItem } from "./ParcelaItem";
import { ParcelasFilter } from "./ParcelasFilter";
import { compareDate } from "../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { GroupedTitulos } from "@/services/types";
import { useAuth } from "@/context/useAuth";

interface Pagination {
    total: number;
    page: number;
    totalPages: number;
}
interface Props {
    handleShowPdf: () => void
    titulos: GroupedTitulos
    loading: boolean
    pagination: Pagination
    setPdfUrl: React.Dispatch<React.SetStateAction<string>>
    currentContract: number | null
}
interface PaginationProps {
    handleNextPage: (page: number) => void
    handlePreviousPage: (page: number) => void
    pagination: Pagination
}

function ParcelasPagination({ handleNextPage, handlePreviousPage, pagination }: PaginationProps) {
    return (
        <div className="w-full flex justify-center items-center gap-6 pb-4">
            <p className={`text-zinc-900 w-full ${pagination.page > 1 ? 'text-right' : 'text-center'}`}>Página {pagination.page} de {pagination.totalPages}</p>
            {pagination.page > 1 && (
                <Pagination className="mx-0 justify-start">
                    <PaginationContent>
                        {pagination.page > 1 && (
                            <PaginationItem className="text-zinc-900">
                                <PaginationPrevious size="sm" href="#" onClick={() => handlePreviousPage(pagination.page - 1)} />
                            </PaginationItem>
                        )}
                        <PaginationItem className="text-zinc-900">
                            <PaginationLink href="#" isActive={pagination.page !== 1} onClick={() => handlePreviousPage(1)}>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="text-zinc-900">
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem className="text-zinc-900">
                            <PaginationLink href="#" isActive={pagination.totalPages !== pagination.page} onClick={() => handleNextPage(pagination.totalPages)}>{pagination.totalPages}</PaginationLink>
                        </PaginationItem>
                        {pagination.page < pagination.totalPages && (
                            <PaginationItem className="text-zinc-900">
                                <PaginationNext href="#" onClick={() => handleNextPage(pagination.page + 1)} />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}

export function ParcelasList({
    handleShowPdf,
    titulos,
    loading,
    pagination,
    setPdfUrl,
    currentContract
}: Props) {
    const [statusParcela, setStatusParcela] = useState({
        all: true,
        abertas: false,
        atrasadas: false,
        pagas: false
    });
    const [, setSelectedTituloId] = useState<string | null>(null);
    const { getTitulos } = useAuth()

    const titulosByContract = currentContract ? titulos[currentContract] : [];
    const statusCounts = {
        all: titulosByContract.length,
        abertas: titulosByContract.filter(titulo => !titulo.pagamento && !compareDate(titulo.vencimento)).length,
        atrasadas: titulosByContract.filter(titulo => !titulo.pagamento && compareDate(titulo.vencimento)).length,
        pagas: titulosByContract.filter(titulo => titulo.pagamento).length
    };

    function handleOpenModal(tituloId: string) {
        setSelectedTituloId(tituloId);
    }

    function handleNextPage(page: number) {
        if (pagination.page === pagination.totalPages) return
        getTitulos({ page, limit: 30 })
    }

    function handlePreviousPage(page: number) {
        if (pagination.page === 1) return
        if (pagination.page > 1) {
            getTitulos({ page, limit: 30 })
        }
    }

    const filteredTitulos = titulosByContract.filter(titulo => {
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
                    <div key={index} className={index === filteredTitulos.length - 1 ? 'pb-12' : ''}>
                        <ParcelaItem titulo={titulo} handleOpenModal={() => handleOpenModal(String(titulo.id_titulo))} handleShowPdf={() => {
                            handleShowPdf()
                            setPdfUrl(titulo.link_boleto)
                        }} />
                    </div>
                )}
                <ParcelasPagination pagination={pagination} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
            </div>
        </>
    )
}