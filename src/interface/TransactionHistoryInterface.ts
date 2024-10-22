export interface ITransactionHistory {
    details: {
        gateway: string;
        account_name: string;
    };
    _id: string;
    amount: number;
    createdTime: string;
    merchant_id: string;
    fee: number;
    performed_by: string;
    transaction_type: string;
    transaction_status: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
}
