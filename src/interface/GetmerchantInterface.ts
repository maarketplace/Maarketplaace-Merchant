export interface IMerchant {
    _id: string;
    fullName: string;
    email: string;
    business_name: string;
    password: string;
    phoneNumber: string;
    is_admin: boolean;
    bio: string;
    profession: string;
    role_slug: string;
    image: string;
    imageCloudUrl: string;
    verified: boolean;
    verificationCode: number;
    subscribed: boolean;
    subscriptionType: string;
    createdAt: string;
    updatedAt: string;
}

export interface IMerchantResponse {
    status: boolean;
    message: string;
    data: {
        data: IMerchant;
    };
}

export interface IMerchantContextType {
    merchant: IMerchant | null;
    loading: boolean;
    error: string | null;
}
