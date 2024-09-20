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
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../../loader";

const UploadCourse = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [description, setDescription] = useState('');
    const [topics, setTopics] = useState('');
    const [whatToExpect, setWhatToExpect] = useState('');



    const form = useForm<IAddCourse>({
        resolver: yupResolver(UploadCourseSchema) as any,
    });
    const { register, handleSubmit, formState: { errors }, setValue, } = form;


    const { mutate, isLoading } = useMutation(['uploadebook'], uploadCourse, {
        onSuccess: async (data: any) => {
            console.log(data);
            toast.success(`${data?.data?.data?.message} We are currentlyreviewing your course`);
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
        <div className="w-[100%] h-[100%]">
            <div className="w-[100%] flex items-end justify-center h-[60px] border-b-2 border-b-lightgrey-500 mb-[10px]">
                <span className="gap-[10px] flex w-[95%]">
                    <button
                        className={`p-[5px] rounded-tl-[4px] rounded-tr-[4px] ${location.pathname === '/dashboard/course' ? 'bg-[#FFc300] text-black' : 'bg-[#D9D9D9]'}`}
                        onClick={() => navigate('/dashboard/course')}
                    >
                        Upload Course
                    </button>
                    <button
                        className={`p-[5px] rounded-tl-[4px] rounded-tr-[4px] ${location.pathname === '/dashboard/ebook' ? 'bg-[#FFc300] text-black' : 'bg-[#D9D9D9]'}`}
                        onClick={() => navigate('/dashboard/ebook')}
                    >
                        Upload Ebook
                    </button>
                </span>
            </div>
            <div className='w-[100%] ml-[20px] flex flex-col gap-[5px] max-[650px]:w-[100%] max-[650px]:ml-[0px] max-[650px]:items-center max-[650px]:justify-center'>
                <h3 className='text-[25px]'>Upload a Course</h3>
                <p className='text-[20px] max-[650px]:text-center max-[650px]:text-wrap'>Show the world what you are selling</p>
            </div>
            <div className="flex w-[100%] gap-[20px] max-[650px]:flex-col">
                <div className='w-[40%] mt-[20px] flex flex-col items-center gap-[10px] max-[650px]:w-[100%]' >
                    <div className='w-[90%] flex flex-col gap-[10px] mt-[20px] '>
                        <label className='max-[650px]:text-[15px]'>Course Name</label>
                        <input
                            placeholder='Course Name'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('courseName')}
                        />
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseName?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px]  '>
                        <label className='max-[650px]:text-[15px]'>Course Price</label>
                        <input
                            placeholder='Course Price'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('coursePrice')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.coursePrice?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px] '>
                        <label className='max-[650px]:text-[15px]'>Course Discounted Price</label>
                        <input
                            placeholder='Course Discounted Price'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('courseDiscountedPrice')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseDiscountedPrice?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px] '>
                        <label className='max-[650px]:text-[15px]'>Course Location</label>
                        <input
                            placeholder='Course Location'
                            list="location"
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('courseLocation')}
                        />
                        <datalist id="location">
                            <option value="Telegram" />
                            <option value="Google Drive" />
                            <option value="others" />
                        </datalist>
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseLocation?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px]'>
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
                    <div className='w-[90%] flex flex-col gap-[10px] mt-[20px]'>
                        <label className='max-[650px]:text-[15px]'>What to learn on this course</label>
                        <ReactQuill
                            theme="snow"
                            value={whatToExpect}
                            onChange={(value) => {
                                setWhatToExpect(value);
                                setValue("whatToExpect", value);
                            }}
                            placeholder="Tell us what to learn in this ocurse "
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] mt-[10px] max-[650px]:w-[90%]'>{errors.whatToExpect?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px] mt-[20px]'>
                        <label className='max-[650px]:text-[15px]'>Course Topic</label>
                        <ReactQuill
                            theme="snow"
                            value={topics}
                            onChange={(value) => {
                                setTopics(value);
                                setValue("topics", value);
                            }}
                            placeholder="write your topic in a bullet style eg . Learn about forex "
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] mt-[10px] max-[650px]:w-[90%]'>{errors.topics?.message}</b>
                </div>
                <div className='mt-[40px] w-[40%] flex flex-col items-center  gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[0px]'>
                    <div className='w-[90%] flex flex-col gap-[10px] '>
                        <label className='max-[650px]:text-[15px]'>Course Category</label>
                        <input
                            placeholder='Course Category'
                            list="options"
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            id="option-input"
                            {...register('courseCategory')}
                        />
                        <datalist id="options">
                            <option value="category3" />
                            <option value="Ticket" />
                            <option value="Ebook" />
                        </datalist>
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseCategory?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px] '>
                        <label className='max-[650px]:text-[15px]'>Course Sub Category</label>
                        <input
                            placeholder='Course Sub Category'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('courseSubCategory')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseSubCategory?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px] '>
                        <label className='max-[650px]:text-[15px]'>Course URL</label>
                        <input
                            placeholder='Course URL'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('courseURL')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseURL?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px] '>
                        <label className='max-[650px]:text-[15px]'>Course Author</label>
                        <input
                            placeholder='Course Author'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('author')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.author?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px] '>
                        <label className='max-[650px]:text-[15px]'>Course Duration</label>
                        <input
                            placeholder='Course Duration'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('duration')}
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.duration?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px] max-[650px]:w-[90%]'>
                        <label className='max-[650px]:text-[15px]'>Add Course Image</label>
                        <div {...getProductImageRootProps()} className='border-dashed border-2 border-[grey] h-[80px] flex items-center justify-center '>
                            <input {...getProductImageInputProps()} />
                            <p className='text-center max-[650px]:text-[13px] '>Drag & drop an image here, or click to select file</p>
                        </div>
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseImage?.message}</b>
                    <button
                        className='w-[90%] h-[40px] outline-none bg-[#FFC300] rounded-lg text-[20px] dark:text-[black] max-[650px]:w-[90%] '
                        type='button'
                        onClick={handleButtonClick}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loading/> : "Upload Course"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UploadCourse