import axios from "axios";
import axiosInstance from "./axiosInstance";
export interface BusinessName {
  name: string;
}

export const getMerchant = async () => {
  return await axiosInstance.get("/merchant");
};

export const getOneMerchantAllProduct = async () => {
  return await axiosInstance.get("/merchant/product");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOneMerchantStoreProduct = async (data: any) => {
  return await axiosInstance.get(`/merchants/${data?.queryKey[1]}/product`);
};

export const getMerchantOrders = async () => {
  return await axiosInstance.get("/merchants/proccessed-orders");
};

export const getMerchantCustomer = async () => {
  return await axiosInstance.get("/merchants/customers");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOneProduct = async (id: any) => {
  return await axiosInstance.get(`/products/${id}`);
};

export const getMerchantBalance = async () => {
  return await axiosInstance.get("/merchant/account");
};

export const fetchBanks = async () => {
  return await axios.get(
    "https://api.korapay.com/merchant/api/v1/misc/banks?countryCode=NG",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_KORA_API_KEY}`,
      },
    }
  );
};

export const getTransaction = async () => {
  return await axiosInstance.get("/transactions");
};

export const getTickets = async () => {
  return await axiosInstance.get("/events/merchant");
};
export const getTicketsById = async (id: string) => {
  return await axiosInstance.get(`/events/${id}`);
};

export const getProductAnalytics = async (productType: string) => {
    return await axiosInstance.get(`/products/analysis?productType=${productType}`);
};
