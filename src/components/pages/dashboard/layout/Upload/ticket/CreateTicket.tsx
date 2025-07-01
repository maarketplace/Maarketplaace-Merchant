import { TbCurrencyNaira, TbPlus } from "react-icons/tb";

import { PiTicket } from "react-icons/pi";
import { HiTrendingUp } from "react-icons/hi";
import { Users } from "lucide-react";
import { useState } from "react";
import { BalanceCard, TicketCard } from "../../../../../../utils/ui/card";
import EventForm from "./eventForm";
import { useQuery } from "react-query";
import { getTickets } from "../../../../../../api/query";
import toast from "react-hot-toast";
import { IEventCard } from "../../../../../../interface/EventCard";

export default function CreateTicket() {
  const [openForm, setOpenForm] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["eventTickets"],
    queryFn: getTickets,
    onError: (error: { message: string }) => {
      toast.error(error?.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const tickets = data?.data?.data?.data;

  const cards = [
    {
      title: "Total Tickets",
      balance: tickets?.stats?.totalEvents,
      icon: <PiTicket className="w-6 h-6" />,
    },
    {
      title: "Revenue",
      balance: tickets?.stats?.revenue,
      icon: <TbCurrencyNaira className="w-6 h-6" />,
    },
    {
      title: "Tickets Sold",
      balance: tickets?.stats?.ticketsSold,
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Avg. Price",
      balance: tickets?.stats?.averagePrice,
      icon: <HiTrendingUp className="w-6 h-6" />,
    },
  ];

  return (
    <main className="min-h-[100vh] p-4 md:p-6 overflow-hidden mt-5 space-y-8">
      <div className="flex justify-between">
        <div className="md:block hidden">
          <h1 className="text-[#FFC300] md:text-[30px] text-[20px] font-bold mb-2">
            Ticket Dashboard
          </h1>
          <h3 className="text-gray-600 dark:text-gray-400">
            Manage your tickets and track sales
          </h3>
        </div>
        <div className="flex justify-end w-full md:w-fit">
          <button
            onClick={() => setOpenForm((prev) => !prev)}
            className="w-fit h-fit bg-[#FFC300] hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <TbPlus className="w-4 h-4" />
            Add Ticket
          </button>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 ${
          openForm ? "hidden md:grid" : ""
        }`}
      >
        {cards?.map((card, index) => {
          return (
            <BalanceCard
              key={index}
              title={card.title}
              balance={card.balance}
              icon={card.icon}
              isLoading={false}
            />
          );
        })}
      </div>

      {openForm ? <EventForm setOpenForm={setOpenForm} /> : null}

      <div>
        <h2 className="text-[#FFC300] md:text-[30px] text-[20px] font-bold mb-4">
          Your Ticket
        </h2>
        <div className="grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-6 md:grid-cols-2 grid-cols-1 gap-4">
          {tickets?.events?.map((ticket: IEventCard) => {
            return (
              <TicketCard
                ticketID={ticket._id}
                imageUrl={ticket.bannerImage}
                category={ticket.category}
                eventName={ticket.name}
                startDate={ticket.startDate}
                location={ticket.location}
                totalLeft={Math.ceil(ticket.totalTickets - ticket.ticketsSold)}
                price={ticket.price}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
