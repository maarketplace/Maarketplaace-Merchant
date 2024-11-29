export interface IAddEbook {
    productName: string,
    productDescription: string,
    productPrice: number,
    discountPrice: number,
    category: string,
    subCategory: string,
    productLocation: string,
    productImage:  FileList | null;
    eBook: FileList | null;
    pages: number,
    author: string,
    duration: string,
    whatToExpect: string;
    topics: string
}

export interface IUpdateEbook {
    productName: string,
    productDescription: string,
    productPrice: number,
    discountPrice: number,
    category: string,
    subCategory: string,
    productLocation: string,
    productImage:  File | null;
    eBook: FileList | null;
    pages: number,
    author: string,
    duration: string,
    whatToExpect: string;
    topics: string
}