import { Purchase , ScheduleType } from "@/app/karyawan/types";

interface History {
   id: number;
   purchase_date: string; 
   customer_id: number;
   schedule_id: number;
   app_user_token: string;
   createdAt: string; 
   updatedAt: string;
   purchases_details: Purchase[]
   schedule_details: ScheduleType
}

interface Props {
  item: History
}

const showTime = (date: string) => {
    const currentDate = new Date(date);
    return currentDate.toLocaleTimeString(`id-ID`, {
      year: `numeric`,
      month: `long`,
      day: `2-digit`,
    });
  };

const HistoryCard = (props: Props) => {
  return (
    <div className='bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-full transition-all hover:shadow-xl'>
      <div className='grid grid-cols-4 gap-6 mb-8'>
        <InfoSection
          title="Tanggal Order"
          content={showTime(props.item.purchase_date)}
        />
        <InfoSection
          title="Stasiun Awal"
          content={props.item.schedule_details.departured_location}
          subContent={showTime(props.item.schedule_details.departured_time)}
        />
        <InfoSection
          title="Stasiun Akhir"
          content={props.item.schedule_details.arrived_location}
          subContent={showTime(props.item.schedule_details.arrived_time)}
        />
        <InfoSection
          title="Nama Kereta"
          content={props.item.schedule_details.train_details?.name || "-"}
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-xl font-bold text-slate-600 mb-4">List Penumpang</h1>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sky-50">
              <tr>
                <th className="text-slate-600 text-sm font-bold py-3 px-4 text-left">Nama</th>
                <th className="text-slate-600 text-sm font-bold py-3 px-4 text-left">NIK</th>
                <th className="text-slate-600 text-sm font-bold py-3 px-4 text-left">Nomor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {props.item.purchases_details.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{item.passanger_name}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.passanger_id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.seat_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const InfoSection = ({ title, content, subContent }: { 
  title: string;
  content: string;
  subContent?: string;
}) => (
  <div className='space-y-2'>
    <div className='font-bold text-sky-600 text-lg'>{title}</div>
    <div className="font-semibold text-gray-800">{content}</div>
    {subContent && (
      <div className="font-medium text-gray-600">{subContent}</div>
    )}
  </div>
);

export default HistoryCard;