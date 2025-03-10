"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";

type props = {
    departuredTime: string;
    arrivedTime: string;
}

const FilterHistory = (myProps: props) => {
    const [departured_time, setDeparturedTime] = useState<string>("");
    const [arrived_time, setArrivedTime] = useState<string>("");
    const router = useRouter();

    const handleSearch = () => {
        if (departured_time && arrived_time) {
            router.push(
                `/pelanggan/history?departured_time=${departured_time}&arrived_time=${arrived_time}`
            );
        }
    };

    useEffect(() => {
        if (myProps.departuredTime) {
            setDeparturedTime(myProps.departuredTime);
        }
        if (myProps.arrivedTime) {
            setArrivedTime(myProps.arrivedTime);
        }
    }, [myProps]);

    return (
        <div className="py-5 w-full flex flex-wrap items-center bg-sky-800 rounded-md">
            <div className="w-full md:w-1/2 p-3">
                <strong className="font-semibold text-white">Tanggal Awal</strong>
                <br />
                <input
                    type="date" 
                    id={`departured_time`}
                    onChange={(e) => setDeparturedTime(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    value={departured_time}
                />
            </div>
            <div className="w-full md:w-1/2 p-3">
                <strong className="font-semibold text-white">Tanggal Akhir</strong>
                <br />
                <input
                    type="date"
                    id={`arrived_time`}
                    onChange={(e) => setArrivedTime(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    value={arrived_time}
                />
            </div>
            <button 
                className="bg-orange-600 hover:bg-orange-500 transition-all mx-3 duration-200 text-white px-4 py-2 rounded-md"
                onClick={handleSearch}
            >
                Cari History
            </button>
        </div>
    );
};

export default FilterHistory;