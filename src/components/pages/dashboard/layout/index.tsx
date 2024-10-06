import { Outlet } from "react-router-dom"
import { useMerchant } from "../../../../context/GetMerchant"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SideBar from "../sidebar";
import { HiMenuAlt2 } from "react-icons/hi";
const Layout = () => {
    const navigate = useNavigate()
    const { data, err } = useMerchant();

    if (err === "Token expired login again") {
        navigate('/')
    }
    const [showSideBar, setShowSidebar] = useState<boolean>(false)
    return (
        <div className=" w-[100%] h-[85vh] dark:bg-black scrollbar-hide">
            <div className="w-[100%] bg-[#FFC300] p-[10px] flex items-center  rounded-bl-[20px]  max-[650px]:w-[100%] sticky top-0 z-50 ">
                <span className="w-[30%] max-[650px]:w-[50%]">
                    <HiMenuAlt2 className=" text-[30px] hidden max-[650px]:flex" onClick={() => setShowSidebar(!showSideBar)} />
                </span>
                <span className="w-[100%] flex justify-end items-center max-[650px]:w-[80%] gap-2 sticky">
                    <img src={data?.image} alt="" className="w-[40px] h-[40px] rounded-[100%] object-cover " />
                    <p>{data?.fullName}</p>
                </span>
            </div>
            {
                showSideBar &&
                <div className="absolute mt-[2px] w-[100%] h-[90vh] z-[100] bg-[#00000054] rounded-tl-[10px] flex">
                    <div className="w-[75%] bg-[#FFC300] h-[100%] ">
                        <SideBar setShowSidebar={setShowSidebar} />
                    </div>
                    <div className="w-[30%] h-[100%]" onClick={() => setShowSidebar(!showSideBar)}></div>
                </div>
            }
            <div className="w-[100%] h-[90%] p-[10px] dark:text-white dark:bg-black scrollbar-hide">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout