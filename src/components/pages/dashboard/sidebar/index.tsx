import { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { PiNotebookLight, PiUsersThree } from "react-icons/pi";
import { IoVideocamOutline, IoCartOutline, IoQrCodeOutline, IoBagHandleOutline, IoStorefrontOutline } from "react-icons/io5";
export interface ToggleSidebar {
    showSideBar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const SideBar = ({showSideBar, setShowSidebar}: ToggleSidebar) => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState<string>("");
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    useEffect(() => {
        // Load active item from local storage when the component mounts
        const storedActiveItem = localStorage.getItem("activeSidebarItem");
        if (storedActiveItem) {
            setActiveItem(storedActiveItem);
        }
    }, []);

    const handleNavigate = (path: string, item: string) => {
        navigate(path);
        setActiveItem(item);
        // Save active item to local storage
        localStorage.setItem("activeSidebarItem", item);
        setShowSidebar(!showSideBar)
    };

    const getActiveClass = (item: string) => {
        return activeItem === item ? " w-[100%] bg-black text-white border-inline-start-4 border-[#FFC300]" : "";
    };

    return (
        <div className="w-[90%] h-[83vh]">
            <div className="w-[100%] flex flex-col gap-[10px]">
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass("dashboard")}`}
                    onClick={() => handleNavigate('/dashboard', 'dashboard')}
                >
                    <RxDashboard className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Dashboard</p>
                </span>
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass("store")}`}
                    onClick={() => handleNavigate('/dashboard/store', 'store')}
                >
                    <IoStorefrontOutline className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Store</p>
                </span>
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass("add-product")}`}
                    onClick={() => {
                        setShowDropdown(!showDropdown);
                        handleNavigate('/dashboard/course', 'add-product');
                    }}
                >
                    <IoCartOutline className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Add Product</p>
                </span>
                {showDropdown && (
                    <div className="ml-[30px] flex-col gap-[20px] w-[100%] hidden max-[650px]:flex">
                        <span
                            className={`flex items-center gap-[30px] justify-center h-[20px] cursor-pointer w-[90%] ${getActiveClass("upload-course")}`}
                            onClick={() => handleNavigate('/dashboard/course', 'upload-course')}
                        >
                            <IoVideocamOutline className="w-[15%] h-[15px]" />
                            <p className="text-[14px] w-[80%]">Upload Course</p>
                        </span>
                        <span
                            className={`flex items-center gap-[30px] justify-center h-[20px] cursor-pointer w-[90%] ${getActiveClass("upload-ebook")}`}
                            onClick={() => handleNavigate('/dashboard/ebook', 'upload-ebook')}
                        >
                            <PiNotebookLight className="w-[15%] h-[15px]" />
                            <p className="text-[14px] w-[80%]">Upload E-book</p>
                        </span>
                    </div>
                )}
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass("order")}`}
                    onClick={() => handleNavigate('/dashboard/order', 'order')}
                >
                    <IoBagHandleOutline className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Order</p>
                </span>
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass("transaction")}`}
                    onClick={() => handleNavigate('/dashboard/transaction', 'transaction')}
                >
                    <IoQrCodeOutline className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Transaction</p>
                </span>
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass("customer")}`}
                    onClick={() => handleNavigate('/dashboard/customer', 'customer')}
                >
                    <PiUsersThree className="w-[20%] h-[20px]" />
                    <p className="text-[15px] w-[80%]">Customer</p>
                </span>
                <span
                    className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] ${getActiveClass("logout")}`}
                    onClick={() => handleNavigate('/logout', 'logout')}
                >
                    <FiLogOut className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Log out</p>
                </span>
            </div>
        </div>
    );
};

export default SideBar;
