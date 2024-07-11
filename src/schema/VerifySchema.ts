import * as yup from 'yup'

export const VerificationSchema = yup.object({
    verificationCode: yup
        .string()
        .required('Verification code is required')
        .matches(/^\d{6}$/, 'Verification code must be exactly 6 digits')
});
export const UserVerificationSchema = yup.object({
    verificationCode: yup
        .number()
        .required('Verification code is required')
    //   .matches(/^\d{6}$/, 'Verification code must be a 6-digit number'),
});