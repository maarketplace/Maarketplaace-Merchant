const { VITE_TOKEN } = import.meta.env;
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { getOneMerchantAllProduct } from "../../../../../api/query";
import { useMerchant } from "../../../../../context/GetMerchant";
import { useNavigate } from "react-router-dom";

const Store = () => {
    const navigate = useNavigate()
    const { data } = useMerchant();
    const [allProduct, setAllProduct] = useState<any>([])
    console.log(allProduct);
    
    const {
        data: StoreData
    } = useQuery(["getOneMerchantAllProduct", data?._id], getOneMerchantAllProduct, {
        enabled: !!localStorage.getItem(VITE_TOKEN),
        onSuccess: () => {
        },
        onError: (error: any) => {
            if (error?.response?.data?.message) {
                console.log(error?.response?.data?.message)
                toast.error(error?.response?.data?.message)
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else if (error?.response?.data?.status == false) {
                navigate('/')
            }
        },
    });
    useEffect(() => {
        if (StoreData && StoreData.data && StoreData.data.data && Array.isArray(StoreData.data.data.data)) {
            const reversedData = [...StoreData.data.data.data].reverse();
            setAllProduct(reversedData);
        }
    }, [StoreData])
    return (
        <div className="w-[100%] flex items-center justify-center">
            <div className="w-[95%] mt-[30px] p-[20px] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 rounded-[16px]">
                <div className="w-[60%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:items-center ">
                    <div className=" w-[100%] flex items-center gap-5 max-[650px]:flex-col">
                        <span className="flex flex-col items-center gap-[10px]">
                            <img src={data?.image} alt="" className="w-[150px] h-[150px] rounded-[100%] object-cover " />
                            <p className="text-[10px] font-bold hidden max-[650px]:flex ">{data?.profession?.slice(0, 17)}</p>
                        </span>
                        <span className="h-[100px] w-[50%] gap-2 max-[650px]:w-[100%] max-[650px]:flex max-[650px]:items-center max-[650px]:flex-col">
                            <p className="text-[40px]">{data?.business_name}</p>
                            <p className="text-[12px] max-[650px]:text-center">{data?.bio}</p>
                        </span>
                    </div>
                    <div className="w-[150px] flex justify-center items-center ">
                        <p className="text-[12px] font-bold max-[650px]:hidden ">{data?.profession?.slice(0, 17)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Store