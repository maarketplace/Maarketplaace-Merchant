import { TbCurrencyNaira, TbPlus } from "react-icons/tb";
import BalanceCard from "../../overview/BalancedCard";
import { PiTicket } from "react-icons/pi";
import { HiTrendingUp } from "react-icons/hi";
import { Users } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import InputField from "../ebook/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTicketSchema } from "../../../../../../schema/CreateTicketSchema";
import FormField from "../ebook/FormField";
import ReactQuill from "react-quill";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import DropzoneField from "../ebook/Dropzone";
import { TicketCard } from "../../../../../../utils/ui/card";

export default function CreateTicket() {
  const cards = [
    {
      title: "Total Tickets",
      balance: "5",
      icon: <PiTicket className="w-6 h-6" />,
    },
    {
      title: "Revenue",
      balance: "31207",
      icon: <TbCurrencyNaira className="w-6 h-6" />,
    },
    {
      title: "Tickets Sold",
      balance: "143",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Avg. Price",
      balance: "194",
      icon: <HiTrendingUp className="w-6 h-6" />,
    },
  ];

  const formFieldData = [
    {
      label: "Title",
      placeholder: "Enter ticket title",
      type: "text",
    },
    {
      label: "Price (₦)",
      placeholder: "0.00",
      type: "text",
    },
    {
      label: "Category",
      placeholder: "Select category",
      type: "text",
    },
    {
      label: "Available Tickets",
      placeholder: "100",
      type: "text",
    },
    {
      label: "Location",
      placeholder: "Event location",
      type: "text",
    },
    {
      label: "Event Type",
      placeholder: "Select Eevent type",
      type: "select",
    },
  ];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      eventDate: "",
      category: "",
      availableTicket: "",
      location: "",
      description: "",
      eventType: "",
      endDate: "",
    },
    resolver: yupResolver(createTicketSchema),
  });

  const [eventImageName, setEventImageName] = useState("");

  const onDropEventImage = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const fileList = new DataTransfer();
        acceptedFiles.forEach((file) => fileList.items.add(file));
        setValue("eventImage", fileList.files);
        setEventImageName(acceptedFiles[0].name);
      }
    },
    [setValue]
  );

  const eventImageDropzone = useDropzone({
    onDrop: onDropEventImage,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  const [openForm, setOpenForm] = useState(false);

  return (
    <main className="min-h-[100vh] p-4 md:p-6 overflow-hidden mt-5 space-y-8">
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-[#FFCC00] md:text-[30px] text-[20px] font-bold">
            Ticket Dashboard
          </h2>
          <h3 className="text-[#DFD29F] md:text-base">
            Manage your tickets and track sales
          </h3>
        </div>
        <button
          onClick={() => setOpenForm((prev) => !prev)}
          className="w-fit bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <TbPlus className="w-4 h-4" />
          Add Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => {
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

      {/* form */}
      {openForm ? (
        <form onSubmit={() => handleSubmit}>
          <div className="grid grid-rows-4 grid-cols-2 gap-x-6 gap-y-2">
            {formFieldData.map(
              ({ label, placeholder, type }, index: number) => {
                return (
                  <Controller
                    key={index}
                    control={control}
                    name="title"
                    render={({ fieldState: { error } }) => {
                      return (
                        <InputField
                          label={label}
                          placeholder={placeholder}
                          type={type}
                          error={error?.message}
                        />
                      );
                    }}
                  />
                );
              }
            )}

            {/* date */}
            <div className="flex  gap-4">
              <Controller
                control={control}
                name="startDate"
                render={({ fieldState: { error } }) => {
                  return (
                    <InputField
                      label="Start Date"
                      placeholder="e.g., June 21, 2025"
                      type="date"
                      error={error?.message}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="endDate"
                render={({ fieldState: { error } }) => {
                  return (
                    <InputField
                      label="End Date"
                      placeholder="e.g., June 22, 2025"
                      type="date"
                      error={error?.message}
                    />
                  );
                }}
              />
            </div>

            <div className="flex  gap-4">
              <Controller
                control={control}
                name="startTime"
                render={({ fieldState: { error } }) => {
                  return (
                    <InputField
                      label="Start Time"
                      placeholder="Event start time"
                      type="time"
                      error={error?.message}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="endTime"
                render={({ fieldState: { error } }) => {
                  return (
                    <InputField
                      label="End Time"
                      placeholder="Event end time"
                      type="time"
                      error={error?.message}
                    />
                  );
                }}
              />
            </div>

            {/* event description */}
            <FormField
              label="Event Description"
              error={errors.description?.message}
            >
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <ReactQuill
                  theme="snow"
                  placeholder="Describe your event..."
                  onChange={(value) => setValue("description", value)}
                  style={{ minHeight: "120px" }}
                  className="dark:text-white text-black"
                />
              </div>
            </FormField>

            <div className="space-y-4">
              {/* event image */}
              <DropzoneField
                getRootProps={eventImageDropzone.getRootProps}
                getInputProps={eventImageDropzone.getInputProps}
                fileName={eventImageName}
                placeholder="Add Event Image"
              />

              <div className="flex items-center gap-4">
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                  Create Ticket
                </button>
                <button
                  onClick={() => setOpenForm((prev) => !prev)}
                  className="w-full bg-black  text-white border border-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : null}

      <div>
        <h2 className="text-[#FFCC00] md:text-[30px] text-[20px] font-bold mb-4">
          Your Ticket
        </h2>
        <div className="grid grid-cols-3 grid-rows-1 gap-6">
          <TicketCard
            category="music"
            eventName="Summer Music Festival 2024"
            startDate="Jul 15, 2024"
            location="Central Park, NYC"
            totalLeft={89}
            price={45}
          />

          <TicketCard
            category="music"
            eventName="Summer Music Festival 2024"
            startDate="Jul 15, 2024"
            location="Central Park, NYC"
            totalLeft={89}
            price={45}
          />

          <TicketCard
            category="music"
            eventName="Summer Music Festival 2024"
            startDate="Jul 15, 2024"
            location="Central Park, NYC"
            totalLeft={89}
            price={45}
          />
        </div>
      </div>
    </main>
  );
}
