import * as yup from 'yup';

export const UploadEbookSchema = yup.object({
    productName: yup
        .string()
        .required("Product name is required"),
    productDescription: yup
        .string()
        .required("Product description is required"),
    productPrice: yup
        .number()
        .required("Product price is required"),
    discountPrice: yup
        .number()
        .notRequired(),
    category: yup
        .string()
        .required("Category is required"),
    subCategory: yup
        .string()
        .required("Subcategory is required"),
    productImage: yup
        .mixed()
        .required("Product image is required").test({
            name: "required",
            message: "Image is required",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            test: (value: any) => value?.length > 0
        }),
    eBook: yup
        .mixed(),
    pages: yup.number(),
    author: yup.string(),
    duration: yup.string(),
    topics: yup.string().optional(),
    whatToExpect: yup
        .string()
        .optional(),
}).required();
