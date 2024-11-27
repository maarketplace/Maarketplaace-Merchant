const { VITE_TOKEN } = import.meta.env;
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getOneMerchantAllProduct } from "../../../../../api/query";
import { useMerchant } from "../../../../../context/GetMerchant";
import { useNavigate } from "react-router-dom";
import { TbUserEdit } from "react-icons/tb";
import { IProduct } from "../../../../../interface/ProductInterface";
import { merchantDeleteProduct, updateMerchantImage } from "../../../../../api/mutation";
import { FaEllipsisV, FaUser } from "react-icons/fa";
import Loading from "../../../../../loader";
import { IErrorResponse } from "../../../../../interface/ErrorInterface";
import { copyToClipboard } from "../../../../../utils/Utils";

const Store = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const { data } = useMerchant();
    const [allProduct, setAllProduct] = useState<IProduct[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false); 
    const [imagePreview, setImagePreview] = useState<string | null>(null); 
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [err, setErr] = useState('')
    const [menuVisibility, setMenuVisibility] = useState<Record<string, boolean>>({});
    useEffect(() => {
        if (err === "Token expired login again") {
            toast.error(err);
            setTimeout(() => {
                navigate('/');
                localStorage.clear()
            }, 1000);
        }
    }, [err, navigate])
    const {
        data: StoreData
    } = useQuery(["getOneMerchantAllProduct", data?._id], getOneMerchantAllProduct, {
        enabled: !!localStorage.getItem(VITE_TOKEN),
        onSuccess: () => { },
        onError: (error: IErrorResponse) => {
            // console.log(error);
            setErr(error?.response?.data?.message)
        },
    });

    useEffect(() => {
        if (StoreData && StoreData.data && StoreData.data.data && Array.isArray(StoreData?.data?.data?.data)) {
            const reversedData = [...StoreData.data.data.data].reverse();
            setAllProduct(reversedData);
        }

    }, [StoreData]);

    const { mutate, isLoading } = useMutation(['updateMerchantimage'], updateMerchantImage, {
        onSuccess: () => {
            queryClient.invalidateQueries("getMerchant")
            toast.success('Profile picture updated successfully!');
            setShowModal(false);
        },
        onError: () => {
            toast.error('Failed to update profile picture.');
        }
    });
    const { mutate: DeleteProductMutate } = useMutation(
        (productId: string) => merchantDeleteProduct(productId),
        {
            onSuccess: () => {
                toast.success('Product deleted successfully', {
                    style: {
                        textAlign: 'center'
                    }
                });
                queryClient.invalidateQueries("getOneMerchantAllProduct");
            },
            onError: (error: IErrorResponse) => {
                console.error('Error deleting product:', error);
                toast.error(error.response?.data?.message || 'An error occurred while deleting the product.');
            },
        }
    );
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setImagePreview(URL.createObjectURL(event.target.files[0]));
            setShowModal(true);
        }
    };

    const handleProfilePictureUpdate = () => {
        if (selectedFile) {
            mutate(selectedFile);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        } else {
            console.error("File input ref is not set");
        }
    };

    const toggleMenu = (productId: string) => {
        setMenuVisibility((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    return (
        <div className="w-[100%] flex items-center justify-center flex-col">
            <div className="w-[95%] mt-[30px] h-[auto] p-[2%] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 rounded-[16px]  max-[650px]:w-[95%] max-[650px]:p-[2%]">
                <div className="w-[60%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:items-center ">
                    <div className=" w-[100%] flex items-center gap-5 max-[650px]:flex-col">
                        <span className="flex flex-col items-center gap-[10px] relative">
                            {data?.data?.image ? (
                                <>
                                    <img src={data?.data?.image} alt="" className="w-[150px] h-[150px] rounded-[100%] object-cover max-[650px]:w-[80px] max-[650px]:h-[80px] " />
                                    <TbUserEdit
                                        className=" text-[30px] absolute bottom-[20px] left-[120px] text-[black] cursor-pointer max-[650px]:left-[110px] max-[650px]:bottom-[25px] dark:text-white "
                                        onClick={triggerFileInput}
                                    />
                                </>
                            ) : (
                                <FaUser className="w-[150px] h-[150px] rounded-[100%] object-cover  max-[650px]:w-[80px] max-[650px]:h-[80px] dark:text-[#FFC300]" />
                            )}
                            <p className="text-[10px] font-bold hidden max-[650px]:flex ">{data?.data?.profession}</p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </span>
                        <span className="h-[100px] w-[50%] gap-2 max-[650px]:w-[100%] max-[650px]:flex max-[650px]:items-center max-[650px]:flex-col">
                            {
                                data?.data?.business_name && <p className="text-clamp text-center max-[650px]:text-[20px]">@{data?.data?.business_name}</p>
                            }
                            <p className="text-[12px] max-[650px]:text-center">{data?.data?.bio}</p>
                        </span>
                        <span className="flex gap-2 w-[40%] justify-center max-[650px]:w-[100%]">
                            <p className="text-[12px] bg-[#eae7e7] p-1 rounded-[4px] dark:bg-[#2c2c2c]">{data?.data.followedUsers.length} Followers</p>
                            <p
                                className="text-[12px] bg-[#eae7e7] p-1 rounded-[4px] dark:bg-[#2c2c2c]"
                                onClick={() => copyToClipboard(`https://maarketplaace.com/#/home/store/${data?.data?.business_name}`)}
                            >
                                Share store
                            </p>
                        </span>
                    </div>
                    <div className="w-[100%] flex  items-center ">
                        <p className="text-[12px] font-bold max-[650px]:hidden ">{data?.data?.profession}</p>
                    </div>
                </div>
            </div>
            <div className="w-[95%] mt-[40px] flex flex-wrap gap-[10px] max-[650px]:justify-center max-[650px]:w-[100%]">
                {
                    allProduct?.map((i: IProduct) => (
                        <div className="w-[200px] border relative flex flex-col items-center p-[10px] gap-[10px] max-[650px]:w-[300px] rounded-[8px] max-[320px]:w-[90%]">
                            <img src={i?.productImage} alt="" className="w-[100%] h-[200px] object-cover aspect-square " />
                            <span className="w-full">
                                <p className="max-[650px]:text-[12px] text-[14px]">{i?.productName}</p>
                            </span>
                            <span className="flex gap-2 w-full justify-between">
                                <button
                                    className="w-[50%] p-[2px] bg-[#FFC300] rounded-[4px] text-[12px] text-black"
                                    onClick={() => {
                                        navigate(`/dashboard/quicks/${i?._id}`)
                                    }}
                                >
                                    Add Quicks
                                </button>
                                <FaEllipsisV
                                    className="cursor-pointer"
                                    onClick={() => toggleMenu(i._id)}
                                />
                            </span>
                            {menuVisibility[i._id] && (
                                <div className="absolute bottom-10 right-2 bg-white shadow-lg rounded p-2 flex flex-col gap-2 z-10">
                                    <button
                                        className="text-red-500 text-sm"
                                        onClick={() => DeleteProductMutate(i._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="text-blue-500 text-sm"
                                        onClick={() => navigate(`/dashboard/edit-product/${i._id}`)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
            <div className="w-full flex items-center justify-center h-[100px] gap-2">
                <p className="h-[10px] text-[12px]">Powered by</p>
                <img src='./LOGO.svg' alt="" className="w-[100px] h-[50px]" />
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg dark:text-black">
                        <img src={imagePreview!} alt="Profile Preview" className="w-[150px] h-[150px] rounded-full object-cover mb-4" />
                        <div className="flex justify-between">
                            <button onClick={handleProfilePictureUpdate} className="p-[5px] w-[80px] rounded-[4px] bg-[#FFC300] text-[12px] " disabled={isLoading}>
                                {isLoading ? <Loading width="20px" height="20px" /> : " Update"}
                            </button>
                            <button onClick={() => setShowModal(false)} className="p-[5px] text-[12px]">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Store;
