import * as yup from 'yup'


export const ResetPasswordSchema = yup.object(
    {
        password: yup
            .string()
            .required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/,
                "Password must be 8 characters long, uppercase and special character (!@#$%^&*)."
            ),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    }
)
    .required()