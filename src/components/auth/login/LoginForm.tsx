const { VITE_TOKEN } = import.meta.env;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, } from "react-icons/fa";
import { useMutation } from 'react-query'
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginInterface } from "../../../interface/LoginInterface";
import { AdminLoginSchema } from "../../../schema/LoginSchema";
import { merchantLogin } from "../../../api/mutation";
import toast from "react-hot-toast";
import Loading from "../../../loader";
function LoginForm() {
    const [showPassword, setShow] = useState<boolean>(false);
    const navigate = useNavigate()
    const form = useForm<LoginInterface>({
        resolver: yupResolver(AdminLoginSchema) as any
    });
    const { register, handleSubmit, formState: { errors } } = form;

    const { mutate, isLoading } = useMutation(['merchantLogin'], merchantLogin, {
        onSuccess: async (data: any) => {
            toast.success(data?.data?.message,)
            localStorage.setItem(VITE_TOKEN, data?.data?.data?.token)
            navigate('/dashboard');
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || err?.response?.data?.error?.message || err?.message);
            if(err?.response?.data?.message === "Please verify your account"){
                navigate('/verify-account')
            }
        }
    })

    const onSubmit: SubmitHandler<LoginInterface> = (data) => {
        mutate(data)
    };

    const handleButtonClick = () => {
        handleSubmit(onSubmit)();
    };
    return (
        <div className="h-[100vh] w-[55%] flex items-center justify-center flex-col gap-5 max-[650px]:w-[100%]">
            <div className="w-[70%] flex items-center justify-center flex-col gap-[10px] max-[650px]:w-[100%]" >
                <img src="MARKET.svg" alt="" className="max-[650px]:w-[80px]" />
                <span className="flex items-center justify-center flex-col gap-[10px] max-[650px]:w-[100%]" >
                    <h2 className="text-2xl max-[650px]:text-[15px]">Welcome  back to maarketplaace</h2>
                    <p className="text-center max-[650px]:text-[12px] text-wrap">Continue creating wonderful <br></br>products for our consumers</p>
                </span>
            </div>
            <div className='w-[70%] flex flex-col gap-[10px] max-[650px]:w-[90%] ' >
                <label htmlFor="email" className="max-[650px]:text-[15px]">Enter your email</label>
                <input
                    required
                    type="email"
                    {...register('email')}
                    placeholder="Email"
                    className="w-[100%] h-[50px] outline-none p-2 border border-[#999BA1] max-[650px]:h-[40px] bg-transparent"
                />
            </div>
            <b className='w-[70%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.email?.message}</b>
            <div className='w-[70%] flex gap-[10px] flex-col max-[650px]:w-[90%] '  >
                <label htmlFor="password" className="max-[650px]:text-[15px]">Enter your password</label>
                <div className=" w-[100%] border border-[#999BA1] flex items-center  ">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-[90%] h-[50px] outline-none p-2 max-[650px]:h-[40px]  bg-transparent"
                        {...register('password')}
                    />
                    <span
                        onClick={() => setShow(!showPassword)}
                        className=""
                        style={{ background: "none", border: "none" }}
                    >
                        {!showPassword ? <FaEye className=" text-[20px] max-[650px]:w-[15px]" /> : <FaEyeSlash className=" text-[20px] max-[650px]:w-[15px]" />}
                    </span>
                </div>
                <b className='w-[70%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.password?.message}</b>
            </div>
            <div className="w-[70%] flex items-center justify-center max-[650px]:w-[90%]">
                <button
                    type="submit"
                    onClick={handleButtonClick}
                    disabled={isLoading}
                    className="w-[100%] h-[50px] outline-none p-2 bg-[#FFC300] rounded-lg dark:text-[black]"
                >
                    {isLoading ? <Loading/> : "Login"}
                </button>

            </div>
            <div className="w-[70%] flex items-center justify-center gap-[10px] max-[650px]:w-[90%] max-[650px]:flex-wrap ">

                <h4 className="">Don't have an account?</h4>
                <h4
                    className="text-[#0c50af] cursor-pointer"
                    onClick={() => navigate('/create-account')}
                >
                    Create an Account
                </h4>
            </div>
            <h4 className="text-[red] cursor-pointer" onClick={() => navigate('/forgot-password')}>Forgot Password?</h4>
        </div>
    )
}

export default LoginForm