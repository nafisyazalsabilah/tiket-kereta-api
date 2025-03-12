"use client"

import Link from "next/link"
import { CustomerType } from "../types"
import EditCustomer from "./editPelanggan"
import DeleteCustomer from "./dropPelanggan"
import ForgotPasswordCustomer from "./forgotPassword"

interface props {
    item: CustomerType
}

const CustomerData = (
    { item }: props
) => {
    return(
        <div className="w-full flex flex-wrap my-2 shadow-md bg-slate-50 text-black rounded-lg">
            <div className="w-full flex flex-col  md:w-2/12 p-2">
                <small className="text-sm text-blue-700 font-medium">
                    NIK
                </small>
                <span >
                    <Link href={`/employee${item.id}`}>
                    {item.nik}
                    </Link>
                </span>
            </div>
            <div className="w-full flex flex-col  md:w-2/12 p-2">
                <small className="text-sm text-blue-700 font-medium">
                    Nama Pelanggan
                </small>
                <span >
                    <Link href={`/employee${item.id}`}>
                    {item.name}
                    </Link>
                </span>
            </div>
            <div className="w-full flex flex-col  md:w-2/12 p-2">
                <small className="text-sm text-blue-700 font-medium">
                    Username
                </small>
                <span >{item.user_details.username}</span>
            </div>
            <div className="w-full flex flex-col  md:w-2/12 p-2">
                <small className="text-sm text-blue-700 font-medium">
                    Alamat
                </small>
                <span >{item.address}</span>
            </div>
            <div className="w-full flex flex-col  md:w-2/12 p-2">
                <small className="text-sm text-blue-700 font-medium">
                    Nomor Telepon
                </small>
                <span >{item.phone}</span>
            </div>
            <div className="w-full flex flex-col  md:w-2/12 p-2">
                <small className="text-sm text-blue-700 font-medium">
                    Action
                </small>
                <div className="flex gap-2 items-center">
                    <EditCustomer customer={item}/>
                    <DeleteCustomer customerId={item.id}/>
                    <ForgotPasswordCustomer customer={item}/>
                </div>
            </div>
        </div>
    )
}

export default CustomerData