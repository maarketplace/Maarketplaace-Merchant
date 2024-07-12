import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useDropzone } from 'react-dropzone';
import { merchantSignup } from "../../../api/mutation";
import { BusinessInfoSchema } from "../../../schema/BusinessInfoSchema";
import { BusinessInfoInterface } from "../../../interface/BusinessInfoInterface";
import { useState } from "react";
import { ModalData } from "../../../interface/ModalInterface";
import Modal from "../../../utils/Modal";
import { FaUser } from "react-icons/fa";

interface IErrorResponse {
    message: any;
    response: {
        data: {
            error: any;
            message: string;
        };
    };
}

function BusinessInfo() {
    const navigate = useNavigate();
    const [modalData, setModalData] = useState<ModalData>({ isOpen: false, title: '', message: '', isSuccess: false });
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
    const form = useForm<BusinessInfoInterface>({
        resolver: yupResolver(BusinessInfoSchema) as any
    });
    const { register, handleSubmit, formState: { errors }, setValue } = form;

    const { mutate, isLoading } = useMutation(['merchantSignup'], merchantSignup, {
        onSuccess: async (data: any) => {
            setModalData({
                isOpen: true,
                title: 'Success',
                message: `${data?.data?.message}, "A verification code has been sent to your email"`,
                isSuccess: true,
            });
            navigate('/verify-account');
        },
        onError: (err: IErrorResponse) => {
            setModalData({
                isOpen: true,
                title: 'Error',
                message: err?.response?.data?.message || err?.response?.data?.error?.message || err?.message,
                isSuccess: false,
            });
        }
    });

    const onSubmit: SubmitHandler<BusinessInfoInterface> = (data) => {
        const { ...others } = data;
        mutate({ ...others });
    };

    const handleButtonClick = () => {
        handleSubmit(onSubmit)();
    };

    const onDropProfilePicture = (acceptedFiles: File[]) => {
        const fileList = new DataTransfer();
        acceptedFiles.forEach(file => fileList.items.add(file));
        setValue('profilePicture', fileList.files);
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result);
        };
        reader.readAsDataURL(acceptedFiles[0]);
    };

    const { getRootProps: getProfilePictureRootProps, getInputProps: getProfilePictureInputProps } = useDropzone({
        onDrop: onDropProfilePicture,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
    });

    return (
        <div className=" w-[55%] flex items-center justify-center flex-col gap-[30px] max-[650px]:w-[100%] max-[650px]:gap-0 max-[650px]:mb-[40px] max-[650px]:mt-[20px]">
            <div className="w-[70%] flex items-center justify-center flex-col gap-[10px] max-[650px]:w-[100%]">
                <img src="MARKET.svg" alt="" className="max-[650px]:w-[80px]" />
                <span className="flex items-center justify-center flex-col gap-[10px] max-[650px]:w-[100%]">
                    <h2 className="text-2xl max-[650px]:text-[20px] max-[650px]:m-[20px]">Create your marketplace account</h2>
                </span>
            </div>
            <div className='w-[150px] h-[150px] rounded-full border border-separate flex items-center justify-center p-[10px]'>
                <div {...getProfilePictureRootProps()} className=" flex items-center justify-center text-center flex-col">
                    {
                        selectedImage ?
                            <img src={selectedImage as string} alt="Selected" className="w-[130px] rounded-full h-[130px] object-cover" />
                            :
                            <>
                                <input {...getProfilePictureInputProps()} />
                                <FaUser className="w-[40px] h-[40px]" />
                                <p className="text-[12px]">Profile Picture</p>
                            </>
                    }
                </div>
            </div>
            <div className="w-[80%] flex items-center gap-[10px] max-[650px]:flex-wrap max-[650px]:w-[90%]">
                <span className="w-[50%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[10px]">
                    <label className="text-sm">Business Name / Store Name</label>
                    <div className="w-[100%] border-[#999BA1] border p-2 max-[650px]:rounded-lg">
                        <input
                            type="text"
                            placeholder="eg. Buy and sell ventures"
                            className="w-[100%] outline-none h-[30px] text-sm bg-transparent"
                            {...register('businessName')}
                        />
                    </div>
                    <b className=''>{errors.businessName?.message}</b>
                </span>
                <span className="w-[50%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[10px]">
                    <label className="text-sm">Profession</label>
                    <div className=" w-[100%] border-[#999BA1] border p-2 max-[650px]:rounded-lg">
                        <input
                            type="text"
                            placeholder="eg. Graphic Designer"
                            className="w-[100%] outline-none h-[30px] text-sm bg-transparent"
                            {...register('profession')}
                        />
                    </div>
                    <b className=''>{errors.profession?.message}</b>
                </span>
            </div>
            <div className="w-[80%] flex items-center gap-[10px] max-[650px]:flex-wrap max-[650px]:w-[90%]">
                <span className="w-[100%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[10px]">
                    <label className="text-sm">Tell us about yourself</label>
                    <div className="w-[100%] border-[#999BA1] border p-2 max-[650px]:rounded-lg">
                        <textarea
                            placeholder="eg. I am a seasoned graphic designer with 2 years of experience etc.."
                            className="w-[100%] outline-none h-[30px] text-sm bg-transparent"
                            {...register('about')}
                        />
                    </div>
                    <b className=''>{errors.about?.message}</b>
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
            <div className="w-[70%] flex items-center justify-center gap-[10px] max-[650px]:w-[90%] max-[650px]:flex-wrap max-[650px]:mt-[10px]">
                <h4 className="">Already have an account?</h4>
                <h4
                    className="text-[#FFC300] cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    Sign in
                </h4>
            </div>
            <Modal
                isOpen={modalData.isOpen}
                setIsOpen={(isOpen) => setModalData({ ...modalData, isOpen })}
                title={modalData.title}
                message={modalData.message}
                autoClose={true}
                closeAfter={3000}
                primaryButton={{
                    text: 'Close',
                    display: true,
                    primary: true,
                }}
                secondaryButton={{
                    text: 'Verify',
                    display: false,
                    primary: false,
                }}
            />
        </div>
    );
}

export default BusinessInfo;
