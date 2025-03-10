"use client"
import { GerbongType } from "../../types"
import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

type props = {
    item: GerbongType
}

const EditSeat = (myProp: props) => {
    const [name, setName] = useState<string>("")
    const [seat_count, setSeatCount] = useState<number>(0)
    const [train_id, setTrainId] = useState<number>(0)
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()
    const openModal = () => {
        setShow(true)
        setName("")
        setSeatCount(0)
        setTrainId(myProp.item.train_id)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/train/wagon/${myProp.item.train_id}`
            const requestData = {
                name, seat_count, train_id
            }
            const response: any = await
                axiosInstance.put(
                    url, requestData, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    }
                }
                )

            const message = response.data.message
            if (response.data.success === true) {
                setShow(false)
                toast(message, {
                    containerId: `toastEditGerbong${myProp.item.id}`,
                    type: `success`
                })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEditGerbong`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error);
            toast(`Something wrong`,
                {
                    containerId: `toadtEditGerbong${myProp.item.id}`,
                    type: "error"
                }
            )
        }
    }
    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myProp.item.id}`}/>
            <button type="button"
            onClick={() => openModal()}
                className="px-2 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">Edit Data Kereta</h1>
                        <span className="text-sm text-slate-500">
                           Edit Gerbong Kereta
                        </span>
                    </div>
                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-500">
                                Nama Gerbong
                            </small>
                            <input type="text" id={`name${myProp.item.id}`}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-300 focus:border-b"
                            />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-500">
                                Jumlah kursi
                            </small>
                            <input type="number" id={`seat_count`}
                                value={seat_count.toString()}
                                onChange={
                                    e => setSeatCount(
                                        Number(e.target.value)
                                    )}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-300 focus:border-b"
                            />
                        </div>
                    </div>

                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button" onClick={() => closeModal()}
                            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
                            Close
                        </button>
                        <button type="submit"
                            className="px-4 py-2 rounded-md bg-sky-600 hover:bg-slate-500 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default EditSeat