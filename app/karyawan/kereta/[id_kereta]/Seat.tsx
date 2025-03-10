import { SeatType } from "../../types"
import DropKursi from "./dropSeat"
import EditSeat from "./editSeat"

type props = {
    item: SeatType
}

const Seat = (myProp: props) => {
    return (
        <div className="size-20 rounded-md flex flex-col items-center justify-center bg-sky-700">
            <span className="text-white font-semibold">
                {myProp.item.seat_number}
            </span>

            {/* tombol sejajar atau satu baris */}
            <div className="rounded-md gap-3 flex flex-wrap justify-center items-center">
                <div className="flex gap-3">
                    <EditSeat item={myProp.item} />
                    <DropKursi item={myProp.item} />
                </div>
            </div>
        </div>
    )
}

export default Seat