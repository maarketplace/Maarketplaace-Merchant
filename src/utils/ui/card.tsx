import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiCalendar, PiTicketBold } from "react-icons/pi";

export function TicketCard({
  category,
  eventName,
  startDate,
  location,
  totalLeft,
  price,
}: {
  category: string;
  eventName: string;
  startDate: string;
  location: string;
  totalLeft: number;
  price: number;
}) {
  return (
    <div className="rounded-md border border-gray-300 p-6 space-y-6">
      <div className="flex items-center justify-center w-full py-16 bg-[#262626] rounded-md">
        <PiTicketBold color="#FFCC00" size={42} />
      </div>
      <div>
        <p className="bg-yellow-400 w-fit px-2 rounded-2xl text-black text-base mb-2">
          {category}
        </p>
        <p className="font-bold text-yellow-400 text-[20px] mb-2">
          {eventName}
        </p>
        <p className="text-sm flex items-center gap-2 mb-2">
          <PiCalendar /> {startDate}
        </p>
        <p className="text-sm flex items-center gap-2">
          <HiOutlineLocationMarker /> {location}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-bold text-yellow-400 text-[24px]">{price}</span>
          <span className="text-xs"> {totalLeft} tickets left</span>
        </div>
        <button className="w-fit bg-black  text-white border border-yellow-400 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 hover:bg-yellow-400 hover:text-black">
          Edit
        </button>
      </div>
    </div>
  );
}
