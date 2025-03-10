// file ini digunakan untuk inisiasi dan konfigurasi axios
// axios digunakan untuk komunikasi dgn backend
import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY
    }
})

