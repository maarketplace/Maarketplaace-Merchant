export interface IOrder {
  _id: string;
  user_id: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
  };
  merchant_id: string;
  products: {
    _id: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    paymentPrice: number;
    discountPrice: number;
    productImage: string;
    eBook: string;
    pages: number;
    eBookUrl: string;
    productImageUrl: string;
    imageGallery: string[];
    imageGalleryUrl: string[];
    quantity: number;
    subCategory: string;
    merchant: string;
    user: string[];
    createdAt: string;
    updatedAt: string;
  }[];
  amount: number;
  status: string;
  transaction_fee: number;
  payable_amount: number;
  createdAt: string;
  updatedAt: string;
}
