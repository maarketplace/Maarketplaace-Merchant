import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordInterface } from '../../../interface/ForgetPasswordInterface';
import { ForgotPasswordSchema } from '../../../schema/LoginSchema';
import { merchantForgotPassword } from '../../../api/mutation';

function ForgotPassword() {
    const navigate = useNavigate()
    const form = useForm<ForgotPasswordInterface>({
        resolver: yupResolver(ForgotPasswordSchema) as any
    });
    const { register, handleSubmit, formState: { errors } } = form;
    const { isLoading, mutate } = useMutation(['merchantForgotPassword'], merchantForgotPassword, {
        onSuccess: (data) => {
            console.log(data)
            toast.success(data?.data?.data?.message)
        },
        onError: (error: any) => {
            console.log(error)
        }
    });

    const onSubmit: SubmitHandler<ForgotPasswordInterface> = (data) => {
        mutate(data.email)
    };
    const handleForgotSubmit = () => {
        handleSubmit(onSubmit)();
    };
    return (
        <div className='w-[100%] h-[100vh] flex items-center justify-center bg-[#FFC300] max-[650px]:bg-[white] max-[650px]:flex'>
            <div className='w-[45%] h-[55vh] bg-[white] rounded-lg flex items-center justify-center flex-col gap-[20px] max-[650px]:w-[95%]'>
                <img src="MARKET.svg" alt="" className=" w-[100px] max-[650px]:w-[80px]" />
                <div
                    className=" w-[70%] flex items-center justify-center flex-col gap-[20px] "
                >
                    <h3 className='text-center'>We'll send you a link to reset your password. Be sure to check your email (and maybe your spam folder too)</h3>
                    <div className=" w-[100%] flex flex-col gap-[10px]">
                            <label>Email Address</label>
                            <input
                                required
                                type="email"
                                placeholder="Email"
                                className="w-[100%] h-[50px] border border-[#999BA1] p-[10px] outline-none "
                                {...register('email')}
                            />
                    </div>
                    <b className=''>{errors.email?.message}</b>
                    <button
                        onClick={handleForgotSubmit}
                        className="w-[100%] h-[50px] outline-none p-2 bg-[#FFC300] rounded-lg"
                        disabled={isLoading}
                    >
                        {
                            isLoading ? "Loading..." : " Send Reset Email"
                        }
                    </button>
                    <p className=' text-[15px] cursor-pointer hover:' onClick={()=> navigate('/')}> Remember your password Back to login</p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword