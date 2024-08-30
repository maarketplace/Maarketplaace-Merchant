import * as yup from 'yup';

export const UploadEbookSchema = yup.object({
    productName: yup
        .string()
        .required("Product name is required"),
    // .matches(/^[A-Za-z0-9\s\-_,.'&]*$/, "Product name should only contain letters, numbers, spaces, and the following special characters: - _ , . ' &"),
    productDescription: yup
        .string()
        .required("Product description is required"),
    // .matches(/^[A-Za-z0-9\s\-_,.'&:;()"!\n]*$/, "Product description should only contain letters, numbers, spaces, and the following special characters: - _ , . ' & : ; ( ) \" !\n"),
    productPrice: yup
        .number()
        .required("Product price is required"),
    discountPrice: yup
        .number()
        .notRequired(),
    category: yup
        .string()
        .required("Category is required"),
    // .matches(/^[A-Za-z ]+$/, "Category should not contain any special characters"),
    subCategory: yup
        .string()
        .required("Subcategory is required"),
    // .matches(/^[A-Za-z ]+$/, "Subcategory should not contain any special characters"),
    productLocation: yup
        .string()
        .required("Product location is required"),
    // .matches(/^(.*[0-9]){2,}.*$/, "Product location should contain text and  number"),
    productImage: yup
        .mixed()
        .required("Product image is required").test({
            name: "required",
            message: "Image is required",
            test: (value: any) => value?.length > 0
        }),
    eBook: yup
        .mixed(),
    // .test({
    //     name: 'fileType',
    //     message: 'Invalid file type. Only PDF, PPT, or DOC allowed.',
    //     test: (value: any) => {
    //         console.log('File Object:', value);
    //         if (!value) {
    //             return false;
    //         };
    //         const allowedFileTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    //         const fileType = value.type;
    //         return allowedFileTypes.includes(fileType);
    //     },
    // }),
    pages: yup.number(),
    author:  yup.string(),
    duration:  yup.string()
}).required();
