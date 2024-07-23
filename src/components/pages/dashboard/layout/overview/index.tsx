import { IoWalletOutline, IoCardOutline, IoBagHandleOutline } from "react-icons/io5";
import { PiUsersFourThin } from "react-icons/pi";


const Overview = () => {
    return (
        <div className="w-[100%] h-[100%] flex items-center justify-center">
            <div className="w-[100%] h-[85vh] p-[10px] flex justify-center gap-[10px] max-[650px]:flex-col" >
                <div className="w-[18%] h-[100px] border flex p-[10px] justify-center gap-[10px] rounded-[8px] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 dark:border-none max-[650px]:w-[100%]">
                    <span className="w-[80%] h-[90%] p-[10px] flex flex-col gap-[10px] ">
                        <p className="text-[12px]" >Available Balance </p>
                        <p className="text-[18px]" >0.00</p>
                    </span>
                    <span className="w-[30px] h-[28px] flex justify-center items-center rounded-[100%] bg-black relative top-[10px] p-[5px] ">
                        <IoWalletOutline className="w-[25px] h-[25px] text-white dark:text-[#F3C200] " />
                    </span>
                </div>
                <div className="w-[18%] h-[100px] border flex p-[10px] justify-center gap-[10px] rounded-[8px] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 dark:border-none max-[650px]:w-[100%]">
                    <span className="w-[80%] h-[90%] p-[10px] flex flex-col gap-[10px] ">
                        <p className="text-[12px]">Total Withdraw </p>
                        <p className="text-[18px]">0.00</p>
                    </span>
                    <span className="w-[30px] h-[28px] flex justify-center items-center rounded-[100%] bg-black relative top-[10px] p-[5px] ">
                        <IoCardOutline className="w-[25px] h-[25px] text-white dark:text-[#F3C200] " />
                    </span>
                </div>
                <div className="w-[18%] h-[100px] border flex p-[10px] justify-center gap-[10px] rounded-[8px] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 dark:border-none max-[650px]:w-[100%]">
                    <span className="w-[80%] h-[90%] p-[10px] flex flex-col gap-[10px] ">
                        <p className="text-[12px]">Total Product </p>
                        <p className="text-[18px]">0.00</p>
                    </span>
                    <span className="w-[30px] h-[28px] flex justify-center items-center rounded-[100%] bg-black relative top-[10px] p-[5px] ">
                        <IoCardOutline className="w-[25px] h-[25px] text-white dark:text-[#F3C200] " />
                    </span>
                </div>
                <div className="w-[18%] h-[100px] border flex p-[10px] justify-center gap-[10px] rounded-[8px] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 dark:border-none max-[650px]:w-[100%]">
                    <span className="w-[80%] h-[90%] p-[10px] flex flex-col gap-[10px] ">
                        <p className="text-[12px]">Total Order </p>
                        <p className="text-[18px]">0.00</p>
                    </span>
                    <span className="w-[30px] h-[28px] flex justify-center items-center rounded-[100%] bg-black relative top-[10px] p-[5px] ">
                        <IoBagHandleOutline className="w-[25px] h-[25px] text-white dark:text-[#F3C200] " />
                    </span>
                </div>
                <div className="w-[18%] h-[100px] border flex p-[10px] justify-center gap-[10px] rounded-[8px] shadow-lg shadow-grey-500/50 bg-slate-50  dark:bg-[#1D1C1C] dark:shadow-white-500/50 dark:border-none max-[650px]:w-[100%]">
                    <span className="w-[80%] h-[90%] p-[10px] flex flex-col gap-[10px] ">
                        <p className="text-[12px]">Total Customer </p>
                        <p className="text-[18px]">0.00</p>
                    </span>
                    <span className="w-[30px] h-[28px] flex justify-center items-center rounded-[100%] bg-black relative top-[10px] p-[5px] ">
                        <PiUsersFourThin className="w-[25px] h-[25px] text-white dark:text-[#F3C200] " />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Overview