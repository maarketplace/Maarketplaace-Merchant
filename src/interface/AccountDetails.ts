export interface IAccountDetails {
    merchant_id: string;
    _id: string;
    status: boolean;
    message: string;
    withdrawal_status: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    details: {
        account_number: string;
        bank_code: string;
        account_name: string;
    }
}

export interface IBanks {
    
        name:  string,
        slug: string,
        code: string,
        country: string,
        nibss_bank_code: string
}