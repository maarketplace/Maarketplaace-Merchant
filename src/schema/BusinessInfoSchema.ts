import * as yup from 'yup';

export const BusinessInfoSchema = yup.object().shape({
    businessName: yup.string().required('Business name is required'),
    profession: yup.string().required('Profession is required'),
    about: yup.string().required('About you is required'),
    profilePicture: yup
    .string()
    .required("Profile Picture is required")
    .test("fileName", "The file name is too long", (value: any) => {
        return value && value.length <= 255; // Adjust the length as per your requirement
    })
});
