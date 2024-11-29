import React from "react";
import { ParcelaItem } from "./ParcelaItem";
import { ParcelasFilter } from "./ParcelasFilter";
import { parcelas } from "./parcelas";

export function ParcelasList({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [statusParcela, setStatusParcela] = React.useState({
        all: true,
        abertas: false,
        atrasadas: false,
        pagas: false
    });

    return (
        <>
            <ParcelasFilter statusParcela={statusParcela} setStatusParcela={setStatusParcela} />
            <div className="p-6 h-[1000px] flex flex-col gap-2 z-0">
            {parcelas.map((parcela, index) => 
                <div key={index} className={index === parcelas.length -1 ? 'pb-36' : ''}>
                    <ParcelaItem details={parcela} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                </div>
            )}
            </div>
        </>
    )
}