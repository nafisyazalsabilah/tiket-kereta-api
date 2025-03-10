import { axiosInstance } from '@/helper/api'
import React from 'react'
import HistoryCard from './_components/HistoryCard'
import { History } from '@/app/karyawan/types'
import FilterHistory from './FilterHistory'
import { getServerCookie } from '@/helper/server-cookie'

const GetDataHistory = async (departured_time: string, arrived_time: string): Promise<History[]> => {
    try {
        const token = await getServerCookie('token')
        const url = `/purchase/customer?start_date=${departured_time}&end_date=${arrived_time}`
        
        const response: any = await axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.data.success) return []

        return response.data.data
    } catch (error) {
        console.log(error)
        return []
    }
}

type props = {
    searchParams: {
        departured_time?: string
        arrived_time?: string
    }
}

const page = async (myProps:props) => {
    const departured_time = (await myProps.searchParams).departured_time?.toString() || ''
    const arrived_time = (await myProps.searchParams).arrived_time?.toString() || ''
    const historyData = await GetDataHistory(departured_time, arrived_time)

    return (
        <div className="w-full p-3 bg-white">
            <div className="bg-sky-800 w-full rounded-md shadow-md">
                <h1 className="text-white p-3 text-xl font-bold">
                    History Pemesanan
                </h1>
                <FilterHistory 
                departuredTime={departured_time} 
                arrivedTime={arrived_time} />
            </div>

            {departured_time !== "" && arrived_time !== "" && (
                <div className="my-3">
                    {historyData.length == 0 ? (
                        <div className="w-full p-3 rounded-md bg-orange-200">
                            Tidak ada history pemesanan pada periode ini
                        </div>
                    ) : (
                        <div className="flex gap-4 flex-col">
                            {historyData.map((item, index) => (
                                <HistoryCard key={`history-${index}`} item={item}/>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default page