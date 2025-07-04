import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { TbX } from "react-icons/tb";
import { inviteAgent } from "../../../../../../api/mutation";
import { useMutation, useQuery } from "react-query";
import { getTickets } from "../../../../../../api/query";
import { IEventCard } from "../../../../../../interface/EventCard";

interface InviteAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InviteAgentModal = ({ isOpen, onClose }: InviteAgentModalProps) => {
    const [formData, setFormData] = useState({
        eventId: "",
        email: "",
        name: ""
    });

    const { data: eventsData, isLoading: eventsLoading } = useQuery({
        queryKey: ["eventTickets"],
        queryFn: getTickets,
        onError: (error: { message: string }) => {
            toast.error(error?.message);
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const events = eventsData?.data?.data?.data?.events || [];

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const inviteMutation = useMutation(inviteAgent, {
        onSuccess: () => {
            toast.success("Agent invited successfully");
            onClose();
        },
        onError: () => {
            toast.error("Failed to invite agent");
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.eventId.trim() || !formData.email.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        inviteMutation.mutate(formData);
        setFormData({ eventId: "", email: "", name: "" });
    };

    const handleClose = () => {
        setFormData({ eventId: "", email: "", name: "" });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Invite Agent
                    </h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <TbX className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="eventId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select Event
                        </label>
                        <select
                            id="eventId"
                            name="eventId"
                            value={formData.eventId}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC300] focus:border-transparent dark:bg-gray-700 dark:text-white"
                            required
                            disabled={eventsLoading}
                        >
                            <option value="">
                                {eventsLoading ? "Loading events..." : "Select an event"}
                            </option>
                            {events.map((event: IEventCard) => (
                                <option key={event._id} value={event._id}>
                                    {event.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter agent's name"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC300] focus:border-transparent dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter agent's email"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC300] focus:border-transparent dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={inviteMutation.isLoading}
                            className="px-6 py-2 bg-[#FFC300] hover:bg-yellow-500 text-black font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {inviteMutation.isLoading ? "Sending..." : "Send Invitation"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InviteAgentModal;
