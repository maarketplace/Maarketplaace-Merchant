import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams, Params } from 'react-router-dom';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { merchantResetPassword } from '../../../api/mutation';
import { ResetPasswordInterface } from '../../../interface/ResetPasswordInterface';
import { ResetPasswordSchema } from '../../../schema/LoginSchema';


function ResetPassword() {
    const navigate = useNavigate()
    const { id } = useParams<Params>()
    const form = useForm<ResetPasswordInterface>({
        resolver: yupResolver(ResetPasswordSchema) as any
    });
    const { register, handleSubmit, formState: { errors } } = form;
    const { isLoading, mutate } = useMutation(['merchantResetPassword'], merchantResetPassword, {
        onSuccess: (data) => {
            console.log(data)
            toast.success(data?.data?.data?.message)
            navigate('/')
        },
        onError: (error: any) => {
            console.log(error)
        }
    });

    const onSubmit: SubmitHandler<ResetPasswordInterface> = ({ password }) => {
        mutate({ id, password })
    };
    const handleResetSubmit = () => {
        handleSubmit(onSubmit)();
    };
    return (
        <div className="className='w-[100%] h-[100vh] flex items-center justify-center bg-[#FFC300] max-[650px]:bg-[white] max-[650px]:flex'">
            <div className='w-[45%] bg-[white] rounded-lg flex items-center justify-center flex-col gap-[20px] max-[650px]:w-[95%] p-5 '>
                <img src="MARKET.svg" alt="" className=" w-[100px] max-[650px]:w-[80px]" />
                <h3 className=''>Enter a new password to reset your password</h3>
                <div className=" w-[80%] flex flex-col gap-[10px]">
                    <label >New Password</label>
                    <input
                        required
                        minLength={8}
                        type="password"
                        placeholder="New Password"
                        className="w-[100%] h-[50px] border border-[#999BA1] p-[10px] outline-none"
                        {...register('password')}

                    />
                </div>
                <b className=''>{errors.password?.message}</b>
                <div className=" w-[80%] flex flex-col gap-[10px]">
                    <label>Confirm New Password</label>
                    <input
                        required
                        type="password"
                        placeholder="Confirm Password"
                        className="w-[100%] h-[50px] border border-[#999BA1] p-[10px] outline-none"
                        {...register('confirmPassword')}
                    />
                </div>
                <b className=''>{errors.confirmPassword?.message}</b>
                <button
                    onClick={handleResetSubmit}
                    className="w-[80%] h-[50px] outline-none p-2 bg-[#FFC300] rounded-lg"
                    disabled={isLoading}
                >
                    {
                        isLoading ? "Loading..." : " Change Password"
                    }
                </button>
            </div>
        </div>
    );
}
export default ResetPassword