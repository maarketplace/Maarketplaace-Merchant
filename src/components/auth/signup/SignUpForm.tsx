import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignUpInterface } from "../../../interface/SignUpInterface";
import { AdminSignUpSchema } from "../../../schema/SignupSchema";

function AdminSignupForm() {
    const navigate = useNavigate()
    const [showPassword, setShow] = useState<boolean>(false);
    const [showConfirmassword, setShowConfirmPassword] = useState<boolean>(false);
    const form = useForm<SignUpInterface>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver(AdminSignUpSchema) as any
    });
    const { register, handleSubmit, formState: { errors } } = form;

    const onSubmit: SubmitHandler<SignUpInterface> = (data) => {
        const { confirmPassword, ...others } = data;
        const userData = { ...others, confirmPassword };
        localStorage.setItem('merchantData', JSON.stringify(userData));
        navigate('/create-account/business-info')
    };

    const handleButtonClick = () => {
        handleSubmit(onSubmit)();
    };
    return (
        <div
            className=" w-[55%] flex items-center justify-center flex-col gap-[30px] max-[650px]:w-[100%] max-[650px]:gap-0 max-[650px]:mb-[40px] max-[650px]:mt-[20px]"
        >
            <div className="w-[70%] flex items-center justify-center flex-col gap-[10px] max-[650px]:w-[100%]" >
                <img src="MARKET.svg" alt="" className="max-[650px]:w-[80px]" />
                <span className="flex items-center justify-center flex-col gap-[10px] max-[650px]:w-[100%]" >
                    <h2 className="text-2xl max-[650px]:text-[18px] max-[650px]:m-[20px] text-center">Create your maarketplaace account</h2>
                    {/* <p className="italic text-center max-[650px]:text-[12px] text-wrap">Continue selling and creating wonderful <br></br>products for our consumers</p> */}
                </span>
            </div>
            <div className="w-[80%]  flex items-center gap-[10px] max-[650px]:flex-wrap max-[650px]:w-[90%] ">
                <span className="w-[50%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[10px]">
                    <label className="text-sm">First Name</label>
                    <div className="w-[100%] border-[#999BA1]  border p-2">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-[100%] outline-none h-[30px] text-sm bg-transparent"
                            {...register('firstName')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.firstName?.message}</b>
                </span>
                <span className="w-[50%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[10px]">
                    <label className="text-sm">Last Name</label>
                    <div className=" w-[100%] border-[#999BA1]  border p-2">
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-[100%] outline-none h-[30px] text-sm bg-transparent"
                            {...register('lastName')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.lastName?.message}</b>
                </span>
            </div>
            <div className="w-[80%]  flex items-center gap-[10px] max-[650px]:flex-wrap max-[650px]:w-[90%]">
                <span className="w-[50%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[10px]">
                    <label className="text-sm">Your Phone Number</label>
                    <div className="w-[100%] border-[#999BA1]  border p-2">
                        <input
                            type="number"
                            placeholder="Enter Phone number"
                            className="w-[100%] outline-none h-[30px] text-sm bg-transparent"
                            {...register('phoneNumber')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.phoneNumber?.message}</b>
                </span>
                <span className="w-[50%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[10px]">
                    <label className="text-sm">Your Email</label>
                    <div className="w-[100%] border-[#999BA1] border p-2">
                        <input
                            type="email"
                            placeholder="Ex: Maguire@FlexUI.com"
                            className="w-[100%] outline-none h-[30px] text-sm bg-transparent"
                            {...register('email')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.email?.message}</b>
                </span>
            </div>
            <div className="w-[80%]  flex items-center gap-[10px] max-[650px]:flex-wrap  max-[650px]:w-[90%]">
                <span className="w-[50%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[10px]">
                    <label className="text-sm">Enter Your Password</label>
                    <div className="flex w-[100%] border-[#999BA1] items-center  border p-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-[90%] outline-none h-[30px] text-sm bg-transparent"
                            {...register('password')}
                        />
                        <span
                            onClick={() => setShow(!showPassword)}
                            className=""

                        >
                            {!showPassword ? <FaEye size={20} className="dark:text-[white]" /> : <FaEyeSlash size={20} className="dark:text-[white]" />}
                        </span>
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.password?.message}</b>
                </span>
                <span className="w-[50%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[10px]">
                    <label className="text-sm">Confirm Your Password</label>
                    <div className="flex w-[100%] items-center  border-[#999BA1] border p-2">
                        <input
                            type={showConfirmassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className="w-[90%] outline-none h-[30px] text-sm bg-transparent"
                            {...register('confirmPassword')}
                        />
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmassword)}
                            className=""

                        >
                            {!showConfirmassword ? <FaEye size={20} className="dark:text-[white]" /> : <FaEyeSlash size={20} className="dark:text-[white]" />}
                        </span>
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.confirmPassword?.message}</b>
                </span>
            </div>
            <div className="w-[80%] flex items-center justify-center max-[650px]:w-[90%] max-[650px]:mt-[10px]">
                <button
                    type="submit"
                    className="w-[100%] h-[50px] outline-none p-2 bg-[#FFC300] rounded-lg text-[20px] dark:text-[black] "
                    onClick={handleButtonClick}
                >
                    Create account
                </button>
            </div>
            <div className="w-[70%] flex items-center justify-center gap-[10px] max-[650px]:w-[90%] max-[650px]:flex-wrap max-[650px]:mt-[10px] ">

                <h4 className="">Already have an account?</h4>
                <h4
                    className="text-[#FFC300] cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    Sign in
                </h4>
            </div>
        </div>
    )
}

export default AdminSignupForm