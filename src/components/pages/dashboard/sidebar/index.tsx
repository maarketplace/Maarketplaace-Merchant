import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import { PiNotebookLight, PiUsersThree } from "react-icons/pi";
import { IoVideocamOutline, IoCartOutline, IoQrCodeOutline, IoBagHandleOutline, IoStorefrontOutline } from "react-icons/io5";

interface SideBarProps {
    setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({setShowSidebar }: SideBarProps) => {
    const navigate = useNavigate();
    const location = useLocation(); // useLocation for active state
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleNavigate = (path: string) => {
        navigate(path);
        if (setShowSidebar) {
            setShowSidebar(false);
        }
    };

    const getActiveClass = (path: string) => {
        return location.pathname === path ? "bg-black text-white border-l-4 border-[#FFC300]" : ""; // Active state class
    };

    const handleLogoutClick = async () => {
        navigate('/');
        localStorage.clear();
    };

    return (
        <div className="w-[90%] h-[85vh] ">
            <div className="w-[100%] flex flex-col gap-[10px] dark:text-black">
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass('/dashboard')}`}
                    onClick={() => handleNavigate('/dashboard')}
                >
                    <RxDashboard className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Dashboard</p>
                </span>
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass('/dashboard/store')}`}
                    onClick={() => handleNavigate('/dashboard/store')}
                >
                    <IoStorefrontOutline className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Store</p>
                </span>
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass('/dashboard/upload')}`}
                    onClick={() => {
                        setShowDropdown(!showDropdown);
                        handleNavigate('/dashboard/upload');
                    }}
                >
                    <IoCartOutline className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Add Product</p>
                </span>
                {showDropdown && (
                    <div className="ml-[30px] flex-col gap-[20px] w-[100%] hidden max-[650px]:flex">
                        <span
                            className={`flex items-center gap-[30px] justify-center h-[20px] cursor-pointer w-[90%] ${getActiveClass('/dashboard/course/upload')}`}
                            onClick={() => handleNavigate('/dashboard/course/upload')}
                        >
                            <IoVideocamOutline className="w-[15%] h-[15px]" />
                            <p className="text-[14px] w-[80%]">Upload Course</p>
                        </span>
                        <span
                            className={`flex items-center gap-[30px] justify-center h-[20px] cursor-pointer w-[90%] ${getActiveClass('/dashboard/ebook/upload')}`}
                            onClick={() => handleNavigate('/dashboard/ebook/upload')}
                        >
                            <PiNotebookLight className="w-[15%] h-[15px]" />
                            <p className="text-[14px] w-[80%]">Upload E-book</p>
                        </span>
                    </div>
                )}
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass('/dashboard/order')}`}
                    onClick={() => handleNavigate('/dashboard/order')}
                >
                    <IoBagHandleOutline className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Order</p>
                </span>
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass('/dashboard/transaction')}`}
                    onClick={() => handleNavigate('/dashboard/transaction')}
                >
                    <IoQrCodeOutline className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Transaction</p>
                </span>
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass('/dashboard/customer')}`}
                    onClick={() => handleNavigate('/dashboard/customer')}
                >
                    <PiUsersThree className="w-[20%] h-[20px]" />
                    <p className="text-[15px] w-[80%]">Customer</p>
                </span>
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass('/logout')}`}
                    onClick={handleLogoutClick}
                >
                    <FiLogOut className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Log out</p>
                </span>
            </div>
        </div>
    );
};

export default SideBar;
