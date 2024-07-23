import { Outlet } from "react-router-dom"
import { useMerchant } from "../../../../context/GetMerchant"
import { useNavigate } from "react-router-dom";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useState } from "react";
import SideBar from "../sidebar";

const Layout = () => {
    const navigate = useNavigate()
    const { data, error } = useMerchant();
    //  console.log(data);


    if (error?.response?.data?.message === "Token expired login again") {
        navigate('/')
    }
    const [showSideBar, setShowSidebar] = useState<boolean>(false)
    return (
        <div className=" w-[100%] h-[100%]  ">
            <div className="w-[100%] h-[10%] bg-[#FFC300] p-[10px] flex items-center gap-2 sticky rounded-bl-[20px]">
                <img src={data?.image} alt="" className="w-[40px] h-[40px] rounded-[100%] object-cover " />
                <p>{data?.fullName}</p>
            </div>
            <RxDragHandleDots2 className="absolute hidden max-[650px]:flex text-white" onClick={() => setShowSidebar(!showSideBar)} />
            {
                showSideBar &&
                <div className="absolute mt-[2px] w-[100%] h-[90vh] z-[100] bg-[#00000054] rounded-tl-[10px] flex">
                    <div className="w-[65%] bg-[#FFC300] h-[100%] ">
                        <SideBar />
                    </div>
                    <div className="w-[30%] h-[100%]" onClick={() => setShowSidebar(!showSideBar)}></div>
                </div>
            }
            <div className="w-[100%] h-[90%] p-[10px] dark:text-white ">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout