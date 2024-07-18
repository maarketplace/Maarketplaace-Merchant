import axios from "axios";

const { VITE_ENDPOINT } = import.meta.env;
const { VITE_TOKEN } = import.meta.env;


export const getMerchant = async () => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.get(`${VITE_ENDPOINT}/merchant`, {
        headers: {
            // "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`,
        },
    })
};

export const getOneMerchantAllProduct = async () => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.get(`${VITE_ENDPOINT}/merchant/product`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

export const getOneMerchantStoreProduct = async (data: any) => {
    return await axios.get(`${VITE_ENDPOINT}/merchants/${data?.queryKey[1]}/products`)
}

export const getMerchantOrders = async ()=>{
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.get(`${VITE_ENDPOINT}/orders/merchant`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getOneProduct = async (id: any) => {
    // console.log(data?.queryKey[1])
    return await axios.get(`${VITE_ENDPOINT}/product/${id}`)
}