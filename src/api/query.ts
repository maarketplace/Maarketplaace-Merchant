import axios from "axios";

const { VITE_ENDPOINT_STAGING } = import.meta.env;
const { VITE_TOKEN } = import.meta.env;

export interface BusinessName {
    name: string
}
export const getMerchant = async () => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.get(`${VITE_ENDPOINT_STAGING}/merchant`, {
        headers: {
            // "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`,
        },
    })
};

export const getOneMerchantAllProduct = async () => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.get(`${VITE_ENDPOINT_STAGING}/merchant/product`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOneMerchantStoreProduct = async (data: any) => {
    return await axios.get(`${VITE_ENDPOINT_STAGING}/merchants/${data?.queryKey[1]}/products`)
}

export const getMerchantOrders = async () => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.get(`${VITE_ENDPOINT_STAGING}/merchants/proccessed-orders`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getMerchantCustomer = async () => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.get(`${VITE_ENDPOINT_STAGING}/merchants/customers`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOneProduct = async (id: any) => {
    // console.log(data?.queryKey[1])
    return await axios.get(`${VITE_ENDPOINT_STAGING}/product/${id}`)
}

// export const getBusinessName = async (name: BusinessName) => {
//     return await axios.get(`${VITE_ENDPOINT_STAGING}/product`, name)
// }

export const getMerchantBalance = async () => {
    const token = localStorage.getItem(VITE_TOKEN)

    return await axios.get(`${VITE_ENDPOINT_STAGING}/merchant/account`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const fetchBanks = async () => {
    // const token = "sk_test_urWV7e6PYR4dbeV1VduF9hXBA2UGvqamwptTMmAX"
    return await axios.get("https://api.korapay.com/merchant/api/v1/misc/banks?countryCode=NG", {
        headers: {
            'Authorization': `Bearer pk_test_a4mBL7A3sbMHrGUq5m2kZynxfHifyTpWX17aChC3`,
        },
    });
};

export const getTransaction = async () => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.get(`${VITE_ENDPOINT_STAGING}/transactions`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}