import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createTicketSchema } from "../../../../../../schema/CreateTicketSchema";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import InputField from "../ebook/InputField";
import FormField from "../ebook/FormField";
import ReactQuill from "react-quill";
import DropzoneField from "../ebook/Dropzone";
import yup from "yup";
import { useMutation, useQuery } from "react-query";
import { createTicket } from "../../../../../../api/mutation";
import toast from "react-hot-toast";
import { getTicketsById } from "../../../../../../api/query";
import { useParams } from "react-router-dom";

type FormValues = yup.InferType<typeof createTicketSchema>;

const formFieldData: {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  type: string;
}[] = [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter ticket title",
    type: "text",
  },
  {
    name: "price",
    label: "Price (₦)",
    placeholder: "0.00",
    type: "number",
  },
  {
    name: "availableTicket",
    label: "Available Tickets",
    placeholder: "100",
    type: "number",
  },
  {
    name: "location",
    label: "Location",
    placeholder: "Event location",
    type: "text",
  },
];

const eventCategories = [
  "Workshops & Masterclasses",
  "Webinars & Online Trainings",
  "Conferences & Summits",
  "Meetups & Networking",
  "Concerts & Live Performances",
  "Bootcamps & Intensives",
  "Faith & Spiritual Events",
  "Business & Product Launches",
  "Health, Fitness & Wellness",
  "Retreats & Getaways",
];

export default function EditEvent() {
  const [eventImageName, setEventImageName] = useState("");
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["eventTickets"],
    queryFn: () => getTicketsById(String(id)),
    onError: (error: { message: string }) => {
      toast.error(error?.message);
    },
  });

  const ticket = data?.data?.data?.data;
  console.log(ticket);

  const {
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      price: "",
      category: "",
      availableTicket: "",
      location: "",
      description: "",
      eventType: "",
      eventImage: undefined,
    },
    resolver: yupResolver(createTicketSchema),
  });

  useEffect(() => {
    if (ticket) {
      reset({
        title: ticket.name || "",
        price: ticket.price?.toString() || "",
        category: ticket.category || "",
        availableTicket: ticket.totalTickets?.toString() || "",
        location: ticket.location || "",
        description: ticket.description || "",
        eventType: ticket.eventType || "",
        eventImage: undefined,
      });

      if (ticket.image) {
        const filename = ticket.image.split("/").pop();
        setEventImageName(filename || "existing_image.jpg");
      }
    }
  }, [ticket, reset]);

  const onDropEventImage = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const fileList = new DataTransfer();
        acceptedFiles.forEach((file) => fileList.items.add(file));
        setValue("eventImage", fileList.files, { shouldValidate: true });
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

  const categoryOptions = useMemo(
    () =>
      eventCategories.map((categoryKey) => (
        <option key={categoryKey} value={categoryKey}>
          {categoryKey}
        </option>
      )),
    []
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: createTicket,
    onSuccess: (data) => {
      toast.success(data?.data);
      reset();
    },
    onError: () => {
      toast.error("Failed to create ticket");
    },
  });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();

    const startDateTime = new Date(
      `${data.startDate}T${data.startTime}`
    ).toISOString();
    const endDateTime =
      data.endDate && data.endTime
        ? new Date(`${data.endDate}T${data.endTime}`).toISOString()
        : "";

    formData.append("name", data.title);
    formData.append("description", data.description);
    formData.append("startDate", startDateTime);
    if (endDateTime) formData.append("endDate", endDateTime);
    formData.append("location", data.location);
    formData.append("eventType", data.eventType || "public");
    formData.append("category", data.category);
    formData.append("totalTickets", String(parseInt(data.availableTicket)));
    formData.append("price", String(parseFloat(data.price)));

    if (data.eventImage instanceof FileList && data.eventImage.length > 0) {
      formData.append("image", data.eventImage[0]);
    }

    mutate(formData);
  };

  return (
    <main className="py-12">
      {" "}
      <form
        className="grid  md:grid-cols-2 md:gap-x-6 md:gap-y-2 grid-cols-1 p-4 md:p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formFieldData.map(({ name, label, placeholder, type }) => (
          <InputField
            key={name}
            label={label}
            placeholder={placeholder}
            type={type}
            register={register(name)}
            error={errors[name]?.message}
          />
        ))}

        <FormField label="Event Category" error={errors.category?.message}>
          <select
            className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md bg-transparent hover:border-gray-400 focus:border-blue-500 focus:ring-1 transition-colors duration-200"
            {...register("category")}
          >
            <option value="">Select event category</option>
            {categoryOptions}
          </select>
        </FormField>

        <FormField label="Event Type" error={errors.eventType?.message}>
          <select
            className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md bg-transparent hover:border-gray-400 focus:border-blue-500 focus:ring-1 transition-colors duration-200"
            {...register("eventType")}
          >
            <option value="">Select event type</option>
            <option>private</option>
            <option>public</option>
          </select>
        </FormField>

        <FormField
          label="Event Description"
          error={errors.description?.message}
        >
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <ReactQuill
              theme="snow"
              placeholder="Describe your event..."
              onChange={(value) =>
                setValue("description", value, { shouldValidate: true })
              }
              style={{ minHeight: "120px" }}
              className="dark:text-white text-black"
              defaultValue={ticket?.description || ""}
            />
          </div>
        </FormField>

        <div className="space-y-4">
          <DropzoneField
            getRootProps={eventImageDropzone.getRootProps}
            getInputProps={eventImageDropzone.getInputProps}
            fileName={eventImageName}
            placeholder="Add Event Image"
          />

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? "Creating..." : "Create Ticket"}
            </button>
            <button
              type="button"
              className="w-full bg-black text-white border border-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
