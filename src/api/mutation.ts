import axios from "axios";

const { VITE_ENDPOINT } = import.meta.env;
const { VITE_TOKEN } = import.meta.env;

// const token = localStorage.getItem(VITE_TOKEN)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const merchantSignup = async (data: any) => {
    console.log(data);
    return await axios.post(`${VITE_ENDPOINT}/merchant`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const merchantLogin = async (data: any) => {
    return await axios.post(`${VITE_ENDPOINT}/merchant/login`, data)
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const merchantVerify = async (data: any) => {
    return await axios.put(`${VITE_ENDPOINT}/merchant/verify`, data)
};
export const resendMerchantVerify = async (email: string | null) => {
    return await axios.post(`${VITE_ENDPOINT}/email?email=${email}&type=merchant`);
};
export const logOutMerchant = async (id: string) => {
    // console.log(id)
    return await axios.post(`${VITE_ENDPOINT}/merchant/logout/${id}`)
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadEbook = async (data: any) => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_ENDPOINT}/product/ebook`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
        },
    })
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadCourse = async (data: any) => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_ENDPOINT}/product/course`, data, {
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
export const createCategory = async (category: string) => {
    const Token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_ENDPOINT}/category`, { category }, {
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    })
}
export const createSubCategory = async (sub: string) => {
    const Token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_ENDPOINT}/sub-category`, { sub }, {
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    })
}

export const updateMerchantImage = async (file: string | Blob) => {
    const formData = new FormData();
    formData.append('image', file);
    const Token = localStorage.getItem(VITE_TOKEN)

    return await axios.patch(`${VITE_ENDPOINT}/merchant/profile/image`, formData, {
        headers: {
            'Authorization': `Bearer ${Token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteProduct = async (id: string) => {
    const Token = localStorage.getItem(VITE_TOKEN)
    return await axios.delete(`${VITE_ENDPOINT}/product/${id}`), {}, {
        headers: {
            'Authorization': `Bearer ${Token}`,
        },
    }
}

export const verifyMerchantAccountNumber = async ({ account_number, bank_code }: { account_number: string, bank_code: string }) => {
    const Token = localStorage.getItem(VITE_TOKEN);
    return await axios.post(
        `${VITE_ENDPOINT}/accounts/verify`,
        { account_number, bank_code },
        {
            headers: {
                'Authorization': `Bearer ${Token}`,
            }
        }
    );
}


export const withdrawFunds = async ({ amount, id }: { amount: number, id: string }) => {
    const Token = localStorage.getItem(VITE_TOKEN);
    return await axios.post(`${VITE_ENDPOINT}/accounts/request/accounts/${id}`, { amount }, {
        headers: {
            'Authorization': `Bearer ${Token}`,
        }
    })
}
export const verifyWithdrawFunds = async (id: string) => {
    return await axios.post(`${VITE_ENDPOINT}/transactions/accounts/withdraws/${id}`)
}

export const uploadQuicks = async (id: string, data: { description: string; file: File; images?: File[] }) => {
    const Token = localStorage.getItem(VITE_TOKEN);
    return await axios.post(`${VITE_ENDPOINT}/quicks/products/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${Token}`,
            'Content-Type': 'multipart/form-data', // Important for sending FormData
        },
    });
};
