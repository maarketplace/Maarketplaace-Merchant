import * as yup from 'yup'


export const BusinessInfoSchema = yup.object(
    {
        businessName: yup.string().required('Business name is required'),
        profession: yup.string().required('Profession is required'),
        about: yup.string().required('About you is required'),
        profilePicture: yup
        .mixed()
        .required("Profile Picture is required").test({
            name: "required",
            message: "Image is required",
            test: (value: any) => value?.length > 0
        }),
    }
)


