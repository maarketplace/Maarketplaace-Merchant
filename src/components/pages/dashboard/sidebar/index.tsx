import { useState } from "react";
import { FiLogOut } from "react-icons/fi"
import { RxDashboard } from "react-icons/rx"
import { useNavigate } from "react-router-dom"
import { PiNotebookLight, PiUsersThree } from "react-icons/pi";
import { IoVideocamOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoQrCodeOutline,IoBagHandleOutline } from "react-icons/io5";


const SideBar = () => {
    const navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    return (
        <div className="w-[90%] h-[100%]">
            <div className="w-[100%] flex flex-col gap-[10px]">
                <span className="flex items-center gap-[30px] justify-center  h-[50px] cursor-pointer w-[100%] " onClick={() => navigate('/dashboard')}>
                    <RxDashboard className=" w-[20%] h-[15px] " />
                    <p className=" text-[15px] w-[80%] ">Dashboard</p>
                </span>
                <span className="flex items-center gap-[30px] justify-center  h-[50px] cursor-pointer w-[100%] " onClick={() => navigate('/dashboard')}>
                    <RxDashboard className=" w-[20%] h-[15px] " />
                    <p className=" text-[15px] w-[80%] ">Store</p>
                </span>
                <span
                    className="flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] "
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <IoCartOutline className=" w-[20%] h-[15px] " />
                    <p className=" text-[15px] w-[80%] ">Add Product</p>
                </span>
                {
                    showDropdown && (
                        <div className="ml-[30px] flex flex-col gap-[20px] w-[100%]">
                            <span className="flex items-center gap-[30px] justify-center h-[20px] cursor-pointer w-[90%] " onClick={() => navigate('/dashboard/course')}>
                                <IoVideocamOutline className=" w-[15%] h-[15px] " />
                                <p className=" text-[14px] w-[80%] ">Upload Course</p>
                            </span>
                            <span className="flex items-center gap-[30px] justify-center  h-[20px] cursor-pointer w-[90%] " onClick={() => navigate('/dashboard/ebook')}>
                                <PiNotebookLight className=" w-[15%] h-[15px] " />
                                <p className=" text-[14px] w-[80%] ">Upload E-book</p>
                            </span>
                        </div>
                    )
                }
                <span className="flex items-center gap-[30px] justify-center  h-[50px] cursor-pointer w-[100%] ">
                    <IoBagHandleOutline className=" w-[20%] h-[15px] " />
                    <p className=" text-[15px] w-[80%] ">Order</p>
                </span>
                <span className="flex items-center gap-[30px] justify-center  h-[50px] cursor-pointer w-[100%] ">
                    <IoQrCodeOutline className=" w-[20%] h-[15px] " />
                    <p className=" text-[15px] w-[80%] ">Transaction</p>
                </span>
                <span className="flex items-center gap-[30px] justify-center  h-[50px] cursor-pointer w-[100%] ">
                    <PiUsersThree className=" w-[20%] h-[20px] " />
                    <p className=" text-[15px] w-[80%] ">Customer</p>
                </span>
                <span className="flex items-center gap-[30px] justify-center  h-[50px] cursor-pointer w-[100%] ">
                    <FiLogOut className=" w-[20%] h-[15px] " />
                    <p className=" text-[15px] w-[80%] ">Log out</p>
                </span>
            </div>
        </div>
    )
}

export default SideBar