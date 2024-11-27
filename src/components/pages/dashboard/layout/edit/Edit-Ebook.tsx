import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { updateEbook } from '../../../../../api/mutation';
import { getOneProduct } from '../../../../../api/query';
import { IAddEbook } from '../../../../../interface/UploadEbook';
import { UploadEbookSchema } from '../../../../../schema/UploadEbookSchema';
import Loading from '../../../../../loader';
import { useEffect, useState } from 'react';
import { IErrorResponse } from '../../../../../interface/ErrorInterface';
import ReactQuill from 'react-quill';

function EditEbook() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [productImageName, setProductImageName] = useState('');
    const [eBookName, setEBookName] = useState('');
    const [product, setProduct] = useState<IAddEbook>({
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


    const form = useForm<IAddEbook>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver(UploadEbookSchema) as any,
    });
    const { register, handleSubmit, setValue, formState: { errors } } = form;

    const { data } = useQuery(['ebookDetails', id], () => getOneProduct(id), {
        onSuccess: () => {
            setProduct(data?.data?.data?.data?.product[0])
            setValue('productName', product.productName);
            setValue('productPrice', product.productPrice);
            setValue('discountPrice', product.discountPrice);
            setValue('author', product.author);
            setValue('duration', product.duration);
            setValue('productDescription', product.productDescription);
            setValue('pages', product.pages);
            setValue('category', product.category);
        },
        onError: () => {
            toast.error('Failed to fetch eBook details');
        },
    });

    useEffect(() => {
        if (data?.data?.data?.data?.product[0]) {
            const fetchedProduct = data.data.data.data.product[0];
            setProduct(fetchedProduct);
            Object.keys(fetchedProduct).forEach((key) => {
                setValue(key as keyof IAddEbook, fetchedProduct[key]);
            });
        }
    }, [data, setValue]);

    const { mutate, isLoading } = useMutation(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ data, id }: { data: any; id: string | undefined }) => updateEbook(data, id as string),
        {
            onSuccess: (response) => {
                const { productName } = response.data;
                toast.success(`Ebook '${productName}' updated successfully!`);
                navigate('/dashboard/store')
            },
            onError: (err: IErrorResponse) => {
                toast.error(err?.response?.data?.message || 'An error occurred');
            },
        }
    );

    const onDropProductImage = (acceptedFiles: File[]) => {
        const fileList = new DataTransfer();
        acceptedFiles.forEach((file) => fileList.items.add(file));
        setValue('productImage', fileList.files);
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

    const onSubmit: SubmitHandler<IAddEbook> = (data) => {
        const { productImage, eBook, ...otherFields } = data;
        mutate({
            id,
            data: {
                ...otherFields,
                productImage: productImage?.[0],
                eBook: eBook?.[0],
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
                                placeholder='Number Of Pages'
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
                        <label className='max-[650px]:text-[15px]'>Update Book Image</label>
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
                        className='w-[100%] h-[50px] outline-none p-2 bg-[#FFC300] rounded-lg text-[20px] dark:text-[black] max-[650px]:w-[90%] '

                    >
                        {isLoading ? <Loading /> : 'Update eBook'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditEbook;
