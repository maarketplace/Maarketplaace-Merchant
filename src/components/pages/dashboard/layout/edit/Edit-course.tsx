import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { updateEbook } from '../../../../../api/mutation';
import { getOneProduct } from '../../../../../api/query';
import { IUpdateEbook } from '../../../../../interface/UploadEbook';
import { UpdateEbookSchema} from '../../../../../schema/UploadEbookSchema';
import Loading from '../../../../../loader';
import { useEffect, useState } from 'react';
import { IErrorResponse } from '../../../../../interface/ErrorInterface';
import ReactQuill from 'react-quill';
import { IUpdateCourse } from '../../../../../interface/UploadCourse';

function EditEbook() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [productImageName, setProductImageName] = useState('');
    const [eBookName, setEBookName] = useState('');
    const [product, setProduct] = useState<IUpdateCourse>({
        productName: '',
        productPrice: 0,
        discountPrice: 0,
        author: '',
        duration: '',
        productDescription: '',
        pages: 0,
        category: '',
        productImage: null,
        eBook: null,
        subCategory: '',
        productLocation: '',
        whatToExpect: '',
        topics: '',
    })
    const [description, setDescription] = useState('');


    useEffect(() => {
        setDescription(product?.productDescription || '');
    }, [product?.productDescription]);


    const form = useForm<IUpdateEbook>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver(UpdateEbookSchema) as any,
    });
    const { register, handleSubmit, setValue, formState: { errors } } = form;
    const { data: productDetails, isLoading: detailsLoading } = useQuery(['ebookDetails', id], () => getOneProduct(id), {
        onSuccess: () => {
            setProduct(productDetails?.data?.data?.data?.product[0])
        },
        onError: () => {
            toast.error('Failed to fetch eBook details');
        },
    });

    useEffect(() => {
        if (productDetails?.data?.data?.data?.product[0]) {
            setValue('productName', product?.productName);
            setValue('productPrice', product?.productPrice);
            setValue('discountPrice', product?.discountPrice);
            setValue('author', product?.author);
            setValue('duration', product?.duration);
            setValue('productDescription', product?.productDescription);
            setValue('pages', product?.pages);
        }
    }, [product?.author, product?.discountPrice, product?.duration, product?.pages, product?.productDescription, product?.productName, product?.productPrice, productDetails, setValue]);

    const { mutate, isLoading } = useMutation(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ data, id }: { data: IUpdateEbook; id: string | undefined }) => updateEbook(data, id as string),
        {
            onSuccess: () => {
                toast.success(`Ebook updated successfully!`);
                navigate('/dashboard/store')
            },
            onError: (err: IErrorResponse) => {
                toast.error(err?.response?.data?.message || 'An error occurred');
            },
        }
    );

    const onDropProductImage = (acceptedFiles: File[]) => {
        setValue('productImage', acceptedFiles[0]);
        console.log(acceptedFiles[0]);
        setProductImageName(acceptedFiles[0]?.name || '');
    };

    const { getRootProps: getProductImageRootProps, getInputProps: getProductImageInputProps } = useDropzone({
        onDrop: onDropProductImage,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
    });

    const onDropEbook = (acceptedFiles: File[]) => {
        const fileList = new DataTransfer();
        fileList.items.add(acceptedFiles[0]);
        setValue('eBook', fileList.files);
        setEBookName(acceptedFiles[0]?.name || '');
    };

    const { getRootProps: getEbookRootProps, getInputProps: getEbookInputProps } = useDropzone({
        onDrop: onDropEbook,
        accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] },
    });

    const onSubmit: SubmitHandler<IUpdateEbook> = (info) => {
        const { productImage, eBook, ...otherFields } = info;
        console.log(info);
        mutate({
            id,
            data: {
                ...otherFields,
                productImage: productImage,
                eBook: eBook,
            },
        });

    };
    const handleButtonClick = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <div className="edit-ebook-form max-[650px]:mt-[30px]">
            <div className='marquee flex w-[70%] justify-center max-[650px]:w-[100%] '>
                <p>The ebook file size must be below 9.5 MB. If your file exceeds this limit, please compress it using this <a href="https://www.ilovepdf.com/compress_pdf" className='text-blue-500'>PDF compressor</a>.</p>
            </div>
            <div className='flex max-[650px]:flex-col'>
                <div className='flex w-[100%] gap-[20px] max-[650px]:flex-col'>
                    <div className='w-[40%] mt-[20px] flex flex-col items-center gap-[10px] max-[650px]:w-[100%] '>
                        <div className='w-[90%] flex flex-col gap-[10px] mt-[20px] '>
                            <label className='max-[650px]:text-[15px]'>Product Name</label>
                            <input
                                placeholder='Product Name'
                                type='text'
                                className='w-[100%] h-[45px] outline-none p-[10px] text-[12px] border border-[grey]  bg-transparent max-[650px]:text-[12px]'
                                {...register('productName')}
                                disabled={detailsLoading}
                            />
                        </div>
                        <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productName?.message}</b>

                        <div className='w-[90%] flex flex-col gap-[10px]'>
                            <label className='max-[650px]:text-[15px]'>Product Price</label>
                            <input
                                placeholder='Product Price'
                                type='number'
                                className='w-[100%] h-[45px] outline-none p-[10px] text-[12px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                                {...register('productPrice')}
                                disabled={detailsLoading}
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
                                disabled={detailsLoading}
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
                                disabled={detailsLoading}
                            />
                            <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.author?.message}</b>
                        </div>
                        <div className='w-[90%] flex flex-col gap-[10px]'>
                            <label className='max-[650px]:text-[15px]'>Duration</label>
                            <input
                                placeholder='Duration'
                                type='text'
                                className='w-[100%] h-[45px] outline-none p-[10px] text-[12px] border border-[grey] bg-transparent max-[650px]:text-[12px]'
                                {...register('duration')}
                                disabled={detailsLoading}
                            />
                            <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.duration?.message}</b>
                        </div>
                        <div className='w-[90%] flex flex-col gap-[10px]'>
                            <label className='max-[650px]:text-[15px]'>Product Description</label>
                            <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={(value) => {
                                    setDescription(value);
                                    setValue('productDescription', value);
                                }}
                            />

                        </div>
                        <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productDescription?.message}</b>
                    </div>
                </div>
                <div className='mt-[40px] w-[40%] flex flex-col items-center  gap-[10px] max-[650px]:w-[100%] max-[650px]:mb-[50px] max-[650px]:mt-[0px]'>
                    <div className='w-[100%] flex flex-col gap-[10px] max-[650px]:w-[90%]'>
                        <label className='max-[650px]:text-[15px]'>Update Product Image</label>
                        <div {...getProductImageRootProps()} className='border-dashed border-2 border-[grey] h-[80px] flex items-center justify-center '>
                            <input {...getProductImageInputProps()} />
                            <p className='text-center max-[650px]:text-[13px] '>{productImageName || 'Drag and drop a product image, or click to select one'}</p>
                        </div>
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.productImage?.message}</b>
                    <div className='w-[100%] flex flex-col gap-[10px] max-[650px]:w-[90%]'>
                        <label className='max-[650px]:text-[15px]'>Update Book File</label>
                        <div {...getEbookRootProps()} className='border-dashed border-2 border-[grey] h-[80px] flex items-center justify-center '>
                            <input {...getEbookInputProps()} />
                            <p className='text-center max-[650px]:text-[13px] '>{eBookName || 'Drag and drop an eBook file, or click to select one max size is 9.5mb'}</p>
                        </div>
                    </div>
                    <b className='w-[90%] text-[red] text-[12px] max-[650px]:w-[90%]'>{errors.eBook?.message}</b>

                    <button
                        type="submit"
                        disabled={isLoading}
                        onClick={handleButtonClick}
                        className={`w-[100%] h-[50px] outline-none p-2 bg-[#FFC300] rounded-lg text-[20px] dark:text-[black] max-[650px]:w-[90%] ${
                            isLoading ? 'cursor-not-allowed opacity-50' : ''
                        }`}                    >
                        {isLoading ? <Loading /> : 'Update eBook'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditEbook;
