export interface IAddEbook {
    productName: string,
    productDescription: string,
    productPrice: number,
    discountPrice: number,
    category: string,
    subCategory: string,
    productLocation: string,
    productImage: FileList | null,
    eBook: FileList | null;
    pages: number,
    author: string,
    duration: string,
}