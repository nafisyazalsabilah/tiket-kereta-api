"use client"
import { AdminType} from "../types"
import DropAdmin from "./dropAdmin."
import EditAdmin from "./editAdmin"

type props = {
    item: AdminType
}
const Admin = (myProp: props) => {
    return (
        <div className="w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full md:w-4/12 p-2 flex flex-col">
                <small className="text-sm font-medium text-blue-400">
                    Nama Admin
                </small>
                <span>
                        {myProp.item.name}
                </span>
            </div>
            <div className="w-full md:w-4/12 p-2 flex flex-col">
                <small className="text-sm font-medium text-blue-400">
                    Username
                </small>
                <span>
                    {myProp.item.user_details.username}
                </span>
            </div>
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium text-blue-400">
                    Opsi
                </small>
                <div className="flex flex-wrap gap-3">
                <EditAdmin admin={myProp.item} />
                <DropAdmin admin={myProp.item} />
                </div>
            </div>
        </div>
    )
}

export default Admin