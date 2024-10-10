export interface ICustomer {
    _id: string;
    fullName: string; 
    email: string; 
    phoneNumber: string; 
    is_admin: boolean; 
    verified: boolean; 
    createdAt: string; 
    updatedAt: string; 
    role_slug: string;
    followingMerchants: string[];
  }