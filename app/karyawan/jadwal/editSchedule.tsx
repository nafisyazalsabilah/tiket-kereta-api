"use client"

import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import { toast, ToastContainer } from "react-toastify"
import { KeretaType, ScheduleType } from "../types"

type Props = {
    trains: KeretaType[]
    item: ScheduleType
    // menyimpan array semua data kereta
}

const EditSchedule = (myProp: Props) => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)

    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const [departured_time, setDepaturedTime] = useState<Date>(new Date())
    const [arrived_time, setArrivedTime] = useState<Date>(new Date())
    const [train_id, setTrainId] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setShow(true)
        setDeparturedLocation(myProp.item.departured_location)
        setArrivedLocation(myProp.item.arrived_location)
        setDepaturedTime(new Date (myProp.item.departured_time))
        setArrivedTime(new Date(myProp.item.arrived_time))
        setTrainId(myProp.item.id)
        setPrice(myProp.item.price)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/schedule/${myProp.item.id}`
            const requestData = {
                departured_location, 
                departured_time,
                arrived_location,
                arrived_time,
                price, 
                
            }
            const response: any = await axiosInstance
                .put(url, requestData, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    }
                })

            const message = response.data.message
            if (response.data.success === true) {
                setShow(false)
                toast(message, {
                    containerId: `toastEdit-${myProp.item.id}`,
                    type: `success`
                })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEdit-${myProp.item.id}`,
                    type: `warning`
                })
            }
        } catch (error) {
            console.log(error);
            toast(`Something Wrong`,
                {
                    containerId: `toastEdit-${myProp.item.id}`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myProp.item.id}`} />
            <button className="px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white"
                type="button"
                onClick={() => openModal()}>
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
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>
                   {/* modal body */}
          <div className="w-full p-3">
            <div className="my-2 border rounded-md p-2">
              <small className="text-sm font-semibold text-sky-600">
                Berangkat dari
              </small>
              <input
                type="text"
                id={`departured_location-${myProp.item.departured_location}`}
                value={departured_location}
                onChange={(e) => setDeparturedLocation(e.target.value)}
                required={true}
                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
              />
            </div>

            <div className="my-2 border rounded-md p-2">
              <small className="text-sm font-semibold text-sky-600">
                Waktu Keberangkatan
              </small>
              <DatePicker
                showTimeInput={true}
                id={`departured_time-${myProp.item.departured_time}`}
                className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                selected={new Date(departured_time)}
                dateFormat={`dd MMMM yyyy HH:mm`}
                onChange={(date) => setDepaturedTime(date || new Date())}
              />
            </div>

            <div className="my-2 border rounded-md p-2">
              <small className="text-sm font-semibold text-sky-500">
                Tiba di
              </small>
              <input
                type="text"
                id={`arrived_location-${myProp.item.arrived_location}`}
                value={arrived_location}
                onChange={(e) => setArrivedLocation(e.target.value)}
                className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                required={true}
              />
            </div>

            <div className="my-2 border rounded-md p-2">
                          <small className="text-sm font-semibold text-sky-500">
                            Waktu Kedatangan
                          </small> <br/>
                          <DatePicker 
                            showTimeInput = {true}
                            id={`arrived_time-${myProp.item.arrived_time}`}
                            className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                            selected={new Date(arrived_time)}
                            dateFormat={`dd MMMM yyyy HH:mm`}
                            onChange={(date) =>
                              setArrivedTime(date || new Date())
                            }
                          />
                        </div>
            
                        <div className="my-2 border rounded-md p-2">
                          <small className="text-sm font-semibold text-sky-500">
                            Harga
                          </small>
                          <input
                            type="number"
                            id={`price-${myProp.item.price}`}
                            value={price.toString()}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full p-1 outline-none hover:border-b hover:border-b-sky-500"
                            required={true}
                          />
                        </div>
          </div>

          {/* modal footer */}
          <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-1">
            <button
              type="button"
              onClick={() => closeModal()}
              className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white"
            >
              Close
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default EditSchedule;