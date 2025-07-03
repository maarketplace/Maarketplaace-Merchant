import { TbCurrencyNaira, TbPlus } from "react-icons/tb";
import { PiTicket } from "react-icons/pi";
import { HiTrendingUp } from "react-icons/hi";
import { Users, X } from "lucide-react";
import { useState } from "react";
import { BalanceCard, TicketCard } from "../../../../../../utils/ui/card";
import EventForm from "./eventForm";
import { useQuery } from "react-query";
import { getTickets } from "../../../../../../api/query";
import toast from "react-hot-toast";
import { IEventCard } from "../../../../../../interface/EventCard";
import { EmptyState } from "../../store";
import Loading from "../../../../../../loader";
import InviteAgentModal from "./InviteAgent";

export default function CreateTicket() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
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
  const handleInviteAgent = (inviteData: { name: string; email: string }) => {
    console.log("Inviting agent:", inviteData);
    toast.success(
      `Invitation sent to ${inviteData.name} (${inviteData.email})`
    );
  };
  return (
    <main className="min-h-[100%] p-4 md:p-6 scrollbar-hide overflow-hidden">
      <div className="px-4 py-3 max-[650px]:p-0 max-[650px]:mt-6 flex justify-between items-end max-[650px]:flex-col max-[650px]:items-start gap-2">
        <span className="text-gray-900 dark:text-white mb-0 pb-0 flex justify-center flex-col gap-2">
          <h1 className="text-3xl text-[#FFC300]">Ticket Dashboard</h1>
          <p className="text-lg  dark:text-yellow-100">
            Manage your tickets and track sales
          </p>
        </span>

        <div className="flex justify-end w-full md:w-fit gap-2">
          <button
            onClick={() => setShowInviteModal(true)}
            className="w-fit h-fit border border-[#FFC300] text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 dark:text-white"
          >
            <TbPlus className="w-4 h-4" />
            Invite Agent
          </button>
          <button
            onClick={() => setOpenForm((prev) => !prev)}
            className="w-fit h-fit bg-[#FFC300] hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {!openForm ? (
              <span className="flex items-center gap-2">
                <TbPlus size={18} />
                Add Ticket
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <X size={18} />
                Close form
              </span>
            )}
          </button>
        </div>
      </div>

      {!openForm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 p-4 max-[650px]:p-0 max-[650px]:mt-6">
          {cards?.map((card, index) => {
            return (
              <BalanceCard
                key={index}
                title={card.title}
                balance={card.balance}
                icon={card.icon}
                isLoading={isLoading}
              />
            );
          })}
        </div>
      ) : null}

      {openForm ? (
        <div className="px-4 py-3">
          <EventForm setOpenForm={setOpenForm} />
        </div>
      ) : null}

      {isLoading && <Loading width="150px" />}

      {!openForm && tickets?.length === 0 && (
        <EmptyState
          onClick={() => setOpenForm(true)}
          title="No event created yet"
          description="Start creating event here"
        />
      )}

      {!openForm ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 p-4 max-[650px]:p-0 max-[650px]:mt-6">
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
      ) : null}

      <InviteAgentModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSubmit={handleInviteAgent}
      />
    </main>
  );
}
