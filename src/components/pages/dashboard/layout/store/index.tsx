const { VITE_TOKEN } = import.meta.env;
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { getOneMerchantAllProduct } from "../../../../../api/query";
import { useMerchant } from "../../../../../context/GetMerchant";
import { useNavigate } from "react-router-dom";
import { TbUserEdit } from "react-icons/tb";
import { IProduct } from "../../../../../interface/ProductInterface";
import { updateMerchantImage } from "../../../../../api/mutation";
import { FaUser } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { RiShareForwardLine } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";

const Store = () => {
    const navigate = useNavigate();
    const { data } = useMerchant();
    const [allProduct, setAllProduct] = useState<IProduct[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);  // State for modal visibility
    const [imagePreview, setImagePreview] = useState<string | null>(null);  // State for image preview
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const {
        data: StoreData
    } = useQuery(["getOneMerchantAllProduct", data?._id], getOneMerchantAllProduct, {
        enabled: !!localStorage.getItem(VITE_TOKEN),
        onSuccess: () => { },
        onError: (error: any) => {
            if (error?.response?.data?.status == false) {
                toast.error(error?.response?.data?.message);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        },
    });

    useEffect(() => {
        if (StoreData && StoreData.data && StoreData.data.data && Array.isArray(StoreData.data.data.data)) {
            const reversedData = [...StoreData.data.data.data].reverse();
            setAllProduct(reversedData);
        }

    }, [StoreData]);

    const { mutate, isLoading } = useMutation(['updateMerchantimage'], updateMerchantImage, {
        onSuccess: () => {
            toast.success('Profile picture updated successfully!');
            setShowModal(false);
        },
        onError: () => {
            toast.error('Failed to update profile picture.');
        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setImagePreview(URL.createObjectURL(event.target.files[0]));  // Create a preview URL for the selected image
            setShowModal(true);  // Show the modal when an image is selected
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
    const copyToClipboard = (text: string) => {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        toast.success('Link copied successfully!');
    };
    // onClick={() => copyToClipboard(`https://maarketplaace.com/#/userhome/admin_store/${value?._id}`)}
    return (
        <div className="w-[100%] flex items-center justify-center flex-col">
            <div className="w-[95%] mt-[30px] h-[auto] p-[2%] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 rounded-[16px]  max-[650px]:w-[90%] max-[650px]:p-[2%]">
                <div className="w-[60%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:items-center ">
                    <div className=" w-[100%] flex items-center gap-5 max-[650px]:flex-col">
                        <span className="flex flex-col items-center gap-[10px] relative">
                            {data?.image ? (
                                <>
                                    <img src={data?.image} alt="" className="w-[150px] h-[150px] rounded-[100%] object-cover max-[650px]:w-[80px] max-[650px]:h-[80px] " />
                                    <TbUserEdit
                                        className=" text-[30px] absolute bottom-[20px] left-[120px] text-[black] cursor-pointer max-[650px]:left-[120px] max-[650px]:bottom-[40px] dark:text-white "
                                        onClick={triggerFileInput}
                                    />
                                </>
                            ) : (
                                <FaUser className="w-[150px] h-[150px] rounded-[100%] object-cover  max-[650px]:w-[80px] max-[650px]:h-[80px] dark:text-[#FFC300]" />
                            )}
                            <p className="text-[10px] font-bold hidden max-[650px]:flex ">{data?.profession}</p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </span>
                        <span className="h-[100px] w-[50%] gap-2 max-[650px]:w-[100%] max-[650px]:flex max-[650px]:items-center max-[650px]:flex-col">
                            <p className="text-clamp">@{data?.business_name}</p>
                            <p className="text-[12px] max-[650px]:text-center">{data?.bio}</p>
                        </span>
                    </div>
                    <div className="w-[100%] flex  items-center ">
                        <p className="text-[12px] font-bold max-[650px]:hidden ">{data?.profession}</p>
                    </div>
                    <div className="flex gap-[20px]  w-[35%] max-[650px]:w-[70%] text-[16px] p-[10px]">
                        <span className="flex gap-[5px] items-center">
                            <p>4</p>
                            <IoHeart/>
                        </span>
                        <span className="flex gap-[5px] items-center">
                           <BsPeople />
                        </span>
                        <span className="flex gap-[5px] items-center" onClick={()=> copyToClipboard(`https://www.maarketplaace.com/#/home/store/${data?._id}`)}>
                            <RiShareForwardLine className="text-[20px]"/>
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-[95%] mt-[40px] flex flex-wrap gap-[20px] max-[650px]:justify-center max-[650px]:w-[100%]">
                {
                    allProduct?.map((i: IProduct) => (
                        <div className="w-[200px]rounded-[8px] border flex flex-col items-center p-[10px] gap-[10px] max-[650px]:w-[150px] rounded-[8px]">
                            <img src={i?.productImage} alt="" className="w-[100%] h-[200px] object-cover aspect-square " />
                            <span className="w-full">
                                <p className="max-[650px]:text-[12px] text-[14px]">{i?.productName}</p>
                            </span>
                            {
                                data?.role_slug !== "merchants"
                                    ?
                                    <button>Buy now</button>
                                    :
                                    <button className="w-full p-[2px] bg-[#FFC300] rounded-[4px]">Edit</button>
                            }
                        </div>
                    ))
                }
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg dark:text-black">
                        <img src={imagePreview!} alt="Profile Preview" className="w-[150px] h-[150px] rounded-full object-cover mb-4" />
                        <div className="flex justify-between">
                            <button onClick={handleProfilePictureUpdate} className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? "Updating" : " Update"}
                            </button>
                            <button onClick={() => setShowModal(false)} className="btn btn-secondary">
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
