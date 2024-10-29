import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { merchantVerify, resendMerchantVerify } from '../../../api/mutation';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../loader';

interface VerificationFormData {
    verificationCode: string;
}

const VerificationSchema = yup.object({
    verificationCode: yup
        .string()
        .required('Verification code is required')
        .matches(/^\d{6}$/, 'Verification code must be exactly 6 digits')
});

const Verify = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const form = useForm<VerificationFormData>({
        resolver: yupResolver(VerificationSchema) as any,
        defaultValues: {
            verificationCode: '',
        }
    });
    const { handleSubmit, register, formState: { errors }, setValue } = form;

    const { mutate, isLoading } = useMutation(['merchantverify'], merchantVerify, {
        onSuccess: async (data: any) => {
            console.log(data);
            
            toast.success(data?.data?.data?.message);
            navigate('/');
            setEmail(data?.data?.data?.email)
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || err?.response?.data?.error?.message || err?.message);
        }
    });

    const { mutate: resendVerificationMutate, isLoading: isResendLoading } = useMutation(
        ['resendMerchantVerify'], 
        () => resendMerchantVerify({ email }), // Ensure email is passed correctly
        {
            onSuccess: async (data: any) => {
                toast.success("Verification code resent successfully.");
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || err?.response?.data?.error?.message || err?.message);
            }
        }
    );


    const onSubmit: SubmitHandler<VerificationFormData> = (data) => {
        const numericCode = Number(data.verificationCode); // Convert to number
        console.log("Form Data Submitted:", { ...data, verificationCode: numericCode });
        mutate({ ...data, verificationCode: numericCode });
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/^\d$/.test(value) || value === "") {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value !== "" && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
            const verificationCode = newCode.join('');
            setValue('verificationCode', verificationCode);  // Ensure setValue is called with the latest code
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && code[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const verificationCode = code.join('');
    setValue('verificationCode', verificationCode);  

    return (
        <div className='w-[100%] h-[100vh] flex items-center justify-center bg-[#FFC300] max-[650px]:bg-[white] max-[650px]:flex dark:bg-black dark:text-white'>
            <div className='w-[45%] h-[50vh] bg-[white] rounded-lg flex items-center justify-center flex-col gap-[20px] max-[650px]:w-[95%] dark:bg-black dark:text-white'>
                <img src="MARKET.svg" alt="" className="max-[650px]:w-[80px]" />
                <div className="w-[70%] flex gap-[10px] items-center flex-col">
                    <label className='text-[25px] text-[#FFC300]'>
                        Check your email
                    </label>
                    <p className='w-[70%] flex justify-center text-center text-[15px] max-[650px]:w-[95%] max-[650px]:text-[12px]'>
                        We just sent you a 6 digit verification message
                        to your email address
                    </p>
                </div>
                <div className="w-[70%] flex gap-[10px] justify-center max-[650px]:w-[100%]">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            className='w-[50px] h-[50px] border border-[#999BA1] dark:text-black outline-none text-center rounded-lg max-[650px]:w-[40px] max-[650px]:h-[40px]'
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                </div>
                <input
                    type='hidden'
                    {...register('verificationCode')}
                    value={verificationCode}
                />
                <b className='w-[50%] text-[red] text-[12px]'>{errors?.verificationCode?.message}</b>
                <p>Didn't recieve a code <strong className='text-blue-500'>Resend code</strong></p>
                <button type="submit"
                    className='w-[55%] bg-[#FFC300] h-[45px] text-black rounded-lg max-[650px]:w-[80%]'
                    onClick={handleFormSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? <Loading/> : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default Verify;
