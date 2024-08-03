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

const Store = () => {
    const navigate = useNavigate();
    const { data } = useMerchant();
    const [allProduct, setAllProduct] = useState<IProduct[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);  // State for modal visibility
    const [imagePreview, setImagePreview] = useState<string | null>(null);  // State for image preview
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    allProduct
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
            setShowModal(false);  // Close the modal on success
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

    return (
        <div className="w-[100%] flex items-center justify-center">
            <div className="w-[95%] mt-[30px] h-[auto] p-[5%] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 rounded-[16px]">
                <div className="w-[60%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:items-center ">
                    <div className=" w-[100%] flex items-center gap-5 max-[650px]:flex-col">
                        <span className="flex flex-col items-center gap-[10px] relative">
                            {data?.image ? (
                                <>
                                    <img src={data?.image} alt="" className="w-[150px] h-[150px] rounded-[100%] object-cover " />
                                    <TbUserEdit
                                        className=" text-[30px] absolute bottom-[20px] left-[120px] text-[black] cursor-pointer max-[650px]:bottom-[40px] dark:text-white"
                                        onClick={triggerFileInput}
                                    />
                                </>
                            ) : (
                                <FaUser className="w-[150px] h-[150px] rounded-[100%] object-cover " />
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
                            <p className="text-clamp">{data?.business_name}</p>
                            <p className="text-[12px] max-[650px]:text-center">{data?.bio}</p>
                        </span>
                    </div>
                    <div className="w-[150px] flex justify-center items-center ">
                        <p className="text-[12px] font-bold max-[650px]:hidden ">{data?.profession}</p>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <img src={imagePreview!} alt="Profile Preview" className="w-[150px] h-[150px] rounded-full object-cover mb-4" />
                        <div className="flex justify-between">
                            <button onClick={handleProfilePictureUpdate} className="btn btn-primary" disabled={isLoading}>
                               {isLoading ? "Updating": " Update"}
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
