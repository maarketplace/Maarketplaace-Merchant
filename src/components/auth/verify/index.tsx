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
        .matches(/^\d{4,7}$/, 'Verification code must be between 1 and 7 digits')
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
        <div className='w-[100%] h-[100vh] flex items-center justify-center bg-[#FFC300] max-[650px]:bg-[white] max-[650px]:flex dark:bg-black dark:text-white'>
            <div className='w-[45%] h-[50vh] bg-[white] rounded-lg flex items-center justify-center flex-col gap-[20px] max-[650px]:w-[95%] dark:bg-black dark:text-white'>
                <img src="MARKET.svg" alt="" className="max-[650px]:w-[80px]" />
                <div className="w-[70%] flex gap-[10px] items-center flex-col">
                    <label className='text-[25px] text-[#FFC300]'>
                        Check your email
                    </label>
                    <p className='w-[70%] flex justify-center text-center text-[15px] max-[650px]:w-[95%] max-[650px]:text-[12px]'>
                        We just sent you a 6 digit verification message to your email address
                    </p>
                </div>
                <div className="w-[70%] flex gap-[10px] justify-center max-[650px]:w-[100%]">
                    <input
                        className='w-full h-[50px] border border-[#999BA1] dark:text-black outline-none text-center rounded-lg max-[650px]:w-[80%] max-[650px]:h-[40px]'
                        type="text"
                        maxLength={6}
                        {...register('verificationCode')}
                        placeholder="Enter verification code"
                    />
                </div>
                <b className='w-[50%] text-[red] text-[12px]'>{errors?.verificationCode?.message}</b>
                <span>
                    <p className='text-[14px] text-blue-300 cursor-pointer' onClick={handleResendClick}>
                        {isResendLoading ? "Resending Verification Code" : 'Resend Verification Code'}
                    </p>
                </span>
                <button
                    type="submit"
                    className='w-[55%] bg-[#FFC300] h-[45px] text-black rounded-lg max-[650px]:w-[80%]'
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading}
                >
                    {isLoading ? <Loading/> : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default Verify;
