import { Outlet } from "react-router-dom"
import { useMerchant } from "../../../../context/GetMerchant"
const Layout = () => {
    const { data } = useMerchant();
        
    return (
        <div className=" w-[100%] h-[100%]  ">
            <div className="w-[100%] h-[10%] bg-[#FFC300] p-[10px] flex items-center sticky rounded-bl-[20px]">
                <p>Welcome! {data?.fullName}</p>
            </div>
            <div className="w-[100%] h-[90%] p-[10px] dark:text-white ">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout