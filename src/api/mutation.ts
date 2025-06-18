import axios from "axios";
import { IAddEbook, IUpdateEbook } from "../interface/UploadEbook";
import { IAddCourse } from "../interface/UploadCourse";
import { LoginInterface } from "../interface/LoginInterface";
import { SignUpInterface } from "../interface/SignUpInterface";

const { VITE_API_BASE_URL, VITE_TOKEN } = import.meta.env;

export const merchantSignup = async (data: SignUpInterface) => {
    console.log(data);
    return await axios.post(`${VITE_API_BASE_URL}/merchant`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
};

export const merchantLogin = async (data: LoginInterface) => {
    return await axios.post(`${VITE_API_BASE_URL}/merchant/login`, data)
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const merchantVerify = async (data: any) => {
    return await axios.put(`${VITE_API_BASE_URL}/merchant/verify`, data)
};
export const resendMerchantVerify = async (email: string | null) => {
    return await axios.post(`${VITE_API_BASE_URL}/email?email=${email}&type=merchant`);
};
export const logOutMerchant = async (id: string) => {
    // console.log(id)
    return await axios.post(`${VITE_API_BASE_URL}/merchant/logout/${id}`)
};
export const uploadEbook = async (data: IAddEbook) => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_API_BASE_URL}/products/ebook`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
        },
    })
}

export const uploadCourse = async (data: IAddCourse) => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_API_BASE_URL}/products/course`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
        },
    })
}
export const merchantLike = async (id: string) => {
    const token = localStorage.getItem(VITE_TOKEN)
    // console.log(id)
    return await axios.post(`${VITE_API_BASE_URL}/products/${id}/like/merchant`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
}
export const merchantAddProductToCart = async ({ id, data }: { id: string, data: number }) => {
    const merchantToken = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_API_BASE_URL}/carts/products/${id}/merchants`, data, {
        headers: {
            'Authorization': `Bearer ${merchantToken}`
        }
    })
}
export const merchantComment = async ({ id, comment }: { id: string | undefined, comment: string }) => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_API_BASE_URL}/comment/merchant/products/${id}`, { comment }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const merchantLikeAComment = async (id: string) => {
    console.log(id)
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_API_BASE_URL}/comment/${id}/like/merchant`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export const merchantForgotPassword = async (email: string) => {
    console.log(email)
    return await axios.post(`${VITE_API_BASE_URL}/merchant/fpw`, { email })
}

export const merchantResetPassword = async (data: { id: string | undefined, password: string }) => {
    const { id, password } = data
    return await axios.patch(`${VITE_API_BASE_URL}/merchant/ps-change/${id}`, { password })
}

export const merchantLoginAsUser = async () => {
    const Token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_API_BASE_URL}/merchant/user`, {}, {
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    })
}
export const createCategory = async (category: string) => {
    const Token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_API_BASE_URL}/category`, { category }, {
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    })
}
export const createSubCategory = async (sub: string) => {
    const Token = localStorage.getItem(VITE_TOKEN)
    return await axios.post(`${VITE_API_BASE_URL}/sub-category`, { sub }, {
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    })
}

export const updateMerchantImage = async (file: string | Blob) => {
    const formData = new FormData();
    formData.append('image', file);
    const Token = localStorage.getItem(VITE_TOKEN)

    return await axios.patch(`${VITE_API_BASE_URL}/merchant/profile/image`, formData, {
        headers: {
            'Authorization': `Bearer ${Token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const merchantDeleteProduct = async (id: string) => {
    const Token = localStorage.getItem(VITE_TOKEN)
    return await axios.delete(`${VITE_API_BASE_URL}/products/${id}`, {
        headers: {
            'Authorization': `Bearer ${Token}`,
        },
    })
}

export const verifyMerchantAccountNumber = async ({ account_number, bank_code }: { account_number: string, bank_code: string }) => {
    const Token = localStorage.getItem(VITE_TOKEN);
    return await axios.post(
        `${VITE_API_BASE_URL}/accounts/verify`,
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
    return await axios.post(`${VITE_API_BASE_URL}/accounts/request/accounts/${id}`, { amount }, {
        headers: {
            'Authorization': `Bearer ${Token}`,
        }
    })
};

export const verifyWithdrawFunds = async (id: string) => {
    return await axios.post(`${VITE_API_BASE_URL}/transactions/accounts/withdraws/${id}`)
}

export const uploadQuicks = async (id: string, data: { description: string; file: File; images?: File[] }) => {
    const Token = localStorage.getItem(VITE_TOKEN);
    return await axios.post(`${VITE_API_BASE_URL}/quicks/products/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${Token}`,
            'Content-Type': 'multipart/form-data', // Important for sending FormData
        },
    });
};

export const updateEbook = async (data: IUpdateEbook, id: string) => {
    const token = localStorage.getItem(VITE_TOKEN)
    return await axios.put(`${VITE_API_BASE_URL}/products/${id}/update`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
        },
    })
}