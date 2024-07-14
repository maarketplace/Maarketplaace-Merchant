import axios from "axios";

const { VITE_ENDPOINT } = import.meta.env;
const { VITE_TOKEN } = import.meta.env;

// const token = localStorage.getItem(VITE_TOKEN)
export const merchantSignup = async (data: any) => {
    console.log(data);
    return await axios.post(`${VITE_ENDPOINT}/merchant`, data)
};

export const merchantLogin = async (data: any) => {
    return await axios.post(`${VITE_ENDPOINT}/merchant/login`, data)
};
export const merchantVerify = async (data: any) => {
    return await axios.put(`${VITE_ENDPOINT}/merchant/verify`, data)
};
export const logOutMerchant = async (id: string) => {
    // console.log(id)
    return await axios.post(`${VITE_ENDPOINT}/merchant/logout/${id}`)
};
export const uploadEbook = async (data: any) => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_ENDPOINT}/product/ebook`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
        },
    })
}
export const merchantLike = async (id: string) => {
    const token = localStorage.getItem(VITE_TOKEN)
    // console.log(id)
    return await axios.post(`${VITE_ENDPOINT}/product/${id}/like/merchant`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
}
export const merchantAddProductToCart = async ({ id, data }: { id: string, data: number }) => {
    const merchantToken = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_ENDPOINT}/carts/product/${id}/merchants`, data, {
        headers: {
            'Authorization': `Bearer ${merchantToken}`
        }
    })
}
export const merchantComment = async ({ id, comment }: { id: string | undefined, comment: string }) => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_ENDPOINT}/comment/merchant/products/${id}`, { comment }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const merchantLikeAComment = async (id: string) => {
    console.log(id)
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_ENDPOINT}/comment/${id}/like/merchant`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const merchantForgotPassword = async (email: string) => {
    console.log(email)
    return await axios.post(`${VITE_ENDPOINT}/merchant/fpw`, { email })
}

export const merchantResetPassword = async (data: { id: string | undefined, password: string }) => {
    const { id, password } = data
    return await axios.patch(`${VITE_ENDPOINT}/merchant/ps-change/${id}`, { password })
}

export const merchantLoginAsUser = async () => {
    const Token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_ENDPOINT}/merchant/user`, {}, {
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    })
}
export const createCategory = async () => {
    const Token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_ENDPOINT}/merchant/user`, {}, {
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    })
}