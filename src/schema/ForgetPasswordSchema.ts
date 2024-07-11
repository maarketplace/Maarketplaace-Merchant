import * as yup from 'yup'

export const ForgotPasswordSchema = yup.object(
    {
        email: yup.string().email("Email must be a valid email format").required("Email is required"),
    }
).required()