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
    return await axiosInstance.get("https://api.korapay.com/merchant/api/v1/misc/banks?countryCode=NG", {
        headers: {
            Authorization: `Bearer pk_test_a4mBL7A3sbMHrGUq5m2kZynxfHifyTpWX17aChC3`,
        },
    });
};

export const getTransaction = async () => {
    return await axiosInstance.get("/transactions");
};
