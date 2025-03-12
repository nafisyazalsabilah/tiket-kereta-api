"use client";


import Modal from "@/components/Modal";
import { axiosInstance } from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddCustomer = () => {
  const [nik, setNik] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setNik("");
    setName("");
    setAddress("");
    setPhone("");
    setUsername("");
    setPassword("");
    setShow(true);
  };

  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const cookie = getCookie("token");
      const request = {
        nik,
        name,
        address,
        phone,
        username,
        password,
      };

      const response: any = await axiosInstance.post(
        "/customer/register",
        request,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      const message = response.data.message;

      if (response.data.success != true) {
        toast(message, {
          type: "warning",
          containerId: "toastAdd",
        });
      }

      toast(message, {
        type: "success",
        containerId: "toastAdd",
      });
      setShow(false);
      setTimeout(() => router.refresh(), 1000);
    } catch (error) {
      console.log(error);
      toast("Gagal menambahkan data pelanggan", {
        containerId: "toastAdd",
        type: "error",
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={"toastAdd"} />
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-500 text-white"
        onClick={() => openModal()}
      >
        Tambah Pelanggan
      </button>
      <Modal isShow={show}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-md">
            <h1 className="font-semibold text-lg text-black">
              Tambah Pelanggan
            </h1>
            <span className="text-sm text-slate-500">
              Pastikan data terisi dengan benar!
            </span>
          </div>

          <div className="w-full grid grid-cols-2 gap-3 p-3">
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Username
              </small>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Password
              </small>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">NIK</small>
              <input
                type="number"
                id="nik"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Nama Pelanggan
              </small>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                Alamat
              </small>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
            <div className="my-2 border rounded-md p-3">
              <small className="text-sm font-semibold text-sky-600">
                No. Telepon
              </small>
              <input
                type="number"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black"
              />
            </div>
          </div>
          <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => closeModal()}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddCustomer;