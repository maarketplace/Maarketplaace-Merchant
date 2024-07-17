import * as yup from 'yup';

export const BusinessInfoSchema = yup.object().shape({
    business_name: yup.string().required('Business name is required'),
    profession: yup.string().required('Profession is required'),
    bio: yup.string().required('About you is required'),
    image: yup
    .mixed()
        .required("Product image is required").test({
            name: "required",
            message: "Image is required",
            test: (value: any) => value?.length > 0
        }),
});
