import React from "react";
import { ParcelaItem } from "./ParcelaItem";
import { ParcelasFilter } from "./ParcelasFilter";

export function ParcelasList() {
    const [statusParcela, setStatusParcela] = React.useState({
        all: true,
        abertas: false,
        atrasadas: false,
        pagas: false
    });
    const parcelas = Array.from({ length: 20 });
    function randomStatus() {
        const ind = Math.floor(Math.random() * 3);
        return {
            status: ['Vencido', 'Aberto', 'Pago'][ind],
            color: ['bg-red-500', 'bg-blue-200', 'bg-blue-100'][ind],
            text: ['text-white', 'text-[rgb(46_81_130)]', 'text-gray-500'][ind]
        }
    }
    function randomValue() {
        return Math.floor(Math.random() * 10000)
    }
    function randomDate() {
        const start = new Date(2023, 0, 1);  // January 1, 2023
        const end = new Date(2025, 11, 31);  // December 31, 2024
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return randomDate.toLocaleDateString("pt-br", { dateStyle: "medium" });
    }

    const {status, color, text} = randomStatus()
    const details = {
        status, color, text, date: randomDate(), value: randomValue()
    }
    return (
        <>
            <ParcelasFilter statusParcela={statusParcela} setStatusParcela={setStatusParcela} />
            <div className="p-6 h-[1000px] flex flex-col gap-2 z-0">
            {parcelas.map((_, index) => 
                <div key={index} className={index === parcelas.length -1 ? 'pb-36' : ''}>
                    <ParcelaItem details={details} />
                </div>
            )}
            </div>
        </>
    )
}