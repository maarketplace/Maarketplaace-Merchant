import { useMerchant } from "../../../../../context/GetMerchant";

const Store = () => {
    const { data } = useMerchant();

    return (
        <div className="w-[100%] flex items-center justify-center">
            <div className="w-[95%] mt-[30px] p-[20px] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 rounded-[16px]">
                <div className="w-[60%] flex flex-col gap-[10px] max-[650px]:w-[100%] max-[650px]:items-center ">
                    <div className=" w-[100%] flex items-center gap-5 max-[650px]:flex-col">
                        <span className="flex flex-col items-center gap-[10px]">
                            <img src={data?.image} alt="" className="w-[150px] h-[150px] rounded-[100%] object-cover " />
                            <p className="text-[10px] font-bold hidden max-[650px]:flex">{data?.profession?.slice(0, 17)}</p>
                        </span>
                        <span className="h-[100px] gap-2 max-[650px]:w-[100%] max-[650px]:flex max-[650px]:items-center max-[650px]:flex-col">
                            <p className="text-[30px]">{data?.business_name}</p>
                            <p className="text-[12px] max-[650px]:text-center">{data?.bio}</p>
                        </span>
                    </div>
                    <div className="w-[150px] flex justify-center items-center ">
                        <p className="text-[10px] font-bold max-[650px]:hidden ">{data?.profession?.slice(0, 17)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Store