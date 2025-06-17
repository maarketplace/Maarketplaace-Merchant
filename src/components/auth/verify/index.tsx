import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { merchantVerify, resendMerchantVerify } from '../../../api/mutation';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../../../loader';
import { IErrorResponse } from '../../../interface/ErrorInterface';

interface VerificationFormData {
    verificationCode: string;
}

const VerificationSchema = yup.object({
    verificationCode: yup
        .string()
        .required('Verification code is required')
        .matches(/^\d{4,7}$/, 'Verification code must be between 4 and 7 digits')
});

const Verify = () => {
    const navigate = useNavigate();
    const emails = localStorage.getItem('merchantEmail');

    const form = useForm<VerificationFormData>({
        resolver: yupResolver(VerificationSchema),
        defaultValues: {
            verificationCode: '',
        }
    });

    const { handleSubmit, register, formState: { errors } } = form;

    const { mutate, isLoading } = useMutation(['merchantverify'], merchantVerify, {
        onSuccess: async (data) => {
            toast.success(data?.data?.data?.message);
            navigate('/');
        },
        onError: (err: IErrorResponse) => {
            toast.error(err?.response?.data?.message || err?.response?.data?.error?.message || err?.message);
        }
    });

    const { mutate: resendVerificationMutate, isLoading: isResendLoading } = useMutation(
        ['resendMerchantVerify'],
        () => resendMerchantVerify(emails),
        {
            onSuccess: () => {
                toast.success("Verification code resent successfully.");
            },
            onError: (err: IErrorResponse) => {
                toast.error(err?.response?.data?.message || err?.response?.data?.error?.message || err?.message);
            }
        }
    );

    const onSubmit: SubmitHandler<VerificationFormData> = (data) => {
        const numericCode = Number(data.verificationCode);
        mutate({ ...data, verificationCode: numericCode });
    };

    const handleResendClick = () => {
        resendVerificationMutate();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-gray-900 dark:to-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Main Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
                    {/* Logo */}
                    <div className="text-center">
                        <img
                            src="MARKET.svg"
                            alt="Market Logo"
                            className="mx-auto h-16 w-auto"
                        />
                    </div>

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">
                            Check your email
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            We just sent you a 6 digit verification code to your email address
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Input Field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="verificationCode"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Verification Code
                            </label>
                            <input
                                id="verificationCode"
                                type="text"
                                maxLength={7}
                                {...register('verificationCode')}
                                placeholder="Enter 6-digit code"
                                className={`
                                    w-full px-4 py-3 text-center text-lg tracking-widest
                                    border rounded-lg transition-colors duration-200
                                    bg-gray-50 dark:bg-gray-700 
                                    dark:text-white dark:border-gray-600
                                    focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                                    ${errors.verificationCode
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 hover:border-gray-400'
                                    }
                                `}
                                disabled={isLoading}
                            />
                            {errors.verificationCode && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.verificationCode.message}
                                </p>
                            )}
                        </div>

                        {/* Resend Link */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleResendClick}
                                disabled={isResendLoading}
                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
                                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {isResendLoading ? "Resending..." : "Resend verification code"}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 
                                     text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200
                                     disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
                                     dark:focus:ring-offset-gray-800"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <Loading />
                                    <span>Verifying...</span>
                                </div>
                            ) : (
                                "Verify Code"
                            )}
                        </button>
                    </form>
                </div>

                {/* Additional Help Text */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Didn't receive the code? Check your spam folder or try resending.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Verify;
