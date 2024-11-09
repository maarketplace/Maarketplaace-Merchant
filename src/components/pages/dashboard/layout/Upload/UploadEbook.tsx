import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { uploadEbook } from '../../../../../api/mutation';
import { IAddEbook } from '../../../../../interface/UploadEbook';
import { UploadEbookSchema } from '../../../../../schema/UploadEbookSchema';
import { categories } from './category';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../../../../loader';
import { IErrorResponse } from '../../../../../interface/ErrorInterface';

function UploadEbook() {
    const navigate = useNavigate()
    const location = useLocation();

    const form = useForm<IAddEbook>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver(UploadEbookSchema) as any,
    });

    const { register, watch, handleSubmit, formState: { errors }, setValue } = form;
    const selectedCategory = watch('category');

    const { mutate, isLoading } = useMutation(['uploadebook'], uploadEbook, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: async (data: any) => {
            toast.success(`${data?.data?.message}`);
        },
        onError: (err: IErrorResponse) => {
            toast.error(err?.response?.data?.message);
        }
    });
    const onSubmit: SubmitHandler<IAddEbook> = (data) => {
        const { eBook, productImage, ...others } = data;
        mutate({ ...others, productImage: productImage?.[0], eBook: eBook?.[0] });
        // console.log({ ...others, productImage: productImage?.[0], eBook: eBook?.[0] });
    };

    const handleButtonClick = () => {
        handleSubmit(onSubmit)();
    };

    const onDropProductImage = (acceptedFiles: File[]) => {
        const fileList = new DataTransfer();
        acceptedFiles.forEach(file => fileList.items.add(file));
        setValue('productImage', fileList.files);

    };

    const onDropEbook = (acceptedFiles: File[]) => {
        const fileList = new DataTransfer();
        acceptedFiles.forEach(file => fileList.items.add(file));
        setValue('eBook', fileList.files);
    };

    const { getRootProps: getProductImageRootProps, getInputProps: getProductImageInputProps } = useDropzone({
        onDrop: onDropProductImage,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
    });

    const { getRootProps: getEbookRootProps, getInputProps: getEbookInputProps } = useDropzone({
        onDrop: onDropEbook,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
            'application/msword': ['.doc', '.docx']
        },
        multiple: true,
    });
    return (
        <div className="w-[100%] h-[100%] " >
            <div className="w-[100%] flex items-end justify-center h-[60px] border-b-2 border-b-lightgrey-500 mb-[10px]">
                <span className="gap-[10px] flex w-[95%] max-[650px]:justify-center max-[650px]:w-[100%]">
                    <button
                        className={`p-[2px] max-[650px]:text-[12px] rounded-tl-[4px] rounded-tr-[4px] ${location.pathname === '/dashboard/course' ? 'bg-[#FFc300] text-black' : 'bg-[#D9D9D9]'}`}
                        onClick={() => navigate('/dashboard/course')}
                    >
                        Upload Course
                    </button>
                    <button
                        className={`p-[2px] max-[650px]:text-[12px] rounded-tl-[4px] rounded-tr-[4px] ${location.pathname === '/dashboard/ebook' ? 'bg-[#FFc300] text-black' : 'bg-[#D9D9D9]'}`}
                        onClick={() => navigate('/dashboard/ebook')}
                    >
                        Upload Ebook
                    </button>
                </span>
            </div>
            <div className='w-[90%]  ml-[30px] flex flex-col gap-[5px] max-[650px]:w-[100%] max-[650px]:ml-[0px] max-[650px]:items-center '>
                <h3 className='text-[25px]'>Upload an Ebook</h3>
                <p className='text-[20px] max-[650px]:text-center'>Show the world what you are selling</p>
            </div>
            <div className='flex w-[100%] gap-[20px] max-[650px]:flex-col'>
                <div className='w-[40%] mt-[20px] flex flex-col items-center gap-[10px] max-[650px]:w-[100%] '>
                    <div className='w-[90%] flex flex-col gap-[10px] mt-[20px] '>
                        <label className='max-[650px]:text-[15px]'>Book Name</label>
                        <input
                            placeholder='Product Name'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] text-[12px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('productName')}
                        />
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productName?.message}</b>

                    <div className='w-[90%] flex flex-col gap-[10px]'>
                        <label className='max-[650px]:text-[15px]'>Book Price</label>
                        <input
                            placeholder='Product Price'
                            type='number'
                            className='w-[100%] h-[45px] outline-none p-[10px] text-[12px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            {...register('productPrice')}
                        />
                        <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productPrice?.message}</b>
                    </div>
                    <div className='w-[90%] flex flex-col gap-[10px]'>
                        <label className='max-[650px]:text-[15px]'>Discounted Price</label>
                        <input
                            placeholder='Discounted Price'
                            type='number'
                            className='w-[100%] h-[45px] outline-none p-[10px] text-[12px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            {...register('discountPrice')}
                        />
                        <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.discountPrice?.message}</b>
                    </div>
                    <div className='w-[90%] flex flex-col gap-[10px]'>
                        <label className='max-[650px]:text-[15px]'>Author Name</label>
                        <input
                            placeholder='Author Name'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] text-[12px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            {...register('author')}
                        />
                        <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.author?.message}</b>
                    </div>
                    <div className='w-[90%] flex flex-col gap-[10px]'>
                        <label className='max-[650px]:text-[15px]'>Duration</label>
                        <input
                            placeholder='Author Name'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] text-[12px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            {...register('duration')}
                        />
                        <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.duration?.message}</b>
                    </div>
                    <div className='w-[90%] flex flex-col gap-[10px]'>
                        <label className='max-[650px]:text-[15px]'>Number  Of Pages</label>
                        <input
                            placeholder='Number Pages'
                            type='number'
                            className='w-[100%] h-[45px] outline-none p-[10px] text-[12px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            {...register('pages')}
                        />
                        <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.pages?.message}</b>
                    </div>
                    <div className='w-[90%] flex flex-col gap-[10px]'>
                        <label className='max-[650px]:text-[15px]'>Book Description</label>
                        <ReactQuill
                            theme="snow"
                            onChange={(value) => {
                                setValue('productDescription', value)
                            }}
                        />
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productDescription?.message}</b>
                </div>
                <div className='mt-[40px] w-[40%] flex flex-col items-center  gap-[10px] max-[650px]:w-[100%] max-[650px]:mb-[50px] max-[650px]:mt-[0px]'>
                    <div className='w-[100%] flex flex-col gap-[10px] max-[650px]:w-[90%]'>
                        <label className='max-[650px]:text-[15px]'>Book Location</label>
                        <input
                            placeholder='Product Location'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] text-[12px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            {...register('productLocation')}
                        />
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productLocation?.message}</b>
                    <div className='w-[100%] flex flex-col gap-[10px] mt-[10px] max-[650px]:w-[90%] max-[650px]:mt-[0px]'>
                        <label className='max-[650px]:text-[15px] ' htmlFor="category">Book Category</label>
                        <select
                            id="category"
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            {...register('category')}
                        >
                            <option value="">Select a category</option>
                            {Object.keys(categories).map((categoryKey) => (
                                <option key={categoryKey} value={categoryKey}>
                                    {categoryKey}
                                </option>
                            ))}
                        </select>
                        <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.category?.message}</b>
                        {selectedCategory && (
                            <div className='w-[100%] flex flex-col gap-[10px] mt-[10px] max-[650px]:w-[100%]'>
                                <label className='max-[650px]:text-[15px]' htmlFor="subcategory">Book Subcategory</label>
                                <select
                                    id="subcategory"
                                    className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                                    {...register('subCategory')}
                                >
                                    <option value="">Select a subcategory</option>
                                    {categories[selectedCategory]?.subcategories.map(subcategory => (
                                        <option key={subcategory} value={subcategory}>{subcategory}</option>
                                    ))}
                                </select>
                                <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.subCategory?.message}</b>
                            </div>
                        )}

                    </div>
                    <div className='w-[100%] flex flex-col gap-[10px] max-[650px]:w-[90%]'>
                        <label className='max-[650px]:text-[15px]'>Add Book Image</label>
                        <div {...getProductImageRootProps()} className='border-dashed border-2 border-[grey] h-[80px] flex items-center justify-center '>
                            <input {...getProductImageInputProps()} />
                            <p className='text-center max-[650px]:text-[13px] '>Drag & drop an image here, or click to select file</p>
                        </div>
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productImage?.message}</b>
                    <div className='w-[100%] flex flex-col gap-[10px] max-[650px]:w-[90%]'>
                        <label className='max-[650px]:text-[15px]'>Add Book</label>
                        <div {...getEbookRootProps()} className='border-dashed border-2 border-[grey] h-[80px] flex items-center justify-center '>
                            <input {...getEbookInputProps()} />
                            <p className='text-center max-[650px]:text-[13px] '>Drag & drop ebook files here, or click to select files</p>
                        </div>
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.eBook?.message}</b>
                    <button
                        className='w-[100%] h-[50px] outline-none p-2 bg-[#FFC300] rounded-lg text-[20px] dark:text-[black] max-[650px]:w-[90%] '
                        type='button'
                        onClick={handleButtonClick}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loading /> : "Upload Product"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadEbook;
