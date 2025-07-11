import * as yup from "yup";

export const createTicketSchema = yup.object({
  title: yup.string().required("Title is required"),
  startDate: yup.string().required("Event time is required"),
  availableTicket: yup.string().required("Available Ticket"),
  eventType: yup.string().required("Event Type is requiredd"),
  price: yup.string().required("Price is required"),
  location: yup.string().required("Location is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  endDate: yup.string(),
  eventImage: yup.mixed(),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
});

export const updateTicketSchema = yup.object({
  title: yup.string().required("Title is required"),
  price: yup.string().required("Price is required"),
  location: yup.string().required("Location is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  eventImage: yup.mixed(),
  availableTicket: yup.string().required("Available Ticket"),
  eventType: yup.string().required("Event Type is requiredd"),
});
