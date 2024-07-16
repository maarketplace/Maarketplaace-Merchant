import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IAddCourse } from "../../../../../interface/UploadCourse";
import { UploadCourseSchema } from "../../../../../schema/UploadCourseSchema";
import { useMutation } from "react-query";
import { uploadCourse } from "../../../../../api/mutation";
import toast from "react-hot-toast";
const UploadCourse = () => {
    const [description, setDescription] = useState('');


    const form = useForm<IAddCourse>({
        resolver: yupResolver(UploadCourseSchema) as any,
    });
    const { register, handleSubmit, formState: { errors }, setValue } = form;

    const { mutate, isLoading } = useMutation(['uploadebook'], uploadCourse, {
        onSuccess: async (data: any) => {
            console.log(data);
            toast.success(`${data?.data?.message}`);
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message);
        }
    });

    const onSubmit: SubmitHandler<IAddCourse> = (data) => {
        const { courseImage, ...others } = data;
        mutate({ ...others, courseImage: courseImage?.[0] });
        console.log({ ...others, courseImage: courseImage?.[0] });
    };

    const handleButtonClick = () => {
        handleSubmit(onSubmit)();
        console.log('clicked');
    };

    const onDropProductImage = (acceptedFiles: File[]) => {
        const fileList = new DataTransfer();
        acceptedFiles.forEach(file => fileList.items.add(file));
        setValue('courseImage', fileList.files);
    };

    const { getRootProps: getProductImageRootProps, getInputProps: getProductImageInputProps } = useDropzone({
        onDrop: onDropProductImage,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
    });

    return (
        <div className="w-[100%] h-[100%] overflow-scroll max-[650px]:items-center">
            <div className='w-[90%]  ml-[30px] flex flex-col gap-[5px] max-[650px]:w-[100%] max-[650px]:ml-[0px] max-[650px]:items-center '>
                <h3 className='text-[25px]'>Upload a Course</h3>
                <p className='text-[20px] max-[650px]:text-center'>Show the world what you are selling</p>
            </div>
            <div className="flex w-[90%] ml-[30px]  gap-[20px] max-[650px]:flex-col max-[650px]:ml-[0px] max-[650px]:w-[100%] '">
                <div className='w-[40%] flex flex-col items-center gap-[20px] max-[650px]:w-[100%] max-[650px]:items-center' >
                    <div className='w-[100%] flex flex-col gap-[10px] mt-[20px] '>
                        <label className='max-[650px]:text-[15px]'>Course Name</label>
                        <input
                            placeholder='Course Name'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('courseName')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseName?.message}</b>
                    <div className='w-[100%] flex flex-col gap-[10px]  '>
                        <label className='max-[650px]:text-[15px]'>Course Price</label>
                        <input
                            placeholder='Product Name'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('coursePrice')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.coursePrice?.message}</b>

                    <div className='w-[100%] flex flex-col gap-[10px] '>
                        <label className='max-[650px]:text-[15px]'>Course Discounted Price</label>
                        <input
                            placeholder='Product Name'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('courseDiscountedPrice')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseDiscountedPrice?.message}</b>
                    <div className='w-[100%] flex flex-col gap-[10px]'>
                        <label className='max-[650px]:text-[15px]'>Course Description</label>
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={(value) => {
                                setDescription(value);
                                setValue("courseDescription", value);
                            }}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] mt-[10px] max-[650px]:w-[90%]'>{errors.courseDescription?.message}</b>
                </div>
                <div className='mt-[20px] w-[40%] flex flex-col items-center  gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[0px]'>
                    <div className='w-[100%] flex flex-col gap-[10px] '>
                        <label className='max-[650px]:text-[15px]'>Course Category</label>
                        <input
                            placeholder='Course Category'
                            list="options"
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            id="option-input"
                            {...register('courseCategory')}
                        />
                        <datalist id="options">
                            <option value="Course" />
                            <option value="Ticket" />
                            <option value="Ebook" />
                        </datalist>
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseCategory?.message}</b>
                    <div className='w-[100%] flex flex-col gap-[10px] mt-[20px] '>
                        <label className='max-[650px]:text-[15px]'>Course Sub Category</label>
                        <input
                            placeholder='Product Name'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('courseSubCategory')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseSubCategory?.message}</b>
                    <div className='w-[100%] flex flex-col gap-[10px] mt-[20px] '>
                        <label className='max-[650px]:text-[15px]'>Course Location</label>
                        <input
                            placeholder='Product Name'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('courseLocation')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseLocation?.message}</b>
                    <div className='w-[100%] flex flex-col gap-[10px] '>
                        <label className='max-[650px]:text-[15px]'>Course URL</label>
                        <input
                            placeholder='Product Name'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('courseURL')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseURL?.message}</b>
                    <div className='w-[100%] flex flex-col gap-[10px] max-[650px]:w-[100%]'>
                        <label className='max-[650px]:text-[15px]'>Add Course Image</label>
                        <div {...getProductImageRootProps()} className='border-dashed border-2 border-[grey] h-[80px] flex items-center justify-center '>
                            <input {...getProductImageInputProps()} />
                            <p className='text-center max-[650px]:text-[13px] '>Drag & drop an image here, or click to select file</p>
                        </div>
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseImage?.message}</b>
                    <button
                        className='w-[100%] h-[40px] outline-none bg-[#FFC300] rounded-lg text-[20px] dark:text-[black] max-[650px]:w-[100%] '
                        type='button'
                        onClick={handleButtonClick}
                        disabled={isLoading}
                    >
                        {isLoading ? "Uploading Course..." : "Upload Course"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UploadCourse