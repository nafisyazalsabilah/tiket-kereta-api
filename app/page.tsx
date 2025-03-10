"use client"

import { axiosInstance } from "@/helper/api"
import { storeCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const LoginPage = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault() // Prevent the form from reloading the page

    try {
      const url = `/auth`
      const requestData = {
        username,
        password,
      }

      // Hit endpoint
      const responseData: any = await axiosInstance.post(url, requestData)

      // Checking if login was successful
      if (responseData.data.success === false) {
        const message = responseData.data.message
        // Show warning toast
        toast(message, {
          type: "warning",
          containerId: "toastLogin",
        })
      } else {
        const message = responseData.data.message
        const token = responseData.data.token
        const role = responseData.data.role

        // Store token in cookie
        storeCookie("token", token)

        // Show success toast
        toast(message, {
          type: "success",
          containerId: "toastLogin",
        })

        if(role === `ADMIN`){
          // diarahkan ke halaman kereta
          setTimeout(() => router.replace(`/karyawan/kereta`), 1000) //jika berhasil login akan lanjut, 1000 adalah jeda 1000 detik
        } else if (role === `CUSTOMER`) {
          // diarahkan ke halaman jadwal
          setTimeout(() => router.replace(`/pelanggan/jadwal`), 1000)
        }
      }
    } catch (error) {
      console.log(error)
      // Show error toast if something went wrong
      toast("Something wrong", {
        containerId: "toastLogin",
        type: "error",
      })
    }
  }

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      {/* ToastContainer to display toast notifications */}
      <ToastContainer containerId="toastLogin" />
      
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-5/6 md:w-1/2 border rounded-lg"
      >
        {/* Header login */}
        <div className="w-full bg-blue-500 text-white p-3">
          <h1 className="text-xl font-semibold">Login</h1>
        </div>

        {/* Login body */}
        <div className="w-full p-5">
          <div className="mb-3">
            <span className="text-sm text-blue-500">Username</span>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-3">
            <span className="text-sm text-blue-500">Password</span>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-green-300 hover:bg-green-500 text-white w-full rounded-md px-4 py-2"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
