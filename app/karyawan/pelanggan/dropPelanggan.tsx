"use client";


import Modal from "@/components/Modal";
import { axiosInstance } from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  customerId: number;
};

const DeleteCustomer = ({ customerId }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const cookie = getCookie("token");
      const response: any = await axiosInstance.delete(
        `/customer/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      const message = response.data.message;

      if (!response.data.success) {
        toast.warning(message, {
          toastId: `toastDelete-${customerId}`,
          type: "warning",
        });
        return;
      }

      toast.success(message, {
        toastId: `toastDelete-${customerId}`,
        type: "success",
      });
      setShow(false);
      setTimeout(() => router.refresh(), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        toastId: `toastDelete-${customerId}`,
        type: "error",
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`toastDelete-${customerId}`} />
      <button
        type="button"
        className="px-2 py-1 rounded-md group bg-red-600 hover:bg-red-500 text-white"
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 bg-red-600 group-hover:bg-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
      <Modal isShow={show}>
        <div className="w-full p-3">
          <h1 className="font-semibold text-lg text-black">
            Hapus Data Customer
          </h1>
          <span className="text-sm text-slate-500">
            Apakah anda yakin ingin menghapus customer ini?
          </span>
          <div className="flex justify-end mt-4 gap-3">
            <button
              onClick={closeModal}
              className="px-2 py-1 rounded-md text-white bg-gray-400 hover:bg-gray-500"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white"
            >
              Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteCustomer;