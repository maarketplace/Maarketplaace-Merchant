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

function UploadEbook() {
    const form = useForm<IAddEbook>({
        resolver: yupResolver(UploadEbookSchema) as any,
    });

    const { register, watch, handleSubmit, formState: { errors }, setValue } = form;
    const selectedCategory = watch('category');

    const { mutate, isLoading } = useMutation(['uploadebook'], uploadEbook, {
        onSuccess: async (data: any) => {
            console.log(data);
            toast.success(`${data?.data?.message}`);
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message);
        }
    });

    const onSubmit: SubmitHandler<IAddEbook> = (data) => {
        const { eBook, productImage, ...others } = data;
        mutate({ ...others, productImage: productImage?.[0], eBook: eBook?.[0] });
        console.log({ ...others, productImage: productImage?.[0], eBook: eBook?.[0] });
    };

    const handleButtonClick = () => {
        handleSubmit(onSubmit)();
        console.log('clicked');
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
        <div className="w-[100%] h-[100%] overflow-scroll " >
            <div className='w-[90%]  ml-[30px] flex flex-col gap-[5px] max-[650px]:w-[100%] max-[650px]:ml-[0px] max-[650px]:items-center '>
                <h3 className='text-[25px]'>Upload an Ebook</h3>
                <p className='text-[20px] max-[650px]:text-center'>Show the world what you are selling</p>
            </div>
            <div className='flex w-[100%] gap-[20px] max-[650px]:flex-col '>
                <div className='w-[40%] mt-[20px] flex flex-col items-center gap-[10px] max-[650px]:w-[100%] '>
                    <div className='w-[90%] flex flex-col gap-[10px] mt-[20px] '>
                        <label className='max-[650px]:text-[15px]'>Product Name</label>
                        <input
                            placeholder='Product Name'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                            {...register('productName')}
                        />
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productName?.message}</b>

                    <div className='w-[90%] flex flex-col gap-[10px]'>
                        <label className='max-[650px]:text-[15px]'>Product Price</label>
                        <input
                            placeholder='Product Price'
                            type='number'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            {...register('productPrice')}
                        />
                        <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productPrice?.message}</b>
                    </div>
                    <div className='w-[90%] flex flex-col gap-[10px]'>
                        <label className='max-[650px]:text-[15px]'>Discounted Price</label>
                        <input
                            placeholder='Discounted Price'
                            type='number'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            {...register('discountPrice')}
                        />
                        <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.discountPrice?.message}</b>
                    </div>
                    <div className='w-[90%] flex flex-col gap-[10px]'>
                        <label className='max-[650px]:text-[15px]'>Product Quantity</label>
                        <input
                            placeholder='Product Quantity'
                            type='number'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            {...register('quantity')}
                        />
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.quantity?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px]'>
                        <label className='max-[650px]:text-[15px]'>Product Location</label>
                        <input
                            placeholder='Product Location'
                            type='text'
                            className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            {...register('productLocation')}
                        />
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productLocation?.message}</b>
                    <div className='w-[90%] flex flex-col gap-[10px]'>
                        <label className='max-[650px]:text-[15px]'>Product Description</label>
                        <ReactQuill
                            theme="snow"
                            onChange={(value) => {
                                setValue('productDescription', value)
                            }}
                        />
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productDescription?.message}</b>
                </div>
                <div className='mt-[20px] w-[40%] flex flex-col items-center gap-[10px] max-[650px]:w-[100%] max-[650px]:mt-[0px]'>
                    <div className='w-[100%] flex gap-[20px] mt-[20px] max-[650px]:w-[90%] max-[650px]:flex-col max-[650px]:mt-[0px] '>
                        <span className='w-[90%] flex flex-col gap-[10px] max-[650px]:w-[100%]'>
                            <label>Add Category</label>
                            <input
                                placeholder='Add Category'
                                className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            />
                        </span>
                        <span className='w-[90%] flex flex-col gap-[10px] max-[650px]:w-[100%]'>
                            <label htmlFor="">Add Sub Category</label>
                            <input
                                placeholder='Add Sub Category'
                                className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                            />
                        </span>
                    </div>
                    <div className='w-[100%] flex flex-col gap-[10px] mt-[10px] max-[650px]:w-[90%] max-[650px]:mt-[0px] '>
                        <label className='max-[650px]:text-[15px]' htmlFor="category">Select Category</label>
                        <select id="category" className='w-[100%] h-[45px] outline-none p-[10px] border border-[grey] bg-transparent max-[650px]:text-[12px]' {...register('category')}>
                            <option value="">Select a category</option>
                            <option>Select a category</option>
                            <option>Select a category</option>
                            <option>Select a category</option>
                            <option>Select a category</option>
                        </select>
                        <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.category?.message}</b>
                        {selectedCategory && (
                            <>
                                <label className='max-[650px]:text-[15px]' htmlFor="subcategory">Select Subcategory</label>
                                <select id="subcategory" className='max-[650px]:text-[15px]' {...register('subCategory')}>
                                    <option value="">Select a subcategory</option>
                                    {/* {categories[selectedCategory].subcategories.map(subcategory => (
                                        <option key={subcategory} value={subcategory}>{subcategory}</option>
                                    ))} */}
                                </select>
                                <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.subCategory?.message}</b>
                            </>
                        )}
                    </div>
                    <div className='w-[100%] flex flex-col gap-[10px] max-[650px]:w-[90%]'>
                        <label className='max-[650px]:text-[15px]'>Add Ebook Image</label>
                        <div {...getProductImageRootProps()} className='border-dashed border-2 border-[grey] h-[80px] flex items-center justify-center '>
                            <input {...getProductImageInputProps()} />
                            <p className='text-center max-[650px]:text-[13px] '>Drag & drop an image here, or click to select file</p>
                        </div>
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productImage?.message}</b>
                    <div className='w-[100%] flex flex-col gap-[10px] max-[650px]:w-[90%]'>
                        <label className='max-[650px]:text-[15px]'>Add Ebook</label>
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
                        {isLoading ? "Uploading Product..." : "Upload Product"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadEbook;
