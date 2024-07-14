export interface IAddEbook {
    productName: string,
    productDescription: string,
    productPrice: number,
    discountPrice: number,
    quantity: number,
    category: string,
    subCategory: string,
    productLocation: string,
    productImage: FileList | null,
    eBook: FileList | null;
}