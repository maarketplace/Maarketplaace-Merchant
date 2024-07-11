import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useMutation } from 'react-query'

import toast from 'react-hot-toast';
import { SignUpInterface } from "../../../interface/SignUpInterface";
import { AdminSignUpSchema } from "../../../schema/SignupSchema";
import { merchantSignup } from "../../../api/mutation";
interface IErrorResponse {
    message: any;
    response: {
        data: {
            error: any;
            message: string
        }
    };
}
function BusinessInfo() {
    const navigate = useNavigate()


    const form = useForm<SignUpInterface>({
        resolver: yupResolver(AdminSignUpSchema) as any
    });
    const { register, handleSubmit, formState: { errors } } = form;

    const { mutate, isLoading } = useMutation(['merchantSignup'], merchantSignup, {
        onSuccess: async (data: any) => {
            console.log(data)
            toast.success(`${data?.data?.message}, " "A verification code has been sent to your email`)
            navigate('/verify-account')
        },
        onError: (err: IErrorResponse) => {
            toast.error(err?.response?.data?.message || err?.response?.data?.error?.message || err?.message)
        }
    })
    const onSubmit: SubmitHandler<SignUpInterface> = (data) => {
        console.log("dhcadvjhvdhjavh");
        console.log(data)
        const { confirmPassword, firstName, lastName, ...others } = data;
        const fullName = (firstName as string) + " " + (lastName as string)

        mutate({ fullName, ...others })
        console.log({ fullName, ...others });

    };

    const handleButtonClick = () => {
        // console.log("dhcadvjhvdhjavh");
        handleSubmit(onSubmit)();
    };
    return (
        <div
            className=" w-[55%] flex items-center justify-center flex-col gap-[30px] max-[650px]:w-[100%] max-[650px]:gap-0 max-[650px]:mb-[40px] max-[650px]:mt-[20px]"
        >
            <div className="w-[70%] flex items-center justify-center flex-col gap-[10px] max-[650px]:w-[100%]" >
                <img src="MARKET.svg" alt="" className="max-[650px]:w-[80px]" />
                <span className="flex items-center justify-center flex-col gap-[10px] max-[650px]:w-[100%]" >
                    <h2 className="text-2xl max-[650px]:text-[20px] max-[650px]:m-[20px]">Create your maarketplaace account</h2>
                    {/* <p className="italic text-center max-[650px]:text-[12px] text-wrap">Continue selling and creating wonderful <br></br>products for our consumers</p> */}
                </span>
            </div>
            <div className="w-[80%]  flex items-center gap-[10px] max-[650px]:flex-wrap max-[650px]:w-[90%] ">
                <span className="w-[50%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[10px]">
                    <label className="text-sm">Business Name / Store Name</label>
                    <div className="w-[100%] border-[#999BA1]  border p-2 max-[650px]:rounded-lg">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-[100%] outline-none h-[30px] text-sm"
                            {...register('firstName')}
                        />
                    </div>
                    <b className=''>{errors.firstName?.message}</b>
                </span>
                <span className="w-[50%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[10px]">
                    <label className="text-sm">Profession</label>
                    <div className=" w-[100%] border-[#999BA1]  border p-2 max-[650px]:rounded-lg">
                        <input
                            type="text"
                            placeholder="eg. Graphic Designer"
                            className="w-[100%] outline-none h-[30px] text-sm"
                            {...register('lastName')}
                        />
                    </div>
                    <b className=''>{errors.lastName?.message}</b>
                </span>
            </div>
            <div className="w-[80%]  flex items-center gap-[10px] max-[650px]:flex-wrap max-[650px]:w-[90%]">
                <span className="w-[100%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[10px]">
                    <label className="text-sm">Tell us about yourself</label>
                    <div className="w-[100%] border-[#999BA1]  border p-2 max-[650px]:rounded-lg">
                        <textarea
                            placeholder="eg. i am a seasoned graphic designer with 2 years of experince etc.."
                            className="w-[100%] outline-none h-[30px] text-sm"
                            {...register('phoneNumber')}
                        />
                    </div>
                    <b className=''>{errors.phoneNumber?.message}</b>
                </span>
            </div>
            <div className="w-[80%] flex items-center justify-center max-[650px]:w-[90%] max-[650px]:mt-[10px]">
                <button
                    type="submit"
                    className="w-[100%] h-[50px] outline-none p-2 bg-[#FFC300] rounded-lg text-[20px]"
                    onClick={handleButtonClick}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Create account"}
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

export default BusinessInfo