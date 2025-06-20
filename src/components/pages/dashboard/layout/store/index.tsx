const { VITE_TOKEN } = import.meta.env;
import { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getOneMerchantAllProduct } from "../../../../../api/query";
import { useMerchant } from "../../../../../context/GetMerchant";
import { useNavigate } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import { IProduct } from "../../../../../interface/ProductInterface";
import { merchantDeleteProduct, updateMerchantImage } from "../../../../../api/mutation";
import { IErrorResponse } from "../../../../../interface/ErrorInterface";
import { copyToClipboard } from "../../../../../utils/Utils";
import ProfileSection from "./ProfileSection";
import ProductCard from "./ProductCard";
import ImageUploadModal from "./ImageUpload";

const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <TbPlus className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No products yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
            Start adding products to showcase your store
        </p>
    </div>
);

const Store = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data } = useMerchant();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [allProduct, setAllProduct] = useState<IProduct[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (error === "Token expired login again") {
            toast.error("Session expired. Please login again.");
            setTimeout(() => {
                navigate('/');
                localStorage.clear();
            }, 1000);
        }
    }, [error, navigate]);

    const { data: storeData } = useQuery(
        ["getOneMerchantAllProduct", data?._id],
        getOneMerchantAllProduct,
        {
            enabled: !!localStorage.getItem(VITE_TOKEN),
            onError: (error: IErrorResponse) => {
                setError(error?.response?.data?.message || 'An error occurred');
            },
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchInterval: false,
            retry: false,
            retryOnMount: false,
        }
    );

    useEffect(() => {
        if (storeData?.data?.data?.data && Array.isArray(storeData.data.data.data)) {
            const reversedData = [...storeData.data.data.data].reverse();
            setAllProduct(reversedData);
        }
    }, [storeData]);

    const { mutate: updateImage, isLoading: isUpdatingImage } = useMutation(
        ['updateMerchantimage'],
        updateMerchantImage,
        {
            onSuccess: () => {
                queryClient.invalidateQueries("getMerchant");
                toast.success('Profile picture updated successfully!');
                setShowModal(false);
                setSelectedFile(null);
                setImagePreview(null);
            },
            onError: () => {
                toast.error('Failed to update profile picture.');
            }
        }
    );

    const { mutate: deleteProduct, isLoading: isDeletingProduct } = useMutation(
        (productId: string) => merchantDeleteProduct(productId),
        {
            onSuccess: () => {
                toast.success('Product deleted successfully');
                queryClient.invalidateQueries("getOneMerchantAllProduct");
            },
            onError: (error: IErrorResponse) => {
                toast.error(error.response?.data?.message || 'Failed to delete product');
            },
        }
    );

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
            setShowModal(true);
        }
    }, []);

    const handleProfilePictureUpdate = useCallback(() => {
        if (selectedFile) {
            updateImage(selectedFile);
        }
    }, [selectedFile, updateImage]);

    const handleShareStore = useCallback(() => {
        const storeUrl = `https://maarketplaace.com/home/store/${data?.data?.business_name}`;
        copyToClipboard(storeUrl);
    }, [data?.data?.business_name]);

    const triggerFileInput = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    return (
        <div className="min-h-screen  dark:bg-black py-8 no-scrollbar mt-10">
            <div className="max-w-7xl mx-auto px-6">
                <ProfileSection
                    data={data}
                    onEditClick={triggerFileInput}
                    onShareClick={handleShareStore}
                />

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Products ({allProduct.length})
                        </h2>
                    </div>

                    {allProduct.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {allProduct.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onQuicksClick={() => navigate(`/dashboard/quicks/${product._id}`)}
                                    onEditClick={() => navigate(`/dashboard/edit-product/${product._id}`)}
                                    onDeleteClick={() => deleteProduct(product._id)}
                                    isDeleting={isDeletingProduct}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState />
                    )}
                </div>

                <div className=" absolute bottom-0 left-0 right-0 flex items-center justify-center mt-16 gap-2 text-gray-500 dark:text-gray-400">
                    <span className="text-sm">Powered by</span>
                    <img src='./LOGO.svg' alt="Logo" className="w-20 h-10" />
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
            />

            <ImageUploadModal
                isOpen={showModal}
                imagePreview={imagePreview}
                onConfirm={handleProfilePictureUpdate}
                onCancel={() => {
                    setShowModal(false);
                    setSelectedFile(null);
                    setImagePreview(null);
                }}
                isLoading={isUpdatingImage}
            />
        </div>
    );
};

export default Store;
