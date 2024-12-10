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
import { useNavigate } from "react-router-dom";
import Loading from "../../../../../loader";
import { IErrorResponse } from "../../../../../interface/ErrorInterface";
import courseCategories from "./category/courseCategory";
import { courseLocations } from "./category/courseCategory";

const UploadCourse = () => {
    const navigate = useNavigate()
    const [description, setDescription] = useState('');
    const [topics, setTopics] = useState('');
    const [whatToExpect, setWhatToExpect] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');


    const form = useForm<IAddCourse>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver(UploadCourseSchema) as any,
    });
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = form;
    const selectedCategory = watch("courseCategory");


    const { mutate, isLoading } = useMutation(['uploadebook'], uploadCourse, {
        onSuccess: async (data) => {
            toast.success(
                `${data?.data?.data?.message} We are currently reviewing your course it will take atleast 24 hours or less`,
                {
                    duration: 10000,
                    style: {
                        border: '1px solid #FFC300',
                        padding: '16px',
                        color: '#333',
                        backgroundColor: '#FFF9E6',
                        borderRadius: '8px',
                        fontSize: '14px',
                        textAlign: 'center',
                    },
                    icon: '📘',
                }
            );
            reset({
                courseName: '',
                coursePrice: 0,
                courseDiscountedPrice: 0,
                courseDescription: '',
                courseCategory: '',
                courseSubCategory: '',
                courseLocation: '',
                courseURL: '',
                courseImage: null,
                author: '',
                duration: '',
                topics: '',
                whatToExpect: '',
            });
            setSelectedFileName('');
            setDescription('');
            setTopics('');
            setWhatToExpect('')
            navigate('/dashboard')
        },
        onError: (err: IErrorResponse) => {
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
        setSelectedFileName(acceptedFiles[0]?.name || '');
    };

    const { getRootProps: getProductImageRootProps, getInputProps: getProductImageInputProps } = useDropzone({
        onDrop: onDropProductImage,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
    });
    const filteredSubCategories =
        courseCategories.find((category) => category.name === selectedCategory)?.courseSubcategories || [];
    return (
        <div className="w-[100%] h-[100%]  ">
            <div className='w-[100%] ml-[20px] flex flex-col gap-[5px] max-[650px]:w-[100%] max-[650px]:ml-[0px] max-[650px]:items-center max-[650px]:justify-center'>
                <h3 className='text-[25px]'>Upload a Course</h3>
                <p className='text-[20px] max-[650px]:text-center max-[650px]:text-wrap'>Show the world what you are selling</p>
            </div>
            <div className="flex w-[100%] gap-[20px] max-[650px]:flex-col ">
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
                        <select
                            className='w-full h-[45px] outline-none p-[10px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            {...register('courseLocation')}
                        >
                            {courseLocations.map((location, index) => (
                                <option key={index} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
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
                            placeholder="write your topic in a bullet style "
                        />
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] mt-[10px] max-[650px]:w-[90%]'>{errors.topics?.message}</b>
                </div>
                <div className='mt-[40px] w-[40%] flex flex-col items-center max-[650px]:mb-[50px]  gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[0px]'>
                    <div className='w-[90%] flex flex-col gap-[10px] '>
                        <label className='max-[650px]:text-[15px]'>Course Category</label>
                        <select
                            className='w-full h-[45px] outline-none p-[10px] border border-grey bg-transparent max-[650px]:text-[12px]'
                            {...register("courseCategory")}
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {courseCategories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseCategory?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px] '>
                        <label className='max-[650px]:text-[15px]'>Course Sub Category</label>
                        <select
                            className='w-full h-[45px] outline-none p-[10px] border border-grey bg-transparent max-[650px]:text-[12px]'
                            {...register("courseSubCategory")}
                            disabled={!selectedCategory}
                        >
                            <option value="" disabled>
                                Select a subcategory
                            </option>
                            {filteredSubCategories.map((subCategory) => (
                                <option key={subCategory.id} value={subCategory.name}>
                                    {subCategory.name}
                                </option>
                            ))}
                        </select>
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
                        <div
                            {...getProductImageRootProps()}
                            className="w-full h-[100px] border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer"
                        >
                            <input {...getProductImageInputProps()} />
                            {selectedFileName ? (
                                <span>{selectedFileName}</span>
                            ) : (
                                <span className="text-center">Drag & drop an image here, or click to select</span>
                            )}
                        </div>
                    </div>
                    <b className='w-[100%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.courseImage?.message}</b>
                    <button
                        className='w-[90%] h-[40px] outline-none bg-[#FFC300] rounded-lg text-[20px] dark:text-[black] max-[650px]:w-[90%] '
                        type='button'
                        onClick={handleButtonClick}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loading /> : "Upload Course"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UploadCourse