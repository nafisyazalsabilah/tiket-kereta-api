export const dynamic = "force-dynamic";
import { getServerCookie } from "@/helper/server-cookie";
import { AdminType, KeretaType } from "../types";
import { axiosInstance } from "@/helper/api";
import AddAdmin from "./addAdmin";
import Admin from "./Admin";

// function to get all daata kereta
const getAdmin = async (): Promise<AdminType[]> => {
    try {
        // get token from cookie
        const TOKEN = await getServerCookie(`token`)
        const url = `/employee`
        // hit endpoint
        const response: any = await axiosInstance.get(url, { headers: { authorization: `Bearer ${TOKEN}` } })
        if (response.data.success == true) {
            return response.data.data
        }
        return []
    } catch (error) {
        console.log(error);
        return []
    }
}

const AdminPage = async () => {
    // memanggil function dari "data kereta" dari backend
    const dataAdmin = await getAdmin()
    return(
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">Data Admin</h1>
            <span className="text-sm text-blue-600">
                Halaman ini memuat daftar admin yang tersedia
            </span>

            <div className="my-3">
                <AddAdmin />
                {/* mapping data kereta */}
            {
                dataAdmin.map((admin, index) => (
                    <Admin
                    item={admin} key={`admin-${index}`}
                    />
                ))
            }
            </div>
        </div>
    )
}

export default AdminPage