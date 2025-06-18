/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAddEbook, IUpdateEbook } from "../interface/UploadEbook";
import { IAddCourse } from "../interface/UploadCourse";
import { LoginInterface } from "../interface/LoginInterface";
import { SignUpInterface } from "../interface/SignUpInterface";
import axiosInstance from "./axiosInstance";

export const merchantSignup = async (data: SignUpInterface) => {
    return await axiosInstance.post("/merchant", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const merchantLogin = async (data: LoginInterface) => {
    return await axiosInstance.post("/merchant/login", data);
};

export const merchantVerify = async (data: any) => {
    return await axiosInstance.put("/merchant/verify", data);
};

export const resendMerchantVerify = async (email: string | null) => {
    return await axiosInstance.post(`/email?email=${email}&type=merchant`);
};

export const logOutMerchant = async (id: string) => {
    return await axiosInstance.post(`/merchant/logout/${id}`);
};

export const uploadEbook = async (data: IAddEbook) => {
    return await axiosInstance.post("/products/ebook", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const uploadCourse = async (data: IAddCourse) => {
    return await axiosInstance.post("/products/course", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const merchantLike = async (id: string) => {
    return await axiosInstance.post(`/products/${id}/like/merchant`);
};

export const merchantAddProductToCart = async ({ id, data }: { id: string; data: number }) => {
    return await axiosInstance.post(`/carts/products/${id}/merchants`, data);
};

export const merchantComment = async ({ id, comment }: { id: string | undefined; comment: string }) => {
    return await axiosInstance.post(`/comment/merchant/products/${id}`, { comment });
};

export const merchantLikeAComment = async (id: string) => {
    return await axiosInstance.post(`/comment/${id}/like/merchant`);
};

export const merchantForgotPassword = async (email: string) => {
    return await axiosInstance.post("/merchant/fpw", { email });
};

export const merchantResetPassword = async (data: { id: string | undefined; password: string }) => {
    return await axiosInstance.patch(`/merchant/ps-change/${data.id}`, { password: data.password });
};

export const merchantLoginAsUser = async () => {
    return await axiosInstance.post("/merchant/user");
};

export const createCategory = async (category: string) => {
    return await axiosInstance.post("/category", { category });
};

export const createSubCategory = async (sub: string) => {
    return await axiosInstance.post("/sub-category", { sub });
};

export const updateMerchantImage = async (file: string | Blob) => {
    const formData = new FormData();
    formData.append("image", file);

    return await axiosInstance.patch("/merchant/profile/image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const merchantDeleteProduct = async (id: string) => {
    return await axiosInstance.delete(`/products/${id}`);
};

export const verifyMerchantAccountNumber = async ({
    account_number,
    bank_code,
}: {
    account_number: string;
    bank_code: string;
}) => {
    return await axiosInstance.post("/accounts/verify", {
        account_number,
        bank_code,
    });
};

export const withdrawFunds = async ({ amount, id }: { amount: number; id: string }) => {
    return await axiosInstance.post(`/accounts/request/accounts/${id}`, { amount });
};

export const verifyWithdrawFunds = async (id: string) => {
    return await axiosInstance.post(`/transactions/accounts/withdraws/${id}`);
};

export const uploadQuicks = async (
    id: string,
    data: { description: string; file: File; images?: File[] }
) => {
    return await axiosInstance.post(`/quicks/products/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateEbook = async (data: IUpdateEbook, id: string) => {
    return await axiosInstance.put(`/products/${id}/update`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
